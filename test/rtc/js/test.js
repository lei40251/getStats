var optionsRenegotiate = {
  rtcOfferConstraints: { OfferToReceiveAudio: true, OfferToReceiveVideo: false, iceRestart: true },
};
con = session.connection;

con.oniceconnectionstatechange = function (e) {
  // if(con.iceConnectionState === 'disconnected') {
  //as ice disconnection could be due to small n/w error which jssip/webrtc handles automatically
  // var sleep = setTimeout(function() {} , 1000);
  //If the ice is still disconnected i.e it couldn't be recovered then try renegotiate
  if (con.iceConnectionState === 'disconnected') {
    renegTries = 0;
    var renegotiateTimer = setInterval(checkAndRenegotiate, 4000);
    function checkAndRenegotiate() {
      renegTries++;
      if (renegTries === 5) {
        clearInterval(renegotiateTimer);
        renegotiateTimer = null;
      }

      if (con.iceConnectionState === 'disconnected' && ua.isConnected() && session.dialog && session.isReadyToReOffer()) {
        session.renegotiate(null, function () {
          console.log('log: renegotiate success', renegotiateTimer);
          renegotiateSent = true;
          clearInterval(renegotiateTimer);
          renegotiateTimer = null;
        });
      }
    }
  }
};
