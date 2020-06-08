(function (window) {
  var App = window.App || {};
  var COMMON = window.App.common;

  var _ua = null;
  var _session = null;
  var _incomingSession = null;
  var _tmpSession = null;
  window._PeerConnection = null;
  var _localStream = null;
  var _remoteStream = null;
  var _getStatsResult = null;
  var _sipCode = {
    busy: {
      status_code: 486,
    },
    reject: {
      status_code: 403,
    },
  };

  // RTCPeerConnection stats
  function _getPeerStats(peer) {
    callStats(peer, function (result) {
      var debug = `
          <p>upload: <i>${Math.floor(result.bandwidth.uploadSpeed / 1024)} KBps</i></p>
          <p>download: <i>${Math.floor(result.bandwidth.downloadSpeed / 1024)} KBps</i></p>
          <p>resolutionUp: <i>${result.video.send.width} x ${result.video.send.height}</i></p>
          <p>resolutionDn: <i>${result.video.recv.width} x ${result.video.recv.height}</i></p>
          <p>audio jitter: <i>${Math.floor(result.audio.send.jitter * 100) / 10}ms</i></p>
          <p>send audio loss: <i>${Math.floor(result.calculation.audioPacketLoss * 1000) / 10}%</i></p>
          <p>video jitter: <i>${Math.floor(result.video.send.jitter * 100) / 10}ms</i></p>
          <p>send video loss: <i>${Math.floor(result.calculation.videoPacketLoss * 1000) / 10}%</i></p>
          <p>quality reason: <i>${result.video.send.qualityLimitationReason}</i></p>
          <p>send fps: <i>${result.calculation.FPS}</i></p>
        `;
      document.querySelector('#debug').innerHTML = debug;
    });
  }

  // remove stream
  function _stopStream() {
    var localSrcObject = document.querySelector('#localVideo').srcObject;
    var remoteSrcObject = document.querySelector('#remoteVideo').srcObject;
    if (_remoteStream) {
      _remoteStream.getTracks().forEach((track) => track.stop());
    }
    if (_localStream) {
      _localStream.getTracks().forEach((track) => track.stop());
    }
    if (localSrcObject) {
      localSrcObject.getTracks().forEach((track) => track.stop());
      localSrcObject = null;
    }
    if (remoteSrcObject) {
      remoteSrcObject.getTracks().forEach((track) => track.stop());
      remoteSrcObject = null;
    }
  }

  // pause the ring
  function _ringPause(session) {
    if (session.direction === 'outgoing') {
      document.querySelector('#ringback').pause();
      document.querySelector('#ringback').currentTime = 0;
    } else {
      document.querySelector('#ringing').pause();
      document.querySelector('#ringing').currentTime = 0;
    }
  }

  // after accepted
  function _afterAccept(session) {
    _PeerConnection = session.connection;
    _localStream = new MediaStream();
    _PeerConnection.getSenders().forEach(function (receiver) {
      _localStream.addTrack(receiver.track);
    });
    _remoteStream = new MediaStream();
    _PeerConnection.getReceivers().forEach(function (receiver) {
      _remoteStream.addTrack(receiver.track);
    });
    if (_localStream) {
      document.querySelector('#localVideo').srcObject = _localStream;
    }
    if (_remoteStream) {
      document.querySelector('#remoteVideo').srcObject = _remoteStream;
    }
    // addstream changeCam
    _PeerConnection.addEventListener('addstream', function (e) {
      document.querySelector('#remoteVideo').srcObject = e.stream;
    });

    COMMON.changePage('session');
    _getPeerStats(_PeerConnection);
    setTimeout(() => {
      updateUpBitrate();
    }, 3000);
  }

  function updateUpBitrate() {
    const senders = _PeerConnection.getSenders();
    senders.forEach((sender) => {
      const vBandwidth = 1024e3;
      const parameters = sender.getParameters();
      if (!parameters.encodings) {
        parameters.encodings = [{}];
      }

      sender.track.applyConstraints({
        frameRate: { max: 30 },
        height: { min: 480, ideal: 480 },
        width: { min: 640, ideal: 640 },
      });

      if (sender.track.kind == 'video') {
        parameters.encodings[0].maxBitrate = vBandwidth;
        parameters.encodings[0].maxFramerate = 20;
        parameters.encodings[0].networkPriority = 'high';
        parameters.encodings[0].priority = 'high';
      } else if (sender.track.kind == 'audio') {
        parameters.encodings[0].maxBitrate = vBandwidth / 2;
      }

      sender.setParameters(parameters).catch((e) => console.error(e));
      console.log(sender.getParameters());
    });
  }

  // UA debug information
  function _UAMessageSubject(that) {
    ['connecting', 'connected', 'disconnected', 'registered', 'unregistered', 'registrationFailed', 'newRTCSession', 'newMessage'].map((event) => {
      that.ua.on(event, function (e) {
        console.log(`UAEvent: ${event}`, e);
      });
    });
  }

  // RTCSession debug information
  function _RTCSessionMessageSubject(session) {
    [
      'peerconnection',
      'connecting',
      'sending',
      'progress',
      'accepted',
      'confirmed',
      'ended',
      'failed',
      'newDTMF',
      'newInfo',
      'hold',
      'unhold',
      'muted',
      'unmuted',
      'reinvite',
      'update',
      'refer',
      'replaces',
      'sdp',
      'icecandidate',
      'getusermediafailed',
      'peerconnection:createofferfailed',
      'peerconnection:createanswerfailed',
      'peerconnection:setlocaldescriptionfailed',
      'peerconnection:setremotedescriptionfailed',
    ].map((event) => {
      session.on(event, function (e) {
        console.info(`RTCSessionEvent: ${event}`, e);
      });
    });
  }

  /* UAEvent */
  var _uaEvent = {
    registered: function (e) {
      COMMON.changePage('main');
    },
    registrationFailed: function (e) {
      COMMON.changePage('login');
      M.toast({
        html: e.cause,
      });
    },
    newRTCSession: function (e) {
      _tmpSession = e.session;
      if (e.originator === 'remote') {
        if (_session || _incomingSession) {
          console.warn('incoming call replied with 486 "Busy Here"');
          e.session.terminate(_sipCode.busy);
          return;
        }
        _incomingSession = e.session;
      }
      _RTCSessionMessageSubject(e.session);
      _RTCSessionStatusSubject(e.session, e);
    },
    newMessage: function (e) {},
  };

  function _UAStatusSubject(that) {
    Object.keys(_uaEvent).map((event) => {
      that.ua.on(event, function (e) {
        _uaEvent[event](e);
      });
    });
  }

  /* RTCSession */
  var _rtcSessionEvent = {
    progress: function (e, session, UAe) {
      if (session.direction === 'outgoing') {
        COMMON.changePage('calling');
        document.querySelector('#ringback').play();
      } else {
        document.querySelector('#display-name').innerHTML = UAe.request.from.display_name;
        COMMON.changePage('incoming');
        document.querySelector('#ringing').play();
      }
    },
    failed: function (e, session, UAe) {
      _session = null;
      _incomingSession = null;
      _ringPause(session);
      COMMON.changePage('main');
      M.toast({
        html: e.cause,
      });
      _stopStream();
      if (_getStatsResult) {
        _getStatsResult.nomore();
      }
    },
    accepted: function (e, session, UAe) {
      _session = session;
      _ringPause(session);
      _afterAccept(session);
    },
    ended: function (e, session, UAe) {
      _session = null;
      _incomingSession = null;
      _stopStream();
      M.toast({
        html: e.cause,
      });
      COMMON.changePage('main');
    },
  };

  function _RTCSessionStatusSubject(session, UAe) {
    Object.keys(_rtcSessionEvent).map((event) => {
      session.on(event, function (e) {
        _rtcSessionEvent[event](e, session, UAe);
      });
    });
  }

  // TODO: what ???
  function _setVideoStream(stream) {
    document.querySelector('#localVideo').srcObject = stream;
    document.querySelector('#localVideo').play();
  }

  /* WebRTC Class */
  function WebRTC(options = {}) {
    this.account = options.account || ' ';
    this.password = options.password || ' ';
    this.domain = options.domain || ' ';
    this.wss = options.wss || ' ';

    this.socket = new FlyInnWeb.WebSocketInterface(this.wss);
    this.configuration = {
      sockets: [this.socket],
      uri: 'sip:' + this.account + '@' + this.domain,
      contact_uri: 'sip:' + this.account + '@' + this.account + '.invalid;transport=ws',
      password: this.password,
      display_name: this.account,
      register: true,
    };

    this.ua = new FlyInnWeb.UA(this.configuration);
  }

  WebRTC.prototype.connect = function () {
    this.ua.start();
    _UAMessageSubject(this);
    _UAStatusSubject(this);
  };

  WebRTC.prototype.unregister = function () {
    if (this.ua.isRegistered()) {
      this.ua.unregister();
    }
  };

  WebRTC.prototype.call = function (linkman) {
    this.session = this.ua.call('sip:' + linkman + '@' + this.domain, {
      extraHeaders: ['X-Token: 2c8a1be510764ad222ebcc4ffd0f9775'],
      mediaConstraints: {
        audio: true,
        video: true,
      },
    });
  };

  WebRTC.prototype.answer = function () {
    _incomingSession.answer();
  };

  WebRTC.prototype.cancel = function () {
    _tmpSession.terminate();
  };

  WebRTC.prototype.reject = function () {
    _incomingSession.terminate(_sipCode.reject);
  };

  WebRTC.prototype.hangup = function () {
    if (_session) {
      _session.terminate();
    }
  };

  WebRTC.prototype.closeMic = function () {
    if (_session) {
      _session.mute({
        audio: true,
      });
    }
  };

  WebRTC.prototype.openMic = function () {
    if (_session) {
      _session.unmute({
        audio: true,
      });
    }
  };

  WebRTC.prototype.closeCam = function () {
    if (_session) {
      _session.mute({
        video: true,
      });
    }
  };

  WebRTC.prototype.openCam = function () {
    if (_session) {
      _session.unmute({
        video: true,
      });
    }
  };

  WebRTC.prototype.sendDTMF = function (message) {
    if (_session) {
      _session.sendDTMF(message);
    }
  };

  WebRTC.prototype.sendInfo = function (message) {
    if (_session) {
      _session.sendInfo('application/json', message);
    }
  };

  WebRTC.prototype.switchCam = function () {
    const stream = _session.switchVideoStream();

    setTimeout(() => {
      updateUpBitrate();
    }, 3000);
    stream &&
      stream.then((s) => {
        document.querySelector('#localVideo').srcObject = s;
      });
  };

  WebRTC.prototype.switchStream = function (stream) {
    window.stream = stream;
    setTimeout(() => {
      updateUpBitrate();
    }, 3000);
    if (_session && _PeerConnection) {
      _PeerConnection.getLocalStreams().forEach((stream) => {
        _PeerConnection.removeStream(stream);
      });

      _PeerConnection.addStream(stream);
      _setVideoStream(stream);
      _session.renegotiate();
    }
  };

  App.WebRTC = WebRTC;
  window.App = App;
})(window);
