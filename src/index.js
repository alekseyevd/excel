// import {App} from './core/App'
// import {CustomHtml} from './core/components/customhtml/CustomHtml'
import {ContentModule} from './core/modules/contentmodule/ContentModule'
import {ExcelModule} from './core/modules/excel/ExcelModule'
import {MyApp} from './core/RootModule'
import {Route} from './core/Route'
import {Layout} from './templates/Layout'
// import {Template} from './templates/Template'


const app = new MyApp()
app.use('', new Route(Layout, ContentModule, {
  top: '<div>Top part</div>',
  bottom: '<div>Bottom part</div>'
}))
app.use('excel', new Route(Layout, ExcelModule))
app.render()

// const app = new App()
// app.start()
