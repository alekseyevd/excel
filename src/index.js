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
  constructor(props) {
    super()
    console.log('props', props)
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
    {El.html({text: 'test'})}
  </div>
}

updateElement(document.querySelector('root'), app())
