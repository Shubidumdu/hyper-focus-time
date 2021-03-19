(function () {
  const template = document.createElement('template');
  template.innerHTML = `
    <style>
      :host div{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: #021859;
        padding: 5rem;
        border: 5px solid #04adbf;
        border-radius: 1rem;
        color: #f2cb05;
        word-break: keep-all;
      }

      @media screen and (max-width: 900px) {
        :host div {
          padding: 2rem;
        }
      }

      @media screen and (max-width: 768px) {
        :host div {
          max-width: 22rem;
        }
      }

      @media screen and (max-width: 450px) {
        :host div {
          border: none;
          background: none;
        }
      }

      @media screen and (max-width: 415px) {
        :host div {
          border: none;
          background: none;
          max-width: 16rem;
        }
      }
    </style>
    <div>
      <slot></slot>
    </div>
  `;

  class CustomContainer extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.append(template.content.cloneNode(true));
    }
  }

  customElements.define('custom-container', CustomContainer);
})();
