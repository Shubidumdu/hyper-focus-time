(function () {
  const template = document.createElement('template');
  template.innerHTML = `
    <intro-page></intro-page>
    <working-page hidden></working-page>
  `;

  class App extends HTMLElement {
    focusTime = 50;
    restTime = 10;
    totalFocusTime = 0;
    $IntroPage = null;
    $WorkingPage = null;

    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.append(template.content.cloneNode(true));
      this.$IntroPage = this.shadowRoot.querySelector('intro-page');
      this.$WorkingPage = this.shadowRoot.querySelector('working-page');
    }

    connectedCallback() {
      this._onModalOpen = this._onModalOpen.bind(this);
      this._onOptionConfirm = this._onOptionConfirm.bind(this);
      this._onAppStart = this._onAppStart.bind(this);
      this.addEventListener('modal-open', this._onModalOpen);
      this.addEventListener('option-confirm', this._onOptionConfirm);
      this.addEventListener('app-start', this._onAppStart);
    }

    disconnectedCallback() {
      this.removeEventListener('modal-open', this._onModalOpen);
      this.removeEventListener('option-confirm', this._onOptionConfirm);
      this.removeEventListener('app-start', this._onAppStart);
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

    _onAppStart(e) {
      this.$WorkingPage.hidden = false;
      this.$IntroPage.hidden = true;
      this.$WorkingPage.start(this.focusTime);
    }
  }

  customElements.define('hyper-focus-time', App);
})();

// {
// <div class="on-work">
//   <div id="on-work-header" class="head"></div>
//   <div class="body">
//     <span id="remain-type"> </span>
//     <span id="remain-time"> </span>
//   </div>
//   <div class="tail">
//     <button id="end-button">완료</button>
//   </div>
//   </div>
//   <div class="on-end">
//   <div class="head">수고했어요!</div>
//   <div class="body"><span id="total-focus"></span> 동안 집중했습니다!</div>
//   <div class="tail">
//     <button id="reset-button">다시</button>
//   </div>
// </div>
// }
