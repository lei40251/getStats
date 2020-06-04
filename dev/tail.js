callStatsLooper();

};

if (typeof module !== 'undefined' /* && !!module.exports*/ ) {
  module.exports = callStats;
}

if (typeof define === 'function' && define.amd) {
  define('callStats', [], function() {
    return callStats;
  });
}
