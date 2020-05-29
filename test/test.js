var iceTransportPolicy = document.getElementById('select-iceTransportPolicy');
if (localStorage.getItem('iceTransportPolicy')) {
  iceTransportPolicy.value = localStorage.getItem('iceTransportPolicy');
}
iceTransportPolicy.onchange = function () {
  localStorage.setItem('iceTransportPolicy', this.value);
  location.reload();
};

var iceTransportLimitation = document.getElementById('select-iceTransportLimitation');
if (localStorage.getItem('iceTransportLimitation')) {
  iceTransportLimitation.value = localStorage.getItem('iceTransportLimitation');
}
iceTransportLimitation.onchange = function () {
  localStorage.setItem('iceTransportLimitation', this.value);
  location.reload();
};

var codec = document.getElementById('select-codec');
if (localStorage.getItem('codec')) {
  codec.value = localStorage.getItem('codec');
}
codec.onchange = function () {
  localStorage.setItem('codec', this.value);
  location.reload();
};

function addIceCandidate(peer, candidate) {
  if (iceTransportLimitation.value === 'tcp') {
    if (candidate.candidate.toLowerCase().indexOf('tcp') === -1) {
      return; // ignore UDP
    }
  }

  if (iceTransportLimitation.value === 'udp') {
    if (candidate.candidate.toLowerCase().indexOf('udp') === -1) {
      return; // ignore UDP
    }
  }

  peer.addIceCandidate(candidate);
}
var offerer, answerer;
var offererToAnswerer = document.getElementById('peer1-to-peer2');
var answererToOfferer = document.getElementById('peer2-to-peer1');

/* video to peer */
var leftVideo = document.getElementById('leftVideo');
var stream;
function maybeCreateStream() {
  if (stream) {
    return;
  }
  if (leftVideo.captureStream) {
    stream = leftVideo.captureStream();
  } else if (leftVideo.mozCaptureStream) {
    stream = leftVideo.mozCaptureStream();
  } else {
    console.log('captureStream() not supported');
  }
}

// Video tag capture must be set up after video tracks are enumerated.
leftVideo.oncanplay = maybeCreateStream;
if (leftVideo.readyState >= 3) {
  // HAVE_FUTURE_DATA
  // Video is already ready to play, call maybeCreateStream in case oncanplay
  // fired before we registered the event handler.
  maybeCreateStream();
}

/* end video to peer */

var iceServers = {
  iceServers: IceServersHandler.getIceServers(),
  iceTransportPolicy: iceTransportPolicy.value,
  rtcpMuxPolicy: 'require',
  bundlePolicy: 'max-bundle',
};

var mediaConstraints = {
  OfferToReceiveAudio: true,
  OfferToReceiveVideo: true,
};
/* offerer */

function offererPeer(video_stream) {
  offerer = new RTCPeerConnection(iceServers);
  offerer.idx = 1;

  video_stream.getTracks().forEach(function (track) {
    offerer.addTrack(track, video_stream);
  });

  var firedOnce = false;
  offerer.ontrack = function (event) {
    if (firedOnce) return;
    firedOnce = true;

    offererToAnswerer.srcObject = event.streams[0];

    window.setInterval(function () {
      var rt=[]
      offerer.getStats(null).then((stats) => {
        let statsOutput = '';

        stats.forEach((report) => {
          rt.push(report)
          // statsOutput +=
          //   `<h2>Report: ${report.type}</h3>\n<strong>ID:</strong> ${report.id}<br>\n` + `<strong>Timestamp:</strong> ${report.timestamp}<br>\n`;

          // // Now the statistics for this report; we intentially drop the ones we
          // // sorted to the top above

          // Object.keys(report).forEach((statName) => {
          //   if (statName !== 'id' && statName !== 'timestamp' && statName !== 'type') {
          //     statsOutput[statName] = report[statName];
          //   }
          // });
        });

        console.log(rt)
        // document.querySelector(".stats-box").innerHTML = statsOutput;
        // console.log(statsOutput);
      });
    }, 1000);

    // if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
    //   getStats(
    //     offerer,
    //     event.streams[0].getTracks()[1],
    //     function (result) {
    //       previewGetStatsResult(offerer, result);
    //     },
    //     1000,
    //   );
    //   return;
    // }

    // getStats(
    //   offerer,
    //   function (result) {
    //     previewGetStatsResult(offerer, result);
    //   },
    //   1000,
    // );
  };

  offerer.onicecandidate = function (event) {
    if (!event || !event.candidate) return;
    addIceCandidate(answerer, event.candidate);
  };

  offerer.createOffer(mediaConstraints).then(function (offer) {
    offer.sdp = preferSelectedCodec(offer.sdp);
    offerer.setLocalDescription(offer).then(function () {
      answererPeer(offer, stream);
    });
  });
}
/* answerer */

function answererPeer(offer, video_stream) {
  answerer = new RTCPeerConnection(iceServers);
  answerer.idx = 2;

  video_stream.getTracks().forEach(function (track) {
    answerer.addTrack(track, video_stream);
  });

  var firedOnce = false;
  answerer.ontrack = function (event) {
    if (firedOnce) return;
    firedOnce = true;

    answererToOfferer.srcObject = event.streams[0];

    if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
      getStats(
        answerer,
        event.streams[0].getTracks()[1],
        function (result) {
          previewGetStatsResult(answerer, result);
        },
        1000,
      );
      return;
    }

    getStats(
      answerer,
      function (result) {
        previewGetStatsResult(answerer, result);
      },
      1000,
    );
  };

  answerer.onicecandidate = function (event) {
    if (!event || !event.candidate) return;
    addIceCandidate(offerer, event.candidate);
  };

  answerer.setRemoteDescription(offer).then(function () {
    answerer.createAnswer(mediaConstraints).then(function (answer) {
      answer.sdp = preferSelectedCodec(answer.sdp);
      answerer.setLocalDescription(answer).then(function () {
        offerer.setRemoteDescription(answer);
      });
    });
  });
}
var video_constraints = {
  mandatory: {},
  optional: [],
};

function getUserMedia(successCallback) {
  function errorCallback(e) {
    alert(JSON.stringify(e, null, '\t'));
  }

  var mediaConstraints = { video: true, audio: true };

  navigator.mediaDevices.getUserMedia(mediaConstraints).then(successCallback).catch(errorCallback);
}
var CAMERA_STREAM;
getUserMedia(function (video_stream) {
  CAMERA_STREAM = video_stream;
  offererPeer(video_stream);

  document.getElementById('btn-stop').disabled = false;
});
var STOP_GETSTATS = false;
document.getElementById('btn-stop').onclick = function () {
  this.disabled = true;
  STOP_GETSTATS = true;

  if (CAMERA_STREAM && CAMERA_STREAM.active === true) {
    CAMERA_STREAM.getTracks().forEach(function (track) {
      track.stop();
    });
  }
};

function previewGetStatsResult(peer, result) {
  // console.log(result);
  if (STOP_GETSTATS) {
    result.nomore();
    return;
  }

  if (result.connectionType.remote.candidateType.indexOf('relayed') !== -1) {
    result.connectionType.remote.candidateType = 'TURN';
  } else {
    result.connectionType.remote.candidateType = 'STUN';
  }

  document.getElementById('peer' + peer.idx + '-remoteIceType').innerHTML = result.connectionType.remote.candidateType;
  document.getElementById('peer' + peer.idx + '-externalIPAddressRemote').innerHTML = result.connectionType.remote.ipAddress.join(', ');
  document.getElementById('peer' + peer.idx + '-remoteTransport').innerHTML = result.connectionType.remote.transport.join(', ');

  if (result.connectionType.local.candidateType.indexOf('relayed') !== -1) {
    result.connectionType.local.candidateType = 'TURN';
  } else {
    result.connectionType.local.candidateType = 'STUN';
  }
  document.getElementById('peer' + peer.idx + '-localIceType').innerHTML = result.connectionType.local.candidateType;
  document.getElementById('peer' + peer.idx + '-externalIPAddressLocal').innerHTML = result.connectionType.local.ipAddress.join(', ');
  document.getElementById('peer' + peer.idx + '-localTransport').innerHTML = result.connectionType.local.transport.join(', ');

  document.getElementById('peer' + peer.idx + '-encryptedAs').innerHTML = result.encryption;

  document.getElementById('peer' + peer.idx + '-videoResolutionsForSenders').innerHTML =
    result.resolutions.send.width + 'x' + result.resolutions.send.height;
  document.getElementById('peer' + peer.idx + '-videoResolutionsForReceivers').innerHTML =
    result.resolutions.recv.width + 'x' + result.resolutions.recv.height;

  document.getElementById('peer' + peer.idx + '-totalDataForSenders').innerHTML = bytesToSize(result.audio.bytesSent + result.video.bytesSent);
  document.getElementById('peer' + peer.idx + '-totalDataForReceivers').innerHTML = bytesToSize(
    result.audio.bytesReceived + result.video.bytesReceived,
  );

  document.getElementById('peer' + peer.idx + '-codecsSend').innerHTML = result.audio.send.codecs.concat(result.video.send.codecs).join(', ');
  document.getElementById('peer' + peer.idx + '-codecsRecv').innerHTML = result.audio.recv.codecs.concat(result.video.recv.codecs).join(', ');

  document.getElementById('peer' + peer.idx + '-bandwidthUpSpeed').innerHTML = bytesToSize(result.bandwidth.upSpeed);
  document.getElementById('peer' + peer.idx + '-bandwidthDownSpeed').innerHTML = bytesToSize(result.bandwidth.downSpeed);

  document.getElementById('peer' + peer.idx + '-framerateMean').innerHTML = bytesToSize(result.video.send.framerateMean);
  document.getElementById('peer' + peer.idx + '-bitrateMean').innerHTML = bytesToSize(result.video.send.bitrateMean);

  document.getElementById('peer' + peer.idx + '-audio-latency').innerHTML = result.audio.latency + 'ms';
  document.getElementById('peer' + peer.idx + '-video-latency').innerHTML = result.video.latency + 'ms';

  document.getElementById('peer' + peer.idx + '-audio-send-packetLossRate').innerHTML =
    +result.audio.send.packetsLost > 0 ? ((+result.audio.send.packetsLost / +result.audio.packetsSent) * 100).toFixed(1) + '%' : 0;
  document.getElementById('peer' + peer.idx + '-audio-recv-packetLossRate').innerHTML =
    +result.audio.recv.packetsLost > 0 ? ((+result.audio.recv.packetsLost / +result.audio.packetsReceived) * 100).toFixed(1) + '%' : 0;

  document.getElementById('peer' + peer.idx + '-video-send-packetLossRate').innerHTML =
    +result.video.send.packetsLost > 0 ? ((+result.video.send.packetsLost / +result.video.packetsSent) * 100).toFixed(1) + '%' : 0;
  document.getElementById('peer' + peer.idx + '-video-recv-packetLossRate').innerHTML =
    +result.video.recv.packetsLost > 0 ? ((+result.video.recv.packetsLost / +result.video.packetsReceived) * 100).toFixed(1) + '%' : 0;

  document.getElementById('peer' + peer.idx + '-audio-send-packetsLost').innerHTML = result.audio.send.packetsLost;
  document.getElementById('peer' + peer.idx + '-audio-recv-packetsLost').innerHTML = result.audio.recv.packetsLost;

  document.getElementById('peer' + peer.idx + '-video-send-packetsLost').innerHTML = result.video.send.packetsLost;
  document.getElementById('peer' + peer.idx + '-video-recv-packetsLost').innerHTML = result.video.recv.packetsLost;

  document.getElementById('peer' + peer.idx + '-video-packetsSent').innerHTML = result.video.packetsSent;
  document.getElementById('peer' + peer.idx + '-audio-packetsSent').innerHTML = result.audio.packetsSent;

  document.getElementById('peer' + peer.idx + '-video-packetsReceived').innerHTML = result.video.packetsReceived;
  document.getElementById('peer' + peer.idx + '-audio-packetsReceived').innerHTML = result.audio.packetsReceived;

  if (result.ended === true) {
    result.nomore();
  }

  window.getStatsResult = result;
}

if (typeof window.InstallTrigger !== 'undefined') {
  var all = document.querySelectorAll('.firefox-allowed');
  for (var i = 0; i < all.length; i++) {
    all[i].style.display = 'table-row';
  }

  var all = document.querySelectorAll('.firefox-not-allowed');
  for (var i = 0; i < all.length; i++) {
    all[i].style.display = 'none';
  }
} else {
  var all = document.querySelectorAll('.chrome-allowed');
  for (var i = 0; i < all.length; i++) {
    all[i].style.display = 'table-row';
  }

  var all = document.querySelectorAll('.chrome-not-allowed');
  for (var i = 0; i < all.length; i++) {
    all[i].style.display = 'none';
  }
}

function bytesToSize(bytes) {
  var k = 1000;
  var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes <= 0) {
    return '0 Bytes';
  }
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(k)), 10);

  if (!sizes[i]) {
    return '0 Bytes';
  }

  return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
}

function preferSelectedCodec(sdp) {
  var info = splitLines(sdp);

  if (codec.value === 'vp8' && info.vp8LineNumber === info.videoCodecNumbers[0]) {
    return sdp;
  }

  if (codec.value === 'vp9' && info.vp9LineNumber === info.videoCodecNumbers[0]) {
    return sdp;
  }

  if (codec.value === 'h264' && info.h264LineNumber === info.videoCodecNumbers[0]) {
    return sdp;
  }

  sdp = preferCodec(sdp, codec.value, info);

  return sdp;
}

function preferCodec(sdp, codec, info) {
  var preferCodecNumber = '';

  if (codec === 'vp8') {
    if (!info.vp8LineNumber) {
      return sdp;
    }
    preferCodecNumber = info.vp8LineNumber;
  }

  if (codec === 'vp9') {
    if (!info.vp9LineNumber) {
      return sdp;
    }
    preferCodecNumber = info.vp9LineNumber;
  }

  if (codec === 'h264') {
    if (!info.h264LineNumber) {
      return sdp;
    }

    preferCodecNumber = info.h264LineNumber;
  }

  var newLine = info.videoCodecNumbersOriginal.split('SAVPF')[0] + 'SAVPF ';

  var newOrder = [preferCodecNumber];
  info.videoCodecNumbers.forEach(function (codecNumber) {
    if (codecNumber === preferCodecNumber) return;
    newOrder.push(codecNumber);
  });

  newLine += newOrder.join(' ');

  sdp = sdp.replace(info.videoCodecNumbersOriginal, newLine);
  return sdp;
}

function splitLines(sdp) {
  var info = {};
  sdp.split('\n').forEach(function (line) {
    if (line.indexOf('m=video') === 0) {
      info.videoCodecNumbers = [];
      line
        .split('SAVPF')[1]
        .split(' ')
        .forEach(function (codecNumber) {
          codecNumber = codecNumber.trim();
          if (!codecNumber || !codecNumber.length) return;
          info.videoCodecNumbers.push(codecNumber);
          info.videoCodecNumbersOriginal = line;
        });
    }

    if (line.indexOf('VP8/90000') !== -1 && !info.vp8LineNumber) {
      info.vp8LineNumber = line.replace('a=rtpmap:', '').split(' ')[0];
    }

    if (line.indexOf('VP9/90000') !== -1 && !info.vp9LineNumber) {
      info.vp9LineNumber = line.replace('a=rtpmap:', '').split(' ')[0];
    }

    if (line.indexOf('H264/90000') !== -1 && !info.h264LineNumber) {
      info.h264LineNumber = line.replace('a=rtpmap:', '').split(' ')[0];
    }
  });

  return info;
}
