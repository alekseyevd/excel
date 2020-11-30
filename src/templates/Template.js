import tpl from './index.html';

export class Template {
  constructor(partials) {
    const $template = document.createElement('template')
    $template.innerHTML = tpl
    const $partials = $template.content.querySelectorAll('partial')
    Array.from($partials).forEach(partial => {
      partial.replaceWith(partials[partial.getAttribute('name')])
    })
    document.querySelector('root-module')
        .append($template.content.cloneNode(true))
  }
}
