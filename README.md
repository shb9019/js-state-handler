# JS State Handler

> A simple state handler with rendering functionality

# Installation

JS State Handler can be installed via npm

```
npm install js-state-handler --save
```

# Usage

JS State Handler can be used in ES6 modules via `import`.

#### Basic Usage

```js
import StateHandler from 'js-state-handler'

// Create
const MyStateHandler = new StateHandler({
  loading: true,
  name: 'Peter'
})

// This function will handling the rendering of a new person
function renderPerson () {
  const name = MyStateHandler.state.name
  document.getElementById('person').innerHTML = name
}

// This function will handling the rendering of the loader
function renderLoader () {
  const loader = document.getElementById('loader')
  const isLoading = MyStateHandler.state.loading
  const displayStyle = (isLoading) ? 'block' : 'none'

  loader.style.display = displayStyle
}

// add the defined functions to the StateHandler
// these functions will run as soon as the state is changed
MyStateHandler.addFunctionToRenderer([renderPerson, renderLoader])

// Initial render
MyStateHandler.renderNewState()

// Update the state as soon as the window finished loading
window.addEventListener('load', function () {
  MyStateHandler.setState({
    loading: false,
    name: 'Louis'
  })
})
```

#### Usage in a class

```js
import StateHandler from 'js-state-handler'

class Organisation {
  constructor () {
    // Get HTML elements for adding event listeners
    this.closedValue = document.getElementById('closed-val')
    this.closeNow = document.getElementById('close-now-button')
    this.openNow = document.getElementById('open-now-button')

    // Initialise the StateHandler and add this.renderClosedState to the render functions
    this.stateHandler = new StateHandler({
      closed: false
    }, [ this.renderClosedState ])

    // Add event listener
    this.closeNow.addEventListener('click', this.close)
    this.openNow.addEventListener('click', this.open)
  }

  // Run on close click
  close = () => {
    this.stateHandler.setState({
      closed: true
    })
  }

  // Run on open click
  open = () => {
    this.stateHandler.setState({
      closed: false
    })
  }

  // This will be run by the StateHandler since we added it in the constructor
  renderClosedState = () => {
    const text = (this.stateHandler.state.closed) ? 'Closed' : 'Open'
    this.closedValue.innerHTML = text
  }
}
```

# Accessing the State

You can always access all state values via `StateHandler.state` like that.

```js
import StateHandler from 'js-state-handler'

const MyState = new StateHandler({
  apples: 0
})

function addApple () {
  MyState.setState({
    apples: MyState.state.apples++
  })
}
```

# Other Functions

All functions can be access from the `StateHandler` class directly.

#### `StateHandler.renderCurrentState()`
> Renders all functions of the current state

```js
MyState.renderCurrentState()
```

---

#### `StateHandler.setState(object)`
> Overwrites state keys with new values

```js
MyState.setState({
  apple: 1,
  banana: 5
})
```

---

#### `StateHandler.addFunctionToRenderer(function or array)`
> Adds a single function or an array of functions to the renderer

```js
function doSomething () {
  // do stuff
}

function doSomethingElse () {
  // do something else
}

function beAwesome () {
  // i am awesome
}

// Add a single function
MyState.addFunctionToRenderer(doSomething)

// Add multiple functions
MyState.addFunctionToRenderer([
  doSomethingElse,
  beAwesome
])
```

## Why?

I used a state-like approach in a project which is based on PHP and CustomElements. Instead of changing styles directly I liked a more readable approach to change states.

Since I used it in multiple components, I had to copy it over and over to the point I got annoyed and decided to extract it to it's own package.

## Todo

* [ ] Bind relations between states and functions to allow specific rendering
* [ ] Allow usage outside of ES6 via CommonJS
