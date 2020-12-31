import register from './register'
import {updateElement, html} from './html'
import {EventEmitter} from './EventEmitter'

class El extends HTMLElement {
  static get attributes() {
    return {
      text: {type: String, default: '12345'},
      test: {type: Number, default: 88},
      bool: {type: Boolean, default: true},
      json: {type: Array, default: ['hjk', 'sdfds']}
    }
  }

  static get observedAttributes() {
    return Object.keys(this.prototype.constructor.attributes)
    // return ['text', 'test'];
  }

  constructor() {
    super()
    this.dispatcher = new EventEmitter()
    this._listeners = []

    // this.shadow = this.attachShadow({mode: 'open'})
    // set default props/attributes

    const attributes = this.constructor.attributes
    this.props = Object.keys(attributes).reduce((acc, name) => {
      acc[name] = attributes[name].default
      return acc
    }, {})

    // to-do - set initial state
    this.state = this.initState()

    setTimeout(this.render.bind(this), 0)
    // this.attributeChangedCallback('__init__', 'old', 'new')
  }

  initState() {
    const state = {
      initial: 'init'
    }
    return state
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // console.log(name, oldValue, newValue);
    if (oldValue === newValue) return

    this.shouldRender = true
    const attr = this.constructor.attributes[name]
    if (attr && (attr.type === Array || attr.type === Object)) {
      this.props[name] = JSON.parse(newValue)
    } else if (attr && attr.type === Boolean) {
      this.props[name] = newValue === 'true'
    } else if (attr !== undefined) this.props[name] = attr.type(newValue)
    setTimeout(() => {
      if (this.shouldRender) {
        // to-do: render
        this.render()
      }
    }, 0)
  }

  render() {
    updateElement(this, this.template(), this.__oldTemplate, 0, this.dispatcher)
    this.addEventListeners()

    this.__oldTemplate = {...this.template()}
    this.shouldRender = false
  }

  addEventListeners() {
    const listeners = this._listeners
    Object.keys(this.dispatcher.listeners).forEach(eventName => {
      if (!listeners.includes(eventName)) {
        listeners.push(eventName)
        this.addEventListener(eventName, e => {
          this.dispatcher.emit(e)
        })
      }
    })
  }

  // to-do function that change props/attributes

  plus() {
    const count = +this.getAttribute('test') + 1
    // console.log(count++);
    this.setAttribute('test', count)
  }

  template() {
    const test = this.props.test
    return (
      <>
        <div>{test} это кастом элемент</div>
        <div>dsfds</div>
        <input type="text" />
        <button
          onClick={(e) => console.log('clicked', e.target)}>Click</button>
        <button onClick={() => this.plus()}>render</button>
      </>)
  }
}
const func = register('custom-element', El)
export default func
