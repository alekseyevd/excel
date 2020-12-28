import {html} from './html'

export default function register(type, Class) {
  customElements.define(type, Class)

  return (props) => {
    return html(type, props)
  }
}

// function registerTag(type, Class) {
//   const f = (props) => {
//     return html(type, props)
//   }
//   Class.prototype.constructor.html = f
//   customElements.define(type, Class)
// }
