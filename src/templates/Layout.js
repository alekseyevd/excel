export class Layout extends HTMLElement {
  static get observedAttributes() {
    return ['top', 'bottom'];
  }

  connectedCallback() {
    console.log('connected')
  }

  attributeChangedCallback(name, oldValue, newValue) {

  }
}

customElements.define('layout-component', Layout)
