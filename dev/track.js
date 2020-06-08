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
    callStatsResult.video.framesSent = result.framesSent;
  }

  // 收到的帧数
  if (result.framesReceived) {
    callStatsResult.video.framesReceived = result.framesReceived;
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
