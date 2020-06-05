(function () {
  function r(e, n, t) {
    function o(i, f) {
      if (!n[i]) {
        if (!e[i]) {
          var c = 'function' == typeof require && require;
          if (!f && c) return c(i, !0);
          if (u) return u(i, !0);
          var a = new Error("Cannot find module '" + i + "'");
          throw ((a.code = 'MODULE_NOT_FOUND'), a);
        }
        var p = (n[i] = { exports: {} });
        e[i][0].call(
          p.exports,
          function (r) {
            var n = e[i][1][r];
            return o(n || r);
          },
          p,
          p.exports,
          r,
          e,
          n,
          t,
        );
      }
      return n[i].exports;
    }
    for (var u = 'function' == typeof require && require, i = 0; i < t.length; i++) o(t[i]);
    return o;
  }
  return r;
})()(
  {
    1: [
      function (require, module, exports) {
        function MultiStreamsMixer(t) {
          function e(t, i, o) {
            if ('srcObject' in i) i.srcObject = t;
            else if ('createObjectURL' in m && !o)
              try {
                i.src = m.createObjectURL(t);
              } catch (o) {
                return void e(t, i, !0);
              }
            else 'mozSrcObject' in i ? (i.mozSrcObject = t) : alert('createObjectURL/srcObject both are not supported.');
          }
          function i() {
            if (!s) {
              var t = u.length,
                e = !1,
                n = [];
              if (
                (u.forEach(function (t) {
                  t.stream || (t.stream = {}), t.stream.fullcanvas ? (e = t) : n.push(t);
                }),
                e)
              )
                (c.width = e.stream.width), (c.height = e.stream.height);
              else if (n.length) {
                c.width = t > 1 ? 2 * n[0].width : n[0].width;
                var a = 1;
                (3 !== t && 4 !== t) || (a = 2),
                  (5 !== t && 6 !== t) || (a = 3),
                  (7 !== t && 8 !== t) || (a = 4),
                  (9 !== t && 10 !== t) || (a = 5),
                  (c.height = n[0].height * a);
              } else (c.width = f.width || 360), (c.height = f.height || 240);
              e && e instanceof HTMLVideoElement && o(e),
                n.forEach(function (t, e) {
                  o(t, e);
                }),
                setTimeout(i, f.frameInterval);
            }
          }
          function o(t, e) {
            if (!s) {
              var i = 0,
                o = 0,
                n = t.width,
                a = t.height;
              1 === e && (i = t.width),
                2 === e && (o = t.height),
                3 === e && ((i = t.width), (o = t.height)),
                4 === e && (o = 2 * t.height),
                5 === e && ((i = t.width), (o = 2 * t.height)),
                6 === e && (o = 3 * t.height),
                7 === e && ((i = t.width), (o = 3 * t.height)),
                void 0 !== t.stream.left && (i = t.stream.left),
                void 0 !== t.stream.top && (o = t.stream.top),
                void 0 !== t.stream.width && (n = t.stream.width),
                void 0 !== t.stream.height && (a = t.stream.height),
                h.drawImage(t, i, o, n, a),
                'function' == typeof t.stream.onRender && t.stream.onRender(h, i, o, n, a, e);
            }
          }
          function n() {
            d();
            var t;
            'captureStream' in c
              ? (t = c.captureStream())
              : 'mozCaptureStream' in c
              ? (t = c.mozCaptureStream())
              : f.disableLogs ||
                console.error('Upgrade to latest Chrome or otherwise enable this flag: chrome://flags/#enable-experimental-web-platform-features');
            var e = new l();
            return (
              t.getVideoTracks().forEach(function (t) {
                e.addTrack(t);
              }),
              (c.stream = e),
              e
            );
          }
          function a() {
            v.AudioContextConstructor || (v.AudioContextConstructor = new v.AudioContext()),
              (f.audioContext = v.AudioContextConstructor),
              (f.audioSources = []),
              !0 === f.useGainNode &&
                ((f.gainNode = f.audioContext.createGain()), f.gainNode.connect(f.audioContext.destination), (f.gainNode.gain.value = 0));
            var e = 0;
            if (
              (t.forEach(function (t) {
                if (t.getAudioTracks().length) {
                  e++;
                  var i = f.audioContext.createMediaStreamSource(t);
                  !0 === f.useGainNode && i.connect(f.gainNode), f.audioSources.push(i);
                }
              }),
              e)
            )
              return (
                (f.audioDestination = f.audioContext.createMediaStreamDestination()),
                f.audioSources.forEach(function (t) {
                  t.connect(f.audioDestination);
                }),
                f.audioDestination.stream
              );
          }
          function r(t) {
            var i = document.createElement('video');
            return (
              e(t, i), (i.muted = !0), (i.volume = 0), (i.width = t.width || f.width || 360), (i.height = t.height || f.height || 240), i.play(), i
            );
          }
          function d(e) {
            (u = []),
              f.audioSources &&
                f.audioSources.forEach(function (t) {
                  t.disconnect();
                }),
              (e = e || t),
              f.audioContext && f.audioContext.resume(),
              e.forEach(function (t) {
                if (t.getVideoTracks().length || t.getAudioTracks().length) {
                  if (t.getVideoTracks().length) {
                    var e = r(t);
                    (e.stream = t), u.push(e);
                  }
                  if (t.getAudioTracks().length && f.audioContext) {
                    var i = f.audioContext.createMediaStreamSource(t);
                    i.connect(f.audioDestination), f.audioSources.push(i);
                  }
                }
              });
          }
          var u = [],
            s = !1,
            c = document.createElement('canvas'),
            h = c.getContext('2d');
          (c.style = 'opacity:0;position:absolute;z-index:-1;top: -100000000;left:-1000000000; margin-top:-1000000000;margin-left:-1000000000;'),
            (document.body || document.documentElement).appendChild(c),
            (this.disableLogs = !1),
            (this.frameInterval = 1),
            (this.width = 360),
            (this.height = 240),
            (this.useGainNode = !0);
          var f = this,
            g = window.AudioContext;
          void 0 === g &&
            ('undefined' != typeof webkitAudioContext && (g = webkitAudioContext), 'undefined' != typeof mozAudioContext && (g = mozAudioContext));
          var m = window.URL;
          void 0 === m && 'undefined' != typeof webkitURL && (m = webkitURL),
            'undefined' != typeof navigator &&
              void 0 === navigator.getUserMedia &&
              (void 0 !== navigator.webkitGetUserMedia && (navigator.getUserMedia = navigator.webkitGetUserMedia),
              void 0 !== navigator.mozGetUserMedia && (navigator.getUserMedia = navigator.mozGetUserMedia));
          var l = window.MediaStream;
          void 0 === l && 'undefined' != typeof webkitMediaStream && (l = webkitMediaStream),
            void 0 !== l &&
              ('getVideoTracks' in l.prototype ||
                ((l.prototype.getVideoTracks = function () {
                  if (!this.getTracks) return [];
                  var t = [];
                  return (
                    this.getTracks.forEach(function (e) {
                      -1 !== e.kind.toString().indexOf('video') && t.push(e);
                    }),
                    t
                  );
                }),
                (l.prototype.getAudioTracks = function () {
                  if (!this.getTracks) return [];
                  var t = [];
                  return (
                    this.getTracks.forEach(function (e) {
                      -1 !== e.kind.toString().indexOf('audio') && t.push(e);
                    }),
                    t
                  );
                })),
              void 0 === l.prototype.stop &&
                (l.prototype.stop = function () {
                  this.getTracks().forEach(function (t) {
                    t.stop();
                  });
                }));
          var v = {};
          void 0 !== g ? (v.AudioContext = g) : 'undefined' != typeof webkitAudioContext && (v.AudioContext = webkitAudioContext),
            (this.startDrawingFrames = function () {
              i();
            }),
            (this.appendStreams = function (e) {
              if (!e) throw 'First parameter is required.';
              e instanceof Array || (e = [e]),
                t.concat(e),
                e.forEach(function (t) {
                  if (t.getVideoTracks().length) {
                    var e = r(t);
                    (e.stream = t), u.push(e);
                  }
                  if (t.getAudioTracks().length && f.audioContext) {
                    var i = f.audioContext.createMediaStreamSource(t);
                    i.connect(f.audioDestination), f.audioSources.push(i);
                  }
                });
            }),
            (this.releaseStreams = function () {
              (u = []),
                (s = !0),
                f.gainNode && (f.gainNode.disconnect(), (f.gainNode = null)),
                f.audioSources.length &&
                  (f.audioSources.forEach(function (t) {
                    t.disconnect();
                  }),
                  (f.audioSources = [])),
                f.audioDestination && (f.audioDestination.disconnect(), (f.audioDestination = null)),
                f.audioContext && f.audioContext.close(),
                (f.audioContext = null),
                h.clearRect(0, 0, c.width, c.height),
                c.stream && (c.stream.stop(), (c.stream = null));
            }),
            (this.resetVideoStreams = function (t) {
              !t || t instanceof Array || (t = [t]), d(t);
            }),
            (this.name = 'MultiStreamsMixer'),
            (this.toString = function () {
              return this.name;
            }),
            (this.getMixedStream = function () {
              s = !1;
              var e = n(),
                i = a();
              i &&
                i.getAudioTracks().forEach(function (t) {
                  e.addTrack(t);
                });
              var o;
              return (
                t.forEach(function (t) {
                  t.fullcanvas && (o = !0);
                }),
                e
              );
            });
        }
        module.exports = MultiStreamsMixer;
      },
      {},
    ],
    2: [
      function (require, module, exports) {
        'use strict';
        function StringBuffer() {
          this.buffer = [];
        }
        function quality2Bitrate(e, t) {
          if (e.simulcast)
            switch (t) {
              case 'high':
                return e.high_bandwidth_out ? e.high_bandwidth_out : 1 * e.bandwidth_out;
              case 'medium':
                return e.medium_bandwidth_out ? e.medium_bandwidth_out : 0.5 * e.bandwidth_out;
              case 'low':
                return e.low_bandwidth_out ? e.low_bandwidth_out : 0.5 * e.bandwidth_out;
              default:
                return 300;
            }
          else
            switch (t) {
              case 'high':
                return e.high_bandwidth_out ? e.high_bandwidth_out : 1 * e.bandwidth_out;
              case 'medium':
                return e.medium_bandwidth_out ? e.medium_bandwidth_out : 0.5 * e.bandwidth_out;
              case 'low':
                return e.low_bandwidth_out ? e.low_bandwidth_out : 0.5 * e.bandwidth_out;
              default:
                return 300;
            }
        }
        function sleep(e) {
          function t() {
            return new Date().getTime();
          }
          for (var n = t(); t() < n + e; );
        }
        function Utf8EncodeEnumerator(e) {
          (this._input = e), (this._index = -1), (this._buffer = []);
        }
        function Base64DecodeEnumerator(e) {
          (this._input = e), (this._index = -1), (this._buffer = []);
        }
        function t2b(e) {
          return 'YES' == e || 'ALLOW' == e;
        }
        function b2t(e) {
          return e ? 'YES' : 'NO';
        }
        function b2p(e) {
          return e ? 'ALLOW' : 'DENY';
        }
        function ZjRTCCall() {
          var e = this;
          (e.state = 'IDLE'),
            (e.static = {}),
            (e.parent = null),
            (e.bandwidth_in = 1280),
            (e.bandwidth_out = 1280),
            (e.localStream = null),
            (e.localStreamSmall = null),
            (e.presentationStream = null),
            (e.localTrack2Id = {}),
            (e.onHold = !1),
            (e.pc = null),
            (e.mutedAudio = !1),
            (e.mutedVideo = !1),
            (e.call_type = ''),
            (e.audio_source = null),
            (e.video_source = null),
            (e.recv_audio = !0),
            (e.recv_video = !0),
            (e.force_hd = 540),
            (e.event_listener = null),
            (e.call_uuid = null),
            (e.legacy_screenshare = !1),
            (e.h264_enabled = !0),
            (e.allow_1080p = !1),
            (e.stream = null),
            (e.presentation_in_main = !1),
            (e.ice_candidates = []),
            (e.defaultStreamId = null),
            (e.msid2uuid = {}),
            (e.ssrc2uuid = {}),
            (e.msid2ssrc = {}),
            (e.bigTrackSender = null),
            (e.smallTrackSender = null),
            (e.smallAudioTrackSender = null),
            (e.analyser = null),
            (e.microphone = null),
            (e.audioContext = null),
            (e.audioRTCInterval = null),
            (e.onError = null),
            (e.onSetup = null),
            (e.onConnect = null),
            (e.onUpdateStream = null),
            (e.onRemoveStream = null),
            (e.onHoldResume = null),
            (e.onDisconnect = null),
            (e.onMicActivity = null),
            (e.onScreenshareMissing = null);
        }
        function ZjJPEGPresentation() {
          var e = this;
          (e.state = 'IDLE'),
            (e.parent = null),
            (e.call_uuid = null),
            (e.onError = null),
            (e.onSetup = null),
            (e.onConnect = null),
            (e.onDisconnect = null);
        }
        function ZjRTC() {
          var e = this;
          (e.shareVideoMaxFrameRate = 25),
            (e.shareVideoMaxHeght = 720),
            (e.shareVideoMaxWidth = 1280),
            (e.isAutoBit = !1),
            (e.prvSdk = !1),
            (e.state = 'IDLE'),
            (e.ack = !1),
            (e.conference = null),
            (e.version = null),
            (e.static = {}),
            (e.display_name = null),
            (e.bandwidth_in = 1280),
            (e.bandwidth_out = 1280),
            (e.defaultBandwidth = 1),
            (e.smallMaxWidth = 320),
            (e.smallMaxHeigh = 180),
            (e.smallMaxFrameRate = 15),
            (e.oneTimeToken = null),
            (e.conference_extension = null),
            (e.localStream = null),
            (e.mixer = null),
            (e.pipEnable = !1),
            (e.node = null),
            (e.socket = null),
            (e.uuid = null),
            (e.isvmr = null),
            (e.onHold = !1),
            (e.last_ping = null),
            (e.pc = null),
            (e.pcConfig = {}),
            (e.pcConstraints = {}),
            (e.default_stun = null),
            (e.turn_server = null),
            (e.pin = null),
            (e.role = null),
            (e.pin_status = 'none'),
            (e.call_type = ''),
            (e.mutedAudio = !1),
            (e.mutedVideo = !1),
            (e.audio_source = null),
            (e.video_source = null),
            (e.recv_audio = !0),
            (e.recv_video = !0),
            (e.forceCodec = ''),
            (e.event_listener = null),
            (e.screenshare_api = 'pexGetScreen'),
            (e.screenshare_fps = 5),
            (e.screenshare_version = '1.0.6'),
            (e.screenshare_width = window.screen.width),
            (e.screenshare_height = window.screen.height),
            (e.powerLineFrequency = 0),
            (e.token = null),
            (e.token_refresh = null),
            (e.registration_token = null),
            (e.WebSocket = null),
            (e.WebSocketTimeout = 0),
            (e.rosterList = {}),
            (e.presentation_msg = { status: '' }),
            (e.presentation_event_id = null),
            (e.chat_enabled = !1),
            (e.fecc_enabled = !1),
            (e.rtmp_enabled = !1),
            (e.rtsp_enabled = !1),
            (e.analytics_enabled = !1),
            (e.allow_1080p = !1),
            (e.service_type = null),
            (e.current_service_type = null),
            (e.remote_call_type = null),
            (e.dtmf_queue = {}),
            (e.fecc_queue = {}),
            (e.h264_enabled = !0),
            (e.simulcast = !1),
            (e.clayout = ''),
            (e.isShiTong = !1),
            (e.hideme = !1),
            (e.live_recorder_server = null),
            (e.liveService = null),
            (e.account = null),
            (e.png_presentation = !1),
            (e.basic_username = null),
            (e.basic_password = null),
            (e.checkdup = null),
            (e.ext_layout = !1),
            (e.screenshare = null),
            (e.presentation = null),
            (e.call = null),
            (e.flash = void 0),
            (e.error = null),
            (e.onError = null),
            (e.onWarn = null),
            (e.onSetup = null),
            (e.onConnect = null),
            (e.onUpdateStream = null),
            (e.onRemoveStream = null),
            (e.onHoldResume = null),
            (e.onDisconnect = null),
            (e.onPresentation = null),
            (e.onPresentationReload = null),
            (e.onPresentationConnected = null),
            (e.onPresentationDisconnected = null),
            (e.onRosterList = null),
            (e.onScreenshareStopped = null),
            (e.onScreenshareMissing = null),
            (e.onCallTransfer = null),
            (e.onCallDisconnect = null),
            (e.onParticipantCreate = null),
            (e.onParticipantUpdate = null),
            (e.onParticipantDelete = null),
            (e.onSyncBegin = null),
            (e.onSyncEnd = null),
            (e.onChatMessage = null),
            (e.onPrivateMessage = null),
            (e.onStageUpdate = null),
            (e.onMicActivity = null),
            (e.onStatsMediaData = null),
            (e.onMediaICEState = null),
            (e.logVerbose = function () {
              console.info.apply(console, arguments);
            }),
            (e.logDebug = function () {
              console.debug.apply(console, arguments);
            }),
            (e.onLog = function () {
              console.info.apply(console, arguments);
            }),
            (e.stats = new ZjRTCStatistics()),
            (e.statsscreen = new ZjRTCStatistics(1)),
            (e.statsscreen.parent = e),
            (e.stats.parent = e),
            (e.muteStream = staticTool.getMuteStream()),
            (e.currentParticipants = []),
            (e.lastParticipants = []),
            (e.activeParticipants = new Set()),
            (e.modifySourcesQueue = asyncFun.queue(e.modifySSRCsOfSDP.bind(e), 1)),
            (e.is_android = -1 != navigator.userAgent.indexOf('Android'));
          var t = navigator.userAgent.toLowerCase();
          if (
            ((e.is_windows8 = t.indexOf('windows nt 6.2') > -1 || t.indexOf('windows 8') > -1 || t.indexOf('windows nt 6.3') > -1),
            -1 != navigator.userAgent.indexOf('Chrome'))
          ) {
            e.chrome_ver = parseInt(window.navigator.appVersion.match(/Chrome\/(\d+)\./)[1], 10);
            navigator.userAgent.toLowerCase();
            var n = /macintosh|mac os x/i.test(navigator.userAgent);
            e.isMac = !!n;
          } else e.chrome_ver = 0;
          -1 != navigator.userAgent.indexOf('Firefox')
            ? ((e.firefox_ver = parseInt(window.navigator.userAgent.match(/Firefox\/(\d+)\./)[1], 10)), e.firefox_ver < 38 && (e.h264_enabled = !1))
            : (e.firefox_ver = 0),
            -1 != navigator.userAgent.indexOf('Edge')
              ? ((e.edge_ver = parseInt(window.navigator.userAgent.match(/Edge\/\d+\.(\d+)/)[1], 10)), (e.chrome_ver = 0))
              : (e.edge_ver = 0),
            e.chrome_ver > 53 && -1 != navigator.userAgent.indexOf('OS X') && (e.h264_enabled = !0),
            -1 != navigator.userAgent.indexOf('MQQBrowser')
              ? (e.qq_ver = parseInt(window.navigator.userAgent.match(/MQQBrowser\/(\d+)\./)[1], 10))
              : (e.qq_ver = 0),
            -1 != navigator.userAgent.indexOf('Android')
              ? (e.andriod_ver = parseInt(window.navigator.userAgent.match(/Android\s(\d)/)[1], 10))
              : (e.andriod_ver = 0),
            -1 != navigator.userAgent.indexOf('Safari') && -1 == navigator.userAgent.indexOf('Chrome') && -1 == navigator.userAgent.indexOf('Android')
              ? (e.safari_ver = parseInt(window.navigator.userAgent.match(/Version\/(\d+)\./)[1], 10))
              : (e.safari_ver = 0),
            -1 != navigator.userAgent.indexOf('Mobile') && (e.isMobile = !0),
            0 !== e.qq_ver && (e.h264_enabled = !1),
            e.chrome_ver > 60 &&
              setInterval(function () {
                var t,
                  n = e.getMediaStatistics();
                (e.screenshare || e.presentation) && (t = e.getMediaPresentationStatistics()),
                  e.onStatsMediaData && ((n && Object.keys(n).length > 0) || (t && Object.keys(t).length > 0)) && e.onStatsMediaData(n, t);
              }, 1e3),
            (e.trans = {
              ERROR_PRESENTATION_BY_ADMIN: '禁止抢双流',
              ERROR_SCREENSHARE_CANCELLED: '屏幕共享已取消',
              ERROR_CALL_FAILED: 'Call Failed: ',
              ERROR_WEBRTC_SUPPORT: '错误: 这个浏览器不支持WebRTC服务',
              ERROR_SCREENSHARE_EXTENSION: '错误: 屏幕共享扩展未找到.\n\n你是否想安装屏幕共享扩展?',
              ERROR_USER_MEDIA: '错误: 不能获取摄像头和麦克风授权.\n\n你是否允许? 或者有其他的应用正在使用摄像头?',
              ERROR_CPU_OVERLOAD: '喔噢~ 电脑卡顿，建议切换"流畅"清晰度',
              ERROR_PRESENTATION_ENDED: '演示结束',
              ERROR_DISCONNECTED_PRESENTATION: '远程演示已断开',
              ERROR_DISCONNECTED_SCREENSHARE: '远程屏幕共享已断开',
              ERROR_DISCONNECTED: '你已经断开远程会议',
              ERROR_CONNECTING_PRESENTATION: '演示流不可用',
              ERROR_CONNECTING_SCREENSHARE: '屏幕共享错误',
              ERROR_CONNECTING: '连接会议服务错误',
            });
        }
        function ZjFlashEventsClass(e) {
          this.call = e;
        }
        function ZjRTCStreamStatistics() {
          var e = this;
          (e.id = null),
            (e.lastPackets = 0),
            (e.lastLost = 0),
            (e.lastBytes = 0),
            (e.lastTimestamp = null),
            (e.recentTotal = 0),
            (e.recentLost = 0),
            (e.pctLost = []),
            (e.info = {});
        }
        function ZjRTCStatus() {
          var e = this;
          (e.failedCount = 0), (e.lastFrameDecoded = 0), (e.lastPacketsReceived = 0);
        }
        function ZjRTCStatistics(e) {
          var t = this;
          (t.videoBwe = new ZjRTCStreamStatistics()),
            1 == e
              ? ((t.shareScreenSend = new ZjRTCStreamStatistics()), (t.shareScreenRec = new ZjRTCStreamStatistics()))
              : ((t.audio_out = new ZjRTCStreamStatistics()),
                (t.audio_in = new ZjRTCStreamStatistics()),
                (t.video_out_1 = new ZjRTCStreamStatistics()),
                (t.video_out_2 = new ZjRTCStreamStatistics()),
                (t.video_in = new ZjRTCStreamStatistics()),
                (t.shareScreen = new ZjRTCStreamStatistics()),
                (t.recvStreams = {}),
                (t.uuid2Statistics = {}));
        }
        var _typeof =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? 'symbol' : typeof e;
                },
          _ = require('lodash'),
          version = '1.6.41',
          asyncFun = require('async'),
          UUID = require('uuid-js'),
          semver = require('semver'),
          MultiStreamsMixer = require('./MultiStreamsMixer'),
          ReconnectingWebSocket = require('reconnecting-websocket'),
          sdpTransform = require('./sdp-transform'),
          CODEC_VP9 = sdpTransform.CODEC_VP9,
          CODEC_VP8 = sdpTransform.CODEC_VP8,
          CODEC_H264_BASE = sdpTransform.CODEC_H264_BASE,
          CODEC_H264_PROFILE = sdpTransform.CODEC_H264_PROFILE,
          staticTool = require('./photoMediaStream'),
          SessionDescription = window.mozRTCSessionDescription || window.RTCSessionDescription,
          PeerConnection = window.mozRTCPeerConnection || window.webkitRTCPeerConnection || window.RTCPeerConnection;
        (StringBuffer.prototype.append = function (e) {
          return this.buffer.push(e), this;
        }),
          (StringBuffer.prototype.toString = function () {
            return this.buffer.join('');
          });
        var Base64 = {
          codex: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
          encode: function (e) {
            for (var t = new StringBuffer(), n = new Utf8EncodeEnumerator(e); n.moveNext(); ) {
              var a = n.current;
              n.moveNext();
              var r = n.current;
              n.moveNext();
              var o = n.current,
                s = a >> 2,
                i = ((3 & a) << 4) | (r >> 4),
                c = ((15 & r) << 2) | (o >> 6),
                d = 63 & o;
              isNaN(r) ? (c = d = 64) : isNaN(o) && (d = 64),
                t.append(this.codex.charAt(s) + this.codex.charAt(i) + this.codex.charAt(c) + this.codex.charAt(d));
            }
            return t.toString();
          },
          decode: function (e) {
            for (var t = new StringBuffer(), n = new Base64DecodeEnumerator(e); n.moveNext(); ) {
              var a = n.current;
              if (a < 128) t.append(String.fromCharCode(a));
              else if (a > 191 && a < 224) {
                n.moveNext();
                r = n.current;
                t.append(String.fromCharCode(((31 & a) << 6) | (63 & r)));
              } else {
                n.moveNext();
                var r = n.current;
                n.moveNext();
                var o = n.current;
                t.append(String.fromCharCode(((15 & a) << 12) | ((63 & r) << 6) | (63 & o)));
              }
            }
            return t.toString();
          },
        };
        (Utf8EncodeEnumerator.prototype = {
          current: Number.NaN,
          moveNext: function () {
            if (this._buffer.length > 0) return (this.current = this._buffer.shift()), !0;
            if (this._index >= this._input.length - 1) return (this.current = Number.NaN), !1;
            var e = this._input.charCodeAt(++this._index);
            return (
              13 == e && 10 == this._input.charCodeAt(this._index + 1) && ((e = 10), (this._index += 2)),
              e < 128
                ? (this.current = e)
                : e > 127 && e < 2048
                ? ((this.current = (e >> 6) | 192), this._buffer.push((63 & e) | 128))
                : ((this.current = (e >> 12) | 224), this._buffer.push(((e >> 6) & 63) | 128), this._buffer.push((63 & e) | 128)),
              !0
            );
          },
        }),
          (Base64DecodeEnumerator.prototype = {
            current: 64,
            moveNext: function () {
              if (this._buffer.length > 0) return (this.current = this._buffer.shift()), !0;
              if (this._index >= this._input.length - 1) return (this.current = 64), !1;
              var e = Base64.codex.indexOf(this._input.charAt(++this._index)),
                t = Base64.codex.indexOf(this._input.charAt(++this._index)),
                n = Base64.codex.indexOf(this._input.charAt(++this._index)),
                a = Base64.codex.indexOf(this._input.charAt(++this._index)),
                r = (e << 2) | (t >> 4),
                o = ((15 & t) << 4) | (n >> 2),
                s = ((3 & n) << 6) | a;
              return (this.current = r), 64 != n && this._buffer.push(o), 64 != a && this._buffer.push(s), !0;
            },
          }),
          (ZjRTCCall.prototype.sdpAddCandidates = function (e) {
            for (var t = this, n = [], a = 0; a < e.length; a++) {
              if (0 === e[a].lastIndexOf('m=', 0) || '' === e[a])
                for (var r = 0; r < t.ice_candidates.length; r++)
                  -1 === t.ice_candidates[r].indexOf('endOfCandidates') && n.push('a=' + t.ice_candidates[r]);
              if ((n.push(e[a]), 0 === e[a].indexOf('a=ssrc:') && e[a].indexOf('cname:') > 0)) {
                var o = e[a].substr(7, e[a].indexOf(' ') - 7);
                n.push('a=x-ssrc-range:' + o + '-' + (parseInt(o) + 99));
              }
            }
            return n;
          }),
          (ZjRTCCall.prototype.getHostCandidate = function (e, t) {
            for (var n = t; n < e.length; n++)
              if (0 === e[n].lastIndexOf('a=candidate', 0) && 'host' == e[n].substr(-4)) {
                var a = e[n].split(' ');
                return [a[4], a[5]];
              }
          }),
          (ZjRTCCall.prototype.sdpAddPLI = function (e) {
            for (var t, n, a, r = this, o = 'notinvideo', s = [], i = 0; i < e.length; i++) {
              var c = e[i];
              if (
                (0 === e[i].lastIndexOf('c=', 0) && '0.0.0.0' == e[i].substr(-7)
                  ? (t = r.getHostCandidate(e, i)) && (c = c.substr(0, c.length - 7) + t[0])
                  : 0 === e[i].lastIndexOf('m=', 0) &&
                    '9' == e[i].split(' ')[1] &&
                    (t = r.getHostCandidate(e, i)) &&
                    (((n = e[i].split(' '))[1] = t[1]), (c = n.join(' '))),
                'notinvideo' === o)
              )
                s.push(c), 0 === e[i].lastIndexOf('m=video', 0) && (o = 'invideo');
              else if ('invideo' === o) {
                if (
                  ((0 !== e[i].lastIndexOf('m=', 0) && '' !== e[i]) ||
                    (r.chrome_ver > 41 || r.firefox_ver > 44 || s.push('a=rtcp-fb:* nack pli'),
                    ('presentation' != r.call_type && 'screen' != r.call_type) || s.push('a=content:slides'),
                    0 !== e[i].lastIndexOf('m=video', 0) && (o = 'notinvideo')),
                  !r.h264_enabled && 0 === e[i].lastIndexOf('a=rtpmap:', 0) && e[i].lastIndexOf('H264') > 0)
                ) {
                  (a = (n = e[i].split(' '))[0].substr(n[0].indexOf(':') + 1)), 0 === e[i + 1].lastIndexOf('a=fmtp:' + a, 0) && i++;
                  continue;
                }
                if ((s.push(c), r.chrome_ver > 0 && r.allow_1080p && 0 === e[i].lastIndexOf('a=rtpmap:', 0)))
                  if (((n = e[i].split(' ')), (a = n[0].substr(n[0].indexOf(':') + 1)), e[i].lastIndexOf('VP8') > 0))
                    s.push('a=fmtp:' + a + ' max-fs=8160;max-fr=30');
                  else if (e[i].lastIndexOf('H264') > 0) {
                    for (; 0 === e[i + 1].lastIndexOf('a=rtcp-fb:' + a, 0); ) s.push(e[++i]);
                    0 === e[i + 1].lastIndexOf('a=fmtp:' + a, 0) &&
                      -1 === e[i + 1].lastIndexOf('max-fs') &&
                      s.push(e[++i] + ';max-br=3732;max-mbps=245760;max-fs=8192;max-smbps=245760;max-fps=3000;max-fr=30');
                  }
                0 === e[i].lastIndexOf('c=', 0) && s.push('b=AS:' + r.bandwidth_in);
              }
            }
            return s;
          }),
          (ZjRTCCall.prototype.sdpChangeBW = function (e) {
            for (var t = this, n = 'notinvideo', a = [], r = 0; r < e.length; r++) {
              if ((a.push(e[r]), 0 === e[r].lastIndexOf('m=video', 0))) n = 'invideo';
              else if ('invideo' === n)
                if (0 === e[r].lastIndexOf('c=', 0)) {
                  if (0 === e[r + 1].lastIndexOf('b=AS:', 0)) {
                    var o = e[r + 1];
                    (o = o.substr(o.indexOf(':') + 1)), parseInt(o) < t.bandwidth_out && (t.bandwidth_out = o), r++;
                  }
                  0 === e[r + 1].lastIndexOf('b=TIAS:', 0) && r++, a.push('b=AS:' + t.bandwidth_out), a.push('b=TIAS:' + 1e3 * t.bandwidth_out);
                } else (0 !== e[r].lastIndexOf('m=', 0) && '' !== e[r]) || (0 !== e[r].lastIndexOf('m=video', 0) && (n = 'notinvideo'));
              -1 != navigator.userAgent.indexOf('Chrome') && 0 === e[r].lastIndexOf('a=sendonly', 0) && a.push('a=sendrecv');
            }
            return a;
          }),
          (ZjRTCCall.prototype.createScrean = function (e, t) {
            function n() {
              try {
                if (!parent.isShiTong) {
                  a.parent.stopWhiteboard();
                }
              } catch (e) {
                a.parent.logDebug('[screen]:: set clayout and layout_status error!!');
              }
            }
            var a = this,
              r = {},
              o = {},
              s = a.parent.screenshare_width,
              i = a.parent.screenshare_height;
            if (
              (s > 1920 && (s = 1920),
              i > 1080 && (i = 1080),
              (o.maxWidth = s),
              (o.maxHeight = i),
              (o.maxFrameRate = a.parent.screenshare_fps.toString()),
              1 == e)
            ) {
              var c = window.setTimeout(function () {
                (a.legacy_screenshare = !0), a.getMedia();
              }, 800);
              (a.event_listener = function (e) {
                if (e.origin == window.location.origin)
                  if (e.data.type == a.parent.screenshare_api + 'Done') {
                    if (((o.chromeMediaSource = 'desktop'), (o.chromeMediaSourceId = e.data.sourceId), '' == e.data.sourceId))
                      return (
                        console.log('[screen]::cancle to acquire screen capture...'), void window.postMessage({ type: 'media-devices-error' }, '*')
                      );
                    (r.video = { mandatory: o, optional: [] }),
                      navigator.mediaDevices &&
                        navigator.mediaDevices.getUserMedia &&
                        navigator.mediaDevices
                          .getUserMedia(r)
                          .then(function (e) {
                            a.gumSuccess(e), window.postMessage({ type: 'media-devices-success' }, '*'), n();
                          })
                          .catch(function (e) {
                            console.log('[screen]::Unable to acquire screen capture', e.name, e.message),
                              a.localStream || window.postMessage({ type: 'media-devices-error', err: e }, '*');
                          });
                  } else
                    e.data.type == a.parent.screenshare_api + 'Pending'
                      ? window.clearTimeout(e.data.id)
                      : 'screenshareVersion' === e.data.type &&
                        ((a.parent.screenshare_version = e.data.version),
                        a.parent.onLog('[screen]::screenshare version is ' + a.parent.screenshare_version));
              }),
                window.addEventListener('message', a.event_listener),
                window.setTimeout(function () {
                  semver.gte(a.parent.screenshare_version, '1.0.7') && (a.parent.screenshare_api = 'zjGetScreen'),
                    window.postMessage({ type: a.parent.screenshare_api, id: +c }, '*');
                }, 500),
                window.postMessage({ type: 'checkScreenshareVersion' }, '*');
            } else
              (r.video = { mandatory: o, optional: [] }),
                navigator.mediaDevices
                  .getDisplayMedia(r)
                  .then(function (e) {
                    window.postMessage({ type: 'media-devices-success' }, '*'), a.gumSuccess(e), n();
                  })
                  .catch(function (e) {
                    console.log('Unable to acquire screen capture', e), window.postMessage({ type: 'media-devices-error', err: e }, '*');
                  });
          }),
          (ZjRTCCall.prototype.makeCall = function (e, t) {
            var n = this;
            if (
              ('UPDATING' != n.state && (n.state = 'ACTIVE'),
              (n.parent = e),
              (n.bandwidth_in = n.parent.bandwidth_in),
              (n.bandwidth_out = n.parent.bandwidth_out),
              n.parent.set_bandwidth_in < n.bandwidth_in && (n.bandwidth_in = n.parent.set_bandwidth_in),
              n.parent.set_bandwidth_out < n.bandwidth_out && (n.bandwidth_out = n.parent.set_bandwidth_out),
              (n.presentation_in_main = n.parent.presentation_in_main),
              (n.legacy_screenshare = null === n.parent.screenshare_api),
              (n.is_android = n.parent.is_android),
              (n.firefox_ver = n.parent.firefox_ver),
              (n.chrome_ver = n.parent.chrome_ver),
              (n.safari_ver = n.parent.safari_ver),
              (n.edge_ver = n.parent.edge_ver),
              (n.is_windows8 = n.parent.is_windows8),
              (n.h264_enabled = n.parent.h264_enabled),
              (n.allow_1080p = n.parent.allow_1080p),
              n.allow_1080p && 2 == n.parent.defaultBandwidth && (n.force_hd = 1080),
              -1 == n.parent.defaultBandwidth && (n.force_hd = 640),
              'presentation' == t)
            )
              return (n.call_type = t), (n.audio_source = !1), (n.video_source = !1), (n.recv_audio = !1), void n.onSetup();
            'audioonly' == t
              ? ((n.audio_source = n.parent.audio_source), (n.recv_audio = n.parent.recv_audio), (n.video_source = !1), (n.recv_video = !1))
              : t && 0 === t.indexOf('recvonly')
              ? ((n.audio_source = !1), (n.video_source = !1), 'recvonlyvideo' == t && (n.recv_audio = !1))
              : 'screen' == t
              ? ((n.call_type = t), (n.audio_source = !1), (n.recv_audio = !1), (n.recv_video = !1), n.bandwidth_out < 384 && (n.bandwidth_out = 384))
              : ((n.audio_source = n.parent.audio_source),
                (n.video_source = n.parent.video_source),
                (n.recv_audio = n.parent.recv_audio),
                (n.recv_video = n.parent.recv_video)),
              'screen' == t && ((n.chrome_ver < 73 && n.chrome_ver >= 34) || n.parent.isDesktopClient) && !n.legacy_screenshare
                ? n.localStream
                  ? n.gumSuccess(n.localStream)
                  : n.createScrean(1)
                : 'screen' == t && !n.parent.isDesktopClient && n.chrome_ver >= 73 && !n.legacy_screenshare
                ? n.localStream
                  ? n.gumSuccess(n.localStream)
                  : n.createScrean()
                : n.getMedia();
          }),
          (ZjRTCCall.prototype.sendRequest = function (e, t, n, a) {
            var r = this,
              o = !1 !== n,
              s = new XMLHttpRequest(),
              i = 'https://' + r.parent.node + '/api/services/' + r.parent.conference + '/participants/' + r.parent.uuid + '/' + e;
            if (
              (r.parent.onLog('ZjRTCCall.sendRequest', e, t, i),
              s.open('POST', i, o),
              n && (s.onload = n),
              void 0 === a && (a = 0),
              (s.onerror = function () {
                ++a > 10 || !1 === n
                  ? r.onError(r.parent.trans.ERROR_CONNECTING)
                  : setTimeout(function () {
                      r.sendRequest(e, t, n, a);
                    }, 500 * a);
              }),
              (s.ontimeout = function () {
                ++a > 10 || !1 === n
                  ? r.onError(r.parent.trans.ERROR_CONNECTING)
                  : setTimeout(function () {
                      r.sendRequest(e, t, n, a);
                    }, 500 * a);
              }),
              r.parent.token && s.setRequestHeader('token', r.parent.token),
              r.parent.basic_username &&
                r.parent.basic_password &&
                s.setRequestHeader('Authorization', 'Basic ' + Base64.encode(r.parent.basic_username + ':' + r.parent.basic_password)),
              t ? (s.setRequestHeader('Content-type', 'application/json'), s.send(JSON.stringify(t))) : s.send(),
              !1 === n)
            ) {
              r.parent.onLog('ZjRTCCall.sendRequest response', s.responseText);
              var c = {};
              try {
                c = JSON.parse(s.responseText);
              } catch (e) {
                c.reason = s.status + ' ' + s.statusText;
              }
              return (c.http_status = s.status), c;
            }
          }),
          (ZjRTCCall.prototype.handleError = function (e) {
            var t = this;
            'DISCONNECTING' != t.state &&
              ((t.state = 'DISCONNECTING'),
              t.cleanup(),
              t.onError &&
                ('presentation' == t.call_type || 'screen' == t.call_type
                  ? t.onError(e)
                  : (e.hasOwnProperty('message') && (e = e.message), t.onError(t.parent.trans.ERROR_CALL_FAILED + e))));
          }),
          (ZjRTCCall.prototype.getMedia = function (e) {
            var t = this;
            if ('screen' == t.call_type && t.chrome_ver >= 34 && !t.legacy_screenshare) {
              if (!e) return t.handleError(t.parent.trans.ERROR_SCREENSHARE_CANCELLED);
              t.video_source = e;
            }
            if (t.localStream) {
              window.URL || window.webkitURL || window.mozURL;
              return t.onSetup(t.localStream);
            }
            if (t.localStream || (!1 === t.audio_source && !1 === t.video_source))
              (t.localStream = t.parent.muteStream),
                (t.localStreamSmall = t.parent.muteStream.clone()),
                (t.localTrack2Id = { small: t.localStreamSmall.getVideoTracks()[0].id, big: t.parent.muteStream.getVideoTracks()[0].id }),
                t.onSetup();
            else {
              var n = !1 !== t.audio_source,
                a = {};
              'screen' == t.call_type
                ? (t.video_source
                    ? ((a.chromeMediaSource = 'desktop'), (a.chromeMediaSourceId = t.video_source))
                    : t.firefox_ver > 32
                    ? ((a.mozMediaSource = t.call_type), (a.mediaSource = t.call_type))
                    : ((a.chromeMediaSource = t.call_type), t.chrome_ver < 50 && (a.googLeakyBucket = !0)),
                  (a.maxWidth = t.parent.screenshare_width),
                  (a.maxHeight = t.parent.screenshare_height),
                  (a.maxFrameRate = t.parent.screenshare_fps.toString()))
                : t.firefox_ver > 43 || t.edge_ver > 10527
                ? t.force_hd > 0 && -1 != navigator.userAgent.indexOf('OS X')
                  ? ((a.width = { min: 1280 }), (a.height = { min: 720 }), 1080 == t.force_hd && ((a.width.ideal = 1920), (a.height.ideal = 1080)))
                  : ((a.width = { ideal: 1280 }), (a.height = { ideal: 720 }), 1080 == t.force_hd && ((a.width.max = 1920), (a.height.max = 1080)))
                : t.chrome_ver > 56 && !t.is_android && !t.is_windows8
                ? 1080 == t.force_hd
                  ? ((a.width = { ideal: 1920 }), (a.height = { ideal: 1080 }), (a.frameRate = { ideal: 30 }))
                  : 720 == t.force_hd
                  ? ((a.width = { ideal: 1280 }), (a.height = { ideal: 720 }), (a.frameRate = { ideal: 30 }))
                  : 540 == t.force_hd
                  ? ((a.width = { ideal: 960 }), (a.height = { ideal: 540 }), (a.frameRate = { ideal: 25 }))
                  : ((a.width = { ideal: 640 }), (a.height = { ideal: 360 }), (a.frameRate = { ideal: 25 }))
                : t.safari_ver >= 11
                ? 1080 == t.force_hd
                  ? ((a.width = 1920), (a.height = 1080))
                  : 720 == t.force_hd
                  ? ((a.width = 1280), (a.height = 720))
                  : 540 == t.force_hd && ((a.width = 960), (a.height = 540), (a.frameRate = { ideal: 25, max: 25 }))
                : 1080 == t.force_hd && (t.chrome_ver >= 34 || t.safari_ver > 10)
                ? ((a.minWidth = '1920'), (a.minHeight = '1080'), (a.maxFrameRate = 30))
                : 720 == t.force_hd
                ? ((a.minWidth = '1280'), (a.minHeight = '720'), (a.maxFrameRate = 30))
                : 540 == t.force_hd
                ? ((a.minWidth = '960'), (a.minHeight = '540'), (a.maxFrameRate = 25))
                : 360 == t.force_hd && ((a.minWidth = '640'), (a.minHeight = '360'), (a.maxFrameRate = 25)),
                t.chrome_ver >= 38 &&
                  t.chrome_ver < 49 &&
                  t.bandwidth_out > 384 &&
                  ((a.googHighBitrate = !0), t.bandwidth_out > 960 && (a.googVeryHighBitrate = !0)),
                t.audio_source &&
                  n &&
                  (n =
                    t.chrome_ver > 49
                      ? { mandatory: { sourceId: t.audio_source }, optional: [] }
                      : t.firefox_ver > 43 || t.edge_ver > 10527
                      ? { deviceId: t.audio_source }
                      : { optional: [{ sourceId: t.audio_source }] }),
                t.chrome_ver >= 38 && t.chrome_ver < 57
                  ? (n && !n.optional && (n = { optional: [] }),
                    n &&
                      (n.optional.push({ googEchoCancellation: !0 }),
                      n.optional.push({ googEchoCancellation2: !0 }),
                      n.optional.push({ googAutoGainControl: !0 }),
                      n.optional.push({ googAutoGainControl2: !0 }),
                      n.optional.push({ googNoiseSuppression: !0 }),
                      n.optional.push({ googNoiseSuppression2: !0 }),
                      n.optional.push({ googHighpassFilter: !0 })))
                  : t.chrome_ver >= 57 &&
                    (!0 === n && (n = { mandatory: { sourceId: 'default' }, optional: [] }),
                    n &&
                      (n.optional.push({ googEchoCancellation: !0 }),
                      n.optional.push({ googExperimentalEchoCancellation: !0 }),
                      n.optional.push({ googAutoGainControl: !0 }),
                      n.optional.push({ googExperimentalAutoGainControl: !0 }),
                      n.optional.push({ googNoiseSuppression: !0 }),
                      n.optional.push({ googNoiseSuppression2: !0 }),
                      n.optional.push({ googExperimentalNoiseSuppression: !0 }),
                      n.optional.push({ googHighpassFilter: !0 }),
                      n.optional.push({ googAudioMirroring: !1 }),
                      n.optional.push({ echoCancellationType: 'aec3' })));
              var r = { audio: n };
              if (
                ((t.chrome_ver > 56 && !t.is_android) || t.firefox_ver > 32 || t.edge_ver > 10527 || t.safari_ver >= 11 || t.parent.isDesktopClient
                  ? (r.video = a)
                  : (r.video = { mandatory: a, optional: [] }),
                t.video_source &&
                  ((t.chrome_ver > 56 && t.chrome_ver < 66 && !t.is_android) || t.firefox_ver > 43 || t.edge_ver > 10527
                    ? (r.video.deviceId = t.video_source)
                    : t.safari_ver >= 11 || (t.chrome_ver > 65 && !t.is_android)
                    ? (r.video.deviceId = { exact: t.video_source })
                    : t.chrome_ver > 66
                    ? (r.video.mandatory.sourceId = t.video_source)
                    : (r.video.optional = [{ sourceId: t.video_source }])),
                t.chrome_ver > 49 &&
                  !t.call_type &&
                  t.parent.powerLineFrequency > 0 &&
                  r.video.optional.push({ googPowerLineFrequency: t.parent.powerLineFrequency }),
                !1 === t.video_source && (r.video = !1),
                t.parent.onLog('big_staram_constraints', r),
                (t.parent.constraints = r),
                !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia)
              )
                return t.handleError(t.parent.trans.ERROR_WEBRTC_SUPPORT);
              navigator.mediaDevices
                .getUserMedia(r)
                .then(function (e) {
                  if (r.video && t.parent.simulcast && 'screen' !== t.call_type) {
                    var n = {};
                    (n.video = {
                      width: { ideal: t.parent.smallMaxWidth, max: t.parent.smallMaxWidth },
                      height: { ideal: t.parent.smallMaxHeigh, max: t.parent.smallMaxHeigh },
                      frameRate: { ideal: t.parent.smallMaxFrameRate, max: t.parent.smallMaxFrameRate },
                    }),
                      t.video_source &&
                        ((t.chrome_ver > 56 && t.chrome_ver < 66 && !t.is_android) || t.firefox_ver > 43 || t.edge_ver > 10527
                          ? (n.video.deviceId = t.video_source)
                          : t.safari_ver >= 11 || (t.chrome_ver > 65 && !t.is_android)
                          ? (n.video.deviceId = { exact: t.video_source })
                          : t.chrome_ver > 49
                          ? (n.video.mandatory.sourceId = t.video_source)
                          : (n.video.optional = [{ sourceId: t.video_source }])),
                      (n.audio = !1),
                      t.parent.onLog('small_staram_constraints', n),
                      navigator.mediaDevices.getUserMedia(n).then(function (n) {
                        (t.localStreamSmall = n),
                          (t.localTrack2Id = { small: n.getVideoTracks()[0].id, big: e.getVideoTracks()[0].id }),
                          t.gumSuccess(e);
                      });
                  } else
                    !1 === t.video_source &&
                      ((t.localStreamSmall = t.parent.muteStream.clone()),
                      (t.localTrack2Id = { small: t.localStreamSmall.getVideoTracks()[0].id, big: t.parent.muteStream.getVideoTracks()[0].id })),
                      t.gumSuccess(e);
                })
                .catch(function (e) {
                  t.gumError(e);
                });
            }
          }),
          (ZjRTCCall.prototype.gumSuccess = function (e) {
            var t = this;
            t.localStream = e;
            window.URL || window.webkitURL || window.mozURL;
            t.onSetup(e);
            try {
              t.createAudioContext(e);
            } catch (e) {
              t.parent.onLog('Unable to create audio context', e);
            }
          }),
          (ZjRTCCall.prototype.createAudioContext = function (e) {
            var t = this,
              n = window.AudioContext || window.webkitAudioContext || void 0;
            if (!1 !== t.audio_source && void 0 !== n && n.prototype.createMediaStreamSource) {
              t.audioContext || (t.audioContext = new n()),
                t.audioContext.resume && t.audioContext.resume(),
                t.analyser || (t.analyser = t.audioContext.createAnalyser()),
                (t.microphone = t.audioContext.createMediaStreamSource(e)),
                (t.analyser.smoothingTimeConstant = 0.1),
                (t.analyser.fftSize = 512),
                t.microphone.connect(t.analyser);
              var a = function () {
                var e = new Uint8Array(t.analyser.frequencyBinCount);
                t.analyser.getByteFrequencyData(e);
                for (var n = 0, a = e.length, r = 0; r < a; r++) n += e[r];
                var o = n / a;
                null !== t.parent.onMicActivity && t.parent.onMicActivity(o);
              };
              t.audioRTCInterval = setInterval(a, 250);
            }
          }),
          (ZjRTCCall.prototype.gumError = function (e) {
            var t = this;
            if ((t.parent.onLog('getUserMedia error', e), 'screen' == t.call_type)) t.cleanup(), t.onScreenshareMissing();
            else {
              if (1080 == t.force_hd) return (t.force_hd = 720), t.getMedia();
              if (720 == t.force_hd) return (t.force_hd = 540), t.getMedia();
              if (540 == t.force_hd) return (t.force_hd = 0), t.getMedia();
              if (!1 == !t.audio_source || !1 == !t.video_source)
                return (
                  (t.audio_source = !1),
                  t.errorIndex ? (t.errorIndex = 0) : (t.errorIndex += 1),
                  3 == t.errorIndex && ((t.audio_source = !1), (t.video_source = !1)),
                  t.getMedia()
                );
              t.parent.event_error && t.parent.event_error(t.pc, t.parent.conference, 'getUserMedia', e);
            }
          }),
          (ZjRTCCall.prototype.connect = function () {
            var e = this,
              t = {},
              n = {};
            if (
              (_.extend(t, e.parent.pcConfig, { sdpSemantics: 'plan-b' }),
              e.parent.isShiTong && _.extend(n, e.parent.pcConstraints, { optional: [{ DtlsSrtpKeyAgreement: !1 }] }),
              e.parent.pcConfig,
              (e.pc = new PeerConnection(t, n)),
              (e.pc.onicecandidate = function (t) {
                e.pcIceCandidate(t);
              }),
              (e.pc.oniceconnectionstatechange = function (t) {
                e.pcIceCeconnectionstatechange(t);
              }),
              (e.pc.ontrack = function (t) {
                e.pcTrack(t);
              }),
              e.parent.simulcast ||
                ((e.pc.onaddstream = function (t) {
                  e.pcAddStream(t);
                }),
                (e.pc.onremovestream = function (t) {
                  e.pcRemoveStream(t);
                })),
              'screen' == e.call_type)
            ) {
              var a = function () {
                e.parent.call;
                e.parent.logDebug('[screen]::screen stream inactive - stop recording!'),
                  e.parent.simulcast && !e.parent.prvSdk && e.parent.setClayoutOrder(2),
                  window.postMessage({ type: 'media-devices-error' }, '*');
              };
              e.localStream || e.parent.onLog('[screen]:: screen is error screen.stream is null'),
                e.chrome_ver < 50 ? (e.localStream.onended = a) : (e.localStream.oninactive = a);
            }
            if (e.localStream)
              if (e.parent.pipEnable) {
                if (!MultiStreamsMixer) throw new Error('Please load "MultiStreamsMixer.js" before zjrtc.js.');
                (e.localStream.width = 1280),
                  (e.localStream.height = 720),
                  (e.parent.mixer = new MultiStreamsMixer([e.localStream])),
                  (e.parent.mixer.frameInterval = 1),
                  e.parent.mixer.startDrawingFrames(),
                  e.chrome_ver > 49
                    ? e.pc.addStream(e.parent.mixer.getMixedStream())
                    : (e.pc.addTrack(e.parent.mixer.getMixedStream().getVideoTracks()[0], e.localStream),
                      e.pc.addTrack(e.parent.mixer.getMixedStream().getAudioTracks()[0], e.localStream));
              } else
                !e.parent.simulcast && 0 === e.firefox_ver && e.chrome_ver < 65 && 0 == e.safari_ver
                  ? e.pc.addStream(e.localStream)
                  : (e.localStream.getVideoTracks().length > 0
                      ? (e.bigTrackSender = e.pc.addTrack(e.localStream.getVideoTracks()[0], e.localStream))
                      : (e.bigTrackSender = e.pc.addTrack(e.parent.muteStream.getVideoTracks()[0], e.parent.muteStream)),
                    e.localStream.getAudioTracks().length > 0 &&
                      (e.smallAudioTrackSender = e.pc.addTrack(e.localStream.getAudioTracks()[0], e.localStream)),
                    e.localStreamSmall &&
                      e.parent.simulcast &&
                      (e.smallTrackSender = e.pc.addTrack(e.localStreamSmall.getVideoTracks()[0], e.localStream)));
            e.parent.event_newPC &&
              e.parent.event_newPC(e.pc, e.parent.uuid, e.parent.conference, e.call_type, function () {
                e.pcCreateOffer();
              }),
              e.pcCreateOffer();
          }),
          (ZjRTCCall.prototype.pcCreateOffer = function () {
            var e = this,
              t = {};
            (t =
              e.chrome_ver > 49 || e.firefox_ver > 42 || e.edge_ver > 10527
                ? { offerToReceiveAudio: e.recv_audio, offerToReceiveVideo: e.recv_video }
                : { mandatory: { OfferToReceiveAudio: e.recv_audio, OfferToReceiveVideo: e.recv_video } }),
              setTimeout(function () {
                'ACTIVE' == e.state &&
                  0 === e.parent.safari_ver &&
                  0 === e.parent.firefox_ver &&
                  ((e.state = 'CONNECTING'),
                  e.parent.onLog('Timed out gathering candidates', e.pc.localDescription.sdp),
                  e.pcOfferCreated(e.pc.localDescription));
              }, 15e3),
              e.pc.createOffer(
                function (t) {
                  e.pcOfferCreated(t);
                },
                function (t) {
                  e.parent.event_error && e.parent.event_error(e.pc, e.parent.conference, 'createOffer', t, e.pc.localDescription), e.handleError(t);
                },
                t,
              );
          }),
          (ZjRTCCall.prototype.pcIceCandidate = function (e) {
            var t = this;
            t.parent.onLog('Ice Gathering State', t.pc.iceGatheringState),
              e.candidate
                ? (t.parent.onLog('Gathered ICE candidate', e.candidate.candidate),
                  t.ice_candidates.push(e.candidate.candidate),
                  t.parent.safari_ver > 0 &&
                    'ACTIVE' == t.state &&
                    -1 === t.pc.localDescription.sdp.search('m=video 9') &&
                    ((t.state = 'CONNECTING'),
                    t.parent.onLog('safari begining connecting ', { candidates: t.pc.localDescription.sdp }),
                    setTimeout(function () {
                      t.pcOfferCreated(t.pc.localDescription);
                    }, 200)))
                : 'complete' == t.pc.iceGatheringState &&
                  'ACTIVE' == t.state &&
                  ((t.state = 'CONNECTING'),
                  t.parent.onLog('Finished gathering candidates', { candidates: t.pc.localDescription.sdp }),
                  0 === t.parent.firefox_ver &&
                    setTimeout(function () {
                      t.pcOfferCreated(t.pc.localDescription);
                    }, 200));
          }),
          (ZjRTCCall.prototype.pcIceCeconnectionstatechange = function (e) {
            var t = this;
            t.parent.onLog('[pcIceCeconnectionstatechange]::', t.pc.iceConnectionState);
            var n = 1;
            if (t.pc.iceConnectionState)
              switch (t.pc.iceConnectionState) {
                case 'disconnected':
                  t.pc.iceDisconnected = !0;
                  break;
                case 'failed':
                  (t.pc.iceDisconnected = !1), (n = 0);
                  break;
                default:
                  (t.pc.iceDisconnected = !1), (n = 1);
              }
            t.parent.onMediaICEState && 'screen' != t.call_type && 'presentation' != t.call_type && t.parent.onMediaICEState(n);
          }),
          (ZjRTCCall.prototype.mutateOffer = function (e) {
            var t = this,
              n = e.sdp.split('\r\n');
            t.edge_ver > 10527 && (n = t.sdpAddCandidates(n));
            var a = (n = t.sdpAddPLI(n)).join('\r\n');
            return t.parent.onLog('Mutated offer', { offer: a }), new SessionDescription({ type: 'offer', sdp: a });
          }),
          (ZjRTCCall.prototype.mutateOfferSDP = function (e) {
            var t = this,
              n = e;
            return (
              t.parent.andriod_ver > 0 && t.parent.qq_ver > 0 && (sdpTransform.defaultEnv.redEnable = !1),
              (n = t.parent.forceCodec
                ? sdpTransform.uniformOfferSDPCodecsPayload(e, [t.parent.forceCodec])
                : sdpTransform.uniformOfferSDPCodecsPayload(e, [CODEC_H264_BASE, CODEC_VP8, CODEC_VP9])),
              t.parent.firefox_ver > 0 && (n = sdpTransform.uniformOfferSDPCodecsPayload(e, [CODEC_VP8])),
              t.parent.simulcast &&
                'presentation' !== t.call_type &&
                'screen' !== t.call_type &&
                (n = sdpTransform.changeStreamSsrc(n, t.localTrack2Id.small, t.localTrack2Id.big)),
              (n = sdpTransform.alterAudioSampleRateAndChannels(n, 16e3, !1)),
              t.parent.onLog('Mutated offer SDP', { offer: n }),
              n
            );
          }),
          (ZjRTCCall.prototype.mutateAnswerSDP = function (e, t) {
            var n = this,
              a = e;
            return (
              (a = n.parent.isMobile
                ? sdpTransform.rearrangeAnswerPayloadOrder(a, [CODEC_VP8, CODEC_H264_BASE, CODEC_VP9])
                : sdpTransform.rearrangeAnswerPayloadOrder(a, [CODEC_H264_BASE, CODEC_VP8, CODEC_VP9])),
              (a = sdpTransform.alterAudioSampleRateAndChannels(a, 16e3, !1)),
              n.parent.onLog('Mutated answer SDP', { answer: a }),
              a
            );
          }),
          (ZjRTCCall.prototype.pcTrack = function (e) {
            var t = this;
            t.static.trackid2stream || (t.static.trackid2stream = {}), t.parent.onLog('pcTrack added stream.id:', e.streams[0].id);
            var n = e.streams[0];
            n.id === t.defaultStreamId || 'screen' == t.call_type
              ? t.static.hasDefaultStream || (t.pcAddStream(n), (t.static.hasDefaultStream = !0))
              : (t.pcAddStream(n),
                (e.track.onended = function (e) {
                  var n = t.static.trackid2stream[e.target.id];
                  t.parent.onLog('pcTrack removed stream.id:', n.id);
                  var a = t.msid2uuid[n.id];
                  0 === a.indexOf('presentation_')
                    ? ((t.presentationStream = null), t.onRemovePresentationStream(a.slice('presentation_'.length)))
                    : (t.onRemoveStream(a), t.parent.activeParticipants.delete(a)),
                    t.pcRemoveStream(n),
                    delete t.static.trackid2stream[e.target];
                }),
                (t.static.trackid2stream[e.track.id] = n));
          }),
          (ZjRTCCall.prototype.pcAddStream = function (e) {
            var t = this;
            if (
              (t.parent.onLog('Stream added', e.id),
              !1 === t.recv_audio && !1 === t.recv_video && t.localStream ? (t.stream = t.localStream) : (t.stream = e),
              'CONNECTED' == t.state)
            ) {
              window.URL || window.webkitURL || window.mozURL;
              if (t.parent.simulcast) {
                var n = t.msid2uuid[e.id];
                n
                  ? 0 === n.indexOf('presentation_')
                    ? ((t.presentationStream = t.stream), t.onPresentationStream(t.stream, n.slice('presentation_'.length)), t.parent.ssrcUpdated())
                    : (t.parent.activeParticipants.has(n)
                        ? t.onUpdateStream(t.stream, t.call_uuid, n, t.msid2ssrc[e.id])
                        : t.onConnect(t.stream, t.call_uuid, n, t.msid2ssrc[e.id]),
                      t.parent.logVerbose(n ? 'Update' : 'Add', ' stream ' + n + ' ' + t.msid2ssrc[e.id] + ' ' + e),
                      t.parent.ssrcUpdated(),
                      t.parent.activeParticipants.add(n),
                      t.parent.stats.recvStreams[t.msid2ssrc[e.id]] && delete t.parent.stats.recvStreams[t.msid2ssrc[e.id]])
                  : t.onConnect(t.stream, t.call_uuid);
              } else t.onConnect(t.stream, t.call_uuid);
            }
            (t.state = 'CONNECTED'), t.parent.logVerbose('[stream] pcAddStream, ', e.id);
          }),
          (ZjRTCCall.prototype.processLayoutPresentation = function (e) {
            return (
              e.participants.push('presentation_' + e.presentation.uuid),
              e.ssrcs.push(e.presentation.ssrc),
              (e.rtx_ssrcs_map[e.presentation.ssrc] = e.presentation.rtxSsrc),
              e
            );
          }),
          (ZjRTCCall.prototype.removeStreamsWithParticipants = function (e) {
            for (var t = this, n = 0; n < e.length; n++)
              0 === e[n].indexOf('presentation_')
                ? t.onRemovePresentationStream(e[n].slice('presentation_'.length))
                : (t.onRemoveStream(e[n]), t.parent.activeParticipants.delete(e[n]));
          }),
          (ZjRTCCall.prototype.pcRemoveStream = function (e) {
            var t = this;
            t.parent.onLog('Stream removed', e.id);
            var n = t.msid2uuid[e.id],
              a = t.parent.currentParticipants.indexOf(n);
            if (n && !a && t.parent.simulcast) {
              r = t.msid2ssrc[e.id];
              t.parent.stats.recvStreams[r] && delete t.parent.stats.recvStreams[r],
                delete t.parent.stats.uuid2Statistics[n],
                t.parent.onLog('Remove streamid: ' + e.id + ' owner uuid:' + n);
            }
            if (t.parent.simulcast) {
              t.parent.ssrcUpdated();
              var r = t.msid2ssrc[e.id];
              delete t.msid2uuid[e.id], delete t.msid2ssrc[e.id], delete t.ssrc2uuid[r];
            }
            t.parent.logVerbose('[stream] pcRemoveStream', e.id);
          }),
          (ZjRTCCall.prototype.pcOfferCreated = function (e) {
            var t = this,
              n = e.sdp;
            t.parent.onLog('Created offer', { offer: e.sdp });
            var a = t.mutateOfferSDP(e.sdp);
            if (
              ((e = new SessionDescription({ type: 'offer', sdp: a })),
              t.pc.setLocalDescription(
                e,
                function () {
                  t.parent.onLog('Local description active');
                },
                function (n) {
                  t.parent.event_error && t.parent.event_error(t.pc, t.parent.conference, 'setLocalDescription', n, e),
                    t.parent.onLog('Local description failed', n);
                },
              ),
              'CONNECTING' == t.state && -1 == n.search('m=video 9 UDP/TLS/RTP/SAVPF') && -1 == n.search('m=audio 9 UDP/TLS/RTP/SAVPF'))
            ) {
              var r = { call_type: 'WEBRTC', sdp: t.mutateOffer(e).sdp };
              t.parent.simulcast &&
                ((r.multistream = !0),
                (r.clayout = t.parent.clayout),
                (r.simulcast = !0),
                t.parent.isShiTong && t.parent.ext_layout && (r.ext_layout = !0)),
                'screen' == t.call_type
                  ? (r.present = 'send')
                  : 'presentation' == t.call_type
                  ? (r.present = 'receive')
                  : t.presentation_in_main && (r.present = 'main'),
                t.parent.isShiTong && (t.parent.isShiTongOnline || t.parent.isshitongChange)
                  ? (delete t.parent.isShiTongOnline,
                    delete t.parent.isshitongChange,
                    t.sendRequest('calls/' + t.call_uuid + '/update', r, function (e) {
                      t.processAnswer(e);
                    }))
                  : t.sendRequest('calls', r, function (e) {
                      t.processAnswer(e);
                    });
            } else 'CONNECTING' == t.state && t.handleError('通讯参数收集有误，请重试！');
          }),
          (ZjRTCCall.prototype.setClayout = function (e, t) {
            var n = this,
              a = { clayout: e };
            (t = t || n.call_uuid), n.sendRequest('calls/' + t + '/clayout', a);
          }),
          (ZjRTCCall.prototype.processAnswer = function (e) {
            var t,
              n = this;
            try {
              t = JSON.parse(e.target.responseText);
            } catch (t) {
              return n.handleError('Unexpected Response: ' + e.target.status + ' ' + e.target.statusText);
            }
            if (200 != e.target.status) return n.handleError(t.result || t.reason);
            if (
              (n.parent.onLog('Received answer: ', { answer: t.result.sdp }),
              (n.call_uuid = t.result.call_uuid),
              (n.defaultStreamId = sdpTransform.getDefaultStreamId(t.result.sdp)),
              'DISCONNECTING' != n.state)
            ) {
              var a = t.result.sdp.split('\r\n'),
                r = (a = n.sdpChangeBW(a)).join('\r\n');
              n.parent.isShiTong || (r = n.mutateAnswerSDP(r)),
                n.pc.setRemoteDescription(
                  new SessionDescription({ type: 'answer', sdp: r }),
                  function () {
                    n.parent.onLog('Remote description active'),
                      (n.parent.isShiTong || n.parent.isReturnOnline) && n.parent.setClayoutOrder(1),
                      n.edge_ver > 10527 && n.sdpIceCandidates(a),
                      !1 === n.recv_audio &&
                        !1 === n.recv_video &&
                        n.chrome_ver > 47 &&
                        n.localStream &&
                        !n.parent.simulcast &&
                        n.pcTrack({ streams: [n.localStream] }),
                      n.sendRequest('calls/' + n.call_uuid + '/ack', null, function () {
                        if (((n.parent.ack = !0), 'CONNECTED' == n.state)) {
                          window.URL || window.webkitURL || window.mozURL;
                          n.onConnect(n.stream, n.call_uuid);
                        }
                        (n.state = 'CONNECTED'), n.isupdateBitrate || (n.updateUploadBitrate('high'), (n.isupdateBitrate = !0));
                      });
                  },
                  function (e) {
                    n.parent.event_error && n.parent.event_error(n.pc, n.parent.conference, 'setRemoteDescription', e, r),
                      n.parent.onLog('Remote description failed', e),
                      n.handleError(e.message);
                  },
                );
            }
          }),
          (ZjRTCCall.prototype.updateUploadBitrate = function (e) {
            var t = this,
              n = t.bigTrackSender,
              a = t.smallTrackSender;
            if (n) {
              var r = n.getParameters();
              if ('screen' == t.call_type && n) return (r.encodings[0].maxBitrate = 1024e3), void n.setParameters(r);
              if (t.mutedVideo)
                return (
                  (r.encodings[0].maxFramerate = 25),
                  n.track.applyConstraints({ frameRate: { max: 25 }, height: { min: 1280 }, width: { min: 720 } }),
                  void n.setParameters(r)
                );
              var o = 1024e3;
              switch ((2 == t.parent.defaultBandwidth && (o = 1536e3), e)) {
                case 'high':
                  2 == t.parent.defaultBandwidth
                    ? ((r.encodings[0].maxBitrate = o),
                      (r.encodings[0].maxFramerate = 30),
                      (r.encodings[0].networkPriority = 'high'),
                      (r.encodings[0].priority = 'high'),
                      n.track.applyConstraints({ frameRate: { max: 30 }, height: { max: 1080, ideal: 720 }, width: { max: 1920, ideal: 1280 } }))
                    : ((r.encodings[0].maxBitrate = o),
                      (r.encodings[0].maxFramerate = 25),
                      (r.encodings[0].networkPriority = 'high'),
                      (r.encodings[0].priority = 'high'),
                      n.track.applyConstraints({ frameRate: { max: 25 }, height: { max: 540, ideal: 540 }, width: { max: 960, ideal: 960 } }));
                  break;
                case 'medium':
                  (r.encodings[0].maxBitrate = 0.5 * o),
                    (r.encodings[0].maxFramerate = 20),
                    (r.encodings[0].networkPriority = 'medium'),
                    (r.encodings[0].priority = 'medium'),
                    n.track.applyConstraints({ frameRate: { max: 20 }, height: { max: 360 }, width: { max: 640 } });
                  break;
                case 'low':
                default:
                  (r.encodings[0].maxBitrate = 0.3 * o),
                    (r.encodings[0].maxFramerate = 15),
                    (r.encodings[0].networkPriority = 'low'),
                    (r.encodings[0].priority = 'low'),
                    n.track.applyConstraints({ frameRate: { max: 15 }, height: { max: 360 }, width: { max: 640 } });
              }
              if ((n.setParameters(r), t.parent.onLog('bigSender_settings_over', r), a)) {
                var s = a.getParameters();
                if (s.encodings.length <= 0) return;
                if (t.parent.smallMaxHeigh > 180 || t.parent.smallMaxWidth > 360 || t.parent.smallMaxFrameRate > 15)
                  switch (e) {
                    case 'high':
                      s.encodings[0].maxBitrate = 8e5;
                      break;
                    case 'medium':
                      s.encodings[0].maxBitrate = 4e5;
                      break;
                    case 'low':
                    default:
                      s.encodings[0].maxBitrate = 2e5;
                  }
                else s.encodings[0].maxBitrate = 12e4;
                a.setParameters(s), t.parent.onLog('smallSender_settings_over', s);
              }
            }
          }),
          (ZjRTCCall.prototype.sdpIceCandidates = function (e) {
            for (var t, n = this, a = -1, r = 0; r < e.length; r++)
              0 === e[r].lastIndexOf('a=candidate', 0)
                ? ((t = { sdpMLineIndex: a, candidate: e[r].substr(2) }), n.pc.addIceCandidate(t))
                : (0 !== e[r].lastIndexOf('m=', 0) && '' !== e[r]) ||
                  (a > -1 && ((t = { sdpMLineIndex: a, candidate: 'candidate:1 1 udp 1 0.0.0.0 9 typ endOfCandidates' }), n.pc.addIceCandidate(t)),
                  a++);
          }),
          (ZjRTCCall.prototype.remoteDisconnect = function (e) {
            var t = this;
            if ('DISCONNECTING' != t.state) {
              (t.state = 'DISCONNECTING'), t.cleanup();
              var n;
              'presentation' == t.call_type
                ? ((n = t.parent.trans.ERROR_DISCONNECTED_PRESENTATION), 'reason' in e && (n += ': ' + e.reason))
                : 'screen' == t.call_type
                ? ((n = t.parent.trans.ERROR_DISCONNECTED_SCREENSHARE), 'reason' in e && (n += ': ' + e.reason))
                : (n = 'reason' in e ? e.reason : t.parent.trans.ERROR_DISCONNECTED),
                t.onDisconnect(n);
            } else 'screen' == t.call_type && (n = t.parent.trans.ERROR_SCREENSHARE_CANCELLED), t.onDisconnect(n);
          }),
          (ZjRTCCall.prototype.muteAudio = function (e) {
            var t = this;
            if (e === t.mutedAudio) return t.mutedAudio;
            var n = [];
            n = [t.localStream];
            for (var a = 0; a < n.length; a++) for (var r = n[a].getAudioTracks(), o = 0; o < r.length; o++) r[o].enabled = t.mutedAudio;
            return (
              (t.mutedAudio = !t.mutedAudio),
              t.parent.event_event && t.parent.event_event(t.pc, t.parent.conference, t.mutedAudio ? 'audioMute' : 'audioUnmute'),
              t.mutedAudio
            );
          }),
          (ZjRTCCall.prototype.update = function (e) {
            var t = this;
            if ('CONNECTED' == t.state) {
              if (((t.state = 'UPDATING'), t.localStream)) {
                t.localStream = void 0;
                for (var n = t.pc.getLocalStreams(), a = 0; a < n.length; a++) t.pc.removeStream(n[a]);
              }
              for (var n = t.pc.getRemoteStreams(), a = 0; a < n.length; a++) t.pc.removeStream(n[a]);
              t.makeCall(t.parent, e);
            }
          }),
          (ZjRTCCall.prototype.shareMp4VideoIsMute = function (e) {
            var t = this;
            (t.firefox_ver > 0 || t.safari_ver > 0 || t.chrome_ver > 65) &&
              (e
                ? t.smallAudioTrackSender.replaceTrack(t.localStream.getAudioTracks()[0])
                : t.smallAudioTrackSender.replaceTrack(t.parent.mixer.getMixedStream().getAudioTracks()[0])),
              t.parent.event_event && t.parent.event_event(t.pc, t.parent.conference, t.mutedVideo ? 'videoPause' : 'videoResume');
          }),
          (ZjRTCCall.prototype.shareMp4Video = function (e) {
            var t = this;
            if (((t.isShareMp4 = !0), t.firefox_ver > 0 || t.safari_ver > 0 || t.chrome_ver > 65)) {
              if ((t.bigTrackSender && t.bigTrackSender.replaceTrack(e.getVideoTracks()[0]), t.smallTrackSender)) {
                var n = e.clone();
                t.smallTrackSender.replaceTrack(n.getVideoTracks()[0]);
              }
              (t.parent.mixer = new MultiStreamsMixer([e, t.localStream])),
                t.smallAudioTrackSender && t.smallAudioTrackSender.replaceTrack(t.parent.mixer.getMixedStream().getAudioTracks()[0]);
            }
            t.parent.event_event && t.parent.event_event(t.pc, t.parent.conference, t.mutedVideo ? 'videoPause' : 'videoResume');
          }),
          (ZjRTCCall.prototype.stopShareMp4Video = function () {
            var e = this;
            if (e.isShareMp4) {
              if (((e.isShareMp4 = !e.isShareMp4), e.firefox_ver > 0 || e.safari_ver > 0 || e.chrome_ver > 65)) {
                if (e.video_source)
                  e.bigTrackSender && e.bigTrackSender.replaceTrack(e.localStream.getVideoTracks()[0]),
                    e.smallTrackSender && e.smallTrackSender.replaceTrack(e.localStreamSmall.getVideoTracks()[0]);
                else if ((e.bigTrackSender && e.bigTrackSender.replaceTrack(e.parent.muteStream.getVideoTracks()[0]), e.smallTrackSender)) {
                  var t = e.parent.muteStream.clone();
                  e.smallTrackSender.replaceTrack(t.getVideoTracks()[0]);
                }
                e.smallAudioTrackSender.replaceTrack(e.localStream.getAudioTracks()[0]);
              }
              e.parent.event_event && e.parent.event_event(e.pc, e.parent.conference, e.mutedVideo ? 'videoPause' : 'videoResume');
            }
          }),
          (ZjRTCCall.prototype.muteVideo = function (e) {
            var t = this;
            if (e === t.mutedVideo) return t.mutedVideo;
            var n = [];
            (n = [t.localStream]), t.localStreamSmall && n.push(t.localStreamSmall);
            for (var a = 0; a < n.length; a++) for (var r = n[a].getVideoTracks(), o = 0; o < r.length; o++) r[o].enabled = t.mutedVideo;
            if (((t.mutedVideo = !t.mutedVideo), t.firefox_ver > 0 || t.safari_ver > 0 || t.chrome_ver > 65)) {
              if (t.mutedVideo) {
                if ((t.bigTrackSender && t.bigTrackSender.replaceTrack(t.parent.muteStream.getVideoTracks()[0]), t.smallTrackSender)) {
                  var s = t.parent.muteStream.clone();
                  t.parent.applyConstraintsMedia(s, t.parent.smallMaxFrameRate, t.parent.smallMaxHeigh, t.parent.smallMaxWidth),
                    t.smallTrackSender.replaceTrack(s.getVideoTracks()[0]);
                }
              } else
                t.bigTrackSender && t.bigTrackSender.replaceTrack(t.localStream.getVideoTracks()[0]),
                  t.smallTrackSender && t.smallTrackSender.replaceTrack(t.localStreamSmall.getVideoTracks()[0]);
              t.updateUploadBitrate('high');
            }
            return t.parent.event_event && t.parent.event_event(t.pc, t.parent.conference, t.mutedVideo ? 'videoPause' : 'videoResume'), t.mutedVideo;
          }),
          (ZjRTCCall.prototype.holdresume = function (e) {
            var t = this;
            (t.onHold = e), (e = !e);
            for (var n = t.pc.getLocalStreams().concat(t.pc.getRemoteStreams()), a = 0; a < n.length; a++)
              for (var r = n[a].getAudioTracks().concat(n[a].getVideoTracks()), o = 0; o < r.length; o++) r[o].enabled = e;
            t.parent.event_event && t.parent.event_event(t.pc, t.parent.conference, t.onHold ? 'fabricHold' : 'fabricResume'),
              t.mutedAudio && ((t.mutedAudio = !1), t.muteAudio()),
              t.mutedVideo && ((t.mutedVideo = !1), t.muteVideo());
          }),
          (ZjRTCCall.prototype.disconnect = function (e, t) {
            var n = this;
            'DISCONNECTING' != n.state &&
              ((n.state = 'DISCONNECTING'),
              n.parent.onLog('Sending disconnect'),
              n.parent.token && !n.parent.isshitongChange && n.sendRequest('calls/' + n.call_uuid + '/disconnect', {}, e)),
              t || n.cleanup();
          }),
          (ZjRTCCall.prototype.cleanupAudioContext = function () {
            var e = this;
            if (e.audioContext && e.microphone && e.analyser)
              try {
                e.microphone.disconnect(e.analyser), e.audioRTCInterval && (clearInterval(e.audioRTCInterval), (e.audioRTCInterval = null));
              } catch (e) {
                console.error('Unable to disconnect audio context', e);
              }
            (e.analyser = null),
              (e.microphone = null),
              e.audioContext && e.audioContext.close
                ? (e.audioContext.close(), (e.audioContext = null))
                : e.audioContext && e.audioContext.suspend && e.audioContext.suspend();
          }),
          (ZjRTCCall.prototype.cleanup = function () {
            var e = this;
            if (
              (e.cleanupAudioContext(),
              e.event_listener && (window.removeEventListener('message', e.event_listener), (e.event_listener = null)),
              e.localStream)
            ) {
              e.parent.onLog('Releasing user media');
              for (var t = e.localStream.getTracks(), n = 0; n < t.length; n++) t[n].stop();
              e.localStream = null;
            }
            if (e.localStreamSmall) {
              e.parent.onLog('Releasing user localStreamSmall');
              for (var t = e.localStreamSmall.getTracks(), n = 0; n < t.length; n++) t[n].stop();
              e.localStreamSmall = null;
            }
            e.pc && 'closed' != e.pc.signalingState && e.pc.close(),
              e.parent.event_event && e.parent.event_event(e.pc, e.parent.conference, 'fabricTerminated');
          }),
          (ZjRTCCall.prototype.startWhiteboardByCall = function (e, t, n) {
            var a = this,
              r = {};
            a.parent.isShiTong ||
              (e && (r.imagename = e),
              t && (r.imagebody = t),
              a.parent.token &&
                (a.parent.onLog('Sending start_whiteboard....startWhiteboardByCall'), a.parent.sendRequest('start_whiteboard', r, n)));
          }),
          (ZjRTCCall.prototype.stopWhiteboardByCall = function () {
            var e = this,
              t = {},
              n = void 0;
            return e.parent.isShiTong
              ? n
              : (e.parent.token &&
                  (e.parent.onLog('Sending stop_whiteboard.....stopWhiteboardByCall'), (n = e.parent.sendRequest('stop_whiteboard', t, !1))),
                n);
          }),
          (ZjRTCCall.prototype.sendLocalStatus = function () {
            var e = this,
              t = {};
            (!e.parent.isShiTong && e.parent.prvSdk) ||
              ((t.local_audio = e.parent.mutedAudio ? 1 : 0),
              (t.local_camera = e.parent.mutedVideo ? 1 : 0),
              'audioonly' == e.parent.call_type && (t.local_camera = 1),
              (t.ismute = 0),
              e.sendRequest('changeLocalStatus', t));
          }),
          (ZjJPEGPresentation.prototype.makeCall = function (e) {
            var t = this;
            (t.parent = e), t.onSetup(t);
          }),
          (ZjJPEGPresentation.prototype.connect = function () {
            var e = this;
            e.state = 'CONNECTING';
            var t = { call_type: 'presentation' };
            e.sendRequest('participants/' + e.parent.uuid + '/calls', t, function (t) {
              e.processAnswer(t);
            });
          }),
          (ZjJPEGPresentation.prototype.processAnswer = function (e) {
            var t,
              n = this;
            try {
              t = JSON.parse(e.target.responseText);
            } catch (t) {
              return n.handleError('Unexpected Response: ' + e.target.status + ' ' + e.target.statusText);
            }
            if (200 != e.target.status) return n.isShiTong ? n.handleError(t.result.reason) : n.handleError(t.result || t.reason);
            (n.state = 'CONNECTED'), n.onConnect({}), n.parent.onLog(t.result), (n.call_uuid = t.result.call_uuid);
          }),
          (ZjJPEGPresentation.prototype.sendRequest = function (e, t, n, a, r) {
            var o = this,
              s = !1 !== n,
              i = new XMLHttpRequest(),
              c = 'https://' + o.parent.node + '/api/services/' + o.parent.conference + '/' + e;
            if (
              (o.parent.onLog('ZjJPEGPresentation.sendRequest', e, t, a, c),
              i.open('POST', c, s),
              n && (i.onload = n),
              void 0 === r && (r = 0),
              (i.onerror = function () {
                ++r > 10 || !1 === n
                  ? o.onError(o.parent.trans.ERROR_CONNECTING)
                  : setTimeout(function () {
                      o.sendRequest(e, t, n, a, r);
                    }, 500 * r);
              }),
              (i.ontimeout = function () {
                ++r > 10 || !1 === n
                  ? o.onError(o.parent.trans.ERROR_CONNECTING)
                  : setTimeout(function () {
                      o.sendRequest(e, t, n, a, r);
                    }, 500 * r);
              }),
              o.parent.token && i.setRequestHeader('token', o.parent.token),
              o.parent.basic_username &&
                o.parent.basic_password &&
                i.setRequestHeader('Authorization', 'Basic ' + Base64.encode(o.parent.basic_username + ':' + o.parent.basic_password)),
              t ? (i.setRequestHeader('Content-type', 'application/json'), i.send(JSON.stringify(t))) : a ? i.send(a) : i.send(),
              !1 === n)
            ) {
              o.parent.onLog('ZjJPEGPresentation.sendRequest response', i.responseText);
              var d = {};
              try {
                d = JSON.parse(i.responseText);
              } catch (e) {
                d.reason = i.status + ' ' + i.statusText;
              }
              return (d.http_status = i.status), d;
            }
          }),
          (ZjJPEGPresentation.prototype.sendPresentationImageFile = function (e) {
            var t = this;
            (e && e.files.length) || t.parent.onLog('ZjJPEGPresentation.sendPresentationImageFile error:', 'Element not given'),
              t.sendPresentationImage(e.files[0]);
          }),
          (ZjJPEGPresentation.prototype.sendPresentationImage = function (e) {
            var t = this,
              n = new Blob([e], { type: 'image/jpeg' }),
              a = new FormData();
            a.append('frame', n),
              t.parent.onLog('ZjJPEGPresentation.sendPresentationImage', a),
              t.sendRequest('presentation', null, function () {}, a);
          }),
          (ZjJPEGPresentation.prototype.remoteDisconnect = function (e) {
            var t = this,
              n = t.parent.trans.ERROR_DISCONNECTED_SCREENSHARE;
            'reason' in e && (n = e.reason), t.onDisconnect(n);
          }),
          (ZjJPEGPresentation.prototype.disconnect = function () {
            var e = this;
            'DISCONNECTING' != e.state &&
              ((e.state = 'DISCONNECTING'),
              e.parent.token &&
                (e.sendRequest('participants/' + e.parent.uuid + '/calls/' + e.call_uuid + '/disconnect', !1),
                e.onDisconnect(e.parent.trans.ERROR_PRESENTATION_ENDED)));
          }),
          (ZjRTC.prototype.makeCall = function (e, t, n, a, r, o) {
            var s = this;
            (s.state = 'ACTIVE'),
              (s.node = e),
              (s.conference = t),
              (s.display_name = n),
              (s.call_type = r),
              (s.flash = o),
              a && ((s.bandwidth_in = parseInt(a)), (s.bandwidth_out = s.bandwidth_in)),
              s.onLog('Simulcast: ', s.simulcast ? 'enabled' : 'disabled'),
              s.requestToken(function () {
                s.createEventSource(),
                  'DISCONNECTING' != s.state &&
                    ('none' != s.call_type ? ((s.flash = o), s.addCall(null, o)) : s.onSetup(null, s.pin_status, s.conference_extension));
              });
          }),
          (ZjRTC.prototype.sendRequest = function (e, t, n, a, r) {
            var o = this,
              s = !1 !== n;
            a = a || 'POST';
            var i = new XMLHttpRequest(),
              c = 'https://' + o.node + '/api/services/' + o.conference + '/' + e;
            if (
              (o.onLog('ZjRTC.sendRequest', e, t, a, c),
              i.open(a, c, s),
              n && (i.onload = n),
              void 0 === r && (r = 0),
              (i.onerror = function () {
                ++r > 20 || !1 === n
                  ? ((o.error = 'Error sending request: ' + e), clearInterval(o.token_refresh), o.onError(o.trans.ERROR_CONNECTING))
                  : setTimeout(function () {
                      o.sendRequest(e, t, n, a, r);
                    }, 500 * r);
              }),
              (i.ontimeout = function () {
                ++r > 20 || !1 === n
                  ? ((o.error = 'Timeout sending request: ' + e), clearInterval(o.token_refresh), o.onError(o.trans.ERROR_CONNECTING))
                  : setTimeout(function () {
                      o.sendRequest(e, t, n, a, r);
                    }, 500 * r);
              }),
              'new_session' == e &&
                i.setRequestHeader('rtc-user-agent', 'browser/version ' + version + '/' + staticTool.gs.ClientOs() + '/' + staticTool.gs.Browse()),
              o.token ? i.setRequestHeader('token', o.token) : null !== o.pin && i.setRequestHeader('pin', o.pin),
              null !== o.role && i.setRequestHeader('role', o.role),
              o.basic_username &&
                o.basic_password &&
                i.setRequestHeader('Authorization', 'Basic ' + Base64.encode(o.basic_username + ':' + o.basic_password)),
              t ? (i.setRequestHeader('Content-type', 'application/json'), i.send(JSON.stringify(t))) : i.send(),
              !1 === n)
            ) {
              o.onLog('ZjRTC.sendRequest response', i.responseText);
              var d = {};
              try {
                d = JSON.parse(i.responseText);
              } catch (e) {
                d.reason = i.status + ' ' + i.statusText;
              }
              return (d.http_status = i.status), d;
            }
          }),
          (ZjRTC.prototype.requestToken = function (e) {
            var t = this;
            if (t.token) e && e();
            else {
              var n = { display_name: t.display_name, hideme: t.hideme ? 'yes' : '', account: t.account };
              if (!t.checkdup) {
                var a = sessionStorage.getItem('checkdup');
                a ? (t.checkdup = a) : ((a = UUID.create()), (t.checkdup = a.toString()), sessionStorage.setItem('checkdup', t.checkdup));
              }
              t.checkdup && (n.checkdup = t.checkdup),
                t.registration_token && (n.registration_token = t.registration_token),
                t.oneTimeToken && ((n.token = t.oneTimeToken), (t.oneTimeToken = null)),
                t.conference_extension && (n.conference_extension = t.conference_extension),
                !t.simulcast && t.isMac && t.chrome_ver > 0 && ((n.force_soft = 'yes'), (n.expected_width = 960), (n.expected_height = 540)),
                t.sendRequest('new_session', n, function (n) {
                  t.tokenRequested(n, e);
                });
            }
          }),
          (ZjRTC.prototype.tokenRequested = function (e, t) {
            var n = this,
              a = {};
            try {
              (a = JSON.parse(e.target.responseText)).http_status = e.target.status;
            } catch (t) {
              a.reason = e.target.status + ' ' + e.target.statusText;
            }
            if ((n.onLog('ZjRTC.sessionRequested response', e.target.responseText), 200 == a.http_status)) {
              switch (
                ((n.token = a.result.token),
                void 0 != a.result.conferenceName ? (n.conferenceName = a.result.conferenceName) : (n.conferenceName = n.conference),
                a.result.service_type)
              ) {
                case 'conference':
                  n.isvmr = !1;
                  break;
                case 'lecture':
                  n.isvmr = !0;
                  break;
                case 'gateway':
                  break;
                default:
                  throw new Error('unknown service_type, you need handle this service_type');
              }
              if (
                ((n.uuid = a.result.participant_uuid),
                (n.role = a.result.role),
                (n.version = a.result.version),
                (n.chat_enabled = a.result.chat_enabled),
                (n.fecc_enabled = a.result.fecc_enabled),
                (n.rtmp_enabled = a.result.rtmp_enabled),
                (n.rtsp_enabled = a.result.rtsp_enabled),
                (n.analytics_enabled = a.result.analytics_enabled),
                (n.allow_1080p = a.result.allow_1080p),
                (n.service_type = a.result.service_type),
                (n.current_service_type = a.result.current_service_type),
                (n.remote_call_type = a.result.call_type),
                (n.guestsCanPresent = a.result.guests_can_present),
                (n.pcConfig.iceServers = []),
                n.default_stun &&
                  (n.firefox_ver > 43 || n.edge_ver > 10527
                    ? n.pcConfig.iceServers.push({ urls: [n.default_stun] })
                    : n.pcConfig.iceServers.push({ url: n.default_stun })),
                n.turn_server &&
                  (n.turn_server instanceof Array
                    ? (n.pcConfig.iceServers = n.pcConfig.iceServers.concat(n.turn_server))
                    : n.pcConfig.iceServers.push(n.turn_server)),
                'stun' in a.result)
              )
                for (var r = 0; r < a.result.stun.length; r++) n.pcConfig.iceServers.push(a.result.stun[r]);
              n.onLog('ICE Servers:', n.pcConfig),
                'bandwidth_in' in a.result &&
                  (0 == n.defaultBandwidth ? (n.set_bandwidth_in = a.result.bandwidth_in) : (n.set_bandwidth_in = n.bandwidth_in),
                  n.set_bandwidth_in < n.bandwidth_in && (n.bandwidth_in = n.set_bandwidth_in)),
                'bandwidth_out' in a.result &&
                  (0 == n.defaultBandwidth ? (n.set_bandwidth_out = a.result.bandwidth_out) : (n.set_bandwidth_out = n.bandwidth_out),
                  n.set_bandwidth_out < n.bandwidth_out && (n.bandwidth_out = n.set_bandwidth_out));
            } else {
              if (403 != a.http_status || 'success' !== a.status) return n.handleError(a.result || a.reason);
              'pin' in a.result && ('none' == a.result.guest_pin ? (n.pin_status = 'optional') : (n.pin_status = 'required')),
                'conference_extension' in a.result && (n.conference_extension = a.result.conference_extension_type);
            }
            if (!n.token_refresh && n.token) {
              var o = a.result.expires || 120;
              (n.token_refresh = setInterval(n.refreshToken.bind(this), (1e3 * o) / 5)),
                n.sendRequest(
                  'service_status',
                  null,
                  function (e) {
                    if ((n.onLog('service_status'), 200 == e.target.status && n.onConferenceUpdate)) {
                      var t = JSON.parse(e.target.responseText);
                      n.onLog(t), n.onConferenceUpdate(t.result);
                    }
                  },
                  'GET',
                );
            }
            t && t();
          }),
          (ZjRTC.prototype.refreshToken = function () {
            var e = this,
              t = { display_name: e.display_name };
            e.sendRequest('refresh_session', t, function (t) {
              e.onLog('ZjRTC.refreshSession response', t.target.responseText);
              var n = {};
              try {
                n = JSON.parse(t.target.responseText);
              } catch (e) {
                n.reason = t.target.status + ' ' + t.target.statusText;
              }
              if (200 != t.target.status) return e.handleError(n.result || n.reason);
              e.onRefreshSession && e.onRefreshSession(),
                (e.token = n.result.token),
                n.result.role != e.role && ((e.role = n.result.role), e.onRoleUpdate && e.onRoleUpdate(e.role));
            });
          }),
          (ZjRTC.prototype.createEventSource = function () {
            function e(e) {
              return (
                !e.display_name ||
                'anonymous_living' === e.display_name ||
                'anonymous_recorder' === e.display_name ||
                0 != e.display_name.indexOf('anonymous_')
              );
            }
            var t = this;
            !t.WebSocket &&
              t.token &&
              ((t.WebSocket = new ReconnectingWebSocket('wss://' + t.node + '/wapi/services/' + t.conference + '/wsevents?token=' + t.token)),
              (t.WebSocket.onopen = function (e) {
                t.onLog('[wss]::event source open'), (t.WebSocketTimeout = 10);
              }),
              (t.WebSocket.onerror = function (e) {
                if ((t.onLog('[wss]::event source error', e), 'DISCONNECTING' != t.state)) {
                  if ((t.onLog('[wss]::reconnecting...'), t.WebSocket && t.WebSocket.close(), (t.WebSocket = null), t.WebSocketTimeout > 15e3))
                    return (t.error = '[wss]::Error connecting to EventSource'), t.onError(t.trans.ERROR_CONNECTING);
                  setTimeout(function () {
                    t.createEventSource();
                  }, t.WebSocketTimeout),
                    (t.WebSocketTimeout += 1e3);
                }
              }),
              (t.WebSocket.onclose = function (e) {
                t.onLog('[wss]::event source onclose', e);
              }),
              t.WebSocket.addEventListener('message', function (n) {
                var a = JSON.parse(n.data),
                  r = null;
                if ('event' === a._command)
                  switch (((r = a.data), a._eventName)) {
                    case 'presentation_start':
                      t.onLog('[ws]: presentation_start', r),
                        (r.status = 'start'),
                        ('start' == t.presentation_msg.status && t.presentation_msg.presenter_uuid == r.presenter_uuid) ||
                          (window.postMessage({ type: 'clear_screen_mode' }, '*'),
                          t.isShiTong || (t.present(null), window.postMessage({ type: 'clear_share_button' }, '*')),
                          t.stopShareMp4Video(),
                          t.processPresentation(r)),
                        (t.presentation_msg = r);
                      break;
                    case 'presentation_stop':
                      t.isShiTong &&
                        t.uuid === r.presenter_uuid &&
                        (t.call && t.call.call_uuid == r.call_uuid
                          ? t.call.remoteDisconnect(r)
                          : t.presentation
                          ? t.presentation.remoteDisconnect(r)
                          : t.screenshare && t.screenshare.remoteDisconnect(r)),
                        (r = { status: 'stop' }),
                        t.onLog('[ws]: presentation_stop', r),
                        'stop' != t.presentation_msg.status && t.processPresentation(r),
                        (t.presentation_msg = r),
                        t.stopShareMp4Video(),
                        t.sendRequest(
                          'service_status',
                          null,
                          function (e) {
                            if ((t.onLog('presentation_stop after exce service_status'), 200 == e.target.status && t.onConferenceUpdate)) {
                              var n = JSON.parse(e.target.responseText);
                              t.onLog(n), t.onConferenceUpdate(n.result);
                            }
                          },
                          'GET',
                        );
                      break;
                    case 'presentation_frame':
                      (t.presentation_event_id = a._eventId), t.onPresentationReload && !t.onHold && t.onPresentationReload(t.getPresentationURL());
                      break;
                    case 'participant_create':
                      t.onLog('[ws]: participant_create', r),
                        (t.rosterList[r.uuid] = r),
                        t.oldRosterList ||
                          (t.onParticipantCreate && e(r) && t.onParticipantCreate(r), t.onRosterList && t.onRosterList(t.getRosterList()));
                      break;
                    case 'participant_update':
                      t.onLog('[ws]: participant_update', r),
                        void 0 === t.rosterList[r.uuid] && (t.rosterList[r.uuid] = {}),
                        0 === r.sender_ssrc && (r.sender_ssrc = t.rosterList[r.uuid].sender_ssrc),
                        _.assign(t.rosterList[r.uuid], r),
                        r.uuid == t.uuid && t.current_service_type && r.service_type && (t.current_service_type = r.service_type),
                        t.oldRosterList ||
                          (t.onParticipantUpdate && e(r) && t.onParticipantUpdate(r), t.onRosterList && t.onRosterList(t.getRosterList()));
                      break;
                    case 'participant_delete':
                      t.onLog('[ws]: participant_delete', r),
                        (r = t.rosterList[r.uuid]),
                        delete t.rosterList[r.uuid],
                        t.oldRosterList ||
                          (t.onParticipantDelete && e(r) && t.onParticipantDelete(r), t.onRosterList && t.onRosterList(t.getRosterList()));
                      break;
                    case 'message_received':
                      (r.origin = t.rosterList[r.uuid] ? t.rosterList[r.uuid].overlay_text : r.origin + '（离线）'),
                        t.onLog('[ws]: message_received', r),
                        t.onChatMessage && t.onChatMessage(r);
                      break;
                    case 'message':
                      t.onLog('[ws]: message', r), t.onPrivateMessage && t.onPrivateMessage(r);
                      break;
                    case 'participant_sync_begin':
                      t.onLog('[ws]: participant_sync_begin'),
                        t.oldRosterList || (t.oldRosterList = t.rosterList),
                        (t.rosterList = {}),
                        t.onSyncBegin && t.onSyncBegin();
                      break;
                    case 'participant_sync_end':
                      t.onLog('[ws]: participant_sync_end', t.rosterList);
                      for (var o in t.rosterList)
                        o in t.oldRosterList ||
                        !t.onParticipantCreate ||
                        (t.rosterList[o].display_name &&
                          'anonymous_living' !== t.rosterList[o].display_name &&
                          'anonymous_recorder' !== t.rosterList[o].display_name &&
                          0 == t.rosterList[o].display_name.indexOf('anonymous_'))
                          ? (!t.onParticipantUpdate ||
                              (t.rosterList[o].display_name &&
                                'anonymous_living' !== t.rosterList[o].display_name &&
                                'anonymous_recorder' !== t.rosterList[o].display_name &&
                                0 == t.rosterList[o].display_name.indexOf('anonymous_')) ||
                              t.onParticipantUpdate(t.rosterList[o]),
                            delete t.oldRosterList[o])
                          : t.onParticipantCreate(t.rosterList[o]);
                      if (t.onParticipantDelete)
                        for (o in t.oldRosterList) {
                          r = { uuid: o };
                          t.onParticipantDelete(r);
                        }
                      delete t.oldRosterList, t.onRosterList && t.onRosterList(t.getRosterList()), t.onSyncEnd && t.onSyncEnd();
                      break;
                    case 'call_disconnected':
                      t.onLog('[ws]: call_disconnected', r),
                        t.call && t.call.call_uuid == r.call_uuid
                          ? t.call.remoteDisconnect(r)
                          : t.presentation && t.presentation.call_uuid == r.call_uuid
                          ? t.presentation.remoteDisconnect(r)
                          : t.screenshare && t.screenshare.call_uuid == r.call_uuid && t.screenshare.remoteDisconnect(r);
                      break;
                    case 'disconnect':
                      t.onLog('[ws]: disconnect', r);
                      var s = t.trans.ERROR_DISCONNECTED;
                      'reason' in r && (s = r.reason), 'DISCONNECTING' != t.state && (t.disconnect(), t.onDisconnect && t.onDisconnect(s));
                      break;
                    case 'service_update':
                      t.onLog('[ws]: service_update', r), t.onConferenceUpdate && t.onConferenceUpdate(r);
                      break;
                    case 'refer':
                      t.onLog('[ws]: refer', r), t.processRefer(r);
                      break;
                    case 'on_hold':
                      t.onLog('[ws]: call_hold', r), t.holdresume(r.setting);
                      break;
                    case 'stage':
                      (t.stage = r), t.onLog('[ws]: stage', r), t.onStageUpdate && t.onStageUpdate(r);
                      break;
                    case 'layout':
                      if (((t.layout = r), t.static.lastLayout || (t.static.lastLayout = {}), t.onLog('[ws]: layout', r), t.layout.ignore)) return;
                      t.simulcast && t.layout.presentation && (t.layout = t.call.processLayoutPresentation(t.layout)),
                        t.isReturnOnline ? (t.lastParticipants = []) : (t.lastParticipants = t.currentParticipants),
                        (t.currentParticipants = t.layout.participants),
                        t.simulcast && t.call && t.call.pc,
                        t.simulcast &&
                          t.call &&
                          t.call.pc &&
                          t.call.presentationStream &&
                          t.static.lastLayout.presentation &&
                          t.layout.presentation &&
                          t.static.lastLayout.presentation.uuid != t.layout.presentation.uuid &&
                          t.call.onPresentationStream(t.call.presentationStream, o),
                        t.onLog('[debug]: event: ' + r.participants + ', remove: ' + _.difference(t.lastParticipants, t.currentParticipants) + ' '),
                        !t.oldRosterList && t.simulcast && t.updateSSRCListByLayout(t.layout),
                        t.call && t.call.pc && t.simulcast && t.isAutoBit && t.call.updateUploadBitrate(t.layout.quality),
                        t.video_source && t.chrome_ver > 0 && !t.simulcast && t.updateUploadOffer(),
                        t.onLayoutUpdate && t.onLayoutUpdate(r),
                        (t.static.lastLayout = t.layout);
                      break;
                    case 'refresh_session':
                      t.onLog('[ws]: refresh_session'), t.refreshToken();
                      break;
                    case 'whiteboard_update':
                      t.onLog('[ws]: whiteboard_update', r), t.onUpdateWhiteBoard && t.onUpdateWhiteBoard(r);
                  }
              }));
          }),
          (ZjRTC.prototype.setConferenceLock = function (e) {
            var t = this,
              n = e ? 'lock' : 'unlock';
            t.sendRequest(n);
          }),
          (ZjRTC.prototype.sendChatMessage = function (e) {
            var t = { type: 'text/plain', payload: e };
            this.sendRequest('message', t);
          }),
          (ZjRTC.prototype.setMuteAllGuests = function (e) {
            var t = this,
              n = e ? 'muteguests' : 'unmuteguests';
            t.sendRequest(n);
          }),
          (ZjRTC.prototype.startConference = function () {
            this.sendRequest('start_service');
          }),
          (ZjRTC.prototype.dialOut = function (e, t, n, a, r) {
            var o = this;
            if (e) {
              var s = { destination: e, protocol: t || 'sip' },
                i = !1;
              if (
                ('string' == typeof r
                  ? (s.presentation_uri = r)
                  : null !== r &&
                    'object' == (void 0 === r ? 'undefined' : _typeof(r)) &&
                    ('call_type' in r && (s.call_type = r.call_type),
                    'dtmf_sequence' in r && (s.dtmf_sequence = r.dtmf_sequence),
                    'presentation_uri' in r && (s.presentation_url = r.presentation_uri),
                    'keep_conference_alive' in r && (s.keep_conference_alive = r.keep_conference_alive),
                    'remote_display_name' in r && (s.remote_display_name = r.remote_display_name),
                    'overlay_text' in r && (s.text = r.overlay_text),
                    'prefer_ipv6' in r && r.prefer_ipv6 && (s.prefer_ipv6 = r.prefer_ipv6),
                    'streaming' in r && (i = r.streaming)),
                ('rtmp' === t || i) && (s.streaming = 'yes'),
                n && 'GUEST' == n.toUpperCase() && (s.role = 'GUEST'),
                !a)
              )
                return o.sendRequest('dial', s, !1);
              o.sendRequest('dial', s, function (e) {
                var t;
                try {
                  t = JSON.parse(e.target.responseText);
                } catch (t) {
                  return o.handleError('Unexpected Response: ' + e.target.status + ' ' + e.target.statusText);
                }
                if (200 != e.target.status) return o.handleError(t.result || t.reason);
                a(t);
              });
            }
          }),
          (ZjRTC.prototype.updateLayout = function (e, t, n, a) {
            var r = this;
            if (e || t) {
              var o = {
                layouts: [
                  { audience: 'hosts', actors: [], vad_backfill: !0, layout: e, plus_n: 'off', actors_overlay_text: 'auto' },
                  { audience: '', actors: [], vad_backfill: !0, layout: r.isvmr ? t : e, plus_n: 'off', actors_overlay_text: 'auto' },
                ],
              };
              r.sendRequest('override_layout', o);
            }
          }),
          (ZjRTC.prototype.overlayTextUpdate = function (e, t) {
            var n = 'participants/' + e + '/';
            n += 'overlaytext';
            var a = { text: t };
            this.sendRequest(n, a);
          }),
          (ZjRTC.prototype.switchLiving = function (e, t, n, a) {
            var r = this;
            if (r.isShiTong) r.sendRequest(e ? 'live' : 'unlive');
            else {
              var o = null;
              if (
                (Object.keys(r.rosterList).map(function (e) {
                  'anonymous_living' === r.rosterList[e].display_name && (o = r.rosterList[e]);
                }),
                e)
              ) {
                if (o) return a ? a(new Error('already living')) : null;
                var s = 'rtmp://' + r.live_recorder_server + '/living/' + t + '?entid=' + n + '&conferenceid=' + t,
                  i = { remote_display_name: 'anonymous_living' };
                r.dialOut(s, 'rtmp', 'GUEST', a, i);
              } else {
                if (!o) return a ? a(new Error('not found living')) : null;
                r.disconnectParticipant(o.uuid);
              }
            }
          }),
          (ZjRTC.prototype.switchLivingV2 = function (e, t, n, a, r, o, s) {
            var i = this;
            if (i.isShiTong) i.sendRequest(e ? 'live' : 'unlive');
            else {
              var c = null;
              if (
                (Object.keys(i.rosterList).map(function (e) {
                  'anonymous_living' === i.rosterList[e].display_name && (c = i.rosterList[e]);
                }),
                e)
              ) {
                if (c) return s ? s(new Error('already living')) : null;
                var d =
                    'rtmp://' +
                    i.liveService +
                    '/living/' +
                    t +
                    '?entid=' +
                    n +
                    '&conferenceid=' +
                    t +
                    '&bizid=' +
                    a +
                    '&subid=' +
                    r +
                    '&pushkey=' +
                    o +
                    '&cloudflag=1',
                  l = { remote_display_name: 'anonymous_living' };
                i.dialOut(d, 'rtmp', 'GUEST', s, l);
              } else {
                if (!c) return s ? s(new Error('not found living')) : null;
                i.disconnectParticipant(c.uuid);
              }
            }
          }),
          (ZjRTC.prototype.switchRecorder = function (e, t, n, a) {
            var r = this;
            if (r.isShiTong) r.sendRequest(e ? 'record' : 'unrecord', '', a);
            else {
              var o = null;
              if (
                (Object.keys(r.rosterList).map(function (e) {
                  'anonymous_recorder' === r.rosterList[e].display_name && (o = r.rosterList[e]);
                }),
                e)
              ) {
                if (o) return a ? a(new Error('already living')) : null;
                var s = 'rtmp://' + r.live_recorder_server + '/recorder/' + t + '?entid=' + n + '&conferenceid=' + t,
                  i = { remote_display_name: 'anonymous_recorder' };
                r.dialOut(s, 'rtmp', 'GUEST', a, i);
              } else {
                if (!o) return a ? a(new Error('not found living')) : null;
                r.disconnectParticipant(o.uuid);
              }
            }
          }),
          (ZjRTC.prototype.disconnectAll = function () {
            this.sendRequest('disconnect');
          }),
          (ZjRTC.prototype.getParticipants = function (e) {
            this.sendRequest('participants', {}, e, 'GET');
          }),
          (ZjRTC.prototype.setParticipantMute = function (e, t) {
            var n = this,
              a = 'participants/' + e + '/';
            (a += t ? 'mute' : 'unmute'), n.sendRequest(a);
          }),
          (ZjRTC.prototype.setParticipantStick = function (e, t, n) {
            var a = this,
              r = 'participants/' + e + '/';
            (r += t ? 'stick' : 'unstick'),
              n
                ? a.sendRequest(r, {}, function (e) {
                    if (200 == e.target.status) {
                      var t = JSON.parse(e.target.responseText);
                      a.onLog(t), n(t.status);
                    } else n(!1);
                  })
                : a.sendRequest(r, {});
          }),
          (ZjRTC.prototype.setParticipantVideoMute = function (e, t) {
            var n = this,
              a = 'participants/' + e + '/';
            n.isShiTong ? (a += t ? 'camera_disable' : 'camera_enable') : (a += t ? 'hard_vmute' : 'hard_uvmute'), n.sendRequest(a);
          }),
          (ZjRTC.prototype.setParticipantMutear = function (e, t) {
            var n = this,
              a = 'participants/' + e + '/';
            (a += t ? 'mutear' : 'unmutear'), n.sendRequest(a);
          }),
          (ZjRTC.prototype.setParticipantDelayPlay = function (e, t) {
            var n = this,
              a = 'participants/' + e + '/';
            (a += t ? 'cancel_delay' : 'resume_delay'), n.sendRequest(a);
          }),
          (ZjRTC.prototype.setParticipantUmuteye = function (e, t) {
            var n = this,
              a = 'participants/' + e + '/';
            (a += t ? 'muteye' : 'umuteye'), n.sendRequest(a);
          }),
          (ZjRTC.prototype.setParticipantRxPresentation = function (e, t) {
            var n = this,
              a = 'participants/' + e + '/';
            (a += t ? 'allowrxpresentation' : 'denyrxpresentation'), n.sendRequest(a);
          }),
          (ZjRTC.prototype.unlockParticipant = function (e) {
            var t = 'participants/' + e + '/unlock';
            this.sendRequest(t);
          }),
          (ZjRTC.prototype.holdParticipant = function (e) {
            var t = 'participants/' + e + '/hold';
            this.sendRequest(t);
          }),
          (ZjRTC.prototype.resumeParticipant = function (e) {
            var t = 'participants/' + e + '/resume';
            this.sendRequest(t);
          }),
          (ZjRTC.prototype.disconnectParticipant = function (e) {
            var t = 'participants/' + e + '/disconnect';
            this.sendRequest(t);
          }),
          (ZjRTC.prototype.transferParticipant = function (e, t, n, a, r) {
            var o = this,
              s = 'participants/' + e + '/transfer',
              i = { conference_alias: t };
            n && ((i.role = n), a && (i.pin = a)),
              r
                ? o.sendRequest(s, i, function (e) {
                    if (200 == e.target.status) {
                      var t = JSON.parse(e.target.responseText);
                      o.onLog(t), r(t.result);
                    } else r(!1);
                  })
                : o.sendRequest(s, i);
          }),
          (ZjRTC.prototype.setParticipantSpotlight = function (e, t) {
            var n = this,
              a = 'participants/' + e + '/';
            (a += t ? 'spotlighton' : 'spotlightoff'), n.sendRequest(a);
          }),
          (ZjRTC.prototype.overrideLayout = function (e) {
            this.sendRequest('override_layout', e);
          }),
          (ZjRTC.prototype.setParticipantText = function (e, t) {
            var n = 'participants/' + e + '/overlaytext',
              a = { text: t };
            this.sendRequest(n, a);
          }),
          (ZjRTC.prototype.setRole = function (e, t) {
            var n = this;
            if ('chair' !== t && 'guest' !== t) throw new Error('Role must be chair or guest');
            var a = 'participants/' + e + '/role',
              r = { role: t };
            n.sendRequest(a, r, function () {});
          }),
          (ZjRTC.prototype.setClearallhand = function () {
            this.sendRequest('clearallhand');
          }),
          (ZjRTC.prototype.setParticipantRaisehand = function () {
            var e = this,
              t = 'participants/' + e.uuid + '/raisehand';
            e.sendRequest(t);
          }),
          (ZjRTC.prototype.setParticipantClearhand = function (e) {
            var t = this;
            e || (e = t.uuid);
            var n = 'participants/' + e + '/clearhand';
            t.sendRequest(n);
          }),
          (ZjRTC.prototype.handleError = function (e) {
            var t = this;
            'DISCONNECTING' != t.state &&
              (e.hasOwnProperty('message') ? (t.error = e.message) : (t.error = e),
              t.disconnect(),
              t.onError &&
                ('presentation' == t.call_type || 'screen' == t.call_type
                  ? t.onError(e)
                  : (e.hasOwnProperty('message') && (e = e.message), t.onError(t.trans.ERROR_CALL_FAILED + e))));
          }),
          (ZjRTC.prototype.connect = function (e, t) {
            var n = this;
            n.onLog('connect role: ' + n.role);
            var a = function () {
              'DISCONNECTING' != n.state && (n.call ? n.call.connect() : n.onConnect());
            };
            'none' != n.pin_status
              ? ((n.pin_status = 'none'),
                (n.pin = e || 'none'),
                n.requestToken(function () {
                  n.createEventSource(), a();
                }))
              : t
              ? ((n.conference_extension = t),
                n.requestToken(function () {
                  n.createEventSource(), n.onSetup(null, n.pin_status);
                }))
              : a();
          }),
          (ZjRTC.prototype.updateCall = function () {
            var e = this;
            (e.call && !call_type ? e.call : new ZjRTCCall()).sendRequest('calls');
          }),
          (ZjRTC.prototype.addCall = function (e, t) {
            var n,
              a = this;
            return (
              (n = 'screen_http' == e ? new ZjJPEGPresentation() : a.call && !e ? a.call : new ZjRTCCall()),
              a.screenshare || ('screen' != e && 'screen_http' != e)
                ? a.presentation || 'presentation' != e
                  ? a.call
                    ? a.call && a.call.makeCall(a, a.call_type)
                    : ((a.call = n),
                      (a.call.onSetup = function (e) {
                        a.onSetup(e, a.pin_status, a.conference_extension);
                      }),
                      (a.call.onConnect = function (e, t, n, r) {
                        a.onConnect(e, n, r);
                      }),
                      (a.call.onDisconnect = function (e) {
                        a.call && ((a.call = null), a.onCallDisconnect ? a.onCallDisconnect(e) : (a.disconnect(), a.onDisconnect(e)));
                      }),
                      (a.call.onPresentationStream = function (e, t) {
                        a.onPresentationConnected
                          ? a.onPresentationConnected(e, t)
                          : a.onLog('ZjRTC: you should implement onPresentationStream to update stream in simulcast mode!!');
                      }),
                      (a.call.onRemovePresentationStream = function (e) {
                        a.onPresentationDisconnected
                          ? a.onPresentationDisconnected()
                          : a.onLog('ZjRTC: you should implement onRemovePresentationStream to update stream in simulcast mode!!');
                      }),
                      (a.call.onUpdateStream = function (e, t, n, r) {
                        a.onUpdateStream
                          ? a.onUpdateStream(e, n, r)
                          : a.onLog('ZjRTC: you should implement onUpdateStream to update stream in simulcast mode!!');
                      }),
                      (a.call.onRemoveStream = function (e) {
                        a.onRemoveStream ? a.onRemoveStream(e) : a.onLog('ZjRTC: you should implement onRemoveStream to remove stream!!');
                      }),
                      (a.call.onError = function (e) {
                        a.call && 'DISCONNECTING' != a.state && ((a.call = null), (a.error = e), a.onError(e));
                      }),
                      (a.call.onMicActivity = function () {
                        a.onMicActivity && a.onMicActivity();
                      }),
                      ('screen' != a.call_type && 'screen_http' != a.call_type) ||
                        (a.call.onScreenshareMissing = function () {
                          (a.call = null), a.onScreenshareMissing ? a.onScreenshareMissing() : a.onError(a.trans.ERROR_SCREENSHARE_EXTENSION);
                        }),
                      ('video' != a.call_type && 'rtmp' != a.call_type) || 'audio' != a.remote_call_type || (a.call_type = 'audioonly'),
                      a.call.makeCall(a, a.call_type))
                  : ((a.presentation = n),
                    (a.presentation.onSetup = function (e) {
                      a.presentation.connect();
                    }),
                    (a.presentation.onConnect = function (e) {
                      a.onPresentationConnected && a.onPresentationConnected(e);
                    }),
                    (a.presentation.onDisconnect = function (e) {
                      (a.presentation = null), a.onPresentationDisconnected && a.onPresentationDisconnected(e);
                    }),
                    (a.presentation.onError = function (e) {
                      (a.presentation = null), a.onPresentationDisconnected && a.onPresentationDisconnected(e);
                    }),
                    a.presentation.makeCall(a, e))
                : ((a.screenshare = n),
                  null != t && t instanceof MediaStream && (a.screenshare.localStream = t),
                  (a.screenshare.onSetup = function (e) {
                    a.screenshare.localStream || (a.screenshare.localStream = e), a.screenshare.connect();
                  }),
                  (a.screenshare.onConnect = function (e) {
                    (a.presentation_msg = { status: '' }),
                      a.onScreenshareConnected && a.onScreenshareConnected(e),
                      a.simulcast && !a.prvSdk && a.setClayoutOrder(3);
                  }),
                  (a.screenshare.onDisconnect = function (e) {
                    (a.screenshare = null), a.onScreenshareStopped && a.onScreenshareStopped(e), a.simulcast && !a.prvSdk && a.setClayoutOrder(4);
                  }),
                  (a.screenshare.onError = function (e) {
                    switch (((a.screenshare = null), e.name)) {
                      case 'admin close':
                        e = a.trans.ERROR_PRESENTATION_BY_ADMIN;
                        break;
                      default:
                        e = a.trans.ERROR_SCREENSHARE_CANCELLED;
                    }
                    a.onScreenshareStopped && a.onScreenshareStopped(e);
                  }),
                  (a.screenshare.onScreenshareMissing = function () {
                    (a.screenshare = null),
                      a.onScreenshareMissing ? a.onScreenshareMissing() : a.onScreenshareStopped(a.trans.ERROR_SCREENSHARE_EXTENSION);
                  }),
                  a.screenshare.makeCall(a, e)),
              n
            );
          }),
          (ZjRTC.prototype.disconnectCall = function (e) {
            var t = this;
            t.call && (t.call.disconnect(!1, e), e || ((t.call = null), (t.flash = void 0)));
          }),
          (ZjRTC.prototype.present = function (e) {
            var t = this;
            !t.screenshare && e
              ? t.addCall(e, null)
              : t.screenshare && !e && (t.screenshare.call_uuid && t.screenshare.disconnect(!1), (t.screenshare = null));
          }),
          (ZjRTC.prototype.muteAudio = function (e) {
            var t = this;
            return (
              t.call ? ((t.mutedAudio = t.call.muteAudio(e)), t.call.sendLocalStatus()) : (t.mutedAudio = void 0 !== e ? e : !t.mutedAudio),
              t.mutedAudio
            );
          }),
          (ZjRTC.prototype.applyConstraintsMedia = function (e, t, n, a) {
            if (e && e instanceof MediaStream && e.getVideoTracks().length > 0) {
              var r = e.getVideoTracks()[0],
                o = r.getSettings(),
                s = t || o.frameRate,
                i = n || o.height,
                c = a || o.width;
              r.applyConstraints({ frameRate: { max: s }, height: { max: i }, width: { max: c } });
            }
          }),
          (ZjRTC.prototype.shareMp4Video = function (e, t, n, a) {
            var r = this,
              o = e.getVideoTracks()[0],
              s = o.getSettings().frameRate,
              i = o.getSettings().height,
              c = o.getSettings().width;
            (t = t || s),
              (n = n || i),
              (a = a || c),
              n > r.shareVideoMaxHeght || t > r.shareVideoMaxFrameRate
                ? r.applyConstraintsMedia(e, r.shareVideoMaxFrameRate, r.shareVideoMaxHeght, r.shareVideoMaxWidth)
                : r.applyConstraintsMedia(e, t, n, a),
              r.call && r.call.shareMp4Video(e);
          }),
          (ZjRTC.prototype.stopShareMp4Video = function () {
            var e = this;
            e.call && e.call.stopShareMp4Video(), e.onShareVideo && e.onShareVideo(1);
          }),
          (ZjRTC.prototype.shareMp4VideoIsMute = function (e) {
            var t = this;
            t.call && t.call.shareMp4VideoIsMute(e);
          }),
          (ZjRTC.prototype.muteVideo = function (e) {
            var t = this;
            return (
              t.call ? ((t.mutedVideo = t.call.muteVideo(e)), t.call.sendLocalStatus()) : (t.mutedVideo = void 0 !== e ? e : !t.mutedVideo),
              t.mutedVideo
            );
          }),
          (ZjRTC.prototype.sendDTMFRequest = function (e, t) {
            var n = this;
            'call' == t
              ? n.sendRequest('participants/' + n.uuid + '/calls/' + n.call.call_uuid + '/dtmf', { digits: e }, function () {
                  n.dtmfSent(t);
                })
              : n.sendRequest('participants/' + t + '/dtmf', { digits: e }, function () {
                  n.dtmfSent(t);
                });
          }),
          (ZjRTC.prototype.sendDTMF = function (e, t) {
            var n = this;
            if ('call' == (t = t || 'call') && !n.call) return !1;
            void 0 === n.dtmf_queue[t] ? ((n.dtmf_queue[t] = []), n.sendDTMFRequest(e, t)) : n.dtmf_queue[t].push(e);
          }),
          (ZjRTC.prototype.dtmfSent = function (e) {
            var t = this;
            0 === t.dtmf_queue[e].length ? delete t.dtmf_queue[e] : t.sendDTMFRequest(t.dtmf_queue[e].shift(), e);
          }),
          (ZjRTC.prototype.sendFECCRequest = function (e, t) {
            var n = this;
            'call' == t
              ? n.sendRequest('participants/' + n.uuid + '/calls/' + n.call.call_uuid + '/fecc', e, function () {
                  n.feccSent(t);
                })
              : n.sendRequest('participants/' + t + '/fecc', e, function () {
                  n.feccSent(t);
                });
          }),
          (ZjRTC.prototype.sendFECC = function (e, t, n, a, r) {
            var o = this;
            if ('call' == (a = a || 'call') && !o.call) return !1;
            (data = { action: e, movement: [{ axis: t, direction: n }], timeout: r }),
              void 0 === o.fecc_queue[a] ? ((o.fecc_queue[a] = []), o.sendFECCRequest(data, a)) : o.fecc_queue[a].push(data);
          }),
          (ZjRTC.prototype.feccSent = function (e) {
            var t = this;
            0 === t.fecc_queue[e].length ? delete t.fecc_queue[e] : t.sendFECCRequest(t.fecc_queue[e].shift(), e);
          }),
          (ZjRTC.prototype.holdresume = function (e) {
            var t = this;
            t.call && t.call.holdresume(e),
              t.presentation && t.presentation.holdresume(e),
              t.screenshare && t.screenshare.holdresume(e),
              t.onHoldResume && t.onHoldResume(e);
          }),
          (ZjRTC.prototype.getRosterList = function () {
            var e = this,
              t = [];
            for (var n in e.rosterList) t.push(e.rosterList[n]);
            return t;
          }),
          (ZjRTC.prototype.processRoster = function (e) {
            var t = this;
            t.onRosterList && t.onRosterList(e.roster);
          }),
          (ZjRTC.prototype.getPresentationURL = function () {
            var e = this,
              t = null;
            return (
              e.presentation_event_id &&
                (t = e.png_presentation
                  ? 'https://' + e.node + '/api/services/' + e.conference + '/presentation.png?id=' + e.presentation_event_id + '&token=' + e.token
                  : 'https://' + e.node + '/api/services/' + e.conference + '/presentation.jpeg?id=' + e.presentation_event_id + '&token=' + e.token),
              t
            );
          }),
          (ZjRTC.prototype.getPresentation = function () {
            var e = this;
            if (e.presentation) {
              if (e.onPresentationConnected) {
                window.URL || window.webkitURL || window.mozURL;
                e.onPresentationConnected(e.presentation.stream);
              }
            } else e.addCall('presentation');
          }),
          (ZjRTC.prototype.stopPresentation = function () {
            var e = this;
            e.presentation && (e.presentation.disconnect(!1), (e.presentation = null));
          }),
          (ZjRTC.prototype.processPresentation = function (e) {
            var t = this;
            if ('newframe' == e.status)
              t.onPresentationReload && !t.onHold && (t.onLog('ZjRTC:processPresentation:newframe'), t.onPresentationReload(t.getPresentationURL()));
            else if (t.onPresentation)
              if ('start' == e.status) {
                var n;
                (n = '' !== e.presenter_name ? e.presenter_name + ' <' + e.presenter_uri + '>' : e.presenter_uri), t.onPresentation(!0, n);
              } else 'stop' == e.status && t.onPresentation(!1, null);
          }),
          (ZjRTC.prototype.processRefer = function (e) {
            var t = this;
            t.disconnect(!0),
              (t.state = 'IDLE'),
              t.onCallTransfer && t.onCallTransfer(e.alias),
              (t.oneTimeToken = e.token),
              'DISCONNECTING' != t.state &&
                setTimeout(function () {
                  t.makeCall(t.node, e.alias, t.display_name, t.bandwidth_in, t.call_type, t.flash);
                }, 500);
          }),
          (ZjRTC.prototype.pipLocalStreamWithStream = function (e) {
            var t = this,
              n = t.call.localStream,
              a = n.getVideoTracks()[0].getSettings();
            if (e) {
              var r = e.getVideoTracks()[0].getSettings();
              (e.fullcanvas = !0),
                (e.width = r.width),
                (e.height = r.height),
                (n.width = 320),
                (n.height = parseInt(n.width / a.aspectRatio)),
                (n.top = 10),
                (n.left = r.width - n.width - 10),
                t.mixer.resetVideoStreams([e, n]);
            } else (n.width = a.width), (n.height = a.height), delete n.top, delete n.left, t.mixer.resetVideoStreams([n]);
          }),
          (ZjRTC.prototype.disconnect = function (e) {
            var t = this;
            if (
              ((t.state = 'DISCONNECTING'),
              t.onLog('Disconnecting...'),
              (t.conference_extension = null),
              e ? t.disconnectCall(!0) : t.disconnectCall(),
              t.present(null),
              t.stopPresentation(),
              t.WebSocket && (t.WebSocket.close(), (t.WebSocket = null)),
              t.token_refresh && (clearInterval(t.token_refresh), (t.token_refresh = null)),
              t.token)
            ) {
              var n = t.error ? { reason: t.error } : null;
              t.sendRequest('end_session', n, !1), (t.token = null);
            }
          }),
          (ZjRTC.prototype.sendPresentationImage = function (e) {
            var t = this;
            t.screenshare && t.screenshare.sendPresentationImageFile && t.screenshare.sendPresentationImageFile(e);
          }),
          (ZjRTC.prototype.getMediaPresentationStatistics = function () {
            var e = this;
            return (
              e.screenshare &&
                e.screenshare.pc &&
                e.screenshare.pc.getStats &&
                (e.chrome_ver > 0
                  ? e.screenshare.pc.getStats(function (t) {
                      e.statsscreen.updateStats(t.result());
                    })
                  : e.firefox_ver > 47 &&
                    e.screenshare.pc.getStats(null).then(function (t) {
                      e.statsscreen.updateStatsFF(t);
                    })),
              e.presentation &&
                e.presentation.pc &&
                e.presentation.pc.getStats &&
                (e.chrome_ver > 0
                  ? e.presentation.pc.getStats(function (t) {
                      e.statsscreen.updateStats(t.result());
                    })
                  : e.firefox_ver > 47 &&
                    e.screenshare.pc.getStats(null).then(function (t) {
                      e.statsscreen.updateStatsFF(t);
                    })),
              e.statsscreen.getStats()
            );
          }),
          (ZjRTC.prototype.getMediaStatistics = function () {
            var e = this;
            return (
              e.call &&
                e.call.pc &&
                e.call.pc.getStats &&
                (e.chrome_ver > 0
                  ? e.call.pc.getStats(function (t) {
                      e.stats.updateStats(t.result());
                    })
                  : e.firefox_ver > 47 &&
                    e.call.pc.getStats(null).then(function (t) {
                      e.stats.updateStatsFF(t);
                    })),
              e.stats.getStats()
            );
          }),
          (ZjRTC.prototype.updateUploadOffer = function () {}),
          (ZjRTC.prototype.updateSSRCListByLayout = function (e) {
            this.addTask({ mode: 'streamsUpdate', layout: e });
          }),
          (ZjRTC.prototype.modifySSRCsOfSDP = function (e, t) {
            var n = this;
            if (
              (n.static.modifySsrcCount ? (n.static.modifySsrcCount += 1) : (n.static.modifySsrcCount = 1),
              !(n.call && n.call.pc && n.call.pc.remoteDescription && 0 !== n.call.pc.remoteDescription.sdp.length))
            )
              return (
                n.onLog('[modifySSRCsOfSDP]::update remote sdp - remoteDescription not ready yet'),
                void setTimeout(function () {
                  n.modifySSRCsOfSDP(e, t);
                }, 200)
              );
            if (!n.ack)
              return (
                n.onLog('[modifySSRCsOfSDP]::update remote sdp - ack not ready yet'),
                void setTimeout(function () {
                  n.modifySSRCsOfSDP(e, t);
                }, 200)
              );
            n.onLog('[modifySSRCsOfSDP]' + n.static.modifySsrcCount + ' sync task ' + e.mode + ' ' + (e.action ? e.action : '') + ' begin');
            var a = setTimeout(function () {
                n.onLog('[modifySSRCsOfSDP]' + n.static.modifySsrcCount + ' sync task ' + e.mode + ' ' + (e.action ? e.action : '') + ' timeout end'),
                  t(),
                  (a = null);
              }, 3e4),
              r = function () {
                a &&
                  (clearTimeout(a),
                  n.onLog('[modifySSRCsOfSDP]' + n.static.modifySsrcCount + ' sync task ' + e.mode + ' ' + (e.action ? e.action : '') + ' end'),
                  t());
              };
            switch (e.mode) {
              case 'streamsUpdate':
                n.processStreamsUpdate(e, r);
                break;
              default:
                n.onLog('[modifySSRCsOfSDP] unknown sync task: ' + e.mode), r();
            }
          }),
          (ZjRTC.prototype.updateBitrate = function (e, t) {
            var n = this,
              a = e.split('\r\n'),
              r = null;
            if (t)
              for (var o = 0; o < a.length; o++) {
                var s = a[o].match(/m=(\w*) (\d*)/);
                s && (r = s[1]), 'video' === r && 0 === a[o].indexOf('b=AS:') && ((a[o] = 'b=AS:' + t), n.onLog('update bandwidth', t));
              }
            return a.join('\r\n');
          }),
          (ZjRTC.prototype.processStreamsUpdate = function (e, t) {
            var n = this,
              a = e.layout;
            n.static.streamsUpdateCount ? (n.static.streamsUpdateCount += 1) : (n.static.streamsUpdateCount = 1);
            var r = n.static.streamsUpdateCount;
            n.static.lastSsrcs || (n.static.lastSsrcs = []),
              n.isReturnOnline && ((n.static.lastSsrcs = []), delete n.isReturnOnline),
              n.static.rtxMap || (n.static.rtxMap = {}),
              _.extend(n.static.rtxMap, a.rtx_ssrcs_map);
            for (
              var o = _.filter(a.ssrcs, function (e) {
                  return e > 0;
                }),
                s = _.difference(o, n.static.lastSsrcs),
                i = _.difference(n.static.lastSsrcs, o),
                c = i.slice(0),
                d = 0;
              d < c.length;
              d++
            )
              i.push(n.static.rtxMap[c[d]]), delete n.static.rtxMap[c[d]];
            if (
              (n.logVerbose('[processStreamsUpdate]-addssrcs:', s, '; removeSsrcs:', i, '; currentSsrcs:', o, '; lastSsrc:', n.static.lastSsrcs),
              0 === s.length && 0 === i.length)
            )
              return n.logVerbose('[processStreamsUpdate]' + r + ' no need update.'), void t();
            n.static.lastSsrcs = o;
            var l = function () {
                function e() {
                  var s = n.call.pc.remoteDescription.sdp,
                    c = _.every(o, function (e) {
                      return -1 !== s.indexOf('a=ssrc:' + e);
                    }),
                    d = _.every(i, function (e) {
                      return -1 === s.indexOf('a=ssrc:' + e);
                    });
                  c && d
                    ? (n.logVerbose('[processStreamsUpdate]' + r + ' wait ' + 0.1 * a + ' second to finish'), t())
                    : setTimeout(function () {
                        (a += 1), e();
                      }, 100);
                }
                var a = 0;
                e();
              },
              u = n.call.pc.remoteDescription.sdp;
            n.logVerbose('[processStreamsUpdate]' + r + ' origin remoteSdp ' + u);
            var p = sdpTransform.adjustStreamsWithSdp(u, s, i, n.static.rtxMap, function (e) {
                Object.keys(e).forEach(function (t) {
                  var r = a.ssrcs.indexOf(parseInt(t)),
                    o = a.participants[r],
                    s = e[t];
                  (n.call.msid2uuid[s] = o),
                    (n.call.msid2ssrc[s] = t),
                    (n.call.ssrc2uuid[t] = o),
                    n.logVerbose('[msid-uuid](add) msid, uuid, ssrc', s, o, t);
                });
              }),
              m = n.call.pc.localDescription.sdp;
            n.logVerbose('[processStreamsUpdate]' + r + ' localSdp ' + m),
              n.call.pc.setLocalDescription(
                new SessionDescription({ type: 'offer', sdp: m }),
                function () {
                  var e = s.length + i.length / 2,
                    t = !1;
                  n.logVerbose('Layout: need update ' + e + ' ssrc.'),
                    (n.ssrcUpdated = function () {
                      n.logVerbose('Layout: left ' + --e + ' ssrc be called.'), 0 === e && t && l();
                    }),
                    n.logVerbose('[processStreamsUpdate]' + r + ' adjustSdp remoteSdp ' + p),
                    n.call.pc.setRemoteDescription(
                      new SessionDescription({ type: 'answer', sdp: p }),
                      function () {
                        (t = !0), n.logVerbose('[processStreamsUpdate]' + r + ' set Remote SDP successfull'), 0 === e && t && l();
                      },
                      function (e) {
                        n.onError('[processStreamsUpdate]' + r + ' set remote failed'),
                          n.logVerbose('[processStreamsUpdate]' + r + ' set remote failed. error:', e),
                          l();
                      },
                    );
                },
                function (e) {
                  n.event_error && n.event_error(n.pc, n.parent.conference, 'setLocalDescription', e, sdp),
                    n.onError('[processStreamsUpdate]' + r + ' Local description failed', e),
                    l();
                },
              );
          }),
          (ZjRTC.prototype.addTask = function (e) {
            var t = this;
            void 0 === t.static.maxIndex && (t.static.maxIndex = 1);
            var n = t.modifySourcesQueue.length();
            return (
              t.onLog('[addTask] add ' + e.mode + ' to queue, ' + n + ' left;maxIndex is ' + t.static.maxIndex),
              t.modifySourcesQueue.remove(function (e) {
                return e.index < t.static.maxIndex - 3;
              }),
              t.modifySourcesQueue.push(e),
              !0
            );
          }),
          (ZjRTC.prototype.taskQueueIsIdle = function () {
            return this.modifySourcesQueue.idle();
          }),
          (ZjRTC.prototype.hasSsrc = function (e) {
            var t = this;
            return (
              !!(t.call && t.call.pc && t.call.pc.remoteDescription) &&
              (t.onLog('[hasSsrc] target ' + e + ', remoteSDP ' + t.call.pc.remoteDescription.sdp), t.call.pc.remoteDescription.sdp.indexOf(e) >= 0)
            );
          }),
          (ZjRTC.prototype.uuid2overlayText = function (e) {
            var t = null,
              n = this.rosterList[e];
            return n && (t = n.overlay_text), t;
          }),
          (ZjRTC.prototype.getVersion = function () {
            return version;
          }),
          (ZjRTC.prototype.startWhiteboard = function (e, t, n) {
            var a = this;
            n ||
              (n = function () {
                a.whiteBoard = !0;
              }),
              a.call.startWhiteboardByCall(e, t, n);
          }),
          (ZjRTC.prototype.stopWhiteboard = function () {
            var e = this;
            (e.whiteBoard = !1), e.call && e.call.stopWhiteboardByCall();
          }),
          (ZjRTC.prototype.setClayoutOrder = function (e) {
            var t = this;
            if (t.call && t.simulcast) {
              var n = t.clayout,
                a = '1:7';
              t.layout && (a = t.layout.view);
              var r = parseInt(a.split(':')[0]) + parseInt(a.split(':')[1]);
              switch (((r = r > 7 ? 7 : r), e)) {
                case 1:
                  t.isShiTong && (t.screenshare || '1:7' == t.clayout || ((t.clayout = '1:7'), (n = '1:6')));
                  break;
                case 2:
                  t.isShiTong && '1:7' != t.clayout && ((t.clayout = '1:7'), (n = '1:6'));
                  break;
                case 3:
                  n = '0:' + r;
              }
              t.call.setClayout(n);
            }
          }),
          (ZjRTC.prototype.setClayout = function (e) {
            var t = this;
            if (t.call) return t.call.setClayout(e);
          }),
          (ZjRTC.prototype.updateWhiteBoard = function (e, t, n, a, r) {
            var o = this,
              s = {};
            (s = { wop: e, save: n || !1, payload: a, id: t || '' }), o.call && o.sendRequest('update_whiteboard', s), r && r();
          }),
          (ZjFlashEventsClass.prototype.onError = function () {
            var e = this;
            e.call.onError(e.call.trans.ERROR_DISCONNECTED);
          }),
          (ZjFlashEventsClass.prototype.onCallEnded = function () {}),
          (ZjFlashEventsClass.prototype.onMicActivity = function () {
            this.call.onMicActivity();
          }),
          (ZjFlashEventsClass.prototype.onCameraError = function () {
            var e = this;
            e.call.onError(e.call.trans.ERROR_USER_MEDIA);
          }),
          (ZjFlashEventsClass.prototype.onConnect = function (e) {
            this.call.onConnect(e);
          }),
          (ZjRTCStreamStatistics.prototype.getStats = function () {
            return this.info;
          }),
          (ZjRTCStreamStatistics.prototype.updateBWEStats = function (e) {
            var t = this;
            (t.info['configured-bitrate'] = (e.stat('googTargetEncBitrate') / 1e3).toFixed(1)),
              (t.info['configured-actualEncBitrate'] = (e.stat('googActualEncBitrate') / 1e3).toFixed(1)),
              (t.info['configured-availableSendBandwidth'] = (e.stat('googAvailableSendBandwidth') / 1e3).toFixed(1)),
              (t.info['configured-availableReceiveBandwidth'] = (e.stat('googAvailableReceiveBandwidth') / 1e3).toFixed(1)),
              (t.info['configured-transmitBitrate'] = (e.stat('googTransmitBitrate') / 1e3).toFixed(1)),
              (t.info['configured-retransmitBitrate'] = (e.stat('googRetransmitBitrate') / 1e3).toFixed(1));
          }),
          (ZjRTCStreamStatistics.prototype.updatePacketLossStats = function (e, t) {
            var n = this,
              a = e + t;
            n.info['percentage-lost'] = 0 === a ? '0' : Math.abs(((t / a) * 100).toFixed(1));
            var r = void 0;
            n.pctLost.length >= 60 && ((r = n.pctLost.shift()), (n.recentLost -= r[0]), (n.recentTotal -= r[1])),
              (r = [Math.max(t - n.lastLost, 0), a - (n.lastPackets + n.lastLost)]),
              (n.recentLost += r[0]),
              (n.recentTotal += r[1]),
              0 === n.recentTotal
                ? (n.info['percentage-lost-recent'] = '0%')
                : (n.info['percentage-lost-recent'] = ((n.recentLost / n.recentTotal) * 100).toFixed(1) + '%');
          }),
          (ZjRTCStreamStatistics.prototype.updateRxStats = function (e) {
            var t = this;
            (t.info['packets-received'] = e.stat('packetsReceived')),
              (t.info['packets-lost'] = e.stat('packetsLost')),
              (t.info['percentage-lost'] = 0),
              (t.info['percentage-lost-recent'] = 0),
              (t.info.bitrate = 0),
              (t.info.googJitterReceived = e.stat('googJitterReceived') ? e.stat('googJitterReceived') : 0);
            var n = 0 | parseInt(t.info['packets-received']),
              a = 0 | parseInt(t.info['packets-lost']),
              r = e.stat('googFrameRateReceived'),
              o = e.stat('googCodecName'),
              s = e.stat('googFrameHeightReceived');
            if ((n >= t.lastPackets && t.updatePacketLossStats(n, a), r && (t.info.frameRate = r), t.lastTimestamp > 0)) {
              var i = Math.round((8 * (e.stat('bytesReceived') - t.lastBytes)) / (e.timestamp - t.lastTimestamp));
              t.info.bitrate = Math.abs(i);
            }
            s && (t.info.resolution = e.stat('googFrameWidthReceived') + 'x' + s),
              o && (t.info.codec = o),
              e.stat('googDecodeMs') && (t.info['decode-delay'] = e.stat('googDecodeMs') + 'ms'),
              (t.lastTimestamp = e.timestamp),
              (t.lastBytes = e.stat('bytesReceived')),
              (t.lastPackets = n),
              (t.lastLost = a);
          }),
          (ZjRTCStreamStatistics.prototype.updateTxStats = function (e) {
            var t = this;
            (t.info['packets-sent'] = e.stat('packetsSent')),
              (t.info['packets-lost'] = e.stat('packetsLost')),
              (t.info['percentage-lost'] = 0),
              (t.info['percentage-lost-recent'] = 0),
              (t.info.bitrate = 0),
              (t.info.googJitterReceived = e.stat('googJitterReceived') ? e.stat('googJitterReceived') : 0);
            var n = e.stat('googEchoCancellationReturnLossEnhancement'),
              a = e.stat('googResidualEchoLikelihoodRecentMax'),
              r = e.stat('googEchoCancellationReturnLoss'),
              o = e.stat('googResidualEchoLikelihood');
            (t.info.googEchoCancellationReturnLossEnhancement = n),
              (t.info.googResidualEchoLikelihoodRecentMax = a),
              (t.info.googEchoCancellationReturnLoss = r),
              (t.info.googResidualEchoLikelihood = o);
            var s = 0 | parseInt(t.info['packets-sent']),
              i = 0 | parseInt(t.info['packets-lost']),
              c = e.stat('bytesSent'),
              d = e.stat('googFrameRateSent'),
              l = e.stat('googCodecName'),
              u = e.stat('googFrameHeightSent');
            if ((s >= t.lastPackets && t.updatePacketLossStats(s, i), d && (t.info.frameRate = d), t.lastTimestamp > 0)) {
              var p = Math.round((8 * (c - t.lastBytes)) / (e.timestamp - t.lastTimestamp));
              t.info.bitrate = Math.abs(p);
            }
            u && (t.info.resolution = e.stat('googFrameWidthSent') + 'x' + u),
              l && (t.info.codec = l),
              (t.lastTimestamp = e.timestamp),
              (t.lastBytes = c),
              (t.lastPackets = s),
              (t.lastLost = i),
              e.stat('googResidualEchoLikelihood') && (t.info['echo-level'] = e.stat('googResidualEchoLikelihood'));
          }),
          (ZjRTCStreamStatistics.prototype.updateRxStatsFF = function (e) {
            var t = this;
            (t.info['packets-received'] = e.packetsReceived),
              (t.info['packets-lost'] = e.packetsLost),
              (t.info['percentage-lost'] = 0),
              (t.info.bitrate = 0);
            var n = 0 | parseInt(t.info['packets-received']),
              a = 0 | parseInt(t.info['packets-lost']);
            if ((t.updatePacketLossStats(n, a), t.lastTimestamp > 0)) {
              var r = e.timestamp - t.lastTimestamp;
              r > 5e5 && (r /= 1e3);
              var o = Math.round((8 * (e.bytesReceived - t.lastBytes)) / r);
              t.info.bitrate = Math.abs(o);
            }
            (t.lastTimestamp = e.timestamp), (t.lastBytes = e.bytesReceived), (t.lastPackets = n), (t.lastLost = a);
          }),
          (ZjRTCStreamStatistics.prototype.updateTxStatsFF = function (e) {
            var t = this;
            (t.info['packets-sent'] = e.packetsSent), (t.info.bitrate = 0);
            var n = 0 | parseInt(t.info['packets-sent']);
            if (t.lastTimestamp > 0) {
              var a = Math.round((8 * (e.bytesSent - t.lastBytes)) / (e.timestamp - t.lastTimestamp));
              t.info.bitrate = Math.abs(a);
            }
            (t.lastTimestamp = e.timestamp), (t.lastBytes = e.bytesSent), (t.lastPackets = n);
          }),
          (ZjRTCStreamStatistics.prototype.updateRtcpTxStatsFF = function (e) {
            var t = this;
            t.info['packets-lost'] = e.packetsLost;
            var n = 0 | parseInt(t.info['packets-sent']),
              a = 0 | parseInt(t.info['packets-lost']);
            t.updatePacketLossStats(n, a);
          }),
          (ZjRTCStatus.prototype.updateStatus = function (e) {
            var t = this,
              n = e.stat('framesDecoded'),
              a = e.stat('packetsReceived'),
              r = parseInt(e.stat('ssrc'));
            t.lastFrameDecoded == n && t.lastPacketsReceived < a ? t.failedCount++ : (t.failedCount = 0),
              (t.lastFrameDecoded = n),
              (t.lastPacketsReceived = a),
              (t.ssrc = r);
          }),
          (ZjRTCStatistics.prototype.updateRecvStatus = function (e) {
            for (var t = this, n = 0; n < e.length; ++n)
              if (t.statIsOfType(e[n], 'video', 'recv')) {
                var a = e[n].stat('ssrc');
                t.recvStreams[a] || (t.recvStreams[a] = new ZjRTCStatus()), t.recvStreams[a].updateStatus(e[n]);
              }
          }),
          (ZjRTCStatistics.prototype.getSsrcFromStat = function (e) {
            var t = e.id.match(/ssrc_(\d+)_/);
            return t ? t[1] : null;
          }),
          (ZjRTCStatistics.prototype.updateStats = function (e) {
            for (var t = this, n = 0; n < e.length; ++n)
              if (t.statIsOfType(e[n], 'audio', 'send')) t.audio_out.updateTxStats(e[n]);
              else if (t.statIsOfType(e[n], 'audio', 'recv')) t.audio_in.updateRxStats(e[n]);
              else if (t.statIsOfType(e[n], 'video', 'send')) {
                if (t.shareScreenSend && (t.parent.screenshare || t.parent.presentation)) {
                  t.shareScreenSend.updateTxStats(e[n]);
                  continue;
                }
                t.video_out_1.id && t.video_out_2.id
                  ? t.video_out_1.id == e[n].id
                    ? t.video_out_1.updateTxStats(e[n])
                    : t.video_out_2.updateTxStats(e[n])
                  : !t.video_out_1.id && e[n].stat('googFrameHeightSent') > 180
                  ? ((t.video_out_1.id = e[n].id), t.video_out_1.updateTxStats(e[n]))
                  : ((t.video_out_2.id = e[n].id), t.video_out_2.updateTxStats(e[n]));
              } else if (t.statIsBandwidthEstimation(e[n])) t.videoBwe.updateBWEStats(e[n]);
              else if (t.statIsOfType(e[n], 'video', 'recv')) {
                if (t.shareScreenRec && (t.parent.screenshare || t.parent.presentation)) {
                  t.shareScreenRec.updateRxStats(e[n]);
                  continue;
                }
                if (t.parent.simulcast) {
                  var a = t.getSsrcFromStat(e[n]),
                    r = t.parent.call ? t.parent.call.ssrc2uuid[parseInt(a)] : null;
                  r &&
                    (r.indexOf('presentation') > -1 && t.shareScreen.updateRxStats(e[n]),
                    t.uuid2Statistics[r] || (t.uuid2Statistics[r] = { videoIn: new ZjRTCStreamStatistics() }),
                    t.uuid2Statistics[r].videoIn.updateRxStats(e[n]));
                } else t.video_in.updateRxStats(e[n]);
              }
          }),
          (ZjRTCStatistics.prototype.updateStatsFF = function (e) {
            var t = this;
            for (var n in e)
              0 === n.indexOf('outbound_rtp_audio')
                ? t.audio_out.updateTxStatsFF(e[n])
                : 0 === n.indexOf('inbound_rtp_audio')
                ? t.audio_in.updateRxStatsFF(e[n])
                : 0 === n.indexOf('outbound_rtp_video')
                ? t.video_out_1.updateTxStatsFF(e[n])
                : 0 === n.indexOf('inbound_rtp_video') && t.video_in.updateRxStatsFF(e[n]);
          }),
          (ZjRTCStatistics.prototype.statIsBandwidthEstimation = function (e) {
            return 'VideoBwe' == e.type;
          }),
          (ZjRTCStatistics.prototype.statIsOfType = function (e, t, n) {
            var a = e.stat('transportId'),
              r = e.stat('googCodecName');
            return (a = 'opus' == r || 'G722' == r ? 'audio' : 'video'), 'ssrc' == e.type && a && -1 != a.search(t) && -1 != e.id.search(n);
          }),
          (ZjRTCStatistics.prototype.getStats = function () {
            var e = this;
            if (e.parent.firefox_ver > 0 && e.parent.firefox_ver < 47) return {};
            if (e.parent.screenshare && e.shareScreenSend)
              return (n = { shareScreen: { video: e.shareScreenSend.getStats() }, videoBwe: { videoBwe: e.videoBwe.getStats() } });
            if (e.parent.presentation && e.shareScreenRec)
              return (n = { shareScreen: { video: e.shareScreenRec.getStats() }, videoBwe: { videoBwe: e.videoBwe.getStats() } });
            if (null === e.audio_in.lastTimestamp) return {};
            if (e.parent.simulcast) {
              (n = {
                selfAudio: { audioout: e.audio_out.getStats(), audioin: e.audio_in.getStats() },
                selfVideo: { video_big: e.video_out_1.getStats(), video_smail: e.video_out_2.getStats() },
                shareScreen: { video: e.shareScreen.getStats() },
                videoBwe: { videoBwe: e.videoBwe.getStats() },
              })[e.parent.uuid] = { audioOut: e.audio_out.getStats(), videoOut: e.video_out_1.getStats(), audioIn: e.audio_in.getStats() };
              for (var t in e.uuid2Statistics) n[t] = { videoIn: e.uuid2Statistics[t].videoIn.getStats() };
            } else {
              var n = {
                selfAudio: { audioout: e.audio_out.getStats(), audioin: e.audio_in.getStats() },
                selfVideo: { video_big: e.video_out_1.getStats() },
                shareScreen: { video: e.shareScreen.getStats() },
              };
              n.remoteVideo = { videoIn: e.video_in.getStats() };
            }
            return n;
          }),
          (window.ZjRTC = ZjRTC);
      },
      {
        './MultiStreamsMixer': 1,
        './photoMediaStream': 8,
        './sdp-transform': 9,
        async: 3,
        lodash: 4,
        'reconnecting-websocket': 5,
        semver: 6,
        'uuid-js': 7,
      },
    ],
    3: [
      function (require, module, exports) {
        (function (process, global, setImmediate) {
          !(function (n, t) {
            'object' == typeof exports && 'undefined' != typeof module
              ? t(exports)
              : 'function' == typeof define && define.amd
              ? define(['exports'], t)
              : t((n.async = n.async || {}));
          })(this, function (n) {
            'use strict';
            function t(n, t) {
              t |= 0;
              for (var e = Math.max(n.length - t, 0), r = Array(e), u = 0; u < e; u++) r[u] = n[t + u];
              return r;
            }
            function e(n) {
              var t = typeof n;
              return null != n && ('object' == t || 'function' == t);
            }
            function r(n) {
              setTimeout(n, 0);
            }
            function u(n) {
              return function (e) {
                var r = t(arguments, 1);
                n(function () {
                  e.apply(null, r);
                });
              };
            }
            function i(n) {
              return et(function (t, r) {
                var u;
                try {
                  u = n.apply(this, t);
                } catch (n) {
                  return r(n);
                }
                e(u) && 'function' == typeof u.then
                  ? u.then(
                      function (n) {
                        o(r, null, n);
                      },
                      function (n) {
                        o(r, n.message ? n : new Error(n));
                      },
                    )
                  : r(null, u);
              });
            }
            function o(n, t, e) {
              try {
                n(t, e);
              } catch (n) {
                it(c, n);
              }
            }
            function c(n) {
              throw n;
            }
            function f(n) {
              return ot && 'AsyncFunction' === n[Symbol.toStringTag];
            }
            function a(n) {
              return f(n) ? i(n) : n;
            }
            function l(n) {
              return function (e) {
                var r = t(arguments, 1),
                  u = et(function (t, r) {
                    var u = this;
                    return n(
                      e,
                      function (n, e) {
                        a(n).apply(u, t.concat(e));
                      },
                      r,
                    );
                  });
                return r.length ? u.apply(this, r) : u;
              };
            }
            function s(n) {
              var t = pt.call(n, yt),
                e = n[yt];
              try {
                n[yt] = void 0;
                var r = !0;
              } catch (n) {}
              var u = ht.call(n);
              return r && (t ? (n[yt] = e) : delete n[yt]), u;
            }
            function p(n) {
              return vt.call(n);
            }
            function h(n) {
              return null == n ? (void 0 === n ? mt : dt) : gt && gt in Object(n) ? s(n) : p(n);
            }
            function y(n) {
              if (!e(n)) return !1;
              var t = h(n);
              return t == jt || t == St || t == bt || t == kt;
            }
            function v(n) {
              return 'number' == typeof n && n > -1 && n % 1 == 0 && n <= Lt;
            }
            function d(n) {
              return null != n && v(n.length) && !y(n);
            }
            function m() {}
            function g(n) {
              return function () {
                if (null !== n) {
                  var t = n;
                  (n = null), t.apply(this, arguments);
                }
              };
            }
            function b(n, t) {
              for (var e = -1, r = Array(n); ++e < n; ) r[e] = t(e);
              return r;
            }
            function j(n) {
              return null != n && 'object' == typeof n;
            }
            function S(n) {
              return j(n) && h(n) == Et;
            }
            function k(n, t) {
              var e = typeof n;
              return !!(t = null == t ? zt : t) && ('number' == e || ('symbol' != e && Pt.test(n))) && n > -1 && n % 1 == 0 && n < t;
            }
            function L(n, t) {
              var e = It(n),
                r = !e && Ft(n),
                u = !e && !r && qt(n),
                i = !e && !r && !u && Nt(n),
                o = e || r || u || i,
                c = o ? b(n.length, String) : [],
                f = c.length;
              for (var a in n)
                (!t && !Qt.call(n, a)) ||
                  (o &&
                    ('length' == a ||
                      (u && ('offset' == a || 'parent' == a)) ||
                      (i && ('buffer' == a || 'byteLength' == a || 'byteOffset' == a)) ||
                      k(a, f))) ||
                  c.push(a);
              return c;
            }
            function O(n) {
              var t = n && n.constructor;
              return n === (('function' == typeof t && t.prototype) || Gt);
            }
            function w(n) {
              if (!O(n)) return Ht(n);
              var t = [];
              for (var e in Object(n)) Jt.call(n, e) && 'constructor' != e && t.push(e);
              return t;
            }
            function x(n) {
              return d(n) ? L(n) : w(n);
            }
            function E(n) {
              var t = -1,
                e = n.length;
              return function () {
                return ++t < e ? { value: n[t], key: t } : null;
              };
            }
            function A(n) {
              var t = -1;
              return function () {
                var e = n.next();
                return e.done ? null : (t++, { value: e.value, key: t });
              };
            }
            function T(n) {
              var t = x(n),
                e = -1,
                r = t.length;
              return function () {
                var u = t[++e];
                return e < r ? { value: n[u], key: u } : null;
              };
            }
            function B(n) {
              if (d(n)) return E(n);
              var t = xt(n);
              return t ? A(t) : T(n);
            }
            function F(n) {
              return function () {
                if (null === n) throw new Error('Callback was already called.');
                var t = n;
                (n = null), t.apply(this, arguments);
              };
            }
            function I(n) {
              return function (t, e, r) {
                function u(n, t) {
                  if (((f -= 1), n)) (c = !0), r(n);
                  else {
                    if (t === Ot || (c && f <= 0)) return (c = !0), r(null);
                    a || i();
                  }
                }
                function i() {
                  for (a = !0; f < n && !c; ) {
                    var t = o();
                    if (null === t) return (c = !0), void (f <= 0 && r(null));
                    (f += 1), e(t.value, t.key, F(u));
                  }
                  a = !1;
                }
                if (((r = g(r || m)), n <= 0 || !t)) return r(null);
                var o = B(t),
                  c = !1,
                  f = 0,
                  a = !1;
                i();
              };
            }
            function _(n, t, e, r) {
              I(t)(n, a(e), r);
            }
            function M(n, t) {
              return function (e, r, u) {
                return n(e, t, r, u);
              };
            }
            function U(n, t, e) {
              e = g(e || m);
              var r = 0,
                u = 0,
                i = n.length;
              for (0 === i && e(null); r < i; r++)
                t(
                  n[r],
                  r,
                  F(function (n, t) {
                    n ? e(n) : (++u !== i && t !== Ot) || e(null);
                  }),
                );
            }
            function q(n) {
              return function (t, e, r) {
                return n(Xt, t, a(e), r);
              };
            }
            function z(n, t, e, r) {
              (r = r || m), (t = t || []);
              var u = [],
                i = 0,
                o = a(e);
              n(
                t,
                function (n, t, e) {
                  var r = i++;
                  o(n, function (n, t) {
                    (u[r] = t), e(n);
                  });
                },
                function (n) {
                  r(n, u);
                },
              );
            }
            function P(n) {
              return function (t, e, r, u) {
                return n(I(e), t, a(r), u);
              };
            }
            function V(n, t) {
              for (var e = -1, r = null == n ? 0 : n.length; ++e < r && !1 !== t(n[e], e, n); );
              return n;
            }
            function D(n, t) {
              return n && re(n, t, x);
            }
            function R(n, t, e, r) {
              for (var u = n.length, i = e + (r ? 1 : -1); r ? i-- : ++i < u; ) if (t(n[i], i, n)) return i;
              return -1;
            }
            function C(n) {
              return n !== n;
            }
            function $(n, t, e) {
              for (var r = e - 1, u = n.length; ++r < u; ) if (n[r] === t) return r;
              return -1;
            }
            function W(n, t, e) {
              return t === t ? $(n, t, e) : R(n, C, e);
            }
            function N(n, t) {
              for (var e = -1, r = null == n ? 0 : n.length, u = Array(r); ++e < r; ) u[e] = t(n[e], e, n);
              return u;
            }
            function Q(n) {
              return 'symbol' == typeof n || (j(n) && h(n) == ie);
            }
            function G(n) {
              if ('string' == typeof n) return n;
              if (It(n)) return N(n, G) + '';
              if (Q(n)) return fe ? fe.call(n) : '';
              var t = n + '';
              return '0' == t && 1 / n == -oe ? '-0' : t;
            }
            function H(n, t, e) {
              var r = -1,
                u = n.length;
              t < 0 && (t = -t > u ? 0 : u + t), (e = e > u ? u : e) < 0 && (e += u), (u = t > e ? 0 : (e - t) >>> 0), (t >>>= 0);
              for (var i = Array(u); ++r < u; ) i[r] = n[r + t];
              return i;
            }
            function J(n, t, e) {
              var r = n.length;
              return (e = void 0 === e ? r : e), !t && e >= r ? n : H(n, t, e);
            }
            function K(n, t) {
              for (var e = n.length; e-- && W(t, n[e], 0) > -1; );
              return e;
            }
            function X(n, t) {
              for (var e = -1, r = n.length; ++e < r && W(t, n[e], 0) > -1; );
              return e;
            }
            function Y(n) {
              return n.split('');
            }
            function Z(n) {
              return ae.test(n);
            }
            function nn(n) {
              return n.match(me) || [];
            }
            function tn(n) {
              return Z(n) ? nn(n) : Y(n);
            }
            function en(n) {
              return null == n ? '' : G(n);
            }
            function rn(n, t, e) {
              if ((n = en(n)) && (e || void 0 === t)) return n.replace(ge, '');
              if (!n || !(t = G(t))) return n;
              var r = tn(n),
                u = tn(t);
              return J(r, X(r, u), K(r, u) + 1).join('');
            }
            function un(n) {
              return (
                (n = n.toString().replace(ke, '')),
                (n = n.match(be)[2].replace(' ', '')),
                (n = n ? n.split(je) : []),
                (n = n.map(function (n) {
                  return rn(n.replace(Se, ''));
                }))
              );
            }
            function on(n, t) {
              var e = {};
              D(n, function (n, t) {
                function r(t, e) {
                  var r = N(u, function (n) {
                    return t[n];
                  });
                  r.push(e), a(n).apply(null, r);
                }
                var u,
                  i = f(n),
                  o = (!i && 1 === n.length) || (i && 0 === n.length);
                if (It(n)) (u = n.slice(0, -1)), (n = n[n.length - 1]), (e[t] = u.concat(u.length > 0 ? r : n));
                else if (o) e[t] = n;
                else {
                  if (((u = un(n)), 0 === n.length && !i && 0 === u.length))
                    throw new Error('autoInject task functions require explicit parameters.');
                  i || u.pop(), (e[t] = u.concat(r));
                }
              }),
                ue(e, t);
            }
            function cn() {
              (this.head = this.tail = null), (this.length = 0);
            }
            function fn(n, t) {
              (n.length = 1), (n.head = n.tail = t);
            }
            function an(n, t, e) {
              function r(n, t, e) {
                if (null != e && 'function' != typeof e) throw new Error('task callback must be a function');
                if (((s.started = !0), It(n) || (n = [n]), 0 === n.length && s.idle()))
                  return it(function () {
                    s.drain();
                  });
                for (var r = 0, u = n.length; r < u; r++) {
                  var i = { data: n[r], callback: e || m };
                  t ? s._tasks.unshift(i) : s._tasks.push(i);
                }
                f ||
                  ((f = !0),
                  it(function () {
                    (f = !1), s.process();
                  }));
              }
              function u(n) {
                return function (t) {
                  o -= 1;
                  for (var e = 0, r = n.length; e < r; e++) {
                    var u = n[e],
                      i = W(c, u, 0);
                    0 === i ? c.shift() : i > 0 && c.splice(i, 1), u.callback.apply(u, arguments), null != t && s.error(t, u.data);
                  }
                  o <= s.concurrency - s.buffer && s.unsaturated(), s.idle() && s.drain(), s.process();
                };
              }
              if (null == t) t = 1;
              else if (0 === t) throw new Error('Concurrency must not be zero');
              var i = a(n),
                o = 0,
                c = [],
                f = !1,
                l = !1,
                s = {
                  _tasks: new cn(),
                  concurrency: t,
                  payload: e,
                  saturated: m,
                  unsaturated: m,
                  buffer: t / 4,
                  empty: m,
                  drain: m,
                  error: m,
                  started: !1,
                  paused: !1,
                  push: function (n, t) {
                    r(n, !1, t);
                  },
                  kill: function () {
                    (s.drain = m), s._tasks.empty();
                  },
                  unshift: function (n, t) {
                    r(n, !0, t);
                  },
                  remove: function (n) {
                    s._tasks.remove(n);
                  },
                  process: function () {
                    if (!l) {
                      for (l = !0; !s.paused && o < s.concurrency && s._tasks.length; ) {
                        var n = [],
                          t = [],
                          e = s._tasks.length;
                        s.payload && (e = Math.min(e, s.payload));
                        for (var r = 0; r < e; r++) {
                          var f = s._tasks.shift();
                          n.push(f), c.push(f), t.push(f.data);
                        }
                        (o += 1), 0 === s._tasks.length && s.empty(), o === s.concurrency && s.saturated();
                        var a = F(u(n));
                        i(t, a);
                      }
                      l = !1;
                    }
                  },
                  length: function () {
                    return s._tasks.length;
                  },
                  running: function () {
                    return o;
                  },
                  workersList: function () {
                    return c;
                  },
                  idle: function () {
                    return s._tasks.length + o === 0;
                  },
                  pause: function () {
                    s.paused = !0;
                  },
                  resume: function () {
                    !1 !== s.paused && ((s.paused = !1), it(s.process));
                  },
                };
              return s;
            }
            function ln(n, t) {
              return an(n, 1, t);
            }
            function sn(n, t, e, r) {
              r = g(r || m);
              var u = a(e);
              Oe(
                n,
                function (n, e, r) {
                  u(t, n, function (n, e) {
                    (t = e), r(n);
                  });
                },
                function (n) {
                  r(n, t);
                },
              );
            }
            function pn() {
              var n = N(arguments, a);
              return function () {
                var e = t(arguments),
                  r = this,
                  u = e[e.length - 1];
                'function' == typeof u ? e.pop() : (u = m),
                  sn(
                    n,
                    e,
                    function (n, e, u) {
                      e.apply(
                        r,
                        n.concat(function (n) {
                          var e = t(arguments, 1);
                          u(n, e);
                        }),
                      );
                    },
                    function (n, t) {
                      u.apply(r, [n].concat(t));
                    },
                  );
              };
            }
            function hn(n) {
              return n;
            }
            function yn(n, t) {
              return function (e, r, u, i) {
                i = i || m;
                var o,
                  c = !1;
                e(
                  r,
                  function (e, r, i) {
                    u(e, function (r, u) {
                      r ? i(r) : n(u) && !o ? ((c = !0), (o = t(!0, e)), i(null, Ot)) : i();
                    });
                  },
                  function (n) {
                    n ? i(n) : i(null, c ? o : t(!1));
                  },
                );
              };
            }
            function vn(n, t) {
              return t;
            }
            function dn(n) {
              return function (e) {
                var r = t(arguments, 1);
                r.push(function (e) {
                  var r = t(arguments, 1);
                  'object' == typeof console &&
                    (e
                      ? console.error && console.error(e)
                      : console[n] &&
                        V(r, function (t) {
                          console[n](t);
                        }));
                }),
                  a(e).apply(null, r);
              };
            }
            function mn(n, e, r) {
              function u(n) {
                if (n) return r(n);
                var e = t(arguments, 1);
                e.push(i), c.apply(this, e);
              }
              function i(n, t) {
                return n ? r(n) : t ? void o(u) : r(null);
              }
              r = F(r || m);
              var o = a(n),
                c = a(e);
              i(null, !0);
            }
            function gn(n, e, r) {
              r = F(r || m);
              var u = a(n),
                i = function (n) {
                  if (n) return r(n);
                  var o = t(arguments, 1);
                  if (e.apply(this, o)) return u(i);
                  r.apply(null, [null].concat(o));
                };
              u(i);
            }
            function bn(n, t, e) {
              gn(
                n,
                function () {
                  return !t.apply(this, arguments);
                },
                e,
              );
            }
            function jn(n, t, e) {
              function r(n) {
                if (n) return e(n);
                o(u);
              }
              function u(n, t) {
                return n ? e(n) : t ? void i(r) : e(null);
              }
              e = F(e || m);
              var i = a(t),
                o = a(n);
              o(u);
            }
            function Sn(n) {
              return function (t, e, r) {
                return n(t, r);
              };
            }
            function kn(n, t, e) {
              Xt(n, Sn(a(t)), e);
            }
            function Ln(n, t, e, r) {
              I(t)(n, Sn(a(e)), r);
            }
            function On(n) {
              return f(n)
                ? n
                : et(function (t, e) {
                    var r = !0;
                    t.push(function () {
                      var n = arguments;
                      r
                        ? it(function () {
                            e.apply(null, n);
                          })
                        : e.apply(null, n);
                    }),
                      n.apply(this, t),
                      (r = !1);
                  });
            }
            function wn(n) {
              return !n;
            }
            function xn(n) {
              return function (t) {
                return null == t ? void 0 : t[n];
              };
            }
            function En(n, t, e, r) {
              var u = new Array(t.length);
              n(
                t,
                function (n, t, r) {
                  e(n, function (n, e) {
                    (u[t] = !!e), r(n);
                  });
                },
                function (n) {
                  if (n) return r(n);
                  for (var e = [], i = 0; i < t.length; i++) u[i] && e.push(t[i]);
                  r(null, e);
                },
              );
            }
            function An(n, t, e, r) {
              var u = [];
              n(
                t,
                function (n, t, r) {
                  e(n, function (e, i) {
                    e ? r(e) : (i && u.push({ index: t, value: n }), r());
                  });
                },
                function (n) {
                  n
                    ? r(n)
                    : r(
                        null,
                        N(
                          u.sort(function (n, t) {
                            return n.index - t.index;
                          }),
                          xn('value'),
                        ),
                      );
                },
              );
            }
            function Tn(n, t, e, r) {
              (d(t) ? En : An)(n, t, a(e), r || m);
            }
            function Bn(n, t) {
              function e(n) {
                if (n) return r(n);
                u(e);
              }
              var r = F(t || m),
                u = a(On(n));
              e();
            }
            function Fn(n, t, e, r) {
              r = g(r || m);
              var u = {},
                i = a(e);
              _(
                n,
                t,
                function (n, t, e) {
                  i(n, t, function (n, r) {
                    if (n) return e(n);
                    (u[t] = r), e();
                  });
                },
                function (n) {
                  r(n, u);
                },
              );
            }
            function In(n, t) {
              return t in n;
            }
            function _n(n, e) {
              var r = Object.create(null),
                u = Object.create(null);
              e = e || hn;
              var i = a(n),
                o = et(function (n, o) {
                  var c = e.apply(null, n);
                  In(r, c)
                    ? it(function () {
                        o.apply(null, r[c]);
                      })
                    : In(u, c)
                    ? u[c].push(o)
                    : ((u[c] = [o]),
                      i.apply(
                        null,
                        n.concat(function () {
                          var n = t(arguments);
                          r[c] = n;
                          var e = u[c];
                          delete u[c];
                          for (var i = 0, o = e.length; i < o; i++) e[i].apply(null, n);
                        }),
                      ));
                });
              return (o.memo = r), (o.unmemoized = n), o;
            }
            function Mn(n, e, r) {
              r = r || m;
              var u = d(e) ? [] : {};
              n(
                e,
                function (n, e, r) {
                  a(n)(function (n, i) {
                    arguments.length > 2 && (i = t(arguments, 1)), (u[e] = i), r(n);
                  });
                },
                function (n) {
                  r(n, u);
                },
              );
            }
            function Un(n, t) {
              Mn(Xt, n, t);
            }
            function qn(n, t, e) {
              Mn(I(t), n, e);
            }
            function zn(n, t) {
              if (((t = g(t || m)), !It(n))) return t(new TypeError('First argument to race must be an array of functions'));
              if (!n.length) return t();
              for (var e = 0, r = n.length; e < r; e++) a(n[e])(t);
            }
            function Pn(n, e, r, u) {
              sn(t(n).reverse(), e, r, u);
            }
            function Vn(n) {
              var e = a(n);
              return et(function (n, r) {
                return (
                  n.push(function (n, e) {
                    if (n) r(null, { error: n });
                    else {
                      var u;
                      (u = arguments.length <= 2 ? e : t(arguments, 1)), r(null, { value: u });
                    }
                  }),
                  e.apply(this, n)
                );
              });
            }
            function Dn(n) {
              var t;
              return (
                It(n)
                  ? (t = N(n, Vn))
                  : ((t = {}),
                    D(n, function (n, e) {
                      t[e] = Vn.call(this, n);
                    })),
                t
              );
            }
            function Rn(n, t, e, r) {
              Tn(
                n,
                t,
                function (n, t) {
                  e(n, function (n, e) {
                    t(n, !e);
                  });
                },
                r,
              );
            }
            function Cn(n) {
              return function () {
                return n;
              };
            }
            function $n(n, t, e) {
              function r() {
                c(function (n) {
                  n && f++ < o.times && ('function' != typeof o.errorFilter || o.errorFilter(n))
                    ? setTimeout(r, o.intervalFunc(f))
                    : e.apply(null, arguments);
                });
              }
              var u = 5,
                i = 0,
                o = { times: u, intervalFunc: Cn(i) };
              if (
                (arguments.length < 3 && 'function' == typeof n
                  ? ((e = t || m), (t = n))
                  : (!(function (n, t) {
                      if ('object' == typeof t)
                        (n.times = +t.times || u),
                          (n.intervalFunc = 'function' == typeof t.interval ? t.interval : Cn(+t.interval || i)),
                          (n.errorFilter = t.errorFilter);
                      else {
                        if ('number' != typeof t && 'string' != typeof t) throw new Error('Invalid arguments for async.retry');
                        n.times = +t || u;
                      }
                    })(o, n),
                    (e = e || m)),
                'function' != typeof t)
              )
                throw new Error('Invalid arguments for async.retry');
              var c = a(t),
                f = 1;
              r();
            }
            function Wn(n, t) {
              Mn(Oe, n, t);
            }
            function Nn(n, t, e) {
              function r(n, t) {
                var e = n.criteria,
                  r = t.criteria;
                return e < r ? -1 : e > r ? 1 : 0;
              }
              var u = a(t);
              Yt(
                n,
                function (n, t) {
                  u(n, function (e, r) {
                    if (e) return t(e);
                    t(null, { value: n, criteria: r });
                  });
                },
                function (n, t) {
                  if (n) return e(n);
                  e(null, N(t.sort(r), xn('value')));
                },
              );
            }
            function Qn(n, t, e) {
              var r = a(n);
              return et(function (u, i) {
                var o,
                  c = !1;
                u.push(function () {
                  c || (i.apply(null, arguments), clearTimeout(o));
                }),
                  (o = setTimeout(function () {
                    var t = n.name || 'anonymous',
                      r = new Error('Callback function "' + t + '" timed out.');
                    (r.code = 'ETIMEDOUT'), e && (r.info = e), (c = !0), i(r);
                  }, t)),
                  r.apply(null, u);
              });
            }
            function Gn(n, t, e, r) {
              for (var u = -1, i = ir(ur((t - n) / (e || 1)), 0), o = Array(i); i--; ) (o[r ? i : ++u] = n), (n += e);
              return o;
            }
            function Hn(n, t, e, r) {
              var u = a(e);
              ne(Gn(0, n, 1), t, u, r);
            }
            function Jn(n, t, e, r) {
              arguments.length <= 3 && ((r = e), (e = t), (t = It(n) ? [] : {})), (r = g(r || m));
              var u = a(e);
              Xt(
                n,
                function (n, e, r) {
                  u(t, n, e, r);
                },
                function (n) {
                  r(n, t);
                },
              );
            }
            function Kn(n, e) {
              var r,
                u = null;
              (e = e || m),
                Ue(
                  n,
                  function (n, e) {
                    a(n)(function (n, i) {
                      (r = arguments.length > 2 ? t(arguments, 1) : i), (u = n), e(!n);
                    });
                  },
                  function () {
                    e(u, r);
                  },
                );
            }
            function Xn(n) {
              return function () {
                return (n.unmemoized || n).apply(null, arguments);
              };
            }
            function Yn(n, e, r) {
              r = F(r || m);
              var u = a(e);
              if (!n()) return r(null);
              var i = function (e) {
                if (e) return r(e);
                if (n()) return u(i);
                var o = t(arguments, 1);
                r.apply(null, [null].concat(o));
              };
              u(i);
            }
            function Zn(n, t, e) {
              Yn(
                function () {
                  return !n.apply(this, arguments);
                },
                t,
                e,
              );
            }
            var nt,
              tt = function (n) {
                var e = t(arguments, 1);
                return function () {
                  var r = t(arguments);
                  return n.apply(null, e.concat(r));
                };
              },
              et = function (n) {
                return function () {
                  var e = t(arguments),
                    r = e.pop();
                  n.call(this, e, r);
                };
              },
              rt = 'function' == typeof setImmediate && setImmediate,
              ut = 'object' == typeof process && 'function' == typeof process.nextTick,
              it = u((nt = rt ? setImmediate : ut ? process.nextTick : r)),
              ot = 'function' == typeof Symbol,
              ct = 'object' == typeof global && global && global.Object === Object && global,
              ft = 'object' == typeof self && self && self.Object === Object && self,
              at = ct || ft || Function('return this')(),
              lt = at.Symbol,
              st = Object.prototype,
              pt = st.hasOwnProperty,
              ht = st.toString,
              yt = lt ? lt.toStringTag : void 0,
              vt = Object.prototype.toString,
              dt = '[object Null]',
              mt = '[object Undefined]',
              gt = lt ? lt.toStringTag : void 0,
              bt = '[object AsyncFunction]',
              jt = '[object Function]',
              St = '[object GeneratorFunction]',
              kt = '[object Proxy]',
              Lt = 9007199254740991,
              Ot = {},
              wt = 'function' == typeof Symbol && Symbol.iterator,
              xt = function (n) {
                return wt && n[wt] && n[wt]();
              },
              Et = '[object Arguments]',
              At = Object.prototype,
              Tt = At.hasOwnProperty,
              Bt = At.propertyIsEnumerable,
              Ft = S(
                (function () {
                  return arguments;
                })(),
              )
                ? S
                : function (n) {
                    return j(n) && Tt.call(n, 'callee') && !Bt.call(n, 'callee');
                  },
              It = Array.isArray,
              _t = 'object' == typeof n && n && !n.nodeType && n,
              Mt = _t && 'object' == typeof module && module && !module.nodeType && module,
              Ut = Mt && Mt.exports === _t ? at.Buffer : void 0,
              qt =
                (Ut ? Ut.isBuffer : void 0) ||
                function () {
                  return !1;
                },
              zt = 9007199254740991,
              Pt = /^(?:0|[1-9]\d*)$/,
              Vt = {};
            (Vt['[object Float32Array]'] = Vt['[object Float64Array]'] = Vt['[object Int8Array]'] = Vt['[object Int16Array]'] = Vt[
              '[object Int32Array]'
            ] = Vt['[object Uint8Array]'] = Vt['[object Uint8ClampedArray]'] = Vt['[object Uint16Array]'] = Vt['[object Uint32Array]'] = !0),
              (Vt['[object Arguments]'] = Vt['[object Array]'] = Vt['[object ArrayBuffer]'] = Vt['[object Boolean]'] = Vt['[object DataView]'] = Vt[
                '[object Date]'
              ] = Vt['[object Error]'] = Vt['[object Function]'] = Vt['[object Map]'] = Vt['[object Number]'] = Vt['[object Object]'] = Vt[
                '[object RegExp]'
              ] = Vt['[object Set]'] = Vt['[object String]'] = Vt['[object WeakMap]'] = !1);
            var Dt = 'object' == typeof n && n && !n.nodeType && n,
              Rt = Dt && 'object' == typeof module && module && !module.nodeType && module,
              Ct = Rt && Rt.exports === Dt && ct.process,
              $t = (function () {
                try {
                  var n = Rt && Rt.require && Rt.require('util').types;
                  return n || (Ct && Ct.binding && Ct.binding('util'));
                } catch (n) {}
              })(),
              Wt = $t && $t.isTypedArray,
              Nt = Wt
                ? (function (n) {
                    return function (t) {
                      return n(t);
                    };
                  })(Wt)
                : function (n) {
                    return j(n) && v(n.length) && !!Vt[h(n)];
                  },
              Qt = Object.prototype.hasOwnProperty,
              Gt = Object.prototype,
              Ht = (function (n, t) {
                return function (e) {
                  return n(t(e));
                };
              })(Object.keys, Object),
              Jt = Object.prototype.hasOwnProperty,
              Kt = M(_, 1 / 0),
              Xt = function (n, t, e) {
                (d(n) ? U : Kt)(n, a(t), e);
              },
              Yt = q(z),
              Zt = l(Yt),
              ne = P(z),
              te = M(ne, 1),
              ee = l(te),
              re = (function (n) {
                return function (t, e, r) {
                  for (var u = -1, i = Object(t), o = r(t), c = o.length; c--; ) {
                    var f = o[n ? c : ++u];
                    if (!1 === e(i[f], f, i)) break;
                  }
                  return t;
                };
              })(),
              ue = function (n, e, r) {
                function u(n, t) {
                  d.push(function () {
                    f(n, t);
                  });
                }
                function i() {
                  if (0 === d.length && 0 === h) return r(null, p);
                  for (; d.length && h < e; ) d.shift()();
                }
                function o(n, t) {
                  var e = v[n];
                  e || (e = v[n] = []), e.push(t);
                }
                function c(n) {
                  V(v[n] || [], function (n) {
                    n();
                  }),
                    i();
                }
                function f(n, e) {
                  if (!y) {
                    var u = F(function (e, u) {
                      if ((h--, arguments.length > 2 && (u = t(arguments, 1)), e)) {
                        var i = {};
                        D(p, function (n, t) {
                          i[t] = n;
                        }),
                          (i[n] = u),
                          (y = !0),
                          (v = Object.create(null)),
                          r(e, i);
                      } else (p[n] = u), c(n);
                    });
                    h++;
                    var i = a(e[e.length - 1]);
                    e.length > 1 ? i(p, u) : i(u);
                  }
                }
                function l(t) {
                  var e = [];
                  return (
                    D(n, function (n, r) {
                      It(n) && W(n, t, 0) >= 0 && e.push(r);
                    }),
                    e
                  );
                }
                'function' == typeof e && ((r = e), (e = null)), (r = g(r || m));
                var s = x(n).length;
                if (!s) return r(null);
                e || (e = s);
                var p = {},
                  h = 0,
                  y = !1,
                  v = Object.create(null),
                  d = [],
                  b = [],
                  j = {};
                D(n, function (t, e) {
                  if (!It(t)) return u(e, [t]), void b.push(e);
                  var r = t.slice(0, t.length - 1),
                    i = r.length;
                  if (0 === i) return u(e, t), void b.push(e);
                  (j[e] = i),
                    V(r, function (c) {
                      if (!n[c]) throw new Error('async.auto task `' + e + '` has a non-existent dependency `' + c + '` in ' + r.join(', '));
                      o(c, function () {
                        0 === --i && u(e, t);
                      });
                    });
                }),
                  (function () {
                    for (var n = 0; b.length; )
                      n++,
                        V(l(b.pop()), function (n) {
                          0 == --j[n] && b.push(n);
                        });
                    if (n !== s) throw new Error('async.auto cannot execute tasks due to a recursive dependency');
                  })(),
                  i();
              },
              ie = '[object Symbol]',
              oe = 1 / 0,
              ce = lt ? lt.prototype : void 0,
              fe = ce ? ce.toString : void 0,
              ae = RegExp('[\\u200d\\ud800-\\udfff\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff\\ufe0e\\ufe0f]'),
              le = '[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]',
              se = '\\ud83c[\\udffb-\\udfff]',
              pe = '(?:\\ud83c[\\udde6-\\uddff]){2}',
              he = '[\\ud800-\\udbff][\\udc00-\\udfff]',
              ye = '(?:[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]|\\ud83c[\\udffb-\\udfff])?',
              ve = '[\\ufe0e\\ufe0f]?' + ye + ('(?:\\u200d(?:' + ['[^\\ud800-\\udfff]', pe, he].join('|') + ')[\\ufe0e\\ufe0f]?' + ye + ')*'),
              de = '(?:' + ['[^\\ud800-\\udfff]' + le + '?', le, pe, he, '[\\ud800-\\udfff]'].join('|') + ')',
              me = RegExp(se + '(?=' + se + ')|' + de + ve, 'g'),
              ge = /^\s+|\s+$/g,
              be = /^(?:async\s+)?(function)?\s*[^\(]*\(\s*([^\)]*)\)/m,
              je = /,/,
              Se = /(=.+)?(\s*)$/,
              ke = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm;
            (cn.prototype.removeLink = function (n) {
              return (
                n.prev ? (n.prev.next = n.next) : (this.head = n.next),
                n.next ? (n.next.prev = n.prev) : (this.tail = n.prev),
                (n.prev = n.next = null),
                (this.length -= 1),
                n
              );
            }),
              (cn.prototype.empty = function () {
                for (; this.head; ) this.shift();
                return this;
              }),
              (cn.prototype.insertAfter = function (n, t) {
                (t.prev = n), (t.next = n.next), n.next ? (n.next.prev = t) : (this.tail = t), (n.next = t), (this.length += 1);
              }),
              (cn.prototype.insertBefore = function (n, t) {
                (t.prev = n.prev), (t.next = n), n.prev ? (n.prev.next = t) : (this.head = t), (n.prev = t), (this.length += 1);
              }),
              (cn.prototype.unshift = function (n) {
                this.head ? this.insertBefore(this.head, n) : fn(this, n);
              }),
              (cn.prototype.push = function (n) {
                this.tail ? this.insertAfter(this.tail, n) : fn(this, n);
              }),
              (cn.prototype.shift = function () {
                return this.head && this.removeLink(this.head);
              }),
              (cn.prototype.pop = function () {
                return this.tail && this.removeLink(this.tail);
              }),
              (cn.prototype.toArray = function () {
                for (var n = Array(this.length), t = this.head, e = 0; e < this.length; e++) (n[e] = t.data), (t = t.next);
                return n;
              }),
              (cn.prototype.remove = function (n) {
                for (var t = this.head; t; ) {
                  var e = t.next;
                  n(t) && this.removeLink(t), (t = e);
                }
                return this;
              });
            var Le,
              Oe = M(_, 1),
              we = function () {
                return pn.apply(null, t(arguments).reverse());
              },
              xe = Array.prototype.concat,
              Ee = function (n, e, r, u) {
                u = u || m;
                var i = a(r);
                ne(
                  n,
                  e,
                  function (n, e) {
                    i(n, function (n) {
                      return n ? e(n) : e(null, t(arguments, 1));
                    });
                  },
                  function (n, t) {
                    for (var e = [], r = 0; r < t.length; r++) t[r] && (e = xe.apply(e, t[r]));
                    return u(n, e);
                  },
                );
              },
              Ae = M(Ee, 1 / 0),
              Te = M(Ee, 1),
              Be = function () {
                var n = t(arguments),
                  e = [null].concat(n);
                return function () {
                  return arguments[arguments.length - 1].apply(this, e);
                };
              },
              Fe = q(yn(hn, vn)),
              Ie = P(yn(hn, vn)),
              _e = M(Ie, 1),
              Me = dn('dir'),
              Ue = M(Ln, 1),
              qe = q(yn(wn, wn)),
              ze = P(yn(wn, wn)),
              Pe = M(ze, 1),
              Ve = q(Tn),
              De = P(Tn),
              Re = M(De, 1),
              Ce = function (n, t, e, r) {
                r = r || m;
                var u = a(e);
                ne(
                  n,
                  t,
                  function (n, t) {
                    u(n, function (e, r) {
                      return e ? t(e) : t(null, { key: r, val: n });
                    });
                  },
                  function (n, t) {
                    for (var e = {}, u = Object.prototype.hasOwnProperty, i = 0; i < t.length; i++)
                      if (t[i]) {
                        var o = t[i].key,
                          c = t[i].val;
                        u.call(e, o) ? e[o].push(c) : (e[o] = [c]);
                      }
                    return r(n, e);
                  },
                );
              },
              $e = M(Ce, 1 / 0),
              We = M(Ce, 1),
              Ne = dn('log'),
              Qe = M(Fn, 1 / 0),
              Ge = M(Fn, 1),
              He = u((Le = ut ? process.nextTick : rt ? setImmediate : r)),
              Je = function (n, t) {
                var e = a(n);
                return an(
                  function (n, t) {
                    e(n[0], t);
                  },
                  t,
                  1,
                );
              },
              Ke = function (n, t) {
                var e = Je(n, t);
                return (
                  (e.push = function (n, t, r) {
                    if ((null == r && (r = m), 'function' != typeof r)) throw new Error('task callback must be a function');
                    if (((e.started = !0), It(n) || (n = [n]), 0 === n.length))
                      return it(function () {
                        e.drain();
                      });
                    t = t || 0;
                    for (var u = e._tasks.head; u && t >= u.priority; ) u = u.next;
                    for (var i = 0, o = n.length; i < o; i++) {
                      var c = { data: n[i], priority: t, callback: r };
                      u ? e._tasks.insertBefore(u, c) : e._tasks.push(c);
                    }
                    it(e.process);
                  }),
                  delete e.unshift,
                  e
                );
              },
              Xe = q(Rn),
              Ye = P(Rn),
              Ze = M(Ye, 1),
              nr = function (n, t) {
                t || ((t = n), (n = null));
                var e = a(t);
                return et(function (t, r) {
                  function u(n) {
                    e.apply(null, t.concat(n));
                  }
                  n ? $n(n, u, r) : $n(u, r);
                });
              },
              tr = q(yn(Boolean, hn)),
              er = P(yn(Boolean, hn)),
              rr = M(er, 1),
              ur = Math.ceil,
              ir = Math.max,
              or = M(Hn, 1 / 0),
              cr = M(Hn, 1),
              fr = function (n, e) {
                function r(t) {
                  var e = a(n[i++]);
                  t.push(F(u)), e.apply(null, t);
                }
                function u(u) {
                  if (u || i === n.length) return e.apply(null, arguments);
                  r(t(arguments, 1));
                }
                if (((e = g(e || m)), !It(n))) return e(new Error('First argument to waterfall must be an array of functions'));
                if (!n.length) return e();
                var i = 0;
                r([]);
              },
              ar = {
                apply: tt,
                applyEach: Zt,
                applyEachSeries: ee,
                asyncify: i,
                auto: ue,
                autoInject: on,
                cargo: ln,
                compose: we,
                concat: Ae,
                concatLimit: Ee,
                concatSeries: Te,
                constant: Be,
                detect: Fe,
                detectLimit: Ie,
                detectSeries: _e,
                dir: Me,
                doDuring: mn,
                doUntil: bn,
                doWhilst: gn,
                during: jn,
                each: kn,
                eachLimit: Ln,
                eachOf: Xt,
                eachOfLimit: _,
                eachOfSeries: Oe,
                eachSeries: Ue,
                ensureAsync: On,
                every: qe,
                everyLimit: ze,
                everySeries: Pe,
                filter: Ve,
                filterLimit: De,
                filterSeries: Re,
                forever: Bn,
                groupBy: $e,
                groupByLimit: Ce,
                groupBySeries: We,
                log: Ne,
                map: Yt,
                mapLimit: ne,
                mapSeries: te,
                mapValues: Qe,
                mapValuesLimit: Fn,
                mapValuesSeries: Ge,
                memoize: _n,
                nextTick: He,
                parallel: Un,
                parallelLimit: qn,
                priorityQueue: Ke,
                queue: Je,
                race: zn,
                reduce: sn,
                reduceRight: Pn,
                reflect: Vn,
                reflectAll: Dn,
                reject: Xe,
                rejectLimit: Ye,
                rejectSeries: Ze,
                retry: $n,
                retryable: nr,
                seq: pn,
                series: Wn,
                setImmediate: it,
                some: tr,
                someLimit: er,
                someSeries: rr,
                sortBy: Nn,
                timeout: Qn,
                times: or,
                timesLimit: Hn,
                timesSeries: cr,
                transform: Jn,
                tryEach: Kn,
                unmemoize: Xn,
                until: Zn,
                waterfall: fr,
                whilst: Yn,
                all: qe,
                allLimit: ze,
                allSeries: Pe,
                any: tr,
                anyLimit: er,
                anySeries: rr,
                find: Fe,
                findLimit: Ie,
                findSeries: _e,
                forEach: kn,
                forEachSeries: Ue,
                forEachLimit: Ln,
                forEachOf: Xt,
                forEachOfSeries: Oe,
                forEachOfLimit: _,
                inject: sn,
                foldl: sn,
                foldr: Pn,
                select: Ve,
                selectLimit: De,
                selectSeries: Re,
                wrapSync: i,
              };
            (n.default = ar),
              (n.apply = tt),
              (n.applyEach = Zt),
              (n.applyEachSeries = ee),
              (n.asyncify = i),
              (n.auto = ue),
              (n.autoInject = on),
              (n.cargo = ln),
              (n.compose = we),
              (n.concat = Ae),
              (n.concatLimit = Ee),
              (n.concatSeries = Te),
              (n.constant = Be),
              (n.detect = Fe),
              (n.detectLimit = Ie),
              (n.detectSeries = _e),
              (n.dir = Me),
              (n.doDuring = mn),
              (n.doUntil = bn),
              (n.doWhilst = gn),
              (n.during = jn),
              (n.each = kn),
              (n.eachLimit = Ln),
              (n.eachOf = Xt),
              (n.eachOfLimit = _),
              (n.eachOfSeries = Oe),
              (n.eachSeries = Ue),
              (n.ensureAsync = On),
              (n.every = qe),
              (n.everyLimit = ze),
              (n.everySeries = Pe),
              (n.filter = Ve),
              (n.filterLimit = De),
              (n.filterSeries = Re),
              (n.forever = Bn),
              (n.groupBy = $e),
              (n.groupByLimit = Ce),
              (n.groupBySeries = We),
              (n.log = Ne),
              (n.map = Yt),
              (n.mapLimit = ne),
              (n.mapSeries = te),
              (n.mapValues = Qe),
              (n.mapValuesLimit = Fn),
              (n.mapValuesSeries = Ge),
              (n.memoize = _n),
              (n.nextTick = He),
              (n.parallel = Un),
              (n.parallelLimit = qn),
              (n.priorityQueue = Ke),
              (n.queue = Je),
              (n.race = zn),
              (n.reduce = sn),
              (n.reduceRight = Pn),
              (n.reflect = Vn),
              (n.reflectAll = Dn),
              (n.reject = Xe),
              (n.rejectLimit = Ye),
              (n.rejectSeries = Ze),
              (n.retry = $n),
              (n.retryable = nr),
              (n.seq = pn),
              (n.series = Wn),
              (n.setImmediate = it),
              (n.some = tr),
              (n.someLimit = er),
              (n.someSeries = rr),
              (n.sortBy = Nn),
              (n.timeout = Qn),
              (n.times = or),
              (n.timesLimit = Hn),
              (n.timesSeries = cr),
              (n.transform = Jn),
              (n.tryEach = Kn),
              (n.unmemoize = Xn),
              (n.until = Zn),
              (n.waterfall = fr),
              (n.whilst = Yn),
              (n.all = qe),
              (n.allLimit = ze),
              (n.allSeries = Pe),
              (n.any = tr),
              (n.anyLimit = er),
              (n.anySeries = rr),
              (n.find = Fe),
              (n.findLimit = Ie),
              (n.findSeries = _e),
              (n.forEach = kn),
              (n.forEachSeries = Ue),
              (n.forEachLimit = Ln),
              (n.forEachOf = Xt),
              (n.forEachOfSeries = Oe),
              (n.forEachOfLimit = _),
              (n.inject = sn),
              (n.foldl = sn),
              (n.foldr = Pn),
              (n.select = Ve),
              (n.selectLimit = De),
              (n.selectSeries = Re),
              (n.wrapSync = i),
              Object.defineProperty(n, '__esModule', { value: !0 });
          });
        }.call(
          this,
          require('_process'),
          typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : {},
          require('timers').setImmediate,
        ));
      },
      { _process: 10, timers: 11 },
    ],
    4: [
      function (require, module, exports) {
        (function (global) {
          (function () {
            function n(n, t) {
              return n.set(t[0], t[1]), n;
            }
            function t(n, t) {
              return n.add(t), n;
            }
            function r(n, t, r) {
              switch (r.length) {
                case 0:
                  return n.call(t);
                case 1:
                  return n.call(t, r[0]);
                case 2:
                  return n.call(t, r[0], r[1]);
                case 3:
                  return n.call(t, r[0], r[1], r[2]);
              }
              return n.apply(t, r);
            }
            function e(n, t, r, e) {
              for (var u = -1, i = null == n ? 0 : n.length; ++u < i; ) {
                var o = n[u];
                t(e, o, r(o), n);
              }
              return e;
            }
            function u(n, t) {
              for (var r = -1, e = null == n ? 0 : n.length; ++r < e && !1 !== t(n[r], r, n); );
              return n;
            }
            function i(n, t) {
              for (var r = null == n ? 0 : n.length; r-- && !1 !== t(n[r], r, n); );
              return n;
            }
            function o(n, t) {
              for (var r = -1, e = null == n ? 0 : n.length; ++r < e; ) if (!t(n[r], r, n)) return !1;
              return !0;
            }
            function f(n, t) {
              for (var r = -1, e = null == n ? 0 : n.length, u = 0, i = []; ++r < e; ) {
                var o = n[r];
                t(o, r, n) && (i[u++] = o);
              }
              return i;
            }
            function c(n, t) {
              return !!(null == n ? 0 : n.length) && b(n, t, 0) > -1;
            }
            function a(n, t, r) {
              for (var e = -1, u = null == n ? 0 : n.length; ++e < u; ) if (r(t, n[e])) return !0;
              return !1;
            }
            function l(n, t) {
              for (var r = -1, e = null == n ? 0 : n.length, u = Array(e); ++r < e; ) u[r] = t(n[r], r, n);
              return u;
            }
            function s(n, t) {
              for (var r = -1, e = t.length, u = n.length; ++r < e; ) n[u + r] = t[r];
              return n;
            }
            function h(n, t, r, e) {
              var u = -1,
                i = null == n ? 0 : n.length;
              for (e && i && (r = n[++u]); ++u < i; ) r = t(r, n[u], u, n);
              return r;
            }
            function p(n, t, r, e) {
              var u = null == n ? 0 : n.length;
              for (e && u && (r = n[--u]); u--; ) r = t(r, n[u], u, n);
              return r;
            }
            function _(n, t) {
              for (var r = -1, e = null == n ? 0 : n.length; ++r < e; ) if (t(n[r], r, n)) return !0;
              return !1;
            }
            function v(n) {
              return n.split('');
            }
            function g(n) {
              return n.match(Bt) || [];
            }
            function y(n, t, r) {
              var e;
              return (
                r(n, function (n, r, u) {
                  if (t(n, r, u)) return (e = r), !1;
                }),
                e
              );
            }
            function d(n, t, r, e) {
              for (var u = n.length, i = r + (e ? 1 : -1); e ? i-- : ++i < u; ) if (t(n[i], i, n)) return i;
              return -1;
            }
            function b(n, t, r) {
              return t === t ? K(n, t, r) : d(n, m, r);
            }
            function w(n, t, r, e) {
              for (var u = r - 1, i = n.length; ++u < i; ) if (e(n[u], t)) return u;
              return -1;
            }
            function m(n) {
              return n !== n;
            }
            function x(n, t) {
              var r = null == n ? 0 : n.length;
              return r ? I(n, t) / r : Sn;
            }
            function j(n) {
              return function (t) {
                return null == t ? X : t[n];
              };
            }
            function A(n) {
              return function (t) {
                return null == n ? X : n[t];
              };
            }
            function k(n, t, r, e, u) {
              return (
                u(n, function (n, u, i) {
                  r = e ? ((e = !1), n) : t(r, n, u, i);
                }),
                r
              );
            }
            function O(n, t) {
              var r = n.length;
              for (n.sort(t); r--; ) n[r] = n[r].value;
              return n;
            }
            function I(n, t) {
              for (var r, e = -1, u = n.length; ++e < u; ) {
                var i = t(n[e]);
                i !== X && (r = r === X ? i : r + i);
              }
              return r;
            }
            function R(n, t) {
              for (var r = -1, e = Array(n); ++r < n; ) e[r] = t(r);
              return e;
            }
            function z(n, t) {
              return l(t, function (t) {
                return [t, n[t]];
              });
            }
            function E(n) {
              return function (t) {
                return n(t);
              };
            }
            function S(n, t) {
              return l(t, function (t) {
                return n[t];
              });
            }
            function L(n, t) {
              return n.has(t);
            }
            function W(n, t) {
              for (var r = -1, e = n.length; ++r < e && b(t, n[r], 0) > -1; );
              return r;
            }
            function C(n, t) {
              for (var r = n.length; r-- && b(t, n[r], 0) > -1; );
              return r;
            }
            function U(n, t) {
              for (var r = n.length, e = 0; r--; ) n[r] === t && ++e;
              return e;
            }
            function B(n) {
              return '\\' + xr[n];
            }
            function T(n, t) {
              return null == n ? X : n[t];
            }
            function $(n) {
              return pr.test(n);
            }
            function D(n) {
              return _r.test(n);
            }
            function M(n) {
              for (var t, r = []; !(t = n.next()).done; ) r.push(t.value);
              return r;
            }
            function F(n) {
              var t = -1,
                r = Array(n.size);
              return (
                n.forEach(function (n, e) {
                  r[++t] = [e, n];
                }),
                r
              );
            }
            function N(n, t) {
              return function (r) {
                return n(t(r));
              };
            }
            function P(n, t) {
              for (var r = -1, e = n.length, u = 0, i = []; ++r < e; ) {
                var o = n[r];
                (o !== t && o !== on) || ((n[r] = on), (i[u++] = r));
              }
              return i;
            }
            function q(n) {
              var t = -1,
                r = Array(n.size);
              return (
                n.forEach(function (n) {
                  r[++t] = n;
                }),
                r
              );
            }
            function Z(n) {
              var t = -1,
                r = Array(n.size);
              return (
                n.forEach(function (n) {
                  r[++t] = [n, n];
                }),
                r
              );
            }
            function K(n, t, r) {
              for (var e = r - 1, u = n.length; ++e < u; ) if (n[e] === t) return e;
              return -1;
            }
            function V(n, t, r) {
              for (var e = r + 1; e--; ) if (n[e] === t) return e;
              return e;
            }
            function G(n) {
              return $(n) ? J(n) : Dr(n);
            }
            function H(n) {
              return $(n) ? Y(n) : v(n);
            }
            function J(n) {
              for (var t = (sr.lastIndex = 0); sr.test(n); ) ++t;
              return t;
            }
            function Y(n) {
              return n.match(sr) || [];
            }
            function Q(n) {
              return n.match(hr) || [];
            }
            var X,
              nn = 200,
              tn = 'Unsupported core-js use. Try https://npms.io/search?q=ponyfill.',
              rn = 'Expected a function',
              en = '__lodash_hash_undefined__',
              un = 500,
              on = '__lodash_placeholder__',
              fn = 1,
              cn = 2,
              an = 4,
              ln = 1,
              sn = 2,
              hn = 1,
              pn = 2,
              _n = 4,
              vn = 8,
              gn = 16,
              yn = 32,
              dn = 64,
              bn = 128,
              wn = 256,
              mn = 512,
              xn = 30,
              jn = '...',
              An = 800,
              kn = 16,
              On = 1,
              In = 2,
              Rn = 1 / 0,
              zn = 9007199254740991,
              En = 1.7976931348623157e308,
              Sn = NaN,
              Ln = 4294967295,
              Wn = Ln - 1,
              Cn = Ln >>> 1,
              Un = [
                ['ary', bn],
                ['bind', hn],
                ['bindKey', pn],
                ['curry', vn],
                ['curryRight', gn],
                ['flip', mn],
                ['partial', yn],
                ['partialRight', dn],
                ['rearg', wn],
              ],
              Bn = '[object Arguments]',
              Tn = '[object Array]',
              $n = '[object AsyncFunction]',
              Dn = '[object Boolean]',
              Mn = '[object Date]',
              Fn = '[object DOMException]',
              Nn = '[object Error]',
              Pn = '[object Function]',
              qn = '[object GeneratorFunction]',
              Zn = '[object Map]',
              Kn = '[object Number]',
              Vn = '[object Null]',
              Gn = '[object Object]',
              Hn = '[object Proxy]',
              Jn = '[object RegExp]',
              Yn = '[object Set]',
              Qn = '[object String]',
              Xn = '[object Symbol]',
              nt = '[object Undefined]',
              tt = '[object WeakMap]',
              rt = '[object WeakSet]',
              et = '[object ArrayBuffer]',
              ut = '[object DataView]',
              it = '[object Float32Array]',
              ot = '[object Float64Array]',
              ft = '[object Int8Array]',
              ct = '[object Int16Array]',
              at = '[object Int32Array]',
              lt = '[object Uint8Array]',
              st = '[object Uint8ClampedArray]',
              ht = '[object Uint16Array]',
              pt = '[object Uint32Array]',
              _t = /\b__p \+= '';/g,
              vt = /\b(__p \+=) '' \+/g,
              gt = /(__e\(.*?\)|\b__t\)) \+\n'';/g,
              yt = /&(?:amp|lt|gt|quot|#39);/g,
              dt = /[&<>"']/g,
              bt = RegExp(yt.source),
              wt = RegExp(dt.source),
              mt = /<%-([\s\S]+?)%>/g,
              xt = /<%([\s\S]+?)%>/g,
              jt = /<%=([\s\S]+?)%>/g,
              At = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
              kt = /^\w*$/,
              Ot = /^\./,
              It = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
              Rt = /[\\^$.*+?()[\]{}|]/g,
              zt = RegExp(Rt.source),
              Et = /^\s+|\s+$/g,
              St = /^\s+/,
              Lt = /\s+$/,
              Wt = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/,
              Ct = /\{\n\/\* \[wrapped with (.+)\] \*/,
              Ut = /,? & /,
              Bt = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g,
              Tt = /\\(\\)?/g,
              $t = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,
              Dt = /\w*$/,
              Mt = /^[-+]0x[0-9a-f]+$/i,
              Ft = /^0b[01]+$/i,
              Nt = /^\[object .+?Constructor\]$/,
              Pt = /^0o[0-7]+$/i,
              qt = /^(?:0|[1-9]\d*)$/,
              Zt = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,
              Kt = /($^)/,
              Vt = /['\n\r\u2028\u2029\\]/g,
              Gt = '\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff',
              Ht =
                '\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000',
              Jt = '[' + Ht + ']',
              Yt = '[' + Gt + ']',
              Qt = '[a-z\\xdf-\\xf6\\xf8-\\xff]',
              Xt = '[^\\ud800-\\udfff' + Ht + '\\d+\\u2700-\\u27bfa-z\\xdf-\\xf6\\xf8-\\xffA-Z\\xc0-\\xd6\\xd8-\\xde]',
              nr = '\\ud83c[\\udffb-\\udfff]',
              tr = '(?:\\ud83c[\\udde6-\\uddff]){2}',
              rr = '[\\ud800-\\udbff][\\udc00-\\udfff]',
              er = '[A-Z\\xc0-\\xd6\\xd8-\\xde]',
              ur = '(?:' + Qt + '|' + Xt + ')',
              ir = '(?:[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]|\\ud83c[\\udffb-\\udfff])?',
              or = '[\\ufe0e\\ufe0f]?' + ir + ('(?:\\u200d(?:' + ['[^\\ud800-\\udfff]', tr, rr].join('|') + ')[\\ufe0e\\ufe0f]?' + ir + ')*'),
              fr = '(?:' + ['[\\u2700-\\u27bf]', tr, rr].join('|') + ')' + or,
              cr = '(?:' + ['[^\\ud800-\\udfff]' + Yt + '?', Yt, tr, rr, '[\\ud800-\\udfff]'].join('|') + ')',
              ar = RegExp("['’]", 'g'),
              lr = RegExp(Yt, 'g'),
              sr = RegExp(nr + '(?=' + nr + ')|' + cr + or, 'g'),
              hr = RegExp(
                [
                  er + '?' + Qt + "+(?:['’](?:d|ll|m|re|s|t|ve))?(?=" + [Jt, er, '$'].join('|') + ')',
                  "(?:[A-Z\\xc0-\\xd6\\xd8-\\xde]|[^\\ud800-\\udfff\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000\\d+\\u2700-\\u27bfa-z\\xdf-\\xf6\\xf8-\\xffA-Z\\xc0-\\xd6\\xd8-\\xde])+(?:['’](?:D|LL|M|RE|S|T|VE))?(?=" +
                    [Jt, er + ur, '$'].join('|') +
                    ')',
                  er + '?' + ur + "+(?:['’](?:d|ll|m|re|s|t|ve))?",
                  er + "+(?:['’](?:D|LL|M|RE|S|T|VE))?",
                  '\\d*(?:(?:1ST|2ND|3RD|(?![123])\\dTH)\\b)',
                  '\\d*(?:(?:1st|2nd|3rd|(?![123])\\dth)\\b)',
                  '\\d+',
                  fr,
                ].join('|'),
                'g',
              ),
              pr = RegExp('[\\u200d\\ud800-\\udfff' + Gt + '\\ufe0e\\ufe0f]'),
              _r = /[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/,
              vr = [
                'Array',
                'Buffer',
                'DataView',
                'Date',
                'Error',
                'Float32Array',
                'Float64Array',
                'Function',
                'Int8Array',
                'Int16Array',
                'Int32Array',
                'Map',
                'Math',
                'Object',
                'Promise',
                'RegExp',
                'Set',
                'String',
                'Symbol',
                'TypeError',
                'Uint8Array',
                'Uint8ClampedArray',
                'Uint16Array',
                'Uint32Array',
                'WeakMap',
                '_',
                'clearTimeout',
                'isFinite',
                'parseInt',
                'setTimeout',
              ],
              gr = -1,
              yr = {};
            (yr[it] = yr[ot] = yr[ft] = yr[ct] = yr[at] = yr[lt] = yr[st] = yr[ht] = yr[pt] = !0),
              (yr[Bn] = yr[Tn] = yr[et] = yr[Dn] = yr[ut] = yr[Mn] = yr[Nn] = yr[Pn] = yr[Zn] = yr[Kn] = yr[Gn] = yr[Jn] = yr[Yn] = yr[Qn] = yr[
                tt
              ] = !1);
            var dr = {};
            (dr[Bn] = dr[Tn] = dr[et] = dr[ut] = dr[Dn] = dr[Mn] = dr[it] = dr[ot] = dr[ft] = dr[ct] = dr[at] = dr[Zn] = dr[Kn] = dr[Gn] = dr[
              Jn
            ] = dr[Yn] = dr[Qn] = dr[Xn] = dr[lt] = dr[st] = dr[ht] = dr[pt] = !0),
              (dr[Nn] = dr[Pn] = dr[tt] = !1);
            var br = {
                À: 'A',
                Á: 'A',
                Â: 'A',
                Ã: 'A',
                Ä: 'A',
                Å: 'A',
                à: 'a',
                á: 'a',
                â: 'a',
                ã: 'a',
                ä: 'a',
                å: 'a',
                Ç: 'C',
                ç: 'c',
                Ð: 'D',
                ð: 'd',
                È: 'E',
                É: 'E',
                Ê: 'E',
                Ë: 'E',
                è: 'e',
                é: 'e',
                ê: 'e',
                ë: 'e',
                Ì: 'I',
                Í: 'I',
                Î: 'I',
                Ï: 'I',
                ì: 'i',
                í: 'i',
                î: 'i',
                ï: 'i',
                Ñ: 'N',
                ñ: 'n',
                Ò: 'O',
                Ó: 'O',
                Ô: 'O',
                Õ: 'O',
                Ö: 'O',
                Ø: 'O',
                ò: 'o',
                ó: 'o',
                ô: 'o',
                õ: 'o',
                ö: 'o',
                ø: 'o',
                Ù: 'U',
                Ú: 'U',
                Û: 'U',
                Ü: 'U',
                ù: 'u',
                ú: 'u',
                û: 'u',
                ü: 'u',
                Ý: 'Y',
                ý: 'y',
                ÿ: 'y',
                Æ: 'Ae',
                æ: 'ae',
                Þ: 'Th',
                þ: 'th',
                ß: 'ss',
                Ā: 'A',
                Ă: 'A',
                Ą: 'A',
                ā: 'a',
                ă: 'a',
                ą: 'a',
                Ć: 'C',
                Ĉ: 'C',
                Ċ: 'C',
                Č: 'C',
                ć: 'c',
                ĉ: 'c',
                ċ: 'c',
                č: 'c',
                Ď: 'D',
                Đ: 'D',
                ď: 'd',
                đ: 'd',
                Ē: 'E',
                Ĕ: 'E',
                Ė: 'E',
                Ę: 'E',
                Ě: 'E',
                ē: 'e',
                ĕ: 'e',
                ė: 'e',
                ę: 'e',
                ě: 'e',
                Ĝ: 'G',
                Ğ: 'G',
                Ġ: 'G',
                Ģ: 'G',
                ĝ: 'g',
                ğ: 'g',
                ġ: 'g',
                ģ: 'g',
                Ĥ: 'H',
                Ħ: 'H',
                ĥ: 'h',
                ħ: 'h',
                Ĩ: 'I',
                Ī: 'I',
                Ĭ: 'I',
                Į: 'I',
                İ: 'I',
                ĩ: 'i',
                ī: 'i',
                ĭ: 'i',
                į: 'i',
                ı: 'i',
                Ĵ: 'J',
                ĵ: 'j',
                Ķ: 'K',
                ķ: 'k',
                ĸ: 'k',
                Ĺ: 'L',
                Ļ: 'L',
                Ľ: 'L',
                Ŀ: 'L',
                Ł: 'L',
                ĺ: 'l',
                ļ: 'l',
                ľ: 'l',
                ŀ: 'l',
                ł: 'l',
                Ń: 'N',
                Ņ: 'N',
                Ň: 'N',
                Ŋ: 'N',
                ń: 'n',
                ņ: 'n',
                ň: 'n',
                ŋ: 'n',
                Ō: 'O',
                Ŏ: 'O',
                Ő: 'O',
                ō: 'o',
                ŏ: 'o',
                ő: 'o',
                Ŕ: 'R',
                Ŗ: 'R',
                Ř: 'R',
                ŕ: 'r',
                ŗ: 'r',
                ř: 'r',
                Ś: 'S',
                Ŝ: 'S',
                Ş: 'S',
                Š: 'S',
                ś: 's',
                ŝ: 's',
                ş: 's',
                š: 's',
                Ţ: 'T',
                Ť: 'T',
                Ŧ: 'T',
                ţ: 't',
                ť: 't',
                ŧ: 't',
                Ũ: 'U',
                Ū: 'U',
                Ŭ: 'U',
                Ů: 'U',
                Ű: 'U',
                Ų: 'U',
                ũ: 'u',
                ū: 'u',
                ŭ: 'u',
                ů: 'u',
                ű: 'u',
                ų: 'u',
                Ŵ: 'W',
                ŵ: 'w',
                Ŷ: 'Y',
                ŷ: 'y',
                Ÿ: 'Y',
                Ź: 'Z',
                Ż: 'Z',
                Ž: 'Z',
                ź: 'z',
                ż: 'z',
                ž: 'z',
                Ĳ: 'IJ',
                ĳ: 'ij',
                Œ: 'Oe',
                œ: 'oe',
                ŉ: "'n",
                ſ: 's',
              },
              wr = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' },
              mr = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'" },
              xr = { '\\': '\\', "'": "'", '\n': 'n', '\r': 'r', '\u2028': 'u2028', '\u2029': 'u2029' },
              jr = parseFloat,
              Ar = parseInt,
              kr = 'object' == typeof global && global && global.Object === Object && global,
              Or = 'object' == typeof self && self && self.Object === Object && self,
              Ir = kr || Or || Function('return this')(),
              Rr = 'object' == typeof exports && exports && !exports.nodeType && exports,
              zr = Rr && 'object' == typeof module && module && !module.nodeType && module,
              Er = zr && zr.exports === Rr,
              Sr = Er && kr.process,
              Lr = (function () {
                try {
                  return Sr && Sr.binding && Sr.binding('util');
                } catch (n) {}
              })(),
              Wr = Lr && Lr.isArrayBuffer,
              Cr = Lr && Lr.isDate,
              Ur = Lr && Lr.isMap,
              Br = Lr && Lr.isRegExp,
              Tr = Lr && Lr.isSet,
              $r = Lr && Lr.isTypedArray,
              Dr = j('length'),
              Mr = A(br),
              Fr = A(wr),
              Nr = A(mr),
              Pr = (function v(A) {
                function K(n) {
                  if (no(n) && !Zc(n) && !(n instanceof Bt)) {
                    if (n instanceof Y) return n;
                    if (qo.call(n, '__wrapped__')) return Ai(n);
                  }
                  return new Y(n);
                }
                function J() {}
                function Y(n, t) {
                  (this.__wrapped__ = n), (this.__actions__ = []), (this.__chain__ = !!t), (this.__index__ = 0), (this.__values__ = X);
                }
                function Bt(n) {
                  (this.__wrapped__ = n),
                    (this.__actions__ = []),
                    (this.__dir__ = 1),
                    (this.__filtered__ = !1),
                    (this.__iteratees__ = []),
                    (this.__takeCount__ = Ln),
                    (this.__views__ = []);
                }
                function Gt(n) {
                  var t = -1,
                    r = null == n ? 0 : n.length;
                  for (this.clear(); ++t < r; ) {
                    var e = n[t];
                    this.set(e[0], e[1]);
                  }
                }
                function Ht(n) {
                  var t = -1,
                    r = null == n ? 0 : n.length;
                  for (this.clear(); ++t < r; ) {
                    var e = n[t];
                    this.set(e[0], e[1]);
                  }
                }
                function Jt(n) {
                  var t = -1,
                    r = null == n ? 0 : n.length;
                  for (this.clear(); ++t < r; ) {
                    var e = n[t];
                    this.set(e[0], e[1]);
                  }
                }
                function Yt(n) {
                  var t = -1,
                    r = null == n ? 0 : n.length;
                  for (this.__data__ = new Jt(); ++t < r; ) this.add(n[t]);
                }
                function Qt(n) {
                  var t = (this.__data__ = new Ht(n));
                  this.size = t.size;
                }
                function Xt(n, t) {
                  var r = Zc(n),
                    e = !r && qc(n),
                    u = !r && !e && Vc(n),
                    i = !r && !e && !u && Qc(n),
                    o = r || e || u || i,
                    f = o ? R(n.length, To) : [],
                    c = f.length;
                  for (var a in n)
                    (!t && !qo.call(n, a)) ||
                      (o &&
                        ('length' == a ||
                          (u && ('offset' == a || 'parent' == a)) ||
                          (i && ('buffer' == a || 'byteLength' == a || 'byteOffset' == a)) ||
                          ei(a, c))) ||
                      f.push(a);
                  return f;
                }
                function nr(n) {
                  var t = n.length;
                  return t ? n[xe(0, t - 1)] : X;
                }
                function tr(n, t) {
                  return wi(ou(n), pr(t, 0, n.length));
                }
                function rr(n) {
                  return wi(ou(n));
                }
                function er(n, t, r) {
                  ((r === X || Ki(n[t], r)) && (r !== X || t in n)) || sr(n, t, r);
                }
                function ur(n, t, r) {
                  var e = n[t];
                  (qo.call(n, t) && Ki(e, r) && (r !== X || t in n)) || sr(n, t, r);
                }
                function ir(n, t) {
                  for (var r = n.length; r--; ) if (Ki(n[r][0], t)) return r;
                  return -1;
                }
                function or(n, t, r, e) {
                  return (
                    Pf(n, function (n, u, i) {
                      t(e, n, r(n), i);
                    }),
                    e
                  );
                }
                function fr(n, t) {
                  return n && fu(t, _o(t), n);
                }
                function cr(n, t) {
                  return n && fu(t, vo(t), n);
                }
                function sr(n, t, r) {
                  '__proto__' == t && af ? af(n, t, { configurable: !0, enumerable: !0, value: r, writable: !0 }) : (n[t] = r);
                }
                function hr(n, t) {
                  for (var r = -1, e = t.length, u = Eo(e), i = null == n; ++r < e; ) u[r] = i ? X : ho(n, t[r]);
                  return u;
                }
                function pr(n, t, r) {
                  return n === n && (r !== X && (n = n <= r ? n : r), t !== X && (n = n >= t ? n : t)), n;
                }
                function _r(n, t, r, e, i, o) {
                  var f,
                    c = t & fn,
                    a = t & cn,
                    l = t & an;
                  if ((r && (f = i ? r(n, e, i, o) : r(n)), f !== X)) return f;
                  if (!Xi(n)) return n;
                  var s = Zc(n);
                  if (s) {
                    if (((f = Qu(n)), !c)) return ou(n, f);
                  } else {
                    var h = tc(n),
                      p = h == Pn || h == qn;
                    if (Vc(n)) return Ge(n, c);
                    if (h == Gn || h == Bn || (p && !i)) {
                      if (((f = a || p ? {} : Xu(n)), !c)) return a ? au(n, cr(f, n)) : cu(n, fr(f, n));
                    } else {
                      if (!dr[h]) return i ? n : {};
                      f = ni(n, h, _r, c);
                    }
                  }
                  o || (o = new Qt());
                  var _ = o.get(n);
                  if (_) return _;
                  o.set(n, f);
                  var v = l ? (a ? Fu : Mu) : a ? vo : _o,
                    g = s ? X : v(n);
                  return (
                    u(g || n, function (e, u) {
                      g && (e = n[(u = e)]), ur(f, u, _r(e, t, r, u, n, o));
                    }),
                    f
                  );
                }
                function br(n) {
                  var t = _o(n);
                  return function (r) {
                    return wr(r, n, t);
                  };
                }
                function wr(n, t, r) {
                  var e = r.length;
                  if (null == n) return !e;
                  for (n = Uo(n); e--; ) {
                    var u = r[e],
                      i = t[u],
                      o = n[u];
                    if ((o === X && !(u in n)) || !i(o)) return !1;
                  }
                  return !0;
                }
                function mr(n, t, r) {
                  if ('function' != typeof n) throw new $o(rn);
                  return uc(function () {
                    n.apply(X, r);
                  }, t);
                }
                function xr(n, t, r, e) {
                  var u = -1,
                    i = c,
                    o = !0,
                    f = n.length,
                    s = [],
                    h = t.length;
                  if (!f) return s;
                  r && (t = l(t, E(r))), e ? ((i = a), (o = !1)) : t.length >= nn && ((i = L), (o = !1), (t = new Yt(t)));
                  n: for (; ++u < f; ) {
                    var p = n[u],
                      _ = null == r ? p : r(p);
                    if (((p = e || 0 !== p ? p : 0), o && _ === _)) {
                      for (var v = h; v--; ) if (t[v] === _) continue n;
                      s.push(p);
                    } else i(t, _, e) || s.push(p);
                  }
                  return s;
                }
                function kr(n, t) {
                  var r = !0;
                  return (
                    Pf(n, function (n, e, u) {
                      return (r = !!t(n, e, u));
                    }),
                    r
                  );
                }
                function Or(n, t, r) {
                  for (var e = -1, u = n.length; ++e < u; ) {
                    var i = n[e],
                      o = t(i);
                    if (null != o && (f === X ? o === o && !uo(o) : r(o, f)))
                      var f = o,
                        c = i;
                  }
                  return c;
                }
                function Rr(n, t, r, e) {
                  var u = n.length;
                  for (
                    (r = fo(r)) < 0 && (r = -r > u ? 0 : u + r), (e = e === X || e > u ? u : fo(e)) < 0 && (e += u), e = r > e ? 0 : co(e);
                    r < e;

                  )
                    n[r++] = t;
                  return n;
                }
                function zr(n, t) {
                  var r = [];
                  return (
                    Pf(n, function (n, e, u) {
                      t(n, e, u) && r.push(n);
                    }),
                    r
                  );
                }
                function Sr(n, t, r, e, u) {
                  var i = -1,
                    o = n.length;
                  for (r || (r = ri), u || (u = []); ++i < o; ) {
                    var f = n[i];
                    t > 0 && r(f) ? (t > 1 ? Sr(f, t - 1, r, e, u) : s(u, f)) : e || (u[u.length] = f);
                  }
                  return u;
                }
                function Lr(n, t) {
                  return n && Zf(n, t, _o);
                }
                function Dr(n, t) {
                  return n && Kf(n, t, _o);
                }
                function qr(n, t) {
                  return f(t, function (t) {
                    return Ji(n[t]);
                  });
                }
                function Zr(n, t) {
                  for (var r = 0, e = (t = Ke(t, n)).length; null != n && r < e; ) n = n[mi(t[r++])];
                  return r && r == e ? n : X;
                }
                function Kr(n, t, r) {
                  var e = t(n);
                  return Zc(n) ? e : s(e, r(n));
                }
                function Vr(n) {
                  return null == n ? (n === X ? nt : Vn) : cf && cf in Uo(n) ? Gu(n) : _i(n);
                }
                function Gr(n, t) {
                  return n > t;
                }
                function Hr(n, t) {
                  return null != n && qo.call(n, t);
                }
                function Jr(n, t) {
                  return null != n && t in Uo(n);
                }
                function Yr(n, t, r) {
                  return n >= mf(t, r) && n < wf(t, r);
                }
                function Qr(n, t, r) {
                  for (var e = r ? a : c, u = n[0].length, i = n.length, o = i, f = Eo(i), s = 1 / 0, h = []; o--; ) {
                    var p = n[o];
                    o && t && (p = l(p, E(t))), (s = mf(p.length, s)), (f[o] = !r && (t || (u >= 120 && p.length >= 120)) ? new Yt(o && p) : X);
                  }
                  p = n[0];
                  var _ = -1,
                    v = f[0];
                  n: for (; ++_ < u && h.length < s; ) {
                    var g = p[_],
                      y = t ? t(g) : g;
                    if (((g = r || 0 !== g ? g : 0), !(v ? L(v, y) : e(h, y, r)))) {
                      for (o = i; --o; ) {
                        var d = f[o];
                        if (!(d ? L(d, y) : e(n[o], y, r))) continue n;
                      }
                      v && v.push(y), h.push(g);
                    }
                  }
                  return h;
                }
                function Xr(n, t, r, e) {
                  return (
                    Lr(n, function (n, u, i) {
                      t(e, r(n), u, i);
                    }),
                    e
                  );
                }
                function ne(n, t, e) {
                  var u = null == (n = gi(n, (t = Ke(t, n)))) ? n : n[mi(zi(t))];
                  return null == u ? X : r(u, n, e);
                }
                function te(n) {
                  return no(n) && Vr(n) == Bn;
                }
                function re(n, t, r, e, u) {
                  return n === t || (null == n || null == t || (!no(n) && !no(t)) ? n !== n && t !== t : ee(n, t, r, e, re, u));
                }
                function ee(n, t, r, e, u, i) {
                  var o = Zc(n),
                    f = Zc(t),
                    c = o ? Tn : tc(n),
                    a = f ? Tn : tc(t),
                    l = (c = c == Bn ? Gn : c) == Gn,
                    s = (a = a == Bn ? Gn : a) == Gn,
                    h = c == a;
                  if (h && Vc(n)) {
                    if (!Vc(t)) return !1;
                    (o = !0), (l = !1);
                  }
                  if (h && !l) return i || (i = new Qt()), o || Qc(n) ? Bu(n, t, r, e, u, i) : Tu(n, t, c, r, e, u, i);
                  if (!(r & ln)) {
                    var p = l && qo.call(n, '__wrapped__'),
                      _ = s && qo.call(t, '__wrapped__');
                    if (p || _) {
                      var v = p ? n.value() : n,
                        g = _ ? t.value() : t;
                      return i || (i = new Qt()), u(v, g, r, e, i);
                    }
                  }
                  return !!h && (i || (i = new Qt()), $u(n, t, r, e, u, i));
                }
                function ue(n, t, r, e) {
                  var u = r.length,
                    i = u,
                    o = !e;
                  if (null == n) return !i;
                  for (n = Uo(n); u--; ) {
                    var f = r[u];
                    if (o && f[2] ? f[1] !== n[f[0]] : !(f[0] in n)) return !1;
                  }
                  for (; ++u < i; ) {
                    var c = (f = r[u])[0],
                      a = n[c],
                      l = f[1];
                    if (o && f[2]) {
                      if (a === X && !(c in n)) return !1;
                    } else {
                      var s = new Qt();
                      if (e) var h = e(a, l, c, n, t, s);
                      if (!(h === X ? re(l, a, ln | sn, e, s) : h)) return !1;
                    }
                  }
                  return !0;
                }
                function ie(n) {
                  return !(!Xi(n) || ci(n)) && (Ji(n) ? Jo : Nt).test(xi(n));
                }
                function oe(n) {
                  return 'function' == typeof n ? n : null == n ? jo : 'object' == typeof n ? (Zc(n) ? he(n[0], n[1]) : se(n)) : Io(n);
                }
                function fe(n) {
                  if (!ai(n)) return bf(n);
                  var t = [];
                  for (var r in Uo(n)) qo.call(n, r) && 'constructor' != r && t.push(r);
                  return t;
                }
                function ce(n) {
                  if (!Xi(n)) return pi(n);
                  var t = ai(n),
                    r = [];
                  for (var e in n) ('constructor' != e || (!t && qo.call(n, e))) && r.push(e);
                  return r;
                }
                function ae(n, t) {
                  return n < t;
                }
                function le(n, t) {
                  var r = -1,
                    e = Vi(n) ? Eo(n.length) : [];
                  return (
                    Pf(n, function (n, u, i) {
                      e[++r] = t(n, u, i);
                    }),
                    e
                  );
                }
                function se(n) {
                  var t = Ku(n);
                  return 1 == t.length && t[0][2]
                    ? si(t[0][0], t[0][1])
                    : function (r) {
                        return r === n || ue(r, n, t);
                      };
                }
                function he(n, t) {
                  return ii(n) && li(t)
                    ? si(mi(n), t)
                    : function (r) {
                        var e = ho(r, n);
                        return e === X && e === t ? po(r, n) : re(t, e, ln | sn);
                      };
                }
                function pe(n, t, r, e, u) {
                  n !== t &&
                    Zf(
                      t,
                      function (i, o) {
                        if (Xi(i)) u || (u = new Qt()), _e(n, t, o, r, pe, e, u);
                        else {
                          var f = e ? e(n[o], i, o + '', n, t, u) : X;
                          f === X && (f = i), er(n, o, f);
                        }
                      },
                      vo,
                    );
                }
                function _e(n, t, r, e, u, i, o) {
                  var f = n[r],
                    c = t[r],
                    a = o.get(c);
                  if (a) er(n, r, a);
                  else {
                    var l = i ? i(f, c, r + '', n, t, o) : X,
                      s = l === X;
                    if (s) {
                      var h = Zc(c),
                        p = !h && Vc(c),
                        _ = !h && !p && Qc(c);
                      (l = c),
                        h || p || _
                          ? Zc(f)
                            ? (l = f)
                            : Gi(f)
                            ? (l = ou(f))
                            : p
                            ? ((s = !1), (l = Ge(c, !0)))
                            : _
                            ? ((s = !1), (l = tu(c, !0)))
                            : (l = [])
                          : ro(c) || qc(c)
                          ? ((l = f), qc(f) ? (l = lo(f)) : (!Xi(f) || (e && Ji(f))) && (l = Xu(c)))
                          : (s = !1);
                    }
                    s && (o.set(c, l), u(l, c, e, i, o), o.delete(c)), er(n, r, l);
                  }
                }
                function ve(n, t) {
                  var r = n.length;
                  if (r) return (t += t < 0 ? r : 0), ei(t, r) ? n[t] : X;
                }
                function ge(n, t, r) {
                  var e = -1;
                  return (
                    (t = l(t.length ? t : [jo], E(qu()))),
                    O(
                      le(n, function (n, r, u) {
                        return {
                          criteria: l(t, function (t) {
                            return t(n);
                          }),
                          index: ++e,
                          value: n,
                        };
                      }),
                      function (n, t) {
                        return eu(n, t, r);
                      },
                    )
                  );
                }
                function ye(n, t) {
                  return de(n, t, function (t, r) {
                    return po(n, r);
                  });
                }
                function de(n, t, r) {
                  for (var e = -1, u = t.length, i = {}; ++e < u; ) {
                    var o = t[e],
                      f = Zr(n, o);
                    r(f, o) && Re(i, Ke(o, n), f);
                  }
                  return i;
                }
                function be(n) {
                  return function (t) {
                    return Zr(t, n);
                  };
                }
                function we(n, t, r, e) {
                  var u = e ? w : b,
                    i = -1,
                    o = t.length,
                    f = n;
                  for (n === t && (t = ou(t)), r && (f = l(n, E(r))); ++i < o; )
                    for (var c = 0, a = t[i], s = r ? r(a) : a; (c = u(f, s, c, e)) > -1; ) f !== n && uf.call(f, c, 1), uf.call(n, c, 1);
                  return n;
                }
                function me(n, t) {
                  for (var r = n ? t.length : 0, e = r - 1; r--; ) {
                    var u = t[r];
                    if (r == e || u !== i) {
                      var i = u;
                      ei(u) ? uf.call(n, u, 1) : $e(n, u);
                    }
                  }
                  return n;
                }
                function xe(n, t) {
                  return n + _f(Af() * (t - n + 1));
                }
                function je(n, t, r, e) {
                  for (var u = -1, i = wf(pf((t - n) / (r || 1)), 0), o = Eo(i); i--; ) (o[e ? i : ++u] = n), (n += r);
                  return o;
                }
                function Ae(n, t) {
                  var r = '';
                  if (!n || t < 1 || t > zn) return r;
                  do {
                    t % 2 && (r += n), (t = _f(t / 2)) && (n += n);
                  } while (t);
                  return r;
                }
                function ke(n, t) {
                  return ic(vi(n, t, jo), n + '');
                }
                function Oe(n) {
                  return nr(yo(n));
                }
                function Ie(n, t) {
                  var r = yo(n);
                  return wi(r, pr(t, 0, r.length));
                }
                function Re(n, t, r, e) {
                  if (!Xi(n)) return n;
                  for (var u = -1, i = (t = Ke(t, n)).length, o = i - 1, f = n; null != f && ++u < i; ) {
                    var c = mi(t[u]),
                      a = r;
                    if (u != o) {
                      var l = f[c];
                      (a = e ? e(l, c, f) : X) === X && (a = Xi(l) ? l : ei(t[u + 1]) ? [] : {});
                    }
                    ur(f, c, a), (f = f[c]);
                  }
                  return n;
                }
                function ze(n) {
                  return wi(yo(n));
                }
                function Ee(n, t, r) {
                  var e = -1,
                    u = n.length;
                  t < 0 && (t = -t > u ? 0 : u + t), (r = r > u ? u : r) < 0 && (r += u), (u = t > r ? 0 : (r - t) >>> 0), (t >>>= 0);
                  for (var i = Eo(u); ++e < u; ) i[e] = n[e + t];
                  return i;
                }
                function Se(n, t) {
                  var r;
                  return (
                    Pf(n, function (n, e, u) {
                      return !(r = t(n, e, u));
                    }),
                    !!r
                  );
                }
                function Le(n, t, r) {
                  var e = 0,
                    u = null == n ? e : n.length;
                  if ('number' == typeof t && t === t && u <= Cn) {
                    for (; e < u; ) {
                      var i = (e + u) >>> 1,
                        o = n[i];
                      null !== o && !uo(o) && (r ? o <= t : o < t) ? (e = i + 1) : (u = i);
                    }
                    return u;
                  }
                  return We(n, t, jo, r);
                }
                function We(n, t, r, e) {
                  t = r(t);
                  for (var u = 0, i = null == n ? 0 : n.length, o = t !== t, f = null === t, c = uo(t), a = t === X; u < i; ) {
                    var l = _f((u + i) / 2),
                      s = r(n[l]),
                      h = s !== X,
                      p = null === s,
                      _ = s === s,
                      v = uo(s);
                    if (o) var g = e || _;
                    else g = a ? _ && (e || h) : f ? _ && h && (e || !p) : c ? _ && h && !p && (e || !v) : !p && !v && (e ? s <= t : s < t);
                    g ? (u = l + 1) : (i = l);
                  }
                  return mf(i, Wn);
                }
                function Ce(n, t) {
                  for (var r = -1, e = n.length, u = 0, i = []; ++r < e; ) {
                    var o = n[r],
                      f = t ? t(o) : o;
                    if (!r || !Ki(f, c)) {
                      var c = f;
                      i[u++] = 0 === o ? 0 : o;
                    }
                  }
                  return i;
                }
                function Ue(n) {
                  return 'number' == typeof n ? n : uo(n) ? Sn : +n;
                }
                function Be(n) {
                  if ('string' == typeof n) return n;
                  if (Zc(n)) return l(n, Be) + '';
                  if (uo(n)) return Ff ? Ff.call(n) : '';
                  var t = n + '';
                  return '0' == t && 1 / n == -Rn ? '-0' : t;
                }
                function Te(n, t, r) {
                  var e = -1,
                    u = c,
                    i = n.length,
                    o = !0,
                    f = [],
                    l = f;
                  if (r) (o = !1), (u = a);
                  else if (i >= nn) {
                    var s = t ? null : Yf(n);
                    if (s) return q(s);
                    (o = !1), (u = L), (l = new Yt());
                  } else l = t ? [] : f;
                  n: for (; ++e < i; ) {
                    var h = n[e],
                      p = t ? t(h) : h;
                    if (((h = r || 0 !== h ? h : 0), o && p === p)) {
                      for (var _ = l.length; _--; ) if (l[_] === p) continue n;
                      t && l.push(p), f.push(h);
                    } else u(l, p, r) || (l !== f && l.push(p), f.push(h));
                  }
                  return f;
                }
                function $e(n, t) {
                  return (t = Ke(t, n)), null == (n = gi(n, t)) || delete n[mi(zi(t))];
                }
                function De(n, t, r, e) {
                  return Re(n, t, r(Zr(n, t)), e);
                }
                function Me(n, t, r, e) {
                  for (var u = n.length, i = e ? u : -1; (e ? i-- : ++i < u) && t(n[i], i, n); );
                  return r ? Ee(n, e ? 0 : i, e ? i + 1 : u) : Ee(n, e ? i + 1 : 0, e ? u : i);
                }
                function Fe(n, t) {
                  var r = n;
                  return (
                    r instanceof Bt && (r = r.value()),
                    h(
                      t,
                      function (n, t) {
                        return t.func.apply(t.thisArg, s([n], t.args));
                      },
                      r,
                    )
                  );
                }
                function Ne(n, t, r) {
                  var e = n.length;
                  if (e < 2) return e ? Te(n[0]) : [];
                  for (var u = -1, i = Eo(e); ++u < e; ) for (var o = n[u], f = -1; ++f < e; ) f != u && (i[u] = xr(i[u] || o, n[f], t, r));
                  return Te(Sr(i, 1), t, r);
                }
                function Pe(n, t, r) {
                  for (var e = -1, u = n.length, i = t.length, o = {}; ++e < u; ) {
                    var f = e < i ? t[e] : X;
                    r(o, n[e], f);
                  }
                  return o;
                }
                function qe(n) {
                  return Gi(n) ? n : [];
                }
                function Ze(n) {
                  return 'function' == typeof n ? n : jo;
                }
                function Ke(n, t) {
                  return Zc(n) ? n : ii(n, t) ? [n] : oc(so(n));
                }
                function Ve(n, t, r) {
                  var e = n.length;
                  return (r = r === X ? e : r), !t && r >= e ? n : Ee(n, t, r);
                }
                function Ge(n, t) {
                  if (t) return n.slice();
                  var r = n.length,
                    e = nf ? nf(r) : new n.constructor(r);
                  return n.copy(e), e;
                }
                function He(n) {
                  var t = new n.constructor(n.byteLength);
                  return new Xo(t).set(new Xo(n)), t;
                }
                function Je(n, t) {
                  var r = t ? He(n.buffer) : n.buffer;
                  return new n.constructor(r, n.byteOffset, n.byteLength);
                }
                function Ye(t, r, e) {
                  return h(r ? e(F(t), fn) : F(t), n, new t.constructor());
                }
                function Qe(n) {
                  var t = new n.constructor(n.source, Dt.exec(n));
                  return (t.lastIndex = n.lastIndex), t;
                }
                function Xe(n, r, e) {
                  return h(r ? e(q(n), fn) : q(n), t, new n.constructor());
                }
                function nu(n) {
                  return Mf ? Uo(Mf.call(n)) : {};
                }
                function tu(n, t) {
                  var r = t ? He(n.buffer) : n.buffer;
                  return new n.constructor(r, n.byteOffset, n.length);
                }
                function ru(n, t) {
                  if (n !== t) {
                    var r = n !== X,
                      e = null === n,
                      u = n === n,
                      i = uo(n),
                      o = t !== X,
                      f = null === t,
                      c = t === t,
                      a = uo(t);
                    if ((!f && !a && !i && n > t) || (i && o && c && !f && !a) || (e && o && c) || (!r && c) || !u) return 1;
                    if ((!e && !i && !a && n < t) || (a && r && u && !e && !i) || (f && r && u) || (!o && u) || !c) return -1;
                  }
                  return 0;
                }
                function eu(n, t, r) {
                  for (var e = -1, u = n.criteria, i = t.criteria, o = u.length, f = r.length; ++e < o; ) {
                    var c = ru(u[e], i[e]);
                    if (c) return e >= f ? c : c * ('desc' == r[e] ? -1 : 1);
                  }
                  return n.index - t.index;
                }
                function uu(n, t, r, e) {
                  for (var u = -1, i = n.length, o = r.length, f = -1, c = t.length, a = wf(i - o, 0), l = Eo(c + a), s = !e; ++f < c; ) l[f] = t[f];
                  for (; ++u < o; ) (s || u < i) && (l[r[u]] = n[u]);
                  for (; a--; ) l[f++] = n[u++];
                  return l;
                }
                function iu(n, t, r, e) {
                  for (var u = -1, i = n.length, o = -1, f = r.length, c = -1, a = t.length, l = wf(i - f, 0), s = Eo(l + a), h = !e; ++u < l; )
                    s[u] = n[u];
                  for (var p = u; ++c < a; ) s[p + c] = t[c];
                  for (; ++o < f; ) (h || u < i) && (s[p + r[o]] = n[u++]);
                  return s;
                }
                function ou(n, t) {
                  var r = -1,
                    e = n.length;
                  for (t || (t = Eo(e)); ++r < e; ) t[r] = n[r];
                  return t;
                }
                function fu(n, t, r, e) {
                  var u = !r;
                  r || (r = {});
                  for (var i = -1, o = t.length; ++i < o; ) {
                    var f = t[i],
                      c = e ? e(r[f], n[f], f, r, n) : X;
                    c === X && (c = n[f]), u ? sr(r, f, c) : ur(r, f, c);
                  }
                  return r;
                }
                function cu(n, t) {
                  return fu(n, Xf(n), t);
                }
                function au(n, t) {
                  return fu(n, nc(n), t);
                }
                function lu(n, t) {
                  return function (r, u) {
                    var i = Zc(r) ? e : or,
                      o = t ? t() : {};
                    return i(r, n, qu(u, 2), o);
                  };
                }
                function su(n) {
                  return ke(function (t, r) {
                    var e = -1,
                      u = r.length,
                      i = u > 1 ? r[u - 1] : X,
                      o = u > 2 ? r[2] : X;
                    for (
                      i = n.length > 3 && 'function' == typeof i ? (u--, i) : X, o && ui(r[0], r[1], o) && ((i = u < 3 ? X : i), (u = 1)), t = Uo(t);
                      ++e < u;

                    ) {
                      var f = r[e];
                      f && n(t, f, e, i);
                    }
                    return t;
                  });
                }
                function hu(n, t) {
                  return function (r, e) {
                    if (null == r) return r;
                    if (!Vi(r)) return n(r, e);
                    for (var u = r.length, i = t ? u : -1, o = Uo(r); (t ? i-- : ++i < u) && !1 !== e(o[i], i, o); );
                    return r;
                  };
                }
                function pu(n) {
                  return function (t, r, e) {
                    for (var u = -1, i = Uo(t), o = e(t), f = o.length; f--; ) {
                      var c = o[n ? f : ++u];
                      if (!1 === r(i[c], c, i)) break;
                    }
                    return t;
                  };
                }
                function _u(n, t, r) {
                  function e() {
                    return (this && this !== Ir && this instanceof e ? i : n).apply(u ? r : this, arguments);
                  }
                  var u = t & hn,
                    i = yu(n);
                  return e;
                }
                function vu(n) {
                  return function (t) {
                    var r = $((t = so(t))) ? H(t) : X,
                      e = r ? r[0] : t.charAt(0),
                      u = r ? Ve(r, 1).join('') : t.slice(1);
                    return e[n]() + u;
                  };
                }
                function gu(n) {
                  return function (t) {
                    return h(mo(wo(t).replace(ar, '')), n, '');
                  };
                }
                function yu(n) {
                  return function () {
                    var t = arguments;
                    switch (t.length) {
                      case 0:
                        return new n();
                      case 1:
                        return new n(t[0]);
                      case 2:
                        return new n(t[0], t[1]);
                      case 3:
                        return new n(t[0], t[1], t[2]);
                      case 4:
                        return new n(t[0], t[1], t[2], t[3]);
                      case 5:
                        return new n(t[0], t[1], t[2], t[3], t[4]);
                      case 6:
                        return new n(t[0], t[1], t[2], t[3], t[4], t[5]);
                      case 7:
                        return new n(t[0], t[1], t[2], t[3], t[4], t[5], t[6]);
                    }
                    var r = Nf(n.prototype),
                      e = n.apply(r, t);
                    return Xi(e) ? e : r;
                  };
                }
                function du(n, t, e) {
                  function u() {
                    for (var o = arguments.length, f = Eo(o), c = o, a = Pu(u); c--; ) f[c] = arguments[c];
                    var l = o < 3 && f[0] !== a && f[o - 1] !== a ? [] : P(f, a);
                    return (o -= l.length) < e
                      ? zu(n, t, mu, u.placeholder, X, f, l, X, X, e - o)
                      : r(this && this !== Ir && this instanceof u ? i : n, this, f);
                  }
                  var i = yu(n);
                  return u;
                }
                function bu(n) {
                  return function (t, r, e) {
                    var u = Uo(t);
                    if (!Vi(t)) {
                      var i = qu(r, 3);
                      (t = _o(t)),
                        (r = function (n) {
                          return i(u[n], n, u);
                        });
                    }
                    var o = n(t, r, e);
                    return o > -1 ? u[i ? t[o] : o] : X;
                  };
                }
                function wu(n) {
                  return Du(function (t) {
                    var r = t.length,
                      e = r,
                      u = Y.prototype.thru;
                    for (n && t.reverse(); e--; ) {
                      var i = t[e];
                      if ('function' != typeof i) throw new $o(rn);
                      if (u && !o && 'wrapper' == Nu(i)) var o = new Y([], !0);
                    }
                    for (e = o ? e : r; ++e < r; ) {
                      var f = Nu((i = t[e])),
                        c = 'wrapper' == f ? Qf(i) : X;
                      o =
                        c && fi(c[0]) && c[1] == (bn | vn | yn | wn) && !c[4].length && 1 == c[9]
                          ? o[Nu(c[0])].apply(o, c[3])
                          : 1 == i.length && fi(i)
                          ? o[f]()
                          : o.thru(i);
                    }
                    return function () {
                      var n = arguments,
                        e = n[0];
                      if (o && 1 == n.length && Zc(e)) return o.plant(e).value();
                      for (var u = 0, i = r ? t[u].apply(this, n) : e; ++u < r; ) i = t[u].call(this, i);
                      return i;
                    };
                  });
                }
                function mu(n, t, r, e, u, i, o, f, c, a) {
                  function l() {
                    for (var y = arguments.length, d = Eo(y), b = y; b--; ) d[b] = arguments[b];
                    if (_)
                      var w = Pu(l),
                        m = U(d, w);
                    if ((e && (d = uu(d, e, u, _)), i && (d = iu(d, i, o, _)), (y -= m), _ && y < a)) {
                      var x = P(d, w);
                      return zu(n, t, mu, l.placeholder, r, d, x, f, c, a - y);
                    }
                    var j = h ? r : this,
                      A = p ? j[n] : n;
                    return (
                      (y = d.length),
                      f ? (d = yi(d, f)) : v && y > 1 && d.reverse(),
                      s && c < y && (d.length = c),
                      this && this !== Ir && this instanceof l && (A = g || yu(A)),
                      A.apply(j, d)
                    );
                  }
                  var s = t & bn,
                    h = t & hn,
                    p = t & pn,
                    _ = t & (vn | gn),
                    v = t & mn,
                    g = p ? X : yu(n);
                  return l;
                }
                function xu(n, t) {
                  return function (r, e) {
                    return Xr(r, n, t(e), {});
                  };
                }
                function ju(n, t) {
                  return function (r, e) {
                    var u;
                    if (r === X && e === X) return t;
                    if ((r !== X && (u = r), e !== X)) {
                      if (u === X) return e;
                      'string' == typeof r || 'string' == typeof e ? ((r = Be(r)), (e = Be(e))) : ((r = Ue(r)), (e = Ue(e))), (u = n(r, e));
                    }
                    return u;
                  };
                }
                function Au(n) {
                  return Du(function (t) {
                    return (
                      (t = l(t, E(qu()))),
                      ke(function (e) {
                        var u = this;
                        return n(t, function (n) {
                          return r(n, u, e);
                        });
                      })
                    );
                  });
                }
                function ku(n, t) {
                  var r = (t = t === X ? ' ' : Be(t)).length;
                  if (r < 2) return r ? Ae(t, n) : t;
                  var e = Ae(t, pf(n / G(t)));
                  return $(t) ? Ve(H(e), 0, n).join('') : e.slice(0, n);
                }
                function Ou(n, t, e, u) {
                  function i() {
                    for (
                      var t = -1, c = arguments.length, a = -1, l = u.length, s = Eo(l + c), h = this && this !== Ir && this instanceof i ? f : n;
                      ++a < l;

                    )
                      s[a] = u[a];
                    for (; c--; ) s[a++] = arguments[++t];
                    return r(h, o ? e : this, s);
                  }
                  var o = t & hn,
                    f = yu(n);
                  return i;
                }
                function Iu(n) {
                  return function (t, r, e) {
                    return (
                      e && 'number' != typeof e && ui(t, r, e) && (r = e = X),
                      (t = oo(t)),
                      r === X ? ((r = t), (t = 0)) : (r = oo(r)),
                      (e = e === X ? (t < r ? 1 : -1) : oo(e)),
                      je(t, r, e, n)
                    );
                  };
                }
                function Ru(n) {
                  return function (t, r) {
                    return ('string' == typeof t && 'string' == typeof r) || ((t = ao(t)), (r = ao(r))), n(t, r);
                  };
                }
                function zu(n, t, r, e, u, i, o, f, c, a) {
                  var l = t & vn,
                    s = l ? o : X,
                    h = l ? X : o,
                    p = l ? i : X,
                    _ = l ? X : i;
                  (t |= l ? yn : dn), (t &= ~(l ? dn : yn)) & _n || (t &= ~(hn | pn));
                  var v = [n, t, u, p, s, _, h, f, c, a],
                    g = r.apply(X, v);
                  return fi(n) && ec(g, v), (g.placeholder = e), di(g, n, t);
                }
                function Eu(n) {
                  var t = Co[n];
                  return function (n, r) {
                    if (((n = ao(n)), (r = null == r ? 0 : mf(fo(r), 292)))) {
                      var e = (so(n) + 'e').split('e');
                      return +((e = (so(t(e[0] + 'e' + (+e[1] + r))) + 'e').split('e'))[0] + 'e' + (+e[1] - r));
                    }
                    return t(n);
                  };
                }
                function Su(n) {
                  return function (t) {
                    var r = tc(t);
                    return r == Zn ? F(t) : r == Yn ? Z(t) : z(t, n(t));
                  };
                }
                function Lu(n, t, r, e, u, i, o, f) {
                  var c = t & pn;
                  if (!c && 'function' != typeof n) throw new $o(rn);
                  var a = e ? e.length : 0;
                  if (
                    (a || ((t &= ~(yn | dn)), (e = u = X)),
                    (o = o === X ? o : wf(fo(o), 0)),
                    (f = f === X ? f : fo(f)),
                    (a -= u ? u.length : 0),
                    t & dn)
                  ) {
                    var l = e,
                      s = u;
                    e = u = X;
                  }
                  var h = c ? X : Qf(n),
                    p = [n, t, r, e, u, l, s, i, o, f];
                  if (
                    (h && hi(p, h),
                    (n = p[0]),
                    (t = p[1]),
                    (r = p[2]),
                    (e = p[3]),
                    (u = p[4]),
                    !(f = p[9] = p[9] === X ? (c ? 0 : n.length) : wf(p[9] - a, 0)) && t & (vn | gn) && (t &= ~(vn | gn)),
                    t && t != hn)
                  )
                    _ = t == vn || t == gn ? du(n, t, f) : (t != yn && t != (hn | yn)) || u.length ? mu.apply(X, p) : Ou(n, t, r, e);
                  else var _ = _u(n, t, r);
                  return di((h ? Vf : ec)(_, p), n, t);
                }
                function Wu(n, t, r, e) {
                  return n === X || (Ki(n, Fo[r]) && !qo.call(e, r)) ? t : n;
                }
                function Cu(n, t, r, e, u, i) {
                  return Xi(n) && Xi(t) && (i.set(t, n), pe(n, t, X, Cu, i), i.delete(t)), n;
                }
                function Uu(n) {
                  return ro(n) ? X : n;
                }
                function Bu(n, t, r, e, u, i) {
                  var o = r & ln,
                    f = n.length,
                    c = t.length;
                  if (f != c && !(o && c > f)) return !1;
                  var a = i.get(n);
                  if (a && i.get(t)) return a == t;
                  var l = -1,
                    s = !0,
                    h = r & sn ? new Yt() : X;
                  for (i.set(n, t), i.set(t, n); ++l < f; ) {
                    var p = n[l],
                      v = t[l];
                    if (e) var g = o ? e(v, p, l, t, n, i) : e(p, v, l, n, t, i);
                    if (g !== X) {
                      if (g) continue;
                      s = !1;
                      break;
                    }
                    if (h) {
                      if (
                        !_(t, function (n, t) {
                          if (!L(h, t) && (p === n || u(p, n, r, e, i))) return h.push(t);
                        })
                      ) {
                        s = !1;
                        break;
                      }
                    } else if (p !== v && !u(p, v, r, e, i)) {
                      s = !1;
                      break;
                    }
                  }
                  return i.delete(n), i.delete(t), s;
                }
                function Tu(n, t, r, e, u, i, o) {
                  switch (r) {
                    case ut:
                      if (n.byteLength != t.byteLength || n.byteOffset != t.byteOffset) return !1;
                      (n = n.buffer), (t = t.buffer);
                    case et:
                      return !(n.byteLength != t.byteLength || !i(new Xo(n), new Xo(t)));
                    case Dn:
                    case Mn:
                    case Kn:
                      return Ki(+n, +t);
                    case Nn:
                      return n.name == t.name && n.message == t.message;
                    case Jn:
                    case Qn:
                      return n == t + '';
                    case Zn:
                      var f = F;
                    case Yn:
                      var c = e & ln;
                      if ((f || (f = q), n.size != t.size && !c)) return !1;
                      var a = o.get(n);
                      if (a) return a == t;
                      (e |= sn), o.set(n, t);
                      var l = Bu(f(n), f(t), e, u, i, o);
                      return o.delete(n), l;
                    case Xn:
                      if (Mf) return Mf.call(n) == Mf.call(t);
                  }
                  return !1;
                }
                function $u(n, t, r, e, u, i) {
                  var o = r & ln,
                    f = Mu(n),
                    c = f.length;
                  if (c != Mu(t).length && !o) return !1;
                  for (var a = c; a--; ) {
                    var l = f[a];
                    if (!(o ? l in t : qo.call(t, l))) return !1;
                  }
                  var s = i.get(n);
                  if (s && i.get(t)) return s == t;
                  var h = !0;
                  i.set(n, t), i.set(t, n);
                  for (var p = o; ++a < c; ) {
                    var _ = n[(l = f[a])],
                      v = t[l];
                    if (e) var g = o ? e(v, _, l, t, n, i) : e(_, v, l, n, t, i);
                    if (!(g === X ? _ === v || u(_, v, r, e, i) : g)) {
                      h = !1;
                      break;
                    }
                    p || (p = 'constructor' == l);
                  }
                  if (h && !p) {
                    var y = n.constructor,
                      d = t.constructor;
                    y != d &&
                      'constructor' in n &&
                      'constructor' in t &&
                      !('function' == typeof y && y instanceof y && 'function' == typeof d && d instanceof d) &&
                      (h = !1);
                  }
                  return i.delete(n), i.delete(t), h;
                }
                function Du(n) {
                  return ic(vi(n, X, Ii), n + '');
                }
                function Mu(n) {
                  return Kr(n, _o, Xf);
                }
                function Fu(n) {
                  return Kr(n, vo, nc);
                }
                function Nu(n) {
                  for (var t = n.name + '', r = Wf[t], e = qo.call(Wf, t) ? r.length : 0; e--; ) {
                    var u = r[e],
                      i = u.func;
                    if (null == i || i == n) return u.name;
                  }
                  return t;
                }
                function Pu(n) {
                  return (qo.call(K, 'placeholder') ? K : n).placeholder;
                }
                function qu() {
                  var n = K.iteratee || Ao;
                  return (n = n === Ao ? oe : n), arguments.length ? n(arguments[0], arguments[1]) : n;
                }
                function Zu(n, t) {
                  var r = n.__data__;
                  return oi(t) ? r['string' == typeof t ? 'string' : 'hash'] : r.map;
                }
                function Ku(n) {
                  for (var t = _o(n), r = t.length; r--; ) {
                    var e = t[r],
                      u = n[e];
                    t[r] = [e, u, li(u)];
                  }
                  return t;
                }
                function Vu(n, t) {
                  var r = T(n, t);
                  return ie(r) ? r : X;
                }
                function Gu(n) {
                  var t = qo.call(n, cf),
                    r = n[cf];
                  try {
                    n[cf] = X;
                    var e = !0;
                  } catch (n) {}
                  var u = Vo.call(n);
                  return e && (t ? (n[cf] = r) : delete n[cf]), u;
                }
                function Hu(n, t, r) {
                  for (var e = -1, u = r.length; ++e < u; ) {
                    var i = r[e],
                      o = i.size;
                    switch (i.type) {
                      case 'drop':
                        n += o;
                        break;
                      case 'dropRight':
                        t -= o;
                        break;
                      case 'take':
                        t = mf(t, n + o);
                        break;
                      case 'takeRight':
                        n = wf(n, t - o);
                    }
                  }
                  return { start: n, end: t };
                }
                function Ju(n) {
                  var t = n.match(Ct);
                  return t ? t[1].split(Ut) : [];
                }
                function Yu(n, t, r) {
                  for (var e = -1, u = (t = Ke(t, n)).length, i = !1; ++e < u; ) {
                    var o = mi(t[e]);
                    if (!(i = null != n && r(n, o))) break;
                    n = n[o];
                  }
                  return i || ++e != u ? i : !!(u = null == n ? 0 : n.length) && Qi(u) && ei(o, u) && (Zc(n) || qc(n));
                }
                function Qu(n) {
                  var t = n.length,
                    r = n.constructor(t);
                  return t && 'string' == typeof n[0] && qo.call(n, 'index') && ((r.index = n.index), (r.input = n.input)), r;
                }
                function Xu(n) {
                  return 'function' != typeof n.constructor || ai(n) ? {} : Nf(tf(n));
                }
                function ni(n, t, r, e) {
                  var u = n.constructor;
                  switch (t) {
                    case et:
                      return He(n);
                    case Dn:
                    case Mn:
                      return new u(+n);
                    case ut:
                      return Je(n, e);
                    case it:
                    case ot:
                    case ft:
                    case ct:
                    case at:
                    case lt:
                    case st:
                    case ht:
                    case pt:
                      return tu(n, e);
                    case Zn:
                      return Ye(n, e, r);
                    case Kn:
                    case Qn:
                      return new u(n);
                    case Jn:
                      return Qe(n);
                    case Yn:
                      return Xe(n, e, r);
                    case Xn:
                      return nu(n);
                  }
                }
                function ti(n, t) {
                  var r = t.length;
                  if (!r) return n;
                  var e = r - 1;
                  return (t[e] = (r > 1 ? '& ' : '') + t[e]), (t = t.join(r > 2 ? ', ' : ' ')), n.replace(Wt, '{\n/* [wrapped with ' + t + '] */\n');
                }
                function ri(n) {
                  return Zc(n) || qc(n) || !!(of && n && n[of]);
                }
                function ei(n, t) {
                  return !!(t = null == t ? zn : t) && ('number' == typeof n || qt.test(n)) && n > -1 && n % 1 == 0 && n < t;
                }
                function ui(n, t, r) {
                  if (!Xi(r)) return !1;
                  var e = typeof t;
                  return !!('number' == e ? Vi(r) && ei(t, r.length) : 'string' == e && t in r) && Ki(r[t], n);
                }
                function ii(n, t) {
                  if (Zc(n)) return !1;
                  var r = typeof n;
                  return (
                    !('number' != r && 'symbol' != r && 'boolean' != r && null != n && !uo(n)) ||
                    kt.test(n) ||
                    !At.test(n) ||
                    (null != t && n in Uo(t))
                  );
                }
                function oi(n) {
                  var t = typeof n;
                  return 'string' == t || 'number' == t || 'symbol' == t || 'boolean' == t ? '__proto__' !== n : null === n;
                }
                function fi(n) {
                  var t = Nu(n),
                    r = K[t];
                  if ('function' != typeof r || !(t in Bt.prototype)) return !1;
                  if (n === r) return !0;
                  var e = Qf(r);
                  return !!e && n === e[0];
                }
                function ci(n) {
                  return !!Ko && Ko in n;
                }
                function ai(n) {
                  var t = n && n.constructor;
                  return n === (('function' == typeof t && t.prototype) || Fo);
                }
                function li(n) {
                  return n === n && !Xi(n);
                }
                function si(n, t) {
                  return function (r) {
                    return null != r && r[n] === t && (t !== X || n in Uo(r));
                  };
                }
                function hi(n, t) {
                  var r = n[1],
                    e = t[1],
                    u = r | e,
                    i = u < (hn | pn | bn),
                    o = (e == bn && r == vn) || (e == bn && r == wn && n[7].length <= t[8]) || (e == (bn | wn) && t[7].length <= t[8] && r == vn);
                  if (!i && !o) return n;
                  e & hn && ((n[2] = t[2]), (u |= r & hn ? 0 : _n));
                  var f = t[3];
                  if (f) {
                    var c = n[3];
                    (n[3] = c ? uu(c, f, t[4]) : f), (n[4] = c ? P(n[3], on) : t[4]);
                  }
                  return (
                    (f = t[5]) && ((c = n[5]), (n[5] = c ? iu(c, f, t[6]) : f), (n[6] = c ? P(n[5], on) : t[6])),
                    (f = t[7]) && (n[7] = f),
                    e & bn && (n[8] = null == n[8] ? t[8] : mf(n[8], t[8])),
                    null == n[9] && (n[9] = t[9]),
                    (n[0] = t[0]),
                    (n[1] = u),
                    n
                  );
                }
                function pi(n) {
                  var t = [];
                  if (null != n) for (var r in Uo(n)) t.push(r);
                  return t;
                }
                function _i(n) {
                  return Vo.call(n);
                }
                function vi(n, t, e) {
                  return (
                    (t = wf(t === X ? n.length - 1 : t, 0)),
                    function () {
                      for (var u = arguments, i = -1, o = wf(u.length - t, 0), f = Eo(o); ++i < o; ) f[i] = u[t + i];
                      i = -1;
                      for (var c = Eo(t + 1); ++i < t; ) c[i] = u[i];
                      return (c[t] = e(f)), r(n, this, c);
                    }
                  );
                }
                function gi(n, t) {
                  return t.length < 2 ? n : Zr(n, Ee(t, 0, -1));
                }
                function yi(n, t) {
                  for (var r = n.length, e = mf(t.length, r), u = ou(n); e--; ) {
                    var i = t[e];
                    n[e] = ei(i, r) ? u[i] : X;
                  }
                  return n;
                }
                function di(n, t, r) {
                  var e = t + '';
                  return ic(n, ti(e, ji(Ju(e), r)));
                }
                function bi(n) {
                  var t = 0,
                    r = 0;
                  return function () {
                    var e = xf(),
                      u = kn - (e - r);
                    if (((r = e), u > 0)) {
                      if (++t >= An) return arguments[0];
                    } else t = 0;
                    return n.apply(X, arguments);
                  };
                }
                function wi(n, t) {
                  var r = -1,
                    e = n.length,
                    u = e - 1;
                  for (t = t === X ? e : t; ++r < t; ) {
                    var i = xe(r, u),
                      o = n[i];
                    (n[i] = n[r]), (n[r] = o);
                  }
                  return (n.length = t), n;
                }
                function mi(n) {
                  if ('string' == typeof n || uo(n)) return n;
                  var t = n + '';
                  return '0' == t && 1 / n == -Rn ? '-0' : t;
                }
                function xi(n) {
                  if (null != n) {
                    try {
                      return Po.call(n);
                    } catch (n) {}
                    try {
                      return n + '';
                    } catch (n) {}
                  }
                  return '';
                }
                function ji(n, t) {
                  return (
                    u(Un, function (r) {
                      var e = '_.' + r[0];
                      t & r[1] && !c(n, e) && n.push(e);
                    }),
                    n.sort()
                  );
                }
                function Ai(n) {
                  if (n instanceof Bt) return n.clone();
                  var t = new Y(n.__wrapped__, n.__chain__);
                  return (t.__actions__ = ou(n.__actions__)), (t.__index__ = n.__index__), (t.__values__ = n.__values__), t;
                }
                function ki(n, t, r) {
                  var e = null == n ? 0 : n.length;
                  if (!e) return -1;
                  var u = null == r ? 0 : fo(r);
                  return u < 0 && (u = wf(e + u, 0)), d(n, qu(t, 3), u);
                }
                function Oi(n, t, r) {
                  var e = null == n ? 0 : n.length;
                  if (!e) return -1;
                  var u = e - 1;
                  return r !== X && ((u = fo(r)), (u = r < 0 ? wf(e + u, 0) : mf(u, e - 1))), d(n, qu(t, 3), u, !0);
                }
                function Ii(n) {
                  return (null == n ? 0 : n.length) ? Sr(n, 1) : [];
                }
                function Ri(n) {
                  return n && n.length ? n[0] : X;
                }
                function zi(n) {
                  var t = null == n ? 0 : n.length;
                  return t ? n[t - 1] : X;
                }
                function Ei(n, t) {
                  return n && n.length && t && t.length ? we(n, t) : n;
                }
                function Si(n) {
                  return null == n ? n : kf.call(n);
                }
                function Li(n) {
                  if (!n || !n.length) return [];
                  var t = 0;
                  return (
                    (n = f(n, function (n) {
                      if (Gi(n)) return (t = wf(n.length, t)), !0;
                    })),
                    R(t, function (t) {
                      return l(n, j(t));
                    })
                  );
                }
                function Wi(n, t) {
                  if (!n || !n.length) return [];
                  var e = Li(n);
                  return null == t
                    ? e
                    : l(e, function (n) {
                        return r(t, X, n);
                      });
                }
                function Ci(n) {
                  var t = K(n);
                  return (t.__chain__ = !0), t;
                }
                function Ui(n, t) {
                  return t(n);
                }
                function Bi(n, t) {
                  return (Zc(n) ? u : Pf)(n, qu(t, 3));
                }
                function Ti(n, t) {
                  return (Zc(n) ? i : qf)(n, qu(t, 3));
                }
                function $i(n, t) {
                  return (Zc(n) ? l : le)(n, qu(t, 3));
                }
                function Di(n, t, r) {
                  return (t = r ? X : t), (t = n && null == t ? n.length : t), Lu(n, bn, X, X, X, X, t);
                }
                function Mi(n, t) {
                  var r;
                  if ('function' != typeof t) throw new $o(rn);
                  return (
                    (n = fo(n)),
                    function () {
                      return --n > 0 && (r = t.apply(this, arguments)), n <= 1 && (t = X), r;
                    }
                  );
                }
                function Fi(n, t, r) {
                  var e = Lu(n, vn, X, X, X, X, X, (t = r ? X : t));
                  return (e.placeholder = Fi.placeholder), e;
                }
                function Ni(n, t, r) {
                  var e = Lu(n, gn, X, X, X, X, X, (t = r ? X : t));
                  return (e.placeholder = Ni.placeholder), e;
                }
                function Pi(n, t, r) {
                  function e(t) {
                    var r = l,
                      e = s;
                    return (l = s = X), (g = t), (p = n.apply(e, r));
                  }
                  function u(n) {
                    return (g = n), (_ = uc(f, t)), y ? e(n) : p;
                  }
                  function i(n) {
                    var r = n - g,
                      e = t - (n - v);
                    return d ? mf(e, h - r) : e;
                  }
                  function o(n) {
                    var r = n - v,
                      e = n - g;
                    return v === X || r >= t || r < 0 || (d && e >= h);
                  }
                  function f() {
                    var n = Wc();
                    if (o(n)) return c(n);
                    _ = uc(f, i(n));
                  }
                  function c(n) {
                    return (_ = X), b && l ? e(n) : ((l = s = X), p);
                  }
                  function a() {
                    var n = Wc(),
                      r = o(n);
                    if (((l = arguments), (s = this), (v = n), r)) {
                      if (_ === X) return u(v);
                      if (d) return (_ = uc(f, t)), e(v);
                    }
                    return _ === X && (_ = uc(f, t)), p;
                  }
                  var l,
                    s,
                    h,
                    p,
                    _,
                    v,
                    g = 0,
                    y = !1,
                    d = !1,
                    b = !0;
                  if ('function' != typeof n) throw new $o(rn);
                  return (
                    (t = ao(t) || 0),
                    Xi(r) &&
                      ((y = !!r.leading), (h = (d = 'maxWait' in r) ? wf(ao(r.maxWait) || 0, t) : h), (b = 'trailing' in r ? !!r.trailing : b)),
                    (a.cancel = function () {
                      _ !== X && Jf(_), (g = 0), (l = v = s = _ = X);
                    }),
                    (a.flush = function () {
                      return _ === X ? p : c(Wc());
                    }),
                    a
                  );
                }
                function qi(n, t) {
                  if ('function' != typeof n || (null != t && 'function' != typeof t)) throw new $o(rn);
                  var r = function () {
                    var e = arguments,
                      u = t ? t.apply(this, e) : e[0],
                      i = r.cache;
                    if (i.has(u)) return i.get(u);
                    var o = n.apply(this, e);
                    return (r.cache = i.set(u, o) || i), o;
                  };
                  return (r.cache = new (qi.Cache || Jt)()), r;
                }
                function Zi(n) {
                  if ('function' != typeof n) throw new $o(rn);
                  return function () {
                    var t = arguments;
                    switch (t.length) {
                      case 0:
                        return !n.call(this);
                      case 1:
                        return !n.call(this, t[0]);
                      case 2:
                        return !n.call(this, t[0], t[1]);
                      case 3:
                        return !n.call(this, t[0], t[1], t[2]);
                    }
                    return !n.apply(this, t);
                  };
                }
                function Ki(n, t) {
                  return n === t || (n !== n && t !== t);
                }
                function Vi(n) {
                  return null != n && Qi(n.length) && !Ji(n);
                }
                function Gi(n) {
                  return no(n) && Vi(n);
                }
                function Hi(n) {
                  if (!no(n)) return !1;
                  var t = Vr(n);
                  return t == Nn || t == Fn || ('string' == typeof n.message && 'string' == typeof n.name && !ro(n));
                }
                function Ji(n) {
                  if (!Xi(n)) return !1;
                  var t = Vr(n);
                  return t == Pn || t == qn || t == $n || t == Hn;
                }
                function Yi(n) {
                  return 'number' == typeof n && n == fo(n);
                }
                function Qi(n) {
                  return 'number' == typeof n && n > -1 && n % 1 == 0 && n <= zn;
                }
                function Xi(n) {
                  var t = typeof n;
                  return null != n && ('object' == t || 'function' == t);
                }
                function no(n) {
                  return null != n && 'object' == typeof n;
                }
                function to(n) {
                  return 'number' == typeof n || (no(n) && Vr(n) == Kn);
                }
                function ro(n) {
                  if (!no(n) || Vr(n) != Gn) return !1;
                  var t = tf(n);
                  if (null === t) return !0;
                  var r = qo.call(t, 'constructor') && t.constructor;
                  return 'function' == typeof r && r instanceof r && Po.call(r) == Go;
                }
                function eo(n) {
                  return 'string' == typeof n || (!Zc(n) && no(n) && Vr(n) == Qn);
                }
                function uo(n) {
                  return 'symbol' == typeof n || (no(n) && Vr(n) == Xn);
                }
                function io(n) {
                  if (!n) return [];
                  if (Vi(n)) return eo(n) ? H(n) : ou(n);
                  if (ff && n[ff]) return M(n[ff]());
                  var t = tc(n);
                  return (t == Zn ? F : t == Yn ? q : yo)(n);
                }
                function oo(n) {
                  return n ? ((n = ao(n)) === Rn || n === -Rn ? (n < 0 ? -1 : 1) * En : n === n ? n : 0) : 0 === n ? n : 0;
                }
                function fo(n) {
                  var t = oo(n),
                    r = t % 1;
                  return t === t ? (r ? t - r : t) : 0;
                }
                function co(n) {
                  return n ? pr(fo(n), 0, Ln) : 0;
                }
                function ao(n) {
                  if ('number' == typeof n) return n;
                  if (uo(n)) return Sn;
                  if (Xi(n)) {
                    var t = 'function' == typeof n.valueOf ? n.valueOf() : n;
                    n = Xi(t) ? t + '' : t;
                  }
                  if ('string' != typeof n) return 0 === n ? n : +n;
                  n = n.replace(Et, '');
                  var r = Ft.test(n);
                  return r || Pt.test(n) ? Ar(n.slice(2), r ? 2 : 8) : Mt.test(n) ? Sn : +n;
                }
                function lo(n) {
                  return fu(n, vo(n));
                }
                function so(n) {
                  return null == n ? '' : Be(n);
                }
                function ho(n, t, r) {
                  var e = null == n ? X : Zr(n, t);
                  return e === X ? r : e;
                }
                function po(n, t) {
                  return null != n && Yu(n, t, Jr);
                }
                function _o(n) {
                  return Vi(n) ? Xt(n) : fe(n);
                }
                function vo(n) {
                  return Vi(n) ? Xt(n, !0) : ce(n);
                }
                function go(n, t) {
                  if (null == n) return {};
                  var r = l(Fu(n), function (n) {
                    return [n];
                  });
                  return (
                    (t = qu(t)),
                    de(n, r, function (n, r) {
                      return t(n, r[0]);
                    })
                  );
                }
                function yo(n) {
                  return null == n ? [] : S(n, _o(n));
                }
                function bo(n) {
                  return Aa(so(n).toLowerCase());
                }
                function wo(n) {
                  return (n = so(n)) && n.replace(Zt, Mr).replace(lr, '');
                }
                function mo(n, t, r) {
                  return (n = so(n)), (t = r ? X : t) === X ? (D(n) ? Q(n) : g(n)) : n.match(t) || [];
                }
                function xo(n) {
                  return function () {
                    return n;
                  };
                }
                function jo(n) {
                  return n;
                }
                function Ao(n) {
                  return oe('function' == typeof n ? n : _r(n, fn));
                }
                function ko(n, t, r) {
                  var e = _o(t),
                    i = qr(t, e);
                  null != r || (Xi(t) && (i.length || !e.length)) || ((r = t), (t = n), (n = this), (i = qr(t, _o(t))));
                  var o = !(Xi(r) && 'chain' in r && !r.chain),
                    f = Ji(n);
                  return (
                    u(i, function (r) {
                      var e = t[r];
                      (n[r] = e),
                        f &&
                          (n.prototype[r] = function () {
                            var t = this.__chain__;
                            if (o || t) {
                              var r = n(this.__wrapped__);
                              return (r.__actions__ = ou(this.__actions__)).push({ func: e, args: arguments, thisArg: n }), (r.__chain__ = t), r;
                            }
                            return e.apply(n, s([this.value()], arguments));
                          });
                    }),
                    n
                  );
                }
                function Oo() {}
                function Io(n) {
                  return ii(n) ? j(mi(n)) : be(n);
                }
                function Ro() {
                  return [];
                }
                function zo() {
                  return !1;
                }
                var Eo = (A = null == A ? Ir : Pr.defaults(Ir.Object(), A, Pr.pick(Ir, vr))).Array,
                  So = A.Date,
                  Lo = A.Error,
                  Wo = A.Function,
                  Co = A.Math,
                  Uo = A.Object,
                  Bo = A.RegExp,
                  To = A.String,
                  $o = A.TypeError,
                  Do = Eo.prototype,
                  Mo = Wo.prototype,
                  Fo = Uo.prototype,
                  No = A['__core-js_shared__'],
                  Po = Mo.toString,
                  qo = Fo.hasOwnProperty,
                  Zo = 0,
                  Ko = (function () {
                    var n = /[^.]+$/.exec((No && No.keys && No.keys.IE_PROTO) || '');
                    return n ? 'Symbol(src)_1.' + n : '';
                  })(),
                  Vo = Fo.toString,
                  Go = Po.call(Uo),
                  Ho = Ir._,
                  Jo = Bo(
                    '^' +
                      Po.call(qo)
                        .replace(Rt, '\\$&')
                        .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') +
                      '$',
                  ),
                  Yo = Er ? A.Buffer : X,
                  Qo = A.Symbol,
                  Xo = A.Uint8Array,
                  nf = Yo ? Yo.allocUnsafe : X,
                  tf = N(Uo.getPrototypeOf, Uo),
                  rf = Uo.create,
                  ef = Fo.propertyIsEnumerable,
                  uf = Do.splice,
                  of = Qo ? Qo.isConcatSpreadable : X,
                  ff = Qo ? Qo.iterator : X,
                  cf = Qo ? Qo.toStringTag : X,
                  af = (function () {
                    try {
                      var n = Vu(Uo, 'defineProperty');
                      return n({}, '', {}), n;
                    } catch (n) {}
                  })(),
                  lf = A.clearTimeout !== Ir.clearTimeout && A.clearTimeout,
                  sf = So && So.now !== Ir.Date.now && So.now,
                  hf = A.setTimeout !== Ir.setTimeout && A.setTimeout,
                  pf = Co.ceil,
                  _f = Co.floor,
                  vf = Uo.getOwnPropertySymbols,
                  gf = Yo ? Yo.isBuffer : X,
                  yf = A.isFinite,
                  df = Do.join,
                  bf = N(Uo.keys, Uo),
                  wf = Co.max,
                  mf = Co.min,
                  xf = So.now,
                  jf = A.parseInt,
                  Af = Co.random,
                  kf = Do.reverse,
                  Of = Vu(A, 'DataView'),
                  If = Vu(A, 'Map'),
                  Rf = Vu(A, 'Promise'),
                  zf = Vu(A, 'Set'),
                  Ef = Vu(A, 'WeakMap'),
                  Sf = Vu(Uo, 'create'),
                  Lf = Ef && new Ef(),
                  Wf = {},
                  Cf = xi(Of),
                  Uf = xi(If),
                  Bf = xi(Rf),
                  Tf = xi(zf),
                  $f = xi(Ef),
                  Df = Qo ? Qo.prototype : X,
                  Mf = Df ? Df.valueOf : X,
                  Ff = Df ? Df.toString : X,
                  Nf = (function () {
                    function n() {}
                    return function (t) {
                      if (!Xi(t)) return {};
                      if (rf) return rf(t);
                      n.prototype = t;
                      var r = new n();
                      return (n.prototype = X), r;
                    };
                  })();
                (K.templateSettings = { escape: mt, evaluate: xt, interpolate: jt, variable: '', imports: { _: K } }),
                  (K.prototype = J.prototype),
                  (K.prototype.constructor = K),
                  (Y.prototype = Nf(J.prototype)),
                  (Y.prototype.constructor = Y),
                  (Bt.prototype = Nf(J.prototype)),
                  (Bt.prototype.constructor = Bt),
                  (Gt.prototype.clear = function () {
                    (this.__data__ = Sf ? Sf(null) : {}), (this.size = 0);
                  }),
                  (Gt.prototype.delete = function (n) {
                    var t = this.has(n) && delete this.__data__[n];
                    return (this.size -= t ? 1 : 0), t;
                  }),
                  (Gt.prototype.get = function (n) {
                    var t = this.__data__;
                    if (Sf) {
                      var r = t[n];
                      return r === en ? X : r;
                    }
                    return qo.call(t, n) ? t[n] : X;
                  }),
                  (Gt.prototype.has = function (n) {
                    var t = this.__data__;
                    return Sf ? t[n] !== X : qo.call(t, n);
                  }),
                  (Gt.prototype.set = function (n, t) {
                    var r = this.__data__;
                    return (this.size += this.has(n) ? 0 : 1), (r[n] = Sf && t === X ? en : t), this;
                  }),
                  (Ht.prototype.clear = function () {
                    (this.__data__ = []), (this.size = 0);
                  }),
                  (Ht.prototype.delete = function (n) {
                    var t = this.__data__,
                      r = ir(t, n);
                    return !(r < 0 || (r == t.length - 1 ? t.pop() : uf.call(t, r, 1), --this.size, 0));
                  }),
                  (Ht.prototype.get = function (n) {
                    var t = this.__data__,
                      r = ir(t, n);
                    return r < 0 ? X : t[r][1];
                  }),
                  (Ht.prototype.has = function (n) {
                    return ir(this.__data__, n) > -1;
                  }),
                  (Ht.prototype.set = function (n, t) {
                    var r = this.__data__,
                      e = ir(r, n);
                    return e < 0 ? (++this.size, r.push([n, t])) : (r[e][1] = t), this;
                  }),
                  (Jt.prototype.clear = function () {
                    (this.size = 0), (this.__data__ = { hash: new Gt(), map: new (If || Ht)(), string: new Gt() });
                  }),
                  (Jt.prototype.delete = function (n) {
                    var t = Zu(this, n).delete(n);
                    return (this.size -= t ? 1 : 0), t;
                  }),
                  (Jt.prototype.get = function (n) {
                    return Zu(this, n).get(n);
                  }),
                  (Jt.prototype.has = function (n) {
                    return Zu(this, n).has(n);
                  }),
                  (Jt.prototype.set = function (n, t) {
                    var r = Zu(this, n),
                      e = r.size;
                    return r.set(n, t), (this.size += r.size == e ? 0 : 1), this;
                  }),
                  (Yt.prototype.add = Yt.prototype.push = function (n) {
                    return this.__data__.set(n, en), this;
                  }),
                  (Yt.prototype.has = function (n) {
                    return this.__data__.has(n);
                  }),
                  (Qt.prototype.clear = function () {
                    (this.__data__ = new Ht()), (this.size = 0);
                  }),
                  (Qt.prototype.delete = function (n) {
                    var t = this.__data__,
                      r = t.delete(n);
                    return (this.size = t.size), r;
                  }),
                  (Qt.prototype.get = function (n) {
                    return this.__data__.get(n);
                  }),
                  (Qt.prototype.has = function (n) {
                    return this.__data__.has(n);
                  }),
                  (Qt.prototype.set = function (n, t) {
                    var r = this.__data__;
                    if (r instanceof Ht) {
                      var e = r.__data__;
                      if (!If || e.length < nn - 1) return e.push([n, t]), (this.size = ++r.size), this;
                      r = this.__data__ = new Jt(e);
                    }
                    return r.set(n, t), (this.size = r.size), this;
                  });
                var Pf = hu(Lr),
                  qf = hu(Dr, !0),
                  Zf = pu(),
                  Kf = pu(!0),
                  Vf = Lf
                    ? function (n, t) {
                        return Lf.set(n, t), n;
                      }
                    : jo,
                  Gf = af
                    ? function (n, t) {
                        return af(n, 'toString', { configurable: !0, enumerable: !1, value: xo(t), writable: !0 });
                      }
                    : jo,
                  Hf = ke,
                  Jf =
                    lf ||
                    function (n) {
                      return Ir.clearTimeout(n);
                    },
                  Yf =
                    zf && 1 / q(new zf([, -0]))[1] == Rn
                      ? function (n) {
                          return new zf(n);
                        }
                      : Oo,
                  Qf = Lf
                    ? function (n) {
                        return Lf.get(n);
                      }
                    : Oo,
                  Xf = vf
                    ? function (n) {
                        return null == n
                          ? []
                          : ((n = Uo(n)),
                            f(vf(n), function (t) {
                              return ef.call(n, t);
                            }));
                      }
                    : Ro,
                  nc = vf
                    ? function (n) {
                        for (var t = []; n; ) s(t, Xf(n)), (n = tf(n));
                        return t;
                      }
                    : Ro,
                  tc = Vr;
                ((Of && tc(new Of(new ArrayBuffer(1))) != ut) ||
                  (If && tc(new If()) != Zn) ||
                  (Rf && '[object Promise]' != tc(Rf.resolve())) ||
                  (zf && tc(new zf()) != Yn) ||
                  (Ef && tc(new Ef()) != tt)) &&
                  (tc = function (n) {
                    var t = Vr(n),
                      r = t == Gn ? n.constructor : X,
                      e = r ? xi(r) : '';
                    if (e)
                      switch (e) {
                        case Cf:
                          return ut;
                        case Uf:
                          return Zn;
                        case Bf:
                          return '[object Promise]';
                        case Tf:
                          return Yn;
                        case $f:
                          return tt;
                      }
                    return t;
                  });
                var rc = No ? Ji : zo,
                  ec = bi(Vf),
                  uc =
                    hf ||
                    function (n, t) {
                      return Ir.setTimeout(n, t);
                    },
                  ic = bi(Gf),
                  oc = (function (n) {
                    var t = qi(n, function (n) {
                        return r.size === un && r.clear(), n;
                      }),
                      r = t.cache;
                    return t;
                  })(function (n) {
                    var t = [];
                    return (
                      Ot.test(n) && t.push(''),
                      n.replace(It, function (n, r, e, u) {
                        t.push(e ? u.replace(Tt, '$1') : r || n);
                      }),
                      t
                    );
                  }),
                  fc = ke(function (n, t) {
                    return Gi(n) ? xr(n, Sr(t, 1, Gi, !0)) : [];
                  }),
                  cc = ke(function (n, t) {
                    var r = zi(t);
                    return Gi(r) && (r = X), Gi(n) ? xr(n, Sr(t, 1, Gi, !0), qu(r, 2)) : [];
                  }),
                  ac = ke(function (n, t) {
                    var r = zi(t);
                    return Gi(r) && (r = X), Gi(n) ? xr(n, Sr(t, 1, Gi, !0), X, r) : [];
                  }),
                  lc = ke(function (n) {
                    var t = l(n, qe);
                    return t.length && t[0] === n[0] ? Qr(t) : [];
                  }),
                  sc = ke(function (n) {
                    var t = zi(n),
                      r = l(n, qe);
                    return t === zi(r) ? (t = X) : r.pop(), r.length && r[0] === n[0] ? Qr(r, qu(t, 2)) : [];
                  }),
                  hc = ke(function (n) {
                    var t = zi(n),
                      r = l(n, qe);
                    return (t = 'function' == typeof t ? t : X) && r.pop(), r.length && r[0] === n[0] ? Qr(r, X, t) : [];
                  }),
                  pc = ke(Ei),
                  _c = Du(function (n, t) {
                    var r = null == n ? 0 : n.length,
                      e = hr(n, t);
                    return (
                      me(
                        n,
                        l(t, function (n) {
                          return ei(n, r) ? +n : n;
                        }).sort(ru),
                      ),
                      e
                    );
                  }),
                  vc = ke(function (n) {
                    return Te(Sr(n, 1, Gi, !0));
                  }),
                  gc = ke(function (n) {
                    var t = zi(n);
                    return Gi(t) && (t = X), Te(Sr(n, 1, Gi, !0), qu(t, 2));
                  }),
                  yc = ke(function (n) {
                    var t = zi(n);
                    return (t = 'function' == typeof t ? t : X), Te(Sr(n, 1, Gi, !0), X, t);
                  }),
                  dc = ke(function (n, t) {
                    return Gi(n) ? xr(n, t) : [];
                  }),
                  bc = ke(function (n) {
                    return Ne(f(n, Gi));
                  }),
                  wc = ke(function (n) {
                    var t = zi(n);
                    return Gi(t) && (t = X), Ne(f(n, Gi), qu(t, 2));
                  }),
                  mc = ke(function (n) {
                    var t = zi(n);
                    return (t = 'function' == typeof t ? t : X), Ne(f(n, Gi), X, t);
                  }),
                  xc = ke(Li),
                  jc = ke(function (n) {
                    var t = n.length,
                      r = t > 1 ? n[t - 1] : X;
                    return (r = 'function' == typeof r ? (n.pop(), r) : X), Wi(n, r);
                  }),
                  Ac = Du(function (n) {
                    var t = n.length,
                      r = t ? n[0] : 0,
                      e = this.__wrapped__,
                      u = function (t) {
                        return hr(t, n);
                      };
                    return !(t > 1 || this.__actions__.length) && e instanceof Bt && ei(r)
                      ? ((e = e.slice(r, +r + (t ? 1 : 0))).__actions__.push({ func: Ui, args: [u], thisArg: X }),
                        new Y(e, this.__chain__).thru(function (n) {
                          return t && !n.length && n.push(X), n;
                        }))
                      : this.thru(u);
                  }),
                  kc = lu(function (n, t, r) {
                    qo.call(n, r) ? ++n[r] : sr(n, r, 1);
                  }),
                  Oc = bu(ki),
                  Ic = bu(Oi),
                  Rc = lu(function (n, t, r) {
                    qo.call(n, r) ? n[r].push(t) : sr(n, r, [t]);
                  }),
                  zc = ke(function (n, t, e) {
                    var u = -1,
                      i = 'function' == typeof t,
                      o = Vi(n) ? Eo(n.length) : [];
                    return (
                      Pf(n, function (n) {
                        o[++u] = i ? r(t, n, e) : ne(n, t, e);
                      }),
                      o
                    );
                  }),
                  Ec = lu(function (n, t, r) {
                    sr(n, r, t);
                  }),
                  Sc = lu(
                    function (n, t, r) {
                      n[r ? 0 : 1].push(t);
                    },
                    function () {
                      return [[], []];
                    },
                  ),
                  Lc = ke(function (n, t) {
                    if (null == n) return [];
                    var r = t.length;
                    return r > 1 && ui(n, t[0], t[1]) ? (t = []) : r > 2 && ui(t[0], t[1], t[2]) && (t = [t[0]]), ge(n, Sr(t, 1), []);
                  }),
                  Wc =
                    sf ||
                    function () {
                      return Ir.Date.now();
                    },
                  Cc = ke(function (n, t, r) {
                    var e = hn;
                    if (r.length) {
                      var u = P(r, Pu(Cc));
                      e |= yn;
                    }
                    return Lu(n, e, t, r, u);
                  }),
                  Uc = ke(function (n, t, r) {
                    var e = hn | pn;
                    if (r.length) {
                      var u = P(r, Pu(Uc));
                      e |= yn;
                    }
                    return Lu(t, e, n, r, u);
                  }),
                  Bc = ke(function (n, t) {
                    return mr(n, 1, t);
                  }),
                  Tc = ke(function (n, t, r) {
                    return mr(n, ao(t) || 0, r);
                  });
                qi.Cache = Jt;
                var $c = Hf(function (n, t) {
                    var e = (t = 1 == t.length && Zc(t[0]) ? l(t[0], E(qu())) : l(Sr(t, 1), E(qu()))).length;
                    return ke(function (u) {
                      for (var i = -1, o = mf(u.length, e); ++i < o; ) u[i] = t[i].call(this, u[i]);
                      return r(n, this, u);
                    });
                  }),
                  Dc = ke(function (n, t) {
                    var r = P(t, Pu(Dc));
                    return Lu(n, yn, X, t, r);
                  }),
                  Mc = ke(function (n, t) {
                    var r = P(t, Pu(Mc));
                    return Lu(n, dn, X, t, r);
                  }),
                  Fc = Du(function (n, t) {
                    return Lu(n, wn, X, X, X, t);
                  }),
                  Nc = Ru(Gr),
                  Pc = Ru(function (n, t) {
                    return n >= t;
                  }),
                  qc = te(
                    (function () {
                      return arguments;
                    })(),
                  )
                    ? te
                    : function (n) {
                        return no(n) && qo.call(n, 'callee') && !ef.call(n, 'callee');
                      },
                  Zc = Eo.isArray,
                  Kc = Wr
                    ? E(Wr)
                    : function (n) {
                        return no(n) && Vr(n) == et;
                      },
                  Vc = gf || zo,
                  Gc = Cr
                    ? E(Cr)
                    : function (n) {
                        return no(n) && Vr(n) == Mn;
                      },
                  Hc = Ur
                    ? E(Ur)
                    : function (n) {
                        return no(n) && tc(n) == Zn;
                      },
                  Jc = Br
                    ? E(Br)
                    : function (n) {
                        return no(n) && Vr(n) == Jn;
                      },
                  Yc = Tr
                    ? E(Tr)
                    : function (n) {
                        return no(n) && tc(n) == Yn;
                      },
                  Qc = $r
                    ? E($r)
                    : function (n) {
                        return no(n) && Qi(n.length) && !!yr[Vr(n)];
                      },
                  Xc = Ru(ae),
                  na = Ru(function (n, t) {
                    return n <= t;
                  }),
                  ta = su(function (n, t) {
                    if (ai(t) || Vi(t)) fu(t, _o(t), n);
                    else for (var r in t) qo.call(t, r) && ur(n, r, t[r]);
                  }),
                  ra = su(function (n, t) {
                    fu(t, vo(t), n);
                  }),
                  ea = su(function (n, t, r, e) {
                    fu(t, vo(t), n, e);
                  }),
                  ua = su(function (n, t, r, e) {
                    fu(t, _o(t), n, e);
                  }),
                  ia = Du(hr),
                  oa = ke(function (n) {
                    return n.push(X, Wu), r(ea, X, n);
                  }),
                  fa = ke(function (n) {
                    return n.push(X, Cu), r(ha, X, n);
                  }),
                  ca = xu(function (n, t, r) {
                    n[t] = r;
                  }, xo(jo)),
                  aa = xu(function (n, t, r) {
                    qo.call(n, t) ? n[t].push(r) : (n[t] = [r]);
                  }, qu),
                  la = ke(ne),
                  sa = su(function (n, t, r) {
                    pe(n, t, r);
                  }),
                  ha = su(function (n, t, r, e) {
                    pe(n, t, r, e);
                  }),
                  pa = Du(function (n, t) {
                    var r = {};
                    if (null == n) return r;
                    var e = !1;
                    (t = l(t, function (t) {
                      return (t = Ke(t, n)), e || (e = t.length > 1), t;
                    })),
                      fu(n, Fu(n), r),
                      e && (r = _r(r, fn | cn | an, Uu));
                    for (var u = t.length; u--; ) $e(r, t[u]);
                    return r;
                  }),
                  _a = Du(function (n, t) {
                    return null == n ? {} : ye(n, t);
                  }),
                  va = Su(_o),
                  ga = Su(vo),
                  ya = gu(function (n, t, r) {
                    return (t = t.toLowerCase()), n + (r ? bo(t) : t);
                  }),
                  da = gu(function (n, t, r) {
                    return n + (r ? '-' : '') + t.toLowerCase();
                  }),
                  ba = gu(function (n, t, r) {
                    return n + (r ? ' ' : '') + t.toLowerCase();
                  }),
                  wa = vu('toLowerCase'),
                  ma = gu(function (n, t, r) {
                    return n + (r ? '_' : '') + t.toLowerCase();
                  }),
                  xa = gu(function (n, t, r) {
                    return n + (r ? ' ' : '') + Aa(t);
                  }),
                  ja = gu(function (n, t, r) {
                    return n + (r ? ' ' : '') + t.toUpperCase();
                  }),
                  Aa = vu('toUpperCase'),
                  ka = ke(function (n, t) {
                    try {
                      return r(n, X, t);
                    } catch (n) {
                      return Hi(n) ? n : new Lo(n);
                    }
                  }),
                  Oa = Du(function (n, t) {
                    return (
                      u(t, function (t) {
                        (t = mi(t)), sr(n, t, Cc(n[t], n));
                      }),
                      n
                    );
                  }),
                  Ia = wu(),
                  Ra = wu(!0),
                  za = ke(function (n, t) {
                    return function (r) {
                      return ne(r, n, t);
                    };
                  }),
                  Ea = ke(function (n, t) {
                    return function (r) {
                      return ne(n, r, t);
                    };
                  }),
                  Sa = Au(l),
                  La = Au(o),
                  Wa = Au(_),
                  Ca = Iu(),
                  Ua = Iu(!0),
                  Ba = ju(function (n, t) {
                    return n + t;
                  }, 0),
                  Ta = Eu('ceil'),
                  $a = ju(function (n, t) {
                    return n / t;
                  }, 1),
                  Da = Eu('floor'),
                  Ma = ju(function (n, t) {
                    return n * t;
                  }, 1),
                  Fa = Eu('round'),
                  Na = ju(function (n, t) {
                    return n - t;
                  }, 0);
                return (
                  (K.after = function (n, t) {
                    if ('function' != typeof t) throw new $o(rn);
                    return (
                      (n = fo(n)),
                      function () {
                        if (--n < 1) return t.apply(this, arguments);
                      }
                    );
                  }),
                  (K.ary = Di),
                  (K.assign = ta),
                  (K.assignIn = ra),
                  (K.assignInWith = ea),
                  (K.assignWith = ua),
                  (K.at = ia),
                  (K.before = Mi),
                  (K.bind = Cc),
                  (K.bindAll = Oa),
                  (K.bindKey = Uc),
                  (K.castArray = function () {
                    if (!arguments.length) return [];
                    var n = arguments[0];
                    return Zc(n) ? n : [n];
                  }),
                  (K.chain = Ci),
                  (K.chunk = function (n, t, r) {
                    t = (r ? ui(n, t, r) : t === X) ? 1 : wf(fo(t), 0);
                    var e = null == n ? 0 : n.length;
                    if (!e || t < 1) return [];
                    for (var u = 0, i = 0, o = Eo(pf(e / t)); u < e; ) o[i++] = Ee(n, u, (u += t));
                    return o;
                  }),
                  (K.compact = function (n) {
                    for (var t = -1, r = null == n ? 0 : n.length, e = 0, u = []; ++t < r; ) {
                      var i = n[t];
                      i && (u[e++] = i);
                    }
                    return u;
                  }),
                  (K.concat = function () {
                    var n = arguments.length;
                    if (!n) return [];
                    for (var t = Eo(n - 1), r = arguments[0], e = n; e--; ) t[e - 1] = arguments[e];
                    return s(Zc(r) ? ou(r) : [r], Sr(t, 1));
                  }),
                  (K.cond = function (n) {
                    var t = null == n ? 0 : n.length,
                      e = qu();
                    return (
                      (n = t
                        ? l(n, function (n) {
                            if ('function' != typeof n[1]) throw new $o(rn);
                            return [e(n[0]), n[1]];
                          })
                        : []),
                      ke(function (e) {
                        for (var u = -1; ++u < t; ) {
                          var i = n[u];
                          if (r(i[0], this, e)) return r(i[1], this, e);
                        }
                      })
                    );
                  }),
                  (K.conforms = function (n) {
                    return br(_r(n, fn));
                  }),
                  (K.constant = xo),
                  (K.countBy = kc),
                  (K.create = function (n, t) {
                    var r = Nf(n);
                    return null == t ? r : fr(r, t);
                  }),
                  (K.curry = Fi),
                  (K.curryRight = Ni),
                  (K.debounce = Pi),
                  (K.defaults = oa),
                  (K.defaultsDeep = fa),
                  (K.defer = Bc),
                  (K.delay = Tc),
                  (K.difference = fc),
                  (K.differenceBy = cc),
                  (K.differenceWith = ac),
                  (K.drop = function (n, t, r) {
                    var e = null == n ? 0 : n.length;
                    return e ? ((t = r || t === X ? 1 : fo(t)), Ee(n, t < 0 ? 0 : t, e)) : [];
                  }),
                  (K.dropRight = function (n, t, r) {
                    var e = null == n ? 0 : n.length;
                    return e ? ((t = r || t === X ? 1 : fo(t)), (t = e - t), Ee(n, 0, t < 0 ? 0 : t)) : [];
                  }),
                  (K.dropRightWhile = function (n, t) {
                    return n && n.length ? Me(n, qu(t, 3), !0, !0) : [];
                  }),
                  (K.dropWhile = function (n, t) {
                    return n && n.length ? Me(n, qu(t, 3), !0) : [];
                  }),
                  (K.fill = function (n, t, r, e) {
                    var u = null == n ? 0 : n.length;
                    return u ? (r && 'number' != typeof r && ui(n, t, r) && ((r = 0), (e = u)), Rr(n, t, r, e)) : [];
                  }),
                  (K.filter = function (n, t) {
                    return (Zc(n) ? f : zr)(n, qu(t, 3));
                  }),
                  (K.flatMap = function (n, t) {
                    return Sr($i(n, t), 1);
                  }),
                  (K.flatMapDeep = function (n, t) {
                    return Sr($i(n, t), Rn);
                  }),
                  (K.flatMapDepth = function (n, t, r) {
                    return (r = r === X ? 1 : fo(r)), Sr($i(n, t), r);
                  }),
                  (K.flatten = Ii),
                  (K.flattenDeep = function (n) {
                    return (null == n ? 0 : n.length) ? Sr(n, Rn) : [];
                  }),
                  (K.flattenDepth = function (n, t) {
                    return (null == n ? 0 : n.length) ? ((t = t === X ? 1 : fo(t)), Sr(n, t)) : [];
                  }),
                  (K.flip = function (n) {
                    return Lu(n, mn);
                  }),
                  (K.flow = Ia),
                  (K.flowRight = Ra),
                  (K.fromPairs = function (n) {
                    for (var t = -1, r = null == n ? 0 : n.length, e = {}; ++t < r; ) {
                      var u = n[t];
                      e[u[0]] = u[1];
                    }
                    return e;
                  }),
                  (K.functions = function (n) {
                    return null == n ? [] : qr(n, _o(n));
                  }),
                  (K.functionsIn = function (n) {
                    return null == n ? [] : qr(n, vo(n));
                  }),
                  (K.groupBy = Rc),
                  (K.initial = function (n) {
                    return (null == n ? 0 : n.length) ? Ee(n, 0, -1) : [];
                  }),
                  (K.intersection = lc),
                  (K.intersectionBy = sc),
                  (K.intersectionWith = hc),
                  (K.invert = ca),
                  (K.invertBy = aa),
                  (K.invokeMap = zc),
                  (K.iteratee = Ao),
                  (K.keyBy = Ec),
                  (K.keys = _o),
                  (K.keysIn = vo),
                  (K.map = $i),
                  (K.mapKeys = function (n, t) {
                    var r = {};
                    return (
                      (t = qu(t, 3)),
                      Lr(n, function (n, e, u) {
                        sr(r, t(n, e, u), n);
                      }),
                      r
                    );
                  }),
                  (K.mapValues = function (n, t) {
                    var r = {};
                    return (
                      (t = qu(t, 3)),
                      Lr(n, function (n, e, u) {
                        sr(r, e, t(n, e, u));
                      }),
                      r
                    );
                  }),
                  (K.matches = function (n) {
                    return se(_r(n, fn));
                  }),
                  (K.matchesProperty = function (n, t) {
                    return he(n, _r(t, fn));
                  }),
                  (K.memoize = qi),
                  (K.merge = sa),
                  (K.mergeWith = ha),
                  (K.method = za),
                  (K.methodOf = Ea),
                  (K.mixin = ko),
                  (K.negate = Zi),
                  (K.nthArg = function (n) {
                    return (
                      (n = fo(n)),
                      ke(function (t) {
                        return ve(t, n);
                      })
                    );
                  }),
                  (K.omit = pa),
                  (K.omitBy = function (n, t) {
                    return go(n, Zi(qu(t)));
                  }),
                  (K.once = function (n) {
                    return Mi(2, n);
                  }),
                  (K.orderBy = function (n, t, r, e) {
                    return null == n ? [] : (Zc(t) || (t = null == t ? [] : [t]), (r = e ? X : r), Zc(r) || (r = null == r ? [] : [r]), ge(n, t, r));
                  }),
                  (K.over = Sa),
                  (K.overArgs = $c),
                  (K.overEvery = La),
                  (K.overSome = Wa),
                  (K.partial = Dc),
                  (K.partialRight = Mc),
                  (K.partition = Sc),
                  (K.pick = _a),
                  (K.pickBy = go),
                  (K.property = Io),
                  (K.propertyOf = function (n) {
                    return function (t) {
                      return null == n ? X : Zr(n, t);
                    };
                  }),
                  (K.pull = pc),
                  (K.pullAll = Ei),
                  (K.pullAllBy = function (n, t, r) {
                    return n && n.length && t && t.length ? we(n, t, qu(r, 2)) : n;
                  }),
                  (K.pullAllWith = function (n, t, r) {
                    return n && n.length && t && t.length ? we(n, t, X, r) : n;
                  }),
                  (K.pullAt = _c),
                  (K.range = Ca),
                  (K.rangeRight = Ua),
                  (K.rearg = Fc),
                  (K.reject = function (n, t) {
                    return (Zc(n) ? f : zr)(n, Zi(qu(t, 3)));
                  }),
                  (K.remove = function (n, t) {
                    var r = [];
                    if (!n || !n.length) return r;
                    var e = -1,
                      u = [],
                      i = n.length;
                    for (t = qu(t, 3); ++e < i; ) {
                      var o = n[e];
                      t(o, e, n) && (r.push(o), u.push(e));
                    }
                    return me(n, u), r;
                  }),
                  (K.rest = function (n, t) {
                    if ('function' != typeof n) throw new $o(rn);
                    return (t = t === X ? t : fo(t)), ke(n, t);
                  }),
                  (K.reverse = Si),
                  (K.sampleSize = function (n, t, r) {
                    return (t = (r ? ui(n, t, r) : t === X) ? 1 : fo(t)), (Zc(n) ? tr : Ie)(n, t);
                  }),
                  (K.set = function (n, t, r) {
                    return null == n ? n : Re(n, t, r);
                  }),
                  (K.setWith = function (n, t, r, e) {
                    return (e = 'function' == typeof e ? e : X), null == n ? n : Re(n, t, r, e);
                  }),
                  (K.shuffle = function (n) {
                    return (Zc(n) ? rr : ze)(n);
                  }),
                  (K.slice = function (n, t, r) {
                    var e = null == n ? 0 : n.length;
                    return e
                      ? (r && 'number' != typeof r && ui(n, t, r) ? ((t = 0), (r = e)) : ((t = null == t ? 0 : fo(t)), (r = r === X ? e : fo(r))),
                        Ee(n, t, r))
                      : [];
                  }),
                  (K.sortBy = Lc),
                  (K.sortedUniq = function (n) {
                    return n && n.length ? Ce(n) : [];
                  }),
                  (K.sortedUniqBy = function (n, t) {
                    return n && n.length ? Ce(n, qu(t, 2)) : [];
                  }),
                  (K.split = function (n, t, r) {
                    return (
                      r && 'number' != typeof r && ui(n, t, r) && (t = r = X),
                      (r = r === X ? Ln : r >>> 0)
                        ? (n = so(n)) && ('string' == typeof t || (null != t && !Jc(t))) && !(t = Be(t)) && $(n)
                          ? Ve(H(n), 0, r)
                          : n.split(t, r)
                        : []
                    );
                  }),
                  (K.spread = function (n, t) {
                    if ('function' != typeof n) throw new $o(rn);
                    return (
                      (t = null == t ? 0 : wf(fo(t), 0)),
                      ke(function (e) {
                        var u = e[t],
                          i = Ve(e, 0, t);
                        return u && s(i, u), r(n, this, i);
                      })
                    );
                  }),
                  (K.tail = function (n) {
                    var t = null == n ? 0 : n.length;
                    return t ? Ee(n, 1, t) : [];
                  }),
                  (K.take = function (n, t, r) {
                    return n && n.length ? ((t = r || t === X ? 1 : fo(t)), Ee(n, 0, t < 0 ? 0 : t)) : [];
                  }),
                  (K.takeRight = function (n, t, r) {
                    var e = null == n ? 0 : n.length;
                    return e ? ((t = r || t === X ? 1 : fo(t)), (t = e - t), Ee(n, t < 0 ? 0 : t, e)) : [];
                  }),
                  (K.takeRightWhile = function (n, t) {
                    return n && n.length ? Me(n, qu(t, 3), !1, !0) : [];
                  }),
                  (K.takeWhile = function (n, t) {
                    return n && n.length ? Me(n, qu(t, 3)) : [];
                  }),
                  (K.tap = function (n, t) {
                    return t(n), n;
                  }),
                  (K.throttle = function (n, t, r) {
                    var e = !0,
                      u = !0;
                    if ('function' != typeof n) throw new $o(rn);
                    return (
                      Xi(r) && ((e = 'leading' in r ? !!r.leading : e), (u = 'trailing' in r ? !!r.trailing : u)),
                      Pi(n, t, { leading: e, maxWait: t, trailing: u })
                    );
                  }),
                  (K.thru = Ui),
                  (K.toArray = io),
                  (K.toPairs = va),
                  (K.toPairsIn = ga),
                  (K.toPath = function (n) {
                    return Zc(n) ? l(n, mi) : uo(n) ? [n] : ou(oc(so(n)));
                  }),
                  (K.toPlainObject = lo),
                  (K.transform = function (n, t, r) {
                    var e = Zc(n),
                      i = e || Vc(n) || Qc(n);
                    if (((t = qu(t, 4)), null == r)) {
                      var o = n && n.constructor;
                      r = i ? (e ? new o() : []) : Xi(n) && Ji(o) ? Nf(tf(n)) : {};
                    }
                    return (
                      (i ? u : Lr)(n, function (n, e, u) {
                        return t(r, n, e, u);
                      }),
                      r
                    );
                  }),
                  (K.unary = function (n) {
                    return Di(n, 1);
                  }),
                  (K.union = vc),
                  (K.unionBy = gc),
                  (K.unionWith = yc),
                  (K.uniq = function (n) {
                    return n && n.length ? Te(n) : [];
                  }),
                  (K.uniqBy = function (n, t) {
                    return n && n.length ? Te(n, qu(t, 2)) : [];
                  }),
                  (K.uniqWith = function (n, t) {
                    return (t = 'function' == typeof t ? t : X), n && n.length ? Te(n, X, t) : [];
                  }),
                  (K.unset = function (n, t) {
                    return null == n || $e(n, t);
                  }),
                  (K.unzip = Li),
                  (K.unzipWith = Wi),
                  (K.update = function (n, t, r) {
                    return null == n ? n : De(n, t, Ze(r));
                  }),
                  (K.updateWith = function (n, t, r, e) {
                    return (e = 'function' == typeof e ? e : X), null == n ? n : De(n, t, Ze(r), e);
                  }),
                  (K.values = yo),
                  (K.valuesIn = function (n) {
                    return null == n ? [] : S(n, vo(n));
                  }),
                  (K.without = dc),
                  (K.words = mo),
                  (K.wrap = function (n, t) {
                    return Dc(Ze(t), n);
                  }),
                  (K.xor = bc),
                  (K.xorBy = wc),
                  (K.xorWith = mc),
                  (K.zip = xc),
                  (K.zipObject = function (n, t) {
                    return Pe(n || [], t || [], ur);
                  }),
                  (K.zipObjectDeep = function (n, t) {
                    return Pe(n || [], t || [], Re);
                  }),
                  (K.zipWith = jc),
                  (K.entries = va),
                  (K.entriesIn = ga),
                  (K.extend = ra),
                  (K.extendWith = ea),
                  ko(K, K),
                  (K.add = Ba),
                  (K.attempt = ka),
                  (K.camelCase = ya),
                  (K.capitalize = bo),
                  (K.ceil = Ta),
                  (K.clamp = function (n, t, r) {
                    return (
                      r === X && ((r = t), (t = X)),
                      r !== X && (r = (r = ao(r)) === r ? r : 0),
                      t !== X && (t = (t = ao(t)) === t ? t : 0),
                      pr(ao(n), t, r)
                    );
                  }),
                  (K.clone = function (n) {
                    return _r(n, an);
                  }),
                  (K.cloneDeep = function (n) {
                    return _r(n, fn | an);
                  }),
                  (K.cloneDeepWith = function (n, t) {
                    return (t = 'function' == typeof t ? t : X), _r(n, fn | an, t);
                  }),
                  (K.cloneWith = function (n, t) {
                    return (t = 'function' == typeof t ? t : X), _r(n, an, t);
                  }),
                  (K.conformsTo = function (n, t) {
                    return null == t || wr(n, t, _o(t));
                  }),
                  (K.deburr = wo),
                  (K.defaultTo = function (n, t) {
                    return null == n || n !== n ? t : n;
                  }),
                  (K.divide = $a),
                  (K.endsWith = function (n, t, r) {
                    (n = so(n)), (t = Be(t));
                    var e = n.length,
                      u = (r = r === X ? e : pr(fo(r), 0, e));
                    return (r -= t.length) >= 0 && n.slice(r, u) == t;
                  }),
                  (K.eq = Ki),
                  (K.escape = function (n) {
                    return (n = so(n)) && wt.test(n) ? n.replace(dt, Fr) : n;
                  }),
                  (K.escapeRegExp = function (n) {
                    return (n = so(n)) && zt.test(n) ? n.replace(Rt, '\\$&') : n;
                  }),
                  (K.every = function (n, t, r) {
                    var e = Zc(n) ? o : kr;
                    return r && ui(n, t, r) && (t = X), e(n, qu(t, 3));
                  }),
                  (K.find = Oc),
                  (K.findIndex = ki),
                  (K.findKey = function (n, t) {
                    return y(n, qu(t, 3), Lr);
                  }),
                  (K.findLast = Ic),
                  (K.findLastIndex = Oi),
                  (K.findLastKey = function (n, t) {
                    return y(n, qu(t, 3), Dr);
                  }),
                  (K.floor = Da),
                  (K.forEach = Bi),
                  (K.forEachRight = Ti),
                  (K.forIn = function (n, t) {
                    return null == n ? n : Zf(n, qu(t, 3), vo);
                  }),
                  (K.forInRight = function (n, t) {
                    return null == n ? n : Kf(n, qu(t, 3), vo);
                  }),
                  (K.forOwn = function (n, t) {
                    return n && Lr(n, qu(t, 3));
                  }),
                  (K.forOwnRight = function (n, t) {
                    return n && Dr(n, qu(t, 3));
                  }),
                  (K.get = ho),
                  (K.gt = Nc),
                  (K.gte = Pc),
                  (K.has = function (n, t) {
                    return null != n && Yu(n, t, Hr);
                  }),
                  (K.hasIn = po),
                  (K.head = Ri),
                  (K.identity = jo),
                  (K.includes = function (n, t, r, e) {
                    (n = Vi(n) ? n : yo(n)), (r = r && !e ? fo(r) : 0);
                    var u = n.length;
                    return r < 0 && (r = wf(u + r, 0)), eo(n) ? r <= u && n.indexOf(t, r) > -1 : !!u && b(n, t, r) > -1;
                  }),
                  (K.indexOf = function (n, t, r) {
                    var e = null == n ? 0 : n.length;
                    if (!e) return -1;
                    var u = null == r ? 0 : fo(r);
                    return u < 0 && (u = wf(e + u, 0)), b(n, t, u);
                  }),
                  (K.inRange = function (n, t, r) {
                    return (t = oo(t)), r === X ? ((r = t), (t = 0)) : (r = oo(r)), (n = ao(n)), Yr(n, t, r);
                  }),
                  (K.invoke = la),
                  (K.isArguments = qc),
                  (K.isArray = Zc),
                  (K.isArrayBuffer = Kc),
                  (K.isArrayLike = Vi),
                  (K.isArrayLikeObject = Gi),
                  (K.isBoolean = function (n) {
                    return !0 === n || !1 === n || (no(n) && Vr(n) == Dn);
                  }),
                  (K.isBuffer = Vc),
                  (K.isDate = Gc),
                  (K.isElement = function (n) {
                    return no(n) && 1 === n.nodeType && !ro(n);
                  }),
                  (K.isEmpty = function (n) {
                    if (null == n) return !0;
                    if (Vi(n) && (Zc(n) || 'string' == typeof n || 'function' == typeof n.splice || Vc(n) || Qc(n) || qc(n))) return !n.length;
                    var t = tc(n);
                    if (t == Zn || t == Yn) return !n.size;
                    if (ai(n)) return !fe(n).length;
                    for (var r in n) if (qo.call(n, r)) return !1;
                    return !0;
                  }),
                  (K.isEqual = function (n, t) {
                    return re(n, t);
                  }),
                  (K.isEqualWith = function (n, t, r) {
                    var e = (r = 'function' == typeof r ? r : X) ? r(n, t) : X;
                    return e === X ? re(n, t, X, r) : !!e;
                  }),
                  (K.isError = Hi),
                  (K.isFinite = function (n) {
                    return 'number' == typeof n && yf(n);
                  }),
                  (K.isFunction = Ji),
                  (K.isInteger = Yi),
                  (K.isLength = Qi),
                  (K.isMap = Hc),
                  (K.isMatch = function (n, t) {
                    return n === t || ue(n, t, Ku(t));
                  }),
                  (K.isMatchWith = function (n, t, r) {
                    return (r = 'function' == typeof r ? r : X), ue(n, t, Ku(t), r);
                  }),
                  (K.isNaN = function (n) {
                    return to(n) && n != +n;
                  }),
                  (K.isNative = function (n) {
                    if (rc(n)) throw new Lo(tn);
                    return ie(n);
                  }),
                  (K.isNil = function (n) {
                    return null == n;
                  }),
                  (K.isNull = function (n) {
                    return null === n;
                  }),
                  (K.isNumber = to),
                  (K.isObject = Xi),
                  (K.isObjectLike = no),
                  (K.isPlainObject = ro),
                  (K.isRegExp = Jc),
                  (K.isSafeInteger = function (n) {
                    return Yi(n) && n >= -zn && n <= zn;
                  }),
                  (K.isSet = Yc),
                  (K.isString = eo),
                  (K.isSymbol = uo),
                  (K.isTypedArray = Qc),
                  (K.isUndefined = function (n) {
                    return n === X;
                  }),
                  (K.isWeakMap = function (n) {
                    return no(n) && tc(n) == tt;
                  }),
                  (K.isWeakSet = function (n) {
                    return no(n) && Vr(n) == rt;
                  }),
                  (K.join = function (n, t) {
                    return null == n ? '' : df.call(n, t);
                  }),
                  (K.kebabCase = da),
                  (K.last = zi),
                  (K.lastIndexOf = function (n, t, r) {
                    var e = null == n ? 0 : n.length;
                    if (!e) return -1;
                    var u = e;
                    return r !== X && (u = (u = fo(r)) < 0 ? wf(e + u, 0) : mf(u, e - 1)), t === t ? V(n, t, u) : d(n, m, u, !0);
                  }),
                  (K.lowerCase = ba),
                  (K.lowerFirst = wa),
                  (K.lt = Xc),
                  (K.lte = na),
                  (K.max = function (n) {
                    return n && n.length ? Or(n, jo, Gr) : X;
                  }),
                  (K.maxBy = function (n, t) {
                    return n && n.length ? Or(n, qu(t, 2), Gr) : X;
                  }),
                  (K.mean = function (n) {
                    return x(n, jo);
                  }),
                  (K.meanBy = function (n, t) {
                    return x(n, qu(t, 2));
                  }),
                  (K.min = function (n) {
                    return n && n.length ? Or(n, jo, ae) : X;
                  }),
                  (K.minBy = function (n, t) {
                    return n && n.length ? Or(n, qu(t, 2), ae) : X;
                  }),
                  (K.stubArray = Ro),
                  (K.stubFalse = zo),
                  (K.stubObject = function () {
                    return {};
                  }),
                  (K.stubString = function () {
                    return '';
                  }),
                  (K.stubTrue = function () {
                    return !0;
                  }),
                  (K.multiply = Ma),
                  (K.nth = function (n, t) {
                    return n && n.length ? ve(n, fo(t)) : X;
                  }),
                  (K.noConflict = function () {
                    return Ir._ === this && (Ir._ = Ho), this;
                  }),
                  (K.noop = Oo),
                  (K.now = Wc),
                  (K.pad = function (n, t, r) {
                    n = so(n);
                    var e = (t = fo(t)) ? G(n) : 0;
                    if (!t || e >= t) return n;
                    var u = (t - e) / 2;
                    return ku(_f(u), r) + n + ku(pf(u), r);
                  }),
                  (K.padEnd = function (n, t, r) {
                    n = so(n);
                    var e = (t = fo(t)) ? G(n) : 0;
                    return t && e < t ? n + ku(t - e, r) : n;
                  }),
                  (K.padStart = function (n, t, r) {
                    n = so(n);
                    var e = (t = fo(t)) ? G(n) : 0;
                    return t && e < t ? ku(t - e, r) + n : n;
                  }),
                  (K.parseInt = function (n, t, r) {
                    return r || null == t ? (t = 0) : t && (t = +t), jf(so(n).replace(St, ''), t || 0);
                  }),
                  (K.random = function (n, t, r) {
                    if (
                      (r && 'boolean' != typeof r && ui(n, t, r) && (t = r = X),
                      r === X && ('boolean' == typeof t ? ((r = t), (t = X)) : 'boolean' == typeof n && ((r = n), (n = X))),
                      n === X && t === X ? ((n = 0), (t = 1)) : ((n = oo(n)), t === X ? ((t = n), (n = 0)) : (t = oo(t))),
                      n > t)
                    ) {
                      var e = n;
                      (n = t), (t = e);
                    }
                    if (r || n % 1 || t % 1) {
                      var u = Af();
                      return mf(n + u * (t - n + jr('1e-' + ((u + '').length - 1))), t);
                    }
                    return xe(n, t);
                  }),
                  (K.reduce = function (n, t, r) {
                    var e = Zc(n) ? h : k,
                      u = arguments.length < 3;
                    return e(n, qu(t, 4), r, u, Pf);
                  }),
                  (K.reduceRight = function (n, t, r) {
                    var e = Zc(n) ? p : k,
                      u = arguments.length < 3;
                    return e(n, qu(t, 4), r, u, qf);
                  }),
                  (K.repeat = function (n, t, r) {
                    return (t = (r ? ui(n, t, r) : t === X) ? 1 : fo(t)), Ae(so(n), t);
                  }),
                  (K.replace = function () {
                    var n = arguments,
                      t = so(n[0]);
                    return n.length < 3 ? t : t.replace(n[1], n[2]);
                  }),
                  (K.result = function (n, t, r) {
                    var e = -1,
                      u = (t = Ke(t, n)).length;
                    for (u || ((u = 1), (n = X)); ++e < u; ) {
                      var i = null == n ? X : n[mi(t[e])];
                      i === X && ((e = u), (i = r)), (n = Ji(i) ? i.call(n) : i);
                    }
                    return n;
                  }),
                  (K.round = Fa),
                  (K.runInContext = v),
                  (K.sample = function (n) {
                    return (Zc(n) ? nr : Oe)(n);
                  }),
                  (K.size = function (n) {
                    if (null == n) return 0;
                    if (Vi(n)) return eo(n) ? G(n) : n.length;
                    var t = tc(n);
                    return t == Zn || t == Yn ? n.size : fe(n).length;
                  }),
                  (K.snakeCase = ma),
                  (K.some = function (n, t, r) {
                    var e = Zc(n) ? _ : Se;
                    return r && ui(n, t, r) && (t = X), e(n, qu(t, 3));
                  }),
                  (K.sortedIndex = function (n, t) {
                    return Le(n, t);
                  }),
                  (K.sortedIndexBy = function (n, t, r) {
                    return We(n, t, qu(r, 2));
                  }),
                  (K.sortedIndexOf = function (n, t) {
                    var r = null == n ? 0 : n.length;
                    if (r) {
                      var e = Le(n, t);
                      if (e < r && Ki(n[e], t)) return e;
                    }
                    return -1;
                  }),
                  (K.sortedLastIndex = function (n, t) {
                    return Le(n, t, !0);
                  }),
                  (K.sortedLastIndexBy = function (n, t, r) {
                    return We(n, t, qu(r, 2), !0);
                  }),
                  (K.sortedLastIndexOf = function (n, t) {
                    if (null == n ? 0 : n.length) {
                      var r = Le(n, t, !0) - 1;
                      if (Ki(n[r], t)) return r;
                    }
                    return -1;
                  }),
                  (K.startCase = xa),
                  (K.startsWith = function (n, t, r) {
                    return (n = so(n)), (r = null == r ? 0 : pr(fo(r), 0, n.length)), (t = Be(t)), n.slice(r, r + t.length) == t;
                  }),
                  (K.subtract = Na),
                  (K.sum = function (n) {
                    return n && n.length ? I(n, jo) : 0;
                  }),
                  (K.sumBy = function (n, t) {
                    return n && n.length ? I(n, qu(t, 2)) : 0;
                  }),
                  (K.template = function (n, t, r) {
                    var e = K.templateSettings;
                    r && ui(n, t, r) && (t = X), (n = so(n)), (t = ea({}, t, e, Wu));
                    var u,
                      i,
                      o = ea({}, t.imports, e.imports, Wu),
                      f = _o(o),
                      c = S(o, f),
                      a = 0,
                      l = t.interpolate || Kt,
                      s = "__p += '",
                      h = Bo(
                        (t.escape || Kt).source + '|' + l.source + '|' + (l === jt ? $t : Kt).source + '|' + (t.evaluate || Kt).source + '|$',
                        'g',
                      ),
                      p = '//# sourceURL=' + ('sourceURL' in t ? t.sourceURL : 'lodash.templateSources[' + ++gr + ']') + '\n';
                    n.replace(h, function (t, r, e, o, f, c) {
                      return (
                        e || (e = o),
                        (s += n.slice(a, c).replace(Vt, B)),
                        r && ((u = !0), (s += "' +\n__e(" + r + ") +\n'")),
                        f && ((i = !0), (s += "';\n" + f + ";\n__p += '")),
                        e && (s += "' +\n((__t = (" + e + ")) == null ? '' : __t) +\n'"),
                        (a = c + t.length),
                        t
                      );
                    }),
                      (s += "';\n");
                    var _ = t.variable;
                    _ || (s = 'with (obj) {\n' + s + '\n}\n'),
                      (s = (i ? s.replace(_t, '') : s).replace(vt, '$1').replace(gt, '$1;')),
                      (s =
                        'function(' +
                        (_ || 'obj') +
                        ') {\n' +
                        (_ ? '' : 'obj || (obj = {});\n') +
                        "var __t, __p = ''" +
                        (u ? ', __e = _.escape' : '') +
                        (i ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n" : ';\n') +
                        s +
                        'return __p\n}');
                    var v = ka(function () {
                      return Wo(f, p + 'return ' + s).apply(X, c);
                    });
                    if (((v.source = s), Hi(v))) throw v;
                    return v;
                  }),
                  (K.times = function (n, t) {
                    if ((n = fo(n)) < 1 || n > zn) return [];
                    var r = Ln,
                      e = mf(n, Ln);
                    (t = qu(t)), (n -= Ln);
                    for (var u = R(e, t); ++r < n; ) t(r);
                    return u;
                  }),
                  (K.toFinite = oo),
                  (K.toInteger = fo),
                  (K.toLength = co),
                  (K.toLower = function (n) {
                    return so(n).toLowerCase();
                  }),
                  (K.toNumber = ao),
                  (K.toSafeInteger = function (n) {
                    return n ? pr(fo(n), -zn, zn) : 0 === n ? n : 0;
                  }),
                  (K.toString = so),
                  (K.toUpper = function (n) {
                    return so(n).toUpperCase();
                  }),
                  (K.trim = function (n, t, r) {
                    if ((n = so(n)) && (r || t === X)) return n.replace(Et, '');
                    if (!n || !(t = Be(t))) return n;
                    var e = H(n),
                      u = H(t);
                    return Ve(e, W(e, u), C(e, u) + 1).join('');
                  }),
                  (K.trimEnd = function (n, t, r) {
                    if ((n = so(n)) && (r || t === X)) return n.replace(Lt, '');
                    if (!n || !(t = Be(t))) return n;
                    var e = H(n);
                    return Ve(e, 0, C(e, H(t)) + 1).join('');
                  }),
                  (K.trimStart = function (n, t, r) {
                    if ((n = so(n)) && (r || t === X)) return n.replace(St, '');
                    if (!n || !(t = Be(t))) return n;
                    var e = H(n);
                    return Ve(e, W(e, H(t))).join('');
                  }),
                  (K.truncate = function (n, t) {
                    var r = xn,
                      e = jn;
                    if (Xi(t)) {
                      var u = 'separator' in t ? t.separator : u;
                      (r = 'length' in t ? fo(t.length) : r), (e = 'omission' in t ? Be(t.omission) : e);
                    }
                    var i = (n = so(n)).length;
                    if ($(n)) {
                      var o = H(n);
                      i = o.length;
                    }
                    if (r >= i) return n;
                    var f = r - G(e);
                    if (f < 1) return e;
                    var c = o ? Ve(o, 0, f).join('') : n.slice(0, f);
                    if (u === X) return c + e;
                    if ((o && (f += c.length - f), Jc(u))) {
                      if (n.slice(f).search(u)) {
                        var a,
                          l = c;
                        for (u.global || (u = Bo(u.source, so(Dt.exec(u)) + 'g')), u.lastIndex = 0; (a = u.exec(l)); ) var s = a.index;
                        c = c.slice(0, s === X ? f : s);
                      }
                    } else if (n.indexOf(Be(u), f) != f) {
                      var h = c.lastIndexOf(u);
                      h > -1 && (c = c.slice(0, h));
                    }
                    return c + e;
                  }),
                  (K.unescape = function (n) {
                    return (n = so(n)) && bt.test(n) ? n.replace(yt, Nr) : n;
                  }),
                  (K.uniqueId = function (n) {
                    var t = ++Zo;
                    return so(n) + t;
                  }),
                  (K.upperCase = ja),
                  (K.upperFirst = Aa),
                  (K.each = Bi),
                  (K.eachRight = Ti),
                  (K.first = Ri),
                  ko(
                    K,
                    (function () {
                      var n = {};
                      return (
                        Lr(K, function (t, r) {
                          qo.call(K.prototype, r) || (n[r] = t);
                        }),
                        n
                      );
                    })(),
                    { chain: !1 },
                  ),
                  (K.VERSION = '4.17.4'),
                  u(['bind', 'bindKey', 'curry', 'curryRight', 'partial', 'partialRight'], function (n) {
                    K[n].placeholder = K;
                  }),
                  u(['drop', 'take'], function (n, t) {
                    (Bt.prototype[n] = function (r) {
                      r = r === X ? 1 : wf(fo(r), 0);
                      var e = this.__filtered__ && !t ? new Bt(this) : this.clone();
                      return (
                        e.__filtered__
                          ? (e.__takeCount__ = mf(r, e.__takeCount__))
                          : e.__views__.push({ size: mf(r, Ln), type: n + (e.__dir__ < 0 ? 'Right' : '') }),
                        e
                      );
                    }),
                      (Bt.prototype[n + 'Right'] = function (t) {
                        return this.reverse()[n](t).reverse();
                      });
                  }),
                  u(['filter', 'map', 'takeWhile'], function (n, t) {
                    var r = t + 1,
                      e = r == On || 3 == r;
                    Bt.prototype[n] = function (n) {
                      var t = this.clone();
                      return t.__iteratees__.push({ iteratee: qu(n, 3), type: r }), (t.__filtered__ = t.__filtered__ || e), t;
                    };
                  }),
                  u(['head', 'last'], function (n, t) {
                    var r = 'take' + (t ? 'Right' : '');
                    Bt.prototype[n] = function () {
                      return this[r](1).value()[0];
                    };
                  }),
                  u(['initial', 'tail'], function (n, t) {
                    var r = 'drop' + (t ? '' : 'Right');
                    Bt.prototype[n] = function () {
                      return this.__filtered__ ? new Bt(this) : this[r](1);
                    };
                  }),
                  (Bt.prototype.compact = function () {
                    return this.filter(jo);
                  }),
                  (Bt.prototype.find = function (n) {
                    return this.filter(n).head();
                  }),
                  (Bt.prototype.findLast = function (n) {
                    return this.reverse().find(n);
                  }),
                  (Bt.prototype.invokeMap = ke(function (n, t) {
                    return 'function' == typeof n
                      ? new Bt(this)
                      : this.map(function (r) {
                          return ne(r, n, t);
                        });
                  })),
                  (Bt.prototype.reject = function (n) {
                    return this.filter(Zi(qu(n)));
                  }),
                  (Bt.prototype.slice = function (n, t) {
                    n = fo(n);
                    var r = this;
                    return r.__filtered__ && (n > 0 || t < 0)
                      ? new Bt(r)
                      : (n < 0 ? (r = r.takeRight(-n)) : n && (r = r.drop(n)), t !== X && (r = (t = fo(t)) < 0 ? r.dropRight(-t) : r.take(t - n)), r);
                  }),
                  (Bt.prototype.takeRightWhile = function (n) {
                    return this.reverse().takeWhile(n).reverse();
                  }),
                  (Bt.prototype.toArray = function () {
                    return this.take(Ln);
                  }),
                  Lr(Bt.prototype, function (n, t) {
                    var r = /^(?:filter|find|map|reject)|While$/.test(t),
                      e = /^(?:head|last)$/.test(t),
                      u = K[e ? 'take' + ('last' == t ? 'Right' : '') : t],
                      i = e || /^find/.test(t);
                    u &&
                      (K.prototype[t] = function () {
                        var t = this.__wrapped__,
                          o = e ? [1] : arguments,
                          f = t instanceof Bt,
                          c = o[0],
                          a = f || Zc(t),
                          l = function (n) {
                            var t = u.apply(K, s([n], o));
                            return e && h ? t[0] : t;
                          };
                        a && r && 'function' == typeof c && 1 != c.length && (f = a = !1);
                        var h = this.__chain__,
                          p = !!this.__actions__.length,
                          _ = i && !h,
                          v = f && !p;
                        if (!i && a) {
                          t = v ? t : new Bt(this);
                          var g = n.apply(t, o);
                          return g.__actions__.push({ func: Ui, args: [l], thisArg: X }), new Y(g, h);
                        }
                        return _ && v ? n.apply(this, o) : ((g = this.thru(l)), _ ? (e ? g.value()[0] : g.value()) : g);
                      });
                  }),
                  u(['pop', 'push', 'shift', 'sort', 'splice', 'unshift'], function (n) {
                    var t = Do[n],
                      r = /^(?:push|sort|unshift)$/.test(n) ? 'tap' : 'thru',
                      e = /^(?:pop|shift)$/.test(n);
                    K.prototype[n] = function () {
                      var n = arguments;
                      if (e && !this.__chain__) {
                        var u = this.value();
                        return t.apply(Zc(u) ? u : [], n);
                      }
                      return this[r](function (r) {
                        return t.apply(Zc(r) ? r : [], n);
                      });
                    };
                  }),
                  Lr(Bt.prototype, function (n, t) {
                    var r = K[t];
                    if (r) {
                      var e = r.name + '';
                      (Wf[e] || (Wf[e] = [])).push({ name: t, func: r });
                    }
                  }),
                  (Wf[mu(X, pn).name] = [{ name: 'wrapper', func: X }]),
                  (Bt.prototype.clone = function () {
                    var n = new Bt(this.__wrapped__);
                    return (
                      (n.__actions__ = ou(this.__actions__)),
                      (n.__dir__ = this.__dir__),
                      (n.__filtered__ = this.__filtered__),
                      (n.__iteratees__ = ou(this.__iteratees__)),
                      (n.__takeCount__ = this.__takeCount__),
                      (n.__views__ = ou(this.__views__)),
                      n
                    );
                  }),
                  (Bt.prototype.reverse = function () {
                    if (this.__filtered__) {
                      var n = new Bt(this);
                      (n.__dir__ = -1), (n.__filtered__ = !0);
                    } else (n = this.clone()).__dir__ *= -1;
                    return n;
                  }),
                  (Bt.prototype.value = function () {
                    var n = this.__wrapped__.value(),
                      t = this.__dir__,
                      r = Zc(n),
                      e = t < 0,
                      u = r ? n.length : 0,
                      i = Hu(0, u, this.__views__),
                      o = i.start,
                      f = i.end,
                      c = f - o,
                      a = e ? f : o - 1,
                      l = this.__iteratees__,
                      s = l.length,
                      h = 0,
                      p = mf(c, this.__takeCount__);
                    if (!r || (!e && u == c && p == c)) return Fe(n, this.__actions__);
                    var _ = [];
                    n: for (; c-- && h < p; ) {
                      for (var v = -1, g = n[(a += t)]; ++v < s; ) {
                        var y = l[v],
                          d = y.iteratee,
                          b = y.type,
                          w = d(g);
                        if (b == In) g = w;
                        else if (!w) {
                          if (b == On) continue n;
                          break n;
                        }
                      }
                      _[h++] = g;
                    }
                    return _;
                  }),
                  (K.prototype.at = Ac),
                  (K.prototype.chain = function () {
                    return Ci(this);
                  }),
                  (K.prototype.commit = function () {
                    return new Y(this.value(), this.__chain__);
                  }),
                  (K.prototype.next = function () {
                    this.__values__ === X && (this.__values__ = io(this.value()));
                    var n = this.__index__ >= this.__values__.length;
                    return { done: n, value: n ? X : this.__values__[this.__index__++] };
                  }),
                  (K.prototype.plant = function (n) {
                    for (var t, r = this; r instanceof J; ) {
                      var e = Ai(r);
                      (e.__index__ = 0), (e.__values__ = X), t ? (u.__wrapped__ = e) : (t = e);
                      var u = e;
                      r = r.__wrapped__;
                    }
                    return (u.__wrapped__ = n), t;
                  }),
                  (K.prototype.reverse = function () {
                    var n = this.__wrapped__;
                    if (n instanceof Bt) {
                      var t = n;
                      return (
                        this.__actions__.length && (t = new Bt(this)),
                        (t = t.reverse()).__actions__.push({ func: Ui, args: [Si], thisArg: X }),
                        new Y(t, this.__chain__)
                      );
                    }
                    return this.thru(Si);
                  }),
                  (K.prototype.toJSON = K.prototype.valueOf = K.prototype.value = function () {
                    return Fe(this.__wrapped__, this.__actions__);
                  }),
                  (K.prototype.first = K.prototype.head),
                  ff &&
                    (K.prototype[ff] = function () {
                      return this;
                    }),
                  K
                );
              })();
            'function' == typeof define && 'object' == typeof define.amd && define.amd
              ? ((Ir._ = Pr),
                define(function () {
                  return Pr;
                }))
              : zr
              ? (((zr.exports = Pr)._ = Pr), (Rr._ = Pr))
              : (Ir._ = Pr);
          }.call(this));
        }.call(this, typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : {}));
      },
      {},
    ],
    5: [
      function (require, module, exports) {
        'use strict';
        function __extends(e, t) {
          function n() {
            this.constructor = e;
          }
          extendStatics(e, t), (e.prototype = null === t ? Object.create(t) : ((n.prototype = t.prototype), new n()));
        }
        var extendStatics = function (e, t) {
            return (extendStatics =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (e, t) {
                  e.__proto__ = t;
                }) ||
              function (e, t) {
                for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
              })(e, t);
          },
          Event = (function () {
            return function (e, t) {
              (this.target = t), (this.type = e);
            };
          })(),
          ErrorEvent = (function (e) {
            function t(t, n) {
              var o = e.call(this, 'error', n) || this;
              return (o.message = t.message), (o.error = t), o;
            }
            return __extends(t, e), t;
          })(Event),
          CloseEvent = (function (e) {
            function t(t, n, o) {
              void 0 === t && (t = 1e3), void 0 === n && (n = '');
              var r = e.call(this, 'close', o) || this;
              return (r.wasClean = !0), (r.code = t), (r.reason = n), r;
            }
            return __extends(t, e), t;
          })(Event),
          getGlobalWebSocket = function () {
            if ('undefined' != typeof WebSocket) return WebSocket;
          },
          isWebSocket = function (e) {
            return 'function' == typeof e && 2 === e.CLOSING;
          },
          DEFAULT = {
            maxReconnectionDelay: 1e4,
            minReconnectionDelay: 1e3 + 4e3 * Math.random(),
            minUptime: 5e3,
            reconnectionDelayGrowFactor: 1.3,
            connectionTimeout: 4e3,
            maxRetries: 1 / 0,
            debug: !1,
          },
          ReconnectingWebSocket = (function () {
            function e(e, t, n) {
              void 0 === n && (n = {});
              var o = this;
              (this._listeners = { error: [], message: [], open: [], close: [] }),
                (this._retryCount = -1),
                (this._shouldReconnect = !0),
                (this._connectLock = !1),
                (this._binaryType = 'blob'),
                (this._closeCalled = !1),
                (this._messageQueue = []),
                (this.onclose = void 0),
                (this.onerror = void 0),
                (this.onmessage = void 0),
                (this.onopen = void 0),
                (this._handleOpen = function (e) {
                  o._debug('open event');
                  var t = o._options.minUptime,
                    n = void 0 === t ? DEFAULT.minUptime : t;
                  clearTimeout(o._connectTimeout),
                    (o._uptimeTimeout = setTimeout(function () {
                      return o._acceptOpen();
                    }, n)),
                    (o._ws.binaryType = o._binaryType),
                    o._messageQueue.forEach(function (e) {
                      return o._ws.send(e);
                    }),
                    (o._messageQueue = []),
                    o.onopen && o.onopen(e),
                    o._listeners.open.forEach(function (t) {
                      return o._callEventListener(e, t);
                    });
                }),
                (this._handleMessage = function (e) {
                  o._debug('message event'),
                    o.onmessage && o.onmessage(e),
                    o._listeners.message.forEach(function (t) {
                      return o._callEventListener(e, t);
                    });
                }),
                (this._handleError = function (e) {
                  o._debug('error event', e.message),
                    o._disconnect(void 0, 'TIMEOUT' === e.message ? 'timeout' : void 0),
                    o.onerror && o.onerror(e),
                    o._debug('exec error listeners'),
                    o._listeners.error.forEach(function (t) {
                      return o._callEventListener(e, t);
                    }),
                    o._connect();
                }),
                (this._handleClose = function (e) {
                  o._debug('close event'),
                    o._clearTimeouts(),
                    o._shouldReconnect && o._connect(),
                    o.onclose && o.onclose(e),
                    o._listeners.close.forEach(function (t) {
                      return o._callEventListener(e, t);
                    });
                }),
                (this._url = e),
                (this._protocols = t),
                (this._options = n),
                this._connect();
            }
            return (
              Object.defineProperty(e, 'CONNECTING', {
                get: function () {
                  return 0;
                },
                enumerable: !0,
                configurable: !0,
              }),
              Object.defineProperty(e, 'OPEN', {
                get: function () {
                  return 1;
                },
                enumerable: !0,
                configurable: !0,
              }),
              Object.defineProperty(e, 'CLOSING', {
                get: function () {
                  return 2;
                },
                enumerable: !0,
                configurable: !0,
              }),
              Object.defineProperty(e, 'CLOSED', {
                get: function () {
                  return 3;
                },
                enumerable: !0,
                configurable: !0,
              }),
              Object.defineProperty(e.prototype, 'CONNECTING', {
                get: function () {
                  return e.CONNECTING;
                },
                enumerable: !0,
                configurable: !0,
              }),
              Object.defineProperty(e.prototype, 'OPEN', {
                get: function () {
                  return e.OPEN;
                },
                enumerable: !0,
                configurable: !0,
              }),
              Object.defineProperty(e.prototype, 'CLOSING', {
                get: function () {
                  return e.CLOSING;
                },
                enumerable: !0,
                configurable: !0,
              }),
              Object.defineProperty(e.prototype, 'CLOSED', {
                get: function () {
                  return e.CLOSED;
                },
                enumerable: !0,
                configurable: !0,
              }),
              Object.defineProperty(e.prototype, 'binaryType', {
                get: function () {
                  return this._ws ? this._ws.binaryType : this._binaryType;
                },
                set: function (e) {
                  (this._binaryType = e), this._ws && (this._ws.binaryType = e);
                },
                enumerable: !0,
                configurable: !0,
              }),
              Object.defineProperty(e.prototype, 'retryCount', {
                get: function () {
                  return Math.max(this._retryCount, 0);
                },
                enumerable: !0,
                configurable: !0,
              }),
              Object.defineProperty(e.prototype, 'bufferedAmount', {
                get: function () {
                  return (
                    this._messageQueue.reduce(function (e, t) {
                      return 'string' == typeof t ? (e += t.length) : t instanceof Blob ? (e += t.size) : (e += t.byteLength), e;
                    }, 0) + (this._ws ? this._ws.bufferedAmount : 0)
                  );
                },
                enumerable: !0,
                configurable: !0,
              }),
              Object.defineProperty(e.prototype, 'extensions', {
                get: function () {
                  return this._ws ? this._ws.extensions : '';
                },
                enumerable: !0,
                configurable: !0,
              }),
              Object.defineProperty(e.prototype, 'protocol', {
                get: function () {
                  return this._ws ? this._ws.protocol : '';
                },
                enumerable: !0,
                configurable: !0,
              }),
              Object.defineProperty(e.prototype, 'readyState', {
                get: function () {
                  return this._ws ? this._ws.readyState : e.CONNECTING;
                },
                enumerable: !0,
                configurable: !0,
              }),
              Object.defineProperty(e.prototype, 'url', {
                get: function () {
                  return this._ws ? this._ws.url : '';
                },
                enumerable: !0,
                configurable: !0,
              }),
              (e.prototype.close = function (e, t) {
                void 0 === e && (e = 1e3),
                  (this._closeCalled = !0),
                  (this._shouldReconnect = !1),
                  this._clearTimeouts(),
                  this._ws
                    ? this._ws.readyState !== this.CLOSED
                      ? this._ws.close(e, t)
                      : this._debug('close: already closed')
                    : this._debug('close enqueued: no ws instance');
              }),
              (e.prototype.reconnect = function (e, t) {
                (this._shouldReconnect = !0),
                  (this._closeCalled = !1),
                  (this._retryCount = -1),
                  this._ws && this._ws.readyState !== this.CLOSED ? (this._disconnect(e, t), this._connect()) : this._connect();
              }),
              (e.prototype.send = function (e) {
                this._ws && this._ws.readyState === this.OPEN
                  ? (this._debug('send', e), this._ws.send(e))
                  : (this._debug('enqueue', e), this._messageQueue.push(e));
              }),
              (e.prototype.addEventListener = function (e, t) {
                this._listeners[e] && this._listeners[e].push(t);
              }),
              (e.prototype.removeEventListener = function (e, t) {
                this._listeners[e] &&
                  (this._listeners[e] = this._listeners[e].filter(function (e) {
                    return e !== t;
                  }));
              }),
              (e.prototype._debug = function () {
                for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                this._options.debug && console.log.apply(console, ['RWS>'].concat(e));
              }),
              (e.prototype._getNextDelay = function () {
                var e = this._options,
                  t = e.reconnectionDelayGrowFactor,
                  n = void 0 === t ? DEFAULT.reconnectionDelayGrowFactor : t,
                  o = e.minReconnectionDelay,
                  r = void 0 === o ? DEFAULT.minReconnectionDelay : o,
                  i = e.maxReconnectionDelay,
                  s = void 0 === i ? DEFAULT.maxReconnectionDelay : i,
                  c = r;
                return this._retryCount > 0 && (c = r * Math.pow(n, this._retryCount - 1)) > s && (c = s), this._debug('next delay', c), c;
              }),
              (e.prototype._wait = function () {
                var e = this;
                return new Promise(function (t) {
                  setTimeout(t, e._getNextDelay());
                });
              }),
              (e.prototype._getNextUrl = function (e) {
                if ('string' == typeof e) return Promise.resolve(e);
                if ('function' == typeof e) {
                  var t = e();
                  if ('string' == typeof t) return Promise.resolve(t);
                  if (t.then) return t;
                }
                throw Error('Invalid URL');
              }),
              (e.prototype._connect = function () {
                var e = this;
                if (!this._connectLock && this._shouldReconnect) {
                  this._connectLock = !0;
                  var t = this._options,
                    n = t.maxRetries,
                    o = void 0 === n ? DEFAULT.maxRetries : n,
                    r = t.connectionTimeout,
                    i = void 0 === r ? DEFAULT.connectionTimeout : r,
                    s = t.WebSocket,
                    c = void 0 === s ? getGlobalWebSocket() : s;
                  if (this._retryCount >= o) this._debug('max retries reached', this._retryCount, '>=', o);
                  else {
                    if ((this._retryCount++, this._debug('connect', this._retryCount), this._removeListeners(), !isWebSocket(c)))
                      throw Error('No valid WebSocket class provided');
                    this._wait()
                      .then(function () {
                        return e._getNextUrl(e._url);
                      })
                      .then(function (t) {
                        e._closeCalled
                          ? (e._connectLock = !1)
                          : (e._debug('connect', { url: t, protocols: e._protocols }),
                            (e._ws = e._protocols ? new c(t, e._protocols) : new c(t)),
                            (e._ws.binaryType = e._binaryType),
                            (e._connectLock = !1),
                            e._addListeners(),
                            (e._connectTimeout = setTimeout(function () {
                              return e._handleTimeout();
                            }, i)));
                      });
                  }
                }
              }),
              (e.prototype._handleTimeout = function () {
                this._debug('timeout event'), this._handleError(new ErrorEvent(Error('TIMEOUT'), this));
              }),
              (e.prototype._disconnect = function (e, t) {
                if ((void 0 === e && (e = 1e3), this._clearTimeouts(), this._ws)) {
                  this._removeListeners();
                  try {
                    this._ws.close(e, t), this._handleClose(new CloseEvent(e, t, this));
                  } catch (e) {}
                }
              }),
              (e.prototype._acceptOpen = function () {
                this._debug('accept open'), (this._retryCount = 0);
              }),
              (e.prototype._callEventListener = function (e, t) {
                'handleEvent' in t ? t.handleEvent(e) : t(e);
              }),
              (e.prototype._removeListeners = function () {
                this._ws &&
                  (this._debug('removeListeners'),
                  this._ws.removeEventListener('open', this._handleOpen),
                  this._ws.removeEventListener('close', this._handleClose),
                  this._ws.removeEventListener('message', this._handleMessage),
                  this._ws.removeEventListener('error', this._handleError));
              }),
              (e.prototype._addListeners = function () {
                this._ws &&
                  (this._debug('addListeners'),
                  this._ws.addEventListener('open', this._handleOpen),
                  this._ws.addEventListener('close', this._handleClose),
                  this._ws.addEventListener('message', this._handleMessage),
                  this._ws.addEventListener('error', this._handleError));
              }),
              (e.prototype._clearTimeouts = function () {
                clearTimeout(this._connectTimeout), clearTimeout(this._uptimeTimeout);
              }),
              e
            );
          })();
        module.exports = ReconnectingWebSocket;
      },
      {},
    ],
    6: [
      function (require, module, exports) {
        (function (process) {
          function parse(r, e) {
            if (r instanceof SemVer) return r;
            if ('string' != typeof r) return null;
            if (r.length > MAX_LENGTH) return null;
            if (!(e ? re[LOOSE] : re[FULL]).test(r)) return null;
            try {
              return new SemVer(r, e);
            } catch (r) {
              return null;
            }
          }
          function valid(r, e) {
            var t = parse(r, e);
            return t ? t.version : null;
          }
          function clean(r, e) {
            var t = parse(r.trim().replace(/^[=v]+/, ''), e);
            return t ? t.version : null;
          }
          function SemVer(r, e) {
            if (r instanceof SemVer) {
              if (r.loose === e) return r;
              r = r.version;
            } else if ('string' != typeof r) throw new TypeError('Invalid Version: ' + r);
            if (r.length > MAX_LENGTH) throw new TypeError('version is longer than ' + MAX_LENGTH + ' characters');
            if (!(this instanceof SemVer)) return new SemVer(r, e);
            debug('SemVer', r, e), (this.loose = e);
            var t = r.trim().match(e ? re[LOOSE] : re[FULL]);
            if (!t) throw new TypeError('Invalid Version: ' + r);
            if (((this.raw = r), (this.major = +t[1]), (this.minor = +t[2]), (this.patch = +t[3]), this.major > MAX_SAFE_INTEGER || this.major < 0))
              throw new TypeError('Invalid major version');
            if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) throw new TypeError('Invalid minor version');
            if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) throw new TypeError('Invalid patch version');
            t[4]
              ? (this.prerelease = t[4].split('.').map(function (r) {
                  if (/^[0-9]+$/.test(r)) {
                    var e = +r;
                    if (e >= 0 && e < MAX_SAFE_INTEGER) return e;
                  }
                  return r;
                }))
              : (this.prerelease = []),
              (this.build = t[5] ? t[5].split('.') : []),
              this.format();
          }
          function inc(r, e, t, s) {
            'string' == typeof t && ((s = t), (t = void 0));
            try {
              return new SemVer(r, t).inc(e, s).version;
            } catch (r) {
              return null;
            }
          }
          function diff(r, e) {
            if (eq(r, e)) return null;
            var t = parse(r),
              s = parse(e);
            if (t.prerelease.length || s.prerelease.length) {
              for (var n in t) if (('major' === n || 'minor' === n || 'patch' === n) && t[n] !== s[n]) return 'pre' + n;
              return 'prerelease';
            }
            for (var n in t) if (('major' === n || 'minor' === n || 'patch' === n) && t[n] !== s[n]) return n;
          }
          function compareIdentifiers(r, e) {
            var t = numeric.test(r),
              s = numeric.test(e);
            return t && s && ((r = +r), (e = +e)), t && !s ? -1 : s && !t ? 1 : r < e ? -1 : r > e ? 1 : 0;
          }
          function rcompareIdentifiers(r, e) {
            return compareIdentifiers(e, r);
          }
          function major(r, e) {
            return new SemVer(r, e).major;
          }
          function minor(r, e) {
            return new SemVer(r, e).minor;
          }
          function patch(r, e) {
            return new SemVer(r, e).patch;
          }
          function compare(r, e, t) {
            return new SemVer(r, t).compare(new SemVer(e, t));
          }
          function compareLoose(r, e) {
            return compare(r, e, !0);
          }
          function rcompare(r, e, t) {
            return compare(e, r, t);
          }
          function sort(r, e) {
            return r.sort(function (r, t) {
              return exports.compare(r, t, e);
            });
          }
          function rsort(r, e) {
            return r.sort(function (r, t) {
              return exports.rcompare(r, t, e);
            });
          }
          function gt(r, e, t) {
            return compare(r, e, t) > 0;
          }
          function lt(r, e, t) {
            return compare(r, e, t) < 0;
          }
          function eq(r, e, t) {
            return 0 === compare(r, e, t);
          }
          function neq(r, e, t) {
            return 0 !== compare(r, e, t);
          }
          function gte(r, e, t) {
            return compare(r, e, t) >= 0;
          }
          function lte(r, e, t) {
            return compare(r, e, t) <= 0;
          }
          function cmp(r, e, t, s) {
            var n;
            switch (e) {
              case '===':
                'object' == typeof r && (r = r.version), 'object' == typeof t && (t = t.version), (n = r === t);
                break;
              case '!==':
                'object' == typeof r && (r = r.version), 'object' == typeof t && (t = t.version), (n = r !== t);
                break;
              case '':
              case '=':
              case '==':
                n = eq(r, t, s);
                break;
              case '!=':
                n = neq(r, t, s);
                break;
              case '>':
                n = gt(r, t, s);
                break;
              case '>=':
                n = gte(r, t, s);
                break;
              case '<':
                n = lt(r, t, s);
                break;
              case '<=':
                n = lte(r, t, s);
                break;
              default:
                throw new TypeError('Invalid operator: ' + e);
            }
            return n;
          }
          function Comparator(r, e) {
            if (r instanceof Comparator) {
              if (r.loose === e) return r;
              r = r.value;
            }
            if (!(this instanceof Comparator)) return new Comparator(r, e);
            debug('comparator', r, e),
              (this.loose = e),
              this.parse(r),
              this.semver === ANY ? (this.value = '') : (this.value = this.operator + this.semver.version),
              debug('comp', this);
          }
          function Range(r, e) {
            if (r instanceof Range) return r.loose === e ? r : new Range(r.raw, e);
            if (r instanceof Comparator) return new Range(r.value, e);
            if (!(this instanceof Range)) return new Range(r, e);
            if (
              ((this.loose = e),
              (this.raw = r),
              (this.set = r
                .split(/\s*\|\|\s*/)
                .map(function (r) {
                  return this.parseRange(r.trim());
                }, this)
                .filter(function (r) {
                  return r.length;
                })),
              !this.set.length)
            )
              throw new TypeError('Invalid SemVer Range: ' + r);
            this.format();
          }
          function toComparators(r, e) {
            return new Range(r, e).set.map(function (r) {
              return r
                .map(function (r) {
                  return r.value;
                })
                .join(' ')
                .trim()
                .split(' ');
            });
          }
          function parseComparator(r, e) {
            return (
              debug('comp', r),
              (r = replaceCarets(r, e)),
              debug('caret', r),
              (r = replaceTildes(r, e)),
              debug('tildes', r),
              (r = replaceXRanges(r, e)),
              debug('xrange', r),
              (r = replaceStars(r, e)),
              debug('stars', r),
              r
            );
          }
          function isX(r) {
            return !r || 'x' === r.toLowerCase() || '*' === r;
          }
          function replaceTildes(r, e) {
            return r
              .trim()
              .split(/\s+/)
              .map(function (r) {
                return replaceTilde(r, e);
              })
              .join(' ');
          }
          function replaceTilde(r, e) {
            var t = e ? re[TILDELOOSE] : re[TILDE];
            return r.replace(t, function (e, t, s, n, o) {
              debug('tilde', r, e, t, s, n, o);
              var a;
              return (
                isX(t)
                  ? (a = '')
                  : isX(s)
                  ? (a = '>=' + t + '.0.0 <' + (+t + 1) + '.0.0')
                  : isX(n)
                  ? (a = '>=' + t + '.' + s + '.0 <' + t + '.' + (+s + 1) + '.0')
                  : o
                  ? (debug('replaceTilde pr', o),
                    '-' !== o.charAt(0) && (o = '-' + o),
                    (a = '>=' + t + '.' + s + '.' + n + o + ' <' + t + '.' + (+s + 1) + '.0'))
                  : (a = '>=' + t + '.' + s + '.' + n + ' <' + t + '.' + (+s + 1) + '.0'),
                debug('tilde return', a),
                a
              );
            });
          }
          function replaceCarets(r, e) {
            return r
              .trim()
              .split(/\s+/)
              .map(function (r) {
                return replaceCaret(r, e);
              })
              .join(' ');
          }
          function replaceCaret(r, e) {
            debug('caret', r, e);
            var t = e ? re[CARETLOOSE] : re[CARET];
            return r.replace(t, function (e, t, s, n, o) {
              debug('caret', r, e, t, s, n, o);
              var a;
              return (
                isX(t)
                  ? (a = '')
                  : isX(s)
                  ? (a = '>=' + t + '.0.0 <' + (+t + 1) + '.0.0')
                  : isX(n)
                  ? (a = '0' === t ? '>=' + t + '.' + s + '.0 <' + t + '.' + (+s + 1) + '.0' : '>=' + t + '.' + s + '.0 <' + (+t + 1) + '.0.0')
                  : o
                  ? (debug('replaceCaret pr', o),
                    '-' !== o.charAt(0) && (o = '-' + o),
                    (a =
                      '0' === t
                        ? '0' === s
                          ? '>=' + t + '.' + s + '.' + n + o + ' <' + t + '.' + s + '.' + (+n + 1)
                          : '>=' + t + '.' + s + '.' + n + o + ' <' + t + '.' + (+s + 1) + '.0'
                        : '>=' + t + '.' + s + '.' + n + o + ' <' + (+t + 1) + '.0.0'))
                  : (debug('no pr'),
                    (a =
                      '0' === t
                        ? '0' === s
                          ? '>=' + t + '.' + s + '.' + n + ' <' + t + '.' + s + '.' + (+n + 1)
                          : '>=' + t + '.' + s + '.' + n + ' <' + t + '.' + (+s + 1) + '.0'
                        : '>=' + t + '.' + s + '.' + n + ' <' + (+t + 1) + '.0.0')),
                debug('caret return', a),
                a
              );
            });
          }
          function replaceXRanges(r, e) {
            return (
              debug('replaceXRanges', r, e),
              r
                .split(/\s+/)
                .map(function (r) {
                  return replaceXRange(r, e);
                })
                .join(' ')
            );
          }
          function replaceXRange(r, e) {
            r = r.trim();
            var t = e ? re[XRANGELOOSE] : re[XRANGE];
            return r.replace(t, function (e, t, s, n, o, a) {
              debug('xRange', r, e, t, s, n, o, a);
              var i = isX(s),
                c = i || isX(n),
                p = c || isX(o),
                E = p;
              return (
                '=' === t && E && (t = ''),
                i
                  ? (e = '>' === t || '<' === t ? '<0.0.0' : '*')
                  : t && E
                  ? (c && (n = 0),
                    p && (o = 0),
                    '>' === t
                      ? ((t = '>='), c ? ((s = +s + 1), (n = 0), (o = 0)) : p && ((n = +n + 1), (o = 0)))
                      : '<=' === t && ((t = '<'), c ? (s = +s + 1) : (n = +n + 1)),
                    (e = t + s + '.' + n + '.' + o))
                  : c
                  ? (e = '>=' + s + '.0.0 <' + (+s + 1) + '.0.0')
                  : p && (e = '>=' + s + '.' + n + '.0 <' + s + '.' + (+n + 1) + '.0'),
                debug('xRange return', e),
                e
              );
            });
          }
          function replaceStars(r, e) {
            return debug('replaceStars', r, e), r.trim().replace(re[STAR], '');
          }
          function hyphenReplace(r, e, t, s, n, o, a, i, c, p, E, R, u) {
            return (
              (e = isX(t) ? '' : isX(s) ? '>=' + t + '.0.0' : isX(n) ? '>=' + t + '.' + s + '.0' : '>=' + e),
              (i = isX(c)
                ? ''
                : isX(p)
                ? '<' + (+c + 1) + '.0.0'
                : isX(E)
                ? '<' + c + '.' + (+p + 1) + '.0'
                : R
                ? '<=' + c + '.' + p + '.' + E + '-' + R
                : '<=' + i),
              (e + ' ' + i).trim()
            );
          }
          function testSet(r, e) {
            for (t = 0; t < r.length; t++) if (!r[t].test(e)) return !1;
            if (e.prerelease.length) {
              for (var t = 0; t < r.length; t++)
                if ((debug(r[t].semver), r[t].semver !== ANY && r[t].semver.prerelease.length > 0)) {
                  var s = r[t].semver;
                  if (s.major === e.major && s.minor === e.minor && s.patch === e.patch) return !0;
                }
              return !1;
            }
            return !0;
          }
          function satisfies(r, e, t) {
            try {
              e = new Range(e, t);
            } catch (r) {
              return !1;
            }
            return e.test(r);
          }
          function maxSatisfying(r, e, t) {
            var s = null,
              n = null;
            try {
              var o = new Range(e, t);
            } catch (r) {
              return null;
            }
            return (
              r.forEach(function (r) {
                o.test(r) && ((s && -1 !== n.compare(r)) || (n = new SemVer((s = r), t)));
              }),
              s
            );
          }
          function minSatisfying(r, e, t) {
            var s = null,
              n = null;
            try {
              var o = new Range(e, t);
            } catch (r) {
              return null;
            }
            return (
              r.forEach(function (r) {
                o.test(r) && ((s && 1 !== n.compare(r)) || (n = new SemVer((s = r), t)));
              }),
              s
            );
          }
          function validRange(r, e) {
            try {
              return new Range(r, e).range || '*';
            } catch (r) {
              return null;
            }
          }
          function ltr(r, e, t) {
            return outside(r, e, '<', t);
          }
          function gtr(r, e, t) {
            return outside(r, e, '>', t);
          }
          function outside(r, e, t, s) {
            (r = new SemVer(r, s)), (e = new Range(e, s));
            var n, o, a, i, c;
            switch (t) {
              case '>':
                (n = gt), (o = lte), (a = lt), (i = '>'), (c = '>=');
                break;
              case '<':
                (n = lt), (o = gte), (a = gt), (i = '<'), (c = '<=');
                break;
              default:
                throw new TypeError('Must provide a hilo val of "<" or ">"');
            }
            if (satisfies(r, e, s)) return !1;
            for (var p = 0; p < e.set.length; ++p) {
              var E = null,
                R = null;
              if (
                (e.set[p].forEach(function (r) {
                  r.semver === ANY && (r = new Comparator('>=0.0.0')),
                    (E = E || r),
                    (R = R || r),
                    n(r.semver, E.semver, s) ? (E = r) : a(r.semver, R.semver, s) && (R = r);
                }),
                E.operator === i || E.operator === c)
              )
                return !1;
              if ((!R.operator || R.operator === i) && o(r, R.semver)) return !1;
              if (R.operator === c && a(r, R.semver)) return !1;
            }
            return !0;
          }
          function prerelease(r, e) {
            var t = parse(r, e);
            return t && t.prerelease.length ? t.prerelease : null;
          }
          function intersects(r, e, t) {
            return (r = new Range(r, t)), (e = new Range(e, t)), r.intersects(e);
          }
          exports = module.exports = SemVer;
          var debug;
          (debug =
            'object' == typeof process && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG)
              ? function () {
                  var r = Array.prototype.slice.call(arguments, 0);
                  r.unshift('SEMVER'), console.log.apply(console, r);
                }
              : function () {}),
            (exports.SEMVER_SPEC_VERSION = '2.0.0');
          var MAX_LENGTH = 256,
            MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991,
            re = (exports.re = []),
            src = (exports.src = []),
            R = 0,
            NUMERICIDENTIFIER = R++;
          src[NUMERICIDENTIFIER] = '0|[1-9]\\d*';
          var NUMERICIDENTIFIERLOOSE = R++;
          src[NUMERICIDENTIFIERLOOSE] = '[0-9]+';
          var NONNUMERICIDENTIFIER = R++;
          src[NONNUMERICIDENTIFIER] = '\\d*[a-zA-Z-][a-zA-Z0-9-]*';
          var MAINVERSION = R++;
          src[MAINVERSION] = '(' + src[NUMERICIDENTIFIER] + ')\\.(' + src[NUMERICIDENTIFIER] + ')\\.(' + src[NUMERICIDENTIFIER] + ')';
          var MAINVERSIONLOOSE = R++;
          src[MAINVERSIONLOOSE] =
            '(' + src[NUMERICIDENTIFIERLOOSE] + ')\\.(' + src[NUMERICIDENTIFIERLOOSE] + ')\\.(' + src[NUMERICIDENTIFIERLOOSE] + ')';
          var PRERELEASEIDENTIFIER = R++;
          src[PRERELEASEIDENTIFIER] = '(?:' + src[NUMERICIDENTIFIER] + '|' + src[NONNUMERICIDENTIFIER] + ')';
          var PRERELEASEIDENTIFIERLOOSE = R++;
          src[PRERELEASEIDENTIFIERLOOSE] = '(?:' + src[NUMERICIDENTIFIERLOOSE] + '|' + src[NONNUMERICIDENTIFIER] + ')';
          var PRERELEASE = R++;
          src[PRERELEASE] = '(?:-(' + src[PRERELEASEIDENTIFIER] + '(?:\\.' + src[PRERELEASEIDENTIFIER] + ')*))';
          var PRERELEASELOOSE = R++;
          src[PRERELEASELOOSE] = '(?:-?(' + src[PRERELEASEIDENTIFIERLOOSE] + '(?:\\.' + src[PRERELEASEIDENTIFIERLOOSE] + ')*))';
          var BUILDIDENTIFIER = R++;
          src[BUILDIDENTIFIER] = '[0-9A-Za-z-]+';
          var BUILD = R++;
          src[BUILD] = '(?:\\+(' + src[BUILDIDENTIFIER] + '(?:\\.' + src[BUILDIDENTIFIER] + ')*))';
          var FULL = R++,
            FULLPLAIN = 'v?' + src[MAINVERSION] + src[PRERELEASE] + '?' + src[BUILD] + '?';
          src[FULL] = '^' + FULLPLAIN + '$';
          var LOOSEPLAIN = '[v=\\s]*' + src[MAINVERSIONLOOSE] + src[PRERELEASELOOSE] + '?' + src[BUILD] + '?',
            LOOSE = R++;
          src[LOOSE] = '^' + LOOSEPLAIN + '$';
          var GTLT = R++;
          src[GTLT] = '((?:<|>)?=?)';
          var XRANGEIDENTIFIERLOOSE = R++;
          src[XRANGEIDENTIFIERLOOSE] = src[NUMERICIDENTIFIERLOOSE] + '|x|X|\\*';
          var XRANGEIDENTIFIER = R++;
          src[XRANGEIDENTIFIER] = src[NUMERICIDENTIFIER] + '|x|X|\\*';
          var XRANGEPLAIN = R++;
          src[XRANGEPLAIN] =
            '[v=\\s]*(' +
            src[XRANGEIDENTIFIER] +
            ')(?:\\.(' +
            src[XRANGEIDENTIFIER] +
            ')(?:\\.(' +
            src[XRANGEIDENTIFIER] +
            ')(?:' +
            src[PRERELEASE] +
            ')?' +
            src[BUILD] +
            '?)?)?';
          var XRANGEPLAINLOOSE = R++;
          src[XRANGEPLAINLOOSE] =
            '[v=\\s]*(' +
            src[XRANGEIDENTIFIERLOOSE] +
            ')(?:\\.(' +
            src[XRANGEIDENTIFIERLOOSE] +
            ')(?:\\.(' +
            src[XRANGEIDENTIFIERLOOSE] +
            ')(?:' +
            src[PRERELEASELOOSE] +
            ')?' +
            src[BUILD] +
            '?)?)?';
          var XRANGE = R++;
          src[XRANGE] = '^' + src[GTLT] + '\\s*' + src[XRANGEPLAIN] + '$';
          var XRANGELOOSE = R++;
          src[XRANGELOOSE] = '^' + src[GTLT] + '\\s*' + src[XRANGEPLAINLOOSE] + '$';
          var LONETILDE = R++;
          src[LONETILDE] = '(?:~>?)';
          var TILDETRIM = R++;
          (src[TILDETRIM] = '(\\s*)' + src[LONETILDE] + '\\s+'), (re[TILDETRIM] = new RegExp(src[TILDETRIM], 'g'));
          var tildeTrimReplace = '$1~',
            TILDE = R++;
          src[TILDE] = '^' + src[LONETILDE] + src[XRANGEPLAIN] + '$';
          var TILDELOOSE = R++;
          src[TILDELOOSE] = '^' + src[LONETILDE] + src[XRANGEPLAINLOOSE] + '$';
          var LONECARET = R++;
          src[LONECARET] = '(?:\\^)';
          var CARETTRIM = R++;
          (src[CARETTRIM] = '(\\s*)' + src[LONECARET] + '\\s+'), (re[CARETTRIM] = new RegExp(src[CARETTRIM], 'g'));
          var caretTrimReplace = '$1^',
            CARET = R++;
          src[CARET] = '^' + src[LONECARET] + src[XRANGEPLAIN] + '$';
          var CARETLOOSE = R++;
          src[CARETLOOSE] = '^' + src[LONECARET] + src[XRANGEPLAINLOOSE] + '$';
          var COMPARATORLOOSE = R++;
          src[COMPARATORLOOSE] = '^' + src[GTLT] + '\\s*(' + LOOSEPLAIN + ')$|^$';
          var COMPARATOR = R++;
          src[COMPARATOR] = '^' + src[GTLT] + '\\s*(' + FULLPLAIN + ')$|^$';
          var COMPARATORTRIM = R++;
          (src[COMPARATORTRIM] = '(\\s*)' + src[GTLT] + '\\s*(' + LOOSEPLAIN + '|' + src[XRANGEPLAIN] + ')'),
            (re[COMPARATORTRIM] = new RegExp(src[COMPARATORTRIM], 'g'));
          var comparatorTrimReplace = '$1$2$3',
            HYPHENRANGE = R++;
          src[HYPHENRANGE] = '^\\s*(' + src[XRANGEPLAIN] + ')\\s+-\\s+(' + src[XRANGEPLAIN] + ')\\s*$';
          var HYPHENRANGELOOSE = R++;
          src[HYPHENRANGELOOSE] = '^\\s*(' + src[XRANGEPLAINLOOSE] + ')\\s+-\\s+(' + src[XRANGEPLAINLOOSE] + ')\\s*$';
          var STAR = R++;
          src[STAR] = '(<|>)?=?\\s*\\*';
          for (var i = 0; i < R; i++) debug(i, src[i]), re[i] || (re[i] = new RegExp(src[i]));
          (exports.parse = parse),
            (exports.valid = valid),
            (exports.clean = clean),
            (exports.SemVer = SemVer),
            (SemVer.prototype.format = function () {
              return (
                (this.version = this.major + '.' + this.minor + '.' + this.patch),
                this.prerelease.length && (this.version += '-' + this.prerelease.join('.')),
                this.version
              );
            }),
            (SemVer.prototype.toString = function () {
              return this.version;
            }),
            (SemVer.prototype.compare = function (r) {
              return (
                debug('SemVer.compare', this.version, this.loose, r),
                r instanceof SemVer || (r = new SemVer(r, this.loose)),
                this.compareMain(r) || this.comparePre(r)
              );
            }),
            (SemVer.prototype.compareMain = function (r) {
              return (
                r instanceof SemVer || (r = new SemVer(r, this.loose)),
                compareIdentifiers(this.major, r.major) || compareIdentifiers(this.minor, r.minor) || compareIdentifiers(this.patch, r.patch)
              );
            }),
            (SemVer.prototype.comparePre = function (r) {
              if ((r instanceof SemVer || (r = new SemVer(r, this.loose)), this.prerelease.length && !r.prerelease.length)) return -1;
              if (!this.prerelease.length && r.prerelease.length) return 1;
              if (!this.prerelease.length && !r.prerelease.length) return 0;
              var e = 0;
              do {
                var t = this.prerelease[e],
                  s = r.prerelease[e];
                if ((debug('prerelease compare', e, t, s), void 0 === t && void 0 === s)) return 0;
                if (void 0 === s) return 1;
                if (void 0 === t) return -1;
                if (t !== s) return compareIdentifiers(t, s);
              } while (++e);
            }),
            (SemVer.prototype.inc = function (r, e) {
              switch (r) {
                case 'premajor':
                  (this.prerelease.length = 0), (this.patch = 0), (this.minor = 0), this.major++, this.inc('pre', e);
                  break;
                case 'preminor':
                  (this.prerelease.length = 0), (this.patch = 0), this.minor++, this.inc('pre', e);
                  break;
                case 'prepatch':
                  (this.prerelease.length = 0), this.inc('patch', e), this.inc('pre', e);
                  break;
                case 'prerelease':
                  0 === this.prerelease.length && this.inc('patch', e), this.inc('pre', e);
                  break;
                case 'major':
                  (0 === this.minor && 0 === this.patch && 0 !== this.prerelease.length) || this.major++,
                    (this.minor = 0),
                    (this.patch = 0),
                    (this.prerelease = []);
                  break;
                case 'minor':
                  (0 === this.patch && 0 !== this.prerelease.length) || this.minor++, (this.patch = 0), (this.prerelease = []);
                  break;
                case 'patch':
                  0 === this.prerelease.length && this.patch++, (this.prerelease = []);
                  break;
                case 'pre':
                  if (0 === this.prerelease.length) this.prerelease = [0];
                  else {
                    for (var t = this.prerelease.length; --t >= 0; ) 'number' == typeof this.prerelease[t] && (this.prerelease[t]++, (t = -2));
                    -1 === t && this.prerelease.push(0);
                  }
                  e && (this.prerelease[0] === e ? isNaN(this.prerelease[1]) && (this.prerelease = [e, 0]) : (this.prerelease = [e, 0]));
                  break;
                default:
                  throw new Error('invalid increment argument: ' + r);
              }
              return this.format(), (this.raw = this.version), this;
            }),
            (exports.inc = inc),
            (exports.diff = diff),
            (exports.compareIdentifiers = compareIdentifiers);
          var numeric = /^[0-9]+$/;
          (exports.rcompareIdentifiers = rcompareIdentifiers),
            (exports.major = major),
            (exports.minor = minor),
            (exports.patch = patch),
            (exports.compare = compare),
            (exports.compareLoose = compareLoose),
            (exports.rcompare = rcompare),
            (exports.sort = sort),
            (exports.rsort = rsort),
            (exports.gt = gt),
            (exports.lt = lt),
            (exports.eq = eq),
            (exports.neq = neq),
            (exports.gte = gte),
            (exports.lte = lte),
            (exports.cmp = cmp),
            (exports.Comparator = Comparator);
          var ANY = {};
          (Comparator.prototype.parse = function (r) {
            var e = this.loose ? re[COMPARATORLOOSE] : re[COMPARATOR],
              t = r.match(e);
            if (!t) throw new TypeError('Invalid comparator: ' + r);
            (this.operator = t[1]),
              '=' === this.operator && (this.operator = ''),
              t[2] ? (this.semver = new SemVer(t[2], this.loose)) : (this.semver = ANY);
          }),
            (Comparator.prototype.toString = function () {
              return this.value;
            }),
            (Comparator.prototype.test = function (r) {
              return (
                debug('Comparator.test', r, this.loose),
                this.semver === ANY || ('string' == typeof r && (r = new SemVer(r, this.loose)), cmp(r, this.operator, this.semver, this.loose))
              );
            }),
            (Comparator.prototype.intersects = function (r, e) {
              if (!(r instanceof Comparator)) throw new TypeError('a Comparator is required');
              var t;
              if ('' === this.operator) return (t = new Range(r.value, e)), satisfies(this.value, t, e);
              if ('' === r.operator) return (t = new Range(this.value, e)), satisfies(r.semver, t, e);
              var s = !(('>=' !== this.operator && '>' !== this.operator) || ('>=' !== r.operator && '>' !== r.operator)),
                n = !(('<=' !== this.operator && '<' !== this.operator) || ('<=' !== r.operator && '<' !== r.operator)),
                o = this.semver.version === r.semver.version,
                a = !(('>=' !== this.operator && '<=' !== this.operator) || ('>=' !== r.operator && '<=' !== r.operator)),
                i =
                  cmp(this.semver, '<', r.semver, e) &&
                  ('>=' === this.operator || '>' === this.operator) &&
                  ('<=' === r.operator || '<' === r.operator),
                c =
                  cmp(this.semver, '>', r.semver, e) &&
                  ('<=' === this.operator || '<' === this.operator) &&
                  ('>=' === r.operator || '>' === r.operator);
              return s || n || (o && a) || i || c;
            }),
            (exports.Range = Range),
            (Range.prototype.format = function () {
              return (
                (this.range = this.set
                  .map(function (r) {
                    return r.join(' ').trim();
                  })
                  .join('||')
                  .trim()),
                this.range
              );
            }),
            (Range.prototype.toString = function () {
              return this.range;
            }),
            (Range.prototype.parseRange = function (r) {
              var e = this.loose;
              (r = r.trim()), debug('range', r, e);
              var t = e ? re[HYPHENRANGELOOSE] : re[HYPHENRANGE];
              (r = r.replace(t, hyphenReplace)),
                debug('hyphen replace', r),
                (r = r.replace(re[COMPARATORTRIM], comparatorTrimReplace)),
                debug('comparator trim', r, re[COMPARATORTRIM]),
                (r = (r = (r = r.replace(re[TILDETRIM], tildeTrimReplace)).replace(re[CARETTRIM], caretTrimReplace)).split(/\s+/).join(' '));
              var s = e ? re[COMPARATORLOOSE] : re[COMPARATOR],
                n = r
                  .split(' ')
                  .map(function (r) {
                    return parseComparator(r, e);
                  })
                  .join(' ')
                  .split(/\s+/);
              return (
                this.loose &&
                  (n = n.filter(function (r) {
                    return !!r.match(s);
                  })),
                (n = n.map(function (r) {
                  return new Comparator(r, e);
                }))
              );
            }),
            (Range.prototype.intersects = function (r, e) {
              if (!(r instanceof Range)) throw new TypeError('a Range is required');
              return this.set.some(function (t) {
                return t.every(function (t) {
                  return r.set.some(function (r) {
                    return r.every(function (r) {
                      return t.intersects(r, e);
                    });
                  });
                });
              });
            }),
            (exports.toComparators = toComparators),
            (Range.prototype.test = function (r) {
              if (!r) return !1;
              'string' == typeof r && (r = new SemVer(r, this.loose));
              for (var e = 0; e < this.set.length; e++) if (testSet(this.set[e], r)) return !0;
              return !1;
            }),
            (exports.satisfies = satisfies),
            (exports.maxSatisfying = maxSatisfying),
            (exports.minSatisfying = minSatisfying),
            (exports.validRange = validRange),
            (exports.ltr = ltr),
            (exports.gtr = gtr),
            (exports.outside = outside),
            (exports.prerelease = prerelease),
            (exports.intersects = intersects);
        }.call(this, require('_process')));
      },
      { _process: 10 },
    ],
    7: [
      function (require, module, exports) {
        function UUIDjs() {}
        function getRandomInt(U, t) {
          return Math.floor(Math.random() * (t - U + 1)) + U;
        }
        (UUIDjs.maxFromBits = function (U) {
          return Math.pow(2, U);
        }),
          (UUIDjs.limitUI04 = UUIDjs.maxFromBits(4)),
          (UUIDjs.limitUI06 = UUIDjs.maxFromBits(6)),
          (UUIDjs.limitUI08 = UUIDjs.maxFromBits(8)),
          (UUIDjs.limitUI12 = UUIDjs.maxFromBits(12)),
          (UUIDjs.limitUI14 = UUIDjs.maxFromBits(14)),
          (UUIDjs.limitUI16 = UUIDjs.maxFromBits(16)),
          (UUIDjs.limitUI32 = UUIDjs.maxFromBits(32)),
          (UUIDjs.limitUI40 = UUIDjs.maxFromBits(40)),
          (UUIDjs.limitUI48 = UUIDjs.maxFromBits(48)),
          (UUIDjs.randomUI04 = function () {
            return getRandomInt(0, UUIDjs.limitUI04 - 1);
          }),
          (UUIDjs.randomUI06 = function () {
            return getRandomInt(0, UUIDjs.limitUI06 - 1);
          }),
          (UUIDjs.randomUI08 = function () {
            return getRandomInt(0, UUIDjs.limitUI08 - 1);
          }),
          (UUIDjs.randomUI12 = function () {
            return getRandomInt(0, UUIDjs.limitUI12 - 1);
          }),
          (UUIDjs.randomUI14 = function () {
            return getRandomInt(0, UUIDjs.limitUI14 - 1);
          }),
          (UUIDjs.randomUI16 = function () {
            return getRandomInt(0, UUIDjs.limitUI16 - 1);
          }),
          (UUIDjs.randomUI32 = function () {
            return getRandomInt(0, UUIDjs.limitUI32 - 1);
          }),
          (UUIDjs.randomUI40 = function () {
            return (0 | (Math.random() * (1 << 30))) + (0 | (1024 * Math.random())) * (1 << 30);
          }),
          (UUIDjs.randomUI48 = function () {
            return (0 | (Math.random() * (1 << 30))) + (0 | (Math.random() * (1 << 18))) * (1 << 30);
          }),
          (UUIDjs.paddedString = function (U, t, r) {
            (U = String(U)), (r = r || '0');
            for (var n = t - U.length; n > 0; n >>>= 1, r += r) 1 & n && (U = r + U);
            return U;
          }),
          (UUIDjs.prototype.fromParts = function (U, t, r, n, I, i) {
            return (
              (this.version = (r >> 12) & 15),
              (this.hex =
                UUIDjs.paddedString(U.toString(16), 8) +
                '-' +
                UUIDjs.paddedString(t.toString(16), 4) +
                '-' +
                UUIDjs.paddedString(r.toString(16), 4) +
                '-' +
                UUIDjs.paddedString(n.toString(16), 2) +
                UUIDjs.paddedString(I.toString(16), 2) +
                '-' +
                UUIDjs.paddedString(i.toString(16), 12)),
              this
            );
          }),
          (UUIDjs.prototype.toString = function () {
            return this.hex;
          }),
          (UUIDjs.prototype.toURN = function () {
            return 'urn:uuid:' + this.hex;
          }),
          (UUIDjs.prototype.toBytes = function () {
            for (var U = this.hex.split('-'), t = [], r = 0, n = 0; n < U.length; n++)
              for (var I = 0; I < U[n].length; I += 2) t[r++] = parseInt(U[n].substr(I, 2), 16);
            return t;
          }),
          (UUIDjs.prototype.equals = function (U) {
            return U instanceof UUID && this.hex === U.hex;
          }),
          (UUIDjs.getTimeFieldValues = function (U) {
            var t = U - Date.UTC(1582, 9, 15),
              r = ((t / 4294967296) * 1e4) & 268435455;
            return { low: (1e4 * (268435455 & t)) % 4294967296, mid: 65535 & r, hi: r >>> 16, timestamp: t };
          }),
          (UUIDjs._create4 = function () {
            return new UUIDjs().fromParts(
              UUIDjs.randomUI32(),
              UUIDjs.randomUI16(),
              16384 | UUIDjs.randomUI12(),
              128 | UUIDjs.randomUI06(),
              UUIDjs.randomUI08(),
              UUIDjs.randomUI48(),
            );
          }),
          (UUIDjs._create1 = function () {
            var U = new Date().getTime(),
              t = UUIDjs.randomUI14(),
              r = 1099511627776 * (1 | UUIDjs.randomUI08()) + UUIDjs.randomUI40(),
              n = UUIDjs.randomUI04(),
              I = 0;
            U != I ? (U < I && t++, (I = U), (n = UUIDjs.randomUI04())) : Math.random() < 0.25 && n < 9984 ? (n += 1 + UUIDjs.randomUI04()) : t++;
            var i = UUIDjs.getTimeFieldValues(I),
              s = i.low + n,
              e = (4095 & i.hi) | 4096,
              o = ((t &= 16383) >>> 8) | 128,
              a = 255 & t;
            return new UUIDjs().fromParts(s, i.mid, e, o, a, r);
          }),
          (UUIDjs.create = function (U) {
            return (U = U || 4), this['_create' + U]();
          }),
          (UUIDjs.fromTime = function (U, t) {
            t = t || !1;
            var r = UUIDjs.getTimeFieldValues(U),
              n = r.low,
              I = (4095 & r.hi) | 4096;
            return !1 === t
              ? new UUIDjs().fromParts(n, r.mid, I, 0, 0, 0)
              : new UUIDjs().fromParts(n, r.mid, I, 128 | UUIDjs.limitUI06, UUIDjs.limitUI08 - 1, UUIDjs.limitUI48 - 1);
          }),
          (UUIDjs.firstFromTime = function (U) {
            return UUIDjs.fromTime(U, !1);
          }),
          (UUIDjs.lastFromTime = function (U) {
            return UUIDjs.fromTime(U, !0);
          }),
          (UUIDjs.fromURN = function (U) {
            var t;
            return (t = /^(?:urn:uuid:|\{)?([0-9a-f]{8})-([0-9a-f]{4})-([0-9a-f]{4})-([0-9a-f]{2})([0-9a-f]{2})-([0-9a-f]{12})(?:\})?$/i.exec(U))
              ? new UUIDjs().fromParts(
                  parseInt(t[1], 16),
                  parseInt(t[2], 16),
                  parseInt(t[3], 16),
                  parseInt(t[4], 16),
                  parseInt(t[5], 16),
                  parseInt(t[6], 16),
                )
              : null;
          }),
          (UUIDjs.fromBytes = function (U) {
            if (U.length < 5) return null;
            for (var t = '', r = 0, n = [4, 2, 2, 2, 6], I = 0; I < n.length; I++) {
              for (var i = 0; i < n[I]; i++) {
                var s = U[r++].toString(16);
                1 == s.length && (s = '0' + s), (t += s);
              }
              6 !== n[I] && (t += '-');
            }
            return UUIDjs.fromURN(t);
          }),
          (UUIDjs.fromBinary = function (U) {
            for (var t = [], r = 0; r < U.length; r++)
              if (((t[r] = U.charCodeAt(r)), t[r] > 255 || t[r] < 0)) throw new Error('Unexpected byte in binary data.');
            return UUIDjs.fromBytes(t);
          }),
          (UUIDjs.new = function () {
            return this.create(4);
          }),
          (UUIDjs.newTS = function () {
            return this.create(1);
          }),
          (module.exports = UUIDjs);
      },
      {},
    ],
    8: [
      function (require, module, exports) {
        function getMuteStream() {
          var e = document.createElement('canvas');
          (e.width = 1920), (e.height = 1080);
          var f = e.getContext('2d'),
            v = new Image();
          return (
            setInterval(function () {
              f.drawImage(v, 0, 0, e.width, e.height);
            }, 500),
            (v.src =
              'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAoAAAAFoCAYAAADHMkpRAAAAAXNSR0IArs4c6QAAQABJREFUeAHsvWua47yupLtXP2cK/bt7GD3/ia3DAPmSQYjUxemsyqqy9rZxCwRAiJKVzvxq/ed//9//99//+e//jOM///M//y12EfVoNmYEEj7nf+w+rTrIz7zGQLSxftQ80gY/7a8ET+NlbZ/4Dzu/D/fb2KkbTSfYD9/M8ue4Y3+z/tmbf/be/Jy/z/nz280b9sN//vf/KQ+A7ahPgj/4BkajH/mZwG+ZwOfa+Nax37mhqYF+xyr6nZy34UuxqV4hnuwc/9Zpfcg/E/hM4DOBL03gf83Zupt9js8EPhM4TuBzbRxn8maPP6iJemW7L5+SnY3/ZanE8iI/GmsPfzGCFl/1HPHP22cCnwl8JvDDJlBuW/0B0O+rP6zNTzufCfzmCfRP/t/cxw8rn8dyZXv7Z1jFiLuufLe5aYHd2dQl/siGvCRFfnkzVxjYkrxUY+cnRnxly3d1eP4V9hP/TOAzgc8EfALlVvb/ue267i35funxj/6ZwL8xgX/0UzbfAFa2bwDGBG5nK4cbC5hsw0tctuu/zLai/6HJ1lyEPN78CEJI9zuV4ivb8xQ/s8W94yEm6XVkf47PBD4T+KcncHgA5D7zuVf80/vis/iYAFfDXzQOf1BgeVzsbl89dBD3HHRJ4hodfsZ4ZYP7bTI3mBu5imd8snP6HTvPE5tcbEo9sYXlEJ/b+D/yM4HPBP66CZQHQP4j4HonyfeNv27FnwV9JvCvTYAPdR4WsJkD/p0t/xXmKg73j5Z5EWrWn4ZW8V+0oFz6nba4Pjf+X3QiP2U+E/ghEyjX/f/6b9zZ691E79wLfkiLnzY+E/hNE6jXxG8qvi6bW8q2Z+WYbH+WcexHLxPIA9NQGJhiq7gwf+HBUpFa4j82gr/wrH6W9JnAPIFye+v/EYiub93uuOXNyI/1mcC/NAH/5Psh6/aWzvQcyzbLcT++Hy1zw3dsx0jnxUKxkfiR7nddcdl+XNmO/YH6rv0zv2LEXdfy8Gdd9uf4TOAzgR8xgf43gJ8Hvx9xPj5N/PYJ+CfXL2hG5bj4KC0bXS3IxocfqbjrK1u+X3aoGRakom57oyxo19gq7vlwe36OrzA7n/d8xuk1XF/x5rjzZj2vl37EgU4NtzPPN9h5GbSE3218eTm0Lkn75H1Dyx/K90yA08gpE2s+bZzy91T8sPzKCfQHwF9Z9FPrM4GfOYFffCvjTopkKLmNbIP7bZKGd41lf7bV+MrnC7qKO/ZVnRr+8QYXMezvlrme266rD9l8NMte9S//Nx6rlrzcWZz2f0Pb3uK/oL9jxJnjyn4617xVnuZ/8C9OoAz+8wD44uw+aX/bBL7hNsQH3WpUxCiLXGF/i48GKY5No0ji3y/pgEpfs//THqPGx1nlG+v6Gj9dfpccfR4fCFVT68oryL1cxTP+jTbt0ybU43Tg+UibAOP6m8Z0tZa8S9k6NpaP+soEyuD7A2Ae8it8n5zPBP7ZCfgF5HcodO7cPiBi7vs23RtUkTvFMybb95tdVfcb/524V8ud3Lcrsr6PDty7ms59/tql8IP9+Ch2Fs8xX/de33WY/ZmBasgc/2absrSZbYaIX+2AJfbNLf5K+jtLuoP5lT1/d6283myrPlviu3v52/jjAdCvrb9tgZ/1fCZwPoGHtw6/WEjVHUkvbBXMtscUf9vhDYnUbS+aG3qtAWffVVMlYpKyvXq3W3v/LY4eL74z+z+Ki6+8SW8Usw0f8f/+p/J3u9Xr9lU84VP93M9Z/2q4x4uuxiK/qFpPGEXokMkhDLZ0Dk9xXfFsk3OUMCOPiNoYce9ghX3og5Y02SyYGDYYt2mHPDA/XNL2D2/zj2jvbJZsC7bSH7GgX9Rk/wbwF9X7lPlM4M+dgN9J/I6zurOsfG9buTci0lws2yvM82a8qpafbRjxH+wW6A86jaTbipfjaJdAPPG1uCqn/2WOyKnhIKiPdMEWjTZqCAoDKygu0ZE7UoankA++CviP1Y9fJrutZrxfkc/lKrd85ei1m129+3en8xTXlZ3tPeOdSO+ygF1X7nsrRTe5xJmtmFr4hjailze8/eDW3rC6n03B7JHqNm+nn72Cb+quDCH+GRgfzDeV+tB+JvADJ5BuA8mc7hKK6UIBg/xlq6JglvcbIJOMKxucpLDli7R+YJtr/vwtgem+Egk9fczRXFNCPEQRzIN3Zh7N6MRtfPC4zDFs5Q9djY5q8h/tsVLy6BdbdU1HleSVIJOfGHmy7YDCw+FzR8En0xiqehU/JHRHVCsWUoHX2TrtEyWXdvsJzxex7BVJf32R9pP+5gn4ucn6m0v9XLqy8M83gD/39Hw6+9YJpA8oTKTuCjqwsx7Bd79RTMXRvcbK5/GhC8kS5CUT/8FugR5HgafYcuktvtxa2ArHUQrXb8VkFSPsok5f08lWvB2ud585Q8VGVmD9zzmkV/+IovkkIB/44fF8cnesIw6i8jR/D7vdnXOKtyJIGXBfk75ZjPlFoOSVB1DFjZbzETQV3vlbVv9WNezyFulgS2LYIigHegnHke3mPhFkIB3qrOge/6KukqKldLYpif+L5aBzmpXP4x/9Z08gnz+20s/u+rXuPg+Ar83tk/WnTsBv/FzZuuL1wtbaXJf9tuMO8R1MbUhIblhkTcspTj0g9OUVO3KKoz9EKN5tPXqU/3nIyVZcDx21QogSZ0bw9BFVWDNbwR78VQpNqNF8EMv+H2JPA/X51b45D3Q7nQ/gnMCw/XzO578ytvNfCOGK06ugjQ+s6uJ2iOvCrA9ncT0qthTY1wyXXqcVmMYkiXk5YSgJVr50AEnuj/mXTyCfd7bQ37DszwPg33AWP2u4NwGuXH3K+VWN/x7LQ9T3kcMsuVxOA/Ch3j/8Cj58sZICiv8XQ0socsQD1B/+qmXQ7vgpCmtQPz4V2R6T/RcdeWnTCcznk28QlVRnlOD1TyxtfL47mNrIrh6DA3kgfQEw4/saczQBFR1lW37KNswbqlLtD5VpIHlAB/sPXebDtn1frLbRQ7rfBy/Nfx4Af9/4P5XfPYGz+xUxPum+/cp9XoAWGUu2/X4bsfJm/+0BaVWSLBnHcJTvg4KKyIjPnj/L6gu1tlmzXKu4Qf8p1WdR/6aRdx4IYxyMr8ie0T79up0mmz8c3X424jsVnjGeolu56NdLswD50E+JfkqQhn0x9KaFrPzEXWbcle256Lt6+F2S82dIdZ6PPKEc/zF2af7zAPhjzsankS9NgKsOyZWJLXIe/r5UyJOd3P3XujJpUWiYkOEoAGz9Bxihd8ew47d9naQA5AgbcDEsuf99WUX9Be+2zr6a1XR78KPYBOr0mGGTk6lZ4i96mLLrDxL8tlmU7U8W66VWcIEqb/ygYkx9/1cmZd85hPZDjDqesdSc+RqcaCjjtOjEKA3ZL5G5ibOiNJoxKz+LIYadc6/snC8bX87Fn6Vq41MOtsvM9XNsn5yv4ud0ODr5PACOWXy0P2ECuqK4wri6ZHNvYA3EsKcbSnfeUCDKBW6kFshluwWgD9Bgt1LjQ7UyxAeoP8CCVQ3To6uD416vvwdV1zdqr2xF8/yzPRiq5kNxPeNetXP9lS3u1XqE5chx/D9J+vyK3s2qxHZjw0Z48TeHLS0yyvJjWjJsFBEzVwpvBkKWwq4b8SZzi3AaaKNhK4GtOET3GlbGgyM3o1R83oT8NALGbfnuHK/kOG/Oz7ZjXT8bHuvN0vPv1vGc79dzV6zg+yvfq/B5ALw3pw/qp0xAV1S+V7z9qqKAE7t+bxjO4jeCztSU+gFqnMUxfiUnfwH2JMP9ESqNc+Jo2m0wxLItf/a5Ld0nDM8qz2Nf0b3+qo7HXd9hfR55LWfr+8oa3pg7/dCx+JtDL1WWEz/Q5GU2DKvdhJ3pRPeZV6Yv8Tmdqrr95YYhcNLV0lYrWPmUu/OveH+CL/ebbXrczSj7lc9cyf39klXlbn9LZ6WJzwPgb5n8p+itCfj167qSH11Bd8AUAIvcd0oGCLdDN4fU6X5ELAKKHRzQ/iGS/ml3ZROTZOHue6rDwW3V84m57yfr3q/r3rP8rBUMtuN+mk6v6qv1i0tm0TFXYVYjzGur7ewvM9DDVlKCBg/N4gCYmfC3gby40sx6tL0Pah1R7/VQh+F8hf2Kgzlmuap5xbXKeY/PK9Ppe5gfsJQmPg+AD+b1gf7CCXBVIFXa9VutXCXkeLb3RUAio7dyQbkdOg6u+P5NicAEqZNt/L9Sqgc1Sy+98RtNkAM02/jfIDW7aK31p1KhtprdbrV+tf2GJc4UbV39vBDFjy2pQeBv8wkb3bG/WqevVlcmvz5W3+W8Tv/OYXGp67hUFFZa5Ehpp7yq2/fIb1G+Wx9gRXUYaXW89t5pitL11rj/S+p1s25q0NMmPLkpInn3AIu8m/cqjjrIuzxP5gDnWU6un+2zXPjfL71q7uj91WbGzwPgPI+P9SsnwG7nCsBWD/K5/bgvkiVXBa4JYVhl9/YaqH+GcdcPAAyrtVjsupU3IqjbV7DgBqOQ6wvomYvUPEBs6LHBy+/tdb0BZHefwOUI2wiW8Qod+G+0jXpbTwG1rF453HZd8WyTc5ACcux04kiauF2ExK/L/oNQ7TX+nUPOX3FFR+UC67BSMcIVPuYXwGM7wLKsK67/SRT6yK6eYZ9pMDcMfUgSioaNM+wSN9e+ghOuUBRZxf5k39m6Hg2wDcGHveJ2n2N/3QxzVe/oO7r4PAB+x1Q/nPcnsLuOX9r5SoLQW3iJrBPA6o76H2Xg0d88ed2S8bWSEL8o6fisibPYi2VJozwjwc5xWkASl3Rf6OboqgroKI7uq57fbrc2ujjrTzFm1ROa78z22Jd1bzA3xJy/XOQ+gbdTsvjHr2sn5b3Ee1e02x33ywi5TksNLE/Qrk7tb4rG/WHyLAqzkFxbeStf4vunTOaBZPHrs0l0yB0OPiQZwsu3ywP3Xkm13M1bqhTS+N8CfgvZh+QzgasJ+C7O15LHrniWcQiQArl+TMpRt6X7b2z824dg6uD6n2tc1TpWf7eHhrL8Qh2ooMg2fskcy7Yg3M1aXobs7Ro5xuUZ3qHVAk/t1lYXT/MzvhPdVHo+ikvp2OLL9qqG41fxU58nUyz7TgneHhzbZ9EPrhtVxTO4biQExNe+yoH1irnx6IYSN5XWeL/BXNVZ1f74xgTaPPsF4vZA7TU/j+hCc16e8u0rPYnQydXuesKpi+DzDeCjiX3AL0/Arx9I8GFfSk/gUnCfE+z8FUMUGdd3oez34QKLWAfI4caotfaO+Ps0r6T1u60q2X5QWamM1KnwQ51tYTU3CTBFP9gWU0r9Roc16N+Ti4z2zkrwyl7Fqx+W4C1vX7HF8Tyf/mvf9R/aZsGyRv+Dv66n/Ut6Ng8hCr6ElRfLbqLbRanZNaAHa5/9tABx6OgJTZcvCFNM/tNDRBzoInJdcS8I/rmkxX0mdRsihlH0uFZbNu1BVlL4YYSQsglXpif9z5lzfuovgubzMju9En7evzwBm/vEtTp/DshxeJBgMw7/e6VXyR08rfR5AHw6sQ/+fALakasdKt+XdmtOzra3VWMgaAdbyGjHHPPf8AlQEJsHPq/0ft2aOiW/iRMsDyAWn8izz5YfDxdm6zwOeDHKp6nb0ueHoIGn64qvj3XaGNjqipbBVrs+Ku3jNe9uXDgO6jyxx3pVl/4rw2zz6FpxQoz1HddPL86vnGmeAWIexWhPMz1XSiGI7Vt0cWGH3uxoRLoOkqV3UPNjN15B5sOTd/olyUQJenLeMkr93kJTJOJ6rgRhljdJvfT0HPPtT911BBFTWJjTA2QG7fwJ5zB0FUUXHPu6mUT+Ma8nkAd9lZFPAvlI5WfMFedrcbbFa9mfbwBfndsnbzeB3Y70a2OXu/U/SZ6xtDNdjgXCNwC1ZPkgDofl/rKHP6u5Xf/DgChZuFKxoVmVzL5mV5ryAZnnA1dIHmSqs6bOhLM1f7Ypax9XhIedyl/xc8ZsnfENjq9oT+t9HT8zaCLDI22c8HicKa6857O9Xf9MN2ATwXDf00a3Y0PiG8RDu8d6G5WuZyqTH9Ocitcfaojfk846kd1Ld5RT4f8iJTQfeTaBPPg7Q3cM+UhqOQbfe6Qz56qnFQr48zeApxP6BE8n4LvN9dOkJ0GR3if2j0RV8V+LHVi6o35786TOkxXssb2BPSRHcorbriuv2JMr2xWSK3Rbs6w3lsqid7/RdOALyjWPqvHKBXb+jPtz7Ot53FmL5sJR9Xo98K6JOibtD1JNdrQUXhZPdB65oXf2Tn58zL9B8wLkMG/WFi0pWjvJHdZSFexT3Q9nzfBCy8cSTv0S4Sfp3gTq+R4n4Grwdf8c75bw3Kv6Korqt/IL+PMr4FuT+oAOE+A6QArg+iHhjuM+gZDa7Bx8uMGgh7/Qu6Mg07cAIxft3ZLiO96TuELzAisJKcQaLgSxgkRt4WJXTdJ/nTjio8dBXVlkK69acxsj677mPMesHKUbIXPsmP0nel5ZVc5xm/PFxPzbwnr+xySVN/ZDzey/Dm0bEO44E8XQl8H9h6tKMAgDVEjxjyakLQ9SapBqDhXCCT12pTtf5eFHm2VmuUf4X3/EWgUsNPEleFHnfq868/romWHZydopCtLR30C7LvbxrifAwIlyQrCR2a+8nCtsxpH/unTGVUWYPw+ATOIj702A3aQdhn4vc4O6T+LIKB+O8laMYdcy9TeWlmHqppEX3SJWdR0PiwBfpceCKmu8F5vn14CXXNKlDHj1jg/1iqvxGls/BAy+ztvKZ9u6erOaK8VKf3kXb17UL6fLU1zZY7/ovNdHIh7x3SbX9xNPQj0mpRBqf/YHQy+gCQCW3k5r/JDW9EYRsOYSsh0kI+U+oirYMS19Eru8AYrrTDBRFUOi/uPUoTW7rtfboPKNCqNYaNcZU0Jto/XXIvQrM9OBh8Rtmib2XdJ78vrfVe+X8voQfaG5CY95zvcOhKpekc4+D4BM4iP3E2B/+g5yfZ+5iawIN9CNeypfjGE3bTg2DF9xi1yXFUWQL3JC5+mZstm1av0Wb9R3rZLwYQ7lho5wX0l3/HLFO+SWRRMew/eRX5lAnui17QjXtffK42FxTWdthsytCitweUkISi5yTlhZZwVW+CvmxJdNfvpq1BFeUC5cq2aST2wPM1N/0wWcY6qWfdlOHb3dzPWynQs+HEdO/312XthuIfjBI+mcOPbXJYy9UlE+fwP49bn+vQx9p5Qluv6WFV8TOkJ6/XaheaevG9SQo9/SYCKBP8sEcxMoPrelc0UqXmwPN5dEHHwrAypjwa2kl1nFf7/PV+Pdyu+xi04z9Lvti3b+1LCfgd0a5tFqd9b/2+GzX5evP1NlO+Nft7UaVqSu6RwdebdC/bY0modKrK6LqtjmmvR1JaE9Y436Z7yMYyUZwh8xLl8Ajbtkf7JHiZGH/T7ZKxbl8wD4vrn+2UxcTHnf4X95dRC6PJLlMvo40UGWlPB0Rwt2FOhwvOmNYlG5cCJv0AOFgpRmRxiMMfNBWtc/LKVXy4nQz6WVOQf+lmjrLoTdBP0TVX3lRWD/NMkM6Wtn4/+BMrd+1aKdtdij9WSJhZcY1qw6zZ7fYaSShuzN4ED2QFIU50XoKgfcWtZrU7HC0/ep9GpqPVQIidHoktm8CEV5NVUhXCtJ3KX0v/VgBlofuuSPP66a1c7xlxZ0lfO1RX9+Bfy1+f352dpf7DlfzcsX1P3EjKz30uItvx/SPzsybrSlQfXoN9vea2bpgZuK8kWu4wWuXXqhpN1gL7jKXhNiOVav2rULvWd7RH6wVhd4HGcMoPRNXEuIBZqjL7j5ut3We2YrxeO/2+7ra70/tbUWHYzHbXTibkfSr3+jTVVetwMCOfeo64S/MeTXySKq/oJVmoi5oJROof5fach5duTaEJzl3Iz1vmqN6Lvcw3D39qFrrdDRvhMHxgAKwwaNG0mtf0ky0NWaf9xcaPasMWJgkfhXC33m+zwAPpvX34fWXmJffXl1rxNNbZQ758xUrNnxpqYhRT4cAGlIT2++uq78N3t5fcflrSid/kfpapZ7EicSW416nMb5dOy2J7QcYpJ5IH+zvZqXZpBGdLCF+U1Hbu15G5xQXRv8TSG+wmZq5S4VDz6vehpMhF/v3itL53+7uPrHw2DG3a/MeiRTFqFM7rZSHJcoHPpX6r52FvgjZpAbWzXlPuE9x2Ms7KYsNJ9fAd+c1V8B833j+lsWd03oCOn9vxgsejwPuOMtPZ2ReDcbXIa47XpLzy6/NI+PfJuav9OdF5Bt7y3HZGvB7vcB9FwBHKQAidnfk/5thbEwOreZDDHslSRvFXvRpzO3PM0P+ebWdLVcXDGeEGsvb3ETCeOF6q/k3StT5yP+ccxWvSLc5/rIQlOUF74LmQlzeo5f0P0VYWbg8rcv7KoZrjiuuiv8yYIKxecB8GQ+f1VI+0QH+yXrEXz6Bhnk+3wQZKiP8B0ce44Ricxhnmq9QEGh38gHQgo1mk3Y3eLn/2Yd1A+S6wW0k1L6JO5SOraWgs2De48VJWIAmj0li4BDuK8ecPxq+dW+N/ksg/DOPvMrRnwnxe846t2QfATdgD6AtP/IomV4297mdJ2V/QeuK4Bd3uoCJuStpBlEaqsd3waGrzkCXUH1faQ7Am/G4K+SKHKOXlqeho68TP4LAVo7r9++vKtGeBik0Ss8uCE/vwIes/g7Ne0JHdytsav3hfdzAkUpJfL6zd74jqffoAUKqnM+cczHFX4XX/hx0TC2Crb+5IpwUWq4emq4egwuNY4RwfObZG332FRbX+/KbXJYBDLAxeBfxO22lAl0YgsXE1VSOpyj/g2oI4lW3/gbUTA8Biii49fZdRl5ZbOd1zO6HvOYV1hnCq7WWL6TRnBliwa/pNvKW9nyg036ja6U8eAYhWiTZCL43Y5zHAH2Q/31sdaje0/vc7U+iCjUZRAWC6lAZ+qoKTy8VcupsvUKmhaMmyPu0b8I+j9GbWV7ugDT0fimhixxwi4MiCWhEgz9AdWC/c91sX5fwW+ZhTeyakA+x0hf4XwhVf88AB5n8vd48p54aWVOck3AVkTGPiwU9R9mVn7je0bbCu+S5O8VG/aBIN1TWqnK+vxv+Jzql+usp60hRq6F+EEM38HODoCSZzHHZV15uRFhVnxH35w5f1Mkljl+3BGKi5Uudra4dKz4aqS+P4vnfn19roubDrNe685xfBdyVcJTclyx5It/u89z3qJ7Eel5qrXIQFVt2DXO45Oajqu1ACamnKC0CVB59u+FoHPcSBQEPFLkrlux+sPK4A3YMAOZTMt+g7rp69mM3tDHT6fwOX3rCdkNggZycWziSPwLvgL5/Ap4MZc/1sU51wJcP9kDX1mrl4iS5jC13kPaT7uv13PGFctVvOQ4RLrPpdgeVgW3+TZJfk9b2fJ9y+ENqYDbrufYypZve2SyLXAK5KzZrh/MnlDjAzW0ujSfc47tbPmJ7SQ9EMdG4pfkpdiZ33Fgwa9sfJLrI2cLRRUm4xhYVj5iGwldX2HCFcr4Lf8L1ImpmCLxFwg10RvBmbC1gR1qJGmv1f8L3y5htR583iJ6L4ADcA8M5SQ0QFmrSdGu7pfGkUwPZZJmK9kIJn2T4u6c6rbj/mWdEbv8ZfOgaC6o3cNLsR2uwj7fAGpGf8Oh86wDWa36vvJ5fNLvgUEhqduf87QHm9ExgKZ6d4zBMBYYBe4kVwwUTUrwp2sCjHDVxK4Df7Xqe/Zl27Fv0ymC9AZdV8GHo5l7pMDRSxlFhMq2+2HhsW/YypO3HvBkGy5J6oBheVd2rXAcB/mvxHf90gtxuHd2xmMrb93fQDC/Opfq13u1dW7yt40wgqC7JoNi8Ie3++o/0NLZKeRw6KHFphw5/aw7ED1LLzDH9pGKo7ysmMX0T0rJWxuL90LW21NIx1WBimrvZCOn4AvGuDaikUIb/zN0Yip6/Ks3KiWzLMDXWldVY+O9gYfjmaZ0imSqdcFn/H8bmnn9snX5ScknBFuYNe7zAPjLTtSbC7HR/Ly+VOIZAei+tZoj/mZF9XkCBPhST57kRDu94T3sFNJLw7Sm3vWq8Po+bIGJVf2XvrOG3FC2wa2a9djUvAcy4VizIjrO0DnbbeXxkAIPjxFirfHBf8cWD4f3Jd/fYB/nN9Z1NR/NwPNl62AuOhfVrlLYate8ZjZBFpw8kMQvVgtTiZcnj8rZmJTiDUz24BsNpbzegGG777mSWdSzt6fJzHbth7zW3YPCZCKV+pxlVzD+IxIajofZwl5s3c+iYitF9X1lEPQne4/u/QDzdAWxb1B0rn9BYS6+1l8yI06UF5buxYWhwf/+z+cBMM/qT7F1TjmPv6HnKG3168OVOb7Uk3jyAr/I3dIra/6G5LeOsha/Wu5Lyz9LWsdoQ/LsGNnS/HGvZo049uyZreP8c/ysl2NM2b6CbB8zzj1fzT9nVzSv96u2V6R7n4ji2fYc6d5DxXLdEEEK7GzFb6HB65ji7eYSPNLeoOUKsy1LD7UXR4VdgAh7hUtmkvay09Um+GGWBFV41N76BEF3lL1+Cz0veOT8lzw+vzdsh/3ovJBQuRh2wZVN9PkbwP0kf17Ez63rnNNHHTvBOtERoTdHlDNH/eNwR6/5rr3igAepLNeNxd3SmUOTc1gfXtWjsMdIM+bvUb2o66rm9ssNOQnf3IyleDSXVOx6LkLll/Jm5pfbH602beadh0QfJLnNSsjPtnIcjw0X9tN88PBc1QB3LvM8r+wdW+2u7ovcmedkfsXO8DUXRK3ifHVjGWtAy1s8xSzwU/L7jegkeijcTepbtumK8fbQvRXy8cneHoBPQdvsHPhv/4PMxldEaEYv1cxJn/lAIefo1gIuib4FfwLTBJjZL5nbrki5Csr/f74BnM7MDzY4j0hvdeXzeNczMNsd2K/pjihK6MgOLbfNDurOC2WVYB8QU/YKWwC4m5Tof9NXDG7mwERZdffIi7/qb3tXGS2JciwPW4XQHed+6YeDpDkgby1R46Dwn9sVxcxyO6pE/ly1WjmW7Tmn1poZVxXJymzfaWdu9ZB9T+3Mofy8XuyVfN5BrgirmPRjELbk6sgrzBjiu/yMHyMk0xBX4xAUjKXdVjcll/kFWyc0Zl5L28SEKWZfewXMdCtfRxBE9sBtZb7fFh5+H1y6Uix+IG/0EtcHKKQy+gqv0xlPRj6gyKn/jN3O0/eul/OaT8jnV8DfO/evsLMx/NyhP+I9T/Iyfh2zVfrNRk9X8Wuec77r1nb5Cz8ub4wCxdd7K778S8hVCqlvleqxD8uYcwOsxSBdPYuNT8+u3Snn5WmRMsOuHn9XT+B6f48U2D0pM17Znvs36rv1489yNQPfBSudHB7rZVccDzkgqvQdA9+MkEVnrtdvgLkCd79K9czEm0OyvR3g4PbtzQ2S91Dm8jw290nar7sDmxOohx+7SwV0IKWfLUrxk6PfCCtffQisD4OR1agDVnQqbdvrpa4RAfVlyKEC8uGnoGKf4zgB5qTIt86KQqPI5xvA4+n4GR4uIrrh3GHfktdJbIWpXEmbn/XkUMFrvltt3QJZLVN7avd1pYekrL0T5D0Gg2OQsL7UwHXS3XKZ6cqm7ddlrgDTzk/8I1+bgM8162xG96tKtYnOdR3ruqNGZt2HFad32btHv8rgnIPH2Sfd4Qq4TUH3TclfNzJ1f/gL6toAbXRXLntjmSOFio+SRnrTlC2m/kwof3HEl4SJOplC2kE/kudIS6oqKVAcAB/HdgI+s4dj33IeAq1IEZ+/ATwM5zc6/OS7/lJL1wSOCL28ac/FvsOh2m/ZiCIMUjGujx4uinSaafV7uITqT+X1j9IV9thb2l116EVcF9bt2w140vwRkymFdFrPFNYPx7l/6Mo+YxjIa23Fhe9dNa67+CB8AszffeNymr3X1thP8GqvzueWiLNVzDpS99/M4bmTPhoY7pupI+F1bV1+XtdhHnP4hcvttQVGVjQ8NxAPhI0yIuWtmTEY14+TOo8e8cVDinpBXwI/zu0ENLfvnF05N59vALfT/8UBTjTycflniaCRbLT4JweiNre9guigp009SASKVCnTqzrfZi08NbbzT6CnBqRI5aPnmxz+qcbslFUnXP1EkaS67TrxlTzHnUdXfGvfu3jW7B/veyfA1fwK69WZHtu/Xp/DrpeI216/9qQcfXe4qlIRyxBESmuwwKETf4NcdQZt7b5a891p9N7/ZjATLXt1kOtLMG3M0tP6UOQsHEXEt4EtY4Ka71gtI4+IuYlE9mL6kvNfczK7myN/Mp7PA+CTaX0HlpP7MjcE2h3og0weIiGb4/AnfeEYeSsuj+71Yw9brENbk/MNVZkVxBq2XO8I0I+K6cCWftaA44TtxxxwK9Nd2Z3yUlGV1QIuExcAOs7dLaBvcXnvIvT6Kxsf68WWzD2/0871sFf9EqM3t+V715Fri7f6akW9y/b62VbO86NWqe/KHlrloor76WYgRh79+r1gnM8ShVDJvhx04rmg8MSkv+mAci5nj4PtCTD+No+a6pWE3DeYSVJlct40KFRl/VvAUrQqwWH/HUnn/ErFTiIFItrw9SqOLf1z7CfA/IR408w+D4D7cf8BEd8Rro/WtU8UQaKMv/Freev0QXRLu0lCQ84ZqfVXuvXG3zsO1E1mZ3xdXxVb+Q4VboEOWXLkzGwvk8IJ0ueFb59VI+/GXdXbxdWH+mcNkn4Qx5f7zrZw2fdO+w4XaxAWnb7c3vnkv3us+5mrgEHCnfvDjwQ/sxG9K2EBn238o0q9F+Af59P6NfXydIvI8YP4LVpeT7ZVe6yt9ZIrT4AclA3rJXCVPPvi4W+4gjnRJnOAQ6MXGefIA1yppCAD9Hm7PYGH41/yFo7P3wAuJ/NNTj9prr90ETjBul8Qog+9OaKcO9bpN7xUENT1TapDit7N1lC3g21YL41n08LkHiVqMxRCTuCVMRO4JbTb0p3WYyvmtc+zpGd7nTW85CBH5Hu03N/Kzj51surPcd/T7XtZvd+8HmL42Rn4mYHLrGN7Dj7JJwd9rOQZD3hh6AO5z2O1jvAsWMPnBrpqxQOMpJV2wqwL5wc20mNf1I/r04+09f+CugCmsjJ4UXsC4EQCPgUBvic1T6NLpocWfPSzCO1cVmsH+fhvToDxP51p2YefbwBvzvjLMJ0c3Rn8JKEjL4vcBvYyPQOlXNmol+VuAW6yAWtSgn84whtadUfqrXbugiBFKg8dueQiyG2+2niRpLrtOvFrmbOyfc0wFnYHexejPpgBOavesi/bZ7nEnsvc3bvt5x3lDJ/Dlb6LZ85q57OyRj310kO+iYmHGBIfnciPPtBC5QNkPN+VYLczsNiVUXcM/oZw1FjAqwtCWdI5sv8GFalZOq1iosIX3bZfv9S+RyxKeh8Qr3zEpgm90jSdtdxiXv2NYC99UOBS4GYvrM1TH6QfWvjXHczz5hw+D4A3B/Uy7OEJOdbJV8aMyPRx49S1RwDH4W/8Zp771nk/o25hjD4avt1VyK4t0ig3SaL3uzlFntGN0qcU4/Y8NKXKcvpMl+11ERgq46iwRr/mpcZr2XPWimvlm7N2Fpl59dlWfp7nla0c+N+R/xW+vB630eF3W777h1Zbs1m3rOG9z3SOhP0MBQYprOusUj70AXEkmaxFto7Zrhn1UbDGB8L4Cd0pICy4BQVUdyQ0YOlTcsT4cbg8zMo5L7Cm4oeoSwKwvdIwuWXZQVc4+OxQHTNhp2pv46BcIyIFmKSO+wUq/vM+TyDPcY5O1udXwNM4vsHQZs4b/I1loBdlnHccyKhVImyKl2qTjDwh8boO77oUbn3dGZ4T1veHRukFN0HkgPjyhvc43mOmo7Mu9LOMzLC2v8JJT3AgvdLK5/Fr3ecpXa93HJknd3pl5/xsP+mRWuJwHtfFl+1jDTHBpig2Pn2nVPUqhz3nHZl/rYe+2xrc3DTCCglnW/55fiCQZG7kDjaTbpKfu3O5ft6olwEqQWxZbpWwBN5zxsPfgEbpVl+V9DptZ9qng+egQeLtoxM7JH0ctybAidqBS/zzALgbzjv8bGRxuX6L++rsDUpdJ0HfasR1445b9VagRhgh1xs2uyabhzxh+elWH0jHGwc3v8b6uvD60rmBIC+ZlQSJ/3ReE50G1CXlBPAs1yfQm4xX+JWzylv5jsiMOrMVO8yzOOUnL74JsWlc2T2RHIh+kZ37y/3wmcoavT18tCo54jmabc+qmTMCptk7Tztz/AK7t4OCnGv7PlEk2/KtMxXRQRRZvafvgvpxZTv2Qt/1H2mtjt895Y+94z24fqinIK9D8CXHqr634Pq6wAaxcR/a3+HWxT5en4Bmx8v9ZSN+HgB9IO/UNXBd6Y837upM7RvraOqUK7U+uuDY596LbHjkZn0OaTouSR6lqp5HQvReN1vUXHD0pgRiy2Q6nEFYNVoTXV9SLZ05K9vLpC86VSMf1D2T5Bzzswf7tmxA8Don0vWKD8RmyxHb6mC3fdKeoiTK/5e3eK+63je2oJHR4ld2/fcwjS/y3K4MfDILH500XP/3NIuT9UQHzW4NI9piumAZJR6s8S6tWq32Qige87TYMSczYYN0G58IXbcCT1Xob+blqtn29RKjhEvKganrGRbxSXoYMgG86JRwbThlRtfzXX9QVn/1/6wcybGpWja+TBb2aXCZMTtTfjFj6W39iuq1HweImfW2pXQd+wI1/nm/NwHm2dCfvwG8N7b7KAb8eMMq8ZiUvfH54rBeryjxx8X3W10jIVxH+2eA9yBoS+MDS+ELplsIUfcDQmpjC5ALeuxAUBO815ye7SVd50Vx1GsMMN2TXm+XsccQUac6sKXn7sMWoIG7rbxiTLZgxcFDkD7OZlvx8r1vbOZWNwhKYjnqHg8Cswk0afj+tBRow/0yuxSKftoEmRPr63ZtqF/DBq/5LS66sfw4L9gqE1hJeKXraDZuSb040IOjOMERrxKUe92HHgtuoHPGzkRqd+yUKyD1an5Gy/buhJrtmkFe/Q0EiJk7KgAMo7ydFVikk3ZXQj/w1VPvV+NvBMOrN45jYos4SK6nTc752r/1+m30jQ7Unv0a0RhnoTSRvpg+k30sn+PnG8Dv2g/arGzYyxoAkSPBL6aIHhzClkgEj/mD6UwjD3mGbTFBE5wHKiFSqCV9UWjtfiNwuscFa8LX6cSzKr7yecOv6rt6zgfmuofd+p1NejAJ3I7JLsaoJK3shOFo9uToD3/wGUF1zQReoMV75s9Q5uVd93uBPyy/4OuDSlEI2vmIIZid6VdDMvgqfOHzCugbRoWBXLDeC1+TZUS2VUfdjo5BIC86WcEG2UXyPgzFkR5Pk0WA3bPtIuKAb4dZ+/WDiA62YLXG+3VPQjyoDeGDlNHNRzudQJnp5wHwdEIXQd+U0t2+SB3hfZJHpPM3RnFNhEMsReEiGaQvaF6tpbsLXbVaPVxC6+GP0L12PLvVy+IMchbLPGH742kFqE/RIKu3Lw9zI3MD2d6kvezO/NmGePiHVmPZ9vOkmO+vwHqC6ZHXPwHKea8OGmgDzAkj/NHOJlDmNs1Tc9S1leap+feXILKr7Olh11pSocCNrIiWjvFYwhaVarFwYT8mPEnQCnO9PTzmkcLn2efRen42hLhfXPYqjdUO6nov69gC6JfjAKGdyM5wgplDo45yW34R4R/mnDSQpln+AW2OxmmeXpbyU+xjPJrA51fAj8aVwPnKTOFrc7W7a5YiE31xBBopGFdjBGres/eTRIWmBlRvsPM4ZS4PD+BS86wlYNQCmnvZpI3EOQEapEfxQZnt6l95Vz5YXpVweodwEcMeUhF/SABZ/WMq3UaJvBIvdpzT8vvc+s+UCVCOwLVecMnU0fYfv8qtYPkjOt6yPSIfbZoAA2Zg9YeqCSKDcA/gqLKeFnzClxMWT/dFFnecTc5h44tz3vkWJUqMFDGjW8pQuS8dGqWn0+zBs9XgAZBt8Y8ud1GyJTNGvtqlrgr9O4N2rMCEKest4APzUOZyo6/Wdzl5vT+vhY5c1iWIXIJOnCWPv08oXejUs/TRFLNc0VAXucIkHwWQCvcBJOzHPJ3A5wHwdDyLoPYpx0ubzgkgGpJop3ZH6DhGzjPtIp9wa0Bm76XoPPjploP+rP4JmtqCqKjbrncKnLVD+pmtCr5F13lR4Md+t3T+6w5B1/X5eOqDAnF1GWzNEZ//xceDQXygFQAPbgGLm7gyiyWHt9M/0BUvR+Otxuf96xN490AzX7HDVf1VHSc49kNAFKk/APT9IyW8x9Ne2epW8W1TM/wdJL5styJ944F7VdZ1jI5n/lw9o1U11t/L1wxw1Q0C7g6uZXF7MXRilvJEnftQZiWu7/Y3gsXBt/rBf0xsZQlUhnZGW+yGiKe+sqh2n/hPuZdoidw26m8I6HLF/rD+Do7/RssfSJ3A51fAT3eCX7xcL7c5rhMmeoeH7o7bRQ34IF/Q8ooLuTHwgCXT9Ra+KW72cBNWi9Zm1av36w3dp6tc43blLO/Qd/z3Ojyur+bl7Mkud+IZVWzuzizpYBP4yO+bgM7KdKamUjrX33d4Xe0P7CLr/0+liU7OZrB1Xu8X9tcZjn3BqQj6nh8EPNmWf85eIcgucheeSSzhmQr9ka6dyQI4xs5qwCiM62c5FmubIGqW9M5QHOiK7XsCZZxnqsPR9+RnTP907PMA+OT0f2mjkXxSsEG0j+v1ZI5+GZ3kH0Je0/UGXLjiCm0XEuHop9Tn+kIeyl06YFzUVwhi5CmfbnQz0Nkf070039MGSzB3dIWf456tiK821tcA7u84baAINMmndAdI+Ry/bwLt5G0ayOd0A/smd+kt9kuV8S2S2m0tqzfC+Ag3yAt9ZYbXmdbFM/8aJe9q9mSTNbpDQ4IwGQMz+wRqqFuqqDK9TlT9v0Hhl394L3sQ4BI0CjStZpT3vkFq4BnbM3RUyCmyP8flBD6/Ar4cUQNoQx2vtIvs+7swkBM/uUWiXlRbhzfJcns910uo/Rw5lYYJua530wsJ0uvjm6hmZ7XocgAdhY4cKGkr78o3Zz23nNP1mUkRjYADJNLHE5hyg42YZP8dS0X3v+firg9JJsf+yIcT0EDz2Xpqr0s6yxrx673TVVaWPn7wqnM47M3Som854qyNGPZxRSCQIGWjH7Pue+AlY+ZcRfHRgTLQmY/+KKYeM193KziSGtZESrPIqUpVQPSmYjX2G/9GsNyD/J+MYfk6jd73fumg9gjWHZICN+FT7j9ofL4BvDrp2lBsqitsxNmw6ySPCq7P6EASCCs8t6odQcrldYxGSO52gUxlI1M3Dd3i330FtUq0lul7I94zYMl6e8WT07PtLEMnW/IdB3xwYSPxV5m92JLqn72A3U9jccStPAAyyssXjJ9yIvgc1xPIc8r2lsGHL9ATe1OkuDNLnP9tD78zoDWwjnq/qN0UX9mLfXvGvqxIra2ZAQ3bWOSEMQDT21xvIPcZU/qlAT9yTshV3Eaf1wMPcuaLheaTPROkhGemqs70tct+phogvDVUC7g+lWwJJ2dogicj/tykf41czh7NtXrJtGwaAmGhM5U0SfQz/D8c+zwAnp183zyPNhOJyFFEW1leJEogdYfsh+vdeaHcyKGwoOXll1Y8ZLQKrl8UrUSnV1rry9tz/bpAqzGAOT3bAyntPDpjX7HEf11Ds2b8uUpkczKKMdikTY6aGntloDLfx/7qBHy27RwEJf67kj6cA1+Rzc2XuNiGGJshlwSEH/u75bJecXZ/fQj0NiLE/vaA6RdhQ0qlGDKFv2Rec+4Qt9eQCbL9pf7HdAYNBZos4tDrwTGyByM8Hruhe1rRw2z1pOu1Li8viBt1IIkCN/D/MqTM6PMA6BvAN43rjjnVz5OIsqX7f6EVm5boaYGT4I18IO0iwRSpHvjk5nVSKIVgaaQeJSSfdCBIxx70+RGU9FV/53Q0gTwUetFxzZcRbkvn/Of+w9YD3g4Qw3yx7Z+U5gNRX09tX8sq133Ss53z6+ArUF9TBL4lRT4E+BZ2uPQmMkleReXAJVmOKCul2VK7jm8l5cO/ypHvHQd1kOJEd0mtPscKrF/+FGBg631GKodTuJ/4tfw6w1zDz90ckdXPl4Vy33RUIbqXzR5LPRKeQKe8Bwb91ZXVfvCJ5vDzpAcPdb7SYCNWQa9xNFvVBDr0khwOJ7TyEfuXZdkMn78B9A3Ade++N+qZPvZlXHmvFnmws4E2KZH/IRcgz7rRqhYHZL6+7lvgwwVg3BuGZ/hytmMGKk87Z921YX/GRxaSKWHr5hd6mU9Io3dMGksxe/TuAn4GTm0zBHXEMvBf2awCvHPACwc2mLs2ezXwjczrOR+1iGP3Ps0hPjOBeFurOLhbEn6kklz3HqbCJ+yefwI7hFJe2+G9oQj3t/LHJqWfGL31lSiihIUPJd/r8OrS58oezXVBK0M62MEAAmkgyHKy+9FflFStfY0z0//kB8Bo+KRSZamAWwmNiyLFLGqc/5YO456NXORJe4REBvy6AFn/hPw8APrG2O+6k83AjlpDPBr03UHhdd7eS14nmqGEm1c31tj/5U0/iXPJ9wt+zv66RVtR9IwO4MC45zI90shYoYkN/muNHPHpwM56BHt0hY6OSC9GqDxgKD0AlSfewZrrqN4CHdPe5VF5FitO2sGHvaqX1+s2vDwFTLbqpAJRxwiWtjUR8V9s9/ZKcfUfthqRwnuo3/NGKdaebarix5Ykx33v1PtNqRarp73MpZ3/aGmYUTnGZz1gSx6P1QLOM44c7nnGF/17etNhqX/NXH/8rv2nVQB0DtqXL8Eddkenv1ymfjaUT4YVgPqntUm820XF/adcH/2HgOLizyHo71iSOnvE1MEOjn8C/1vG51fAvrHZT7f3wLOEuL8FN3nI2wUb8CSP9QhZYFw89eFv1NHFfsIygFtN2YnBzdDd4UQ7/8BcI4RldffQg/1KE989Th+3s07ZOvGT4za9UWYCC/0qNY8722d95Pa7LaW8trZIG2bi7wnNm+0J/OuNuNjVUxtSb6/+CrQ2JCcvb7GD3flczzTYlFzZ+J5Xe5aR6/SbYw3EO/urMGe4iln4Rm0YkDdSTiHwIGfw2uuYvA88ZjqLvCa0pL16pJs9PHzdHzj5qun6vgeP1Hrls4j1FQrUc0ZHOeNGd7h0vZ63uyH/Q91lBv/2A2DeFI/OoyevE7WptcdinwX8OmfNhPci38NFd1MM+pmz9wNl+M24rRYmLyA9For0IKSzzy3SV/2RPUvPniOvWXSwz84VWa4yIrsBwh8nX47yqo498U+JtP57O267LoDbWl+2g8Sd0nkp6LE7tjC/4sh9Pa3pa2SHDF/1DHuw45P0gcrmcB3f3yjLOnX9xGvcVmKlbQQSvF6bQCN6LXmRtefzs4k+984f4yw45KqbZtSck4f/hnasUD3dr5mXo9twynFwOnILgGEpW7lG3goUsSy1ZJDzGbrTeJrrHfCXK2Vf/du/AuZqfHSe1ztFXr9Owy6OeYO/VPBRd34t1Gr0693NlCBm75lVMuLXclogOPmky9edBE3WGAikAK5bgqkZkW2DXqqr3JWvEhFB1tlakRKI71RDFr8DSDL4M/XLBNflKCGZe5etAwxxzvPhV7QAPCkY2htESI/9aj0vWPXf1dfMwxivV0helvQGE3G30a+r/BmI9puK2GN1vVqhfm3Yb7jF3begLWo/CeaGDMaWuc8y6qTCg1R48LhXOhHpNZa/DUz9OAHUI1mecUA+PI800UKhyetPhWLU9ICEFTB2rCj132M3lHJP4d8N5NfCUaLVofyhbK97owbtIZVyJLxB9OdD/r1vALWDeD06f2y9OQkv+0efifLF31EEVFZ4mgzngzfyJRdHCg9zxutnzLccFGDBB9Jch4Tqx9qmT3yga+4Uesk45yMKNbZk9Iuj2FLrNxRF00nPCwqAQF89vkCkVE/Hxue29y+/L5gHvSArwW6zNojcRv+pkp61UOnfcDRaVejjpayXdF1tZPvQGiQEPMFjrp8QezqUJ3CH/BI9+htNxvaLv2kpvvr/Y7u2hjiryiITeexZEc7QHnXMO/OIZ8219lZ0jemdO/YCXcNz8Te2Xx/86KTIdr1PnZzW8wanrLnnjcW/G8j/XCUP99x29qVV60Y9IMg94abDv8f9730DqJPNiUdenk+AyJHA3pEnoo0/Nu0En4xBcKo9z6nl60+U7WfnqPCcadFYkDSmiXAyWuLR5x7XF5UWrucZg0S5fqZGxDUQK/RUvX4CeWq/Sc7Or1pT1dfI2n48LD9Td7sp3HV71Q5onmx34A9Xct/ZflP7jZY91e85Tu+lXRcm257XSd2ZE9yWTlLTPUxIdPjlc79iP+mgz9Zw3PEu+j0Pd8I3r1K8x8rX1eo9vOYuOCAQNbo6P5aS9/YBnVOSvKReOpWxYoDphvT0oodZatGfGNalQayjy8oifwBfcvyJzrLuf+sbwNhFT84UCevdQVSMoTdH/GGrB5+U7NgFgbtcb+3xwBdf23eeL+xtryGdMYSUg5cVM3WVrlRoDLpQPXsRvuWiP1U88mUPNmi+xY1+FQxHUd5zgi9WQDcXMA97SvRbgviQwvcT4E7XBcq2fD/9yD27Ld3tb1pLLpPtV8vqnHHefBmun3I3YPRDUpFs8slfiMJu0nlJdd9P0PVDWbzqmHKbu+WsW3+GXnO4Fz73DV2nlX7RR4a0G38jCIFoR7KsR4fTeKI+W/h8kZ9v4zpmlxiALzTkBaxGfAHcY2N+Q3tY07h7y8b/V6pls/1b3wBydd0+m+cJh2hz1AvlEL1RNe/ClJIpgYeshl+kZAPDviWVdKjXmELkoLOuJ3Dex3nU2c91eNQfBz7s+TYxvMOvm2hklTtdzS580Bzufs7wi3R6oRzLld914r354pi+nnYi13viL1S8eZWln7ygnX2Wc7WMXPsKv6jV94V+BFvEYz30foffMIwCl9uuE3epkgdMcXS/B10XSes3u7E7RyvY4M36DaJdr32Pz//ESF4O7bucm9ZCWZTrM+qexdCEhnM+NV5Bes3g20DlOUJ2OSpo6CzG/aNcxT14h04p3Nk7nbeDjjzUeKWhkhN/DFgqlv/XJRb9VLMvXb71sW3mHL4nXOf9od6/9wGQ857l5YlSAsdxFxzoDnAcSLh20hkXGA+XdjBB8njSLgvcr0vaPiydANTZrn76OaSTNknnUIbbE/Cm4fmu13T35Gph9w/wgs+AL/d2cwkBa53SsHrRgS099xcxz8sAJXE4Eb7vkNS5s4AVhp7gubAFg0bDmuwSm+wWFyU5fLrIpyPwCkppYvntr3EVGH+9FTnx1vIP+kDMJ7Q3VADojn2oe3lP3fkdo7UHjjkUKRsTDrel6wBXrfR+GkzYh2ZQlzfJ8haXde+vnJ2ihykIvbYSkXooF0SGkAphIjjk7hxwHvPXPbTlRGVyndt4IMgw/J52Q880dFL95QEbXkl08bo+1aHXLWBC968bBS/Hf8o1KAZu13FJyi4vmItqBxGkhVYqMEkda9Ia+8Pf/95fAccOaWeHE4m8fdKOCdAiJyp25OS8Yxzr9CwKNSnBwcNWtU84SLgjKSC6TtmVC4aBm9Ivsmp45N6CdxCVXs0vRCX1kH1w9ILfrFhhnYt23g9FDbbovsAnwCH9+xyqm2vvfN5FzvHYTZ29C7zbjTts60V2xyRdHB0voxzZls/oZL5++Pqd1P2wr3zEvktSs0lMyrmN7rMF1+VpsKNeVugBgm4Xpf7/fO4b7llXz9C0MsveWLhhnL0jg/jwbLQVwe3kDefC3Sm9nnS9etAT5QS8BDj4oEdGSYdBNaTrtWbDu0cciriDdPf9LXoZyd/7AKiTxMlDXp44bZL9QVR0oetNRvAT3ecfIxAcI+GBshsLzE4AAEAASURBVBXEVEwPf/yiKcpvKB65KXCTEDj9SCr1XrpnK/PpofxzjhylN8mINUD9UkdG6/zeAh40nDvJdqPyHyCAZClo9KcAr76iRvSrBM2pnusre9HTVYrHpV/ZlAAbsrx1id64wm+68p/6lGPH27dOcOemqIKfBmT/ioO6TdKOl3ZIP3F3+7uL84IneuovTF1r8ap5VERmtqNfHl5CHxGZY2/Do7v60MGrX2d3Hcycd+TotCMB7SU5eqDy8HTChWushB47+pZSKcu73yuVKZcxDH1oM8LAK9XTFM/2KudP85WN9ff+CthP2ptOXr4Q47vvL3NvCHAjy3pq/eGol96b92an78pyWyua53Ge4SdkSXnTSZVcfU4Hhezo7mhKEbi6Nhwz6cuWqvuRbWvCa7tuXR5+b+UxL/Nl3RvoE0ysjnH9BOZUSlnZpBO/Y1O+8+Eg+UKu4Hd9hVpl+6kIo9UTx5ndYPdFbsptL+b6ffbHyPxhvCJwTD8/BdiH5gPKBF9ch4+nUHPfrFVaMEq0HoqefzV81l096eeIvKJ7djTVtlTtkx/7qzWzVPTsO/QG6E3tQiepuepLifgVuxw6kNWar4MOUDMAHzZW9lX8u4El7R6L6txDTu09bCty/4C3v+8BkH10e/jnCR6NPdAdRVn+PdBV4U6wBhJue1RmVbn012m3vRCSQD3sCwl8vh7wrpKJzRkr5NqnfHLhEtL1mumemBmOYoTqH0LEauqveadmLKcY2KqeG46OHOAt7vyOuaPDEw2VBGzl4oPHY82HCyg26Ttb/liv8WS7hUI4jxxbuxH7eXaeL+s03npg3cX0/5g2yhSohY89C2R0kfO2NxFzuI5PkoFPXTrgfTrr5KlK54fytIcd7eSepuD7+oKp91eb4U4b28ha8VZJHZLo8FTNCKaN6/6c43bmrY+vdSKDo9q7LQVHw8skgVKDCs9tWR/8au3Q23mmTL8Q5OhOp8cp+eSoeM4Tl73/TaDYjkt7WC/Dj4RPmv5R2L/rV8BP9890Qa7Pi59rNljdxQU/HOvkg/dBgw2q+uMCe5B/qN0c04IcJG5/eWzoI73eiPosBmSjfaV3+tpQL9y9Wh3g/TYXXO9x0VGR2jeYkE+2jMkB6pvkqt5J/RzKtrrMvqf2tNKc7MEcy3bGelz6E1tcDd8vhMoBU3XrEeLioCwSamwIocGP/WUJIfLLhOcEUUZvrd6hbHHEUzSYDLic6Hn9q+hUrt3bFiUXrgvm3Xou0jZh6td24a5gxYiv0ws+AEVWgjXsgZd6TqfpySY21erOXMQZcmxv69u/WAzpxTR19HCgAHUIrB3At/2v0360t6zp73kA5AS9ceJQxjkPo3n4EeNRLdguklSsbTIeseJr9Yu0W2FvwfXNpnbI4K8fbrzLv05X9pphcJ1p1/nOLl2fHza+6pA/GnT0Wd03xuIHBNUtLwm+JloOLABvLL6iar1ESPrF4RBPVZps1iHpWPzCPTqchIIU4moY/oGuvmHXotWuMTU44tX3kh1J5c0e4v8b33hUznkw+NRPJJo0n8PMLbWnhbGw3U8JfFlu4zSAJHGbAGAhX8kpNJSe0jGQlLuywb0mY/vG+a11YntbSVSkqrh+r6oyrl5HJmWsLi+YyJC9POKetIhkggVk5drWKWubrrgMzPaB/BIQGfyvhYxZFndJVbYzuH4o9dTxVrKnxd+ILxvpz/8VMCcjrtI3DqdQzRe+CrUi1LxVDvBFg8AaJxcP8lapMxD8yLg81FM5NjeFfcedpKbHO29zDO99Sf6+urhAIeUIHUdPf9sE7y+hN2ON9n7M1xlpGtkDX1Ccy4uL0mOthLscLr9sDmxJcpCOQe/SQRAOn7Tqrb5hi4BzWOVoL9sVOX5gWsX7VRydUadWrUsa/MkuoMADlhX/3x0Rr6igb2/Eh5Q21lu1kecdFH2kVT5sL4EOsWOczv3KoTT5IR3k+irhKj4R3zc6bVGifzmKsuz3Pu0dZC8tcLk3xvO9fooMvewufAoHoXbcu48949RfKcs/E60O+PW1stvEulR8PhoCsIJH8jnlhjXT1Rp9NTTVHZnwEpATZrucm/y/JSzA/jsb6iFnuoMFLMsD8M9w/PkPgMzZTwi+pRTwePR0lAKpe3SNPzJceTY8za2bjL4gqh9Zqu2X9RX3SZyyWgx6hx8c/WahPsY1Wm9wR3QnWpF78Iae2bM9tx/LcUh2eOxG9Zcg1IhBFQNbZNGPsXrM3HPSFLhhQBoNFDx2Tm1+wiu49ytctp0Snl6vEs57ZnRzLOffH1diLyfPmb1qr14tcx+0ucaP/i7jELW+asfn75ayBM7rm+ehtejgva7KV1g9FYFuZXJx2XPBYYP1+IJysJMwPEPLiRlLnIZG5qQRJr3bRcFHv0E5GRPVW4yo3wrr4a+QRkWUKMKdu8bWdaPZdejgbfWi0iE4OUBWZ70KqeSxqd2xijLTgo4FGW22LXSlek1h636u+1dW/CLE+aVPx5FhCl8Y+lawPgTWFfPwB+uhnM8iuI+IqWSlHXtxCv5Zxp/5K2DOJJKZZxt/l3tA34927ss+SsfBkeLZvMBbuD78jfxxOxm+L2lW64yHOdQH0IGs/axI5Fv5R+659lr+XLFYs+O85FuipaCGFQNbFF+4jmVvgY5pB494bnCxt1fQ7Mv2VDMHZfsPDAPMfhqetbZidOR5nKtloIZWWV62WyKn2nv6ip77cS5ic02frxCgkM6w0DMs26SwR7AfSxHzysnudz3jGoW7BZ+O4oheCXy58Yn9YFCmBcLsJUewuw4Ecgg3sEvIwQkeeQBMjlpf18MRf+wNTJGoE9s7DP9xpnyq0AT1sN9RShytQP3sZhqDfF+Ohgb2VAMuQvTThB8YLH3/WQ+ADPqloZO8PxF6CBN1bJKA6y2sfdI2sqjnrgW1LpVef8v7MDARqiivIw/tKUU3EFbOJXyecYxee6i4RnpU+nR+lNIdteM1yxu93lCfTnNOsTs1HycUUs9xvdXLLrddz+PiRB/a9iQ+VOSrBB5VqtugoHT7qnxu59z2qlR7QULjEv0FuicpeR7KVWleK1u+cVRk/dCnabKxB7pvXXP1k+dp6OCCKjsJSgbAHTf0M76WnjeA3JFW3qJkvDUnQUkO4thfk9GOKBttnD8rYWovtPL14KVyP1vIeVw1V+/O4notnxAZkO3LngHUxP6+4ln5SA8pwCWoZvRvbSynqDk721O5QJ8jZvwfapWN8mf9CjiutDZs12/N/0ZCgfT907fM041wgrcWhNLzix/J9NBz/UB2cEycio72KpYM5JQwGdeICX7DgBGp0xE6jt4sjhukX4FQnHL6SZPN0ns5K0DiGSbHPEdFdLiveia3wt4PtkCkIiPR/B0wHvnRSKl04/uFas/UuVPacQ5KS+LHt7drtRrPKLJdVnx4Qt3YUOl8xnmFw/C4vkFSfked43SFn/mO/Hp+/DxUvWWEIAvUyJ72D272OkXxL9IJPZNOnEg9tCOlP91UhU8Uc9oOsCskshEbWnXrf5osbuYlEP8zZSHnijDUtpyhemb0ziLvPAcUPesa5sd5YnM/Xs8RxS9T4H2CJy91UhWsnchTdf36Ob60o2xEyluFYJmkIXOdqmXlpUC/tFudqFny1mzb4sdKEGR5RP5Iz89/AGSweXz4JU+PGUAaKXHfaDu0bgrwzQnwUmbmloC7SUy22PgovSxwD6ACOm627/CaiKda6/c7mHVmveTWMWeN9nHImBzFJrameo/Xa/DBAjMfOLIdR/wl6URasB8lRpgQtmAxn4aXP9sRIqESsPeqxaOegPXjQmjPQJfM9Fe2WK8PKhgyF+sdGaarnl9XNa0gwmBKPNvi6ed15KP10jiUjy4lPmVoRgGrFe4pAeBLEmYlwyqJ36vj9djII3t4OolcMoBAoLVSIHzlDbt/msvx6kGhmxyCU59UlUbn076347yAerAokOFbYYgVGee95RRdV09YSvNSgh5ceJAFcHkIy5EK4DZZmeernfC+qtVwkOuQ9HmteyEFRjrp6RmwpilwGHrmLaX+TWA9TTohbIc92+2Gav0Mv9XVzwD9/AdAbYbdgPdnsE33CPC9FVEcRfZ7f2Qfc/enDCzSkMavdWAKcbgQLO0l1cvHYlTNnXvWirqH3bNcRe7zB5Jh3U+7auDFeGngcQ+PE1Jvi3yfBzpZGZ5tcCFrEApZevyTvUvL/qf2xExyLphtegaPHVJOX8EULEZOes2mQrDn/qZg4c92b8lrS5+Ardfs68m3FK+ghGxDMqrU8139jqY/9zlhY4hwwkQIn+SoVjtym47OJFw38oB2uuaYUjEO4J5Vlat4gsucPzzq/Cln8IVLyYZ4VRXHkV0eRUaFoa3Rqf6RIAFkwok8Qny3KQpt/7EzUltH0o/NGeklwLBV9dMjnYfAfZlo6MCzdQAfC9tCf0yg9Pyz/wYwD/XR5EjeJ/U/IRMk4Nc5a7bNNnK6os8mPyde7PV1weqdCQdR/G6ZnXhGoJR8aQ6adaYXXSOG17GuV0T2qGNegWhXbb1YM3pUeZvmJeIuIebi3JzedV2R6HUnaSp4pFuF8SGVtS3loOOPG0SVjg6d2/L5sS6njPKKc2a67HjV8FRIMD+y7bFJF5CubydNDFsj08n2lxLdXukZI5tD+ANBm2ifnYMjAcdS5vORbSXBsmt3JgY9e/vM4/6SME7c07Iz5XTcleJ5rm/y2BoKT3AZk2ND8DV3PNSw7wtVtJPKJrMVfKU/z0FH7lc7ELX08VPAWmpqFzm5B84UkqrUO8fQDYMK6CAvAYcMdxwuNQ8e9K/VOtD9FEfZmD/7G0AuZEn0F4enUyiK6SiO2AjhBCF597jAWs9Hdt0mav4Fy74Z4w8QRPEPV2HUdFm+/mN0lJljw/9MgwV5zM7txzhokhNT5J7hyPmyhyIhm9F7OGMlMWOu/H2hObHapCMPw7I0MH1S9efqWqEGgUg6FbbYwBjzUh04sosczllfMnzFSSHkV7hSrijbaTn8xt+gDWKeG2pu1+1cTMMkzsmKoji9Xj3X7lmhPA6l+0bO0OovMmsrdc0tNiBOMeuO8YLTD6eVdU7cWU7o+oLDw9CtfIot0kl5VU6ldA/RT7Cqo3tZ0aWGmeSoB4NQrxznebV2fedriGrNfR0rN17AahO9hY455x6n6MjCpX9rsXMrEPyrIk9nVVZczkHc2ste/E98Vhb6Rk0/vZdQVnVnRLcgyLIDfpbys78BZFYaJgPFt5WAK0CWDk5hnPhiIysx5KAj5eKNnASDoklM6lPveNtOPDsTQuQBp8AIolGfKPYh/dQB2xnovAIMSJjicyE++EokLv7XOoTvlqRVyZfK5VVcVXV80WUmV/flfhzXy0BQg8PSbb0+OONzOvmu7F4iFFiajIun6GE2OSd8k6WC33Qkajdd97ltO/EEgVa2EymOLT3bddBt3iJsR/CS4FLxCIKcpCKUU2DYI0ePKbKGh/J4kWJIh0LrAo2ksfabcLMTzX3zIj/3I2L6u0i938MeWf/XKlqhInzZXt71yiYPrz3/HGFhs9ctMY7PH90nRuUaq+jhJVue8or7c/NxL5B5TGigc6E075qfEfqcCPZarY+J9n5x/iaQfvXwF4xbCgKBmqouDcHUM2lL0M9w/sxvAHcDvBzoEcDe0bgjqpPd+PsGi3NxzN2fIrBIQ3Lim5zNgR+a5d5RZ0LLWDMKzuEIv+iJv1d6tcG8a//wpeV8cgbBd2m93a6cVLqDyemLHE6OQuikLeCE6k5+lHC4F2X6YQ9t1GsaoVz6APwOB8W/gdupXS+lkjnZGoPHGQs+jxNT94rXH3hktYOkO3YQFKCTkhcSMqScM9gj6mi2x+NBpR3RmUVRxY7eRDgPqpK2NLg3PGC30vNXoNYbMCDZxv9dsteT0uabxpZM62QfMVBTK//2vBhqzu0Ndnetuql9uD+X/A20E54AvHro+q+DSSQYDhlEXBcYoHQw0o9HfSivfi1FaH0G7bOc+8h38ADfEx5Sfrmj9PgzvwGMs/F0HEx8n6ebbpyPzn+dM7OB35xVDxd9NrHONtlc7WBB0fs/ICYHcDmlK023nk33gqVDWf5K4cn0alOgGyB6+80R/cQN5X5nnfSJQgPKkU45ZDivCJ3kCpviZ6ke6/14vgC8BJg/tBUhrUY9944Ot2Hl0uEhyIlVxMP3nPzUflgO+KpM9oG9IXOqbHyMiXMiOmKZeufvOCfBSTGSsy0cschxQNYhrbKWc8ygckoQNYsI0jjv9B9wZ1zwGOU9VYXhNJn7eUeps4ZSvTB1v7O6dAeNhWwNRK8k2bC6XOeSkSc2z2+dG15KnEBmLhKQc6I+p+Y7XIlHkz5M1+f8uVaOHe2gjrdj7OhZ93zENc9D+Jbn3YEyvp/3DaCGpfOq1+0TcpwMNB6Zv2V6Sg4e6cymW7guwRwNdvRY/k4lCRnDUQUd3VnN9p5HOC6oNX5KDiMzHBGj9hGrKrnDXhml3AhRB9eqzhd9FEGKLvTy5r6pDIG8igl0YTQOqJCelUfXMSjjG5nayZiZEK93B39rZkWWIPtZ+YKcSP5sO/ZKzw0s6DL9ys5lFrQZ8hUbeiRcbkvXueP8OWbyeRKgK0kORbBFjG/DMXbXBtAoRpSM+sMlllYWOzduvAO91Ogvgmbw+8Bl0pXTeBza3VLKQJiJY9CnE4Hzoez1at5/tCZ8RXp5H5Ugc3mSxEPWjKgVzt5hRc5YvF4J33bj0IqoSHzaVk/Uyur9rtIWwqL0beADOtSoGfOKvCnpOen4N4H8PSCZOaNysFChTg6GdxN+wvQtoZ/5DaCWyuAuly3gcbqctPhiSYgCqT7wIK4KOPcih7BkCbvpzMpcZDtkrYsQ0gPiGASKPKQsHSv0kXuZ2p1HDq0Xlr727kDpBO9XKCHZG/AyCuyOHMv2VV7B81O+Upf1G0enlsJraPpAJZ0othh6eqZr9hBkt4xkBg6fFxgEJ1rjDISSH9oO12rDNqepMYwnNl2zppbrFEC+S+Za2JL5pR6I7/sxhKmBl81a5XA7sHorL/anMDoiVtWzd8FO6XucR8FWb1cgE/biJaBYvMHRg83v9l3duVSjvHxBTiPou4/OKUUz4voudo/Vosm0ToggLXSpKkcLXucSFY0jqq539zbT54eeYOK7c9R51LmoFg9/Ok1ROxyLPnJfy5NK3miu/k1gsZuLy2IgcteKML89qmcBkUTvwd+r/IwHQIayk9sZkbAGRLScp9g4yA49z+2wfqLlWeSwD1oYs8qBlzYsgW8eItKBrNb2fa4P7Kq6k19h4ZQ8X5FHXY+82eGk36NP9WRMjlTTY0w0QZYmeUgDLVwjugrOvtk6737wSiMTSTTZyexpwC+l7yGBn9o3G7iCncUVs3ju8HKJvxBw3dsFwtYZbXe7KSESR5gKdPB2xRmRbRJThT13JjgmNkoBeW1BlL8vd/XfWOKsmfrFVinW6lEWeZb7WiwvuLJQbxWtMRCpqidI12sDTZmTScqBrjiIzduTYhNNM2BR5uo1curDpezKRy3kQKI5N74TCRHyBPrLQmUJP+MBMA8l269OpCwwqPQW54uTdpfwAk+49eumfn758gFF7x9GAthV4p3h/HQ5Y4dFFnJEjppjXK9I90jXD2rqpY2naDiGp2a+6f3QQCveywngoFXdq3jOgbNIT5VOXWRO7QkCzDvmLH1LN/GrHxpqElM46Tuig98TSZbkyHH8SfZ+ml82vvhP8dxuIahLT0Aj+45N+bYeqHD/uTKv5MrWSoVpuHx+I1Te4nwwlWaTE+6WD6TJTCc3SKT7pl46spFJiDAnynafcOEggIzAwzcKNg5MZznU9uAXdfZ+W2CUT/WSmQq2vo8DSriVOTPP1sBTgZNQ71Y7dMvzsOuD9qCtYfUzzGOhu2PaCwfax45Yn91wplJLtgvERXhJ+d3OstF+xgNgXuitYV2AFC4LjHMY0ObItbY2/MgNUOEGqfcNbZ2LnA3V5IbC+GucwITuxoDPWgecKufcNXXwZqq6/j6O+K+q4jMlUspbl1LefEAZNRo3OrFtyTPAzRgwSddVE7vX99tnTQBSrQp0X09d0fUg2UV6Mm7h8Ge9cwjjIA+g60zb4X+XI3fOx+aPa4od/ye7ffhVu+TGJqrzies3+FrbJRadlbeQZ7YA4JDVVXPF+2OPuv5YY/Q4tNqyhuRHtj0mPeWHSY6MFPeUCJU3nUN0xcMIxyo7EP5WkSNLdjvLx3zAENCqbGKVAITJS4BhUclpdjeL0vUSQ0eS/lXJ9SGeuDZCGXqrR1nkuqyi54ineXn8sFe5qHeesC5/4hWd9kqVRS9KlOiOABhD7gm7dmzApRq3qQKttyZyBV3lr3xL2up8CD9hekvo9z8AMl/JOKtX6yJhjeM+1TdJnDTIJa8OxywaItwo3czMi+wMOdoibNzr4OwFPqfIunPcwZ1jiCKpGn+mEYYiOQrqDRL6w7AJuLyqd6dPMEU69aE+tcDL1m2s2vxnHVBs06FZypIdHx6NBTLJTOi24q2PQRvOZgqcbDeFcjvg5ugPdQ022W0CAa/zkMp+ke621rG3S2SKm60eI7PWU4vYaNji1ws71K09omS552t67cJPXvXEgFuPVACL7bKutnpWuMq37V8pmQI76Bqg66GUJKT3Ur2kE8GuGXqve4H4JDOt7Jlggs8Vc3KCLs3aTw0VfVfvFeplveTUNR1PIcXv5ZsO+rr8NaJyCbcfqEepfSpzWahPk/ZB6tcrOf9NYMnb8iszN4MPeazL+OPWKoagoHrmU758amIVUzwdgvkrhX+l+fsfAH21N+fnKa5Hup0HTmDF3CU3gtUJTWHMKucas+Wdnugi0nFIPjgCBpw+wnnrzflcXyUrvsZQF0l2fCk0nwBC75UMYGpvMi7qCZu7zynwZWk4QuYaqoIVsKt0mj6IGs/g27aeCbN9uGsySIplOxEQ9nMsPWywuln7B7vilZ907HDrrcVnu958IzbFC0urP/DSGp6lhF0Ta92MWds9nabCUXnm2Mo3EPc0OGovWoN+SKg/KNSY69ec8DhSq9eLWh5Leoa4HXp5q8NsiXJOjonQ0xXItnw1WxFe8m6OFcEEvQRM6HOjcK3o9ss9pzuLwtn2tf+gmMcLdKbDq4bRZ8TaWi1wMOSomCs7NTLCqtAKUAtdqaQ4u3SNh9jy3HRioTy7B5oSbNnZbivKrVWoVeUq56zGgR7aIReQb3eVln/vAyAzY7qXKyZhAyzh+Lsz8QVUbzLuFrjmj8qNDnQthxWI196gOLRLYKbFW+sT04fGuw5V2LPl+nyLExlxA9vnvqVDbyAID46LMuCRKzixIlEFc325TH/wqbykCC6dNGRF7d5LRvtQ6AiRQIpU8JLQwUrY2eZv3+KNHsr6LKxvLLpZlPENfKVXzPdHYFtCbnfYAkSm9YgPWUKBke2H24NRCLcctcuWf36kzOdWa6cfSSrggznb7kcf0tHokuPAKw8R9w3k3JP7b+gsB6hsylA2YjgBrmWmE4rMiS7Sj54+Xug9eQE/Y4fiXPqCCzKZkbuse866jIrHBtRNXWxWQ6qZpssLgSOW1TbOwb5jyIiK26Fbsx52fdOF3GtY/YzzWOju6Jw4JdF70BTijkHX9c1Mq6wRcozmrgo1+Gzj/05ZlvIz/h3AW4sXSMPfgFt4+lCK4W3w28Fe4C1cuzHHlvNB4EB3cExkNTpjZmuCN+MaMbLWWLxInZbQywnoPtMG35s0iiB7re64KHQHZxhUpLMffGMGOeQ2OtIp531edhogpIPzZbHCOL7fzHCKIB8iaX6dU6nlFZ5uF3+Bxbd8LR62qIqfNhSSjo0UTMewqzbsGh+IYwTEuRx5Q1tnKN6W0vtyW7oOZLXGxwN2lbyvqq584K/k2F9C8vipOdEX7NXWO54r7kU8p2ZbKZPPDBqKzuS3HxRaqVV3lYEPeklQRWqThX1JMMEq2nNdb1xLUbvp+XExyCp+/0nnLt2yhjm9nKroJ6eoWSWT0AgcKl2xtRdkRQTs8m0wOrTXX1a6qENYhGt6L7XUa/26J4KuOOKHS29M+uG4BLQMmqx4fvblf0NYcn+QC+IMWzAvzgD2r8pf/w2gFszrYjZ1cQ6WPh9Ex3VYPAHT260CjXCDD64CaWE3506eVeu5IuTVnXsFKH3skbvI65lipH5nx8HXOz3wDQq1JOPUHhw3iyrv6iiYh/T6WK7/d9wL93ZiKtjNopwRCPf4yEnVru8qVj6oi9HX0+ASevXTXaCTTbxIjpaKuZCwLkK/wZW7cRt9J9Wux7x9+esxNDxnUmg//We2Ys7OI5T43S/7bUduSMQ03IuiIEf1nO72QGsnag3D01fkLtHKPtRXgKMyYT2XKf+y3vMKU0bw601HvSLjGQRX8Z4udxpIkDx4syItK9rZMFT0eTe92Q3HlZv67Age/uLnAiVvy7MWAHcqlSqFuD4E1nz2oCwYr5gOcW8BEuQB/H2OX/8AuFr4rfWtpzPRBUQesMhbBSzP8NA1Sb1qzvyzZRxnKoQdc85ygPe8O8o592AQbo2lPnJcbPKscwbvG7VDqYPjC8UWXAtXLaAAr3HvycW36QFcRZMvmZn/uc0ZdGI9LtQPmL6mFu4ot6VnuzXS8aeNGcEp7s8J5nWzQkkmfm81M9Ns9bF3qhwftfi4elq/U99TcgPZvmDJ8GwrXWvydZ1SrgiWCbeBy+x+Jr5Ks2Hv7sbP/0JumGMYAZvn0zOb8p4GKZnZqD2+qRUCdOqF0Cac0JNJiteXroc/Yv123B1OIadne2yv9//t4P6Tb96Pu9zo7hhctbDs95j6Nk/p4dc+ADKL2wtlSuuEKRpG86zhz+dGAWUWfTaH9XI5KLYEAObWB1zx+jP+jMhWxWXv2l7XdKzqB6r9yFW/Eb/Oc45bulNKZ+Eh3XGLrYGclLzm85DTUxf4hgmYpFPhT+mGahmedKP+ke+Zx8sp0+1l+QbYr8frwya5ezn+79eZwpiH1ow3S+bhfnyzrOdDuHq03YQZ8pplgn/NyBvEi0ebB8dUL6cr6BkTeNq1LZIJ9sktIZqaaZ9YUc84TH1Ccwerx/n4FaTuve3+q7wwjeC9LYitMu54M+Ic3eiczHVbR1bXMH5wTeglGKckesrbmg0fqf6D8h2mG/WetrPt82ag7Ntf+zeAulBuzOHY/n4yPQK3CnTnkenoOQF3zkpZzSP+6DlW2XqmZDdcz0s6i+VKMzZHZ3uPPURwlDsP6sz1RQtSpOhCL2/d15WbxVb45iNkN9Veh5hVYdWLkKGqeo5pUUBIpaIjD8x3HSKof3ulPazD+6/f+uEvyAJXBmWRFTH82LMUelSZY99teW3VcttXYRd2tHRms5bMF4kvvHkfrq+ochx77gkvDMOWNr6TIS45MO6tZ65mzf5HVibP4xUZmL6U4UCj5lW69vJYZUGfEaxiUcgDvSlaOJdxz6DLIlE96yGlp2a9fxulQKldy5X3soT+54kKldexLF7We0SIdn2QO0dr/eqDVVZF49nUITwSKtGDd537ugdqTS2aXwtHE+JalqfzZXDRQcFp3iF8x7GIOzwLrNLkdrmo/h2u7/8GkPU+7p6JzIny8opxw6+LsH4VNSc8tTpfTcTMp1Z29t0qJUJeUwKV5Bz6EjrlnRmD5wx1FqN+X2t3fJ17WRf+Q3AbOCBnB30iLao9A21foMUPqm4z9f8yPNuH1HCoHgWttlz3CNa0Gy+VBjnd1w8N0qbyrS1i53JUGINUhvyvHDnP+cWHDS7bZxjvh3x8ZzY1HIvP5Vlt+PmwhutVmevCM+qMc1DPeUXUuN7zdsOGQXjXa/6L75nIG5Ae10TpIHAZfOwjp9eutE5h6zu+kJ5QA+NdscOBE3kALBxgi4zPohPIIvQVlypz/uoMBxtdDY+0KWMOXVpHxszWe2mVRnfH3CjnCZf1jwCdcx4CtTYe/mJbCb7kl3PTz7FE81Q8pzf4iwuWuve2ySmgrJYp4e1AmDK+w/z+B0Af/u2FAUSOpUPn82KO9UYysNfakb9vllbA6/gJVuYi+7okC7hGBgI48sWqF9XWK3Gv69HD7LjgfxBmochI/WqxG/lczYdWlctrcy9piENqd4z86ULv8UsCRz7S57/pG6l9Ik3p9oBsNNbiGa5v0k7dnu86SfJl/5VN7rtkrpd5c/zKzvnvsnNdePFXiZWj2JLTJeiBd+i5AZ3fXvAQPFRcIZTeKWK/DOuwfQghDxXkOA0uM7pz12AHvElpX3r0b/5ay3SOPFajQeQRsfccc9yDrtrjezJ5N914wr7oMgIjn83Y19uJokvaS2eetxJqbfE+5S74nJLty45eAJQa3/sAqEWwEORln3sgdBp0oPTWz/glcQIs6rir6DL1qvVG8MslHxLU+mp/9CBrf9D5HjEiY4XDVzXV5VU9BRsOvX3DwfJEH7o7XqmX8jFFxY9x0m8uh/TennLLsU9Xhl4N8ZxA9LcP6Emov/Stlsemft1wUN9rcvoL9q9KikmqCWzxUk/633Ww2nm9v3qNzLdK3wJ04gh8b5O5IKefon0/dMdUOqcrCFJyHHiHJzTqyZgTDLjJNcRepUAjT2bkbevuWZeRuI+VAvYDbJRL/MlcUF0j5qRrfEUc32ces5zSdYNkdQWrD4OrSM7GFvYJnnmTX9NnBjhnb73X6QxxEEc2f5xEMN8kS43v/RtAFqG1oX9hLVBMdLHxn5CmQZM6kdbtQD1BXN8wwHQul8lH5+yZrRcKbFLgRQ7YwdPnfIiMpK9o0CL7BdkdD9k9z3RT9yV0C6lnXO86SENWb31f+SKiQBAUBRDyFoGDznVokaPgvHfFMjDG2Z1d2SEt6RV1xe++Vzh/cg5r8zsI/RLDlgTHzvPY9+ijC2n8Mm2uPzBzDzNqjm2tTJZt7VB8vcBwoMEvSPZhE6s08haNIASS+OaEFsApYGWStj8gE6Lo/euiavY8we7Q9YSN0u/NJS6dP4ValD4v97ShNd6nJQRHReOxTnYJJD6QtcYgDBsTKT7p/fBAd54orKFAihp/E1hUWCbqYKldVUJ0R8HX5DVhpXrD+/d+A+gNsm733dAZTYfKUV6+z3vsK0o7H9QLM970MFB/pvBTdrtU61c9z5sOBipWG/hLtaIIvPfkXD1GO7eqQb992K03FivZF4yzO+4tJFDkSrYDVWuIA0wzJ1HPs1x8ewb6XjcFHXXIKkSo9wimblaG6Diglpzp6+Or49BnCYO8rs+or1nwIr/AlimSfRh9iXefVphsLflJ/DCiVD/ivrwgxyFwPk/EXFbcOB9exHXP+aruvOMaqD3U93l/jXp0K4/rA/GCJiIKRmvNEQXibSJt0e5zu6L1zrqqp4OlHBNquEN3gInlxIAIadCFy6IvqfHv1kVmIU/8yWz88jLwpyWPjJntyJw81wmPmtKZ1h2QMx4zUElaTeXHBhAA0FVJCEuVkhJWS10zyEvEddVRNi/BSjz+SzzwwnzP8b0PgLn/bPc1EUD2QB1sMyOqOWFPN1i8Z/LIP6FL2Ojrh4MBLrINaepEaP6N6vAN5K1ur+frC31yuPHWFirZgf7geK2oFiiqWOg1Jw9+udh5pkWp94wgo7e2ny8HjQ6qNmxHbfTH19GKRxVXrxX2RZ8WvxrAarHFN8EXtrrodFdxbznXw3YyzaLbNTmZznhDp0iGyr+LZewTG84qsVYMxL62vsQMaXcXRy9wCB4mcERYeuc05TJhBbD8V9W+plcJUh5/ExgTKeSJP5mWzPqQFrpUjznuQa+19Y7HiN3lukGeqZWEL0N7ye0AKLoFpPLgqzusknqd7XnS3RZXY8B9TVgbeOW91PjeB0CaulyEAKyYpOqRt0dllFc9qUf8yHxBc7reb/0mpZtPaeHcEgCoxFh9veHGe1ZcmDs4cYBDDl7V5RVe/RSiYferaGDfolFMMo5jT0Su5SIXV/w0dcXQf17sndAW8sjQC5RQ0ZPZ8XuCDrmjQC+sdGiRo4EVmzLaKx74nG2Fv+MzzjvwC8z0HFqoD7byrWT/zVoZgLD94V12QPVe9LB1fld28Zb9UWPruAatb1U6Blv7Skex1YB6iH+iQ25/CcPRUsJ0nfgtmcmjgZKJ/xbJAxC8VapaPhyRY4/tXOCwvINjKpHTFaS/CsSS3BxACE/QyQBxIS1n1+AFw61wXAgUsJqmiieZC+prxEjifAzPSquMvEte1LgIr2ocfI1jopIxOQ5ZLzgK4W3ODMy25unnMMdfaG+VUkr8mgfAW/2z4NGpj8Gj2uPPj4ukqYDYha8fKReZ+1bEqeQlwdJp8G1iqrfmSaBmgkUOFNWQ9dOsxOun2gC+S6MQcj2ki2okS6YDV/SfYgezfrTLDSO6S+nj6AWKq+jJHLganuybBpSCo0u67jHpx8MzWvSw149Zaw9cyDVq6U0pfVvJXw6u6S6jRz1UVUC8F50zNdnViLlEvOB4GJSt/61iloxdq9ZZ8hwnGuIDX5vLduSXBOpFC9FBiQAOkN7UQ3kPfHV2vSYK0mfQ024rkJAgO7+IfV2OalXLy/XKqjbwN2vnhGzHsFbEFZjh3p9i/lp2t0pQ6xMxLAo8OUpe8LT80Fu+608oM1abi8P2fh6boUAneY2oCeCQM81unCM35ZEgqVAKz+xHa06PK3SAxAVgeE2jGNJCOxW+IjV6TMHXLI6AVMiMFuFZnNjr8v0PgDQsuVrnoVcBeR2C/aYYgw2+PfaYLc8FnrBkzFsbRv9X/xh6zXniFY8OZLW278Ba+YbDu017iBs8mVn2/8/dmwfdt1zVYefND40IJMQgRkkGzQghZszokIKYEAebwmYGG8rBEhjEDBJihkAEdlIpYgi2k/CHK6kkValKVQxlG8wkhAQamUnFmEkIhISkNyq99u7Vvffu3X3Oud/3ewPnvXt7D2utvbvvuff2d+79vp+rjYXui92J12W5gnQwnj0SjpU7cO4pXF8gDsBLg6FAcM/OIMND0h4skffHLMeMaWIRBn/3IOkQ2J33PJV4golSuUNcXxvqc60E+lX9EoNvyolvnlD67OwA9ftEkOnZ/qgRYXOIZb6NwY6+fTyQoy8bz9K/4itTnGqXjMxHCMDB7wJik0ZKScsB/+KDYlcSqdWpBRcz4Py7NtejR/waVqHLhl6wiiJgK3lZC/cZssitI90Ihj/kEBiCGdPEgOcKVTrds1JGdWb2508RD/rBrRKIsqGZ6iw+KkY1KnckI6E8AUzTn5We0kGszzVgqKPhyrIDATa2sPF6hRcwefLqMJUWGepztNo1xjnjcdCPMGrfGcfyz9nXvwFE4+yR47mePJ3ryvGk1il46Vf/bhFY+sJ2ig8w5o/DroNG0nvCOPbFS+EXBP2DwPYgZDNiu4B1LiibUayktTPsMnaALJADuFrnOJKNBUZwiTo79vPAM708PB9RdBbzOu38TKHUZZJj0Ji5gIcJNLdJwfAbPMjhTcoe8dnns+PsY95q3Qg71lO/R3kFkrV7RiN+viVrADTbc3UIUPXSkYKX8iOPj1br2E6ngXu2hS43plPIE3m0v1y7B2DV1bVNInRE99r06yTq13dUvogH/eCambMhE7rApL5Vo6053DNiCtgQbNwoZmAzM9KBw3v78G2mE5qzWoj753NHzuVthx2vVsmF10OZfGse3BU/6k38InG9G8DTfeWTGBYNAYHm+Mn0KgnkQVEpkDPp/jI2wStrfm/bs/bA0CQhqEZ7gE4DZxkjnlNvs8VlF5xk7USbFj+fQPmx4EkdzqF17PmDvk9Hj2/SUS36yiu1WR4Bzgd2TkDm1EF5yOXyiBIVpRmfYJiOtKm/T3CvUQUu38kDrU6A6wsfzy0uk6a7PuNsJfqMP3RHzKXPp1vacZxP5utrT9UpALUQLRYINSVjXQiErF/DB4aJ4AFmDvF68OKRtB8hx/1YQBbC0n0gwq3vkdAYI+3EnZaAIngJ13JSu3CkocANbko9EoxPUnKCfnCJunCEmiqudDuC67coZx+0BWyVkudSbWjoawhAKQ2uSkxzlykFlrhYCC4GAgEz7SBJFJnr/TuAtq+k3kUhzI9zvmiuO6SQ1hfiCzpln0FvVOoATKt7QHpv5J6NUI9j5w+R9kIxZDrpqpaTds4J5QlvCA+BsrrYhOhJah/niPR+9RjkiI5pczwxC9LjU8ZKqc1OiTxZhIUwDiecrbaja6FFh6cLRvy8oJs/7fWdxelwvdoHnzPpOa255+90djLNanY9GYNUXKQ9X8tTDUq0NdNPk6M+vrNoO4Kjvt7jHOb6N81KkJ/dYMcmCJSxglss+kgsBRpTDc/vHix9xvUY56JMVFGU+ofurRgIFLFkaV+VI9zCaBNDqX4GlwiTAKuk0podAUhLA4rbu2/0YuCJRGrT3xM4kS8nDj6ulJK1HNl5OUaFUaBsjqxsBAZ4cj2GWURVlT8c5vj2+FrikTZqWdLkeVMryjyY8O0Fb9JTQHW3rm+hyetiHXs+Wnv6ECgcnhcNzgVAoAWj+K5/9SuAqG2P6Nucs/OmEeWNU9RAicqrmxNZOLl+E69pDDjwksvNgUZO3rdm17xeb42bZ6kwR2gmxyGKW2sX7yS4nVrbvdomPxasHRjM0qRAAmIKY5sQcAjoES1SHJzgYSzoc4RBIQZ6P5pZy1u0tfdUY776IsGKK72Ol40GoGXBGrMYerpoRL5jBLMe+lzqgW4RcaPGWAk+Y9Zm/VmMeYzkMxZ9jVPp2HlFrXyMFYb1xJt4fTSQk8eoFha7yrbHLi9zIBo7OUARCFcDjnRYn55dj+vUI+NKH60mS0HBRirKIo47W0U9C7dZtXFPhM1W8Z10ayHU7fFoBcHgRvRVfXm+ypdsSyHUMkdwa8Y2ZMBT0+JHRZuFhF/pES89AsQUCdP6PsF6OBNxtPf5w3oEet2Zp+tb2q00sjmOvHlGsEjzt8gQcHAuBoIuAeTucfUNIOuj1On6I2EpxxXdnRYBo34722q/qAeUjgmeUkfGXTp/0mE9K7pLLmBiOFr+vm1Z3a4rfnpt9+u1dgGVgr3qAXaF8IzY4U7Syo5JvhTMugC+cg6WnynFOOVi3Hdo6kfgWZ/CUpjOcZHWb6OqEb/zEle0wY+XOoG06taGBPwsFuUjJuaP+tels64Xq3i/vK6YAM322K2lJ1mqYKQ9gR4Iq0LvKFPs2QOCETITzOKFOwkb1R0E09OmAZgmTR2aVZAU6jN9zaO+3JdirFf1g2uqnm2IeK9Iz2Zh48acKdqDluAAa4eapAMdX6sOnAzrIkm2vZ2ygYIxZsLYCbUJwGhOJVnlmFvoFujVN4DUP1F3nICKQAK3Np1TmmxkMVKvFqALhrUXCvOUFWgTsHB/2gFOGEeLHm1bYMz6SI5FHd4UX3ASONaBr7HjcYKtIAM7PJfmPJL+KNf0SSSHj6n6en1Xf/ZL1CqZ3IqAi9ucwKKHRqoDbGW7PAsekqsgqxp48ipU8+0VKWCM6yCFJh/rIl8axNnLj8U4ktr7Z+S6Rjs32LyhYpazdW3exq/b1g+W0A+vymkF1ud4fXXjeutqoE69lQAeSzxmUt2kNHBJLxS5hMvHSzVi/1C8ivrQkS0nSRNwJ7kys368JrozRySEdH/BGBJGZGKCIvqVy1oXSE0qmLARNSYAwTWcq5kzXU5T1YGqyIxg0nvdZHRw8FwdckPAqi+TFljtgC9uiATOOhvAxY14rCBXEbmYHxUAv77vAKL2gZorECUgQ3uFT6Y0b8KLSqtaQ5vu9XLV3SgEcEBOJcXlXShv5gd4QiDx9JhrDdH2QjhkTldMCemCnqlFLMdSxZhSM/pJI4ToEz5tqrKIrCNdZK2d1DgSogRHK2tjR7Q6ZsaM8ehXBYbLsvB0wCjfXcGk9X+5umRXjjT2EX3Gz41WBdV42HiMZTlikhFwSpM680G3+EGOAhmMOY4Uo4gtSpu5/dGqRmX4/juEBV0eUF6x5XaV57R8lA/Bw20QzC6OEIlFd7pevEdhKgDlkSfaEuV6F0V4chODPIsWM8KRYoy2wiuRSejVkCM0hwCMpiDc1dH6LeLU940UdtWTXsqdfidjpZrnSi2R1id9/6GvoFnaExnl6LOjRxxHj2AUIw89I2yEmTJmBJM+YupzoM4bhLIAcgWda1xjR7SWmKpXl1bXuRKQuvhoZK5RCxTJWlTEuVjzSle/Asge9mulXZDekgiUG9+IWvxSgwXqGgXXqdpldImVU/uVEzPFKSBqs4+Uco1BttcksbAIxoYa4IrGWLAIInj0oMAlDfatdLf26pp6NDFeUj6U2pezCNhnjgxPvaKzk0YlouX9RuarEfkOi1mATOpMpx3bKtrq1e6o3pmNGQrDlIs+G2aePnCM8fFtfgXR5wJaX+xyJwvWtShFCtvpI4j2aKIlOLOBjzyrMbfBaj1BpfTLbZY8LwqA+wVORdQOl7MVDpNMw56/UljljOBJs6iKcK6OKNevI/iK0iOtaE5o6W4k3J6cW6CRisvycjMxPphzhWVG2ncnQoezbI/AYpSjz46eVDA8j2C2RxmZ6DOMkXYn71p4JLkJhMCxzR/OiBMFBa54LC3ZaA72eBBxYEJsg+OwCLbCWu/qG0D2jRmta41zLpGBbnqfnJOpjgaTBowe+vNux8Pq3qLEKrUjkKfzaC+D/B6mo6Nl5ys5ebEoepdLxhLdt5pi20CHHbMu43K+OnYN8/PepHzHCiC4E9LhsJfz3mGRBtzh76TlsS8YrhVkcdXIHniRvP/++7d77r13u6+MPmuRezaYl7OdOhrGLcpFH6QYG/wQaJ93g1yOwZegpIY7StkFHUB7AYoAR/tyQSqwKrcv6pdsBbgKziFzNtoK1p7hY9xyfHcWeaolS9y1S320IOe97UWJY8Q+X5KsDVnb9YHZIDm7OfDCqfzZ4kzrzyWFYvRg8uZZBuReQTxq9FDBcj2CLXcEIx43eJ0wpLIA4Tzj+IMRnw/p64sIsR8qZOomRnidM905ex9h1LvZBMlnCgkmkYt5DV1tAzjRZQvjmDRRQGyTz4v+A02OH3UPRKxUKUjXLtMBFQ+ByFKAgE5bwjvsQouzUjo91JSjvsnLXy1n7DpHTk4KjnPfLxU4nACINtUmZBX5lNbYCLdilWc3PSPBih+yYwW2ydGfdRF9pETk0MdYbYYSubanKQ0pTHnZ92Huvfe+7TGPedT2tV/5edv7Pek9t7vvvjdRzEJsgCMx0WfcjBFifdp25MJiZBxyjFPa+QUoPoP0AYaI9WuMULg44APKOP1KB4RSMkoguQN+elCMIPpTwjTBNgmwVz/kWVP7H/ZCLE3icjwFdkraX5+f7fdyVVdi7UiRXsnWJ7F3pxH3amMJ1iZZxqjgkicc9lkK0cQDR3nGTig2qHk9pCRzXbZbvQGi9kbLXWOPI6vOQcIMNsSHwLrfQ9kbocnCoo27WMSekCFXUlfbAELb6rOZS8eqZc7DS5VGnu21rAPbzpZsJC8iuwJ+0T3c5xZVDqRyrVZP0mXWZXH5faADoschLMRRmFL0oAaxHCvN6jHFMXnVW8JdJ1XkOMGxo8OWKMcROM1FRFTY8y3fYhm3sWAXiDynMKKb8j/O/zKkBzZ/j370I7dv/sdftH32f/7J27d93Zdu7/s+77Hdfc/eJpCKcUzKAMIb0jMK4xYDGwdzHDXa41M/ENoLTn1VaD4E9DlDKRlJL6Mw6DtQ4gBHLEfCbI6xNlrwzG7gwbAMJN3mRQO1Lc1IK+Wu8ZoxSIeAMENs3/Xy3iPbKucIIq8yqnLUx2NczwxZk56vVg/oogGMmI3btpiL45JkBWDPxEvK/kp4pO35RdbS2eKcto/w3BHPtQVuzI6R9mDYdbYivuDgEap0PhtQpxwYCJBAvKu4GJ765bOnqofRvbSknAP67A8j4YyJJoMsgCQByPX8+Q1g56p69FmzjQRgZBMt2R7wnoXF24jvTFrEdgVmZLTpEsDDrSH9HoDDHnFAxjEp1xdXAVorg1NI5cZ7MsfMGOlatDDK6p2RGYX3I9RvDxUD+1RFEN8EjhIFBzYOPo11pRnVXL9nrVm+I49aVIrdd581e+Sodp8LNCyfVUvYmM6uKZ7vylYwnwHsw0rce1/Z/D3qEdu3vuhLto/88Gdub3nr27Ynf+CTtpd+85dvT3pvbgLJwGhvVKwjUwzTxxinE31geFibsTJSjqFjPgtxFXD9E0f3VY++eqfuY79ZY70NnUj0UTDqtCasYLQb6LCBmXIVpCjepaSfkmEPtsyuMsEk7xIcoK+88nFvl4dgp+4cIuy4A2jpZjTyGNF+NJ5kZf0QLzfY7tZkR4NSbdFHiI+QgNUpdlskGh59zNPV5zeFLIfVbOwy2/cHXRuhjbjWZKRWI0GTnUx/p6mRrkTMXCzqYKTtNKcJh6Ij38Etu2o+rGRzJK6PaVGfxpIQxrEjajIm7Dpq7vwGcNRwZUdnTZBs7VMXaI0/q+/wpY5+5q8F68PtILsO2gOd40CwCf3mGSF1mnSvYYSiV2V1ju6ZFbBXbsCWtvYpYXSK4zIBzpMqqvXA3c/qjrMZI+e6jPzi25C1rbDE20tby2RwfOfvseVj328pV/yw+XvHXXcL/u6775FN4He0TeA9JZ4pNHk1uDgZNMaiH6RmLksgDxu3+Lzu0rBsVv0SrMeYzz4eB5i1yDw99qaUGn1E7eR2C1CA4y7BASLLfic05hxx17kam/KZiiwPE7trtQvQUxp6fKdmcYSMTbMrCqmiKjIjkLgayUt6WNHkZBEuBdbodbZoQKZOEANva96RLJTGHm2EttbM8U4CBNwAPXiwBki0sTdoElr8lOaqdHs4W4G9NWVXE9WddGdFoGmgzPz8BpDKUZfxYQQwBzPDS6RKLVEfGBR7gLp2Uj3bToqa3kEb4sSkANLW3oH37g6QROsozhe2LLFrQJfTZj3vYg8T4+0iEfbUV6jJIMUwx5aE0d/IkdattuqlcDxg7UtwQtjRR431we6Bytu1iLXWmLWKNhs0zWRtBqvTX9osf27fX06Ur/ji/3L7+I/60O2uuvkjGt8BfPIHvu/20m/SK4H33INNYDh8Az2pD5D3u9csS0dw5SNnpm6wmhm5PuI9//jZ2hGHHI4sjlgWF8IqZycCMNcrE1wVYCEZM7IDTB2WV0DRKQGcT1L6cP2p/MkEf4j2heG1SDNm0ruAhNg58eEBGNmO8HYiZkKWZcLRPPUeaDVrt7HBqF99zg2jvWFG+CiY+QndqNgeVmjiOM6xiuA9xgXnWKNJsa7Z31FKpZ1yKtS5iXASMvhiGi/BIrSPmBBDOOrwkd62Wx7xrk96SUAfd6NuylyDkMUNLekuuXhtu5wKhiAVQhguU5AsrtQoFuzTRxfYoXp1eBqhAOge4wVXOYv0OKoziiev7HcwnlpPW2Nho5C9NWfBGVJOIOhVfXAAk8PjR6+jKqEPfEaThAx1OXb0rkVKJqfSROxKBcBMkbCqS/kK766+VffnE8978ucj3nP+9M/evD3nmU/dHvvYR8tvAfcHZdvuu+/+7QmPf5zkX/HKN2x//ua3brfcWn+G7A30AlkMWcY7soWY2hspQ5z6+tzW53kXj1fxxrydpV8vYOPBGGqzPkdimWOcY8yLnyUJ5EjBzI/81hXAQ5IK0zEy+t8V1PXFUwmY9rISCYMyARwHwDLQWcUq/8trWw1KL+UBgVtDpjHKtkwNRJ84MwpEcfEdQx9/fZ7x3lQPzRhNZ+70IBMrmLbIjpw4Vs/aHcrztkdWFtBVx8gxaseGI34l23KqAGlYODIbsR4nUuD9js0gAvDJg3T95ahC7oEdPQKPFiz40p+wOBbqvGUgDxyHYKgSK910wQaQGhhPY71VAABAAElEQVRlJnsNkqA475WWECg3jHgDOr9ZCYp060iXXdon86H2SeRoBRMB6hPGEZPsb0Q9SlkdZ3GPkgWrociwrxeSs4Eoc4kPUdza3IfAjqp0VUUClKkQ7q6uLivaeLczqwrv6mdcH2PtNn2X1izPAZc65Ow1WPJsoOjRxKj9wKpHMelxZGo23nzzzdsf/NEbt9e87re253/Y08vHwdwEdgY2ge9RN4G//KrXb2/mJtAuCAomRWOYPsZI3/PREUuoDj173dNnwMFBpHr7PnEcVZWe8vf6ZT7jsp+YaxUIYAC+FbRx2m6kMkeX3HVsOZ1tidTXFffyAuD0YBIj7Sk4JCpeiuHZpVcFm0oxZFNoWa4xJBq6oqJvydYmDqPe+Pyu7UhYHg4EhrpWizY16S9GFV4AmDIfX0qo1OA5QsipsfZYB0rBhT0eFjFmx0gVHh6XEdkj4JDXoxJieRM+auqc+O5cHl0N9IcyKXl6cXVzI/1DX9qtuldeT+jY23LitWjFXHYFkBocTxS00Eavhj53WtRCJ/YONqT5xKVYSDM8HyMh+uHk9Gm+bEHeZ3rBWbwjujVibUTsQy9GXfGwBXFbrJ19RxUcuZMm4RlA4buk3uwRaC82tSjDsQPHSM+tLPD2uDVPWHnV6A8vzi0mtE7PreoyR+5N26233LL90Z+8aXv16367bgIfVa8EEqtXAt/jCY/bnv3Mp2yyCfyLciXwlv1vk6CKfZ1mVShb+7wf2VDAMYtr9jrvY6U9367DRX3EAheLWCFre8E8w49nPfbaPRQPJ7T0I3FUqwYwAXelXqiP0R5ZmYgBnnzLdXZGcgDVCCHr9s1DoiWhcpekrMbK5nlKqV4vslhkjogM9c/ig4prsOROynW69q9XAYvN6YRy3SXgYMF2Xipe2MWcs0/qo7G5WG9bLGqf/QgYvM4Nopm7Ay5prEvbHJ8TXzcTSsPlHh/rFNJZ8+tYImDfhLWe1mFdFUyIkpjFZ214POsRLeebTLRkrmXCRdmWFHsIsPxkPIG3UFGzq8t1xRiuBtjKtkfYXAeOFnvAti1ZW+Vs5ICYQCzH2DCDKzO1sWLreYX5+zNsuBoybccImoK33lo2gX/8pu01r/+t7SPKlUD8PUD8gog9cCXwiU94t7IJfOr2y68sVwKTTWBUxzrxQI4PA0fmos94PtoqFjGLW8zKVj7uu1K3VsyYi/OJPvCsc1EFClIkNjD4FmjJ7MQTiGDU+u1ZSclDE6ACSVROxkSvn++dL1aTjaSzvu2jcqVAiZeRZSKqV+mWYILbeVA6fuyjUYi3oDsJB9TgttaboSXk/cXGBub1BLK1VuVafNbDLB7aymB6TodMcIPMZe51a57SU/DVrgDuTnvdkWTLndus7GpawFrfvHIXUnup8mErt2ejHG8By41ICFe47dPaFj2LR8ykgQJjpinJwtaElbnUHguYqkdEB4FOsqk2AaSZ6BYi+sKgQAfvipVQsgTE0WJ3bEulrRQ88j6yI1XT5GCkHVJNqFSoEKLdlq8km0Ixmt34mUEURtodh03gH/7xn5ZN4O+UTeAzyibwkfNN4DOeur0cHweXTeCt9UogFTlC2VaKdq+cdcOsZVGROY4GA5MHFlD8Ghz8Amz5ii0YrPPYOURjnDGM/hBZE4p+9iYX1elDJvLHQAWRZEfTh5qDmiHniJGh5x/PwpZvRiw6TXQgIBMY6xBs108e1hIAZkKfC4sgC3Nkle5HXdTHwThHjdb7TjfhNNjy1JWATCxVbvi5YXgsyRDHKVmfA4QJHXeyxhnJIrN8jK3xtVQkFX/y+IJAyYSVhbDOpEBVP0xnpCQtYBAgjuMACIGij7UrcI4BENwDuuyP4wGKFjnyHcAoFv3QbncBZEc+ikzLYiXgHV4RsptCF4cV0vhOof7Xf270hB0Pejgm5XrBDmMLSqPAuBbK4D1x9Gejx7FWi2IdeZtJnIlTmGPjDoGWWRuGB5O3dHn6k9ywmnzPtpA3sA5XPJbtSfNnC6wVnVqByndiQSnro9PpfM4fkdaKOE7FOORiTBY8pGUT+EfYBP72gU1g+Tj4la8rm8C/lE2gVWdLcTSNVZMNMEM/Mmuc6RReknweYJSGECvg1Cce+XLjBARfC9DWB6JqIVcTGGi7EXEcAlDT3McofJYHzPoWC9v6wMphCYxxTAlMxnFawQG1nJ6Ncl9pUkruHDxxCKoj3QSZhQC364VFGa6C8zFrArYIbN4awBjIuQom1x+DqMDnpwOnDphaIU1fS1BryDRO6unsMZtiqdNWo6oGxQoScEil7oiPqw0Eb62JoI+8HCCfOGJ1nWn/0Y9zNg0EdSqE8MTFa7rd/HFerf+BN88IlOUJOzH/c1cAWWBoMAsAnBMY7c/JGumBTNDEmoKJGTOk9Ymo9wZ13Ax6I5EAzdDT0XsjlxHi6M/GEeci4rjITOh83Mk656BW4FjX2k3NB62nto00UjcOn0+dklmoklfKo5lGj5HDsWfEQpip2r+45U7DvNfRsZOQyzdhRCdghuvITeBrsQl8XrkSWP6FkOnHwc/wm0Bbm7I2NtpEYaRNlPFpzkZwmUvoErpqHiLU4MhawwgAQdYegC1ANAPRZ3w6RgLfUU+8OXTtKNYztDzCe8Ssx8IBbZeaAyQa+Xj+8DWA49BEohd1hJPgjNaYZYRjBQeXErrdoLcYp/OInFCIj7+sScTu+6pWT54g7dmtUAmfOdkg2vG2BO2eRUWPR6QdSFUSuS03MUYcrgSaAwAXMDkxR4WIsH77ZVejaUwLPWazPERoH2Ae3wByAQ6Lj0BEhigCw49rq86FkCl58QKztS7a/lGA49CWTfgKPUNr9sggT8xQIAQ8znpq671UOvxCEUpYdyxgsjZpwlNzBz+kx/W0TxCfTYpi/lxyjglsFbItWVvlbGSlYnM7HKZrvzfxeVF8nY7O2k2HHJSxti0rdpK0IdoYXYFtu618HPwH5Urga9+Aj4PLdwIXm8BnPf0p28vLlcC/KFcC938xhEXRYLGtW0MY5EDO5mGb9em5kgj9D74qTu/50zlk5JjpMc7R9kgbI49mZwSCxpFom8nkbd7ZVqD14BDeOYIxDCvPMM7U3ecowMNEsuIRRF+r5fWLdEnkL4Pkm1o2BMETh61PW5W9ZyWZwdgP008PjlY+qRHXnxT+uQOkna+1qZK2okHpvZjSRuU2mzUFqnhK7o9rvM2qbSOJepJOQglRQ/b8Fd4ueRcwrcWXshzgz5IcY6In2ji2AYSg7eFQgRzEqJxE6BlnDoNmDnMT4ISAEEWL3V19IWJqrhsyXSAkogsgbnqMns3QtmPn2uho5zhXT5wy38MvEGOVIeIKIDsEBooPTPAMc/QkqcMURj5+GsO9PYgMMcI42vSOTcqorOfTDj1JUzFJMWQg/OhX6ku8vxw1WDOKgLWp5x6rAKCLETcuMLjMwa6HbgLfWDeB8yuB7/ke77bJJvBXyibwLdgE3kKJMrIYQ/TLyJqzERQDFydiKcK4LUP7wIinD5ajHTM9xjk2QjFijL6M5Q4jY43HoE94zz9UpEYmfclHARQmgCOAmY2YHDbJWM/YCNeODL7Et5ellrAsa1sA7NmhuYiwp7JOVV8T9RkU0HBDqFWzuWYTzNHTGdU18B518WY/rUnQ3kjpPZx7UAlekG1vg10f2RKnAiF8zF05SVYwgRzRCuzhGIN8PDkCofUYCSIMcwxpumMlzZCmXxorbZaAPGZMzIj+VYNlkrEK2aFoUj4hlNC0qIcDBqGDx/4GkIKsz3FaAIA5SF5cS5ovsuc3K0E7utGvvSC8XuDJhKxeIsC3ZcI4Qs19UT+Vt+gUUIMdB4s3JN2LqqA7Vtyr3g1yQ2CnQsDDxS1ZSxUiQGFWvCt1q3OKIKlclAizYhObEnl7Fwi2piYFGS7SrK3PDZ5ZACzqkkSdpmJ5lU8sxmyCFUYpC0cMHwf/wR+/cXvdG35XPg5+9ORK4Hs+8d22Zz79ydvLf+X1YRNYFKVGVbYFbD+IR194tjPYAOGgkHr93pEqrmdHnupQdVz3qGe1jB1h8ON86EtJuRvLTeZ1Vt50pqb0U+6sEJ8zFswebWzSk4VQVkfcl4/Tir5YTFrCNdso4VovAeejnjQzKRxzVhC2kAfFJoaMP4RUetDR5ZKQy08dQ4QZb+BJbOxmKjlLQEemWwx5HPXj0XjKAHb4IBhjvAURpO1qc0b2FdJRrLZLzB1SgNB6fPfGuVuCWQNOjgCr5ADGKZrlYwbufbCO/NTBgIwZGzApmiwPH3DemJ+M+xtAECGGg6N6k/s5iJk2ikFvIjeEF/iQiidISA/KQyASoh8WJKZj/UE/8Mc8IlC1j25HxXp9N9gxV7LGAiflBgHlIzxJ2YSFWNtinGADFaPZJ1uureX0PLqucJBTYEDqI23PnAkf4U4wLRDPMaR4KsV09IM8afg7ge3j4PKdwEc/Kv9O4Hs+8d23Zz6tbALxcfBby5XAm82VQNbiiBatnfmICWgPaPOw7c1qZDhd/84hHiMP6tE/ONpyoER/kLEAaw9ACewjAAOq3o4QiJmNi0mQIs1ddHdUIcdJFHc2Td/GjvZGDp4IciDQnBobIx1BgQbV3jqgJhKcoTgTO4cZnPF2uREBBmlnIyoQZ6rVENpVlt53f5x7Zyu2+yurKBJeRrRvp8l6XQGRnQN6Bw9AVVFfg/U3gkuQGmMDVdkC9otx80fkPpsIMsKYpY8szePf/6PmsEw01PXuPqEhxGiel5l6CzxSfHDKKLtq0VHOgjmt5hKpQA/CMuXL+dJzPWMVbd7Go92VaQFBu42YMDtgI1HqKj7k5WgGAzujwbNFMEy4CxAwJnukW51nrZrfg1lKtUHB0uGwdF1OG1HM/J5KOxzCWsGKLwXtC8TwcFpZSVLIJibdJRDLhpw9CL+v/B3Ae++9ryyQNLfdffc92zOe9kHbt3/DP9je64mP35CPxx133La9/td/d/u27/nR7Y//5M+22267VSFxQtWHPnRYs+uNkZ6DtZf36OjFOcf8ER9vFFgafO8Rm2R9/CbKdb5NN/ORxLQkV+7kjZwMBPsR6T2jVkfbdWKUMfrgsHBUKj6LWbjAeoCQhC0CgpyWYD9gd81cK0YVv6pPxWn5KAnfCopAuWtvMKqo9yOZca1HL+Am4WPzT8gIcRmZdhNOg6GpA26R4cekVNxnAemaCRQq5RhhlzuiupXjg3iHD4lZQCs1dWmgYnsThpwGTT6aFe+HxQqd1N+B37TcALJXzh7joWMOdBlxXGShDhxns+CElN+ILeRnqaA3wjyge90aOYjs5T0GaM4eGRyiQBkkZRMoqavfUbcpDYGWmRuGA1N6nKPtmhhmIMRM9eUfPgY05gN94s5Z88xEqoZ3eCGtbgjO5hJhUjEN9hZtOnkcZml8VHH3PffKH31+3od+yPbUJ79fuer3CNngYBP45A980vaUD3rf4TeDWfiO28sm8Dd+d3vx9/wP8i+MtE0gAWVEjTtuv337u3/707b3ec8nbHffe+9s5oZF03bO2GVjfH4dVUEHWKM/LL8o86rX/Ob2urLpve+++8pH5tjwXqAaHx/ri9wQcK3aLBL8MEttfYa0KxuNiVmIeIssjRSaBv3TvpUp2PJ6hcdeHmy3wbWVc02L8LbFazFG4PFgjP7pEQJ1LqrVFZnKNId177QOt2vUoztWJmQpNS9DK2ABx21o8PXWyM5VhVBIFXy40hzfMk26RbQMm8GYHQaepX0sgIPrsfB2AY6iTwE9M9i2AzQHumuEQC1sB76/AaSAHVtDmQFgPyxN+jJpmfjpTYsRQBnrlgJdDt9TsC99vaelFfScvhAB6CtsN5iM+qZm1WyhGQZxj/Me0kNkJbafo1ybzBDY0QC+kUcs5Vqm421qrmBRRYTz15OpqR41qJbXY/aoGnDHOYKscH+mLjRcyjrJDHbS7BZM2tWU4f77S6Zo/K3/7JO2v/1ZnyKbQFzZkjdtIdwkVwWx2Vkd2AS+7td/b3vx9+JK4Jv6lUBDwr8s8owP+aDtpd/4D7Ynll8kuadsqB5WR1knvBbcVTbFr3jVG7b//if+9+13fu/3t9vL3MeDKz5mWiQ+nNYXug2AJcEy8kH3fkerxXtFRQ70ENMsvPQY0kOg0ZDhUxVB+3QVlgCQQDYeaTCCqk8hm+5vrowSdUaZXIzo3y+RV2KaHOsPm0ARrHq0ScwXpGW74ev3eLVkwYu9Axt4k4B9/LAYfn4ZiYizDSiebChbW32jaczWBWM8zSnSAKMRa+gJa3AEUNuk1JwmKpICcP36YYLMdhVGFF9F5sNB+LEN4LxMyNgVDqnqCkJeCWyHObZH+WI00Q9hRdutWVc6ZQXdzvUJ7wHFyGqOxHTV3BpxLiKOi+QyZ6KD3BDYUZvgJ+G+Xio7hbV1ZfmKlGG11sSvx7HuGFkrIHuCU6HjmbrQYEqmS2fS1U6aLMDi6t1fXtSx2Xvhl3/O9pmf/gllo3dvuao1fsxLjb1RN4G4Elg2gW80HwcLURu96+67t6f9tQ+Qj5UflpvAMhesGTZ92Oi+9Ad+fPvV1/zW5ZvA1aLiAXNHfARdcnAGukOsswJlOTsOiSo6OQ9dFee4ZoxzCGTwNEfeGCF2f2zcZoDjnEFkzI6RRnIp5zTIaOzgdtKjHiMg8hWimHRtuoY1tFfoSN6eMCw48jTCPKpXDEPVlb6srY3qvZmaDY92IpCEOm+Z7LBmFbz+395BcgVEDzR9ELb+JRD7OLRGV8acIJlyh72f/vQwx+YVEjxDdbSufVPlWuS6kyjFJmk8CBZibX2AQPRRlUIsi2vW33uc9awt85NNtWef9qyo2EPghKTlFhpcNMojpAGwIWv3x89Gi93cgjgxf9I4oiXYrKOjzbLp2UgsxwnOpsWugfLxl23fXw00Wo5vnYqxIdh+QkZIzQi3AFyB+/zP+XT5WPbusjGTq4EWcNLG5vG9yi+GPONDnrz9UvkTMW9569vrn4jpjeK7c38o/wbx72zPn/y9wZNlHxQ4rog+pnxM/pzy7yT/3C+9envrW9+23XzzzaYXPjCYu30UDMSahDMGHwep8nEcHU3Z+0gndaxOZNSKvq1tKyFesIRjLDeqEsmrRzWtYXIIusYx1oe0q32wFnTkoKDruTtME47R18Mz3ByWYG0DubLpGwhyKGoPgGOs5l3jGpOWS1xT9t5q0kaeN8bsqPzxrLEYtX0l0y8lOAIOmzelH77H9Tm+O8lc5a7qpSoEpMl50PY7R5XMAeABCEqsN4Bs4qCYwtdgeX1okGaw0mKcYGuYf6uHqP6QHVquvC7FXBZBPR34MCNCW6EpsaqschUig8fZGi0DoyyofuHcci+w0wLQkSInBBd4pjC2g0ENeI+xPNpaEz25a6p7BtFUto+f5ojYU2J+B880xnLD+YrHTf5jTqT03KKqGxsOhu24uMxhjGnmjBhDHJGifW/ZrH3A+7/39rVf+Xll44KPfA3xCiY3gU8vH/W+XDaBb6t/LJqVy5+aqZvA18q/QZz/0ekrtPCAUfHLLO/+bo8tv/188/ZzL3918vcQbSucP0beTJ5pE2oPFnLyq5KVajHVdvTiCBzBeuOeTXG4D+dWojmEqMdzBaL16FYPaExJ+IPnYg1AKnDcBRDoRmVJBYm3FitqT5X4RLSuIRG9ksXarHaBryeZwzZAW4EFxIDBp2YjjFkUW8qQyxEStJOxnUAdxq8EKjrMD3LpQe0siZxbpQbidDgC2fttMDWyEkrYWROvgzOU3Qgdd2zAQ097+EqNPF2KnozsL1Vi4TSpQfbFcaFnfyzNFRfkTgAoBzLKseMQQYd7B3CdnaKLDM5JlVN8c1PCIqh0LZm0hzSOmOr1iFCcv1/lLLLjaLV6DHC0tKvYrcBVRBIu+pz22jc7S5iVFa1y5zSdY9FTez5daJ3RI36uKE2UNJH6YpLVyGJ1CpKiAmIVS8pOeTKoYOGUqJXke31//WOeuz32sY+68pU/anLEd+SeWTaAL/n6v7894fHvut1TPlqOh3xc/Bv4zuA/8789HIEPcf+eMteP/chnbU9498dNf0mmTyE+CshksRqePYATitSpOQyWLrl6p29zmUgWs8wmUNtGBXB4IxZnP6oYvWKyH7NvJCGMhmc1Asq74LCCX1Wf8Sx4nWVyA2ndk80alWLOM77wAucE2S3whgPTphznAqfpaR3ntlL6OLs+0lJsLEuqftRgPYw4vAI5mmsAhkmKo4FHU89XvaQEGvYa+KFY9hwRLP4J8YLHhYB3mk21XBxAvN5E0t1R3wW7gzQWhTC/QB1XrPUGkAKOkjmsMBJsH/rkJhY6I35Ut/gxK5EqA337Bdsj6oOiLZcIrNIJPMhbdkg5FzjFWoboMyDjfkUnu+cMckNgRyHBs98kBTGmOe4UuICwqyiASXsHyOx8XwHIht6HH6htBCM60WdtQGOaPjD4Vz+e9sEfeO2bP7Yom8DyNwKxCXz8u2MTOP4SCb8z+JLve/huAnEV8N0e99jtfd/niemfyeF65CMfEY4BFcPy4JagvJEUbNxJBXxw9c0Mb0SOB1REhj6mbsbrsW5VgRLAFDiNqawkwMZN0Gtoy/qK9GYKrZfGDwYFWpiBXJHZBm/rOmYEg7CTQmCCbaIRU3zuUkh1mo143qh6fL8Vt2qPpRBhNJZa5SzW8+mN00HERGFasEk1deZbYDSwCYRupMtGUDKRo/gYnfn6tCvqtQAG3macZZxzqnoz7HoDuEOeiTKOHtiHxKjHk5LA5bhYyCGl1caHaVmgJ9ks++yZarGgAnDP2wC9coDNqJCtLNUloH3wpLlySU6myraz8bBwI/amYYUwQjq7nhjmB9DqaPMvGl1mxRhypHFkV8cF0QQ7H+R9oMD4MUn8SFXrQ2d1JHkbsnaf0CCYpWIMf6rlMckfeB7ErhDAL3zgD0W/5Ou/bHt8+ajUbQJlLjdtd9xxe/mn5353wybwT4ZfHLlC8QeQir8L+K7lSmp8zC9rwT7IUIBfbngAuXGDW35XB+uLjXa73XWP/O1GsOIhdNyVW69QAw0Mn0dHMbI/do5VEl5ZHF4v2texiK5po2tbr3GuMEN/EbwL8AQLt7Y+cD4iTIaG6THh9ZceX3TMIyv4QXupMk1GGXYY41OBlgCDtxY0BpTnqtOMTVjbKIuJHG8x1/wuwKdbSxUDHXL+Gu94i9uzRaNQ52xfZU9P8hOx+pdZgwTArIFxQvasEWgj3S5ih/Ss+oTQRYskntj6QgKmSVmhuY0Su6QR4Dvz3lhsL09GjnNRaaVGXIIaF4yDzhDYETV4mONyNb6m+ovxAto4zmjzL4Yp6zALx1LUHiMLekmdw8vrcHnVEJalBqW0puDDClGDoyXWGAawcFhYUHI5gm8q3/270Qc2Kc962lO2l3zDl20vKR/3vvFNby5/Iqb8iyGmQfwx6de+4Xe2F5dN4LeXzeITHv+4h92fiJHv6GIHiHeNi3aC9rGwdn2EzLsRfnnnUeUXUD75+c/bbi7x9viXH/Xf/va7tl/45dfmf2zbyKqc9kq+PxfyqMfMPVNKQLzqqJvAog35CtpfLqod70mfhfllgkMqLMkpmn7bFbe28gTpSKqO+p7lEcEjQRqjQ8yRbsmp2OBS6fJRz7Gb6kaT+00uie8QxX3keF023k8P1oBGV01qEMjRE8YWWKqKktb3F+bcmZSDaH/2jSV8pFbohfTfHxYNOzfLSgrbNG3C6lwY5jhuAEmwI9HpuAMsafvaB/R1HqxuHhKRZ/xwvckCxV6t3kFKlDjlsx7PDb4wtlfIU2oJmAVaagi0TG4A37rrkOnieDyrTeF9wnXKldEIVOilZ5ZFjh2PkZmOxg/gS0HWlOfAWjDJGgHzEifAA+WBa/WNjVhOZwbMB+aQTeDTn7K9uGzucKXvT2UTWF6W5KNMdLnplcDX40rgj8lm8Qn42Pjh9ncCuZwXbwIpkI/4Le177rlne2r5o9x//ws+s3z38Nn1I3xdw1vKL9f8xz964/aKX/317b533FVODJ4Zeo4M54PSyvmjb3tatQbFOXqu7OM8onhlF8H3DDmBbdl8+qejURI++vC9HJQlaSJg01Ts9bhNMB1FgkmRr8/g7u1aLGiBrGNjF9giU/R5SqXtiu48c7wsL/XoYwUeVft0uiW6dDHiIEG9+X3FY1OrzwINDHTqO6UlwyExE/1FEBXiS0QtH7BwWZBjAkGTFCCMo4GPHwFzdlbAEEZzDpR6JS19YBRjVLg4UvRQnUe9vkK3zb8F9ozd/vTJipq4ebj39krleWh4HTs/4QyBXOlwlJNpugwcVQDe99yYabjjbaUU2oSqAQKPQwSCdVzXu0DQy49eKdhqLk/+I7WPYHwLq+Vaq62zvsrVvbvuunt79jPKx8Ff96Xbuz/uMWUjU74TGFrAlcDXlN8M/vayCXzjn/55+sekr97JDVSwj7+1r6Ek/kWWO++8ffvCz/2M7WXf/VXbR3/Es7Z3lDW9u2wI8S+U6O2e5aY5LLdeyCp98uqctglURDKUxE/MzbOLV/6X89eexCf0VtCZJOKz3EpPcpzARIBpq7OsZwnWPt1hbchp1C4mvdoej9oiH0qN8kBljRytwsdHrxWTRVVfr0YZZFn6JB8ZC5d7C2zr0oNNtKQWBH7CaEgY8S957LcLxEKZAqwygY8bQEugvRxjJQ9uWTGqt39dv4o0thelh/nzJqYu9mJZyMxHah0QsJ0dgJd6lpGXj1HLEJuBYwWj3NqnNlCn9RMC9BDmDbrtUDxLRnb0G43vCnNAhybW+XqJSAtRrQUGoyFKv7DZNseBEAP8PGWIl8AJwd160mi5k7Fo7xJiQ1f37yrfUXt2+bt5uBKom8D428H6ncBXv+53ypXAHy+bQHxcPH6A4TvhhBCFfRXfK1/J4+Ut2Qjans6p4s/q4EroR334M7cf+s4XyJW/Rzzizul3/Y6q4+GXrorRu0OUJwai1Raz3HVgLYPAEKw5P1CVUV4tF/YhiahApXFUJO67ML0esdlRY4gM5amoyJhmttfjV5dqxBKsLXJkcRy6CQHiOJb0oBkoZ912PiuR8qbiScU5M2awcqjHmr5QiQohsgoqCXlu8AK+ubE4Ei3ZNSKsZ4I1ASaSeaEgJ+5EE7l8A4hqC5KItjsA88NmZM8ndwV7+Cdgq5DXkMWW1dElwr1aE/xeeCnQ+4FF70r1Jv1AE/rUlt+bYYDJCfeiMCeDiocfH1RCM+zSVLa9urTicW8hrbxTc8ReSsKWYepOTCphxM2ymZtQLwrzvV20i8O5jmKz6ognOYQgZgUnsCQcygNRblYLiH1i0LkeF1cCn/NMfBz8peW3Zx+z3YsrgXL0hnAl8NWv++3t27+/XAnEx8Xy7+0CVOcyNM+4KnXcGX+GZXxn7O1XoAnQxAlz8HmHj4twhe89nvC47ete8Pe27/qWL98++Cnvt2H97i+/ebx/sOgOssK0tXINpNHKCQO7+cVu51BMsIYFM6bjkMFHwKaA1B1AXmNsKOa1xR5tDUsIHg+Usj7jh0aQpdeun7Vu9XF1yV0nsgTaGGlLd11/vy9WawJKCe6+zgrh+6E0x870uB4/a6kOVm6sQa2a4b6DpRGGffAgVL6VUk9GxlpxBFqQwgj47gYIoTKWbNEnhux5u0Q6kVPOuAFkNd/3QtQDvVdoNYB1u3q7VQ+a1G2hC9WrDvWK3ORQIEuTNgFfGO5z6FaVaoHawXU1wAld2PFAY18cB4AGMJ0diGcO4CHg8cFryxfi2sUZLWAX+JrW1xx1Irr73eptKaf9ynBPdCuj1a4q2z3XEJvPH7IFsQYA9IAcuBKIf0HjxV/3JdvjHvdo+ZuEvbDODr8d/GuvLZvAciXwT//sL+om0E6Aq9CZV7OiHn07ogL8Awdgrl0TkDeYmcZNcsXvpptu3j7rMz5h+5Hv+ertb37axwn4Or8TabppjUi75U7enuqboM63oEGQw9qMYaRiA9rkYMvHbfVNm0xZrym9oQYtBuxym4YlbWX3lahoxoEUFQ22mDHre/PY5jmQVWiIhREatHRrLxSWKfvmXvVcu44cenE566wb022fVsE90LxZFYmyJCXnzXlq9SK9/cIL0SxMIOLy6Q0LEqgjyg8tyPmueFnOYvKlYMCKDKLA5zVcAUI4Cl/vxg0gdZFPCIabmrZZoRs9TiglpsGkAejxVtI0tUyCT3VNEEQcKqD29L7vzgG5oNpUOUtAn+1JLbljJGNcEKPcdU3m0DqOfY7lQ+TUnw4a9WMkqMf05b5bTzpnzhVydjpM0mDO2An88jneYCauZH3os/5a2QR+6fa4d7WbQM5OfzHk1177W3IlsG8Cb3BjS/lshbNYFYkpnt8yxZi8SX6hA78w87QP/oDte771K7av/YefW/6G4mPlSiCuCB4/qM0xZ2ZZfB/QfyeQ3FKfhGkrAEyTFGojvxPlGM5p0GqwgRifVfV4essSo3SPUKBFGMgVxywjTWA0nNQBvFOoeKsB2/oOf9AhX97ci1P+RyXckGL6oNphmM6m37NWXq/gFKr61j5YkRTV16vh8pRlwupIM0zkHQHuMm1zVKOiETC2RpuQU+kIlmcEfgL1G0CAIpEC6XgM3F+fjuF7qaRjJoOU/NRYcwsW2eNo9SYCFjIKrCJHmTnOtQOnL+iq6H6O5VoBBKTAPlcQBg+Tekt216fVyq94ptQl83f0oc6hDgaWC9j5i1z/YeGwurwIsFOn7p0dwZiOvoihFkrxsDZjD+LITeC3vehLy9/R4ybQN4krgb/6GmwCf3x705+/Zbu1/AHrB//wPWo/Wcx0igeIEBlroL4p4G/54U+7fMUX/RfbD37HC8q/k/w0+QUPfAfwageKsXBXiucL28vRhcfNKyRGOQCQKUea1JS5tx+H6tXASj1E7yBUZWUjH8z+PEWiswNs5doiB4paOGWXdUEAYAmi0s5IjevWk7IU1x6sZ+2dDk+m++N3qAYfn0PgvBWVOCkwgbMdV6kEBW44xnTQQw6K4EhE/AbQdkOSUif3ljBCKCF1xWFkxI4RdjvhIGxSeNHgCweZo+YiYvUSAYQAYcqUNtGF/m6Kygq09cRugWK0nxZ2ReeAplcgsOXgDFuAiWQkBmO5cUEYpt+YFSfFFGQjDSYGRUzUtnbh/H09eqiR1DOl1bT4IennX6B4WeIPJbl6EuWaJSmpOIuXJFL2RinwPK2iCGCSfkCD/2Ad2AQ+99m4EvglZhPou7mzbQJ/bPuzh9QmkAvL0fftvAipm/N7y7+Qgn+X+RM/9rnby77rhdvn/51P2+4ov/iC3/q9kUdsJ9ZC3mGcU5MOFAFRMfoej+cRPlHz0cixft8U2Ojc9srweJtzTMbSSeS4o9RgteZ0lu35aeqKaYvHXOYX/FQrwx+IWT3Im5Zg4mYh0zkOpYzQkGNAlVljzqgZDARTYme0vauKjVQ9alCfvhQrTqC0dDWQ1lsVKAOu82i9iKYPxhpBpIyAh8NvAJGEHnUTQuBXQo8O7TBQxnMXrlicArUGXN6aKS8RvYkzFrVCmS6hAHbDOKIxxtxlo6qxjaY9BC5TH1itwJA5GIBAEAmuF1K8ruaJ01YIXASveMRjvbG1MbLWO4af17PqyXwYkpGO5RjbpGHidrw76hiG0WP2oTHeVH6x4R7ZBH7bi75Y/kUNbIrsgVngF0Ne9erflI+DHzqbQHZp1vngizV/yeNJ7/0e27d+zReVfy3lS7YPeL/3ko977z/3Isom+njBY52dX5jVUspOu1ffYwlyqFcCTW5ZVAs1rKs7d4Z6BXpWY1B3As5Jn68eEdTsnK0dYIddO+Fr0+MMdLNODz1Z2/e4V3zO7DqqAeSeWuNQ9iABMFKggd0GNjOODscGnG8TUMgOUwE/7ZT/eZ0DbGS9yhjJVCVmBbxI8lvAVjeApwVMAnQeQjd6/F4H8/ORhTkaZCigrt7LA2Ogh0xQeUvKaVKVkNZK3VdrdZ+KTgmDfg2IyjmpaY2WGPSGQIPmRoLnBJIUTmGkecs1Q3SpF7CJS3qSuv5QKdbrpQtQa3ZUa4Ihji1RjYkc4BllAjeqARFcA3zQTWwCP+w5H7zJJvAxjwq/GKLt4eNgbAJfWj4O/vM3P1Q+DtbedGmPLfDdd98rH2V/7t/61PJLHl+1feonPl++/3fvvfHP4lzxYRnaGQKugM/qGZedd440BXg1x6nOgCgBkZtqKnEnnZWS2FCvRC/VakWawKg+Rmw9k6UGQ/RbkZMG+delx/J1t8Lvo+7LE0GBbDyC0Y0RkJgapzeqmQzAJIzANDJ0UgJGcV58IKbytSHNyTxqf7aGtft20Edn6m2+Ae6vAKLo4YanpSQh/Ve9UHNNlCwYSSNVjwJERP3oE78cKZaCvKL3lsRU7WgQdXjrD2CJXPUqABugOEY5msHAzhjwXIoQhki8RgsoYLwB4w4AqOcSibjLqxPpVkoVbCQRGEJrvKtXClj02LHNslCNLVJEYgTMQmGzDkfg/BEydDl68APo2ZmwrI/pJvBDtm8tVwIf+5hHyibQI7YNHwe/8tW/Id8J/PM3v/Uh851Av7yxa50vvs+Hj3af+6ynbj/wkv9q+8ov/eztsY9+pPxpF31TBS/ncsVOja6pta6DliL8csOUBcIV2h3q1astUm9atJ//1jqyJvzqELFXbF/LL+Zv5web9bS+zZYIdEJIcbxfJgnqo/x2anebtVjXhjlgNJlmKCm4B5QIAfMY+xiqyGHJTi4bu8Go54u53EStaQMATJNWWu2qZz9KH0EXRJIW/AYQhTkZjrt1cqBEa0rq2sCuJgCJrg0V27v9aZzMc7+iFXNoqOmDDYh6vraDX+z4rumxnnyxQr4bVCK8NnxxrToR8FuBZpxQBaceMO0CMV7H/uhowEKNSmfx8WCSfkcsLcIzusaIWMqY5BrP3wgT7fL4rNFGtpk7jJCma+dHu0kORkAEd4A/YAHOZl0Q3wl83od+iFwJxCbwnvJxcJyCbAJ/7TfqlcCHyiZwNq9ynpSpY3OL33Z+4Zf/ne37XvwPt2c//ckbfvHjvvY3/ewsYVt/pr2Ik86xQYeAZLLo7iNmAYOATbbizRjgJeMYAASQyzelY0aQEumr6EnVQaBX6ZZ5+W1TYpZjMgeXguMCCcGGCtbuLEgf+rWcEzZe+6BZ9Sg/VwDiyDFXYusY5yhT42hJQ4kmXuFZT3LQdAHDYFMH63I+1Gu+kewmxXtksCiQ9Oc3gGCySYwkDoo2QILG2I6LSuESOaxHlQUBkJLWK0tmN25bO2KzVNWbUWInO/AqA9S5g+2gnrAZkJ/cYhfntAXNlloBapzVplDlT+nE6aaI02HVcSSemT2fuKPjfgdeaQfP9tr8GegqY6Tn3EvWCrjIxZT34ZlIcKUTk7adPTB2VjyLaTe6CXxauxIYN4F4GLAJ/JVf+/XtpT+Aj4Mf/E3gOBtEyt/0Kx/r4uref/opHyV/0++zP/OTtltuubn8hi+/56i4G/I4jE2502RV01Kt3Tg2CLs9N4gggCPj+ShfHRIN8zoPv9IHeSbamOv2qL42NcGeOKxgKF6mTdF36b2+RA1uFw1BEqztip5wrkMjlmN/JV6/wtbWASnc+twi+YjPAqpCD0ycFVbf5pqy3fQScKIhUny9KoDBNtCK0iCg+Adq4nyXD/kCNrgUL6PtzoRpsnwiMG4ArVZCoKaOIwB03gQDR2DFOHTlyrJHfTfXku5XlsyLgzZ37B7leCTlmMIY09G3WLWt+JjNInb2kmdApPYrZpoudr4lR186aXu+IL0UGsUJRlwINhDBow80Gb3eGBmZNrKDZ7rW4vnY61kt2DFDgRiPvNEnM1PtaKKqfnA77uFjYRP4/A8tm8Cv/eLtMeVjUvxiCFcPI6Yom8BfxSbwf9ze/BcP/ibQru79979TPtp98ge8z/Yd3/hl2zd91edv7/3Ed68f9xLJB4r+AzCeKMn1nlIOAabsYbL6/XE+u2q60OcKPBMGqTSg7x5djeweSWnz4I4Al8cKoNZQjwES6FviJTb1LuFmnKonj1CxxS29ol2WylvPo2MJr0KPOL77T9XsR98g4zYFU7WPsR4ymGuToF4LdO5gZWIBJBBoGT1jZugQCy5rBhG/AQSIwMA/64pM1dOa1yBc9dhLVwyzImBv7AITJABeG56PTKhXXEhWbvUkcKzyrCMXTws4xHmHzSZtohxu2ZHAK6wwqCmRmUKm2mNR3zxtO2hpRYUEjNYqTH56M5B99g5ikUYqpqPfEFy+EWC6hUlgCN8QNzZzrDb+KbTnPxebwC/aHv3oR7RfDIEaHwr8Ysgr2ibwLx+07wTaGeJ7fu9y5+3bF33up28v+84Xbh/3kc+Rj7LvvY9X/bDInMVswa3iDHMw7pZ7r65qZtUHGZZngqPEqeCCZAwjf7Gg/d5lpVNlILRnxDH99vyoQtQ9yh7qDwIIdDWmyWPWI6qHIRJA7OAJAKDZYQRhGnfGOBqXtoIeXNfuUbHTOFTRSmO9nmvzHUGHKur0uOU0lKlesgJTLPQKvrYLptYzdZy5zjpo4vgN4H41I4EO5wRpq/Ymc43vikYpNyvZJm2o2HC5jjZlKVOb7S8FegULp92rZ1VOd+REWBm1pEVcwj50BdXJzJ2xwBybZsL82CjHwOGmS+ZScpbNmKOITkE1PTAsy6EHhzSOlonY8YMKawZ+wMRVCv3Pd7qut6M/STPMcT6/isCAIyNoxtxbNRO+dpNNXSYsm8APe7pcCeQmEIq2+zvLn4h5xat+ffuO/xpXAh+cTSBniY3MR374M7Yf+s5/tH3Z5//N7RGPuEO+66cd84HZWQuK4bXgOl8PUJZ6UoOF8n64xkDhRl/QkToAgHIMoU3vRM/giy+f6MU6TsDgXXzmAN8FLbtHZ9wkbgUk3fWjHvwBnkhKCOCBwOCMFOMGTxPjtRzl40tzHlG+zz4WISLGMz9XQZQ3VeNH+lEDKHME12R2TP1RBHRZNuq0QEYnyOSEbPxqErmUazSIkNGC3mA6EfQbQNBsUyR6ueoxaQlKR8RHESiRQ5tAsjGyRi1ph5ZWfHMtZmVH6YkAwjj24REBFtmwV0fHweJNGHTsJeyV1F6u6UUgEkeOiQCmny2BmU2adiVNDwI2vtFxlIkzr8X+J0QXtvVdojnyWldgrl7xc2YeFbHs8bXwWoAhV68IMN4aU9HuHn7udcoDb+WzWPUhHweXTeC3fM0Xb48u/1oGvhPYD+jdVP5O4O3by1/1BtkE/sVbHpxNID72feQj3mX76q/4nO1DnvL+8osfiOmBPmkjMlkHhg+/lqr6qfvWCvth0a4yRnquWaS3gDWsgrUtptv4oarLVbsHOrBZ+5oNKobHWw/2spQXUi8KzB7PhKtUVq1CdIlPG0Kw4olbjfH14CR9JX1T0bYtWjvn7SOUl8+PUY5dDRFGoVBtDADFNCCTo2uChnOQvwtfCFYv5de6AgwApkyY57ukyh1GW99Aq5mIWBAFEpjfAEZA9K2o2CMAjfI2ZPmTwaBjA3aqg4JfiZK2p1qCtsK5fa6c0/D1vOeAu05vgmvXIgzsahwEUK8VOMhrMAq0QDfSJWAhnNb94UuhXalYBUGqix93LL3Xs9E9rX1sex2VAvv4tKJwe4cNY+Vq2oYabmpYdNAPrkpY/FT0mhJo4HrqYRP4Ec8rm8DycfBjyiYQ/3pGPO68/fbtl2UT+BPbg7UJvLm8/uEqYPxj1tpr+oDEaRi/4K9n+Xz5psl+WsDU1jclBJBNEaQ7lnUISNkWWPUVb1/v88KkUp/+3gh874XsHtnjh/wg4PUDur02uvmZfgQA0rKhZdKXZH82eoJuadYWiXKey1t9ceCzVC6fR62mtz2e3lhjjIgOfxkEaZAp4IsMHtWY4Caw0Q/pNTRldIziJepCxTkk71VzL7TgN4A5ZRJ1LQ4YOQEqJNQcsGMgYUCLt5KmOXJPRGp/cwYA6KX34z0ye56Rq462sqrvNnuuJAuAdV3tc3EGPQ0M4drxLC5pJJeAKjIZcvpRQa75Dr6miWqbQtcTtWyQMTJNjimEJmmGORp2MCuCQI4B1V1bvEev14pNXK2mbgKfsX0zvhP4yHdJN4F3lE3gy1/5+nIlEJvAt/XvBF6t9O6yxJmOhH2Ee0cAHD1L39fQvJWgJkdXWDu33Vpqm5cFIBh9F0gVglQXEHRx7ftLAzej41toaRCvvdCzlHWXFlnsQYCBXMVngUHEYAmwZUx6wFtcah/QT3n7QWkLL4CmZ2PuC5xEuGUw3FncPWemICOUmJyPXtIwAOpxNKld03FYQVnwuG9FRHxN1XuPdyk6Tp/BLfxLIKNyRw7WGiznQO1Lax9o0tUIeFuuCPIc44MQ0E4pddAUSFyYQcACtArhpKS6LjiIumx3RkVbS7JHpbro2mIBoC4qEBqChr2F6rhozjRSli3lA76BhWTREZj7rMWxKzCS8/IoOOtDvgOoC9m+SrVm2Gyij4aT8A7LpMM8g2uA1bSAvloj7qEbwSbwI5/3jPJx8BdtjyqbwPvwixVhDbkJ/M4fLJvAt9ZNIKcbsNc1033ZfcS6lyvyOX8Wwcmc/xRDhBtRnTdJxHaYbPFmFHgs3qV7xuJLreKu2/P4rjizRjxrI4Mb/ZnCNE6BKUAToz4iY19+oaNogo+QzL+Qlkkhln0HEPG8DKJ5Bhx/5GvCtWMWahpjxKtosqDke/Uhd8ilev21JHW1aC9ulAgwocysy9DQzajgmic1phkfRgIxQsPojFcATXJ91ltgL0n9nqVVxvWztoqMCl3dWIBxYsUMrgFOTMMVxCCgAIRxRLiPESXQK91BiTcRak7WwQWlqIdRjiHAxGQkvqapM21P8XiqTCGtD1NyDTbA3Ix0bZPN5pzT0SKHNyN5QzpNroRZSzZubJi42fmZtOkiIILrBIRlAUbmhph5x9dRSjaB5RctvuVrvnB7JDaB9juBdfHwncBf+pXXbd9ZrgS+hZtAFr9xrbHC+TH2ZH1rH1YOJLju4UcgYIz2AI90YJ1e4gMjR14n0rtgwAeXqlN8BwSLFXlJoaeZ6ZEdKy6QvXyTUO0U1LaRQoh60HBNZYCkUAsVfHwvhgRu13A8GN8BxHKwfV0aGwmTArClz08cZ8i1fQcwtIZJyN8BRLxOiF8P52gpOtcKtAlrI93mW+2a9xvAqBP9JhoVW0LqoJbUE762KAi5bt+xuWXwOaBF9Y2346ftNkZidHpbcIuap/lCAYRFWfbRjjqfai1C46iULZ/ZaQEWyQgxRmxtiG6ENb8DwKC3nI5LktEEdw1Hd+izWjv4ksbrqKDmRV0Hh51JaYQnKSMdmgmuAF3MOUbngTKvtz42gR/14c/cvvkf102g+xMrOifdBL5++84f/OcP7U3gbGl4EshI5wqP16zORDKDuy52ARR2LAaTUQXxxisMuDCmdDYwBYQaHu+9AD3inhQY4YiY3gkYahuMxQ+4EIh6kLFSAX7KLW/MIl/1WOp65L0KvbHGGJE5WAJs+tIxOfuz5SbQ0UFrgagB7WkyguWigg3KRflJe8dVxxb6BtCK7yoCYAm9VUbtXi/+sNHRMytpAMIU9+ZMZD9u9HLwCEBn2l3SoxMZuS6944DNWrp+Rm+v9I62pI3cifOyKicNuIZjAx7vPa6n4RCAET890zeQlUm40CHhwIy6YOLsLBDSBqIvCCrj6yFmgAqp9wUp4MAI2mECwgWELI5dmpE6YlgSAr4L3SCL9W6QfJHFJvCjn49N4BfIb9/Kx8EsV84pLAc2gb/4itdt3/VD/3x761++vfwrHLfool5ze9cspz1iAhcfoaPgthNron8SvtMvJtInA+2ob9uQR64+foZmIRfYvqL3VK53eEA+E2g0P1+ERzgjtSpdgq3fFuFMhxAweKeHIlc85A2r6Jf/Ib2WX2f3OjGzcNBZ3E672Q7sHKdJhx3rqwij1zmygmrCwy27AkiEZ2jU3U+m1TeArCKVHHXikODTbESujFRHN4PMePzcC3i4JiT6JaQPgv/dqbmmyWBBoMeFMdqKIsB7iCqFROStrXgVH0SZDOPIZ2vISFZ3gcob4UHvgGtb0wIHSBZiBWqczQ798VHSuSBt2QMcck2rIO1PE7XU3tDoVarjmemR3EKH7IyjQXICTJXHhyZHg05MoMpNwIEBbeqDGdII4WCYo0Z5j2jI0OVIqIwJ3uUffg42gR/z/Gdt3/w1dRPIj4PLKykfLWwCf+GXy8fB5UrgX2ITeGvZBOJI10hTZ+8vlpoRbRz2Bc8PNwerh4RoWoQHeK/DY7wpMMGxJWjoyW5PeWbGsTxycjlkzFwe8Y3BYy+wrX+ohpWjQCNCmeoajPr91bKSMj0ba3ou2CqORsDBDaGRczwi3wGsuxVKcxxV5pkRi8jYKFcTI9U0xkhQigT6DUaVFggG1eurCPkYx/ZKkIAgM3HtW71AajtOJanj8labCYxhan0DSIIVJpE5N1pgT1CfY1+REhlm1nndIhPj4kC69Tc8ZRbEmmrc6js9xBTALiJcEVm06l04oB5vIkHnqi/y7KfpTQNMTMYgABfHdCkUENOkKdl7sgJCiCxFH7nPmbHOEaU1Boq47XzNJxEpHc7amcVrLamXKPpQXQFqxQWJvnsASfKKV/cy3Sx29UpUeMfd5UrgRzxr+6ZyJfARj7izfydQXouwCO8sVwJvK5vA1/pN4LA+VPwrOsb5Ot85sgAxEn13OoExAM6uIwX0fGnPt+np4/H71TzeyjKzr2EQlmRtA7Em62FUOCMVFTWc31lWc2nL+R9qBHfJXyTlO4CmP2NOWPuICVHCnD3bVzXcMxLYkRDS3QVw1MBuQ3+ErLldvV1AL4mK5b2+PTyFCjZvDeiWDFk9XJhBpO1yGJDfAHYdpUafgjJaxZ5AlDddO1Pt0CbG4LtsakHOXvtbtpsq1GaZSwRsNz7NawgkZ6NnZAiN9SqweJNcSzVjLnMkQ/Emx8ARMjCNqITgjiodgNXo3oi88ZGz1XfwJY0n6g5qMa0JcxKGEFKL9FhrBnanpnPOVhhrTiOxmVh3Srw8UUrKlUDZBH5h3wSG0roJfI18HOyuBF5e+WrM0N8gxqXEKO8WA2IRSMQZEj1LZSEby94Ww3lJPUtLpTSYpixX30zKuW9e8UGaEtnAFODU+4w83nuBsnLPlq9avp7xqDfUNJj5Ygys4b0ZMlZqZByPlDdmeauvemz9euS9Cr2xxhiRCVgCbPrL2VGrg7gJbHRCWqBj1QJgmozgflHfUNoPPQPaBwylJyb99Q0gAaCkCl1LLUvoOUbtXu+QXJcoVsKAMMW96ZiHnaA38ghAL32zpx7QppmRXPPJPFLsGIQ6a+nr+169UWMZYQGATreZEKjHpl1xXb+EJagxXiJLPSeeOnN62mCq0R/jsUNHMO0i7tHoJDts3DMEfSBNFkdfhSuAaEEE12OhYAG2uEc+LL0yPWwCPw6bwK+OVwL7jPAnYn7+l7AJ/Bfb2/idwJ6+2Mofn4Xc3vLz4VpInErZBlmbY/I6Z+Gos9vOEoCrKa3YbtuCLHoyTmmxwz1Zj/eecqelJB2ymUBrAViPH+EhYl3YuDUJGhxboYXhBOIL1oJ3MGV+Kma7cyYQZ48+1255jVm8r1vBT0FeSz2AlcCO9XPHDHvVGCuoDtdQqqc9ezxYYyTvqW8AWQVjWiQTGMswIudAdfyyZTpZjEo1B9eEeI7xQTCpTCyPgcS5DgIIENBnAKt7uaxGB8EFmE10iK0s2TNyXWZusQAQFxVIGoIOb0llm7JsKZ/gVatkp4CM1GOsh7HXY7Tj9q0DDZQCRHFc66IjIjkaRm+4w0waJlkcfTrRJ5CjI1i8Le5Aq7kK8QAAQABJREFUD2sH/3bwx33ks8sm8PO3d3kX+3FwmVadMr4T+PO/9Ortu/6bsgl8e/3FkCvOOl3uq2g6wUseq8BxeqUx+AFi283gNj/YkeAAKLQo5rDq2KtLSbqElgUTip+w9WBbX8mI2CP0b9MUaPBxvrk+cFVoqdeETxhWsJYJoRNiA/TG/x1Av970uGKYisYYCS1GQkgfdZv6rh4Bx5T1gk/BtgLKayoHH6uGp0E9w+8bQPZmkuvnJVVJ1BF0e+vZEm0z69HRsuy8hnAAM+ngjrIxYriZHuHQxRHhs5iA2x3ZLbBrgMGbgOnMfwVoV9MBmh6jQ4CJyTjBY4GyRaqziWmozI+SPXSuzBXSVviCOqedy5Q25c0I7a4ndFwXOplWnRDT+fwWZSIh+gvqjUllk7wxlayqbgKfUzeBd+gfi7aAYmMT+O9/sWwCcSXwmjaBocTcPbosfH7Yj1rmqvsZez6IbQMjPWajP7wWTADHr/5RAFcMJy81rk3iXXDh+IW33qiEiEVANviWZO1JB2RzHGBWA7b1BYzAlD3IDa+vJ+mjYI/IdwBNK0OrHVqtfYQCjajRQNS2r2o2YsAwIyGk1y4uOek52LrZ1SOS406F8pyWp3eFY+CtMZ2UcxoEhqwF0nY5dIEE5zeAUSf6QrF3IwDavEnXDj7ibVpt090gUMUrCa995hshGXqUj5Hj5QZ9nc2ROcWi0e9NcO1apBmRc6GfFjhThAJJ/XQpujbS3SM/JWlyBJN0aLR0rYKIje7J7OBLmu/DqnRCWxpK8LOSdZlm6eVMuMS2HGOOaAEu8VfKwSbw4z/qOds3ftUXlCuB+SbwzroJ/O4f+pdlE/gO/RMxD7VVkJPhmh+zQW4IyCrw9JEWsnUhIMtVBVXO9UeaCtrX+/VTebeBsUQiOO8uZoLP8iGcFG0hQN38bD+H9E4Uo16rLsWtd5EtHRRtka/tsFTeXR6dF/d4emONMSKalgCb/rxgmuEmsP0Ag3K7eseLtZ/rDMWY2hOnmHbYg8IjNoj0DSAB4AVQl7KWJdi42m0CxT0k5yQSBsrxVs1OSfA9mVtGKwcwCu32MO8/xqTJeEFflY/2tHIZRYYRV+Byh3IscrmSMpd6un6z1Ujj0MNxYX+WrkL93r/I9vjFVulRp4+fDM+qTybI9URTyQLtpOtUqjZOoNWCDBMneEhcU+BG6++3KZvAj37O9g0v/Pztzju5CeRjoeOd5beDf/YXf3X77vJx8NuvsAmE2qHj6LLYywOHhHdAaNDVHgJOwM6HNI4CtAAEBrlLniOmhaJn319MppqxgRHhI8TrLOh1jJtdCe/4o0CV0kRM01dVanMsVAJ6Q6EFAAze4lLb4GEaN4WfCMq1MejVg/L0r2fsc6VlSkoJxod6NmHtATgPsBa/ftbWnnoc5xI7GVbQh2a5hlKr42fCM0TfALIKxsMTIGksi9co3bhUOTojdBKBtjlCKdEvabYa0IY4Mam3KwCAgkChd7repI1Z2NaS6lJQ+5hxTsc5mV7ghMRkBagZlPCSb1OWLeUdvmQBwKu8JTnMvmOpvt5Yca52HIsXP/2AQNvneTPXRsZ2GZAszXGRtvPzsKov61nLwZ4T9pJe/iJvt4GLVM+S8Ishn/AxH1quBH5e2QTeXj4Ovn+QwJXAn/2Fq20C+fAtl3yovAoURYquYEdzg9YQcErI2rlEf+gtANY/DrpS1ekCsPCyIPXhpEfHp+kh6PHdg0UPIw87e8SCTwrhYbRKSO3A/WMN8ECIiqHg4BoB6g2YSwPlVdDszvflz/SOdTa91xa5+sx2BDNhLgxzDOl9V4l8T2snI8K9uJE5V4hbJYxmKY1eMPdAtbzohuXuG0BqWsCybyQBtoQecRmBlghnxlrpSCbGRQMtrXi99pIKHgs2PQ9HGEfsZAJXcLsnuwV2DTB4EzCd6/wOIITjhKTYmbswt6lem4ArGdimsM1MRQ0+NyOzq3YrZ56MVrl5vaN6QSG4bvGKZEzvz8owAN4nHG38YY3DlcC//jHP3b5RrgRiE3jfMB9sAn+mbQLvenA+DjYPnzx28lpqg0Pb5wKUaucFA7lMg5V0irRBazc5q9CCc8N8yVbkUs05/VyGP8atniax/+DT5RgamLXf4QFhXWs33TTYsoMR4dEfCDsBw2//FnCdDFK49bntaKVpr2DKtfdL6mvO4wdJpkkaAD7g6+luo10BhIbozcQI8Jozj38HkPs6sHnLOba7BMHyGMPhN4AEEpQQmJqNaIU3wcjCwCoGZySJ2Z1lJw0gzaOk+4cJ7eFg9tgY9CKp648ncNJdoFvxkBpcxeKeN4HQ0fTAOh24Lp2scLognIAS9ssbhKdmFZexnG70l2wmd/AlzWlrPYu3NvXKSIKEiDFBmkwBx5gxkbYQwMaDqCJAcwQ9SJH97h+IxuRK4Mc+t3wczCuB803g97ysfBz8jmveBOKxNY/vcs438jEctNePzwC3jXM+QcK73rP0wRY9+2pcELv0XUAoAzwb33u6RO3o1/6SMIr2KvD0AHSAM0ACfZIuHakH/nVoVj15hIotbtG10tbubefRnqfFhhVPj1mOXQ2I7jEvI1JMTyAOX+E+ppvARm96MK5+yFYJ4q2AM8cCe2VrPl6D6xtACnAcS4TIGigTAKTcdA5rfBCfu5ApglVacOFlwa7ZXMdmzCLbsLXZ/QGopV1s12nKXKQmFpQ/9V9HE2OBi3sVol2gpD+kLcQWS+AVTIZFH7MtM+pHf19xzUBW6sHgrYnGs7Ml5kYTzPS0xLn5WXRSFvUetONBLd5mjSuBn/CxH7Z9fbkSeMcd+E5g/ziYHeJK4L/7+VdtZzeB5LdiZw0IuIfwyoq+g0HOF4xp+q4lq0iAjTl7F+DQwydHoE+Lg7oLcPraDQRVlN31ErAYBbVn4A0+oRGmYKeEEOCAdjgjNUi94ubHLiDQDJ5mLx6w51z5oIqahnpN8kbxiDmpiv5wm6T3lPmKTnr7cI6BQfhssbqARU9arWPeV8Ui2ernSEbNxfStbwClUoFQjyNZwxgJHsC9CqLSl+jtihqRCbaGoW8ReFDoH1wHU6uYIFPAZboa0vRSqOOddajseYi2jBjlrgU89iIPWhfpJSvABUr07OODPi07gSvA9mYJBybKVgi1dPzs5jsgajVahREn9Uq//MFHv+ekuOn8mmTSjwgWPskNq5pMsxObJoU5natBwDRuq9EJD7Blm3mAS5tyuBL4iWUTiCuB+JdBuAm06ymbwJ971fa9L/uX2zsOXgkkH+fGLbf0l1xTese062PtHdrRNBpkk8KB0+u4VIX2rBD8nae3XOdExQbJDXlSdbb0atyRdE4/or2PQrjZaCwefEBDyPZolRCPvkaMwI5epmDrDbbdAUB7V39QmAfKY3VOfpz9XBxrMuK5Uj1rI4kaJQhLIHshLhlHwfcGAp0FQ3jivrMuIPY48dQfKee0+Vhz6uOrEWfEcawYIr4BehwFLAtTtgD2zAgqucs2TRbCvGGB3H8J3lBTk1qu4REZlQGPsZGFyDEUuWyjsVqgRQi92jjIDYFz+gfpmA5vah0sw3U4CCes12LkBoyuNzqTBWH6TBuLScxSk+rzJZ8SzjR6FeyD3oA0L5vAjytXAl/gN4G2O/ydwH/7c68sVwKPbwLxSn7X3fdu/+H3/2S7/fbbtptvri+9s/PBFsS7gPxEfZX1DVyrD9v63hGiSxupWfsNkgKGgg0+NWoDIjdrxpEPgRojotW3P8ZFRDqxprdnRDXve0+0WI6jK5DgXT44uGRlKdYO0MOuOT9F3mga08jlUQMIJvCY/MhjtC/NGHFilOoEl84cWxV7jneW+Ta6LdeACDZEJjmN3VQWsG3+jIpXa4W8jgf5XPCgMG4AEaUIx0Ds7ghgWxzl8aow2c128gFr1HePf0nrdT+9740fkCYEjfKWlLMnHNJtXsVO4dQ9ParyoG8D11zxuuVkyq7fcRGQ5m3MhshhYOBVd06/3keOJwWetKjpj1DLAlqqGZ46n4DgmLaSFJgo+gYtcUqg4gMxckaoZZt7IGr3GtgEfvLHP082gbebK4G2K24Cv/eHyybwLnwncHwppSJmcnNZX+i+5Pt/bPvRf/F/yt8WxFXG3cMug7V3iQcBTZMGR8/PTg8gc3TlGsAS50vlXmlA5A4JHQK5Ovn89LMCB2zOgRoO4pz0pdcjaiEbhG391ssJQ/hltvJmXBf1BH0KrW/u2Bjh4HrO2wUC2TkCOv0gvkesxaxX817D7zfXoDRIaX4JuO7ZAAFtjMyWWBrCKgXse4qfDXV9VESZWlbQZH/VAom3A8T+EOfg1kMx9JxokZwwRBf4MGe4Fh3Sg3IaWAqY3X5Kvo6gbaDPB3OR+SAtZ0Px6pPsSlVZzheo1aTijrw01PFwqZkyidekety+p4QSrH3EdqI/o9c44KwOW6syskNu6QUeKR7lsbH1EB7aTQNWPwCCOwr2+aX12JsQIVZuKGdLNsxDwUCPblEf8KbwnUDZBP6jvydX7PBxcHwYsAn8N//+ldv3/vD/VDaBdy83gZjAzWUX+La337X9xE/+X9tXffMPy28W33brrdutt9zi5+emX5z2fI8deNopzy6vzMwFnFSs6tpzyOoYAMzIzyjL2JUFlupDf9o+O8e6xLXZ8VUgFO0cOx1bRQk2W0sz1CWC9gl30EBgCJ4Q9NCZ0hjHpMaoV4tejs+XJ8eKIglR/qCPV3jsCFqFw3qNsahUxKhn4MZccE1qRTC5vgFEUd6gwyaMpjcJzoHMQkfqyYtYjvW61msqNqh2SOmDovpmfiNvFrF6EwFAmLpCpVkHQ5z1UFProYHinb+UOmhLwBWwDmeZ0zTKjoAtN+sCQF/BWUAy+Bl7Xs1krJ4JN/kDBmi8KfyMEBpY4JnmY1N8ojlKTToctZFyTwEEhqRfzyRtWUhDbXng+UgQRtrdWNJvfNI1ZRu88aVrBWzqPuWvf/j2dS/om8BYXDaBP/sr2/eVTSCu8OmVwLaYES6bQHB+5/d+f/u27/2x7bvLbxX/xz9644bvFuLPPzwgx9Ae6w4JaSeeT9Efeq6ArtYtc6INtDxQuPEjyxx4cZSzp4D30bvtH6gd3wtU2c6xadjWr2A/ANDpPieeVaDNMYEPWjGw4CZyrrdCtd/0ghJuvoL3MkkfI56jz7JbZNXOcY1FQgusDapxVLT+oL9mMnumYL3qXCh4iQYTN1+buoge0I5k4/cNIDVZjSPj09E34L3aH4Ll1n6QnWrZBCcXFKsWVya4VuCYvSugALNmoovo8VMgsmetdVy3KnYIzDQOxlO9NHhQsMAO0LFuOAA1P0NJLL2zj08KWAdJH1sbI2ulRdZI2fmlDGI5piAEdwGOeQ7NLosEF8ipPZSc2cxm8evtnZvAry+bwDtuv7X9Yoitgg3dT5dN4Pf+CDeB9ope3uett90qP8f93z/1C9sLv/Fl27/6P35a/gbhbSUuj4ls0HOurX3apiTHJuAD3msgMdKcDVpbGDjJhqAXHTzi9Q2R3gBrgX1EgyaGZcMefyw1zxnhB98KIO985wjbRmD395KgK+gjd+CRy3HCQ5oNYHMth+UwVlN7g9UDttCtgrVVCgRbT6PzexboHKsJG7eehZJFBJcEwA4csbr83kHRaPUiYNC0vQDcmB1pNkf4OVA2fxVm2YaQ63RALwMdK2LKjxtAAAngaEV37KEOAjV4LT/hUq9qevfChimSzq0WqjnraTUbSQUuDkKf6lJL7hi5WNYTKaeTMRU97LA36Hkm0xqF1wp7oHglDwhvCWIvtKaus6P2Dr6k2/O4TAto3o9aWcTqm3WhqYIZUWITdoI3QpaUIB9aITbL/jne2C5xZe9Ty5XAF8nHwdgE8u8E9n7wz8b99M+UK4E/8j+XK4H3mI+D+eCFHgsVr4fYPL7pz9+y/fCP/qvt67/9v9te/brfLhvN27Zb+EsigXZ116xZM5vR5LOugRqRlULCEjBNtrrdgKB+rtNiS/puA00mM/bZsXjwKQDxkDpWjwIL8iI11jgABqTBaLCPUTGNOFpxyv9QwA0pplPuTlY5VqHbtsuxns3WyjZk7byxITpQSqB3U+FDYJCZB9rVfxURt5hzSXY0R0gxwjBaaI2PG0CwLFBUzt+xbirX3iVXulYhwdl06ZdXk9D6Re1Tb0cAsKgf/aTbgyE2oU8gkkSfKXGur6LUGOSGAFtJRmADPrg+rUmuY4SOBYCoKJr7pEFmXe+s4A6+pNvDBWg43+UjEgKGThEI+nCBX08CRDnIjiPzfTQIavfkw8TCHDgPthx9xi8d3ynf8fvUTygfB3/l363fCeQmsGtiE/hTP/OK7fv+SdkE3m02gbEdPpaVio+Nb7/ttu2Vr/7N7UUv/m+3f/rP/tftzW/5S9kctveFXubqFuq3IzaXr2ZoubHFGCXCI5IAvIL3wvNFxFzPHt47PlmnyuQsG43Fg2+h1m5tevwICZHg7s+/FTpmQB8t+bYqNxbfkXQa6lDBpXZk5mmosOEchaxHeM+xRrBL7znhRxItvCjXz82ovFgd9hgp1+FD2xz5BpBrHsCGZ8wcZOcgchKo2EOvalbBlMvMtpZ64b65GXYVQ0mQFwJ1BnLCqc2t50r4SG6cL2uBLTbu2Ft8kTxSYoWxxVa4aS4IWJc9B65dagsPMHUJ5piC5kHoW+pYb4zM1ZBZ41u9WlQ+4oFdDvnUZU0vqACAa0PWhmg4kK7l2hgg3sX5RILPPEw8zJg3tAybh40jZnMzf8Tgyt7f+MTnby8qm0B8VHvf/f2PRbOSXAn8d7+8fX/5OPhubAKzK3n2uSutaX+3l4+Y77333u0n/7f/Z3vBN71s+9f/5uXy52JuvdV+pMxKl47lQY5TC1LxNKA/pQEwTUJ8F+A7iO8Pu/RdQO0BuPHwbH0s/JMhTi74VtbaUop6va6vh3iIRA1ZDwRjomuespoM59ECp2Q8uM/Tqlm741m3R9aWV4lsZnscke41EyGkQnpduyspHe/3VdvqpSIEpMkkqPiqLlU4twRcQkTm2RalCEfQKnXcAHJxMJLQlDJjB1TTOIftl0MzpUMxlqsT6O64GGNkUeEgGPXsra3kQlpTBwtUHaJZiw9Yqx5fJHfrTwAsgFEOBujvjcRXgaYz4ymA8/OoLFr1s5QnX+hV/WMn+4U1Cg1l7Bx0Gc7rsd3IrNozWVs6UtsTfQ0aaQ/5CCZkJzWzMZGIzWJ6JfA/KZtAXAnEb/Deb/7FEDBw4M+7/OuyCfy+f/K/bHffwyuBtnZ5lNom0MSLiY+F8Qsh/+H3/3j7jh/6ifJnY358+3//vz+U2M3X8pxnPYy0rSVTMJl8ZRxAKXJP1fYm2aIGtGsWlbo+cj73NneZOQAq7EwRM8nZ86c9R1qBgEwFe7BbTUCMoNKT7WOCggB5JtAZa2vJR3LayVq3Ztvf+D3c7rKhUBPYjken3VMbsT4Dm60JhAgI6ZJZHlqvfysUdDk9rd6gaQvO5CkAPeJLnRKmN2PuIoZ+EqVSp3zjOBwk7ndQiXMgpod5yTQx0miPRKg9uELwUZQzh3c93nuGNDMPEGy9A3BT6QwaVRTfrSrVFvSMnmkjmsOEGDiqH/B0Y53mA9DnhjA8jWQ1KVhznQ7qqcMq9Uo2ekpuF+yU6eyyLACk3qlkZjpmeTKFoGIgM0ED+Stl2vlam5PMYszpiF8M+Ruf9BHlRfqd2w/805+Uq3btDztX6J2337791L99eflo91b5t4P795+hzwdrXotX/fBnZn71Nb+1fc5nffL2WZ/x/7P37jH3dml50P4GBsoAw0BRTGyKWi2l2GhrpKVNSANqsdZDmhIPf9toajVW/adpjE2Mxhi10USpNTHxn0ZrNCStGEw0TQ9xwJZKgaEih7RUEBypTQsDwzDjuu61rrWu+17HZ+/9/g7f93u+b+91H67ruu+1nsN+9n73+/6+8fbFH/ki+2TRd/S4Nzo+5t21KegrMS9N4PmXyyv95ar1w4JlE9RdgTCzPj+fL/GRs/FJY0thnNcjkIgy0o1l7djpghSZj9QjopPoAkQejfjjxVxmlhorIgrEONsX83h6rAE87aFiJAxBfdUY4c/57Cc526JHgFIir0W+PrTmzlao4WO/dVFiIgh/3kc+9iv+YMSYz1UdJkdBT6DH0TVkO6VmRmISA84IEksm6WUN+OaYS8Id5kkLT/VoV3gXiOWT32Mq3YxdnmjiOOY4PM4NkTzfghksT2ZdeB4XuCggcNUrbeasc1Io+/kTg2yPpxN4wZXKRyborJPHq4KqoCWLDtMl1d7VpZmmi+X+eFFN2KE/6usYKcUPzDrvCdx+7Pgt3/wNt6/85R+7ffazWJ13W1wB/CLI1/zdX337qr/ly28f//M/cPulz3z29h7+2jM2O6DeS3/f70O3H/6xv3r7qZ/+a/bJXtyFGbx+xt8I/IVPf/r23d/zCfuO4Ff9rV9x+5V/+1fZ4cA/urtWyFn8DcK/+bOfuv2J7/yzt19MP2ZuN6TtPKAO93g8bpifHUA8FHvFyjwy7EZyWvxIooDYEcYmmM/3ppN93rJ6bEY17tCnYISVEkyzIv0JfLF8YD64VYlqPCgIetFKE6LqdG5WbZ3tG2r4ZmVUX4+RohIJCI9iBX4ygO4knHOiMMMkodQ+ZoDXC8pynLGW8bAcEdv/CJgIEPlgbDn6SpGKk/rw6BhUGSwB9ZAqaYTwwor/YF/eskCmHQgQPuhuUBroA9EFhlO1evUtcpI9a2DQ0yDEIos+BqwUCnOLixPSUSOn8/PRdDZ6UT/6oLNOHq8KqgLVqZh8yiFUwjWbckyTuR8DA24VXLMBVTZo6vfsdbbHfzAj+O3g3/ZNv/H2b/yef+6GT+y6Hwenqzi+A/gZ/Nbw4b4arSRu3vBj5R/8oR+7/f5/+w/f/oP/7I/ePvn//vW7/3ZgbGXkL4+RSbIdNQS0yGhePtaw9mapuR7WeTOgzgqYhtMM5OhnhMfmco079CmQk+W5cWI6+o4GB4BG79L7QCCrC219mNi2o2VJ3jqj570SENrQUjolezzZGJFtNRkJmpFAP8BmLuH49M/uLVLAYnjq20vBxphpurjCOaEUm8rXjFPpHQq0BcoY1khefwM4AvfSEiEBI2ci6RJtWVjkeNwjnlWW8q3eoapwjeEEWpKdt0jTH8VaFhbZPtp7DQcLj6rNQP37TT37rkgtcBe7kIJIcEfKuFXnlEb5FitiBGO8YyP9DuoBRXoMaF0Ke4ti74gC6F4Xk9ICojNbplncqBMtkX1nlhWwm8Bv/o23f/1f+mf9TSD2b9nHy7WermS/E/CLJ5/73Gdv3/4df+r2r/z+P3T749/5Z4xtfztwqtMnoBzV1R/lO4LIKjeH+4jAx6ZQxBxjLbpC7Vdc2bDrTUytGDWCrwLgRL/qZCOmox/gzQ1lW2JkQXWg3GkAU4I2DDgj+UkM13A71KWOVJiwduF5Tyij+rDzj2alAZWPBM0d2Jmeb/6s8lZvC/BV0zse+w4laGm/8Kfp5npk8ag/TOZgXKAJtL8B1HWfdyBya4L2gXd2edcpR6SG5gIb+rN3jnIChPRQvQtquYHAKj2AB3llh5RzgcvYZhUAAzntWA87+wlsSgwE2OcgBTGcVjh5CdsUaIfPMcErgkYqx4bQbIvOrWv4jC6cfDLMpYcZcGVj+RAWRJ0rYwpVm/l34/UVwE3gt3zzb7KbwM/DJ4Hxt4Mnx/66EkjcwQ1pvySSvl/405/8mdu/n/7czB/4d/7w7f/44b9ifzImfg+xsXpr1FJfTXgkKEgOoGY2S9h7M+nbdWCiPxbY1ZrndTpn2kGLAiAzxXEgSDgghHEcwHOogqsxheYEq2xgdvOXNCl7ShvJ6pucIkkY5PttHO1xbGqM77N9xGkiDamxnIOOnPxTRXmd2pQLH9uMJF2svhyU/h5st97f7+bb/xII2+IE4aMp9Yk5GDmROsG75AYNsJ+SoouWsJuww+7eunK9FiMN2qy76y6IqIcK3Gw9y8lnMV1ggq6M/YQSmxWZ3AlO8HFpol9kJ2wpSgRCqafgCnBrcj1HrVw/foKK9jXoBD+9Z30dB9BBiOJgyqZCoR2iyKTP0cFnIILfjcMV4E0gvpf3H/6n/7X9segrN2RN9GwHfF76bmD6iuHt4//bD9y+/wd/9PY7//HfevvWf+Kbbh/76JfY3yBser0VjhwDMDas7g6QXi+fiFQY5dcxXMauXb6GXZYi7GOOidPJb0G1R2goP/gqoDCVEFvhOZxfneR2QtDJJOFAuxFPwYLjUjWRp1lhxe7Q5SLsqdtanPIWOK7FTkjnWNFdoGYODTaY4Z/DyZBOirmsx2+LzIRSvP8EkGqowQcEthvBHshWcZLjgc3k6OTQwTOVChQuHuwt2YrAyaX+QQEPAbkT8AF4Ut7zp57XmMKqskegHh5VBQfLtaunF1RvOCHOUIEre4KvDSeug+QEQnxAXeHwuw2fk5Pg9DrkMAB90gHQellOI0OJSRA84YrpCOUERwz1ZjDHcU5g0OXosN4hZLxszHrOO2+/ArgJ/Ef/oW+4/Wu/559J/xKIfBK4XVIA+BjUUT5tjGkHfkH6V0PwW8n/1R/9jtvv+wP/8e1Pf/x70y+fpJvDdHeI7w7iJrQ95nt8UX15gOZ2qMvmBnOYhtILHX/mNcWcJtjHGg9U65SvE8pt2awUfC8QigHr8R6ePY8IEtpKSM3dUxJwAbtsZl7RMpAK/D4EQAAtZYnl6MGMYsy1NOKx1eubqqm9kfVrPS031CVgrwwEb4VsrHp4WzLbAFpsJGKsemP8/LeAiddaFGSuGxWck4xgNFsDpsdAJxYCwA0aIL2k8SOS9t8AH1Q7Fzr6GAJasJXP7yPPP3kks2mNLY+jx/FpN38sXoVTwGwNELQaAx4uQzbS6TXi2o2RiJaHAu7c1dqFyuV4H1F8s0e4EhulQEzxnCLgnk+tyW2dcGm6U2WwPmRj1DRuGL4l3ci8+y1gWddDE78d/LW/+u9Ia/dlt+9Kvx2MHwfX3w52GrriLuEdwLqtcMv3gHHNwy+hfPJn/vrtT6Z/kxj/tNyv+Xu+2v5JOtyU2iP9JvHP/LW/cfvO/+W7yi+lxLMtFBm1xwOmQFtrzQoqcxevduWNa2UHfU8GagXQXFWsEiO2f4lVPmg7v0AcjHWzskslvfxfbckb2iBlDOEcz3EFFjjHIi6RYToNB1w6kUofcqzQBFiEY8uMLeI4jlttWVjsoCgG16KNMC4rUaVjv+FtQqVruX6ySYUAEVyYOH/ldDA2FOZn6LBoq8DyGDfb/EfAIEahA8FYj63WBa0G9K8IKlGqaDjJcUfll9Mr+kUTetwqHQYTWlAPOx4gPk+pZ4zswreV6l1ax00nbL8WYWDDq+mAh3u45ffi+bCv5TsuBRNCTDtWO+w6QPocBcS8kzkPmTkXiny3l4/X5UvDosyghk6KNgoOpqFpFKG/KPgudbACuOH67f/wb7Z9/Ie+Lf04ON0Eth8H6yqrLcIMD/ZZQyUQcSX44XQTiB9B/w//05+9ffzPfX+6LNiRVrLv2c0o/jB1jnf0Jq2W1lC7YobBmp0aqTU735WudkfUucSkLtRYRBFke6T3+tWJ+aQyCGVtvhbAa5WncIV1oMG8Geqwufr8WQh2x5GQCFFvTuwyeVaJXCTPJKR+pzgKNHyulzG0Wxbx0IGCmPKEUcEai3RKOMBQD0GyK3phZBGeqsoeynPBF4qWYgtjkcqe3wBSgGOlzIw1sGZh2CxrZCYY4gu8rhrl65EdZE5dljPt+SrW6YhuaEcyV0024Q+pql/awkWfF/WrFYb4WqBk7WLRehlyXDAKpCQXCripVE6QXaZnylMKsiQYcuAzvhjZXl+HXfSZhdwyZYpJDsuKzW4C0xWA0+CYs7vnIjJf1F4gFKCblfKNAv5Jsvk70F7yXcSvAG4C/7F/5Den4Odu/9G3/Tfp5uuX5CbQY6vHHcFA3iH00tgFJJdNuw6kY+uTP/P/dTkEcCOKI3mptExCJb9t2agAONx4Odn2UdloCOjdNm5c2dnON2gNHTvZ+BRsAq6xnM79EuIVvWc7I8OdjltfUjgCWTmpCgsFBe8KuXI94h4vz9df4r0OEUdNJuoaT5U2G+J91eoxTWJNnBmkV3QXqJn7DPZVJvRs+VVTZ98BhAKbnKoBwEcPqpmiY3/ElK+APXwQqQqDXAp16XZ4jAkHUWhuTpQyHSn/zJdNqvfTa5nS4qW1PJw7i9ga0DngjiCgQ4daQzkEc0Lh410QBNQdE0ZduZjSVC6D+ogjDx1yOAqIoVLUbuLL3BFiWhgbc8FAStM60aJa0yn36V/8TPrjxT+zv2HZdPRBT+ebwN9y+33/4j9ta9n9djAWiPuGO4BjXbwIqImpgd2Lvz84eoDUlYhKEMBjAszhSTJqdT7erCZu/r/LjgOLZtwFGrh+i2x07rv3Xsx2/rhMLayvAIB6eF99vNYJRzIFdKSNqrH92kk0CCxkuhwjfOJneCNpK2MKEA0/xmjU48nkCKRHeK+WAgGpkAZ/tbFOozNSWNCbbleK5Qqmnmj2xijpegUtxo6mxXOC7XJcwOc3gCSxvu+K2cFIQk55L8VKAB956t8yHgidhaDHImmkaT9eCAoH69EYI7DFWCFD4enj/EAfFWjlZ5av1RWf0V5DHPMLczS3xPwy1v4m4Zp/KSN0+sQySVnnrcrTyeITipfryFqYyKMl3Iz+ub/wg7C023f2HSuAm8Df8dt+y+1f/RfKTSD+7WAsKx9DTa47xyHIBSNSfdjqOyIdBQwJCiDpwihvUIfynZTWU1uBPIGo2HDNUjyu1cyQy/zGJw1w2OqbBANZh16Da8QI4yfQ+QtuY0SLYk1lXVsiWrF29CN+7aPFqBB9r7DOeiw8j2e9vLIZDUTzPd4SCgjprDB/jvVAxzLXehaI/ItFbL9lRbsXgn4p0CuxMsdYGw1KDDD4CzjR+18CIRJiB4IZPgYiqn3lCY+xLOvHDTak9Z0YdELaS4+8SKh+NRzLR73ngNV5DNOxeQRV/QeNvsBFwU4g8y08yRnC57w3aIHzBlAPsAH0JMR6HBunj2xzoOBhfa34BdcGZyXnwlYLzjkLyIfe+9DtJ3/qk7ev/we+rvwiSLppebfdvQL4xZBf+2v+zttXfOyj6RdDPpF/MYTHrKnyoMV4/7Y5urwwS/rowssHzN0dJrpxjwV4gC5aqidWj7m0Fj29j1Bw2j8ABDVrCu8r5EiTmCEuxtEBREMnwT0WLXLvlU9v9jJ7hK89xnNZ+mwfMb05wZebeI1e9Ftgy5gAfJjnf7mzXMujhzWiplkF8MnSEILx2g2gMrc2G85Aehxbw+y0ZjbKExzDZa28S28jrWlSdO1rnskaqNPx8B7XM1pkbEHDqwLHKG0XgLMqDdJuIx+lsdHP3ihQM2MjCOAEoDYMnhBGxq27n7OyfYbVFJFiwSXqdAR9Xidm5mjrA3Bs1tOkMUpkpC1HroKVwCeCE17B98MCrynWlRi+R/apT/3C7cf/r5+6feM3/Hr7Z8je/ZvA/QpfidSbwC/70tvHv+cHbp9L/8Zy/t4uD45ztXj0qU9bdmcvTBAyavfIEgFITtcSPRvS0Zvo7vTeEk+ams8wsvmNxVY2cjd+FGxCZsV09KO6W3OAsQFkQAYsOn4yyAFuzA5R7a42ETAj19dXFY+eZzzumvcyquMeulV5ieKiKWZpqI+MOy1Rv2uW0PMbQJU57qcHMoIezWbg+AWuErSjLFZF1c14SXnezmO5ToCJLABPIdn2mL7ULg8GMD2OEY7848J2pWWwL/hYxOk650A34PmKgDDtoBJveqjA0cMH0UHIc+YeqErXfdtYikA0+iHk0s5pksVCNi5LXI+ONAws6iCFiWELMPwdub/6Ez99+8s//pO3v//Xfc3ty9KNC25aGsFY755kBXBDh3+WDb+NO7ph5k3gl6e1/K7v+URaz/QnYuJOFr2ZGXaVwUaxGT/u6ynOEjxA1qg+KzweZ5ea7BV9ZC4Wy9H3/AseBVxJzq8/Kz2cOKmnOrDVF9jUPP0RsTu5S5HaztWipRv2a8dt1sBzlR02vasFNjEcmxCzHNsr7aQqgRyb1JHFN9x841B/Wku9ruw0Ma7Hd0Tl0z977U4ScxUt2K9PVwSQAxh4+xtAFToSJgEjp4RSeeuyciCN8OS1kQqI9Ppu4inNC+y4m6Y6tViuE2DCMxntLwse17xOuKXMomIIF5dZjt1dw5h2HoUwH8ZyzrmO2zGgJR1I1UuHOQjUDWvIan22wsRIKBIQPSMJ35tKV7sJ+2iLF51NusODJhzeGzB0fkzpPMgenCuhntZGCn/M+Mf+8k/YnxTBLxR8efoR5hf9si+UPzKMPzT87oE1wHXm53/+F27/+/f/n7c/811/8farf9WvtHWyFw/ZHb+UvgP4denHwR/7aLoJTD8Oxr/ty2uUwLorW9x76mMPq6861VYAbGw8NLInzwRI6JKZ+JfqQVwJl4oZeMTm9JDrJ8usJfv8StAo4DeNLZxllmPudAlh8gjqe/RLzNxuRMH485iytxIVx679yxWyFmyxjbtm0QNXMGPpNQ1dbcUrItiEhfDI1Xq4zvIm0LDUwTjctgDPwpqlCwPP+/I7UYsVnBZuujqBvIQtt7De+8qv/k3n8IM+Wq05uGaqAZZzmszQ2mBD+r4XTikMPV3gSa8dbIIT5WT2LJ+HFyZUAB2zBsb4XvdixMk650Ao4pOPUHkXNJujxqPCvGhBnhPmUikzl4mZ4MPVsyukV8raEG4E2+HXiSj0wF7wkWK/tNP4mc/8kn1v7Su/4mO3v+2rfvntS774i+rF66DgBUjujS1cIHqo9F4XjguoI1nER5/xOBqOQezF99JvTv+i/SHmn/i/P3n7VLoR/NZ/8ptuv/ef/11pnW7DTwO/MP0LHt/+P/6p23/yn/8xezFofycwN8E22RLHh9ZmSWbFMWgcZVcYMx8vnHUTs8aWxmXCVM0reW9KGiWGVASx//uth/eRMasdT30+ROK7ipD2bqlfWy59s63jsiQ09S7CGsP+OnQTMmuXb5emRhxw2ANAg3Tj7i13LB/pXS2YKiQKj6Q1O2ajX+YzCc9me34DyC5nSl18TcCF0W9dwKc7b4MvaQxYk6fcBLIHfmZbdx0TbdTuzr7BpYym06x1nlnuf767aPwHLRSgOKRsB+aVPVNmh0QHQT0gOtm891g+KnVw9keC+ax738hufW3vNeUSJ2lZnxrDWVRJLE+dTjJ0/66ZVSIYrBvCcJmicBnxZ0zwSB9a2W/wEzZQOAjN2Sj3chvqaoWdP+vE9w/vQ+nH5vikFOq4Ifydv+O33v7l3/27TGD0I2G7CfyOdBP4R/7Y7bPplQBcbPbpg615/uQFgvanU9KOyZ1b0rDDJ01nQt6ntDvSNGHIdTZB7FUsr6Nh8cTl2ZJR4ggE4HDTchmQ9Zpq7q2RN74KNpFGD1YPPyA5jQM81xjj0aZdDQiU4X4ihDTLpyfNFw4hoORQSVCjJTQi9gBv2XGc0bbXEGmeCLOhadphJ06+8cNrTrkF7BsIzEU/AZldCuZTZzYVT22cqOFwF1uZ/yFop5ocra8HRcRVn4QxmMdxfd23AxzkMb7KVoP6E05Jl19W4q5M6qf6tVA2WA50fGZbddRunAa/UnGs1RqY905mRfCC0Vp6jtUKPKjHFYJMEuUEiuvF2ynJ+BIOkB1gtVmvT5GLo6i5dnuZ0p1OsQeVyBGovsYa2parva3QvqZlukTpsYunAFuCMO1k4lOq+EnViJ7PDfSHLd+0nPQopcayy6hWoBJjI585iCK/84FTDPzxhmvaF3z4w7f//o//SWP83t/9rWnd+k8Cf+HTv3j7p377N6Z9+zm7CcS/GGI3gfULvaWvpJdnwD7P+nDdZQEXeppj/XF/F9WXrBcax2pwZZDqS8fIxo+CtZ5WqUHbxz5DgYZ52LJ3gKnKsTSAi22Wtte2xJvla4ozxjjYZnyDIxl5zYdFBGXo50reqzufRICaXKYsnknjiOr15o+8UJLhPC6THpq8z6XzG2/o6kt06XXe8igjNdm4jl3VcWD/HcDIQ11uLEh/OCrBH1eWYTqNeWGGIpMgyBQoEIbK6F2PPWo/VlYJu1BrIHejNRvd41o8Wjucz7MWVCwzDMQaD/gsXxePgZ3mBFfDyaj2WEtvpTfQIlA0AT4jjAs3NZfPkithyYnpRKqzBdiHrkAZMq3/458Cojjr1h1aOzKDaYXCnsCNY09tb+XLKSqBhM3fFDKac/l5K6/gY1snA9LOnwlHXi+F12t8h/L7f/BHbn/zZ3/u9vW/4ets/9n7EpHFdwL/3q/9u25f9tEvuX03vhOYftHmQ4nM+Vul9lSYKUAAtaLP+HQkAeN8m2brq1duBf1gzufbWf2ZHtmaz+XZcWxm488FpUTTmMEbQmhLk/0uQXhx3ACupkczgAZmkB71TUjWld1dzmKe35wxx4z3z9J7ke8PlsaHNequIUQPhSIhpH0vvRfpdvOXNOrxHAGdxLWC8eaP7DY/FEDUR7qyzG/765mMXL8BBJN9caRaN24BWarA9AWtkxoG9vq1V+PzoM1iB2xfNRLMj8FG8RnvNVS0VrhVru2WqliP4Bp5joE2XCvOmdQAZnVQi4aYvVhLNqtH+UhBnhM8PXiUySO9AKpuye9ghgdofDmocjAomca8opnnj27HuOAU8RVDIWo7DhJ8MJH9KYWwwlwdLQJ9DSZnMOkwpS2TRvw29fd/4kdvP/uzn9reBH70Sz9y++7028H4cXC+FqJOemBwa2mBHEKho429HhPWqqWF+9TuY2lDpbyGHrMpeNiawmm3Bg5FGuE1WH3XrglLp6cyFaLvmxnZroI/pC0FXMaS0dfrI5UKY5I2zOKp1SsCLcCWJuyrBTPeXpqTOWdrA5PSGgZ8LqZIZ1+/AWRfTmbljAmIukx1qrESDbkBByE8sChp9C68ixspRc+zmWxRRLg/WrZZDRmtEww4HgfP1ZNAfjPn8bHqZV/lbE00MFJjnmPEhHhwe7R+nhSzAx9nHBcI6Y3+QMGFQLdpD4Ry3MFTvXsKLjhsoJTh9PKnbe3Hw0gP+wnt9e6idg+W9Uw8O+Bi1bm/qsRpKmaulBt7tXn7vKAcBblLfGEh7+7kJwM3gd/3iR+5/ezPrW8Cf93X/qrbl37JF9/+/Pf+pfSBDzUwJ+hwVsmGiS2Xy/bymYQlqEs2FmujdLLT//VwbqmOPw6A8NimJbON41037/ULFfIqqDITO8KhlhWROdmocIo/0ZxhWGuWvx4Pq3cosGBxATkeKr4kzHXrnCdUDbv9MfnEpt4dQtdvADF/FDouuu6K2XqY1ivL6UJTIeDZY0k3NwdqvUDbukXP5k/bSM6pFyRGcz16uyrXcWRwrJ/gp4DFrAFmd/Uv5CFZZasxEGCO4wBiIcmLGdG40UGakLP9SXRRC26ssfMzPT9rfYtE7WFwVwH5KDTmAKWnTmbp85i3j0IDs8OW9bI9eNa0NaO8qKPgpkUGIopQO+aifwUbuSe+x6Aaj0YeBcnH/OvPzdJNYPoSIG4Cf+5TP3/7B3/9r7V9hbRu+HHwb/j7vibdKP787S983w/ZjWPOJy1OCif2pS0UucQlGDVFh+6lVoRP2TtHX566l5rxlb2g5KDd647h7EPozzLjgXJJt+//nH46p9MaK1xba752tcimYwI5buAxbW/Y0n7OY8pSR0dHmiYcqjq8DtiY5NMy2OUhAbAiUPPbRX2Qx0JeduDt/y3gSGIhjMcbp8ixJ1K2z1yJiL6YUDBXYg/X2whIKZtAXq4Ync1thYMSH40fGfwub0O8Cit2oTVXOcH1U5NkM6NaXt+Wn1qH+lN+l0AnsZtxKOMm+E6XAeIHNQApE9csQvk1o0WbRd3T8U6me9FKGk4m+vtelG7zCxTNI/WSvq+fP31q9bJVp29GiqUr/ofTL4b8t9/+P9++7b/879Juy38/UaeB3wr+gb/0o7c//b9+7+3z06eGttn+Tfx649cqKdfPGBg+PGrmRVX7pK+CU7YA2I6lIqniYWhSbQdaOJ7jPdL0k7+IsE4JTGPwI1yQzWycGbwhGmttzZQGLEAvwAcK56FQB59A60ZvPF9mlTGy57h2FmUMb5JGKhaLUvDRXIxPBDyMN39ldtQZT1YKTQG+ajr3bT1x1wd2Ko7lnbORQYdzhJun3k2iwIXtvk8AtcCiR4XlyYzBjNrYnjx96TmFHhnS+bOj5fL2GrPIQb8s3yT6SMvRehxTFWiUA5AVHh6hOzxOWXBUQXMjsogqdCQVTpAtvGoU5DmhMucGj6oJoqvVBSZEDR9yCCtjHvCMyyyTqnuPfUEnQqufjGrf04PnQApH1EttvT4iOgH6PK7po6O08sn9vA993u0vfuKH0yeBv3D7evkkEDd/P/Qjf+X2b/67f8T+BZbP//zVH2iALmtA+zkbVOsm8vetKXusihcN101d5XkvHr8tRvhQkEGC2l5GpkVZhXj6q7FnD9EmGXUPuUPBTdBJ6431hnd0xsV59JosDyRtQ8HpAhLrCMbaPqlkLpFvAisRwX3bFb4z8nd6k2DR3MtvEEhju3P+mZyuRx/52K/4g3QujWiATRwR12C7N3EQ5xxU2OBD+uEXQujh4XZAKDLp+qz2Tqsr7qoxi6ApuYBFHP5hp5PsAqVEjEefsBQvJ4tFJjD2jTUlfANlAVLzeEbyHPFA18tmJzcMuINH1HZmrrY8AQVSvz6WZPM6+RvBe7toJwD67SY4nwSgBhdOMrn/zJBU58+VX3EmNsnyiNfZJFv8ZH4o3QR+n9wEfuEXppu/H/7xdPP3X9zwh6Txz8ntN9bWOnsWEHF/80dgOZeyArAPgljqTL5UOAZ3QO0HSWnHsO1MJ1XWtyCYyWOYQBR0YCS5ZV6EI9oyxK5GKqj2Am8wYlu1ymAoN1HDTzH40VTRZhdj7XU2c4A5aXSjVSUmuJofd7qK8tPuKsESNRDZp3Mij4LZ54f5U3l37aDGYjShudqC+cANoKperj0n1A+p6hrPsdqCtxeckDq7GfPq5kGn9hjzoUhKM5JHepGn/gkG+DGOUY72kbrBGdFaT7I76S4w6HeEYT8hF1yiOGJfEjLdNQTbSHQJBtdBtw7IvqqTc85IbAsIpGt4nFfKyLY+B/kjt1c8olWQ8lNQXbWBj37VeBMMNBcbjH7rE/sCf08RN4Gf/sXP3L70iz9y+7f+vXTz95P/z+3DX3By89e07rFiZ9HnVHA0X9/uY7U6/s0J4ugv3xQ2VL/emtvYWTCA2DeSfGQI4RjbRnyLPM9SbV+V+8ZqKezh4hBLtcpkixdWQos8rzhroTjK86HVzB4lELu4sR5Hvm64GUHXBbTIMqlAs/nn7ezeOlHxhnytgOxiY+M6LuCr1Pm/BDJT0V7Z0AxrcSXkhUAYVGz1BjDZecE83kDLp4CnWwpQv9azXZEFj9qPtamPeBVoQVisBUjOtDxi8+0Et8Yw21orkRqYV7+cYbFK7AIlw/hBE7rDSKv6MBjsXzgcbOgkLujcQZQaYnfBLESJ3E2bX70BX8qQvQRJ8gCf2zIOlxJOPLd2n7pI0YV50I9je7ztBum37lpw2lJmhTfOT41f/OItv2f1kS/6Zbe/kf5W4Oenvxv4Ulu3XOkA4J/dsk9AEoDHB44NbGXIzvb5GjrKteMPOvkzPh4dVPY/pNMDBWobP8vmshTMXnqOAV8fsJ4eOVUsGKe4UoS9YGeQal8aS/m4IKHSI27+rfOyhqkuSs/LsbGTimdYvcEfM0I0uHWtTlpKGNDb/JKX/tclX+vF4oOi+QJbEml2RR+6ZJfVHpEHsRCCSJuAJKkuoYX5+NtNbYQNTQv2gK5d0Wuf50wFQ6LXr6tdkL6ex3svSM9c6bfuECua1bQeIgqfSeb4aTdrxS5rR2KqwKv9uokXyuqqbEoYtJuFkJpWs3J6v4KJYSRBwhdXCm3MXD0/E1peSO7So8ZqZLVFAUKSDF/Y6/xSIN+YZj6gVOK4qt7npJglz1UqsxpJQG3oXfXJQRtsBRozn/oxDx1szGev+aYdkwRNxgTPvyl8s9/6/fz0Y2G/QY9N+8x9HvVan3jRtTmVMvX4SAUaalftHDlWyvzcgtdqHqx8LjWNls2xnZ9QEWLEYbCuvGazrZHWzdzCzA44Bik4vRPhmwoeCgdS817mGZPXA+Cs67mgZc6bPVyldb0LIm05ueZlL21b3gJyj3x9xZqmYlYvmcpWu01sHG35Yl2Ya8eVwPXfAhaymVzJGB/688lBpkoRxoN/qDUKgkhyyLNASWcXl8AFJ0hM3a5knUmlaCTXZKojM3FhXGswi9FsBi5UOIKyQNVn4Ig9ARUxLCDlqn6kNMARvNKLIHU51vw9RtvL9klP0uT11eS1RrVhVOdC0YscwNMCGSs92bt/q5bPB34yxQaievSJ60cgieaoqJzvM31EWcc2ZXIZ3wpjEFNbffJ3BU9wxHAUzQ99qFwdmOMomCtmpPv9m5QSgK9PphsJ22Ig8LEFDwC+oPegjM/PqY+RZzOlynrRba8cNeIMSkSa1cgzUXzsp9FiRlkjG/gDjkGIS9Vo0qj+qMajsSQO/TLJFy01aZVXSq4zxwm8rY8C1Z4Sx4kHqGPBGJX1RerhetALmq3kNfXHbwB5xLCp1sklK9LtxZLal5S4AAMyQpL27gB/pS7oVaIaVcGlKxRRNlShxeg1IsL7azyrcLS7kTXFy1/1qnateFXB4+MBUfU9jF5+EaEnu6aFghUEgxvABy7mDZEshH/+R1fCoqyhCVMmj4CDcu3gqzWXrCDNm1Ny8kWZIPaTs127JE3HsU6DU59jy2RrFo+4N9DX1mFjq2NJ0kfCHeclXwmZvn+uglbM3eyV8q7MXlAQqi3hyybnlq+AVG2jHmWMssjOJ66MkALF0ZqjldAN4VTx5wKjq7ErNgdbG+nJdlLpBB982KPQ2JBh51L3Zj6HWkWbpUon90om3mmzHsf6vrDH2A4aAz1t4vGGk68R9dqHMsOJsz7HiTDDFMSY9OyXPpIJ9rht6nKk0GIcCy0I49TjN4BsBOPxxoly7ImUdRkurAvOnKAQSnGnZHb+GigPjJniMI4yw7mjYChaoJnC3Bg3rLUNUrMB2VrMZD9GG+9uq1uPXY1dPnTS6Ye8uFAmnOsg6YGpvSQ7uAPCcSh/pgHNZJULg5G1xlANAD6GAAkqbissvGKSgsVKdnbzjWs+9Qhgrkm0TIvNrXamzXnI8EElomMceeYi9lk+dRYj29LRwdkjAUxGn3Edyc0x72H2LWK7L+0wxkw9PTWE6vZ2jzOFBOwzPXsW8VzvNc78PI2Z6DcNs7SA2l0y8zpICufYKFOTmeyeJ3iHKY5B8ZTmEmnqqz3SuSOmn/Lz/g9lWIpjk+4jLTey1vsnqzVNWhw7RU3AVr8D94EIx7nhOgTABVQDiSVAwUknfX5t1/gsyPWdylvhjb5O4GI7vjnvPec7gNDUBn2N4CmwXxIug6FsoskyWHqKb2WDcnapD5IRPYoFSjSjyfHQI+8iVeGD7o5KrkGo0JRjPWYNgad6oDKzVt9mteAWTMCF2qpPu02XgmXsTnOLT+GWDb0ENxRYuGyuQPIdVHo3mKoXG7vpbvlF5ZZiD5jxYSVSIJJs55oELpxZz9xyrF2oYO0Rb86lJ9dRYGoOqWf76PpkY93RLJk70VlhoIMflJYXsuTaJzmklNKumnMI9KOHeM8j7/F6PY2ofX3fDfrxggnQBQIpfs8wpNU9PRSUo3ZtRYTMLAmGK07Jz7H1JvBEkW8oIhatos1+bJVmX8AAAEAASURBVMdnzHOldXpqtxoleroeE1wL5+sX5mLKeGLjwwYIQEdDQGtVrHyrkmokSqstgKG50B+JTOGc0LCICz7+CSDlUJNNMnbniHmZHI3pRB8oELTzZ4A8LO/Q5fy7XruAiQOOzDjL+kSsUUS3cYxnlCOKm80bkibwHAvifGxmuluJZUM2iRkiN8DdA9QSbjJElJFnMcOzUjWOaroVX97A4FNAytnyw2E5UJlUGQsOEw7VO+BoT3dokJ6o7TtlaNMCrmRU3/mO/EY7mMnJg5OIM2d8PUaW9/GiwkgZ01APLYT4WJeZZEnGeO+mXBwh6uf21so82Ija+CqvNulhQSIk+m0B+0yVdAZxHF2ydwym2GTjYyKuk6Z69kMRq8LjJy5r6YCd+HEALp2w3dkYG866Ta9ZEfkyPo5HVxMNucBz6z5d/om9Pu8GMO/Vegzvl5CEMbJmYWCrr5LZ3T9XhTEUiwhIXcx8oaLLsmPyIMpyQ4G5WoNTYKBtobnGmLHGsxrr1y8qjMUej67bKfpHoHEvG2p8GdrApUZB4viri5XSS4GYFI1y8a2fBJbjesiIwdrVNFERvQEOH8he1AjwMg0rk1VxUVV9Sw2fdBmHgA94sN7MdevQdgLWkJ6t+tnSd4o+QEUfvc9rDWmv0IIfY75G7GPjR7EKZw8AtM17sZ9KboQj65BnsPSkTaiNWvCBO5QEZbc5OeizRiG6/FDsSjPE5lE9nWr+LG41zcKcCQz7LEHOMbmg50euyB/JWpA41nCaCIaFcvmxwzdofMnYKwyLN3Gm72un6Qys590AUhyz5cbG6R+MSjc4AuWhLzoHUmtI6M1ciaGkuGutUbabiAdF7Q3ck4+9WKUuZVMohe1deg9vuHst0x8Jj2IoMosfNLClhnd+IrmlPtialBqbaZ24D+zDAB4Q08aQmCbHNbqo8tXugOOAUmBXP80knaw2n/RsPwgKJy9zFK7UEog+cW/rGOez9LF2tl5A5WMWrnLqcmrw0uIoEXbeI5ckHFj1fK8OZpXW+YznCUB28H05gmRUQD83nz34yY8SahUEh4mKqEaFwrCTvabMUBm1Peqyx7L2vWOyGSw+y/kVZhQgtSmyG8ecGJ1ekXvgpXuxSMcc6ldXMFEAOOEeHAC7uQLeRPAGDi7fyLWM6oyjiqh27LcmVgYnt8KkP0i/Tt+R1Xkd9aCEvF9Y1eaNdHlkOY8ndj4u8FagMW3HycF+1H6jZ0v6jamRz+44+hUYMa7E+hmwPajY9EthQ2rgSpkVtk0soZLj/BkRoBmQuUmeYY6hRHspyIAJLLDoJrS+EoN8TYBCWad51cIvJ9UesT9sx9T0CxhxEpwQx01JgZmS+FgbuS4mGzOrsyvCxjJbM3YoSmmVlfAba571q+tBO41lv9uhpmuoNmZ+VqSsEcEYR3aBXR7Weuvsqhh7JCb6JR4LEB7G0WnUqNTmGMh0a7oazByOA5692xP6ACLZYzPKlLcR9YREng+Keg5XzEeJnY9rfJ9FhLVElSFN92QheJN0SGfb3obWI9/Q0FtqbgGtqBVJeHl9ELPhnHVBH7yLcFdq4jz/BpCNTgqOw5iZ37gDMVoWBoPrveaFzOv1a7gWyHWyO8EPlKch6lapanQUZBoc1mwDko8ZRuPEYvSbVqlZGjhyX2KzV7YkfCy/AyLPhzRM2iCVUUi0d/0KF5UnmrrakA1+fMsIRNoHbN92B52Us37ZNLyn7S+KYtQeGU/hky3ArT3KpWOge80zfCbZbVCYMG4cSUf5vDKtkVAur09Lv7Dfd4N+2K/NxzpAlB7mU7pOg/t0Rvp+nllqsebDwtTLQt4rx6fU4FpIaGMGxq6AUwPYE9Sj7St4z9FJQA2DMcDRFRen5HEsmznA80QYpETobrPK1vMpSzEeZj2oQ+QgdTGkSrQ5xv3lu7xYaADPZ6hcQ1h4vwADtX2IL3NPk2e/+9IBse/gZW4A0QaavtS4B5POqJ1HdExfHQR2GxUDjjIl3dx8sQ7o6y73gQlTfS7DF4Y9co/wVTwenkain28qFOHV7vNYJY00j4ROwMDIhnXnA+GQjgGFDuEIuk0ER+1JOtbqfLtAJ3E5yLvvCPLFQntgDTvG6CjgEZuToi7HOzUrPV+O6/6vca+LMKZV0GbldSMB48hO4SoOG5tiZ74ByxN1GYv+KK41aDdenkuTJwIRQzVo3y7LTUeSqRrHKbEmqFADW4M1uJ8awQ7H5FKTY0PsrMBwiydcB4PjAhUY6T0y8JSg9kS/FlIDdwE8r2scYkUQAzcJM/TIGGbTroMlwXLrGp3KGm5rM+ZoNE9bz+r8iqeYvMwJiSAILrlpQ+Ck4f31UIaAveQaYTppHhhLIdbDON7mmQ4P6AV4x18EXu4GcFR0u+A9gHPv5p8C3fk1qrmLsUDBdXWE33cnyWhGcBWOiUwcR6Mo/NDwCHIhNlOzfs6bulBRoKObGklnk03UBewQwwBopAIwpDfAtdt98sJId9jQo0FcKFOB9D+Wje8yOcdcOj/nidN+tO6M/2R9yKlksnF+c7fBdunqlx9umQ9ERuVrw8jPmi1Pv2Ex4/47eDxC8qd3+cfZQGJLuUTPlUsEPgO06WdKI9RJZu76GSLxQcE18/4s597q6FSi7ioXsc3nIpTIJZEe3EeybqjSys8Ihlgmm4azlKN2AqEJDcFW3+mcO07GHXxJXvQdbigv4GF+H1wr6AI0ZLOSPhx+iW5fziGyevvED1L1egkkAHhMN9fJFFUT6YJsP6Uomrl+v5srvp6/LdJZ2oJNoEM8JfD43wFctREXOfodtwfoOhgcgQK7fnz0+vHE03pA49KXvzxay3ZdLwPsl+MSXI77JUY7XAKPkqqW55vnaStlgYSwhT6cwFFVAR3LngAHGIS42aTocFRAXn9mMA4UNX2ECIQzV6/YYBQfxyOPRF7U/LR0PrQ94qyBEYp6zKlvB0vtjYjxSB4/7xYUUyU0WYacTVgH3/mJZTd2aLUsifONL4o7vV0eXYoc3M6fxQzMJ4o8az9SN49U91F4LZMrN59YjajN/Pk4YWtYbeltVaNR8pV8iuXSNoJOPx0vmpiq5EQ8aC2KAkmDdRC7IGkSk6epTOgj4qKf5cfRSekUHuM5TWTLzAfInmstc6ksrUrzLsaZfLUc52bRvqcZ0uJoOLVoXSZT2Wo3jXG05Yv1yLSdGITmNV/uE0BOwDWzc+aNQq5KVhiM6uzEC3bCYYEiV2sZ60qNQRugQ3BSOjLO4YeCtQDxGP3m51tyCWbIelZ6zsOe3cGgSN/P/drQGujp+g/SuR655VOl0sQUXptsvNN9XKlm6OojMPHtZxklJ03Z8iWfy2gptpTU7DJIkNUTsvnPeKKmFK6yzNVAMWbxiHsOnOvDfdT5oezF7gL7Djfu9k7ipTpSXRwt8FusWTmqftfiPYEoGP1O0wO8p51nYn6bwcWN6ISJIbvZQ5CPrgEfMFgRqQeVh7giBRoR9/gjKXtTA7FwqeAKzOuM1Obo00yv2kdGWmeonhl5dd7V6DkPRULBlyrzUI8T8svdAGJRdGHUnjSzCndyNXDvcoeGqFfkcB4rgpfFVY9HudouC2qVXoHwOYqInruOeEV2Qw79qm4L4jnE3j+KXlzw+0ULU7QRCW7nh3r5RbAFz+kR2TTmVuRMfF0j7BjACE2+hehLMduH9oTgACDYkXmdwTpgks0xVlBMzH1Q/LIGbolezbq0kq1ePVTK8ttxNdgVjTtIXgnFguB2RdlfXzVC4WssM8gfNKZgpGMJ5FcbPx3E+bnadjor7oWc/cBG5gRT3InSpveONccjwyxrd3QNRALJopNnALX5JrQ6X5u3JpRe5QjgqKCBzf2MMWnwJzFgW72OQl2OHcAHCKOgzz7Ve7kbQG2TE+HENLe054ThQnPHLDU1OdfnnkQdPPLm8d4jZjJeArcTaKL2YuE2V1/iYvuefOxJFTGP6R1wIDKbYMdFoH2PJHtD0CCIuulRhno1HCCvhwZzKiLI2PRQOhmGxBP8UIif8jCub3BaLPOgyRhk1A6yGzcz8dxrMDobN9JvfFpnrHPUxhln7NLBStLByL3d6ml3EFBf7QPxM0gUXfox6fuLBYGOb+AiZjhBKxNqcReEsOnh9cYenfqLB9COtlQ/9UO0tMUmIpbxNqpSi+6txmtWz8o5Ijj2uFkEjB0Lee4qoMu9WePtBBpy1kaLpzvs+tUR1E3avn6DZotX0NZhRLjyCt/23SkNAvO6L38DyAlwHLTnQwAS3DfOjI22UMSn0d76eLW11+tbaUqWTqyWCXm899aVaraJ1VBvtAb2cGL3yL4OIp6nni1vIdlcLfBovXEXNcqLag2ood1pfGWTU0a6pNDnyHgZ2wtJBuB5Ag1MuII+Jw10BqGoV/wuHA7SmEePOsdsM5LR5GCkjY5ocxx0uQzdxwOLj6V8SF6tFvHRD/LVJQ6jPgCgX8Elpj5s1Yi5kU+85maxHA+HRSUiS6baADBewc8wtIjada3GVdm/Zh3deusjruWaVhWHaLuMBTU9imk+2rVeTFzzR91aK+FmdF2OKhxPexircimQVbupI9q8Wm1OqBAamU11RvPIKK9caMLwWlLtSh8Ga7Y3Mt7qJRNLzg2muAzLuMi2CTT8At5Aj1kv+0sg2hsnqLE7baxL3QHJsE/gL9/8oThXeNAcQ6VYduvhleoTcMckurJdgDM0cWY5zisTAdocZaKdco+nGkZkebC39WamKT7NsoJFrWvtal3iMWIrgnR17GoBHwH5F4MYFUWYg60g+bMCIIZ1BtR7QtBGSU4zjfYuNdTU/vsyzHIM5EJgmTj2ejmSzyD+Tf4ZahRnH5obxTSvtvbPbplXP2qqrza5o/EUF7jaYkg1F9oEah3ayHmMetChTwZiulFBYw/ZLEiRWWHm6/mWAyM6V6BSqjEQnwkYlHiOVWhu8EI4R/jMExaUU6gt1wVIZ1QK0tVZ7Msq2rf8iNer9hGnv0krFtDd1aObdxcQxVVOYM7k/i/cC+07mTfBeflPADlLrJKulNrEuDESXNKkgLCbkTTaR7LcMR668bAXJ5sVKLlkw+WGFzL1GT8bE7M78GIfUG8VmOXYMrOKe4RnrvHM1vpYawa90HM8u6qlArUgZVmUI+O7kXgIwqYvPNZCaJDOyJyIez/Co9+4KcMWcvD5zyyOsdj13jP5PE10uvsmRCyJ6vxLCZaykTHoqp3reP6+9jMQ7J/dzHytRazGXrWtfbIfxka99Ji4n+Phpwwo0h+p3xWLBSniCsHhg4A8nvU/5pqC1mdNOwno+HrOi8V58jjQxjkos1GwdJWxnqrnLidIseWGOFHfYdZqzGr9qSLBABwRvJLSkaGPqwrk6i5CwgJA6dYYGp3bik8//k2a9kjhdfvKm6vLBCb9LrjHKXTab6/uBjDWHu6YCDrwyx4Yy3EHHOgYRPBiImUvoClWytkYVQMlpr3fgRHogpUTM+hjvLHDcXYdjVXWaJd9gOp01KmayZhPWBkHdhXtsYtUD0bkzu8I8sUHI2rWK1apcrmPwpsNE71JeKYyaE4V1M5QRBhVe1PgXfpgBbiuhFa/GNUvAPXVJv/p46jIKGaF+0SMqJ/t0VsQmYUSGK6xajAzHnHNIdTOVTpj+EtG4+UvXzLG/eyjY8S+/8ZrVs/KOSI4Ck7XFeEBRNAT0/8JKXwA5GSh6QJR5krR8p2/ImgfOiU698lYiQ3EugOffVJwAHmp0Kv7ETBnoOtyNGElUKSNOBG8jOJ9prHUAh7bBMt0Bi2P1YlCYeoAZBHWdhVSbQLyWFiWHddTRBW5YLDemNKp5ytRAY87GisdRp1+4rgS7MYFD4UBG/AZmqSjeH4ZQn0Q/UUpYsd+KWgHcpnHvdMZF8jR3F62n6o/WjCUYREW5phbyM/KZRy8EZb5d+NqBfBGVVdesaPV1vxTbe7GKBrP55gvvs5B7QafFWgIs7pJH/JArtxqBPGXd/vKOWJrEpLBDc1dmLdjjlWtvsPJcll8Ug9yJI+lg+rYJZUjvgFmNp6W+gSQOdaP0ffsK2bpap9oS/lKBOqgBtsB7wBe5Z9kvJ5PAC9PdE1A1i58OAjMsac7loi7dkBFSvZpdvHyf28tqQGJ5QaA742trKnsbY3qS5/hqV75WPy8A2ro6UZXFBXO+p33suFv0rk+90juh96o3amcrZ9MZwqcz2SZebbethgLclwSSpJYjPogl3n6b+O4mkO5pth5lOdmaC5FCsHkpxA1XI3M8VeLHHuxZ9Tmxj40NtyPJPRnr6M2WLEGBSKBPkenMQw6RHaI4ziAvKqQHAtYSu2I9n5/E/ncpseqiI4zz62eZ81rrdNelg/J7eL5+ZA9p3m862vkUHCUe+HY67kBxKQurtGOYF9yT5p1p/BntscLeNAQICyQbO/CO90GWIQG4aY4Bkg7DTq0luIDxrgegajLB2Km7gJX61F5Nga94G4WbyYq8U5QcsmM6ehXQE7kNwZNQuFYJvUbChYy6cEb6SGwYDzx3BtqntNfP/LB+b/yCYz6ZUzG8kKP48M2pKZbSfI4SSTCqTilSoIcCV03pwf0WSeRHv3c40IrEq7PIDC4KhxDeupexU+FfMI+3mrzt9c6QbSMBJ15b19zHjNHS08wejoiuOY7hx+78Iiv98eoM9RnAwR0kpNA5lEfI3YFSgzLTFS6cGwHYq9k6wu9vhvA0YS5MKPcJMYpVSoCFkyHSQ1OyFfCQcvfX/L3kgLoin7EbqRimusQZV7KR33toSx5K/f0hgaC2oDZGmitnFvKV7soDEJr7Tu/I5hEW6lk4UBGgEGONbDu4s3J1sa7lmKm9xGJUZWJuVfpt5ek3BH91kO28NysYfeFYtcXAJJvL/jp8IdqPhaSlV6JzC8Y1XoRu/RVtdU3G70xC6M6FvRezJKXx4yts+u0hoIIxiIGvPIEgasixGMcXKOulFdskqMyLLNboCLnFQfgytoZ4Hq+90Z8IjgKBk0OwoLYmh09vrjbjwBnMmyA4wAXFjL/XcUc5P03RswDvXT9DCKDKjnENlizF5tSn5149d8B1BnEheCCKKazsVoNqGtncinAbB49vpPrAlSkSgAEuYzecILE0g36PdbXIpxjj380wnrQ6dekyw4DPe/Rriq/m3jXQIWeGcrvxP2ZT+hievnSDUDWiorRZ4+9pBRrcoTfP84auF/xElPLqw0R9eOUcw7Pur1eH/t6vt+0z2Zrx3rTB6Hm59mCpfimUhJ9cQeJzlQrAtVXktldQNHVnrW2Zmu2SnkjQqJvaARnHVBuSGRyMEb8Tn8gMQmZsv2MP2mWGx2qa1W1x1J7RM8bc1hf8RmJZ2YH3E1a9VZ2q5Br2E0ZCMm1GzOzgYo9sIFRDqTxxu/8qVy85+yZsXaPcJGLcMd9kvN6PwHkAnB8cFKQqbsZRnWeVID9Qc4Vy6Xye3ImCb46Jj4ksB1KAcapkmr87omCa1RHswAqzDetb+oWSJaVvKfevFaXgXzXAFBWvIzw79moseDuplevHBnIGwXSyvv7uttjJeIsnhwnB4cBB4wqA594jgJhiKOkpn0qZm5jtlBVZdw4ZV+j0OiROaZH44ij9V9FPvZD/6R/7dUmXI/lxMa+5UcQFZgA3OcWK9XiRCt+Y0Se+rDxYE8mxaACWw1G40gE4/S577OPbEAEt6ZjnIIGoM4UVNDEVfJFwy3MRe4Y/p7t26YbZ1D29phc5z5JPxiOvWS5cfTBUlN6WxmpvmwBySUg1PJ4vhFbr3uQWLls5WmCq2Lr3Ou9AdTe/JprZmATzJVsEEZwDtXzCGlzmG34uQXsAs+jkCPqJQb3KV/U5/qzTFGgEMcOPu6N8HFWRfYIRefZzTnIsDZ4ttwqcHn9lXxgx9aiv9qXB/LLYwH8WE99XZgC9MdHfglU2JSeSinOWkeA62tEPKmCofyTposgQ3EkkfGuPgEHIzUA5Y1gvv2zSdRo7h/ozMDzI3UT/cU3zmBWyM+dMxM0AXGy/ckkpCeYcWGjjxLsrRnTwqTrSDpHlcwxPGtW5CHEFEdJ32cu6k0FyWETOsMp6XrC5ptqlDI6fYixuhceRz1m5YF/prFFqVRsftXCJMdrJUYujbWKOlt9AK5tnJ+ddomOD2O3Za6UgNhTBa8Wb/jXfwOIhZht3BOzvK2iT07lUqK7jnrqNU97gzYK19hD/05I7qNqlbaib+EWbFbGT9ehyOUhslxy4/RcRFB3VLtHb+TvTY+KV61HuyAfI+0qPgxJdmCqBi9zA1gKNWSzKtKFkgPfHiVhQ7ErKRsGA1yhEwzCxI/sQOtc7cD/sFQzVO7oVpufFmkfZKjKm5bvZ7OJ6GQMGg9s9Ttw3lFaIkJGPmMYcUDQr3u9Blqq1GiZHFCfNsbWNTw+iogOJCFGm6Piqk2tFWiBWdFqA7VYMtJMKqcaCrhmlxMQVwGeixSgOkfG+3GPaBzFqp0RMULf77+m1taixBpQQOcm65HBv/NHP77QRHzFdY21jLOw6KVnDNBbf+dP2fPqFaUQ2OpX0Ks3Xu93ADFfXYi68mUh7jiIOrkUoEz+rgAQjJQ6y4GKE47KJUhG5+cJY1mtS6p+l0Qg18opvjzSy+P6eVsg0LVeSCU3Zqle14InGu6Ya7DXuTsya4CNuA7vaUAL0BYdhjAB2kjDFhjSeSMIHm8CG0GzhWC4iViD0LJXEy3MRjgWYCtJ5qLnNjWCSY++VmYuj3Fm0Y+KZ6yo8qp9P8dnequZyCoTJiHXBfIpZzBiFeDuPkaADI7y9Iu8gUZsHuFacmhDcCTQgY9AezFOYKof6nCd7DoWycDGWCfsAvkDhFajWQ42cM6RnrxeYHZP9YZmBGpiK0FtX/TYaxK5hn0LgiVbcqMn/W2Q9W4v4PYKe4RJHvccGnhh9/V/AqgTxFpioQ7XNAMBHhOcnNsBY7y2csnWFop0noa9n5v2d1xDJ7JsnY2Uj8qPKy9FF222eiMQVeuYDLPxZL/aiIBFRvTHY5S2ekkOI2OmzoAL3lF3w0eaxzVLapWOngk5nJ9XdJWC3ckhgiDW2pL2VJCIMd5CycoboIRrjHZJK4SnGiCMcxSamMpAmLOlLVAz12oR/fb7cX3ijAbrwRBG2qS5c44AjgS1kfQ4EsE4fT9Sl6PPmqcChGmsoxyBOtY0MKylwbj+9MtxynZqAeZrwBsqbefe+PPwuYoKeOlz71yjzPJcGshz+a3usP5AP4fmq7YtVABVuhqnzLcP92bdAGL9uOgYaR+t6xjMaDnP8muL1blaYIPnUcrjrxRWl70cTWcGUsEZxuK52jHcFvuRDvdc9IIHkIZmAP3u6UDdv0F/We/RBsCnhtqlZaY4A/XRV7epBt9INNDqk5ShXKNOLG0o2eqCEf2JCqEKV3tMiwj11Sb7vhmS/faNozW4YxZOBo4LTAW52jqOmIzlEc+MTKVzAsJbKAEcN5pX0q4+9FkjjEy5G2iuyoWCVo9ipRpLJRkqSiiIs+E5IhCCe42X0Rc4F6ChMXN5bcNYlwoZ6HLqhuQTC5LJ+NmY/+RL46LEsEyVa/Vq6MQg7QT7ijBv3g0gVx8LAPvS1q+wyjmplHDnsUve4YTS9pG+yOCHs5enI/x6TWJsIxbaIeuFx3lVZJi11jWAjP3Zg9fWXinMDh/p44KGQtU+LN8uWW1tSY1y0QeujyHCKEdRZAg7kLakadq4yzvwyNkc4CPKu5isQNoBdR/A0IfAilmhBz6xHEHRY1EKFzUDNBuWJ+ecxvYAr7fznPakvqt5cvxFUTQxisVwWS1ASxllqQ3FvGlUbeZ345oTs96nxzHVEtMq0z9ZtkGrpDPF7/zVOIypNhIEVAalxqO8+Bs70SgPBVNjYKiwqaNpCg51Xm/w9X8HMM5fFy7mtn6/x1Qu7ujHvxMI9VAzFGzuE34xBPNvgl3p0fIonHboONCIQniNDMTigm8rPeSruhE0YOXIL3LPHrQebdcugyh8z/y1YdWa6AGiZaKvcvUi14L5pSRPgG8xRnIZ4Us1lZkV+0++hUoFu4gmmwUJh48HfOaiPytZ4xSrgXfGcgVG6zWK+UvITJK7TRXUJm9740fgqSDxNo4qOsC5w/pk8HisB2mphcFyyagYkkYjCczFQiVu4YQFPG1EyX2IxUvabP901IyndN5aHXBFZFsjIlgnUGIPttfkSr0UMAtPLSkN0CSgNVAUKo1IN+pveDCRiOQipDYhs2jLF2vZc4d+bYE37xNALgUXEP54TxApI4B8SDiZlKuHCQOmfVzAi1bVEIbLQkUanwCys3uruSpB3+Wq0yoC7qZcMSuD/BVmlAOP1UZ5vzx1PXA1tJI1IuRRTNKPmJDmejod1uToknc41OFYJPgqwDDHWYUuzwBG3hK2l2ZmIWcIDcxqLOO5ToYkm/1boPisoVDkdz4xplWeqGXkoqH5N82u/cb+B37EjuZCzGhEjPERV9IzGOI8WymnWObazhuhJoUInfSWw1rtiLBU6xZkJB+PWaeYZjy8HjhQcdrqtPVRXDoPrVZrolkZR4UYz1lE+VDdU3vPHdc91U+447U60+R6OPSyydkch0pOFk78aV0FLGtW1FttvLk3gNyn3An0j5ebxEwgnVGck3Ze8hgJJ+m+DBU3yKJv8gJlHxK6ZlKg9r+m43aAFCAPu0/IwwJdea3WJV0vyHb9xAXrJZ4bQQOcKpRr+zQ4PlqWOhyhp4WLvqYRUn8AL6xKznA88zGs4mkPea1OlskdVFtdBHd+Jo6fR18XiHpj5psT1X5pc+TiVD+1bXZ6wnmB/V+vVwVUhtEEebhwjJg+nsXyFYNXjkUBClIIY4TDjzHybNwCHHrvUC+Nrh/GoQBbNrpYW9qS7k1OuM9oJP+kKUWKpmunhZXyBBvFjiYxuvoU7hn/sEydU1Rtr0zXv/NXRS8YvCG3UyjtDP07f+M9yo45Hha7CD9UfQKszfLNvQHkNNEr++XI3Hbs94DKOXpK2AHhglcdqSemqVjv+QBv04igq/Wu4vlDwp437wSZebZX0ojy1G4Y3R9tXUpF3SFGH2s0tQctynNUua7+CKSEE1s11C5chtxYHF2bg1J8Gecamwp1D/j3QVCARThCqdgakjBMg9R8MmDTV5tYjLoRy9ir8LVG12MKaB5O9WHDKTEz6ZexgQuWE8sjULrtfGCJyRX4MqxRVQw2YQyrT5sjMW5Ekg+XuNOhVilaBnvx4LnC0SrwTLiznNFqkXwXIVK8ySBMS5PFUWhiIrtGCDiYPS9G1IfN60MW0myR1lAmhJrnLlZe5cDM6yVxAEZAgG2LCoxPRoGbbPL1p8Dbcl3HoY7oG1T9AH2T3DfvO4BxdR5ayP4kV7l6IJSaj30nECJ9PXfcpHS+zFrlmvIsdOgjpb3xoBMCYkNv9dv5hWoXKo77mEZjgx4Ys/RrP7hymlMjXuDZHhuArtq1vAafUVz1aNdivgf2pJ+AgQI4x2VLfJEHvpAwWjkvQI8jZNVelpkmoaAbfZkAQ4RVvxjqu5/dpITlbDKZXbFF7LIPwkwv5Vx91iCnFCtDbSj6hdYGB2jhYAHVOvMeoMypmtrcm3JEJJZHQGe67QsMqBf0B+xxaKFpKeY5UiX6jN85Qo5rQjOUCO6k0BmqJ7OBMV9aMyp8j+wjrgYFlKS2A584IPOLUWbmflRT7So5DNasGhmJ794ni9dMpSc7uEovtiIGaYZG68PcGzy++TeAXDwuMHzsE/WJ6UbdeT2BMjYybQ4zneAmAB42imWvhphOE6jvPtKBmasNOEI/MqmfBReUDIhw+vNOiID0HDUvvOZrVm07d1HOgiVTf64yr/b0jGsK6l3gSSVVl5Ky3kzbxwopDr+uT8ELvOZVqnwkwRsA/ooSfQjWMkUedMZUnrKnY26XSqqqMVXTapmdsyP8KKZaV+2V3iw3i49rAz2bIRj7fNl7CWiVk5jq5ZdZRCxr1bJFH1VkQ1gF1CdF5YSazRGhAz0QYBNFIpbT3g0Sm43+A60kKs6ZejlKvXwuXbDYAltbVzQFU7qvE1bBuN565J7jFDkxBC9SqZNpixVZpKhxPqKab5Tvfc813r/IN/9HwFx77kfuS/rMb0cSPZBRvB7y9dQQ5jDrOWuPZ0jgRhf1CE2CuAQEyLrMLguxpeA4yZbGWS26LaDggb3no5faT2yo3MAMhF8m1NWPZXQ+akfcvX5sgDqlVlwPhXMRlSIx3GDn409J3o5Hp89S+GyU0meEitKqNfjWG3E9or+aYF6RvHfMtndL3JuIcM/p2qld1DU0aiBLtVYU36JiRYKk7jJZkKOIoF8t10FiIPqidYdZl6vI5vOpCSG8qphzK0TTmltrvmbVnusNMkpUewDVUITiDUl+U1JQCuC+VIG6egp0gKljcuWFlq/v2D/DMlWl1LFzqQb3xvX29povjHh7bgC5ENhzeGDjmL2D534PrSTia+pBgQRBjb5O5Wr/KTirv1CoUpeMoWALNiurzvq6VPNBcOxJ5SynO2gFVuIzba1Z7Wo8s1LRWmljjyFPTBppgq32yEdMN8NDQ4m0MfLGIpNypAkQychz/HZU7vRY91njrt5L5uOexZzyLZ5eP9BBesRGRgtATKFUjvq0K19JCNKnTYLGK/kOQ3WSba7ExHSt3FHpHkorny09TZjj2OsjM8/2+FFkzZ9l52fQqMYkNhMXuELy8dsisHS9jMY0R9HK5jTRIRFo3ynMn46jXv2pG/JDlgYTYgXSHGw82uKq0Bttvz0/AuYy6sIzdjz2e0jl7EBNAaLyx/oRcVxsDFS5hFDX6qdYfocEOjuBfefGAlMpAqCPym2bUhokWdcZjr7hN3W85OWO8Fx745XEAjXqS7yk1xocVInJl+xPa9FOY/15R6qNcGgBrqGZM6dMZRTjxxum428CweI+gpWl+MPlUidh2IKWqn2UPH1is091jPlY9flem3lOBT1iu+pHDnVNLD2d+lpX50996uX1i6ptVTOunRONlywKg04bAPU1jpzbkCzgevwAQFIcHfmJDuskSS6FhGo7T6x4KsV2iNelZayNaDoykNXJNPS5NeezmiKy3UeO6oFG0QMCoaTl81VrFxENqV1rDIM1OzPe07s9ljqSOgK1tVC42rPG3rD42/cJIBdQj7DjhQdwDkYGsoYo+nZ/oQHWPxpB5GNAYMr0gcxGfs4vcCU1IN8RgthSkID8Qtu801rXGV75jK8o2HXDzuKjBl+hoY0Ny5ZuedNaMW4WNTo2rmChEPArN+SsfozBryeJIcITAErCUb32g0BAQ60p9OqxWvbj5eHZPntmP5zh2Gc2s+CxnxaJitGnMuMcU9zLM9HHZzhjRH2COTbZ51taI9l6fiCl6ecX3yq28rk380sQQ36UwFStIaeQowR1GjhWjr4/1hpva1EII0QwMrYlK0DPYI0/22Zz40b360B+6WtPePYEXrne23sDGPdx9JdLSXDY4YnDCO8jeAzYR8p6YVrq35G0llgN/NwJIpa6Q3JIYQlOdAhCTQ+IPfjsSGSPGLFabM/HVOp0Ivwl91Vrcm51/RCaEtZ0BDB/Ol7lA8/HaY0JjqVnI2jMVYlYW/34AhH9XhBs7nserXO/bye2d+I3/V6v79Bj/Izo+TXwjJEiYoPt4neV8lxZmyN1c5beqxulDyx0bEPSr64nVMKb4VTcXhBy5feSjf/6TWO0OfboaxHojLX0uIRm9BurWce1SeF4QNTVsV054o72cdUmgWNNTAyPq5d+hFOdMkxWj5Jeg9HleAdlqfcakm/vDSAXCwcSHtg4Zm92vjA7HKOEaaYg4vpLG0auR9pQKgRPjpaGyVZ+7noKykduk87wI1H+yO2owgAUiw4gy1Dke997Xshyun9WYE99nseacUSF3CANGZHcbRTc4WZ58KNG9GfcECdNR9hHx1fQsp4ohJzaPTa/CBOTvfYlBvWBoU+d+/zMbnrqUzn3nTEtBmsU84jqAarbyu8uTCAqgTZGPlT8VdjsAbWSbeem9BLS1pHGXkWLUiOXLg2kQVuhjdEf5vQUIaIDk8g+pRm1MzJG1IeNo7vFcsTVaEkXrs4uX4HZiPD286uUwbIoALb6QWusOASVYKpmx1MrVC/9pU5fTiNqS51J2Hqf5YT+Nphv33cA46rGHQGf5yHHyHG+EvxxaYdT0YdtcjiyzEhP9Xf/neBjDtspo57GbWIPlCjzMQWbx1qrvUy2712tGTEbJhTTW58Ns1nv04MMbSCJdj9OqrVqtkZezGBTLBB9xm2MyV2fit9hpRBogNdjWXLVpPYF3cqFdnoo9W65kZAK+6Isk6P+7EFTj+a1WjviGPXq7IFZN+6mxSkSpz6Farlk4CbQPgkEkAmOIKhNgVc1sjbHVHc5n1fV16BOuXNge0ToqjKG0eD1E1iZn4LusmcVs1jsD1Fffc3v1p9wjhd7Zj84w5pdmkJgq+u7Py8PHr9nnKonl6VyZqZE1Cw/id/b5kTudYff/k8AdQW5czhqbmmPCRo1Oz2170QjwsdSXJKmIv7EBIzHZ6FkF6dX/g/MQ7VJkSIAka0QAO2zFQpG6lwm88l7zriuxt4qStezXOSf08cDKl2TUasAjvpVsTrrKLjxVYNQxuiPxkk9UjFi/XUfUIYY+hijXPWLEdej5otI9FX7HjvqPcPHWmCDFh7RR44bMbEu8zYyydElncNSLnjs7PXbpIBND6WU0HG5lwBqP7nD8pwTmma7GqstxeOwJh4x+oqxtvq02z7t+Ze6oeAlUg92Mmyph0mkzUCCZ+aL7IdU+oGWzhp/nag8uffXDaCu59FBd07AckGSvwRpx5wd5fccJWzOBLSJ3qZ8gOI2kKmedEeELU2pPQD12QOytMcSkQ//0Y0aHL2e6y9C2g5MpJR8qYuIb2nudf0J1BYWgAgSTGcqfsFbpLxk1FPies+bjtIRGPlaUOW7eW/qbdK1n2k9TST7RC9QOtfNJ2VHvsZgq98J3h84kyWKjdBHXbXZxwhXcli/SCGc9Fc5un5wHU3NSD8uve0rTmxLmADmOvHwi/3l1uf8YcFMaqmL9EZUK4u4S2tsXuHVjs3UxNjgtbqM+FDGHkkmrs1EIIUXE2aKI0Wiz/hbPL7/bgBXB9wDO1CpKNEONGbSLRkPzOUBQfwS1B2f9sljqdumeKi1KTVML6WRxC3ofJvnMnfOvJphJY6N30dCzgArVMO/EoutxBHFGauNhEBwK6wSAyC4Db+zlEgbIx/kMzfzGZdxSklHPM6tmi82fZ6M9CEJm77azGHkRpz6q9iuHnRizVEs1mB9G2NSfYpzdMQ27xB2bqUWXVtfBkusLiCZjMMPtrqDtClEjAVf0ZOrzZ+ilGAaNE2b43M7hGpWbvq0OBLRKrdMy7UYLY6NVy1NqV0Ba6NSyotP9RPNVjO+9hXcXFUV5qhhJmnbay1rJCl8MEO351ysBaGLlL7mmx7JE3z7vwMY11l3HHckjwyOkeN8CERiA0R5O1DKd0Dy3x5q2DOL9YgOfiioLhg4+fgNCCo8NMYCnZgHeC+fN1i9o6WuZ9kJGpV2uNiN/7F1zNrUNMiLGMpYuV09U3juk/YDZfXNTk/47ilsbU/tZUeRGGqAe6wFsDUFo2zqq615Foi9JJ/vdBSuNapkMQxPHfInfqHUxZv6g6m4fuiksWpMODUPg/MWfmdWQsqoDWD0A3mTrmge5+yn+hVxaEhBTk1Cu3YPizwHZv2l5kp/6o5af05RquiirGLM9UcKevQq8PpoUxhYXmAAmIe4RkRkXz4ESAGT1xpqk2goqg0BFTk0cKwmuv6Zv3O1C/UgegE+7PUtCL7/PgHURecO5Ki5pQ0CD6sxkFmTxhMNu5iaMyYOowd4HpC1VipZaDwNJTWscimo9aZEVsyNlHbqecMs6czTb+M80zDPtXR6XXUG6r5k4Lk93K2GdtwEQn/BrTukGaF0IMDVkNpgRj+ozV0SMUY7+nOVxgVGeSufOeJXvmKAW23AKv7UJy6Oq1qzHDVSHscFtnpxSDnY8iDE+gZVt+gjF2Pqw9aHar0um3O3+unqaH5rulmnDY4YMRZ9aCM2is+iuR9lUAGj22/1ApA57jkKuOSDTtLG6w1fc4ZqvDYNkwhqg1NQSAhHTIIGoTvrFFoUjD4Lv7VjPpre3zeAcedc2okArwnI8qTkdxDqeRkuOrGV3l/X6lrR4iaGQPte4EatLx8jFKgTjIDo5/oaBVXptBXT7MhnAw1x3aJmr9VHvLrltWH3ouKxr95L3VmDeDIjDWUcNaPzsLzwzO8AWUVhaiMb/cx44jMLYNQN/qRfhXX2SEdBqzxymqc/ilGTGPoYFa/xZ9lJX687k2Ni20UEYLljDH6MPWsaj+pYv6XBNKgL6Tids2kUveWkVUntfkLoYbbF/ojzit4jxsYovoA63sJRCcprzFG7BAJd0FFWjt3Am0R6SsVNKT1hHK+VIYLkKFYgTHHkBIPC+9H94NwAcufqXhzFNN/ZjdCsDHLfQcAB9NBBBPVYoTQz0Y3oCayIXByi+AE9zuC8n8jUYszd0ZDJkK+a2R5mWCaNZuoLqtq93GuIpBWuPaFhNl1asQnEthjESJuY6IuO7kxSdaTEi42T3p5ej5OicPQZfx+OusQ8rt6k6Wt/afnbp3wpkf/vD+mym0jlON57yPIREZGp/owTNbyvCswg1k416o6QCajhDZT6q1HlMo6R8tkfXSSP6ylpVR2aDYs1sG96tMWwkhYfyjDDESAhRw5hhLTSEfk+8vMk33/fAdztIsybO5rjkqNHQ0+IWRy3FWWGFlwWOktqQTCCvH40/5TvBs7qhbqteSX47+BhOUjj2Hgji1p1RUegwxi1AJ9XjyhAUb12IBemrAM9nRn817GVzmN/dUKpR9p1MuiTwWhHX+aoFMDixryrE0FXfAiy/hXeO+z9K5DW3H0fk/vgfsWnMnlslePdXB53qVBNS1FJSzSaZ6jMeu6ajCrr9Tx26vwnnx5t/fSnSqlDTvm43mhWrvOxM/mSn6qp3UTYICKKULuhj+dzPF/RfgvMD84ngLoz9FhQWzFDG2A+PIAnDKImyYDBLeIJRx5rTfgMc6zFeQHE5SP/d1RuB2IdHWkPuUjy0U5HRHg+KV1tLzfKIMaHR595I80xk1V0NGQNwGg7/PiiPS73hCh7eYJUlcAcsXHS2et9xnUkV2NX7agR/at6bzJ+NzfNq302J390kI9RH6pFBrGaewW2K5vOLtz02Y1fTmgaNh/nnZGhSqfs65x4faACVznPYFGfBEBgq7+gPS11XPPexnwBUxGptk6zGTVws2bYw/jThA7rvTgsr+IH7xNAXVjsVB5NaitmantCd3ykgEPggrX9l0McI1RGDhsbzp57Vnqy9Q08LjpP+URQC2orWlsx1e77v0SvOiOD2sip6girMTZN/pqLLJFkUg0vSty9pnK0v8l+9sguJ7qx+QlsHY416OsqlfW0ek8pGlpizRBeutofgCN/KfAakqN5auxkbRu+WZxKH8mZGC/7k7RXNfKPr5ZdVbso7VU/9BO792lki6BPvKCXO4r9sgvfr/dcUySo0ALuuMdOEzQLT6jH2kudxl3CapLiOcBLp40IpTTLcqxUM8jv6wLfbQobC3aU918gL8IH8xNA7E09CODfdSBEkSzj5KE7PAqBeuIWWuHNny/fQM16oIcHREBd0ftcHxl3vlOOrFPd3K/uyo7JAMc6wxTA1ey1bqE+XY5P600Ebc7i63pUm4UVh1j0iXt0jLozP8av1o38lY8cH6VOXbvCW9FBsTxBGPlgUo9cxAY+6UjXTXFDQEU+ZATp3Xf6FA6bj3kPkQGkxubMcaZwdXkE6JXx9puRTGg+ScjzwZiMpCNEm6PATs1I1X6s2wjYCl8miGL6qlC9PmYduLq0VOco5GLOMwaIaYhrgV6wRSK3Zd5664P9CSB2n+7c0wOi7vaeEOV4XFckAOZUo6qdGaxQFT2NaUQTRF2EcHKDmdkTDQBPt74AxScKSvDfEWSm9TeROAqr2hEhgcghvl+fiFDf7PQEFuz85yE7BDIJAGCvz8qvZNTWXkXBtii5ml7lY84QbPBVrxPrniyKNV6AkbfwjRbzkCkxTtlwKQw/wp2fHMO6YCPJWpsUfeMAVnj0UyhvUY/xJ48231SrlKPLKuYnR7tRm7j1eJ0x1ysdQZLN5R1glBxq9eBnr8VGkWk91lD6FLxPUI5I/HRIbwLtEoWk1lObRJmzB1fAxsii+VKYOkguexuW69TOUE70WoHxudf18XYGPrifAMb9dfWgMD4OPj6i4OB0SEe3Ha682NazSw9itXvNPrLAI8VHMcHPjDzh3FGO5Gcg7twowBEyaneySPLRkoxw9JnmnVm9yhkPKHIxnm9Ed+wSsHe7afltxDFRj4dcI/rrNTzva4nUZmkvCYdJaGHDiENOtdXPh6PPg4fNrU8ScD7yhmpPT/NLs1av2CjmfPYnRcW0ptSHjcdsvswbsTyNYprv7CQOTt1KsaJTU9WowIHBRjV1RFSCt3X/JVuvQQCqOm2OXmjmKRq2+jPOKq78YMelttm0mkRjHK0kqnZxkpCc2cg9YePa5/FeQW3yTg1IiIyYC8EzlBOm2imV+Pfp+O4GkDsWBwQe3dlIwG6kwByX5ctzhcPAxjF7+2cKoOEDLuFVOF94dbpqV9i9Bls6Fu0atF3R03vctRbZ2DXW0RoHyb53AaQ2mM8j+2rfJaxoAmvgyQZLR1nE9cH8DM/8bFQedYnVHGI7n7w3ddz1P5q/cmL+dJ7GK0LU0BuupFP+4aKmWOAtoFZMRl+xK1t4OJ7rTXTpB+kCiYc7mRxXVVpOBFvwASvqlW7SkH+OUfxU4eH+bX2k1VhaUvebTbR1LmotLcFoDpkR1Pv1eMz86iZknHpPRuSouUZlmxjPCjQuLPJ99H3hvbsBnO3G0TH2wIHgqfnHsLl0vFzMGprFqcxxhvNxPemQeewdoNeunrakdgWsDN9RpOdsjK70kCOe4w4f8+DpI+a9DyT3LllAjK5B+fUQqLJ1O0hyxLzqkZPgBOijD7Xv7StO0fnJ0TWBXf1ib302Rnz0U5wbTHG7+e3y0BlhqP8mjzrvaZ8BFN26LyCQzlZbC3uydTG4cMSsy6axvg3NwtZHj74eod6IqdemhMv/VyCZGI83BdPmeCzSgJHq/bI/EpzXJ1s+0j2YURkB2IIED7jHdz/l8OiB5/kDgA8leJ0bMqDzuuWRH2jv3XcA4+7X44wHDI8kjpHjfAqMwcyCYgg9McYUp753eKRPkNpAggQ3+bg5zd8HecpvDfcF2ok4nK8SeKHNQM202Wl0KFigwCFPPP2mdN2iFpl9/YhQX+3K1ODw2ACgoln44vighvaIypTDqLlH26Q2Rm6qj5iu0dZPZMePPvQggg1GmkD1LXjdL7T3/VD3dV4wc2XfhLQtx25p12sGxaiwZpxlo2b0s0qdj4iOkQJYmU+eTuwv+7yepkZSoOu3C8SGt4BIaL59yS/xIcHmikvQWJ0EkMYI8oejUtQegj94wXefAK72OY+9Fzhw5BzIh7ULlIKX65LAcTE5Vy/jeHngTSCiqqT2QnmeogBGns+MzVkp04OU3mf7SJYfxUexZTOLJLT4UNhZDTKJ5mhKlkxP+N9eWC0AJ5c8KgcOtrzz6eXYg89PFbvaCw9m8h71oRM1qP32j0e7SkFqY/rVh4GrRR4tkUy577PFYlap11YXCtyopjHm7h3XmrGS+mqvqxOZRjPxRHvNfCSb9w730UDJehnEu9AxsGPmQOOb1dz6UtATCcJIu0fVCCFpbMcXgxV1zXiQfq3Yq0e/uwHcrbkeAGrvePWiOAZCysklx38sngLtKB6LLKNdBY8epRGrW75osAWkaFfIIwYFj0Vdc37tah/A5JejsLoV4Q1qZp7PPeqp9l6LaCLhz5bG4q5lOjpSKY7AvKLtlZWKhR71X9H6vKYys+Nq2k4kwOcSp9G+Uwi/xBROGLRpCxThyUY002csovcj9WKdnqnzQVanD3+vQEQZ45cwESYEgk/ctPdpiWkCjdzRnHsHkK7Hzs+S676WDfWrE+EUj/Ge+QGNtIV5dwN4egi0NWuMUaxliwXQHNgdqwikRz5n5ryuzDYw0eoayELtnM39+z/Ysi12BmBLucQBh4QG1faZRSzbx8JFkApw1S7py4NqxF40NxYmgkz6QKttPkFw7PjRQLwIaw6Ed1tbgbiyLfPBsfgmqsw4LYm9iPOiAB8pWSoxLQwfD56fgK+3qAA0VdbMs+xIvzE1i+jKZ46jqVQHRnrYWhU7CjKM8c4tUr2fz3e3FxUAm49p/S1gyuyvP7IchbVXB2KxxTR8Hmwxt5DZpqi5Bb5NgDapd98BvLrfeHBhDds6HqjoEdrglEMEcrzGGsKS6ckSAFwqaBL5TC+mnfVBQxsAjH6B0UUqt/GC3xHUYiyIcbFFysjvv9EIVFiHWiMq1MSTjJn+uKeIVl/t2lwJ2uzMzoHmJySnjhRtE+gCVfad8f5ZgXxEcD7ea5eIFLdUPkB4mOBGMH83GLcXjGatoGTBHMOzx7J6u+AgMlJoyPss1VTbq8Xu6CtD7cxmBGjYZHkzYwukOjQyjwqM7kapZNDsyy1fAbBDAzlnVuEINCOnZUj8VHvylb85r2YO63MBAFe76sA41HKc4DxBIii+Ue67TwAf3R2XD5A5QTPumEYiBez0ru8s720cYlppoyNwXl7ypT/+8YNLqpuiKY0FYG3XrgZdotNkFqPKdcBpQGtNQQ8kVF/3ODundPQZb6POT1VpN2RaVsrhR1Fw9JhS20jY2yRkleirdmd7apd+MwNo+g1qPLYS/PgjNp8Oe4v7N42WSWALYUcUIvx2NCIYNIA93oooxW3MmrXgsdYMyBrMe/1RlkiMmqfNMePUg81HzjaFgotwwu4cVQ4SujdsL3JfUl8JajM/HS+Bi4py1J4WWSQu8hUuNo/dRaF3qbIC7z4BvPdQ4AF36WgDSQnR983ErH11hPR6lWbAc/feZgJMT4X4/j/Xj71OaaeJbX0KEbhfh9YpuFc7Zh3Wxbivqei1HfWv9RfZ7I7xrCaaTLAp9Q3WAm3dYHG/G4js9+H4zH374PLEVoLPf0WBx2P8uob5bXfW+xV+FS3+YAG+7l1S29gs1mwM5kZzXuVG+NMYFmSuHZarO2tjnkp59N6yI0JjO4xPyQDELho4ZvSvM1ipAqhlIqEmmmazlskGm1rWgcvWl6YU7bMOWpyLPQDOOZ4VGBXdxy62tRd8UxBtYu8+AXzWPsGatnXdqK7AWSRK4aRyG08AF3wBh3VCy+gnt5QT8UUn557YTy7TBLsCEdCgsOydsoQiPfoCXZjKUntBuZSCJnU5UiD6jLcxIuifXDPteCMhjdlnoPjSm34qkTtoWIO1A6ZLt47fJAv9yxxeurVYyhZcijo/rXbeIRWQ3dJzGlwafkX2BrD2KCnjJnvFaSpAEcmxZV/O0lpq54oxsvKR46P120darhBcQJxYTFIzM54/UcL7ef87jgJg8zErWPfZFLBMdJ86a/1SHgIhLJrzjICaGeHwBxcyvlytKjfRd9a7TwAfPQb0wOQB2Y7CgboSkOaRPICWLDPGTE9Onm/jfZSUg1H7ccqZq2lE6BcoXQXjHWq+IRzoZeD9z77gYPkIGNV2l8w6lVEzUBkp9FjWQ+ac1eucRLQW62E86zQzVGPMUwRuBoDCA3EebuZbLqPNT0nmc0s5h7ptK7EqCKNsVqz4gJmY5Il7K0abQOs0uC1RrLpw9DEmEnjZSstRnBwquRyrq1Qg9JUS2FWXcthniq/xN8rQWajtm+T8GaWvDLUzro+Q340qSLsDnQeyBOqZWoTqAAAqTElEQVSPr5zIu6tXqek6ds6stoLUnuFjPHPeK1/ys1M2Qay/IBfcIoQo0HlGJXg+qKja5wrvkLIC7z4BlMV42OQByfFYEAQlqd2LaNYu2BbA5QEGHz1vHyHXBO+G5z7yhaz15Ge4Fz9AsE2OoFQbBh8zLebzjzWbd+3yBF7bVEXthpAmNfiArXVoUw7++aZo2hx5yYaPh/pWoQBtIKhgLQ8W/jcABdIRwoPYBIvPG6KU8582nPi5GmvWehYA/2peCSf1gcdk0sb+03zwX/VhO9/QDNlokIyimoFEnZBuBBC41dblNaC2E5kmHOp5Durpo59X7Eh92hzRV9kzpUVk+JBQMW1QstrEjGLMHYxKVxtUO2pwDKX/at8KUntYSwFqD8FnQcjISWRuCtX+tipkbIBsl+MG3uofEjZ6H4T0u08AX2ov8xhsR+VBJZBIULunRnmcj8asdATo9Px9JFYIDKYZpl9KugtWwmT/kX5YaDKiPuRZgr7BnTMUQH+NnF8SKAWCz3pfcUNxC6rCGWOudZJBPW60Y132FPcWeW2kQovkNaBPJfrbMQqKb112fgogUQZ7ASrTyXgmAEt2+p/HQn4r0jra+w0Lq9dPQZ5wLDvyi0zm13ZyFP3pFn3NiU0YxjJ9myogmhPKHSaVlIpqjLM6R8U9w2adsRbnzezI186o1kZaVAjjqaDStKDGD2wtBztfi4RYALXrDGqAmmghb20BHj7yeHyXnE03yAZXVAyd/DlCwBmmi8LkEf0IRMX5+CSZeYHXlfETe/cJ4OvaD0d1/c5aUbrzxQLn/JX2XblUuq/eIs26S31MoihHRbmYcwSl8e4yLLh7Tepj5INazNF/iXFUg7HcDz+3bdWZb5GZpcis1pDqx9ev6IOlWtWXoJlXfGAVv/TTvo/52gSMIqV6NWhpLWUBgdqN28jXGOyVH8rlou5Z2SM0PlEihtU4OqE7nZ028+yNtTXeSsfoys+5eP4iykfTrdZe0O+QShRjIS8oM+flSqYM9bquBLWjcPUBOgJWhhrdp+6aFLv2J7FsxtrRD4SYhj8XD+RL0I7bBWIvHeD9E3j3CeBL70s9mC4c0K2ttUDMujdqVi8imvKZdZGv8FRA3Wxr5K4FWbet8mp3LCRH9ZXEFxHgYHs8kTk7VuvKuhVBlioROesv4q76va520Oxm5Qrq+3XQDhSF+Mpf5XbcmhcRM8U3TPK1W3d+oD/Jk+/xiLaI3RhCOG2Gz+ZT/BNNKRdM32frWbtUm/RRrOScZMTR54g1or3SVoza5IzHtgd8XhXUzvP3Ec+ceP9/e+eipjiuA+HvvP9D73HZ/u2y4twg0MAksyCVLiVZuZBOM7NKodgD6SusCzMluoPrS22gBvjxthhvTzbtmqZL+dRTomu9Jt3ZXe8NyKoMveYRPdY0ipAu18F0Ug8nWNmperL1KceXGO8ngO/aURxUOqg3D+xN52a3ZDaZlHwBwZALCzTDJt/SSe7B/J1wXfL4s6z1Akvs5+Ay+rwiQekRmujFzkrAyGgvdWCRF309A47zMnJuMcRYx9Idi8dwVg1vlbnQx+lGN/1DYuguV6Q7YoT1dEx/fBuRe67WYyVwlKorG3bH0S7fKzfvYbtOjARHCQt2YemOS4xbiDCbqTn+LC5FDr8PN20pa1muW/IxlhLKsVftkWC1MjySvFaDDzqWPFQ5SHBNL+eLHm9vL/Iva+/19pR/ubD7BvCpgZ5IjrOP+BAVSZLo80S87UMtphy+yMz59+ovsmgIR8DxRjC4yXpCOmOaiiDDEau7D1VZJkS6Nex2lYp4Xj7Wi3ieNbeSi5xHbVuV6/lgbEhYIsb+GhmrCc9sXt39ri8zPetdujrSkUJnkuj0EDH2z5LxeAe79JX4qn0lHlNmMVpaLMQYjhESfVrmctbKWK7c7JUfLkrQfylgcTmWIf2XuVY7GJlXww451EvpRyJr6c3rV+8Km7zbES0xhu3hlrhUen+RZBl7yHIRzaFabw/q06L0fQPIJN4lfR88dLB5kuvbC1DZZfTSss0SveRL8ooxhgmXqc7Bx2GRL1ZrI/SD9Kozm/uzTpBkuYX19eBdpOXomXXdVrhKnR7lFVxXRMQ9qw3fTS/R1/rFTo8Rqxl8NPZuTF2X3ueWrhz3g+HCF7HsbMREG/53S+9DtSMe+4neM5jYUZZbplJFHn+NtTMiGZdjdCiIeUJCCUXudjD2Ytmc3ga3ElcM5ZriTum8qHhOLr7j5/SHqDzB9ZVkD9GCHCtFONpk39j6tfZk4gbnb7uWc7q/A/juPR73geN8RPfD+lhrIuCMWuZGev1gOUbHiGNVe5Tnyyo8Vuix1W2GnG3hfplXWGErv5DzfwHfKJ5QE7t+/GbLzQCOyjFp7L9/zV5sY2Thl82WX4yTd+syeJ3V9RA2QI9D9wqyOR6SnwTUg2YLb/mUv+cnxteinDUMn/vFoQ1fQdvvMRaMJDti2Wc24t8p1cdsDuoh9riMLZnY+RUn/XdeZ3KdyPF8mkUQuSI9xfWV8EfNfUUw1AlwwU3maflojDhniUuvhZNip2XtrlNWeirsV9uPGJoqBUs96SfTB66aXmx0HCNufGQC9xPAI1N6RwwnxOJ3AUeKHzsJiGoyKblcNZSLrQARR2rPYk7mE26l8ziqnQ+B4u5B1T1rYMcm9gMbpSiEJDXihT0SKABbn/K4PrdDWCTlkHjXMbWiJNOlx2DHBpaU7eT2QMrJCivhFD4qoVE8ObK5TswvSV+fr73oHJ+suEcXDdwlmjLGbHlGC6zIElFm7jz4M0EBuJGykl4iLnl3ekqMskdobWV9K424uaeFPqNDN9DxJjqkHIaJ2z5jWjuhZICVnWjk4aLLwHmBZdw7LZ/Y04vXf98AvnjAh+k5+Lg3AR8mUKAnub5O0sqlcP7t3RxtF4n17D0PPUiib+SomdpQLk9zNcUvgrrIuvsA+0bhAy4ViAUdO8XUHmfgHZcET9sq53Equ4e9tah7F6PPPehRjhm/h1jvr61M6/KX1gderrUfXyWm45JXcLlJEY9wuQnqXMocN4+g9jJqzKmIBlzOUme2KeG2kTJEgbssv6EoMyTKEMvrrh1NzDSP3EnZdCcO/0kf9mRmDUrfriSvRytjZYtEjn1pK+l75t6FE+9l7fgvpNqp9FHu+wbwo3ZHaOahg1JJJCID7wT2k6o4829Gh5vA41wjvee5PkZlhDtKOZMNc890i+s9YtSOxIwZAyI9SgVhGxL2AEmS+kAEK29EkckjS/QYse2He7yJHhn20HaFvezv8cd1fkrnsS/H0nmpX3Tk/hoUmbeqNDyaKyoVAMQiox3c++qWpu0lux8d2UgeVyLVEndLPpsSlCVeR4cOespgLsCd6C7RJ6kT0/gdv3H/TMInJq+HjpyEu2l2k0cq0uMP6qLt832CKNa7kCpSfw6eL/L+DuDn7KHSSdxPwpxQ/eg/0fU2QSynq9hQRjeBg+FE6WmoV5wQu1v5ATssulumBa81xnKO0bUs6ZPlLZshCc+Iy61aIYy3a2Mk+XMZW+nfTjza6KwaNtidK/rmfX2P1dfDOvekVkfM2ZXGvIjhdl7FxG1mizHHsXcRmSMW68x2qBqHFMHlFAAV+TD5SDNDsTwx/Ogk7Hrzx57WiEgYZEwenAnoCtDP3OgtuHCUskl3yiWcU2TrbOAb4bhUjzV7bfkjJue0vIzodOVfS7ifAH7DHt06qQ71f+6E8eisV0P5SVfAIw41sBIE10G+GA6u7OqPPzIFd+16bl1p8DGzSmijlOPiKe979tpxn3ckdLJ5OTI8cll2FtUziMeyxG6JXGexqjjfFZjOr5D0tie91mwG0Q/2WHSvVY5woiXxYlvD2JHERym/f4YPvwgYgveYhuAKUg5pURKOXVg6L/xPSqcXFbhLNPnSn/br02IfvirjBIf76vznF5duAsMO4Wmfes3/QV+gTCc2RfM6keah5wp65qrO8Vh6Ww27HScncD8BPDmwPwvnpOpnwgOtiEQEyG2KIQrQ6mPY5jjuFZ+2VqDAtfed8roYRib/W8Q76WtVH7fPCtIgEvaIsQ+SeblxTBQiaqt8ZyC6W7Q/RtblHop+z+565D6Ct1YQV+SYvGOd9R6v1OL6xO0216Nvu4+4qqOYOORWFZ8mcXRcJBEuFens0VeZuIPi/1XuKbEY+EIZy4G7lFZWmctWB5by9ZjkCWGe0tplBM2AAhv4uFT9Xjpd5zKoMtEIzrbtitveGd87bONaXtDjCyjfMZdzNdYXeT8BPDfJz4nWPl3frxt9knSOIGeRqtI5HUMGjzY06RW+ictNlJfN9Yrd5LpTvFWnCUleNIAPvCen8RgLeX4i0HgiWo6shQ4KXBgjLnYqexS65Fl/yZ1luU16xF4NH3GP4tLNle90Auc7cZxG6WE8PjTX3tM8o88++ds/p1Rj21OqylIF6zXyQlPTBnsLfl5Zlh8tZbXFJl3tC7UbEA9HR07bM2cmS7hcNKfRu8Y2z3rz51yUqlKCV+t/UYAkOVxfBM4NnkKxeeTD1rF3L/gwZU98Uc+9wHdo9xPA79hPvct4HgjrTEH2yIMahOPpRjLehmeGoT6NIMk8Kr0A+ry3zEiIgOu1nJvKRX7kkp+/w7d81lVJrhTekHgduz62udy/0d96dJJlgeLtyTG60YTWaEDxJVvTHCfWffuHZO+gVIzY+zinxxVdgdWdr+5cR7PouN6IZzlHbL5a15U74riessZlTK3awseI1hNP9Zoh5iUcU/NNzFUrj4VHvKxSLOWaUGJLe2OTQ4ujayywQGWeC7M4ls0swhYGnpZWB0/94u85YosRd96V/nrAXPP+I3nEc4Zd6ziei0h3q/6bAfcTwI/c7ycPeoVz1pxM7ctXor+6Z0vLGdRs6RiUiXGLZc8Hh8u9HCtNO6TX1P7dGRn4cnUPIq2Gr4qjcasEMwdtIBWDTkEk+WBktIMbUTMMSkzHiR3JjXPHvUXPkZ/DU3biPQbd/cT9vSwdrPcR/XPMGuHZwszrSOzxiTJdWCX9VTvCvdUgVC6jvpaP/SK5326PyDd87elZtXf3vKM9/5ClYF6Do4MdPq5L5URJHXu/Sc8420Q51tJxw7HTC7pG/E4TnvJGfez9RT2+iPaNYzpRanux9xPAE6P86FD283gGPdGyCLfJKEmRRYYuUo1i4SXtQXmSbxaee8Ox/Fl6fL613mZb4nrI9R7admYaQeKLGHuWnUiaNoWjZ8PKW4xxLN158qGw2ceySAxfw9hfL8sKY53S+d7xw3TIXq7XLcxPNjK3pW5txB2jYMUO3pCxxTXsdqdHR26UKv060Wbw1Bmz57g3w2+rm8UTmjGVcn1aGePhQBI2l/2/8nivXTsF/fxRu6ooiT42269cvbOu9SYe1C6k8g60lr69qEgvcGtpAvcTwF88DHTu8HpqffsnISdtjGw/oFI/B8QonI9K+CTRN7gIIRyslKQDu7tb8pMDo8ZjpverNNEb7j3gwzLFGJPMO0y3EHWl2YV/jcTtiiW+6KASNU5QyP2O+VAb/dSC7XNx77+soOPes69X1oiLpceX2TIRSV4xxvGGDhUhEWN3SQylwR7zIj2WWmK3pGnW41ntyCPoEQPIATVQCdPNsz3B7dPEdaOltqd+OVr9Wxp6lQ7RLTqpsrrH9TGyoRjiWLrjlnSNovNDr769sFgvcmtpAvcTwF87DOK5I8wn0HiWHVy5Ey4J3CvCBU6GsbxHLPkONmVhzoe+wZuvrHS0bHhwpzB9MLOhK7tUKO/4/0T29kp5x67TnGwsAD36tOa2NEiagegq8WN27Hryp+Hy9KVHEyN+n7AiRlxQ74PMzoVW5F/71QUroLO+Bl/v6AUpe7lFW8TLjGxRWB/dMggfdGBFei5+GCLGfkp6gXmit6OIiGUbZp0CSmu1QRK8X9dFsLmJ4FTCJlsbqi44ibp8xS/ptURut8PMVV07vO4en0pv5jMf0mfL3SQg8bgcS15MPmvjDSVmZf/Otr/g+wng3+2d91XWccDZJn3/uFjpjeRjBERJ5utJUvINVnX077I0w0rds2bxxdcWB/VrTIUDhVwWVtj1kZP+5EXhLh4LJ62SE9fgwt89F2txXVzksSfs+6dVz/70RlzD1YCdhMPYA6O+hmVfe6kBfN7MGtfReLiukrHHwOvt0qKH4N+TnuPnv9tpBYkP7jWM/QE5p+5WtCgppfNNf7RlWc+/aurHaQnohwSEOXPrzQOl89rKWfdxfYAH3NZg5ahkpnXiqWc9k0OgpRGKlAMd2YKvUegByUyuYd9gedF6Nip+het+AvgVu+mCJmcngGz9TDxZ5FzyIjoZyk+9lMWgSG0PN1bSF+/eATU8yP1ur/qWO7Wqi/nYsXCxjPblyqJ/Uv01pjgGx3G9GQcjjSPpcg8rLlCR+pwUKZvrsj2DaRaOuEBq7kl4duIi/Rpes4veS9E2ZcHIahddMJFxqdxqW4Xwd9m7ylp1tBuoHlj6FO4pxXb4nUTk4cTVwPadvryydF2o/Q5tT8pNTJMas6iZTalckQpNexrPvGhoLX1S/agJasV3/QWFYkNvKBFLfhO+nwB+0966olfOvnhiRHyoFkmSvNYTiVZE1jEkWZ48YVCAdMNKenrb4mMwG0U83XWlJIxJsry6pXxYgXvsRrXB1TMH82tBLOpYesTejftkByM91v3YY9zVmDpHJU+ZcnxqZjg+HatRx7WAzHmrSsOjuaI+LwyzeLdJd6y8mQ2+IzLmR/4Njhi6xKOlIGzpbLH5yioo2c5SQtVDDqgSLLm5bRFsJh5y8pSvBGs90mrNJGx5Q/ttfYsqT/br9WsrqpVfUCMXtR8zNP4hXUV4DY4bXDqBYzvzfgJ46dC/gCweFxGfXkIkED5+GeOa2MpGuiFgnbfln1boF7lD4P25XtOaqdLxlELu4msRyaL1lMAarrDp9oqVTwtFo7cr3xbe8s0WQLx8jEI1HJOH/yqs2nCppvcyw7P6iiPRuWRew9TFT12jkpo398kQ8cw2i8lkF72Jn943KGPIEheLzo+i+T/DVGqUpdQFVYJyI1ULz9Y6s+VwOWIXq8G1wONi6zt9dJGrh7bWO1LWune301Y0cTRdWQVgWuMJbeZO9nIK1xM9rzVz2y+bwH0DeNkov5yIs5nzFfzQsiDx5H1Cz1I0F/ucmd70UzV6uXApI1u80I6+lRM72KGKbk+Xz7HapHSV7eZQC9X64BNMnyDlw7En1rRGY+HDFIhb82N/q4xNeXH5fAOzdHxnsGI9fobF67X2sPMp9hC2hSteGzUL+vh3W0HudQ1jXx63/esQ2ZcC9evHNo6caEaIVE06GwngwxIS5OHEaWC+DuU7vMKXT1/O12TKa5Or9ktV2gc3cgwEDGc4zha9ryilcU3CB8oB1OBlcrRE3KvM+Lr3LdoHtPCWda4WOT6A+wZwdYj/mCMeM2DOdGH0h0YTCbdJFuWSofxUTR4R53jJHiVcboXXbU8MYFYC6korkasmZfwQVWD/EI1dnMWUfUzGhUS8wXoiNLPkYRjfGXwmViXOxj+S02pIiXtNhJ+5xU7z//TDjKhdSmON5Ye2cjyX9fHdszaOlkhOTY/jaAnREfHhwJh4CM+/01d/OE0M7X+KEtoIcFmLgDwPwDJs18I8CTxNdTqBSn8r1XZc+9929PHV7+8Afvwu+pAGdWJdel3YJ/OIrGNIMj8dzG91PsVwcFgQHQxvYeRJojfnvuIpkSJhd4tMH5psJRycPGG9HhtzC4bplu+fAPvtcz6d6OjoLLaPr/F4VKwOT3JyrYytmjcgnZeFbKtPE2zTB++j3+kLNAa9f5ltAKgxxLJz+B7eyvfcX9Ev/4z6xsGc2+n3E8Bv3Mfv7DkeT8KcaA99np0j9Oisu0FziBiD7O3XNLNGF4liO7B5nutKndUJlDHFMbrRYMrLSnY+VFWq+FpELiS//q7f+Pf9lrtMWVYmNHkEKnusfSTrjvmMCcR9z/HQ9yqW0i/HUzv+kvu/9qgrxaTEcjSUdw6uivoB6MtvTjPmH2xid+Yf1CnBEPE8KDXKbx+SXkvmDiuk2+oaSs5sJWAtK2QACYd9DRNPXMTYf1H+S2u9aP/dTwAvGuQ/ReMnmuunh0AyUgTSHa+TEkl0fuqAUSzlMUTnIzBT+hXUktbLHfDA44Wwebr73V51UlzKNcOWzlMKyeFP/lDlM7h4xtXHfiK2IrkNGin2dlNQw2L2gAcw8v5baH0Q0fMoJm9Ncp5p/3E85H1Zjxftj7Jv9S6WygQhO8wxukvpYHI2pQeTHOUmwSkn503pMa00r7+uOZXN3eS3otMJRaoLOJEeQTZyEj4zeXikU7z7Z/m/bvOZ/PpaV9d3fgj3DeDqMP/acX5nvr1jtcgnh4o/3bITuL6/MlrxdvJP7TJkqvTmTyyGZj1rv9axCBXNhWu46xfUE12kASNpNOHhAzx3Rn/0hSRpXU7oMyMZcz/eW+5NYG9+R/3ELSX7Xp6y34fjoyYUGxFdtv79kIFSTuzIlnBGccIzeedj23f66vWBXxy0ubEOZC0R4EZh5nw8Y5UMCqQCXV9N/FGH1v4vr//J3XrfAD45wDu9noDxJIz4oUE5ietzMo/IuhnqD/W9WfN1tqmxu5/W4JfkBSm+NYzdJClQgRXiesUy8aEmv4eUhz5m6QPLZMMNwpxeVdrGzQMGY86mPUweci/+0/z03eXYYUHd1rWSscSjZTlf9yev7T/F8kd7XZFyF612mHHvNgcBnXrLhm8qI4lj6fE1JXnY2J7yVQafT54E5eVPuiAzwCXZzh/5hy1nmIUsmaLPwtbUIylHYtb4v9nOaP/V9U/33WPDuL8DOB3mbTw8gXjcRXyYaC3QCdGPXYZzNCmVXh98/DzeHghKaf8uhSes11nrdt/u/Ip2jK66B2uTQmHHrtdS2QR9AvyNzMVQWvl+m1Do9F6cBReEpXjLdxCVyXfH5G84BekpS2cqHI5dV+uFX1rZPh3H/gvWe9yKp/wreH1VXSvxzLHMEI6+b2QZUCIo1WrNUqbaUnAtUL0N94BkSs7m7yXRilwE4JbDV4HuCa6Th4z52I/KMb99h6+m85SPFbburCVTW9GZrTgbQ4stynpGCBzhjA7bGPnvIebw4Gj/vYGtr/h+Arg+m9vz7AR0gvKCy09a1/EfkpC63E+knMvMkA3p4zODxFMD+lMCDCs1qnvF+4DZG0GHJmLZTzbgFOiSurCCRZs2ZpKvufJpy0bJDBIstx7NnHH5Xpk8xW+42soNRvGLqZQvmGu8iuhP3xwX++gvGT3+b3Dvv9QHq2PNacSsoK6tzq9kpmCwErUhqgQXZ/dnTMxQ0GLk91dOmrzBk10VDDZyIIs42vE/L8t5mnhoq86pQD9eSkx2E1vLV3iwGY+W7q8DFJ6ucMfoSKeTDTvS/b+us37kr6/38PoePxjuG8DDQ74Dn5oAxygfRCJz/SlyJVPgKNEYLzS0kwzlqQF8MijKX9U3JBJ/taQuvMK+Rey+g7pR6EOS+w0tL+u+TsU6VomAG121N6zYvKkImpQKUny5Jao4e8xPbi5IzCfI3mPvv/RVcFmr2u7+ZAvz4alsWxF+ZKUhr41DSksiqNp6a91BbLdsay2+NpKjIUY6RUtw4wl9xrlMH7/Dl37QqO3lp6qJYjhtU7rc3hk6cllhZlH0uYzG4uOTMWJokS2xKmv2GPft2Nfp+rev64P6v28AP2hnLFv5saOe5UjyYtH4wA9JSCK5yPA58WhzlHUMSfpTg8wQA6b8XusVupqgSfGjR7v7pGsjtqC19+HDckhJwHG+Y6wsJA3+ZYXs5sOv0gHF7ekRl3I94jOwrXHaf+83rmdcbOKx0Mwq7LaIFeT+GZZtdZsnl/1BMWIMY1rlvcbRnvJlunT7PJyQwlYn6e62bmt2ifUUy66qeyPDMnrX4nQKdvwovXPsNvCFAVwMfn2dT+2a54ZzfwfwqeHfyacnEI/XiE8TxgQndJ2rSYx3rOcyPS5nO0UK1QeLImTOTxb8Sl4MRtgizfZq1Rt2XXXB6utYb2S0rqPhDCZWpdmwCSe9wdpextbuAsNFvONCWSpV+8Af/cnJ0zcOg834mC+sBNWiHgTC6EnNW8YkJMvUX2MRR2KIPS2PkMeY00UeSOCpXq89/Q5fcveIUaeo+7EVKU/dac0xi57ZWsK6ArWnu76eue1xDmpsZ3y+19f0+d1+dYf3E8Cv3n0/1rxOfF5amutgyYc2yJCQCB/biHTpbNluhvxrvoTb04oaMD7NwH+sh2uirMk2ZGxIKkUsu2zakAUtMfYgY1pwZ+gx0tcwPklusrCJCF1S2xZ+Nn+tBnVbA1mxNxLNtKnGeDDSk2VzOzhKzzmpO/2B1NXjP/P0p3vl/MnvfQkpJj7dU8lzLcRox9IdH1lQjSENKTM68gDdwyGq8Y46Dze4k/jt/e8s73r38zv7fgJ4/V65kPFXfqR7YCQ6tuPyI36AtqfMCsi7Zu+ZMy1n6Y0t6bSbpQUUezakaH+6QQYkfyl9Meoj4rXeWNea/4X22OK78eGlxcYOJ9bA2XHC3Ne41+xna6/EU37F7eb2nb16x16+s5cI6rJ4ute+y8djVVuCl8OM9FpzXYVm0TPbnGGwsjuiJAhaJPZXSa9DT6+qdRWv93wV582zO4H7CeDuiP4y4B8/K1i+JC92Bz7w0/J5QmeYtktAuiiXpxgY6vrah1LMnnxcWerTS3+IIDbgmP6xga1QHoDhtnZs5D6KybtKPttPzI99uV86L8WhE+MYG3GS127H7iFSH9bK+JSvP9UrnQlLqwlKlVqhZFYrltBzwAqVmLeIsc+9hWXuGzOnKBbbwpSKMVPiFxu9l0/sh/5ePIbfo79mZ95PAH/vyPitFcXj3DG6PqGkH/uk2pgPJBB76DHymOk4624QfcUS7TuFrVQPzj4ejWihLcZ7/CudPvMqQhP4ZHb9DGax5AvrtYXFf3YTH7VibrSv4chBj+JDj7nUwg/2HGyzGHx/KVlT6a891asttUO3ziBHp1BFD5m2PFMri24Cid5bq+KWDHPbHlfyx7JgL+H6Aco/CaFH+n9XE9R9V727zqEJ3DeAh8Z0B330BLi4INUs1//NC50SNgNs2U5OAUnsR3k6JZlYGk7KrH09VSn28mtjPTXRB6vy8j8UnJXydKX8mq0w57zyiYyhJFL4YVkq924fJtpJVB3fzmLP3dMj9178zA8HMsbI7sdLxDH+xTiUnx0vOp7yU7r0k0g57vinq8uTuXa8Jq5GV40Np2WgI7Uy6cc3ouP8xEAXx9lypDcjAzjK6MvJX/rGGGnfx4lNkhm4bU33WPRYZy33tp+YwHVDvW8AT4z9Dv2iCXABOt3y0cR4Eh7NO9bQjG24RqcA7umKXYbC3XD9QCxxxkjisVYORImbzepgWpMnQtcofsf+h8MYDiwdVzLQT5IJ5tu8GlfcfHc1uRWaNg6rRlft8sGG7lL6+c3IW/LM1pzrSmu4hoCRMju16+us3+XZWtOWL67SY12PcTd+cALXDvX+DuCDu+FO+4IJcK5IotN2xNifkpBSECxS148VISOy6XMp+ywgP50Bp4CCMVTcetBTHPnc3/XcXfZbnxE3V8hr9hPKBRQnqn1IqBZ94cIjVdhfZX/3pY84Hg/Ciq2kEryquXqKXcfbRrhc2lpOgeE9eh1L5xXSjkKnU84WplSMOVrrjrsn8JIJXH9A3k8AX7KjbtKPmYCfM67ToGz5jiq98SgD30MyFplhFTy2zbLJzD4LcEwFfZBL16voJSFj2ZcBmV5Pc/JNQPnyYSFon5otO8cu31RDMQe20s6BwF8N8QGcmFscRxt35Cj85emc1crxCVcTEANY7katmkZRjo/eSHaFBAvvgVkLga2KZ7hOeszDviOHRaRYsJdwHbqZDd8t7wm8bQKvORDvJ4Bv24GPFnrNjn+0m5/Ky6NNb4xYMr+qAftli4YwF6FYlRTBB5Ykz23burOg6zMPXdm6t8s4vXGfJ4M+2NvNHwGUM5xjxCmbtqp0nI3J3AJqGDjDVDJhM/X46m/5BXtsIax2hHFhulRG/oD3+l/6vTuexiVb5l3DeWo5qPAJp4T8X3rLNzhguIrUOPP+Lu5k7ONPprwhK1wXs8CZbWD1AOn+Wi/VPcRXi9PJBI5y5qsUt7gn8C9O4L4B/Bf3+r3mnQmkT099ePCUYCf6GrcK8oklRtevqwBTZM94aqwZ5iP2f/UugnsNbjrK2FJU9jNGCPjumOFcImGZ0is+rfK/0JJD437Zw3UJl4mderFfvhtX6sf1s97e3er8fJ6ak4almWnLuKjZJnv11bSGa3gN7majyr6IW0JUCHR7s0nhpYDmCLp8D25r+8Ptsxa8lQdL32n3BF4/gdcdqPcN4Ov33l3h6yZQTzjOO0lerAUf+CXSi67pjxcWY/yM3GSra1ZOVitWzgLLgD8l5Id4YLlCQnHpvWqDn6dgxacYnnqlhJzz2Vjr7WvLHQ/rq/MoQ8k7JYQv51eWrfe8DwNdnmKfVpkqOCelt4ixz+UYXf4OsEfKTww62OMe1CNVxmY0tS3ebQ+WvdPuCfzyBO7vAP7y3r3X9vwE4oeIY3TuiPxu6vnKKwwUldt14fONRIaIxcomHxVky7Htrd4STDEMKSf5xZFHlXT9v3fBSsUuWWIzYbafwpmokojXcdJnuPFHf8wXTi8bwAmsxJ6vX9vqn/Dp7bUpOH3OyZMo4+g4a+XNXM0abRG3wIWiSLqSE90ZXIfAbJGCkEck5ckFa6fRm5UmrAyxoVu5J/BlE5gd1Nct4b4BvG6WL2Syi9wLq/y71E/Ol3MUqUHqAyrSgpEMfA8TtytFpA1ZUH+nKVnaJ2h1gwVjQ92CZ1lhaanETRCBzI4EdBOozbt7FvNrT2oNOBlZbfZX3OpHv3rLgeNkW7yaTdsjWHmVuvXUpy3vFZsqsGLnw46Uj26Iixj7QenUpEQbOErFR5tj+FpQM9zKPYEfmIAO9tdu96+AXzvfm/2rJjD7kHxwAXxQKV2640gZy0Yc4x/GfkGhKcjcJ1vEMwu5M7nMn0W5LWacxVdy7dVWrb2Y435F5r/CYUuI2eY6reqAgq/UGrEIsTs5OW7r+uHDNNLERLBLz0GPsreSNJyD8Qb3BO4JbEzgvgHcGM7t+pcncMEHSqRwLD3iM+P23DN5m7FrTWEvRcutypEGPMb10MSGK0RuwkjzarzZzOXOrdXIx0uF0cmJ8vLmxmN5Rk8L+BxL5yU/PiQ5t7wn8M9M4D0H//0r4H/mgLoX+icTiOfxFnYfT0NoWj63uU7MS6Q3pQKOXfeGsMsmHZ/b4aq+HOax8v/rG/NiDntYcUdi4HtesofbLo6UvkuPtBZjIt8m9mKbgbfznsAHT+Cpk+D4ulKZ+wbw+LjuyH9iAu0j7W9XO7sGuI026/1Tblb+LTsrIm4NYz8lI6kne+OyO3Y9+pyDhRL/6Vi9szN8HVv62pq2ci7waaSUFt0axo6spYdVBl8Omdlq7vXircWub/9m/McnoOP3fdt9A/i+Wd+VPnoCX/bB4e1yzfAPcZ91tO9hz31K9yafIkrJLBKeT8fqM/ZI73uSW6or57dRc+94wO+S1mZLxLdR8rWuP2/gtcu72X90ArOT6bVLvb8D+Nr5Xsj+/oPjwuZvqldMIB4SjqVH7D24T/ZLcCTxggd00pEHUv7ZkDijV2A4JXlp4G6vO4B7wwq7wEFO97xYe3vBF6/npv/tCbz5eFW5dG7eN4C/fVTdq/v1CcTrxgxjk+SluaDjxyapD26z5383z/DwK0PiJZ/dVCPUfpbye/J9wHQ9s+HbkNx4EQJ2Oum8FIceY+AgxvGaDpf7ndftt35P4J7A+yZg5+F9A/i+sd+VvmYCs0/Lr2n+8Ua5MPDhzY3YDFMFH1h3EfzDfvJlXJ0ZF1O2RFzD8o2I9D1/jP82HNeXcXqb2llcnUs8RCOecUSbUV6h0sImFz1sBl3lfGuxq5q+ef6pCegYfeNx6qWSft8A/lMH273YewInJuAXC6U5lh6xU8sX7wj2sOe7vpf3bX7WttU3/4uUHJuGyayjlF82XuCZlO3dm/rSOuNa39YHA3tbwbvQPYHPn0A9J+8bwM/fVdbhfTGzYbxAvef71FCH8aUrTMNJkd5w1SNeKx5zFee5n4bX+vWeY8yAayBPUvNckq2aM5ytuTn+Tpne59E3TvDb2nx7wbet7C70rRPQMfnG49LL6Tyspe+/BfxVxw9X0K9q+m72RyZg1431FcVr2hms2HiIe77r6uDb8BU9i+PDt8PHSdzXL13X7OB6acGb/J7A503Az7l0StxPAD9uF/keis3FT7zov/F1E2A/3DM/P9PZzGa2CbPCDoZOsn/IxBA4DrU0bJ+/TO86d8t+dcfbl0MTnz+/u8NfncAfHIN+noXy/wcpDDHTwhkIIAAAAABJRU5ErkJggg=='),
            e.captureStream(5)
          );
        }
        var gs = {
          Browse: function () {
            var e,
              f = {},
              v = navigator.userAgent.toLowerCase();
            (e = v.match(/msie ([\d.]+)/))
              ? (f.ie = e[1])
              : (e = v.match(/firefox\/([\d.]+)/))
              ? (f.firefox = e[1])
              : (e = v.match(/chrome\/([\d.]+)/))
              ? (f.chrome = e[1])
              : (e = v.match(/opera.([\d.]+)/))
              ? (f.opera = e[1])
              : (e = v.match(/version\/([\d.]+).*safari/)) && (f.safari = e[1]);
            return f.ie
              ? 'IE ' + f.ie
              : f.firefox
              ? 'firefox ' + f.firefox
              : f.chrome
              ? 'chrome ' + f.chrome
              : f.opera
              ? 'opera ' + f.opera
              : f.safari
              ? 'safari ' + f.safari
              : '未知浏览器';
          },
          ClientOs: function () {
            var e = navigator.userAgent,
              f = 'Win32' == navigator.platform || 'Windows' == navigator.platform,
              v =
                'Mac68K' == navigator.platform ||
                'MacPPC' == navigator.platform ||
                'Macintosh' == navigator.platform ||
                'MacIntel' == navigator.platform;
            if (v) return 'Mac';
            if ('X11' == navigator.platform && !f && !v) return 'Unix';
            if (String(navigator.platform).indexOf('Linux') > -1) return 'Linux';
            if (f) {
              if (e.indexOf('Windows NT 5.0') > -1 || e.indexOf('Windows 2000') > -1) return 'Win2000';
              if (e.indexOf('Windows NT 5.1') > -1 || e.indexOf('Windows XP') > -1) return 'WinXP';
              if (e.indexOf('Windows NT 5.2') > -1 || e.indexOf('Windows 2003') > -1) return 'Win2003';
              if (e.indexOf('Windows NT 6.0') > -1 || e.indexOf('Windows Vista') > -1) return 'WinVista';
              if (e.indexOf('Windows NT 6.1') > -1 || e.indexOf('Windows 7') > -1) return 'Win7';
              if (e.indexOf('Windows NT 10') > -1 || e.indexOf('Windows 10') > -1) return 'Win10';
            }
            return 'other';
          },
        };
        module.exports = { getMuteStream: getMuteStream, gs: gs };
      },
      {},
    ],
    9: [
      function (require, module, exports) {
        function H264SDP(e, r) {
          if (e && r)
            return `a=rtpmap:${e} H264/90000\na=rtcp-fb:${e} ccm fir\na=rtcp-fb:${e} nack\na=rtcp-fb:${e} nack pli\na=rtcp-fb:${e} goog-remb\na=rtcp-fb:${e} transport-cc\na=fmtp:${e} level-asymmetry-allowed=1;packetization-mode=1;profile-level-id=${r}`;
          throw new Error(`SDP-Transform: payload:${e} or id:${r} not allowed to be null.`);
        }
        function removeCodec(e, r) {
          var a = supportVideoCodecs(e),
            n = a.indexOf(r);
          return -1 !== n && a.splice(n, 1), uniformOfferSDPCodecsPayload(e, a);
        }
        function bubbleUpH264(e) {
          var r = e.match(/(m=video \d+ \D+\b\s)(.*)/),
            a = r[1],
            n = r[2].split(' '),
            t = n.indexOf(String(H264_BASE)),
            o = n.indexOf(String(H264_PROFILE));
          -1 !== t && n.splice(t, 1),
            -1 !== o && n.splice(o, 1),
            -1 !== t && n.unshift(String(H264_BASE)),
            -1 !== o && n.unshift(String(H264_PROFILE));
          var s = a.concat(n.join(' ')).concat('\r\n');
          return (e = e.replace(/m=video.*\r\n/, s));
        }
        function isSupportCodec(e, r) {
          return !!e.match(RegExp(`a=rtpmap:\\d+ ${r}`, 'i'));
        }
        function uniformOfferSDPCodecsPayload(e, r) {
          var a = supportVideoCodecs(e);
          return 0 === a.length ? e : (r && (a = _.intersection(r, a)), _updatePayload(e, a));
        }
        function supportVideoCodecs(e) {
          for (var r = /a=rtpmap:\d+ (\w+)/g, a = r.exec(e), n = []; a; ) 'H264' !== a[1] && n.push(a[1]), (a = r.exec(e));
          for (a = (r = /profile-level-id=((\w{2})\w{4})/g).exec(e); a; ) {
            switch (a[2]) {
              case '64':
                (H264ProfileId = a[1]), n.push('H264_PROFILE');
                break;
              case '42':
                (H264BaseId = a[1]), n.push('H264_BASE');
                break;
              case '4d':
                console.log('SDP-Transform: missing 4dxxxx profile id of H264.');
                break;
              default:
                throw new Error(`SDP-Transform: unknown H264 profile-level-id ${a[2]}`);
            }
            a = r.exec(e);
          }
          return _.intersection(SUPPORT_VIDEO_CODECS, n);
        }
        function _updatePayload(e, r) {
          var a = e.split('\r\n'),
            n = [],
            t = [];
          if ((r.reverse(), -1 != navigator.userAgent.indexOf('Firefox')))
            for (var o of r)
              switch (o) {
                case 'VP8':
                  n.unshift(VP8), t.unshift(VP8_SDP_ff);
                  break;
                case 'VP9':
                  n.unshift(VP9), t.unshift(VP9_SDP_ff);
                  break;
                case 'H264_BASE':
                  n.unshift(H264_BASE),
                    t.unshift(H264SDP(H264_BASE, H264BaseId)),
                    n.unshift(H264_BASE_fireFox),
                    t.unshift(H264SDP(H264_BASE_fireFox, H264BaseId));
                  break;
                case 'H264_PROFILE':
                  break;
                default:
                  throw new Error(`unknown codec ${o} found.`);
              }
          else {
            defaultEnv.redEnable && (defaultEnv.rtxEnable && (n.push(RED_RTX), t.push(RED_SDP_RTX)), n.unshift(RED), t.unshift(RED_SDP)),
              defaultEnv.ulpfedEnable && (n.unshift(ULPFEC), t.push(ULPFEC_SDP));
            for (var o of r)
              switch (o) {
                case 'VP8':
                  defaultEnv.rtxEnable && (n.push(VP8_RTX), t.unshift(VP8_SDP_RTX)), n.unshift(VP8), t.unshift(VP8_SDP);
                  break;
                case 'VP9':
                  defaultEnv.rtxEnable && (n.push(VP9_RTX), t.unshift(VP9_SDP_RTX)), n.unshift(VP9), t.unshift(VP9_SDP);
                  break;
                case 'H264_BASE':
                  defaultEnv.rtxEnable && (n.push(H264_BASE_RTX), t.unshift(H264_BASE_SDP_RTX)),
                    n.unshift(H264_BASE),
                    t.unshift(H264SDP(H264_BASE, H264BaseId));
                  break;
                case 'H264_PROFILE':
                  defaultEnv.rtxEnable && (n.push(H264_PROFILE_RTX), t.unshift(H264_PROFILE_SDP_RTX)),
                    n.unshift(H264_PROFILE),
                    t.unshift(H264SDP(H264_PROFILE, H264ProfileId));
                  break;
                default:
                  throw new Error(`unknown codec ${o} found.`);
              }
          }
          for (var s = t.join('\n').split('\n'), c = 'none', p = [], f = 0, i = 0; i < a.length; i++)
            switch (
              ('audio' !== c && 0 === a[i].indexOf('m=audio')
                ? (c = 'audio')
                : 'video' !== c &&
                  0 === a[i].indexOf('m=video') &&
                  ((c = 'video'),
                  (a[i] = a[i].replace(/(m=video \d* UDP\/TLS\/RTP\/SAVPF)(.*)/, '$1 ' + n.join(' '))),
                  (a[i] = a[i].replace(/(m=video \d* RTP\/SAVPF)(.*)/, '$1 ' + n.join(' '))),
                  (a[i] = a[i].replace(/(m=video \d* RTP\/AVPF)(.*)/, '$1 ' + n.join(' ')))),
              c)
            ) {
              case 'video':
                0 === a[i].indexOf('a=rtpmap:') || 0 === a[i].indexOf('a=rtcp-fb:') || 0 === a[i].indexOf('a=fmtp:') ? (f = p.length) : p.push(a[i]);
                break;
              default:
                p.push(a[i]);
            }
          var u = p.slice(f);
          return p.slice(0, f).concat(s).concat(u).join('\r\n');
        }
        function rearrangeAnswerPayloadOrder(e, r) {
          var a = supportVideoCodecs(e);
          if (0 === a.length) return e;
          var n = e.match(/(m=video \d+ \D+\b\s)(.*)/)[1],
            t = _.intersection(r, a),
            o = _.difference(a, r);
          a = t.concat(o);
          var s = [];
          if (
            (isSupportCodec(e, 'ulpfec') && s.push(ULPFEC),
            isSupportCodec(e, 'red') && (s.unshift(RED), s.push(RED_RTX)),
            a.reverse(),
            -1 != navigator.userAgent.indexOf('Firefox'))
          )
            for (var c of a)
              switch (c) {
                case 'VP8':
                  s.unshift(VP8);
                  break;
                case 'VP9':
                  s.unshift(VP9);
                  break;
                case 'H264_BASE':
                  s.unshift(H264_BASE);
                  break;
                case 'H264_PROFILE':
                  break;
                default:
                  throw new Error(`unknown codec ${c} found.`);
              }
          else
            for (var c of a)
              switch (c) {
                case 'VP8':
                  s.unshift(VP8), defaultEnv.rtxEnable && s.push(VP8_RTX);
                  break;
                case 'VP9':
                  s.unshift(VP9), defaultEnv.rtxEnable && s.push(VP9_RTX);
                  break;
                case 'H264_BASE':
                  s.unshift(H264_BASE), defaultEnv.rtxEnable && s.push(H264_BASE_RTX);
                  break;
                case 'H264_PROFILE':
                  s.unshift(H264_PROFILE), defaultEnv.rtxEnable && s.push(H264_PROFILE_RTX);
                  break;
                default:
                  throw new Error(`unknown codec ${c} found.`);
              }
          var p = n.concat(s.join(' ')).concat('\r\n');
          return (e = e.replace(/m=video.*\r\n/, p));
        }
        function alterUploadStreamSssrc(e, r) {
          var a = new RegExp('a=ssrc:(\\d+) .* ' + r.bigStreamId),
            n = new RegExp('a=ssrc:(\\d+) .* ' + r.smallStreamId),
            t = e.match(a),
            o = e.match(n);
          return (
            (t && o) || console.log('SDP-Transform(alterUploadStreamSssrc): Can not find Big&Small ssrc in', e, r),
            (e = e.replace(new RegExp(t[1], 'g'), 2 * Math.floor(parseInt(t[1]) / 2) + 1)),
            (e = e.replace(new RegExp(o[1], 'g'), 2 * Math.ceil(parseInt(o[1]) / 2)))
          );
        }
        function alterAudioSampleRateAndChannels(e, r, a) {
          var n = e.match(/a=rtpmap:(\d+) opus/);
          if (!n) return console.log('sdp-transform: Not found opus.'), e;
          if (-1 != e.indexOf('sprop-maxcapturerate')) return e;
          var t = new RegExp(`(a=fmtp:${n[1]} .*)\r\n`);
          return (e = a
            ? e.replace(t, `$1;stereo=1;sprop-stereo=1;maxplaybackrate=${r};sprop-maxcapturerate=${r}\r\n`)
            : e.replace(t, `$1;maxplaybackrate=${r};sprop-maxcapturerate=${r}\r\n`)).replace(t, `$1;\r\n`);
        }
        function adjustStreamsWithSdp(e, r, a, n, t) {
          for (var o = e.split('\r\n'), s = [], c = {}, p = 0; p < o.length; p++)
            _.some(a, function (e) {
              return 0 === o[p].indexOf(`a=ssrc:${e} `) || (0 === o[p].indexOf('a=ssrc-group:FID') && -1 != o[p].indexOf(e));
            }) || s.push(o[p]);
          for (var f = s.pop(), p = 0; p < r.length; p++) {
            var i = r[p],
              u = n[i],
              d = UUID.create().toString(),
              l = UUID.create().toString(),
              P = UUID.create().toString();
            s.push(`a=ssrc-group:FID ${i} ${u}`),
              s.push('a=ssrc:' + i + ' cname:' + d),
              s.push('a=ssrc:' + i + ' msid:' + l + ' ' + P),
              s.push('a=ssrc:' + u + ' cname:' + d),
              s.push('a=ssrc:' + u + ' msid:' + l + ' ' + P),
              (c[i] = l),
              console.log(`[sdp-transform] ssrc: ${i} msid: ${l} cname: ${d} label: ${P}`);
          }
          return s.push(f), t && t(c), s.join('\r\n');
        }
        function getDefaultStreamId(e) {
          var r = e.match(/msid:(.*) /);
          return r ? r[1] : null;
        }
        function changeStreamSsrc(e, r, a) {
          if (!r || !a) return console.log(`[changeStreamSsrc] smallId and bigId all must not be none.`), e;
          var n = new RegExp('a=ssrc:(\\d+) .* ' + a),
            t = new RegExp('a=ssrc:(\\d+) .* ' + r),
            o = e.match(n),
            s = e.match(t);
          return (
            (o && s) || console.log('SDP-Transform(alterUploadStreamSssrc): Can not find Big&Small ssrc in', e, options),
            (e = e.replace(new RegExp(o[1], 'g'), 1e3)),
            (e = e.replace(new RegExp(s[1], 'g'), 1001))
          );
        }
        var _ = require('lodash'),
          UUID = require('uuid-js'),
          defaultEnv = { rtxEnable: !0, redEnable: !0, ulpfedEnable: !0 };
        const VP8 = 96,
          VP8_RTX = 107,
          VP9 = 98,
          VP9_RTX = 108,
          H264_PROFILE = 99,
          H264_PROFILE_RTX = 111,
          H264_BASE = 100,
          H264_BASE_fireFox = 126,
          H264_BASE_RTX = 110,
          RED = 106,
          RED_RTX = 109,
          ULPFEC = 124,
          CODEC_VP9 = 'VP9',
          CODEC_VP8 = 'VP8',
          CODEC_H264_BASE = 'H264_BASE',
          CODEC_H264_PROFILE = 'H264_PROFILE';
        var H264BaseId = null,
          H264ProfileId = null;
        const VP8_SDP = `a=rtpmap:${VP8} VP8/90000\na=rtcp-fb:${VP8} ccm fir\na=rtcp-fb:${VP8} nack\na=rtcp-fb:${VP8} nack pli\na=rtcp-fb:${VP8} goog-remb\na=rtcp-fb:${VP8} transport-cc`,
          VP8_SDP_RTX = `a=rtpmap:${VP8_RTX} rtx/90000\na=fmtp:${VP8_RTX} apt=${VP8}`,
          VP9_SDP = `a=rtpmap:${VP9} VP9/90000\na=rtcp-fb:${VP9} ccm fir\na=rtcp-fb:${VP9} nack\na=rtcp-fb:${VP9} nack pli\na=rtcp-fb:${VP9} goog-remb\na=rtcp-fb:${VP9} transport-cc`,
          VP9_SDP_RTX = `a=rtpmap:${VP9_RTX} rtx/90000\na=fmtp:${VP9_RTX} apt=${VP9}`,
          ULPFEC_SDP = `a=rtpmap:${ULPFEC} ulpfec/90000`,
          RED_SDP = `a=rtpmap:${RED} red/90000`,
          RED_SDP_RTX = `a=rtpmap:${RED_RTX} rtx/90000\na=fmtp:${RED_RTX} apt=${RED}`,
          H264_BASE_SDP_RTX = `a=rtpmap:${H264_BASE_RTX} rtx/90000\na=fmtp:${H264_BASE_RTX} apt=${H264_BASE}`,
          H264_PROFILE_SDP_RTX = `a=rtpmap:${H264_PROFILE_RTX} rtx/90000\na=fmtp:${H264_PROFILE_RTX} apt=${H264_PROFILE}`,
          VP8_SDP_ff = `a=rtpmap:${VP8} VP8/90000\na=rtcp-fb:${VP8} nack\na=rtcp-fb:${VP8} nack pli\na=rtcp-fb:${VP8} ccm fir\na=rtcp-fb:${VP8} goog-remb\na=fmtp:${VP8} max-fs=12288;max-fr=60`,
          VP9_SDP_ff = `a=rtpmap:${VP9} VP9/90000\na=rtcp-fb:${VP9} nack\na=rtcp-fb:${VP9} nack pli\na=rtcp-fb:${VP9} ccm fir\na=rtcp-fb:${VP9} goog-remb\na=fmtp:${VP9} max-fs=12288;max-fr=60`,
          H264_BASE_SDP_ff = `a=fmtp:${H264_BASE} profile-level-id=42e01f;level-asymmetry-allowed=1;packetization-mode=1\na=rtcp-fb:${H264_BASE} nack\na=rtcp-fb:${H264_BASE} nack pli\na=rtcp-fb:${H264_BASE} ccm fir\na=rtcp-fb:${H264_BASE} goog-remb\na=rtpmap:${H264_BASE} H264/90000`,
          SUPPORT_VIDEO_CODECS = ['H264_PROFILE', 'H264_BASE', 'VP8', 'VP9'];
        module.exports = {
          alterUploadStreamSssrc: alterUploadStreamSssrc,
          uniformOfferSDPCodecsPayload: uniformOfferSDPCodecsPayload,
          rearrangeAnswerPayloadOrder: rearrangeAnswerPayloadOrder,
          supportVideoCodecs: supportVideoCodecs,
          removeCodec: removeCodec,
          bubbleUpH264: bubbleUpH264,
          isSupportCodec: isSupportCodec,
          defaultEnv: defaultEnv,
          alterAudioSampleRateAndChannels: alterAudioSampleRateAndChannels,
          adjustStreamsWithSdp: adjustStreamsWithSdp,
          getDefaultStreamId: getDefaultStreamId,
          changeStreamSsrc: changeStreamSsrc,
          CODEC_VP9: 'VP9',
          CODEC_VP8: 'VP8',
          CODEC_H264_BASE: 'H264_BASE',
          CODEC_H264_PROFILE: 'H264_PROFILE',
        };
      },
      { lodash: 4, 'uuid-js': 7 },
    ],
    10: [
      function (require, module, exports) {
        function defaultSetTimout() {
          throw new Error('setTimeout has not been defined');
        }
        function defaultClearTimeout() {
          throw new Error('clearTimeout has not been defined');
        }
        function runTimeout(e) {
          if (cachedSetTimeout === setTimeout) return setTimeout(e, 0);
          if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) return (cachedSetTimeout = setTimeout), setTimeout(e, 0);
          try {
            return cachedSetTimeout(e, 0);
          } catch (t) {
            try {
              return cachedSetTimeout.call(null, e, 0);
            } catch (t) {
              return cachedSetTimeout.call(this, e, 0);
            }
          }
        }
        function runClearTimeout(e) {
          if (cachedClearTimeout === clearTimeout) return clearTimeout(e);
          if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout)
            return (cachedClearTimeout = clearTimeout), clearTimeout(e);
          try {
            return cachedClearTimeout(e);
          } catch (t) {
            try {
              return cachedClearTimeout.call(null, e);
            } catch (t) {
              return cachedClearTimeout.call(this, e);
            }
          }
        }
        function cleanUpNextTick() {
          draining &&
            currentQueue &&
            ((draining = !1), currentQueue.length ? (queue = currentQueue.concat(queue)) : (queueIndex = -1), queue.length && drainQueue());
        }
        function drainQueue() {
          if (!draining) {
            var e = runTimeout(cleanUpNextTick);
            draining = !0;
            for (var t = queue.length; t; ) {
              for (currentQueue = queue, queue = []; ++queueIndex < t; ) currentQueue && currentQueue[queueIndex].run();
              (queueIndex = -1), (t = queue.length);
            }
            (currentQueue = null), (draining = !1), runClearTimeout(e);
          }
        }
        function Item(e, t) {
          (this.fun = e), (this.array = t);
        }
        function noop() {}
        var process = (module.exports = {}),
          cachedSetTimeout,
          cachedClearTimeout;
        !(function () {
          try {
            cachedSetTimeout = 'function' == typeof setTimeout ? setTimeout : defaultSetTimout;
          } catch (e) {
            cachedSetTimeout = defaultSetTimout;
          }
          try {
            cachedClearTimeout = 'function' == typeof clearTimeout ? clearTimeout : defaultClearTimeout;
          } catch (e) {
            cachedClearTimeout = defaultClearTimeout;
          }
        })();
        var queue = [],
          draining = !1,
          currentQueue,
          queueIndex = -1;
        (process.nextTick = function (e) {
          var t = new Array(arguments.length - 1);
          if (arguments.length > 1) for (var r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
          queue.push(new Item(e, t)), 1 !== queue.length || draining || runTimeout(drainQueue);
        }),
          (Item.prototype.run = function () {
            this.fun.apply(null, this.array);
          }),
          (process.title = 'browser'),
          (process.browser = !0),
          (process.env = {}),
          (process.argv = []),
          (process.version = ''),
          (process.versions = {}),
          (process.on = noop),
          (process.addListener = noop),
          (process.once = noop),
          (process.off = noop),
          (process.removeListener = noop),
          (process.removeAllListeners = noop),
          (process.emit = noop),
          (process.prependListener = noop),
          (process.prependOnceListener = noop),
          (process.listeners = function (e) {
            return [];
          }),
          (process.binding = function (e) {
            throw new Error('process.binding is not supported');
          }),
          (process.cwd = function () {
            return '/';
          }),
          (process.chdir = function (e) {
            throw new Error('process.chdir is not supported');
          }),
          (process.umask = function () {
            return 0;
          });
      },
      {},
    ],
    11: [
      function (require, module, exports) {
        (function (setImmediate, clearImmediate) {
          function Timeout(e, t) {
            (this._id = e), (this._clearFn = t);
          }
          var nextTick = require('process/browser.js').nextTick,
            apply = Function.prototype.apply,
            slice = Array.prototype.slice,
            immediateIds = {},
            nextImmediateId = 0;
          (exports.setTimeout = function () {
            return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
          }),
            (exports.setInterval = function () {
              return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
            }),
            (exports.clearTimeout = exports.clearInterval = function (e) {
              e.close();
            }),
            (Timeout.prototype.unref = Timeout.prototype.ref = function () {}),
            (Timeout.prototype.close = function () {
              this._clearFn.call(window, this._id);
            }),
            (exports.enroll = function (e, t) {
              clearTimeout(e._idleTimeoutId), (e._idleTimeout = t);
            }),
            (exports.unenroll = function (e) {
              clearTimeout(e._idleTimeoutId), (e._idleTimeout = -1);
            }),
            (exports._unrefActive = exports.active = function (e) {
              clearTimeout(e._idleTimeoutId);
              var t = e._idleTimeout;
              t >= 0 &&
                (e._idleTimeoutId = setTimeout(function () {
                  e._onTimeout && e._onTimeout();
                }, t));
            }),
            (exports.setImmediate =
              'function' == typeof setImmediate
                ? setImmediate
                : function (e) {
                    var t = nextImmediateId++,
                      i = !(arguments.length < 2) && slice.call(arguments, 1);
                    return (
                      (immediateIds[t] = !0),
                      nextTick(function () {
                        immediateIds[t] && (i ? e.apply(null, i) : e.call(null), exports.clearImmediate(t));
                      }),
                      t
                    );
                  }),
            (exports.clearImmediate =
              'function' == typeof clearImmediate
                ? clearImmediate
                : function (e) {
                    delete immediateIds[e];
                  });
        }.call(this, require('timers').setImmediate, require('timers').clearImmediate));
      },
      { 'process/browser.js': 10, timers: 11 },
    ],
  },
  {},
  [2],
);
