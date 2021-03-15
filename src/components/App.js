class App extends HTMLElement {
  template = `
    <template>
      
    </template>
  `

  constructor() {

  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = `

    `;
  }
}