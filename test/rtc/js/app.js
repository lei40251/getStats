(function (window) {
  var COMMON = window.App.common;

  var webrtc = null;
  // var testStream = null;

  // element
  var linkman = document.querySelector('#linkman');
  var callBtn = document.querySelector('#call');
  var cancelBtn = document.querySelector('#cancel');
  var hangupBtn = document.querySelector('#hangup');
  var rejectBtn = document.querySelector('#reject');
  var answerBtn = document.querySelector('#answer');
  var toggleVolumeBtn = document.querySelector('#volume');
  var toggleMicBtn = document.querySelector('#toggle-microphone');
  var DTMFArea = document.querySelector('#DTMF');
  var infoMessage = document.querySelector('#info-message');
  var sendInfoBtn = document.querySelector('#sendInfo');
  // var selectors = [switchMicSelect, switchAudioOutput, switchCamSelect];
  var logoinBtn = document.querySelector('#login');
  var logoutBtn = document.querySelector('#logout');

  // TODO: DEBUG
  FlyInnWeb.debug.disable('FlyInn:*');
  // var box = tapNode("body");

  M.FormSelect.init(document.querySelectorAll('select'));
  M.Modal.init(document.querySelectorAll('#dialpad-modal'), {
    dismissible: false,
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

  toggleMicBtn.onclick = function () {
    toggleMic(this);
  };

  toggleVolumeBtn.onclick = function () {
    toggleVol(this);
  };

  DTMFArea.querySelectorAll('button').forEach((ele) => {
    if (ele.dataset['value']) {
      ele.onclick = function (e) {
        webrtc.sendDTMF(this.dataset['value']);
      };
    }
  });

  logoinBtn.onclick = function () {
    login();
  };

  logoutBtn.onclick = function () {
    webrtc.unregister();
    sessionStorage.clear();
    window.location.replace('index.html');
  };

  window.onbeforeunload = function () {
    if (webrtc) {
      webrtc.hangup();
      webrtc.unregister();
    }
    // sessionStorage.clear();
  };

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

  // toggle camera
  function toggleVol(e) {
    var classes = e.classList;
    if (classes.contains('close-vol')) {
      document.querySelector('#remoteAudio').muted = false;
      classes.toggle('close-vol');
    } else {
      document.querySelector('#remoteAudio').muted = true;
      webrtc.closeSpeaker();
      classes.toggle('close-vol');
    }
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


    $('.remoteControl').show();
    $('.mic_btn').removeClass('off');
    // TODO: why?
    // initDevice();
  }

  // COMMON.changePage('session');
  start();

  window.onbeforeunload = function () {
    // sessionStorage.clear();
  };
})(window);
