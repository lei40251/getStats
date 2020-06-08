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

  // 发送/接收 丢包数量
  if (!!result.packetsLost && result.type === 'remote-inbound-rtp') {
    callStatsResult[mediaType]['send']['packetsLost'] = result.packetsLost;
  } else if (!!result.packetsLost) {
    callStatsResult[mediaType]['recv']['packetsLost'] = result.packetsLost;
  }

  // RTT  默认单位：秒 * 1000
  if (!!result.roundTripTime && result.type === 'remote-inbound-rtp') {
    callStatsResult[mediaType]['roundTripTime'] = result.roundTripTime * 1000;
  }

  // 网络抖动,包括(Audio jitter, Video jitter, all jitter) 默认单位:秒 * 1000
  if (!!result.jitter && result.type === 'remote-inbound-rtp') {
    callStatsResult[mediaType]['send']['jitter'] = result.jitter * 1000;
  } else if (!!result.jitter) {
    callStatsResult[mediaType]['recv']['jitter'] = result.jitter * 1000;
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
