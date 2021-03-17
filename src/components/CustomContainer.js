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
        border: 5px solid #04adbf;
        border-radius: 1rem;
        color: #f2cb05;
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
