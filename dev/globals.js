var RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;

if (typeof MediaStreamTrack === 'undefined') {
    MediaStreamTrack = {}; // todo?
}

var systemNetworkType = ((navigator.connection || {}).type || 'unknown').toString().toLowerCase();

var getStatsResult = {
    encryption: 'sha-256',
    audio: {
        send: {
            tracks: [],
            codecs: [],
            availableBandwidth: 0,
            streams: 0,
            framerateMean: 0,
            bitrateMean: 0,
            packetsLost: 0,
        },
        recv: {
            tracks: [],
            codecs: [],
            availableBandwidth: 0,
            streams: 0,
            framerateMean: 0,
            bitrateMean: 0,
            packetsLost: 0,
        },
        bytesSent: 0,
        bytesReceived: 0,
        latency: 0,
        packetsReceived: 0,
        packetsSent: 0,
    },
    video: {
        send: {
            tracks: [],
            codecs: [],
            availableBandwidth: 0,
            streams: 0,
            framerateMean: 0,
            bitrateMean: 0,
            packetsLost: 0,
        },
        recv: {
            tracks: [],
            codecs: [],
            availableBandwidth: 0,
            streams: 0,
            framerateMean: 0,
            bitrateMean: 0,
            packetsLost: 0,
        },
        bytesSent: 0,
        bytesReceived: 0,
        latency: 0,
        packetsReceived: 0,
        packetsSent: 0,
    },
    bandwidth: {
        systemBandwidth: 0,
        sentPerSecond: 0,
        encodedPerSecond: 0,
        helper: {
            audioBytesSent: 0,
            videoBytestSent: 0,
            audioBytesRecv: 0,
            videoBytesRecv: 0,
        },
        upSpeed: 0,
        downSpeed: 0,
    },
    results: {},
    connectionType: {
        systemNetworkType: systemNetworkType,
        systemIpAddress: '192.168.1.2',
        local: {
            candidateType: [],
            transport: [],
            ipAddress: [],
            networkType: [],
        },
        remote: {
            candidateType: [],
            transport: [],
            ipAddress: [],
            networkType: [],
        },
    },
    resolutions: {
        send: {
            width: 0,
            height: 0,
        },
        recv: {
            width: 0,
            height: 0,
        },
    },
    internal: {
        audio: {
            send: {},
            recv: {},
        },
        video: {
            send: {},
            recv: {},
        },
        candidates: {},
    },
    nomore: function() {
        nomore = true;
    },
};

var getStatsParser = {
    checkIfOfferer: function(result) {
        if (result.type === 'googLibjingleSession') {
            getStatsResult.isOfferer = result.googInitiator;
        }
    },
};

var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
