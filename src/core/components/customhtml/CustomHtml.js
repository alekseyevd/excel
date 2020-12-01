export class CustomHtml {
  constructor(html) {
    const $template = document.createElement('template')
    $template.innerHTML = html
    this.template = $template
  }

  get html() {
    return this.template.content.cloneNode(true)
  }
}
