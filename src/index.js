export default class StateHandler {
  constructor (initialState = false, initialFn = false) {
    this._state = initialState || {}
    this.functions = []

    if (initialFn) {
      this.addFunctionToRenderer(initialFn)
    }
  }

  set (newState) {
    Object.assign(this._state, newState)
    this.render()
  }

  get (key = false) {
    if (!key) {
      return this._state
    }

    const value = (this._state[key]) ? this._state[key] : false
    return value
  }

  render () {
    for (const fn of this.functions) {
      fn()
    }
  }

  addToRenderer (fn = false) {
    if (!fn && typeof fn !== 'function' && typeof fn !== 'object') {
      console.error('Please provide a function or an array of functions to add them to the renderer')
      return false
    }

    if (typeof fn === 'object') {
      for (const renderFunction of fn) {
        if (typeof renderFunction !== 'function') {
          console.error('The provided data is not a function.')
          return false
        }

        this.functions.push(renderFunction)
      }
    } else {
      this.functions.push(fn)
    }
  }
}
