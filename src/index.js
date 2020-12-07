// import {App} from './core/App'
// import {CustomHtml} from './core/components/customhtml/CustomHtml'
import {ContentModule} from './core/modules/contentmodule/ContentModule'
import {MyApp} from './core/RootModule'
import {Route} from './core/Route'
import {Template} from './templates/Template'


const app = new MyApp()
app.use('', new Route('<layout partial1 part2></layout>', ContentModule))
app.use('test', new Route(Template, ContentModule))
app.render()

// const app = new App()
// app.start()
