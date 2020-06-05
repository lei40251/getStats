'use strict';

// callStats v1.2.0
// Last time updated: 2020-06-05 5:00:46 AM UTC

var callStats = function(mediaStreamTrack, callback, interval) {

  var browserFakeUserAgent = 'Fake/5.0 (FakeOS) AppleWebKit/123 (KHTML, like Gecko) Fake/12.3.4567.89 Fake/123.45';

  (function(that) {
    if (!that) {
      return;
    }

    if (typeof window !== 'undefined') {
      return;
    }

    if (typeof global === 'undefined') {
      return;
    }

    global.navigator = {
      userAgent: browserFakeUserAgent,
      getUserMedia: function() {},
    };

    if (!global.console) {
      global.console = {};
    }

    if (typeof global.console.log === 'undefined' || typeof global.console.error === 'undefined') {
      global.console.error = global.console.log =
        global.console.log ||
        function() {
          console.log(arguments);
        };
    }

    if (typeof document === 'undefined') {
      /*global document:true */
      that.document = {
        documentElement: {
          appendChild: function() {
            return '';
          },
        },
      };

      document.createElement = document.captureStream = document.mozCaptureStream = function() {
        var obj = {
          getContext: function() {
            return obj;
          },
          play: function() {},
          pause: function() {},
          drawImage: function() {},
          toDataURL: function() {
            return '';
          },
        };
        return obj;
      };

      that.HTMLVideoElement = function() {};
    }

    if (typeof location === 'undefined') {
      /*global location:true */
      that.location = {
        protocol: 'file:',
        href: '',
        hash: '',
      };
    }

    if (typeof screen === 'undefined') {
      /*global screen:true */
      that.screen = {
        width: 0,
        height: 0,
      };
    }

    if (typeof URL === 'undefined') {
      /*global screen:true */
      that.URL = {
        createObjectURL: function() {
          return '';
        },
        revokeObjectURL: function() {
          return '';
        },
      };
    }

    if (typeof MediaStreamTrack === 'undefined') {
      /*global screen:true */
      that.MediaStreamTrack = function() {};
    }

    if (typeof RTCPeerConnection === 'undefined') {
      /*global screen:true */
      that.RTCPeerConnection = function() {};
    }

    /*global window:true */
    that.window = global;
  })(typeof global !== 'undefined' ? global : null);

  var RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;

  if (typeof MediaStreamTrack === 'undefined') {
    MediaStreamTrack = {}; // todo?
  }

  var systemNetworkType = ((navigator.connection || {}).type || 'unknown').toString().toLowerCase();

  var tmpParam = {
    prevAudioBytesSent: 0,
    prevVideoBytesSent: 0,
    prevAudioBytesRecv: 0,
    prevVideoBytesRecv: 0,
    prevAudioPacketsSent: 0,
    prevVideoPacketsSent: 0,
    prevAudioPacketsLost: 0,
    prevVideoPacketsLost: 0,
    prevFramesSent: 0,
  };

  var callStatsResult = {
    bandwidth: {
      uploadSpeed: 0,
      downloadSpeed: 0,
    },
    video: {
      send: {
        bytesSent: 0,
        width: null,
        height: null,
        jitter: 0,
        packetsSent: 0,
        packetsLost: 0,
        totalPacketSendDelay: 0,
        qualityLimitationReason: null,
        framesSent: 0,
        // framesEncoded: 0,
      },
      recv: {
        bytesReceived: 0,
        height: null,
        width: null,
        packetsReceived: 0,
        pliCount: 0,
        framesReceived: 0,
        // framesDecoded: 0,
      },
    },
    audio: {
      send: {
        bytesSent: 0,
        jitter: 0,
        packetsSent: 0,
        packetsLost: 0,
      },
      recv: {
        bytesReceived: 0,
        packetsReceived: 0,
      },
    },
    calculation: {
      packetLoss: 0,
      audioPacketLoss: 0,
      videoPacketLoss: 0,
      FPS: 0,
    },
    encryption: null,
    datachannel: {
      opened: 0,
      closed: 0,
    },
    results: [],
  };

  var callStatsParser = {};

  var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  // toFixed兼容方法, 来源网络
  Number.prototype.toFixed = function(len) {
    if (len > 20 || len < 0) {
      throw new RangeError('toFixed() digits argument must be between 0 and 20');
    }
    // .123转为0.123
    var number = Number(this);
    if (isNaN(number) || number >= Math.pow(10, 21)) {
      return number.toString();
    }
    if (typeof len == 'undefined' || len == 0) {
      return Math.round(number).toString();
    }
    var result = number.toString(),
      numberArr = result.split('.');

    if (numberArr.length < 2) {
      //整数的情况
      return padNum(result);
    }
    var intNum = numberArr[0], //整数部分
      deciNum = numberArr[1], //小数部分
      lastNum = deciNum.substr(len, 1); //最后一个数字

    if (deciNum.length == len) {
      //需要截取的长度等于当前长度
      return result;
    }
    if (deciNum.length < len) {
      //需要截取的长度大于当前长度 1.3.toFixed(2)
      return padNum(result);
    }
    //需要截取的长度小于当前长度，需要判断最后一位数字
    result = intNum + '.' + deciNum.substr(0, len);
    if (parseInt(lastNum, 10) >= 5) {
      //最后一位数字大于5，要进位
      var times = Math.pow(10, len); //需要放大的倍数
      var changedInt = Number(result.replace('.', '')); //截取后转为整数
      changedInt++; //整数进位
      changedInt /= times; //整数转为小数，注：有可能还是整数
      result = padNum(changedInt + '');
    }
    return result;
    //对数字末尾加0
    function padNum(num) {
      var dotPos = num.indexOf('.');
      if (dotPos === -1) {
        //整数的情况
        num += '.';
        for (var i = 0; i < len; i++) {
          num += '0';
        }
        return num;
      } else {
        //小数的情况
        var need = len - (num.length - dotPos - 1);
        for (var j = 0; j < need; j++) {
          num += '0';
        }
        return num;
      }
    }
  };

  var peer = this;

  if (!(arguments[0] instanceof RTCPeerConnection)) {
    throw '1st argument is not instance of RTCPeerConnection.';
  }

  peer = arguments[0];

  // if (arguments[1] instanceof MediaStreamTrack) {
  //   mediaStreamTrack = arguments[1]; // redundant on non-safari
  //   callback = arguments[2];
  //   interval = arguments[3];
  // }

  var nomore = false;

  function callStatsLooper() {
    callStatsWrapper(function(results) {
      if (!results || !results.forEach) return;

      results.forEach(function(result) {
        // console.error('result', result);
        Object.keys(callStatsParser).forEach(function(key) {
          if (typeof callStatsParser[key] === 'function') {
            try {
              callStatsParser[key](result);
            } catch (e) {
              console.error(e.message, e.stack, e);
            }
          }
        });
      });

      try {
        if (peer.iceConnectionState.search(/failed|closed|disconnected/gi) !== -1) {
          nomore = true;
        }
      } catch (e) {
        nomore = true;
      }

      if (nomore === true) {
        if (callStatsResult.datachannel) {
          callStatsResult.datachannel.state = 'close';
        }
        callStatsResult.ended = true;
      }

      // allow users to access native results
      results.forEach(function(result) {
        callStatsResult.results.push(result);
      });

      // 处理需要计算才能得到的数据
      // 如:丢包率, 上传速度, 下载速度等

      // 上传字节数
      var uploadBytes = callStatsResult.audio.send.bytesSent + callStatsResult.video.send.bytesSent - tmpParam.audioBytesSent - tmpParam.videoBytesSent;
      tmpParam.audioBytesSent = callStatsResult.audio.send.bytesSent;
      tmpParam.videoBytesSent = callStatsResult.video.send.bytesSent;

      // 下载字节数
      var downloadBytes =
        callStatsResult.audio.recv.bytesReceived + callStatsResult.video.recv.bytesReceived - tmpParam.audioBytesRecv - tmpParam.videoBytesRecv;
      tmpParam.audioBytesRecv = callStatsResult.audio.recv.bytesReceived;
      tmpParam.videoBytesRecv = callStatsResult.video.recv.bytesReceived;

      //  上传/下载 速率 BytesPerSecond
      callStatsResult.bandwidth.uploadSpeed = uploadBytes !== 0 ? uploadBytes / (interval || 1) : 0;
      callStatsResult.bandwidth.downloadSpeed = downloadBytes !== 0 ? downloadBytes / (interval || 1) : 0;

      // 本地发送(对方收到)的丢包率

      // 音频丢包率
      if (!callStatsResult.audio.send.packetsLost) {
        callStatsResult.calculation.audioPacketLoss = 0;
      } else {
        callStatsResult.calculation.audioPacketLoss = callStatsResult.audio.send.packetsLost / callStatsResult.audio.send.packetsSent;
      }

      // 视频丢包率
      if (!callStatsResult.video.send.packetsLost) {
        callStatsResult.calculation.videoPacketLoss = 0;
      } else {
        callStatsResult.calculation.videoPacketLoss = callStatsResult.video.send.packetsLost / callStatsResult.video.send.packetsSent;
      }

      // 丢包率
      callStatsResult.calculation.packetLoss =
        callStatsResult.calculation.videoPacketLoss > callStatsResult.calculation.audiooPacketLoss ?
        callStatsResult.calculation.videoPacketLoss :
        callStatsResult.calculation.audioPacketLoss;

      // 帧率
      callStatsResult.calculation.FPS = Math.floor((callStatsResult.video.send.framesSent - tmpParam.prevFramesSent) / (interval || 1));
      tmpParam.prevFramesSent = callStatsResult.video.send.framesSent;

      callback(callStatsResult);

      // second argument checks to see, if target-user is still connected.
      if (!nomore) {
        var timer = setTimeout(callStatsLooper, interval ? interval * 1000 : 1000);
      }
    });
  }

  // a wrapper around getStats which hides the differences (where possible)
  // following code-snippet is taken from somewhere on the github
  function callStatsWrapper(cb) {
    // if !peer or peer.signalingState == 'closed' then return;

    peer.getStats(null).then(function(stats) {
      cb(stats);
    });
  }

  callStatsParser.datachannel = function(result) {
    if (result.type !== 'peer-connection') return;
    // { id: 'RTCPeerConnection', timestamp: 1590742545181, type: 'peer-connection', dataChannelsOpened: 0, dataChannelsClosed: 0 },

    // datachannel 打开和关闭的数量
    callStatsResult.datachannel = {
      opened: result.dataChannelsOpened,
      closed: result.dataChannelsClosed,
    };
  };

  callStatsParser.certificate = function(result) {
    if (result.type !== 'certificate') return;

    if (result.type == 'certificate') {
      // todo: is it possible to have different encryption methods for senders and receivers?
      // if yes, then we need to set:
      //    callStatsResult.encryption.local = value;
      //    callStatsResult.encryption.remote = value;

      // 发送接收使用的加密方法
      callStatsResult.encryption = result.fingerprintAlgorithm;
    }
  };

  callStatsParser.inboundrtp = function(result) {
    if (result.type !== 'inbound-rtp' && result.type !== 'remote-inbound-rtp') return;

    var mediaType = result.mediaType || result.kind || 'audio';

    // 媒体编码
    if (!!result.codecId) {
      tmpParam['inbound-codecId-' + mediaType] = result.codecId;
    }

    // 收到数据包数量
    if (!!result.packetsReceived) {
      callStatsResult[mediaType]['recv']['packetsReceived'] = result.packetsReceived;
    }

    // 丢包数量数量
    if (!!result.packetsLost && result.type === 'remote-inbound-rtp') {
      callStatsResult[mediaType]['send']['packetsLost'] = result.packetsLost;
    }

    // 网络抖动,包括(Audio jitter, Video jitter, all jitter) 默认单位:秒
    if (!!result.jitter && result.type === 'remote-inbound-rtp') {
      callStatsResult[mediaType]['send']['jitter'] = result.jitter * 1000;
    }

    // 收到字节数
    if (!!result.bytesReceived) {
      callStatsResult[mediaType]['recv']['bytesReceived'] = result.bytesReceived;
    }

    /**
     * Full Intra Request (FIR)
     * 接收端已向发送者发送的完整帧内请求（FIR）数据包的数量
     * 这是衡量流落后多久并必须跳过帧以追赶的频率的一种度量
     */
    if (!!result.firCount) {
      callStatsResult[mediaType]['recv']['firCount'] = result.firCount;
    }

    /**
     * Picture Loss Indication (PLI)
     * 接收端向发送方发送图片丢失指示（PLI）数据包的次数
     * PLI数据包表示已丢失一帧或多帧的一些已编码视频数据
     */
    if (!!result.pliCount) {
      callStatsResult[mediaType]['recv']['pliCount'] = result.pliCount;
    }

    /**
     * Negative ACKnowledgement，也称为“Generic NACK”
     * 接收端向发送方发送NACK数据包的次数
     * 接收端告诉发送方它发送的一个或多个RTP数据包在传输中丢失
     */
    if (!!result.nackCount) {
      callStatsResult[mediaType]['recv']['nackCount'] = result.nackCount;
    }

    // // 已成功解码的帧数
    // if (!!result.framesDecoded) {
    //   callStatsResult[mediaType]['recv']['framesDecoded'] = result.framesDecoded;
    // }
  };

  callStatsParser.outboundrtp = function(result) {
    if (result.type !== 'outbound-rtp') return;

    var mediaType = result.mediaType || 'audio';

    // 媒体编码
    if (!!result.codecId) {
      tmpParam['outbound-codecId-' + mediaType] = result.codecId;
    }

    // 发出的数据包数量
    if (!!result.packetsSent) {
      callStatsResult[mediaType]['send']['packetsSent'] = result.packetsSent;
    }

    // 重传的数据包数量
    if (!!result.retransmittedPacketsSent) {
      callStatsResult[mediaType]['send']['retransmittedPacketsSent'] = result.retransmittedPacketsSent;
    }

    // 数据包发送总延迟
    if (!!result.totalPacketSendDelay) {
      callStatsResult[mediaType]['send']['totalPacketSendDelay'] = result.totalPacketSendDelay;
    }

    // 网络抖动,包括(Audio jitter, Video jitter, all jitter)
    if (!!result.jitter && result.type === 'remote-inbound-rtp') {
      callStatsResult[mediaType]['send']['jitter'] = result.jitter;
    } else if (!!result.jitter && result.type === 'inbound-rtp') {
      callStatsResult['jitter'] = result.jitter;
    }

    // 发出的字节数
    if (!!result.bytesSent) {
      callStatsResult[mediaType]['send']['bytesSent'] = result.bytesSent;
    }

    /**
     * Full Intra Request (FIR)
     * 接收端已向发送者发送的完整帧内请求（FIR）数据包的数量
     * 这是衡量流落后多久并必须跳过帧以追赶的频率的一种度量
     */
    if (!!result.firCount) {
      callStatsResult[mediaType]['send']['firCount'] = result.firCount;
    }

    /**
     * Picture Loss Indication (PLI)
     * 接收端向发送方发送图片丢失指示（PLI）数据包的次数
     * PLI数据包表示已丢失一帧或多帧的一些已编码视频数据
     */
    if (!!result.pliCount) {
      callStatsResult[mediaType]['send']['pliCount'] = result.pliCount;
    }

    /**
     * Negative ACKnowledgement，也称为“Generic NACK”
     * 接收端向发送方发送NACK数据包的次数
     * 接收端告诉发送方它发送的一个或多个RTP数据包在传输中丢失
     */
    if (!!result.nackCount) {
      callStatsResult[mediaType]['send']['nackCount'] = result.nackCount;
    }

    // // 已成功编码的帧数
    // if (!!result.framesEncoded) {
    //   callStatsResult[mediaType]['send']['framesEncoded'] = result.framesEncoded;
    // }

    // 降低视频质量的原因 (none, cpu, bandwidth, other)
    if (!!result.qualityLimitationReason) {
      callStatsResult[mediaType]['send']['qualityLimitationReason'] = result.qualityLimitationReason;
    }
  };

  callStatsParser.track = function(result) {
    if (result.type !== 'track') return;

    var sendrecvType = result.remoteSource === true ? 'recv' : 'send';

    // 发送接收视频的分辨率
    if (!!result.frameWidth && !!result.frameHeight) {
      callStatsResult.video[sendrecvType].width = result.frameWidth;
      callStatsResult.video[sendrecvType].height = result.frameHeight;
    }

    // 发送的帧数
    if (!!result.framesSent) {
      callStatsResult.video[sendrecvType].framesSent = result.framesSent;
    }

    // 收到的帧数
    if (result.framesReceived) {
      callStatsResult.video[sendrecvType].framesReceived = result.framesReceived;
    }

    // // 解码的帧数
    // if (result.framesDecoded) {
    //   callStatsResult.video[sendrecvType].framesDecoded = result.framesDecoded;
    // }

    // 丢弃的帧数
    if (result.framesDropped) {
      callStatsResult.video[sendrecvType].framesDropped = result.framesDropped;
    }
  };

  callStatsLooper();

};

if (typeof module !== 'undefined' /* && !!module.exports*/ ) {
  module.exports = callStats;
}

if (typeof define === 'function' && define.amd) {
  define('callStats', [], function() {
    return callStats;
  });
}
