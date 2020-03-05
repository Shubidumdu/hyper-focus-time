const OptionBtn = document.querySelector(".option-button");
const ModalWrap = document.querySelector(".modal-wrapper");
const ModalCancelBtn = document.querySelector(".cancel-button");
const ModalAcceptBtn = document.querySelector(".accept-button");

OptionBtn.addEventListener('click', (e) => {
    ModalWrap.style.display = "flex";
})

ModalCancelBtn.addEventListener('click', (e) => {
    ModalWrap.style.display = "none";
})

ModalAcceptBtn.addEventListener('click', (e) => {
    ModalWrap.style.display = "none";
})