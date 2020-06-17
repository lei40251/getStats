(function (window) {
  var COMMON = window.App.common;

  var webrtc = null;
  var account = null;
  var password = null;
  // var testStream = null;
  var constraints = {};

  var videoFlag = 0;

  // element
  var linkman = document.querySelector('#linkman');
  var callBtn = document.querySelector('#call');
  var cancelBtn = document.querySelector('#cancel');
  var hangupBtn = document.querySelector('#hangup');
  var rejectBtn = document.querySelector('#reject');
  var answerBtn = document.querySelector('#answer');
  var switchCamBtn = document.querySelector('#change-camera');
  var toggleCamBtn = document.querySelector('#toggle-camera');
  var toggleVolumeBtn = document.querySelector('#volume');
  var toggleFeaturedBtn = document.querySelector('#featured');
  var toggleMicBtn = document.querySelector('#toggle-microphone');
  var DTMFArea = document.querySelector('#DTMF');
  var infoMessage = document.querySelector('#info-message');
  var sendInfoBtn = document.querySelector('#sendInfo');
  var switchMicSelect = document.querySelector('#switch-microphone');
  // var switchCamSelect = document.querySelector('#switch-camera');
  var switchAudioOutput = document.querySelector('#switch-audiooutput');
  // var selectors = [switchMicSelect, switchAudioOutput, switchCamSelect];
  var changeFrameRageRang = document.querySelector('#change-frameRate');
  // var frontCameraCheckbox = document.querySelector('#front-camera');
  var saveContraintsBtn = document.querySelector('#save-contraints');
  var logoinBtn = document.querySelector('#login');
  var logoutBtn = document.querySelector('#logout');
  var testVideo = document.querySelector('#test-video');

  // TODO: DEBUG
  FlyInnWeb.debug.disable('FlyInn:*');
  // var box = tapNode("body");
  // box.on("longtap", function () {
  var vConsole = new VConsole();
  // }, box)

  M.FormSelect.init(document.querySelectorAll('select'));
  M.Modal.init(document.querySelectorAll('#dialpad-modal'), {
    dismissible: false,
  });
  M.Modal.init(document.querySelectorAll('#settings-modal'), {
    // dismissible: false,
    onOpenStart: initSettings,
    onCloseEnd: settingModalOpenEnd,
  });
  var floatingActionButtons = M.FloatingActionButton.init(document.querySelectorAll('.fixed-action-btn'));

  // modals.forEach(modal => {
  //   if (modal.el.id == 'setting-modal') {

  //   }
  // })

  //
  $('.update').click(function () {
    var test = { speed: 120, constraints: { frameRate: 15, width: 640, aspectRatio: 1.33333333 }, priority: 'low' };

    var speed = { low: 512, medium: 1024, high: 1536, vhigh: 2048 };
    var frameRate = { low: 10, medium: 15, high: 20, vhigh: 25 };
    var asp = {
      low: { width: 640, height: 360, aspectRatio: 1.777777778 },
      medium: { width: 640, height: 480, aspectRatio: 1.33333333 },
      high: { width: 1280, height: 720, aspectRatio: 1.777777778 },
    };

    test.speed = speed[$('.speed').val()] * 1000;
    test.constraints.frameRate = frameRate[$('.fps').val()];
    test.constraints.width = asp[$('.asp').val()].width;
    test.constraints.height = asp[$('.asp').val()].height;
    test.constraints.aspectRatio = asp[$('.asp').val()].aspectRatio;
    test.priority = $('.asp').val() === 'vhight' ? 'high' : $('.asp').val();

    webrtc.testUpdate(test);
  });
  //

  $('.selectM').change(function () {
    if ($(this).val()) {
      webrtc.updateConstraints($(this).val());
    }
  });

  $('.video-container').click(function () {
    $('#debug').toggleClass('hide');
  });

  /* Listen */
  callBtn.onclick = function () {
    if (linkman.value) {
      webrtc.call(linkman.value);
      $('.caller').html(linkman.value);
    } else {
      M.toast({
        html: '请输入客服号码！',
      });
    }
  };

  cancelBtn.onclick = function () {
    webrtc.cancel();
  };

  answerBtn.onclick = function () {
    webrtc.answer();
  };

  hangupBtn.onclick = function () {
    var r = confirm('确认结束?');
    if (r == true) {
      webrtc.hangup();
    }
    // window.location.reload();
  };

  rejectBtn.onclick = function () {
    webrtc.reject();
  };

  toggleCamBtn.onclick = function () {
    toggleCam(this);
  };

  toggleMicBtn.onclick = function () {
    toggleMic(this);
  };

  toggleVolumeBtn.onclick = function () {
    toggleVol(this);
  };

  toggleFeaturedBtn.onclick = function () {
    // toggleFeatured(this);
    if (navigator.getDisplayMedia) {
      navigator
        .getDisplayMedia({
          video: true,
        })
        .then((stream) => {
          stream.addEventListener('inactive', (e) => {
            webrtc.switchStream();
          });
          webrtc.switchStream(stream, 'screen');
        })
        .catch((error) => {
          console.log(error.mssage);
        });
    } else if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
      navigator.mediaDevices
        .getDisplayMedia({
          video: true,
        })
        .then((stream) => {
          stream.addEventListener('inactive', (e) => {
            webrtc.switchStream();
          });
          webrtc.switchStream(stream, 'screen');
        })
        .catch((error) => {
          console.log(error);
          // globalMsg.msg(error.message);
        });
    } else {
      console.log('您的浏览器暂不支持分享屏幕');
    }
  };

  // DTMFArea.querySelectorAll('button').forEach((ele) => {
  //   if (ele.dataset['value']) {
  //     ele.onclick = function (e) {
  //       webrtc.sendDTMF(this.dataset['value']);
  //     };
  //   }
  // });

  // sendInfoBtn.onclick = function () {
  //   if (infoMessage.value) {
  //     webrtc.sendInfo(infoMessage.value);
  //   } else {
  //     M.toast({
  //       html: '请输入消息内容！',
  //     });
  //   }
  // };

  // saveContraintsBtn.onclick = function () {
  //   saveConstraints();
  // };

  logoinBtn.onclick = function () {
    login();
  };

  logoutBtn.onclick = function () {
    webrtc.unregister();
    sessionStorage.clear();
    window.location.replace('index.html');
  };

  switchCamBtn.onclick = function (e) {
    //switchCam();
    webrtc.switchCam();
  };

  window.onbeforeunload = function () {
    if (webrtc) {
      webrtc.hangup();
      webrtc.unregister();
    }
    // sessionStorage.clear();
  };

  // switchCamSelect.onchange = function () {
  //   renderTestVideo();
  // };

  // switchMicSelect.onchange = function () {
  //   renderTestVideo();
  // };

  /* Function */
  function switchCam() {
    var tmpVideoArr = sessionStorage.getItem('video').split(',');
    var tmpConstraints = JSON.parse(sessionStorage.getItem('constraints'));
    var constraints = null;
    if (tmpVideoArr.length < 1) {
      M.toast({
        html: 'no camera can switch！',
      });
    } else if (videoFlag < tmpVideoArr.length) {
      if (window.stream) {
        window.stream.getTracks().forEach(function (track) {
          track.stop();
        });
      }
      if (tmpConstraints) {
        constraints = {
          audio: tmpConstraints.audio,
          video: {
            deviceId: {
              exact: device,
            },
          },
        };
      } else {
        constraints = {
          audio: true,
          video: {
            deviceId: {
              exact: tmpVideoArr[videoFlag],
            },
          },
        };
      }
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => webrtc.switchStream(stream))
        .catch(handleError);

      // navigator.getDisplayMedia({
      //     video: true
      //   })
      //   .then((stream) => webrtc.switchStream(stream))
      //   .catch(handleError);

      videoFlag++;
    }
    if (videoFlag >= tmpVideoArr.length) {
      videoFlag = 0;
    }
  }

  function saveConstraints() {
    var audio = {};
    var video = {};

    if (switchMicSelect.value != 'no') {
      audio = {
        deviceId: {
          exact: switchMicSelect.value,
        },
      };
    } else {
      audio = false;
    }
    if (switchCamSelect.value != 'no') {
      video = {
        // facingMode: (frontCameraCheckbox.value ? "user" : "environment"),
        deviceId: {
          exact: switchCamSelect.value,
        },
        frameRate: changeFrameRageRang.value,
      };
    } else {
      video = false;
    }

    constraints = {
      video: video,
      audio: audio,
    };
    sessionStorage.setItem('constraints', JSON.stringify(constraints));
  }

  // all Device
  function gotDevices(deviceInfos) {
    var audioArr = [];
    var videoArr = [];
    var audiooutputArr = [];
    var noSelect = '<option value="no">无</option>';

    const values = selectors.map((select) => select.value);
    selectors.forEach((select) => {
      while (select.firstChild) {
        select.removeChild(select.firstChild);
      }

      select.innerHTML = select.innerHTML + noSelect;
    });

    deviceInfos.forEach((deviceInfo) => {
      var option = document.createElement('option');
      option.value = deviceInfo.deviceId;
      if (deviceInfo.kind === 'audioinput') {
        audioArr.push(deviceInfo.deviceId);
        option.text = deviceInfo.label || `microphone ${switchMicSelect.length + 1}`;
        switchMicSelect.appendChild(option);
      } else if (deviceInfo.kind === 'audiooutput') {
        audiooutputArr.push(deviceInfo.deviceId);
        option.text = deviceInfo.label || `speaker ${switchAudioOutput.length + 1}`;
        switchAudioOutput.appendChild(option);
      } else if (deviceInfo.kind === 'videoinput') {
        videoArr.push(deviceInfo.deviceId);
        option.text = deviceInfo.label || `camera ${switchCamSelect.length + 1}`;
        switchCamSelect.appendChild(option);
      } else {
        // console.log('Some other kind of source/device: ', deviceInfo);
      }
    });

    if (sessionStorage.getItem('constraints')) {
      const constraints = sessionStorage.getItem('constraints');
      // TODO: init selected device
    }

    selectors.forEach((select, selectorIndex) => {
      if (Array.prototype.slice.call(select.childNodes).some((n) => n.value === values[selectorIndex])) {
        select.value = values[selectorIndex];
      }
    });

    sessionStorage.setItem('audio', audioArr);
    sessionStorage.setItem('video', videoArr);
    sessionStorage.setItem('audiooutput', audiooutputArr);

    // init m FormSelect
    M.FormSelect.init(document.querySelectorAll('select'));
  }

  function changeAudioDestination() {
    const audioDestination = audioOutputSelect.value;
    attachSinkId(videoElement, audioDestination);
  }

  function attachSinkId(element, sinkId) {
    if (typeof element.sinkId !== 'undefined') {
      element
        .setSinkId(sinkId)
        .then(() => {
          console.log(`Success, audio output device attached: ${sinkId}`);
        })
        .catch((error) => {
          let errorMessage = error;
          if (error.name === 'SecurityError') {
            errorMessage = `You need to use HTTPS for selecting audio output device: ${error}`;
          }
          console.error(errorMessage);
          // Jump back to first output device in the list as it's the default.
          audioOutputSelect.selectedIndex = 0;
        });
    } else {
      console.warn('Browser does not support output device selection.');
    }
  }

  function gotStream(stream) {
    window.stream = stream;
    testVideo.srcObject = stream;
    // Refresh button list in case labels have become available
    return navigator.mediaDevices.enumerateDevices();
  }

  function handleError(error) {
    console.error('navigator.getUserMedia error: ', error);
    M.toast({
      html: error,
    });
  }

  function initSettings() {
    switchMicSelect.innerHTML = '';
    switchAudioOutput.innerHTML = '';
    switchCamSelect.innerHTML = '';
    initDevice();
    renderTestVideo();
  }

  function renderTestVideo() {
    if (window.stream) {
      window.stream.getTracks().forEach((track) => {
        track.stop();
      });
    }
    const audioSource = switchMicSelect.value;
    const videoSource = switchCamSelect.value;
    if (audioSource == 'no' && videoSource == 'no') {
      M.toast({
        html: '必须选择音频和视频中的一个！',
      });
      return;
    }
    const constraints = {
      audio:
        audioSource &&
        (audioSource == 'no' || audioSource == ''
          ? false
          : {
              deviceId: audioSource
                ? {
                    exact: audioSource,
                  }
                : undefined,
            }),
      video:
        videoSource &&
        (videoSource == 'no' || videoSource == ''
          ? false
          : {
              deviceId: videoSource
                ? {
                    exact: videoSource,
                  }
                : undefined,
            }),
    };
    navigator.mediaDevices.getUserMedia(constraints).then(gotStream).then(gotDevices).catch(handleError);
  }

  function settingModalOpenEnd() {
    testVideo.srcObject.getTracks().forEach((track) => track.stop());
    testVideo.srcObject = null;
  }

  function initDevice() {
    navigator.mediaDevices.enumerateDevices().then(gotDevices).catch(handleError);
  }

  // toggle camera
  function toggleCam(e) {
    var classes = e.classList;
    if (classes.contains('close-camera')) {
      webrtc.openCam();
      classes.toggle('close-camera');
    } else {
      webrtc.closeCam();
      classes.toggle('close-camera');
    }
  }

  // toggle featured
  function toggleFeatured(e) {
    $('.video-container').toggleClass('change');
    $('.video-container').toggleClass('normal');
  }

  // toggle camera
  function toggleVol(e) {
    var classes = e.classList;
    if (classes.contains('close-vol')) {
      document.querySelector('#remoteVideo').muted = false;
      classes.toggle('close-vol');
    } else {
      document.querySelector('#remoteVideo').muted = true;
      webrtc.closeSpeaker();
      classes.toggle('close-vol');
    }
  }

  // toggle microphone
  function toggleMic(e) {
    var classes = e.classList;
    if (classes.contains('close-microphone')) {
      webrtc.openMic();
      classes.toggle('close-microphone');
    } else {
      webrtc.closeMic();
      classes.toggle('close-microphone');
    }
  }

  // login
  function login() {
    sessionStorage.setItem('account', document.querySelector('#account').value);
    sessionStorage.setItem('password', document.querySelector('#password').value);
    start({ account: document.querySelector('#account').value, password: document.querySelector('#password').value });
  }

  /**
   * 检测浏览器是否支持 WebRTC 相关功能
   *
   * @param {*} options
   * @returns
   */
  function detectRTC(options) {
    var result = {
      isWebRTC: false,
      isScreenshare: false,
      isWebSocket: false,
      isGetMedia: false,
      isSwitchCam: false,
      isHttps: false,
      base: false,
    };
    result.isWebSocket = 'WebSocket' in window && 2 === window.WebSocket.CLOSING;
    if ('RTCPeerConnection' in window) {
      result.isWebRTC = true;
      if (navigator.getUserMedia) {
        result.isGetMedia = true;
      } else if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        result.isGetMedia = true;
      }
      if ('getSenders' in RTCPeerConnection.prototype) {
        result.isSwitchCam = true;
      }
      if (navigator.getDisplayMedia) {
        result.isScreenshare = true;
      } else if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
        result.isScreenshare = true;
      }
    }
    if (window.location.protocol.indexOf('https') != -1) {
      result.isHttps = true;
    }
    if (options && options.log) {
      console.log(result);
    }
    if (result.isWebSocket && result.isWebRTC && result.isSwitchCam && result.isGetMedia) {
      result.base = true;
    }
    return result;
  }

  // start
  function start(options) {
    var sessionAccount = (options && options.account) || sessionStorage.getItem('account');
    var sessionPassword = (options && options.password) || sessionStorage.getItem('password');
    // check account
    if (sessionAccount && sessionPassword) {
      $('input[name="newAccount"]').val(sessionAccount);
      $('input[name="newPassword"]').val(sessionPassword);

      webrtc = new window.App.WebRTC({
        account: sessionAccount,
        password: sessionPassword,
        domain: domain,
        wss: wss,
      });
      webrtc.connect();
    } else {
      COMMON.changePage('login');
    }

    // TODO: why?
    // initDevice();
  }

  // COMMON.changePage('session');
  start();

  window.onbeforeunload = function () {
    // sessionStorage.clear();
  };
})(window);
