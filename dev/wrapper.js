// a wrapper around getStats which hides the differences (where possible)
// following code-snippet is taken from somewhere on the github
function callStatsWrapper(cb) {
  // if !peer or peer.signalingState == 'closed' then return;

  peer.getStats(null).then(function(stats) {
    cb(stats);
  });
}
