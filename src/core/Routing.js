export class Routing {
  static get path() {
    return window.location.hash.slice(1)
  }

  constructor(root) {
    this.root = root
    this.init = this.init.bind(this)
    window.addEventListener('hashchange', this.init)
    this.init()
  }

  init() {
    const route = this.findRoute()
    route.render()
  }

  findRoute() {
    return this.root.routes.find(route => route.path === Routing.path)
  }

  get temlate() {
    return this.activeTemplate
  }
}

