export class EventEmitter {
  constructor() {
    this.listeners = {}
  }

  emit(event, ...args) {
    console.log(event.type, event.target)
    if (!Array.isArray(this.listeners[event.type])) {
      return false
    }

    this.listeners[event.type].forEach(fn => {
      fn(event.target, ...args)
    })
    return true
  }

  subscribe(eventName, $parent, fn) {
    this.listeners[eventName] = this.listeners[eventName] || []
    const func = ($target, ...args) => {
      if ($target === $parent) fn(...args)
    }
    this.listeners[eventName].push(func)

    return () => {
      this.listeners[eventName].filter(el => el !== fn)
    }
  }
}


