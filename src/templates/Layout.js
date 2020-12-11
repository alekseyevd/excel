import tpl from './index.html'
import _ from '../core/tools/_'

export class Layout extends HTMLElement {
  static get observedAttributes() {
    return ['top', 'bottom'];
  }

  constructor(Component) {
    super()
    const $template = document.createElement('template')
    if (typeof(tpl) === 'string') {
      $template.innerHTML = tpl
    } else if (_.isFunction(tpl)) {
      $template.innerHTML = tpl()
    } else $template.append(tpl)

    const module = $template.content.querySelector('module')
    const el = new Component
    module.append(el)
    this.append($template.content)
  }

  renderModule(el) {
    this.querySelector('module').firstChild.replaceWith(el)
  }

  connectedCallback() {
    console.log('connected')
  }

  attributeChangedCallback(name, oldValue, newValue) {

  }
}

customElements.define('layout-component', Layout)
