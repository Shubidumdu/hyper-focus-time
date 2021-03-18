(function () {
  const template = document.createElement('template');
  template.innerHTML = `
    <style>
      .modal-wrapper {
        position: fixed;
        display: none;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        align-items: center;
        justify-content: center;
      }
      
      .modal {
        color: #f2cb05;
        background: #021859;
        border: 5px solid #04adbf;
        padding: 1rem 1rem;
        border-radius: 1rem;
        width: 20rem;
      }
      
      .modal-title {
        font-size: 2rem;
        margin-bottom: 1rem;
      }
      
      .modal-body input {
        font-family: Neo;
        font-size: 1rem;
        background: #021859;
        color: #f2cb05;
        text-align: right;
        border: 2px solid #04adbf;
        margin-right: 0.25rem;
      }
      
      .modal-body .set-label {
        margin: 0.5rem 0;
      }
      
      .modal p {
        font-size: 1rem;
      }
      
      .close-wrapper {
        text-align: right;
        margin-top: 1rem;
      }
    </style>
    <div class="modal-wrapper">
      <div class="modal">
        <div class="modal-title">설정</div>
        <div class="modal-body">
          <div class="set-focus-time">
            <div class="set-label">집중할 시간</div>
            <input id="focus-time" type="number" min="1" />분
          </div>
          <div class="set-rest-time">
            <div class="set-label">쉬는 시간</div>
            <input id="rest-time" type="number" min="1" />분
          </div>
        </div>
        <div class="close-wrapper">
          <custom-button color="red">취소</custom-button>
          <custom-button color="green">확인</custom-button>
        </div>
      </div>
    </div>
  `;

  class OptionModal extends HTMLElement {
    $FocusTimeInput = null;
    $RestTimeInput = null;
    $CancelButton = null;
    $ConfirmButton = null;
    $ModalWrapper = null;

    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.append(template.content.cloneNode(true));
      this._onCancel = this._onCancel.bind(this);
      this._onConfirm = this._onConfirm.bind(this);
      this._onEnter = this._onEnter.bind(this);
      this.$CancelButton = this.shadowRoot.querySelector(
        "custom-button[color='red']",
      );
      this.$ConfirmButton = this.shadowRoot.querySelector(
        "custom-button[color='green']",
      );
      this.$FocusTimeInput = this.shadowRoot.querySelector('#focus-time');
      this.$RestTimeInput = this.shadowRoot.querySelector('#rest-time');
      this.$ModalWrapper = this.shadowRoot.querySelector('.modal-wrapper');
    }

    connectedCallback() {
      this._onCancel = this._onCancel.bind(this);
      this._onConfirm = this._onConfirm.bind(this);
      this._onEnter = this._onEnter.bind(this);
      this.$CancelButton.addEventListener('click', this._onCancel);
      this.$ConfirmButton.addEventListener('click', this._onConfirm);
      document.addEventListener('keydown', this._onEnter);
    }

    disconnectedCallback() {
      this.$CancelButton.removeEventListener('click', this._onCancel);
      this.$ConfirmButton.removeEventListener('click', this._onConfirm);
      document.removeEventListener('keydown', this._onEnter);
    }

    _onEnter(e) {
      console.log(e);
      const code = e.code;
      if (code === 'Enter') {
        this._onConfirm();
      }
      if (code === 'Escape') {
        this._onCancel();
      }
    }

    _onCancel() {
      this.isOpen = false;
    }

    _onConfirm() {
      this.isOpen = false;
      this.dispatchEvent(
        new CustomEvent('option-confirm', {
          bubbles: true,
          composed: true,
          detail: {
            focusTime: this.$FocusTimeInput.value,
            restTime: this.$RestTimeInput.value,
          },
        }),
      );
    }

    set focusTime(value) {
      this.$FocusTimeInput.value = value;
    }

    get focusTime() {
      return this.$FocusTimeInput.value;
    }

    set restTime(value) {
      this.$RestTimeInput.value = value;
    }

    get restTime() {
      return this.$RestTimeInput.value;
    }

    set isOpen(value) {
      if (value) {
        this.setAttribute('is-open', '');
        this.$ModalWrapper.style.display = 'flex';
        this.dispatchEvent(
          new CustomEvent('modal-open', {
            bubbles: true,
            composed: true,
          }),
        );
        document.addEventListener('keydown', this._onEnter);
      } else {
        this.removeAttribute('is-open');
        this.$ModalWrapper.style.display = 'none';
        this.dispatchEvent(
          new CustomEvent('modal-close', {
            bubbles: true,
            composed: true,
          }),
        );
      }
    }

    get isOpen() {
      return this.hasAttribute('is-open');
    }
  }

  customElements.define('option-modal', OptionModal);
})();
