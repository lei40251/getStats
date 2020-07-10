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
  var timeSession = 0;
  var sessionTimer;

  /**
   * 格式化秒为 时分秒格式
   *
   * @param {*} value
   * @returns
   */
  function formatSeconds(value) {
    var flag = false;
    if (value < 0) {
      flag = true;
      value = Math.abs(value);
    }
    var secondTime = parseInt(value); // 秒
    var minuteTime = 0; // 分
    var hourTime = 0; // 小时
    if (secondTime >= 60) {
      //如果秒数大于60，将秒数转换成整数
      //获取分钟，除以60取整数，得到整数分钟
      minuteTime = parseInt(secondTime / 60);
      //获取秒数，秒数取佘，得到整数秒数
      secondTime = parseInt(secondTime % 60);
      //如果分钟大于60，将分钟转换成小时
      if (minuteTime >= 60) {
        //获取小时，获取分钟除以60，得到整数小时
        hourTime = parseInt(minuteTime / 60);
        //获取小时后取佘的分，获取分钟除以60取佘的分
        minuteTime = parseInt(minuteTime % 60);
      }
    }
    var result = '' + parseInt(secondTime) + '秒';

    if (minuteTime > 0) {
      result = '' + parseInt(minuteTime) + '分' + result;
    }
    if (hourTime > 0) {
      result = '' + parseInt(hourTime) + '小时' + result;
    }
    return flag ? '-' + result : result;
  }

  // remove stream
  function _stopStream() {
    var remoteSrcObject = document.querySelector('#remoteAudio').srcObject;
    if (_remoteStream) {
      _remoteStream.getTracks().forEach((track) => track.stop());
    }
    if (_localStream) {
      _localStream.getTracks().forEach((track) => track.stop());
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
    _remoteStream = new MediaStream();
    _PeerConnection.getReceivers().forEach(function (receiver) {
      _remoteStream.addTrack(receiver.track);
    });
    if (_remoteStream) {
      document.querySelector('#remoteAudio').srcObject = _remoteStream;
    }
    // addstream changeCam
    _PeerConnection.addEventListener('addstream', function (e) {
      document.querySelector('#remoteAudio').srcObject = e.stream;
    });

    $('.session-timer').html('');
    clearInterval(sessionTimer);
    timeSession = 0;
    sessionTimer = setInterval(function () {
      timeSession++;
      $('.session-timer').html(formatSeconds(timeSession));
    }, 1000);

    COMMON.changePage('session');
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
      if (!_session) {
        COMMON.changePage('login');
      }
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
        if (e.message.reason_phrase == 'Timeout') {
          M.toast({
            html: '呼叫超时',
          });
        }
        if (e.cause == 'Unavailable') {
          if (e.message.reason_phrase === 'Request Timeout') {
            M.toast({
              html: '呼叫超时，对方未接听',
            });
          }
        }
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
        if (e.cause == 'No Answer') {
          M.toast({
            html: '呼叫未接听',
          });
        }
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
  };
  function _RTCSessionStatusSubject(session, UAe) {
    Object.keys(_rtcSessionEvent).map((event) => {
      session.on(event, function (e) {
        _rtcSessionEvent[event](e, session, UAe);
      });
    });
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
    $('.remoteControl').show();
    $('.mic_btn').removeClass('off');

    this.session = this.ua.call('sip:' + linkman + '@' + this.domain, {
      extraHeaders: ['X-Token: 2c8a1be510764ad222ebcc4ffd0f9775'],
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
    _session.sendInfo('text/plain', 'openMic');
    if (_session) {
      _session.unmute({
        audio: true,
      });
    }
  };

  WebRTC.prototype.sendDTMF = function (message) {
    if (_session) {
      _session.sendDTMF(message, {
        transportType: 'RFC2833',
      });
    }
  };

  WebRTC.prototype.sendInfo = function (message, contentType) {
    if (_session) {
      if (contentType) {
        _session.sendInfo(contentType, message);
      } else {
        _session.sendInfo('application/json', message);
      }
    }
  };

  App.WebRTC = WebRTC;
  window.App = App;
})(window);
