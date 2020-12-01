import {Template} from '../templates/Template'
import {CustomHtml} from './components/customhtml/CustomHtml'
import {ContentModule} from './modules/contentmodule/ContentModule'

export class App {
  constructor(component) {
    this.component = component
    this.partials = {
      top: [
        new CustomHtml('<div>top1</div>'),
        new CustomHtml('<div>top2</div>'),
      ],
      bottom: [
        new CustomHtml('<div>botom</div>')
      ]
    }
  }

  start() {
    const routes = [
      {
        path: 'fff',
        module: ContentModule
      }
    ]

    const r = routes.reduce((acc, r) => {
      const rs = r.module.routes
      rs.map(route => {
        route.path = r.path + route.path
        return route
      })
      return acc.concat(rs)
    }, [])
    console.log(r);

    new Template(this.partials)
  }
}
