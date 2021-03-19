(function () {
  const template = document.createElement('template');
  template.innerHTML = `
    <style>
      .head {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-bottom: 2rem;
      }

      .title {
        font-size: 3rem;
        margin-bottom: 0.5rem;
      }

      .sub-title {
        font-size: 1.5rem;
      }

      .body {
        font-size: 1.25rem;
        text-align: center;
        margin-bottom: 1rem;
        word-break: keep-all;
      }

      .tail {
        text-align: center;
      }

      custom-button {
        margin: 0.5rem;
      }

      @media screen and (max-width: 900px) {
        custom-container {
          width: 100%;
          height: 100%;
        }

        .title {
          font-size: 2.5rem;
        }
      
        .body {
          padding: 0 1rem;
        }
      }
    </style>
      <custom-container>
        <div>
          <div class="head">
            <span class="title">절대집중시간</span>
            <span class="sub-title">HYPER-FOCUS TIME</span>
          </div>
          <div class="body">
            <div>
              절대집중시간은 당신의 반복적인 집중과 휴식을 위한 타이머입니다.
            </div>
            <div>
              해당 앱을 작동시키는 동안에는 오직 해야할 일에 집중해보세요!
            </div>
          </div>
          <div class="tail">
            <custom-button color="red">설정</custom-button>
            <custom-button color="green">시작</custom-button>
          </div>
        </div>
        <option-modal></option-modal>
      </custom-container>
  `;

  class IntroPage extends HTMLElement {
    $OptionButton = null;
    $StartButton = null;
    $OptionModal = null;
    $PageWrapper = null;

    constructor() {
      super();
      this._onOption = this._onOption.bind(this);
      this._onStart = this._onStart.bind(this);
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.append(template.content.cloneNode(true));
      this.$OptionButton = this.shadowRoot.querySelector(
        "custom-button[color='red']",
      );
      this.$StartButton = this.shadowRoot.querySelector(
        "custom-button[color='green']",
      );
      this.$OptionModal = this.shadowRoot.querySelector('option-modal');
      this.$PageWrapper = this.shadowRoot.querySelector('div');
    }

    connectedCallback() {
      this.$OptionButton.addEventListener('click', this._onOption);
      this.$StartButton.addEventListener('click', this._onStart);
    }

    disconnectedCallback() {
      this.$OptionButton.removeEventListener('click', this._onOption);
      this.$StartButton.addEventListener('click', this._onStart);
    }

    _onOption() {
      this.$OptionModal.isOpen = true;
    }

    _onStart() {
      this.dispatchEvent(
        new CustomEvent('app-start', {
          bubbles: true,
          composed: true,
        }),
      );
    }

    set hidden(value) {
      const bool = Boolean(value);
      if (bool) {
        this.$PageWrapper.style.display = 'none';
        this.setAttribute('hidden', '');
      } else {
        this.$PageWrapper.style.display = 'flex';
        this.removeAttribute('hidden');
      }
    }

    get hidden() {
      return this.hasAttribute('hidden');
    }
  }

  customElements.define('intro-page', IntroPage);
})();
