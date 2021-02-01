import {html} from '../../html'
import register from '../../register'
import {Component} from '@core/Component.js'

class Dashboard extends Component {
  initState() {
    return {
      list: [],
      loading: true
    }
  }

  connectedCallback() {
    const list = Object
        .keys(localStorage)
        .filter(key => key.includes('excel:'))
        .map(key => {
          return {
            title: JSON.parse(localStorage.getItem(key)).title,
            date: JSON.parse(localStorage.getItem(key)).date,
            hash: key.split('excel:')[1]
          }
        })

    this.setState({list})
    console.log(this.template());
  }

  template() {
    return (
      <>
        <div class="db__new">
          <div class="db__view">
            <a href="#" class="db__create">
              Новая <br /> таблица
            </a>
          </div>
        </div>
        <div class="db__table db__view">
          <ul class="db__list">
            {
              this.state.list.map(el => {
                return (
                  <li class="db__record">
                    <a href="#">{el.title}</a>
                    <strong>{new Date(el.date).toLocaleDateString()}</strong>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </>
    )
  }
}

export default register('dashboard-component', Dashboard)
