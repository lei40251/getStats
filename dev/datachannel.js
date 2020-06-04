callStatsParser.datachannel = function(result) {
  if (result.type !== 'peer-connection') return;
  // { id: 'RTCPeerConnection', timestamp: 1590742545181, type: 'peer-connection', dataChannelsOpened: 0, dataChannelsClosed: 0 },

  // datachannel 打开和关闭的数量
  callStatsResult.datachannel = {
    opened: result.dataChannelsOpened,
    closed: result.dataChannelsClosed,
  };
};
