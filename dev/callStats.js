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
      callStatsResult.calculation.audioSendPacketLoss = 0;
    } else {
      callStatsResult.calculation.audioSendPacketLoss = callStatsResult.audio.send.packetsLost / callStatsResult.audio.send.packetsSent;
    }

    if (!callStatsResult.audio.recv.packetsLost) {
      callStatsResult.calculation.audioRecvPacketLoss = 0;
    } else {
      callStatsResult.calculation.audioRecvPacketLoss =
        callStatsResult.audio.recv.packetsLost / (callStatsResult.audio.recv.packetsReceived + callStatsResult.audio.recv.packetsLost);
    }

    // 视频丢包率
    if (!callStatsResult.video.send.packetsLost) {
      callStatsResult.calculation.videoSendPacketLoss = 0;
    } else {
      callStatsResult.calculation.videoSendPacketLoss = callStatsResult.video.send.packetsLost / callStatsResult.video.send.packetsSent;
    }
    if (!callStatsResult.video.recv.packetsLost) {
      callStatsResult.calculation.videoRecvPacketLoss = 0;
    } else {
      callStatsResult.calculation.videoRecvPacketLoss =
        callStatsResult.video.recv.packetsLost / (callStatsResult.video.recv.packetsReceived + callStatsResult.video.recv.packetsLost);
    }

    // 丢包率
    callStatsResult.calculation.sendPacketLoss =
      callStatsResult.calculation.videoSendPacketLoss > callStatsResult.calculation.audioSendPacketLoss ?
      callStatsResult.calculation.videoSendPacketLoss :
      callStatsResult.calculation.audioSendPacketLoss;

    callStatsResult.calculation.recvPacketLoss =
      callStatsResult.calculation.videoRecvPacketLoss > callStatsResult.calculation.audioRecvPacketLoss ?
      callStatsResult.calculation.videoRecvPacketLoss :
      callStatsResult.calculation.audioRecvPacketLoss;

    // 帧率
    callStatsResult.calculation.sendFPS = Math.floor((callStatsResult.video.framesSent - tmpParam.prevFramesSent) / (interval || 1));
    tmpParam.prevFramesSent = callStatsResult.video.framesSent;
    callStatsResult.calculation.recvFPS = Math.floor((callStatsResult.video.framesReceived - tmpParam.prevFramesRecv) / (interval || 1));
    tmpParam.prevFramesRecv = callStatsResult.video.framesReceived;

    callback(callStatsResult);

    // second argument checks to see, if target-user is still connected.
    if (!nomore) {
      var timer = setTimeout(callStatsLooper, interval ? interval * 1000 : 1000);
    }
  });
}
