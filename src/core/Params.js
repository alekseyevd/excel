class Params {
  constructor() {
    this._params = {}
  }
  set(props) {
    this._params = props
  }

  get(key) {
    return this._params[key]
  }
}

export const params = new Params()
