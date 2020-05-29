getStatsParser.checkAudioTracks = function(result) {
    if (result.mediaType !== 'audio') return;

    var sendrecvType = result.id.split('_').pop();
    if (result.isRemote === true) {
        sendrecvType = 'recv';
    }
    if (result.isRemote === false) {
        sendrecvType = 'send';
    }

    if (!sendrecvType) return;

    if (getStatsResult.audio[sendrecvType].codecs.indexOf(result.googCodecName || 'opus') === -1) {
        getStatsResult.audio[sendrecvType].codecs.push(result.googCodecName || 'opus');
    }

    if (!!result.bytesSent) {
        var kilobytes = 0;
        if (!getStatsResult.internal.audio[sendrecvType].prevBytesSent) {
            getStatsResult.internal.audio[sendrecvType].prevBytesSent = result.bytesSent;
        }

        var bytes = result.bytesSent - getStatsResult.internal.audio[sendrecvType].prevBytesSent;
        getStatsResult.internal.audio[sendrecvType].prevBytesSent = result.bytesSent;

        kilobytes = bytes / 1024;
        getStatsResult.audio[sendrecvType].availableBandwidth = kilobytes.toFixed(1);
        getStatsResult.audio.bytesSent = kilobytes.toFixed(1);
    }

    if (!!result.bytesReceived) {
        var kilobytes = 0;
        if (!getStatsResult.internal.audio[sendrecvType].prevBytesReceived) {
            getStatsResult.internal.audio[sendrecvType].prevBytesReceived = result.bytesReceived;
        }

        var bytes = result.bytesReceived - getStatsResult.internal.audio[sendrecvType].prevBytesReceived;
        getStatsResult.internal.audio[sendrecvType].prevBytesReceived = result.bytesReceived;

        kilobytes = bytes / 1024;

        // getStatsResult.audio[sendrecvType].availableBandwidth = kilobytes.toFixed(1);
        getStatsResult.audio.bytesReceived = kilobytes.toFixed(1);
    }


    if (!!result.packetsReceived) {
        var kilobytes = 0;
        if (!getStatsResult.internal.audio.prevPacketsReceived) {
            getStatsResult.internal.audio.prevPacketsReceived = result.packetsReceived;
        }

        var packetsReceived = result.packetsReceived - getStatsResult.internal.audio.prevPacketsReceived;
        getStatsResult.internal.audio.prevPacketsReceived = result.packetsReceived;

        getStatsResult.audio.packetsReceived = packetsReceived;
    }

    if (!!result.packetsSent) {
        var kilobytes = 0;
        if (!getStatsResult.internal.audio.prevPacketsSent) {
            getStatsResult.internal.audio.prevPacketsSent = result.packetsSent;
        }

        var packetsSent = result.packetsSent - getStatsResult.internal.audio.prevPacketsSent;
        getStatsResult.internal.audio.prevPacketsSent = result.packetsSent;

        getStatsResult.audio.packetsSent = packetsSent;
    }

    if (result.googTrackId && getStatsResult.audio[sendrecvType].tracks.indexOf(result.googTrackId) === -1) {
        getStatsResult.audio[sendrecvType].tracks.push(result.googTrackId);
    }

    // calculate latency
    if (!!result.googCurrentDelayMs) {
        var kilobytes = 0;
        if (!getStatsResult.internal.audio.prevGoogCurrentDelayMs) {
            getStatsResult.internal.audio.prevGoogCurrentDelayMs = result.googCurrentDelayMs;
        }

        var bytes = result.googCurrentDelayMs - getStatsResult.internal.audio.prevGoogCurrentDelayMs;
        getStatsResult.internal.audio.prevGoogCurrentDelayMs = result.googCurrentDelayMs;

        getStatsResult.audio.latency = bytes.toFixed(0);

        if (getStatsResult.audio.latency < 0) {
            getStatsResult.audio.latency = 0;
        }
    }

    // calculate packetsLost
    if (!!result.packetsLost) {
        var kilobytes = 0;
        if (!getStatsResult.internal.audio[sendrecvType].prevPacketsLost) {
            getStatsResult.internal.audio[sendrecvType].prevPacketsLost = result.packetsLost;
        }

        var bytes = result.packetsLost - getStatsResult.internal.audio[sendrecvType].prevPacketsLost;
        getStatsResult.internal.audio[sendrecvType].prevPacketsLost = result.packetsLost;

        getStatsResult.audio[sendrecvType].packetsLost = bytes.toFixed(0);

        if (getStatsResult.audio[sendrecvType].packetsLost < 0) {
            getStatsResult.audio[sendrecvType].packetsLost = 0;
        }
    }
};
