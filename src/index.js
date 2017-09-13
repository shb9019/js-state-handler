export default class StateHandler {
  constructor (initialState = false, initialFn = false) {
    this.state = initialState || {}
    this.functions = []

    if (initialFn) {
      this.addFunctionToRenderer(initialFn)
    }
  }

  setState (newState) {
    Object.assign(this.state, newState)
    this.renderNewState()
  }

  renderNewState () {
    for (const fn of this.functions) {
      fn()
    }
  }

  addFunctionToRenderer (fn = false) {
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
