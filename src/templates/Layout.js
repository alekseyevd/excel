import tpl from './index.html'
import _ from '../core/tools/_'

export class Layout extends HTMLElement {
  static get observedAttributes() {
    return ['top', 'bottom'];
  }

  constructor(props) {
    super()
    const Component = props.module
    const $template = document.createElement('template')
    this.__partials = {
      top: '<div>top</div>',
      bottom: '<div>bottom</div>'
    }
    if (typeof(tpl) === 'string') {
      $template.innerHTML = tpl
    } else if (_.isFunction(tpl)) {
      $template.innerHTML = tpl()
    } else $template.append(tpl)

    const module = $template.content.querySelector('module')
    const el = new Component({
      params: props.params
    })
    module.append(el)

    this.partials = {}
    const partials = $template.content.querySelectorAll('partial')
    Array.from(partials).forEach(partial => {
      const key = partial.attributes['name'].value
      this.partials[key] = partial
    })
    this.renderPartials(props.partials)
    this.append($template.content)
  }

  renderPartials(keys) {
    Object.keys(this.partials).forEach(key => {
      if (keys.includes(key)) {
        if (!this.hasAttribute(key)) this.setAttribute(key, '')
      } else this.removeAttribute(key)
    })
  }

  renderModule(el) {
    this.querySelector('module').firstChild.replaceWith(el)
  }

  connectedCallback() {
    console.log('connected')
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (newValue === '') {
      this.partials[name]
          .innerHTML = this.__partials[name]
    } else {
      this.partials[name]
          .innerHTML = ''
    }
  }
}

customElements.define('layout-component', Layout)
