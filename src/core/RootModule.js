export class MyApp extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    console.log('connected')
  }

  use(val) {
    console.log(val);
  }

  render() {
    document.querySelector('root').append(this)
  }
}

customElements.define('root-module', MyApp)
