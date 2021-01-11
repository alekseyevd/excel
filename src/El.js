import {html} from './html'
import register from './register'
import {Component} from './core/Component'
import {params} from './core/Params'

class El extends Component {
  static get attributes() {
    return {
      text: {type: String, default: '12345'},
      test: {type: Number, default: 0},
      bool: {type: Boolean, default: true},
      json: {type: Array, default: ['hjk', 'sdfds']}
    }
  }

  initState() {
    const state = {
      initial: 'init'
    }
    return state
  }

  plus() {
    // console.log(this.props.test);
    const count = this.props.test + 1
    // console.log(count++);
    this.setAttribute('test', count)
  }

  template() {
    const test = this.props.test
    if (test == 3) {
      return (<div>12345</div>)
    }
    return (
      <>
        <div>{test} это кастом элемент</div>
        <div>текст</div>
        <input type="text"></input>
        <button
          onClick={(e) => console.log('clicked', e.target)}>Click</button>
        <button onClick={() => this.plus()}>render</button>
      </>)
  }

  connectedCallback() {
    console.log('params', params);
  }
}

const func = register('custom-element', El)
export default func
