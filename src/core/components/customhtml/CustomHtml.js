export class CustomHtml extends HTMLElement {
  constructor(tpl) {
    super()
    const $template = document.createElement('template')
    $template.innerHTML = tpl
    this.append($template.content)
  }

  static create(props) {
    return () => {
      return new CustomHtml(props)
    }
  }
}

customElements.define('custom-html', CustomHtml)
