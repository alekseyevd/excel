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
    let routes = [
      {
        path: '',
        module: ContentModule,
        template: Template
      },
      {
        path: 'test',
        component: CustomHtml,
        template: Template
      }
    ]

    routes = routes.reduce((acc, r) => {
      let rs
      if (r.module) {
        rs = r.module.routes
        rs.map(route => {
          route.path = r.path + route.path
          route.template = r.template
          return route
        })
      } else {
        rs = r
      }

      return acc.concat(rs)
    }, [])
    console.log(routes);

    new Template(this.partials)
  }
}
