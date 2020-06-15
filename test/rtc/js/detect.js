// (function(window) {
var ERRORCODE = {
  SYSTEM_NAME_ERROR: 90201,
  SYSTEM_VER_ERROR: 90202,
  BROWSER_NAME_ERROR: 90801,
  BROWSER_VER_ERROR: 90802,
  WEBSOCKET_SUPPORT_ERROR: 90901,
  WEBRTC_SUPPORT_ERROR: 90902,
  SWITCH_CAMERA_ERROR: 90903,
  SCREENSHARE_ERROR: 90904,
};
var OS = { Android: '5', iOS: '11', macOS: '10', Windows: '7' };
var BROWSER = {
  Android: [
    { name: 'Chrome', version: '65' },
    { name: 'WeChat', version: '7' },
    { name: 'Chrome WebView', version: '73' },
  ],
  iOS: [{ name: 'Mobile Safari', version: '11' }],
  Win: [
    { name: 'Chrome', version: '65' },
    { name: 'QQBrowser', version: '10' },
    { name: 'Maxthon', version: '5' },
    { name: 'MetaSr', version: '5' },
  ],
  macOS: [
    { name: 'Chrome', version: '65' },
    { name: 'QQBrowser', version: '10' },
    { name: 'Safari', version: '11' },
  ],
};

var ua = new UAParser();

function checkSystemRequirements(options) {
  var websocket = false;
  var webrtc = false;
  var _switchCamera = false;
  var _screenShare = false;

  websocket = 'WebSocket' in window && 2 === window.WebSocket.CLOSING;
  if ('RTCPeerConnection' in window) {
    webrtc = navigator.getUserMedia ? true : navigator.mediaDevices ? (navigator.mediaDevices.getUserMedia ? true : false) : false;
    _switchCamera = 'getSenders' in RTCPeerConnection.prototype;
    _screenShare =
      ua.getDevice().type == 'mobile'
        ? false
        : !!navigator.getDisplayMedia || !!(navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) || false;
  }
  if (websocket && webrtc && checkOS(ua.getOS()) === true) {
    if (options) {
      if (options.switchCamera) {
        if (_switchCamera) {
          if (options.screenShare) {
            return !!_screenShare;
          }
        }
        return !!_switchCamera;
      } else if (options.screenShare) {
        if (_screenShare) {
          if (options.switchCamera) {
            return !!_switchCamera;
          }
        }
        return !!_screenShare;
      }
    }
    return true;
  } else {
    return websocket
      ? webrtc
        ? checkOS(ua.getOS()) === true
          ? true
          : checkOS(ua.getOS())
        : ERRORCODE.WEBRTC_SUPPORT_ERROR
      : ERRORCODE.WEBSOCKET_SUPPORT_ERROR;
  }
}

function checkBrowser(browserList, current) {
  for (var i = 0; i < browserList.length; ++i) {
    if (current.browser.name == browserList[i].name && current.engine.name == 'WebKit') {
      if (current.browser.major >= browserList[i].version) {
        return true;
      } else {
        return ERRORCODE.BROWSER_VER_ERROR;
      }
    }
  }

  return ERRORCODE.BROWSER_NAME_ERROR;
}

function checkOS(options) {
  switch (options.name) {
    case 'Windows':
      if (/^\d*/.exec(options.version)[0] >= 7) {
        return checkBrowser(BROWSER.Win, ua.getResult());
      } else {
        return ERRORCODE.SYSTEM_VER_ERROR;
      }
      break;
    case 'iOS':
      if (/^\d*/.exec(options.version)[0] >= 11) {
        return checkBrowser(BROWSER.iOS, ua.getResult());
      } else {
        return ERRORCODE.SYSTEM_VER_ERROR;
      }
      break;
    case 'Android':
      if (/^\d*/.exec(options.version)[0] >= 4) {
        return checkBrowser(BROWSER.Android, ua.getResult());
      } else {
        return ERRORCODE.SYSTEM_VER_ERROR;
      }
      break;
    case 'Mac OS':
      if (/^\d*/.exec(options.version)[0] >= 10) {
        return checkBrowser(BROWSER.macOS, ua.getResult());
      } else {
        return ERRORCODE.SYSTEM_VER_ERROR;
      }
      break;
    default:
      break;
  }
}

// console.log('default:', checkSystemRequirements());
// console.log('switch:', checkSystemRequirements({ switchCamera: true }));
// console.log('screen:', checkSystemRequirements({ screenShare: true }));
// console.log('all:', checkSystemRequirements({ switchCamera: true, screenShare: true }));
// console.log(ua.getResult());
// })(window);
