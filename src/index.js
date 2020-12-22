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


import html from './html.js'

function app() {
  return <custom text="dfgfdg">
    <h1>Hello World</h1>
    hdfghfhd
    <div>test</div>
  </custom>
}
console.log(app())


