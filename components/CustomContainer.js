(function () {
  const template = document.createElement('template');
  template.innerHTML = `
    <style>
      :host section{
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
        :host section {
          padding: 2rem;
        }
      }

      @media screen and (max-width: 768px) {
        :host section {
          max-width: 22rem;
        }
      }

      @media screen and (max-width: 450px) {
        :host section {
          border: none;
          background: none;
        }
      }

      @media screen and (max-width: 415px) {
        :host section {
          border: none;
          background: none;
          max-width: 16rem;
        }
      }
    </style>
    <section>
      <slot></slot>
    </section>
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
