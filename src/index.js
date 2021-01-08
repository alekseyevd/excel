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


import {html, updateElement} from './html.js'
import Elem from './El'
import {Root} from './core/Root.js'

// eslint-disable-next-line no-unused-vars
function Custom(props) {
  return <cstm pr="props" er="sdff">{props.text}</cstm>
}


// updateElement(document.querySelector('root'), app()
document.body.prepend(new Root())
