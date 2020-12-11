import tpl from './tpl/Dashboard.html'
import _ from '@core/tools/_'
import getExcelListFromStorage from '../helpers/functions'
import {Loader} from '../helpers/Loader'


export class ExcelDashboardView extends HTMLElement {
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

  async connectedCallback() {
    const data = await getExcelListFromStorage()
    console.log(data);
  }
}

customElements.define('excel-dashboard', ExcelDashboardView)
customElements.define('loader-component', Loader)
