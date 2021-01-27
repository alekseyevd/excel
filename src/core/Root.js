import {Component} from './Component'
import Element from '../El'
import {html} from '../html'
import Layout from './Layout'
import {Routing} from './Routing'
import {params as urlParams} from './Params'

export class Root extends Component {
  constructor() {
    super()
    // to-do Routing
    this.render = this.render.bind(this)
    window.addEventListener('hashchange', this.render)
  }

  template() {
    // return (
    //   <>
    //     <h1>Hello world</h1>
    //     {/* <Element></Element> */}
    //     <Layout partials={this.partials}/>
    //   </>
    // )

    return (
      <Switch redirect={Element}>
        <Route hash="" layout={Layout} partials={['top']} view={Element} />
        <Route hash="test">
          <Route hash="[id]" layout={Layout} />
        </Route>
      </Switch>
    )
  }
}

function Switch(props, children, index = 0, params = {}) {
  // to-do find route
  // console.log(children);
  const path = Routing.path.split('/')
  // console.log(path[index]);
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

      if (!route.layout || route.layout === null) return props.redirect()

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
    console.log('not found');
    return props.redirect()
  }
}

function Route(props, children) {
  return {
    hash: props.hash,
    layout: props.layout,
    partials: props.partials || [],
    view: props.view,
    children
  }
}

customElements.define('root-component', Root)
