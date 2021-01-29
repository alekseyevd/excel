import {Component} from './Component'
import Element from '../El'
import {html} from '../html'
import Layout from './Layout'
import {Switch, Route} from './Routing'
// import Route from './Routing'

export class Root extends Component {
  constructor() {
    super()
    // to-do Routing
    this.render = this.render.bind(this)
    window.addEventListener('hashchange', this.render)
  }

  template() {
    return (
      <Switch redirect="" component={Element}>
        <Route hash="" layout={Layout} partials={['top']} view={Element} />
        <Route hash="test">
          <Route hash="[id]" layout={Layout} view={Element}/>
        </Route>
      </Switch>
    )
  }
}

customElements.define('root-component', Root)
