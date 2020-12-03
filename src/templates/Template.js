import tpl from './index.html'
import _ from '../core/tools/_'

export class Template {
  constructor(partials) {
    const $template = document.createElement('template')
    if (typeof(tpl) === 'string') {
      $template.innerHTML = tpl
    } else if (_.isFunction(tpl)) {
      $template.innerHTML = tpl()
    } else $template.append(tpl)

    const $partials = $template.content.querySelectorAll('partial')

    Array.from($partials).map(partial => {
      const p = partials[partial.getAttribute('name')]
      if (!Array.isArray(p)) {
        partial.remove()
      } else {
        p.forEach(c => {
          partial.append(c.html)
        })
      }
    })

    this.template = $template

    document.querySelector('root')
        .append($template.content.cloneNode(true))
  }
}
