import {Component} from './Component'
import Element from '../El'
import {html} from '../html'

export class Root extends Component {
  constructor() {
    super()
  }

  template() {
    return (
      <>
        <h1>Hello world</h1>
        <Element></Element>
      </>
    )
  }
}

customElements.define('root-component', Root)
