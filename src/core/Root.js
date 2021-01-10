import {Component} from './Component'
import Element from '../El'
import {html} from '../html'
import Layout from './Layout'

export class Root extends Component {
  constructor() {
    super()
    // to-do Routing
  }

  template() {
    return (
      <>
        <h1>Hello world</h1>
        {/* <Element></Element> */}
        <Layout top={Element} />
      </>
    )
  }
}

customElements.define('root-component', Root)
