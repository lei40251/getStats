declare module 'callstats' {
  interface CallStatsBandwidth {
    speed: number;
    systemBandwidth: number;
    sentPerSecond: number;
    encodedPerSecond: number;
    helper: {
      audioBytesSent: number;
      videoBytestSent: number;
      videoBytesSent: number;
    };
    availableSendBandwidth: number;
    googActualEncBitrate: number;
    googAvailableSendBandwidth: number;
    googAvailableReceiveBandwidth: number;
    googRetransmitBitrate: number;
    googTargetEncBitrate: number;
    googBucketDelay: number;
    googTransmitBitrate: number;
  }

  interface CallStatsConnectionInfo {
    tracks: string[];
    codecs: string[];
    availableBandwidth: string;
    streams: number;
    framerateMean: number;
    bitrateMean: number;
  }

  interface CallStatsConnectionStream {
    send: CallStatsConnectionInfo;
    recv: CallStatsConnectionInfo;
    bytesSent: number;
    bytesReceived: number;
    latency: number;
    packetsLost: number;
  }

  interface CallStatsNetworkInfo {
    candidateType: string[];
    transport: string[];
    ipAddress: string[];
    networkType: string[];
  }

  interface CallStatsConnectionType {
    systemNetworkType: string;
    systemIpAddress: string[];
    local: CallStatsNetworkInfo;
    remote: CallStatsNetworkInfo;
    transport: string;
  }

  interface CallStatsResolution {
    width: string;
    height: string;
  }

  interface CallStatsResolutions {
    send: CallStatsResolution;
    recv: CallStatsResolution;
  }

  export interface CallStatsResult {
    datachannel: {
      state: 'open' | 'close';
    };
    isOfferer: boolean;
    encryption: string;
    bandwidth: CallStatsBandwidth;
    audio: CallStatsConnectionStream;
    video: CallStatsConnectionStream;
    connectionType: CallStatsConnectionType;
    resolutions: CallStatsResolutions;
    results: any[];

    nomore: () => void;
  }

  export default function callstats(rtc: RTCPeerConnection, callback: (result: CallStatsResult) => void, interval?: number): void;
}
