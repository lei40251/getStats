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

    callback(callStatsResult);

    // second argument checks to see, if target-user is still connected.
    if (!nomore) {
      var timer = setTimeout(callStatsLooper, interval ? interval * 1000 : 1000);
    }
  });
}
