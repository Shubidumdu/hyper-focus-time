(function () {
  const template = document.createElement('template');
  template.innerHTML = `
    <intro-page></intro-page>
    <working-page hidden></working-page>
    <end-page hidden></end-page>
  `;

  class App extends HTMLElement {
    focusTime = 50;
    restTime = 10;
    totalFocusTime = 0;
    $IntroPage = null;
    $WorkingPage = null;
    $EndPage = null;

    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this._onModalOpen = this._onModalOpen.bind(this);
      this._onOptionConfirm = this._onOptionConfirm.bind(this);
      this._onAppStart = this._onAppStart.bind(this);
      this._onAppEnd = this._onAppEnd.bind(this);
      this.shadowRoot.append(template.content.cloneNode(true));
      this.$IntroPage = this.shadowRoot.querySelector('intro-page');
      this.$WorkingPage = this.shadowRoot.querySelector('working-page');
      this.$EndPage = this.shadowRoot.querySelector('end-page');
    }

    connectedCallback() {
      this.addEventListener('modal-open', this._onModalOpen);
      this.addEventListener('option-confirm', this._onOptionConfirm);
      this.addEventListener('app-start', this._onAppStart);
      this.addEventListener('app-end', this._onAppEnd);
      this.addEventListener('app-reset', this._onAppReset);
    }

    disconnectedCallback() {
      this.removeEventListener('modal-open', this._onModalOpen);
      this.removeEventListener('option-confirm', this._onOptionConfirm);
      this.removeEventListener('app-start', this._onAppStart);
      this.removeEventListener('app-end', this._onAppEnd);
      this.removeEventListener('app-reset', this._onAppReset);
    }

    _onModalOpen(e) {
      const $OptionModal = e.composedPath()[0];
      $OptionModal.$FocusTimeInput.value = this.focusTime;
      $OptionModal.$RestTimeInput.value = this.restTime;
    }

    _onOptionConfirm(e) {
      const $OptionModal = e.composedPath()[0];
      this.focusTime = $OptionModal.$FocusTimeInput.value;
      this.restTime = $OptionModal.$RestTimeInput.value;
    }

    _onAppStart() {
      this.$WorkingPage.hidden = false;
      this.$IntroPage.hidden = true;
      this.$WorkingPage.start(this.focusTime);
    }

    _onAppEnd() {
      this.$WorkingPage.hidden = true;
      this.$EndPage.hidden = false;
    }

    _onAppReset() {
      this.$EndPage.hidden = true;
      this.$IntroPage.hidden = false;
    }
  }

  customElements.define('hyper-focus-time', App);
})();
