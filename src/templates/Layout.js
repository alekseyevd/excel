import tpl from './index.html'
import _ from '../core/tools/_'

export class Layout extends HTMLElement {
  static get observedAttributes() {
    return ['top', 'bottom'];
  }

  constructor() {
    super()
    const $template = document.createElement('template')
    if (typeof(tpl) === 'string') {
      $template.innerHTML = tpl
    } else if (_.isFunction(tpl)) {
      $template.innerHTML = tpl()
    } else $template.append(tpl)

    // $template.content.querySelector('module').replaceWith()
    this.append($template.content.cloneNode(true))
  }

  connectedCallback() {
    console.log('connected')
    this.querySelector()
  }

  attributeChangedCallback(name, oldValue, newValue) {

  }
}

customElements.define('layout-component', Layout)
