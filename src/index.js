// import {App} from './core/App'
// import {CustomHtml} from './core/components/customhtml/CustomHtml'

// import {ContentModule} from './core/modules/contentmodule/ContentModule'
// import {ExcelModule} from './core/modules/excel/ExcelModule'
// import {MyApp} from './core/RootModule'
// import {Route} from './core/Route'
// import {Layout} from './templates/Layout'


// const app = new MyApp()
// app.use('', new Route(Layout, ContentModule, ['top', 'bottom']))
// app.use('excel', new Route(Layout, ExcelModule, ['top']))
// app.render()

// const app = new App()
// app.start()


// eslint-disable-next-line no-unused-vars
import {html, el, updateElement} from './html.js'

// eslint-disable-next-line no-unused-vars
function Custom(props) {
  return <cstm pr="props" er="sdff">{props.text}</cstm>
}

function registerTag(type, Class) {
  const f = (props) => {
    return html(type, props)
  }
  Class.prototype.constructor.html = f
  customElements.define(type, Class)
}

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
    // console.log('old:', this.__oldTemplate)
    // console.log('new', this.template())
    updateElement(this, this.template(), this.__oldTemplate)

    this.__oldTemplate = {...this.template()}
    this.shouldRender = false
  }

  template() {
    const test = this.props.test
    return (
      <>
        <div>{test} это кастом элемент</div>
        <div>dsfds</div>
      </>)
  }
}
registerTag('custom-element', El)

function app() {
  return <div className="dfgfdg">
    <Custom text="test"/>
    <h1>Hello World</h1>
    hdfghfhd
    <div>test</div>
    {/* {El.html({text: 'test', test: '5'})} */}
    <El
      test="0"
      // bool="false"
      // json={['sdf', 'sdfdsf']}
    ></El>
  </div>
}

updateElement(document.querySelector('root'), app())
