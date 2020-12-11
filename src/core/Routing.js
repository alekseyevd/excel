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

    const Template = route.template
    const Module = route.module

    // this.template = route.template
    if (this.shouldChangeTemlate(Template)) {
      // удаляем старый, создаем новый layout (template)
      this.root.clear()

      this.template = new Template(Module)
      this.root.append(this.template)
      // route.render()
    } else {
      // если layout старый, то проверяем пропсы (partials)
      this.template.renderModule(new Module)
    }
  }

  shouldChangeTemlate(Template) {
    return !(this.template instanceof Template)
  }

  findRoute() {
    return this.root.routes.find(route => route.path === Routing.path)
  }

  get temlate() {
    return this.activeTemplate
  }
}

