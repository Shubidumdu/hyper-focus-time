(function () {
  const template = document.createElement('template');
  template.innerHTML = `
    <style>
      button {
        width: 5rem;
        height: 5rem;
        border-radius: 1rem;
        cursor: pointer;
        color: #fff;
        border: 2px solid #fff;
        font-size: 1.5rem;
        font-family: Neo;
        transition: 0.3s;
      }

      button:hover {
        filter: brightness(1.1);
      }

      button:active {
        filter: brightness(0.8);
      }

      :host([color='red']) button {
        background: #a63114;
      }

      :host([color='green']) button {
        background: #66a614;
      }
    </style>
    <button>
      <slot></slot>
    </button>
  `;

  class CustomButton extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.append(template.content.cloneNode(true));
    }

    connectedCallback() {
      if (!this.hasAttribute('role')) this.setAttribute('role', 'button');
      if (!this.hasAttribute('tabindex')) this.setAttribute('tabindex', 0);
    }

    set color(value) {
      this.setAttribute('color', value);
    }

    get color() {
      return this.getAttribute('color');
    }
  }

  customElements.define('custom-button', CustomButton);
})();
