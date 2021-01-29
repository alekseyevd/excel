import {params as urlParams} from './Params'

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
    console.log(route);

    const Template = route.template
    const Module = route.module

    // this.template = route.template
    if (this.shouldChangeTemlate(Template)) {
      // удаляем старый, создаем новый layout (template)
      this.root.clear()

      this.template = new Template({
        module: Module,
        params: route.params,
        partials: route.partials
      })
      this.root.append(this.template)
      // route.render()
    } else {
      // если layout старый, то проверяем пропсы (partials)
      this.template.renderModule(new Module({
        params: route.params
      }))
      this.template.renderPartials(route.partials)
    }
  }

  shouldChangeTemlate(Template) {
    return !(this.template instanceof Template)
  }

  findRoute() {
    return this.root.routes.find(route => route.isActive())
  }

  get temlate() {
    return this.activeTemplate
  }
}

export function Switch(props, children, index = 0, params = {}) {
  try {
    const path = Routing.path.split('/')

    const route = children.find(r => {
      if (r.hash.startsWith('[') && r.hash.endsWith(']')) {
        const key = r.hash.slice(1, -1)
        params[key] = path[index]
        return true
      }
      return r.hash === path[index]
    })
    if (route) {
      if (path[index + 1] !== undefined) {
        // eslint-disable-next-line new-cap
        return Switch(props, route.children, index + 1, params)
      } else {
        urlParams.set(params)

        if (!route.layout || route.layout === null) throw new Error()

        let layoutProps = {}
        if (route.partials) {
          layoutProps = route.partials.reduce((acc, value) => {
            acc[value] = true
            return acc
          }, {
            view: route.view
          })
        }
        // console.log(route);
        return route.layout(layoutProps)
      }
    } else {
      throw new Error()
    }
  } catch (e) {
    window.location.hash = ''
    return {type: ''}
    // props.redirect()
  }
}

export function Route(props, children) {
  return {
    hash: props.hash,
    layout: props.layout,
    partials: props.partials || [],
    view: props.view,
    children
  }
}
