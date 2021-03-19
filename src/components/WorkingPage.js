(function () {
  const template = document.createElement('template');
  template.innerHTML = `
    <style>
      .custom-container {
        text-align: center;
        display: none;
      }

      .head {
        margin-bottom: 2rem;
        font-size: 2.5rem;
      } 
      
      .body {
        margin-bottom: 2rem;
      }
      
      #remain-type {
        font-size: 1.5rem;
        margin-right: 1rem;
      }
      
      #remain-time {
        font-size: 2.5rem;
      }
      
      #end-button {
        background: #66a614;
      }
      
      @media screen and (max-width: 820px) {
        .head {
          font-size: 2rem;
        }

        .body {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        #remain-type {
          display: block;
          text-align: center;
          width: 100%;
          margin: 0;
          margin-bottom: 1rem;
        }
        
        #remain-time {
          font-size: 2rem;
        }
      }
      
      @media screen and (max-width: 425px) {
        .head {
          font-size: 2rem;
        }
      
        #remain-type {
          font-size: 1.5rem;
        }
      
        #remain-time {
          font-size: 2rem;
          margin: 0 auto;
        }
      }
      
      @media screen and (max-width: 320px) {
        .head {
          font-size: 1.5rem;
        }
      
        #remain-type {
          font-size: 1rem;
        }
      
        #remain-time {
          font-size: 1.5rem;
        }
      }
    </style>
    <custom-container>
      <div class="head"></div>
      <div class="body">
        <span id="remain-type"></span>
        <span id="remain-time"></span>
      </div>
      <div class="tail">
        <custom-button color='green'>완료</custom-button>
      </div>
    </custom-container>
  `;

  class WorkingPage extends HTMLElement {
    intervalId = null;
    $Main = null;
    $RemainType = null;
    $RemainTime = null;
    $EndButton = null;
    $PageWrapper = null;

    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this._onEnd = this._onEnd.bind(this);
      this.shadowRoot.append(template.content.cloneNode(true));
      this.$Main = this.shadowRoot.querySelector('.head');
      this.$RemainType = this.shadowRoot.querySelector('#remain-type');
      this.$RemainTime = this.shadowRoot.querySelector('#remain-time');
      this.$EndButton = this.shadowRoot.querySelector('custom-button');
      this.$PageWrapper = this.shadowRoot.querySelector('custom-container');
    }

    _onEnd() {
      clearInterval(this.intervalId);
      this.dispatchEvent(
        new CustomEvent('app-end', {
          bubbles: true,
          composed: true,
        }),
      );
    }

    connectedCallback() {
      this.$EndButton.addEventListener('click', this._onEnd);
    }

    disconnectedCallback() {
      this.$EndButton.removeEventListener('click', this._onEnd);
    }

    work(minute) {
      this.type = 'work';
      this.time = minute * 60;
      this.renderTime();
      this.intervalId = setInterval(() => {
        this.time -= 1;
        this.dispatchEvent(
          new CustomEvent('tic', {
            bubbles: true,
            composed: true,
          }),
        );
        this.renderTime();
        if (!this.time) {
          clearInterval(this.intervalId);
          this.dispatchEvent(
            new CustomEvent('rest', {
              bubbles: true,
              composed: true,
            }),
          );
        }
      }, 1000);
    }

    rest(minute) {
      this.type = 'rest';
      this.time = minute * 60;
      this.renderTime();
      this.intervalId = setInterval(() => {
        this.time -= 1;
        this.renderTime();
        if (!this.time) {
          clearInterval(this.intervalId);
          this.dispatchEvent(
            new CustomEvent('work', {
              bubbles: true,
              composed: true,
            }),
          );
        }
      }, 1000);
    }

    renderTime() {
      const seconds = this.time % 60;
      const minutes = parseInt(this.time / 60) % 60;
      const hours = parseInt(parseInt(this.time / 60) / 60) % 60;

      this.$RemainTime.innerHTML = `
      ${hours ? `${hours}시간` : ''} 
      ${minutes ? `${minutes}분` : ''} 
      ${seconds ? `${seconds}초` : ''}`;
    }

    set type(value) {
      this.setAttribute('type', value);
      if (value === 'rest') {
        this.$Main.innerHTML = '잠깐 쉬세요!';
        this.$RemainType.innerHTML = '남은 쉬는 시간';
      }
      if (value === 'work') {
        this.$Main.innerHTML = '집중하세요!';
        this.$RemainType.innerHTML = '남은 집중 시간';
      }
    }

    get type() {
      return parseInt(this.getAttribute('type'));
    }

    set time(value) {
      this.setAttribute('time', value);
      this.$RemainTime.innerHTML = value;
    }

    get time() {
      return parseInt(this.getAttribute('time'));
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

  customElements.define('working-page', WorkingPage);
})();
