callStatsParser.checkAudioTracks = function(result) {
  if (result.type !== 'codec') return;

  var mediaType = result.mimeType.split('/')[0];

  //   if()

  var sendrecvType = result.mimeType.split('_').pop();
  if (result.isRemote === true) {
    sendrecvType = 'recv';
  }
  if (result.isRemote === false) {
    sendrecvType = 'send';
  }

  if (!sendrecvType) return;

  if (callStatsResult.audio[sendrecvType].codecs.indexOf(result.googCodecName || 'opus') === -1) {
    callStatsResult.audio[sendrecvType].codecs.push(result.googCodecName || 'opus');
  }

  if (!!result.bytesSent) {
    var kilobytes = 0;
    if (!callStatsResult.internal.audio[sendrecvType].prevBytesSent) {
      callStatsResult.internal.audio[sendrecvType].prevBytesSent = result.bytesSent;
    }

    var bytes = result.bytesSent - callStatsResult.internal.audio[sendrecvType].prevBytesSent;
    callStatsResult.internal.audio[sendrecvType].prevBytesSent = result.bytesSent;

    kilobytes = bytes / 1024;
    callStatsResult.audio[sendrecvType].availableBandwidth = kilobytes.toFixed(1);
    callStatsResult.audio.bytesSent = kilobytes.toFixed(1);
  }

  if (!!result.bytesReceived) {
    var kilobytes = 0;
    if (!callStatsResult.internal.audio[sendrecvType].prevBytesReceived) {
      callStatsResult.internal.audio[sendrecvType].prevBytesReceived = result.bytesReceived;
    }

    var bytes = result.bytesReceived - callStatsResult.internal.audio[sendrecvType].prevBytesReceived;
    callStatsResult.internal.audio[sendrecvType].prevBytesReceived = result.bytesReceived;

    kilobytes = bytes / 1024;

    // callStatsResult.audio[sendrecvType].availableBandwidth = kilobytes.toFixed(1);
    callStatsResult.audio.bytesReceived = kilobytes.toFixed(1);
  }

  if (!!result.packetsReceived) {
    var kilobytes = 0;
    if (!callStatsResult.internal.audio.prevPacketsReceived) {
      callStatsResult.internal.audio.prevPacketsReceived = result.packetsReceived;
    }

    var packetsReceived = result.packetsReceived - callStatsResult.internal.audio.prevPacketsReceived;
    callStatsResult.internal.audio.prevPacketsReceived = result.packetsReceived;

    callStatsResult.audio.packetsReceived = packetsReceived;
  }

  if (!!result.packetsSent) {
    var kilobytes = 0;
    if (!callStatsResult.internal.audio.prevPacketsSent) {
      callStatsResult.internal.audio.prevPacketsSent = result.packetsSent;
    }

    var packetsSent = result.packetsSent - callStatsResult.internal.audio.prevPacketsSent;
    callStatsResult.internal.audio.prevPacketsSent = result.packetsSent;

    callStatsResult.audio.packetsSent = packetsSent;
  }

  if (result.googTrackId && callStatsResult.audio[sendrecvType].tracks.indexOf(result.googTrackId) === -1) {
    callStatsResult.audio[sendrecvType].tracks.push(result.googTrackId);
  }

  // calculate latency
  if (!!result.googCurrentDelayMs) {
    var kilobytes = 0;
    if (!callStatsResult.internal.audio.prevGoogCurrentDelayMs) {
      callStatsResult.internal.audio.prevGoogCurrentDelayMs = result.googCurrentDelayMs;
    }

    var bytes = result.googCurrentDelayMs - callStatsResult.internal.audio.prevGoogCurrentDelayMs;
    callStatsResult.internal.audio.prevGoogCurrentDelayMs = result.googCurrentDelayMs;

    callStatsResult.audio.latency = bytes.toFixed(0);

    if (callStatsResult.audio.latency < 0) {
      callStatsResult.audio.latency = 0;
    }
  }

  // calculate packetsLost
  if (!!result.packetsLost) {
    var kilobytes = 0;
    if (!callStatsResult.internal.audio[sendrecvType].prevPacketsLost) {
      callStatsResult.internal.audio[sendrecvType].prevPacketsLost = result.packetsLost;
    }

    var bytes = result.packetsLost - callStatsResult.internal.audio[sendrecvType].prevPacketsLost;
    callStatsResult.internal.audio[sendrecvType].prevPacketsLost = result.packetsLost;

    callStatsResult.audio[sendrecvType].packetsLost = bytes.toFixed(0);

    if (callStatsResult.audio[sendrecvType].packetsLost < 0) {
      callStatsResult.audio[sendrecvType].packetsLost = 0;
    }
  }
};
