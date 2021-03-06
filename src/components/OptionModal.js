(function () {
  const template = document.createElement('template');
  template.innerHTML = `
    <style>
      .wrapper {
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
      
      .head {
        font-size: 2rem;
        margin-bottom: 1rem;
      }
      
      input {
        font-family: Neo;
        font-size: 1rem;
        background: #021859;
        color: #f2cb05;
        text-align: right;
        border: 2px solid #04adbf;
        margin-right: 0.25rem;
      }
      
      .label {
        margin: 0.5rem 0;
      }
    
      .tail {
        text-align: right;
        margin-top: 1rem;
      }

      custom-button {
        margin: 0.25rem;
      }
    </style>
    <section class="wrapper">
      <main class="modal">
        <header class="head">설정</header>
        <div class="body">
          <section>
            <div class="label">집중할 시간</div>
            <input id="focus-time" type="number" min="1"/>분
          </section>
          <section>
            <div class="label">쉬는 시간</div>
            <input id="rest-time" type="number" min="1" />분
          </section>
        </div>
        <footer class="tail">
          <custom-button color="red">취소</custom-button>
          <custom-button color="green">확인</custom-button>
        </footer>
      </main>
    </section>
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
      this._onKeyPressInput = this._onKeyPressInput.bind(this);
      this.$CancelButton = this.shadowRoot.querySelector(
        "custom-button[color='red']",
      );
      this.$ConfirmButton = this.shadowRoot.querySelector(
        "custom-button[color='green']",
      );
      this.$FocusTimeInput = this.shadowRoot.querySelector('#focus-time');
      this.$RestTimeInput = this.shadowRoot.querySelector('#rest-time');
      this.$ModalWrapper = this.shadowRoot.querySelector('.wrapper');
    }

    connectedCallback() {
      this._onCancel = this._onCancel.bind(this);
      this._onConfirm = this._onConfirm.bind(this);
      this._onKeyPressInput = this._onKeyPressInput.bind(this);
      this.$CancelButton.addEventListener('click', this._onCancel);
      this.$ConfirmButton.addEventListener('click', this._onConfirm);
      this.$FocusTimeInput.addEventListener('keydown', this._onKeyPressInput);
      this.$RestTimeInput.addEventListener('keydown', this._onKeyPressInput);
      this.$FocusTimeInput.addEventListener('input', this._onChangeInput);
      this.$RestTimeInput.addEventListener('input', this._onChangeInput);
    }

    disconnectedCallback() {
      this.$CancelButton.removeEventListener('click', this._onCancel);
      this.$ConfirmButton.removeEventListener('click', this._onConfirm);
      this.$FocusTimeInput.removeEventListener(
        'keydown',
        this._onKeyPressInput,
      );
      this.$RestTimeInput.removeEventListener('keydown', this._onKeyPressInput);
      this.$FocusTimeInput.removeEventListener('input', this._onChangeInput);
      this.$RestTimeInput.removeEventListener('input', this._onChangeInput);
    }

    _onChangeInput(e) {
      const value = e.target.value;
      if (value < 0) {
        e.target.value = 0;
        return;
      }
      if (value > 1440) {
        e.target.value = 1440;
        return;
      }
      e.target.value = Math.floor(value);
    }

    _onKeyPressInput(e) {
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
      if (this.$FocusTimeInput.value < 1) this.$FocusTimeInput.value = 1;
      if (this.$RestTimeInput.value < 1) this.$RestTimeInput.value = 1;
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
