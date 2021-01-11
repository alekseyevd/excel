import {updateElement} from '../html'
import {EventEmitter} from '../EventEmitter'

export class Component extends HTMLElement {
  static get observedAttributes() {
    // to-do throw error if static method attributes is not implemented
    if (this.prototype.constructor.attributes) {
      return Object.keys(this.prototype.constructor.attributes)
    }

    return []
  }

  constructor() {
    super()
    this.dispatcher = new EventEmitter()
    this._listeners = []

    // this.shadow = this.attachShadow({mode: 'open'})

    const attributes = this.constructor.attributes || {}
    this.props = Object.keys(attributes).reduce((acc, name) => {
      acc[name] = attributes[name].default
      return acc
    }, {})

    this.state = this.initState()

    setTimeout(this.render.bind(this), 0)
  }

  initState() {
    return undefined
  }

  attributeChangedCallback(name, oldValue, newValue) {
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
        this.render()
      }
    }, 0)
  }

  render() {
    const newTemplate = this.template()
    updateElement(this, newTemplate, this.__oldTemplate, 0, this.dispatcher)
    this.updateEventListeners()

    this.__oldTemplate = {...newTemplate}
    this.shouldRender = false
  }

  updateEventListeners() {
    const listeners = this._listeners
    Object.keys(this.dispatcher.listeners).forEach(eventName => {
      if (!listeners.includes(eventName)) {
        listeners.push(eventName)
        this.addEventListener(eventName, e => {
          this.dispatcher.emit(e)
        })
      }

      Array.from(this.dispatcher.listeners[eventName].keys()).forEach(el => {
        if (!document.body.contains(el)) {
          this.dispatcher.unSubscribe(eventName, el)
        }
      })
    })
  }

  template() {
    throw new Error('Method template() should be implemented!')
  }
}
