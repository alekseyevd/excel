export class Route {
  constructor(template, module) {
    this.template = template
    this.module = module
    if (this.module.routes) this.routes = this.module.routes
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

  render() {
    console.log(this)
  }
}
