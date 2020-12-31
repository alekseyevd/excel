export class EventEmitter {
  constructor() {
    this.listeners = {}
  }

  emit(event, ...args) {
    // if (!Array.isArray(this.listeners[event.type])) {
    //   return false
    // }

    // this.listeners[event.type].forEach(fn => {
    //   fn(event.target, ...args)
    // })
    // return true
    if (!this.listeners[event.type]) return false

    const fn = this.listeners[event.type].get(event.target)
    if (fn) {
      fn(event, ...args)
      return true
    }
  }

  subscribe(eventName, $parent, fn) {
    // this.listeners[eventName] = this.listeners[eventName] || []
    // const func = ($target, ...args) => {
    //   if ($target === $parent) fn(...args)
    // }
    // this.listeners[eventName].push(func)

    // return () => {
    //   this.listeners[eventName].filter(el => el !== func)
    // }
    this.listeners[eventName] = this.listeners[eventName] || new Map()
    this.listeners[eventName].set($parent, fn)
  }
}


