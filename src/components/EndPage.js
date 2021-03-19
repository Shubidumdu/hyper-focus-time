(function () {
  const template = document.createElement('template');
  template.innerHTML = `
    <style>   
    div {
      text-align: center;
    }

    .head {
      font-size: 3rem;
      margin-bottom: 2rem;
    }
    
    .body {
      font-size: 2rem;
      margin-bottom: 2rem;
    }
    
    #reset-button {
      background: #a63114;
    }
    
    @media screen and (max-width: 425px) {
      .head {
        font-size: 2rem;
      }
    
      .body {
        font-size: 1rem;
      }
    }
    </style>
    <custom-container>
      <div>
        <div class="head">수고했어요!</div>
        <div class="body">
          <span id="total-time"></span> 동안 집중했습니다!
        </div>
        <div class="tail">
          <custom-button id="reset-button" color='green'>다시</custom-button>
        </div>
      </div>
    </custom-container>
  `;

  class EndPage extends HTMLElement {
    $TotalFocus = null;
    $ResetButton = null;
    $PageWrapper = null;

    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.append(template.content.cloneNode(true));
      this._onReset = this._onReset.bind(this);
      this.$TotalFocus = this.shadowRoot.querySelector('#total-time');
      this.$ResetButton = this.shadowRoot.querySelector('#reset-button');
      this.$PageWrapper = this.shadowRoot.querySelector('custom-container');
    }

    _onReset() {
      this.dispatchEvent(
        new CustomEvent('app-reset', {
          bubbles: true,
          composed: true,
        }),
      );
    }

    connectedCallback() {
      this.$ResetButton.addEventListener('click', this._onReset);
    }

    disconnectedCallback() {
      this.$ResetButton.removeEventListener('click', this._onReset);
    }

    renderTime() {
      const time = this.totalFocusTime;
      if (!time) {
        this.$TotalFocus.innerHTML = '0초';
        return;
      }

      const seconds = time % 60;
      const minutes = parseInt(time / 60) % 60;
      const hours = parseInt(parseInt(time / 60) / 60) % 60;

      this.$TotalFocus.innerHTML = `
      ${hours ? `${hours}시간` : ''} 
      ${minutes ? `${minutes}분` : ''} 
      ${seconds ? `${seconds}초` : ''}`;
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

    set totalFocusTime(value) {
      this.setAttribute('total-focus-time', value);
      this.renderTime();
    }

    get totalFocusTime() {
      return parseInt(this.getAttribute('total-focus-time'));
    }
  }

  customElements.define('end-page', EndPage);
})();
