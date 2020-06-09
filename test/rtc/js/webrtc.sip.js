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

  var callerTotalFlag = false;
  // RTCPeerConnection stats
  function _getPeerStats(peer) {
    var ownToastFlag = false;
    callStats(peer, function (result) {
      if (
        Math.floor(result.calculation.videoSendPacketLoss * 1000) / 10 > 8 ||
        Math.floor(result.calculation.audioSendPacketLoss * 1000) / 10 > 8 ||
        result.video.send.qualityLimitationReason !== 'none'
      ) {
        if (!ownToastFlag) {
          ownToastFlag = true;
          M.toast({
            html: '您的的音视频质量欠佳，会影响通话体验',
            completeCallback: function () {
              ownToastFlag = false;
            },
          });
        }
        _session.sendInfo('text/plain', 'quality');
      }
      var debug = `
          <p>upload: <i>${Math.floor(result.bandwidth.uploadSpeed / 1024)} KBps</i></p>
          <p>download: <i>${Math.floor(result.bandwidth.downloadSpeed / 1024)} KBps</i></p>
          <p>resolutionUp: <i>${result.video.send.width} x ${result.video.send.height}</i></p>
          <p>resolutionDn: <i>${result.video.recv.width} x ${result.video.recv.height}</i></p>
          <p>send audio jitter: <i>${Math.floor(result.audio.send.jitter * 100) / 10}ms</i></p>
          <p>send audio loss: <i>${Math.floor(result.calculation.audioSendPacketLoss * 1000) / 10}%</i></p>
          <p>send video jitter: <i>${Math.floor(result.video.send.jitter * 100) / 10}ms</i></p>
          <p>send video loss: <i>${Math.floor(result.calculation.videoSendPacketLoss * 1000) / 10}%</i></p>

          <p>recv audio jitter: <i>${Math.floor(result.audio.recv.jitter * 100) / 10}ms</i></p>
          <p>recv audio loss: <i>${Math.floor(result.calculation.audioRecvPacketLoss * 1000) / 10}%</i></p>
          <p>recv video loss: <i>${Math.floor(result.calculation.videoRecvPacketLoss * 1000) / 10}%</i></p>
          <p>quality reason: <i>${result.video.send.qualityLimitationReason}</i></p>
          <p>send fps: <i>${result.calculation.sendFPS}</i></p>
          <p>recv fps: <i>${result.calculation.recvFPS}</i></p>
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
  }

  function updateUpBitrate(definition) {
    if (definition == '请选择') return;
    const senders = _PeerConnection.getSenders();
    const vBandwidth = 1024e3;

    var networkPriority = 'high';
    var maxBitrate = vBandwidth;

    var lowConstraints, mediumConstraints, highConstraints;

    var constraints = {
      low: { frameRate: { min: 15, max: 25 }, width: 320, height: 240, aspectRatio: 1.3333333 },
      medium: { frameRate: { min: 15, max: 25 }, width: 640, height: 480, aspectRatio: 1.33333333 },
      high: { frameRate: { min: 15, max: 25 }, width: 1280, height: 720 },
    };

    const mobileConstraints = {
      low: { frameRate: { min: 15, max: 25 }, height: { exact: 320 }, width: { exact: 240 }, aspectRatio: 0.75 },
      medium: { frameRate: { min: 15, max: 25 }, height: { exact: 640 }, width: { exact: 480 }, aspectRatio: 0.75 },
      high: { frameRate: { min: 15, max: 25 }, height: { exact: 1280 }, width: { exact: 720 }, aspectRatio: 0.75 },
    };

    const osName = ua.getOS().name;

    switch (osName) {
      case 'iOS':
      case 'Android':
        console.log(osName);
        lowConstraints = mobileConstraints.low;
        mediumConstraints = mobileConstraints.medium;
        highConstraints = mobileConstraints.high;
        break;
      default:
        console.log('onsname: ', osName);
        lowConstraints = constraints.low;
        mediumConstraints = constraints.medium;
        highConstraints = constraints.high;
        break;
    }

    switch (definition) {
      case 'low':
        maxBitrate = vBandwidth / 2;
        networkPriority = 'low';
        constraints = lowConstraints;
        break;
      case 'medium':
        maxBitrate = vBandwidth;
        networkPriority = 'high';
        constraints = mediumConstraints;
        break;
      case 'high':
        maxBitrate = vBandwidth * 2;
        networkPriority = 'high';
        constraints = highConstraints;
        break;
      default:
        break;
    }

    senders.forEach((sender) => {
      const parameters = sender.getParameters();
      if (!parameters.encodings) {
        parameters.encodings = [{}];
      }

      sender.track.applyConstraints(constraints);

      if (sender.track.kind == 'video') {
        parameters.encodings[0].maxBitrate = maxBitrate;
        parameters.encodings[0].maxFramerate = 20;
        parameters.encodings[0].networkPriority = networkPriority;
        parameters.encodings[0].priority = networkPriority;
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
      if (e.cause == 'Connection Error') {
        M.toast({
          html: '网络连接错误,请检查网络信号',
        });
        return;
      }
      M.toast({
        html: '注册失败，请检查用户名或密码',
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
        document.querySelector('#caller').innerHTML = UAe.request.from.display_name;
        COMMON.changePage('incoming');
        document.querySelector('#ringing').play();
      }
    },
    failed: function (e, session, UAe) {
      _session = null;
      _incomingSession = null;
      _ringPause(session);
      COMMON.changePage('main');
      _stopStream();
      if (_getStatsResult) {
        _getStatsResult.nomore();
      }
      if (e.cause == 'Request Timeout') {
        M.toast({
          html: '请求超时，请检查网络',
        });
      }
      if (e.cause == 'Connection Error') {
        M.toast({
          html: '连接错误，请检查网络',
        });
      }
      if (e.cause == 'Incompatible SDP') {
        M.toast({
          html: '不兼容的SDP',
        });
      }
      if (e.originator == 'remote') {
        if (e.cause == 'Canceled') {
          M.toast({
            html: '用户取消呼叫',
          });
        }
        if (e.cause == 'Busy') {
          M.toast({
            html: '被叫忙',
          });
        }
        if (e.cause == 'Not Found') {
          M.toast({
            html: '用户不存在',
          });
        }
        if (e.cause == 'Rejected') {
          M.toast({
            html: '对方已拒绝',
          });
        }
        if (e.cause == 'SIP Failure Code') {
          M.toast({
            html: 'SIP Failure Code',
          });
        }
      } else {
        if (e.cause == 'Canceled') {
          M.toast({
            html: '已取消呼叫',
          });
        }
        if (e.cause == 'Rejected') {
          M.toast({
            html: '已拒绝',
          });
        }
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
      COMMON.changePage('main');
      if (e.cause == 'Terminated') {
        M.toast({
          html: '通话结束',
        });
        return;
      }
      M.toast({
        html: e.cause,
      });
    },
    getusermediafailed: function () {
      M.toast({
        html: '获取媒体设备失败，请检查权限',
      });
    },
    newInfo: function (e) {
      if (e.originator == 'remote') {
        switch (e.request.body) {
          case 'closeMic':
            M.toast({
              html: '对方已关闭麦克风',
            });
            break;
          case 'closeCam':
            M.toast({
              html: '对方已关闭摄像头',
            });
            break;
          case 'closeSpeaker':
            M.toast({
              html: '对方已关闭扬声器',
            });
            break;
          case 'quality':
            if (!callerTotalFlag) {
              callerTotalFlag = true;
              M.toast({
                html: '对方的音视频质量欠佳，会影响通话体验',
                completeCallback: function () {
                  callerTotalFlag = false;
                },
              });
            }
          default:
            break;
        }
      }
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

  WebRTC.prototype.updateConstraints = function (options) {
    updateUpBitrate(options);
  };

  WebRTC.prototype.closeSpeaker = function () {
    _session.sendInfo('text/plain', 'closeSpeaker');

    M.toast({
      html: '您已关闭扬声器',
    });
  };

  WebRTC.prototype.closeMic = function () {
    _session.sendInfo('text/plain', 'closeMic');
    M.toast({
      html: '您已关闭麦克风',
    });
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
    _session.sendInfo('text/plain', 'closeCam');
    M.toast({
      html: '您已关闭摄像头',
    });
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

    stream &&
      stream.then((s) => {
        document.querySelector('#localVideo').srcObject = s;
      });
  };

  WebRTC.prototype.switchStream = function (stream) {
    window.stream = stream;
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
