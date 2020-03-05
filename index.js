// on & off variables
const IntroWrap = document.querySelector(".intro");
const WorkWrap = document.querySelector(".on-work");

// Introduction
const OptionBtn = document.querySelector(".option-button");
const ModalWrap = document.querySelector(".modal-wrapper");
const ModalCancelBtn = document.querySelector(".cancel-button");
const ModalAcceptBtn = document.querySelector(".accept-button");
const StartBtn = document.querySelector(".start-button")

const FocusTimeInput = document.getElementById("focus-time");
const RestTimeInput = document.getElementById("rest-time")

let FocusTime = 0;
let RestTime = 0;

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

StartBtn.addEventListener('click', (e) => {
    IntroWrap.style.display = "none";
    WorkWrap.style.display = "flex";
})

// on Working