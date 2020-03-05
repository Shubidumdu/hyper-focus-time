// Notification Permission
window.onload = function () {
    if (window.Notification) {
        Notification.requestPermission();
    }
}

// on & off variables
const IntroWrap = document.querySelector(".intro");
const WorkWrap = document.querySelector(".on-work");

// Intro
const OptionBtn = document.querySelector(".option-button");
const ModalWrap = document.querySelector(".modal-wrapper");
const ModalCancelBtn = document.querySelector(".cancel-button");
const ModalAcceptBtn = document.querySelector(".accept-button");
const StartBtn = document.querySelector(".start-button")

const FocusTimeInput = document.getElementById("focus-time");
const RestTimeInput = document.getElementById("rest-time")

const RemainMinute = document.getElementById("focus-minute");
const RemainSecond = document.getElementById("focus-second")

let FocusTime = 0;
let RestTime = 0;

let FocusSecond = 0;
let RestSecond = 0;

FocusTimeInput.value = FocusTime;
RestTimeInput.value = RestTime;

OptionBtn.addEventListener('click', (e) => {
    ModalWrap.style.display = "flex";
});

ModalCancelBtn.addEventListener('click', (e) => {
    ModalWrap.style.display = "none";
});

ModalAcceptBtn.addEventListener('click', (e) => {
    FocusTime = parseInt(document.getElementById("focus-time").value);
    RestTime = parseInt(document.getElementById("rest-time").value);
    ModalWrap.style.display = "none";
});

// Start Work !!
let startFocus;
let startRest;

StartBtn.addEventListener('click', (e) => {
    IntroWrap.style.display = "none";
    WorkWrap.style.display = "flex";
    FocusSecond = FocusTime * 60;
    RestSecond = RestTime * 60;
    RemainMinute.innerHTML = parseInt(FocusSecond / 60);
    RemainSecond.innerHTML = FocusSecond % 60;
    startFocus = setInterval(FocusCountDown, 1000);
})

// on Working
let notification

const notify = (noteType) => {
    if (Notification.permission === 'granted') {
        if (noteType === "takeRest") {
            notification = new Notification(`잠깐 쉬세요!`, {
                icon: 'http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png',
                body: '잠깐 머리 좀 식혔다가 다시 집중하도록 해요!',
            })
        } else if(noteType === "beFocus") {
            notification = new Notification("다시 집중할 시간이에요!", {
                icon: 'http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png',
                body: '자리로 돌아와서 다시 집중해봅시다!',
            })
        }
    }
}

const FocusCountDown = () => {
    FocusSecond -= 1;
    RemainMinute.innerHTML = parseInt(FocusSecond / 60);
    RemainSecond.innerHTML = FocusSecond % 60;

    if (FocusSecond === 0) {
        clearInterval(startFocus);
        RestSecond = RestTime * 60;
        startRest = setInterval(RestCountDown, 1000);
        notify("takeRest");
    }
}

const RestCountDown = () => {
    RestSecond -= 1;
    RemainMinute.innerHTML = parseInt(RestSecond / 60);
    RemainSecond.innerHTML = RestSecond % 60;

    if (RestSecond === 0) {
        clearInterval(startRest);
        FocusSecond = FocusTime * 60;
        startFocus = setInterval(FocusCountDown, 1000);
        notify("beFocus");
    }
};