export class ExcelItemView extends HTMLElement {
  constructor(props) {
    super()
    this.params = props.params
    this.render()
  }

  render() {
    console.log(this.params);
    const template = document.createElement('template')
    template.innerHTML = `<div>Это компонент item c id ${this.params.id}</div>`
    if (this.template) {
      this.innerHTML = ''
    }
    this.template = template
    this.append(this.template.content)
  }
}

customElements.define('excel-sheet', ExcelItemView)
