// Notification Permission
window.onload = function () {
  if (window.Notification) {
    Notification.requestPermission();
  }
};

// on & off variables
const IntroWrap = document.querySelector('.intro');
const WorkWrap = document.querySelector('.on-work');

// Intro
const OptionBtn = document.querySelector('.option-button');
const ModalWrap = document.querySelector('.modal-wrapper');
const ModalCancelBtn = document.querySelector('.cancel-button');
const ModalAcceptBtn = document.querySelector('.accept-button');
const StartBtn = document.querySelector('.start-button');

const FocusTimeInput = document.getElementById('focus-time');
const RestTimeInput = document.getElementById('rest-time');

const RemainType = document.getElementById('remain-type');
const RemainTime = document.getElementById('remain-time');

const OnWorkHeader = document.getElementById('on-work-header');

let FocusTime = 50;
let RestTime = 10;

let FocusSecond = 0;
let RestSecond = 0;

let TotalFocusTime = 0;

FocusTimeInput.value = FocusTime;
RestTimeInput.value = RestTime;

OptionBtn.addEventListener('click', (e) => {
  ModalWrap.style.display = 'flex';
});

ModalCancelBtn.addEventListener('click', (e) => {
  ModalWrap.style.display = 'none';
});

ModalAcceptBtn.addEventListener('click', (e) => {
  FocusTime = parseInt(FocusTimeInput.value);
  RestTime = parseInt(RestTimeInput.value);
  if (FocusTime < 1) {
    FocusTime = 1;
    FocusTimeInput.value = FocusTime;
  }
  if (RestTime < 1) {
    RestTime = 1;
    RestTimeInput.value = RestTime;
  }
  ModalWrap.style.display = 'none';
});

// Start Work!!
let startFocus;
let startRest;

const setRemainType = (type) => {
  if (type === 'focus') {
    OnWorkHeader.innerHTML = `집중하세요!`;
    RemainType.innerHTML = `남은 집중 시간`;
  } else {
    OnWorkHeader.innerHTML = `잠깐 쉬세요!`;
    RemainType.innerHTML = `남은 쉬는 시간`;
  }
};

const setTime = (sec, element) => {
  const hour = parseInt(parseInt(sec / 60) / 60) % 60;
  const minute = parseInt(sec / 60) % 60;
  const second = sec % 60;

  if (hour) {
    element.innerHTML = `${hour}시간 ${minute}분 ${second}초`;
  } else if (minute) {
    element.innerHTML = `${minute}분 ${second}초`;
  } else {
    element.innerHTML = `${second}초`;
  }
};

StartBtn.addEventListener('click', (e) => {
  IntroWrap.style.display = 'none';
  WorkWrap.style.display = 'flex';
  FocusSecond = FocusTime * 60;
  RestSecond = RestTime * 60;
  setRemainType('focus');
  setTime(FocusSecond, RemainTime);
  startFocus = setInterval(FocusCountDown, 1000);
});

// Notification
let notification;

const notify = (noteType) => {
  if (Notification.permission === 'granted') {
    if (noteType === 'takeRest') {
      notification = new Notification(`잠깐 쉬세요!`, {
        icon: 'img/rest.png',
        body: '잠깐 머리 좀 식혔다가 다시 집중하도록 해요!',
      });
    } else if (noteType === 'beFocus') {
      notification = new Notification('다시 집중할 시간이에요!', {
        icon: 'img/focus.png',
        body: '자! 자리로 돌아와서 다시 집중해봅시다!',
      });
    }
  }
};

// On Working
const FocusCountDown = () => {
  FocusSecond -= 1;
  TotalFocusTime++;
  setTime(FocusSecond, RemainTime);

  if (FocusSecond <= 0) {
    clearInterval(startFocus);
    setTimeout(setRemainType, 1000);
    RestSecond = RestTime * 60;
    startRest = setInterval(RestCountDown, 1000, 'rest');
    notify('takeRest');
  }
};

const RestCountDown = () => {
  RestSecond -= 1;
  setTime(RestSecond, RemainTime);

  if (RestSecond <= 0) {
    clearInterval(startRest);
    setTimeout(setRemainType, 1000, 'focus');
    FocusSecond = FocusTime * 60;
    startFocus = setInterval(FocusCountDown, 1000);
    notify('beFocus');
  }
};

// On End
const EndWrap = document.querySelector('.on-end');
const EndButton = document.getElementById('end-button');
const ResetButton = document.getElementById('reset-button');
const TotalFocus = document.getElementById('total-focus');

EndButton.addEventListener('click', (e) => {
  WorkWrap.style.display = 'none';
  EndWrap.style.display = 'flex';
  clearInterval(startRest);
  clearInterval(startFocus);
  setTime(TotalFocusTime, TotalFocus);
});

ResetButton.addEventListener('click', (e) => {
  EndWrap.style.display = 'none';
  IntroWrap.style.display = 'flex';
  TotalFocusTime = 0;
});
