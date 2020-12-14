export class ExcelItemView extends HTMLElement {
  constructor() {
    super()
    this.render()
  }

  render() {
    const template = document.createElement('template')
    template.innerHTML = '<div>Это компонент item</div>'
    if (this.template) {
      this.innerHTML = ''
    }
    this.template = template
    this.append(this.template.content)
  }
}

customElements.define('excel-sheet', ExcelItemView)
