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
