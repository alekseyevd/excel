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
      text: String,
      test: Number,
      bool: Boolean
    }
  }

  static get observedAttributes() {
    return Object.keys(this.prototype.constructor.attributes)
    // return ['text', 'test'];
  }

  constructor() {
    super()
    this.props = {}
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // to-do Convert to attr type
    // console.log(this.constructor.attributes);
    const toType = this.constructor.attributes[name]
    this.props[name] = toType(newValue)
    setTimeout(() => {
      if (!this.recivedAllProps) {
        // to-do: render
        console.log(this.props)
        this.recivedAllProps = true
      }
    }, 0)
  }

  shouldUpdate() {
    console.log(this.props);
  }

  recieveProps(props) {}
}
registerTag('custom-element', El)

function app() {
  return <div className="dfgfdg">
    <Custom text="test"/>
    <h1>Hello World</h1>
    hdfghfhd
    <div>test</div>
    {/* {El.html({text: 'test', test: '5'})} */}
    <custom-element text="sfsdf" test="5" bool={true}></custom-element>
  </div>
}

updateElement(document.querySelector('root'), app())
