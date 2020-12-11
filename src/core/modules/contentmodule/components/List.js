import tpl from './tpl/list.html'
import _ from '@core/tools/_'

export class ContentListView extends HTMLElement {
  constructor() {
    super()
    const $template = document.createElement('template')
    if (typeof(tpl) === 'string') {
      $template.innerHTML = tpl
    } else if (_.isFunction(tpl)) {
      $template.innerHTML = tpl()
    } else $template.append(tpl)

    this.append($template.content)
  }
}

customElements.define('content-list', ContentListView)
