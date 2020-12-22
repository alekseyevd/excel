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
import html from './html.js'

function Custom(props) {
  return <cstm pr="props">{props.text}</cstm>
}

function app() {
  return <div text="dfgfdg">
    <Custom text="test"/>
    <h1>Hello World</h1>
    hdfghfhd
    <div>test</div>
  </div>
}
console.log(app())


