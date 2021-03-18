(function () {
  const template = document.createElement('template');
  template.innerHTML = `
    <custom-container>
      <div class="on-end">
        <div class="head">수고했어요!</div>
        <div class="body"><span id="total-focus"></span> 동안 집중했습니다!</div>
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
      this.$TotalFocus = this.shadowRoot.querySelector('#total-focus');
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

  customElements.define('end-page', EndPage);
})();
