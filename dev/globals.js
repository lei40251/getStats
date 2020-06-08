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
    roundTripTime: 0,
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
      packetsLost: 0,
      pliCount: 0,
      framesReceived: 0,
      // framesDecoded: 0,
    },
  },
  audio: {
    roundTripTime: 0,
    send: {
      bytesSent: 0,
      jitter: 0,
      packetsSent: 0,
      packetsLost: 0,
    },
    recv: {
      bytesReceived: 0,
      packetsReceived: 0,
      packetsLost: 0,
    },
  },
  calculation: {
    sendPacketLoss: 0,
    audioSendPacketLoss: 0,
    videoSendPacketLoss: 0,
    recvPacketLoss: 0,
    audioRecvPacketLoss: 0,
    videoRecvPacketLoss: 0,
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
