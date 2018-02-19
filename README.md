# Pewpewpew 💥

> RxJS/BaconJS, but with pure functions without OOP

I love RxJS/BaconJS, but they both use an object/class as the base of the
stream. I think a small `compose` function should be able to do the same
nowadays. Without magic.

**Note!**<br />
🚧 Work in progress 🚧

## Getting started

This package is not yet available at NPM, but when it is, you can install it by
typing:

```shell
npm install pewpewpew --save
```

This will install pewpewpew as a dependency to your current project. After that
you can just include the functions you need with standard ES module imports:

```js
import { compose, map } from '@pewpewpew/core'

compose(
  document.body.addEventListener.bind(null, 'click'),
  map(e => e.target.innerHTML)
  console.log
)
```

This example script imports the `compose` and `map` functions from the pewpewpew
package, starts listening to any `click` events happening at the page, and
reports the HTML of any clicked element to the console.

### React example

Here's a React example, since this project includes a functional wrapper for
handling React's local state:

```js
import React from 'react'
import { compose, throttle, map } from '@pewpewpew/core'
import { bind } from '@pewpewpew/react'

function MyCounter (increment, incrementThrottled, value) {
  return (
    <div>
      <button type="button" onClick={increment}>Add one</button>
      <button type="button" onClick={incrementThrottled}>Add one (throttled)</button>
      <div>
        Value: {value}
      </div>
    </div>
  )
}

function mapStateToProps ({ value }, setState) {
  return {
    value,
    increment: () => setState({ value: value + 1 })
    incrementThrottled: compose(
      throttle(300),
      setState({ value: value + 1 })
    )
  }
}

export default bind(mapStateToProps, { value: 0 })(MyCounter)
```

This creates a simple counter that displays a value. You have two buttons to
increment the counter: One that increments every time, and one that increments
only once every 300 milliseconds.

With pewpewpew you can easily create functional streams that can be throttled,
debounced, mapped, tapped and bound to a component.

Never write ugly React component states again! Just use pewpewpew.

## Testing

The test site should cover a lot of use cases. You can run the tests by running:

```shell
npm test
```

This runs all mocha tests from the `test/` directory.

## Features

This project compares pretty well to RxJS, BaconJS or Kefir, with the following
distinctive features:

* Purely functional
* No objects to hold your state, just closures
* Works with native JS promises
* No magic, just simple functions
* Written using ES modules = tree-shakeable = use only what you need
* Zero dependencies (on core)

## Contributing

At the moment this is a highly unstable project with sort-of-a clear heading.
Giving me a star 🌟 on Github helps to keep the motivation.

If you'd like to contribute, please hack away! Perhaps at this stage it's safe
to open an issue to discuss any ideas that you might have before implementing
them.

Or you can just implement your idea and open a pull request if you're that kind
of a guy. I'd appreciate it.

## Links

* Project homepage + repo: https://github.com/jehna/pewpewpew/
* Related projects:
  * RxJS: https://github.com/Reactive-Extensions/RxJS
  * BaconJS: https://baconjs.github.io/
  * Kefir.js: http://kefirjs.github.io/kefir/

## Licensing

The code in this project is licensed under MIT license.
