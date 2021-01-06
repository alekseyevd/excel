import {html} from './html'

export default function register(type, Class) {
  customElements.define(type, Class)

  return (props) => {
    return html(type, props)
  }
}

