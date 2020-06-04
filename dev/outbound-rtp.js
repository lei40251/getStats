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
