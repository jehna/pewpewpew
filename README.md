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
import { compose, map } from 'pewpewpew'

compose(
  document.body.addEventListener.bind(null, 'click'),
  map(e => e.target.innerHTML)
  console.log
)
```

This example script imports the `compose` and `map` functions from the pewpewpew
package, starts listening to any `click` events happening at the page, and
reports the HTML of any clicked element to the console.

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
