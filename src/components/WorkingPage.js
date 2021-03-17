(function () {
  const template = document.createElement('template');
  template.innerHTML = `
    <style>
      .on-work {
        text-align: center;
        display: none;
      }
      
      .on-work .head {
        margin-bottom: 2rem;
        font-size: 3rem;
      } 
      
      .on-work .body {
        margin-bottom: 2rem;
      }
      
      .on-work #remain-type {
        font-size: 1.5rem;
        margin-right: 1rem;
      }
      
      .on-work #remain-time {
        font-size: 3rem;
      }
      
      #end-button {
        background: #66a614;
      }
      
      @media screen and (max-width: 820px) {
        .on-work #remain-type {
          display: block;
          text-align: center;
          margin-bottom: 0.5rem;
          width: 100%;
        }
      }
      
      @media screen and (max-width: 425px) {
        .on-work .head {
          font-size: 2.5rem;
        }
      
        .on-work #remain-type {
          font-size: 1.5rem;
        }
      
        .on-work #remain-time {
          font-size: 2rem;
        }
      }
      
      @media screen and (max-width: 320px) {
        .on-work .head {
          font-size: 2rem;
        }
      
        .on-work #remain-type {
          font-size: 1rem;
        }
      
        .on-work #remain-time {
          font-size: 1.5rem;
        }
      }
    </style>
    <custom-container class='on-work'>
      <div id="on-work-header" class="head"></div>
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
    $Main = null;
    $RemainType = null;
    $RemainTime = null;
    $EndButton = null;
    $PageWrapper = null;

    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.append(template.content.cloneNode(true));
      this.$Main = this.shadowRoot.querySelector('.head');
      this.$RemainType = this.shadowRoot.querySelector('#remain-type');
      this.$RemainTime = this.shadowRoot.querySelector('#remain-time');
      this.$EndButton = this.shadowRoot.querySelector('custom-button');
      this.$PageWrapper = this.shadowRoot.querySelector('custom-container');
    }

    connectedCallback() {}

    disconnectedCallback() {}

    start(time) {
      this.type = 'work';
      this.time = time;
    }

    set type(value) {
      console.log(this.$RemainType);
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
