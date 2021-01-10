import {Component} from './Component'
import Element from '../El'
import {html} from '../html'
import Layout from './Layout'

export class Root extends Component {
  constructor() {
    super()
    // to-do Routing
    this.partials = {
      top: Element
    }
  }

  template() {
    // return (
    //   <>
    //     <h1>Hello world</h1>
    //     {/* <Element></Element> */}
    //     <Layout partials={this.partials}/>
    //   </>
    // )
    return (
      <Switch>
        <Route hash="test" partials={this.partials} layout={Element}/>
        <Route hash="test2" layout={Element}/>
      </Switch>
    )
  }
}

function Switch(props, children) {
  // to-do find route
  console.log(children);
  return children[0].layout()
}

function Route(props) {
  return {
    hash: props.hash,
    layout: props.layout
  }
}

customElements.define('root-component', Root)
