import tpl from './tpl/Dashboard.html'
import list from './tpl/List.html'
import _ from '@core/tools/_'
import getExcelListFromStorage from '../helpers/functions'
import {Loader} from '../helpers/Loader'

export class ExcelDashboardView extends HTMLElement {
  constructor() {
    super()
    this.data = {
      loading: true
    }

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
    this.render(data)
  }

  render(data = []) {
    const $template = document.createElement('template')
    $template.innerHTML = list
    const ul = $template.content.querySelector('ul')
    data.forEach(el => {
      const clone = $template.content.querySelector('template')
          .content.cloneNode(true)
      clone.querySelector('a').textContent = el.title
      clone.querySelector('strong').textContent = el.date
      ul.appendChild(clone)
    })
    this.querySelector('loader-component').
        replaceWith($template.content.cloneNode(true))
  }
}

customElements.define('excel-dashboard', ExcelDashboardView)
customElements.define('loader-component', Loader)
