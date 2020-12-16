import {Routing} from './Routing'

export class Route {
  constructor(template, module, partials = []) {
    this.template = template
    this.module = module
    if (this.module.routes) this.routes = this.module.routes
    this.partials = partials
  }

  use(path) {
    if (Array.isArray(this.routes)) {
      const routes = this.routes.map(r => {
        const route = new Route(this.template, r.component)
        // console.log(path + r.path);
        route.use(path + r.path)
        return route
      })
      this.routes = routes
    }
    this.path = path
  }

  hasOwnRoutes() {
    return this.routes.length > 0
  }

  isActive() {
    const r = this.path.split('/')
    const p = Routing.path.split('/')
    if (r.length !== p.length) return false

    const params = {}
    for (let i = 0; i < r.length; i++) {
      if (r[i].startsWith('[') && r[i].endsWith(']')) {
        const key = r[i].slice(1, -1)
        params[key] = p[i]
        continue
      }
      if (r[i] !== p[i]) return false
    }

    this.params = params
    return true
  }

  render() {
    console.log(this)
  }
}
