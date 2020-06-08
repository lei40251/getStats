(function (window) {
  var App = window.App || {};

  // main-page user
  var registeredUser = document.querySelector('#registered-user');

  // UI pages
  var loginPage = document.querySelector('#login-page');
  var mainPage = document.querySelector('#main-page');
  var callingPage = document.querySelector('#calling-page');
  var sessionPage = document.querySelector('#session-page');
  var incomingPage = document.querySelector('#incoming-page');

  var common = {
    // get地址栏参数
    handleGetQuery: function (name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    },
    changePage: function (page) {
      try {
        document.querySelector('#toast-container').classList.remove('hide');
      } catch (error) {
        console.log(error);
      }
      switch (page) {
        case 'login':
          loginPage.parentNode.childNodes.forEach((ele) => {
            if (ele.nodeName == 'DIV') {
              ele.classList.add('hide');
            }
          });
          loginPage.classList.remove('hide');
          break;
        case 'main':
          mainPage.parentNode.childNodes.forEach((ele) => {
            if (ele.nodeName == 'DIV') {
              ele.classList.add('hide');
            }
          });
          mainPage.classList.remove('hide');
          registeredUser.innerText = sessionStorage.getItem('account');
          break;
        case 'calling':
          callingPage.parentNode.childNodes.forEach((ele) => {
            if (ele.nodeName == 'DIV') {
              ele.classList.add('hide');
            }
          });
          callingPage.classList.remove('hide');
          break;
        case 'session':
          sessionPage.parentNode.childNodes.forEach((ele) => {
            if (ele.nodeName == 'DIV') {
              ele.classList.add('hide');
            }
          });
          document.querySelector('#toggle-camera').classList.remove('close-camera');
          document.querySelector('#toggle-microphone').classList.remove('close-microphone');
          sessionPage.classList.remove('hide');
          break;
        case 'incoming':
          incomingPage.parentNode.childNodes.forEach((ele) => {
            if (ele.nodeName == 'DIV') {
              ele.classList.add('hide');
            }
          });
          incomingPage.classList.remove('hide');
          break;
      }
    },
    // H264 first
    // h264First: function (sdp) {
    //   var h264Arr = sdp.match(/\d+(?=\sH264)/g);
    //   var sequenceArr = sdp.match(/(?<=m=video.*SAVPF\s+).*/).toString().split(' ');

    //   var i = 0;
    //   var tmpVideo = null;

    //   function clearSequence(arr) {
    //     if (i < h264Arr.length) {
    //       tmpVideo = arr.filter((item) => {
    //         return h264Arr[i] != item;
    //       });
    //       i++;
    //       clearSequence(tmpVideo);
    //     }
    //   }
    //   clearSequence(sequenceArr);

    //   h264Arr = h264Arr.concat(tmpVideo);

    //   sdp = sdp.replace(/(?<=m=video.*SAVPF\s+).*/, h264Arr.join(' ')).replace(`a=group:BUNDLE audio video
    //   `, '');
    //   return sdp;
    // }
  };

  /* Tap */
  var TOUCHSTART, TOUCHEND;
  if (typeof window.ontouchstart != 'undefined') {
    TOUCHSTART = 'touchstart';
    TOUCHEND = 'touchend';
    TOUCHMOVE = 'touchmove';
  } else if (typeof window.onmspointerdown != 'undefined') {
    TOUCHSTART = 'MSPointerDown';
    TOUCHEND = 'MSPointerUp';
    TOUCHMOVE = 'MSPointerMove';
  } else {
    TOUCHSTART = 'mousedown';
    TOUCHEND = 'mouseup';
    TOUCHMOVE = 'mousemove';
  }

  function NodeTouch(node) {
    this._node = node;
  }

  function tap(node, callback, scope) {
    node.addEventListener(TOUCHSTART, function (e) {
      x = e.touches[0].pageX;
      y = e.touches[0].pageY;
    });
    node.addEventListener(TOUCHEND, function (e) {
      e.stopPropagation();
      e.preventDefault();
      var curx = e.changedTouches[0].pageX;
      var cury = e.changedTouches[0].pageY;
      if (Math.abs(curx - x) < 6 && Math.abs(cury - y) < 6) {
        callback.apply(scope, arguments);
      }
    });
  }

  function longTap(node, callback, scope) {
    var x,
      y,
      startTime = 0,
      endTime = 0,
      in_dis = false;
    node.addEventListener(TOUCHSTART, function (e) {
      x = e.touches[0].pageX;
      y = e.touches[0].pageY;
      startTime = new Date().getTime();
    });
    node.addEventListener(TOUCHEND, function (e) {
      e.stopPropagation();
      e.preventDefault();
      var curx = e.changedTouches[0].pageX;
      var cury = e.changedTouches[0].pageY;
      if (Math.abs(curx - x) < 6 && Math.abs(cury - y) < 6) {
        in_dis = true;
      } else {
        in_dis = false;
      }
      endTime = new Date().getTime();
      if (endTime - startTime > 300 && in_dis) {
        callback.apply(scope, arguments);
      }
    });
  }
  NodeTouch.prototype.on = function (evt, callback, scope) {
    var scopeObj;
    var x, y;
    if (!scope) {
      scopeObj = this._node;
    } else {
      scopeObj = scope;
    }
    if (evt === 'tap') {
      tap(this._node, callback, scope);
    } else if (evt === 'longtap') {
      longTap(this._node, callback, scope);
    } else {
      this._node.addEventListener(evt, function () {
        callback.apply(scope, arguments);
      });
    }
    return this;
  };
  var tapNode = function (selector) {
    var node = document.querySelector(selector);
    if (node) {
      return new NodeTouch(node);
    } else {
      return null;
    }
  };

  window.tapNode = tapNode;

  App.common = common;
  window.App = App;
})(window);
