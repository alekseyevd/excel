import {Routing} from './Routing'

export class MyApp extends HTMLElement {
  constructor() {
    super()
    this.routes = []
  }

  connectedCallback() {
    this.initRouting()
  }

  use(path, route) {
    route.use(path)
    if (route.hasOwnRoutes()) {
      this.routes = [...this.routes, ...route.routes]
    } else {
      this.routes.push(route)
    }
  }

  render() {
    document.querySelector('root').append(this)
  }

  showRoutes() {
    console.log(this.routes)
  }

  initRouting() {
    return new Routing(this)
  }

  clear() {
    this.innerHTML = ''
  }
}

customElements.define('root-module', MyApp)
