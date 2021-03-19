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
      this._onRest = this._onRest.bind(this);
      this._onWork = this._onWork.bind(this);
      this._onTic = this._onTic.bind(this);
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
      this.addEventListener('rest', this._onRest);
      this.addEventListener('work', this._onWork);
      this.addEventListener('tic', this._onTic);

      window.onload = function () {
        if (window.Notification) {
          Notification.requestPermission();
        }
      };
    }

    disconnectedCallback() {
      this.removeEventListener('modal-open', this._onModalOpen);
      this.removeEventListener('option-confirm', this._onOptionConfirm);
      this.removeEventListener('app-start', this._onAppStart);
      this.removeEventListener('app-end', this._onAppEnd);
      this.removeEventListener('app-reset', this._onAppReset);
      this.removeEventListener('rest', this._onRest);
      this.removeEventListener('work', this._onWork);
      this.removeEventListener('tic', this._onTic);
    }

    _onModalOpen(e) {
      const $OptionModal = e.composedPath()[0];
      $OptionModal.focusTime = this.focusTime;
      $OptionModal.restTime = this.restTime;
    }

    _onOptionConfirm(e) {
      const $OptionModal = e.composedPath()[0];
      this.focusTime = $OptionModal.focusTime;
      this.restTime = $OptionModal.restTime;
    }

    _onAppStart() {
      this.$WorkingPage.hidden = false;
      this.$IntroPage.hidden = true;
      this.$WorkingPage.work(this.focusTime);
    }

    _onAppEnd() {
      this.$WorkingPage.hidden = true;
      this.$EndPage.hidden = false;
      this.$EndPage.totalFocusTime = this.totalFocusTime;
    }

    _onAppReset() {
      this.$EndPage.hidden = true;
      this.$IntroPage.hidden = false;
      this.totalFocusTime = 0;
    }

    _onRest() {
      this.$WorkingPage.rest(this.restTime);
      new Notification(`잠깐 쉬세요!`, {
        icon: 'img/rest.png',
        body: '잠깐 머리 좀 식혔다가 다시 집중하도록 해요!',
      });
    }

    _onWork() {
      this.$WorkingPage.work(this.focusTime);
      new Notification('다시 집중할 시간이에요!', {
        icon: 'img/focus.png',
        body: '자! 자리로 돌아와서 다시 집중해봅시다!',
      });
    }

    _onTic() {
      this.totalFocusTime += 1;
    }
  }

  customElements.define('hyper-focus-time', App);
})();
