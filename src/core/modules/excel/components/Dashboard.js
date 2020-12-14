// import tpl from './tpl/Dashboard.html'
// import list from './tpl/List.html'
import _ from '@core/tools/_'
import getExcelListFromStorage from '../helpers/functions'
import {Loader} from '../helpers/Loader'
import {compile} from './tpl/template'

export class ExcelDashboardView extends HTMLElement {
  constructor() {
    super()
    this.data = {
      loading: true,
      data: []
    }
    this.render()
  }

  async connectedCallback() {
    console.log(this.data);
    const data = await getExcelListFromStorage()
    this.data = {...this.data, loading: false, data}
    console.log(this.data);
    this.render()
  }

  render() {
    const template = document.createElement('template')
    if (typeof(compile) === 'string') {
      template.innerHTML = compile
    } else if (_.isFunction(compile)) {
      template.innerHTML = compile(this.data)
    } else template.append(compile)

    if (this.template) {
      this.innerHTML = ''
    }
    this.template = template
    this.append(this.template.content)
  }
}

customElements.define('excel-dashboard', ExcelDashboardView)
customElements.define('loader-component', Loader)
