
sequenced
=========

Abstraction over asynchronous operations in a series.


Why?
----

Even though today’s modern JavaScript provides a lot of tools to make writing
asynchronous code easier, when you want to perform async operations in series,
there’s still a lot of syntax noises.

### Promises

```js
const doThings = () => (Promise.resolve()
  .then(step1)
  .then(step2)
  .then(step3)
  .then(step4)
  .then(step5)
)
```

You see `.then()` everywhere!

### Coroutines

```js
const doThings = Promise.coroutine(function* () {
  const a = yield step1()
  const b = yield step2(a)
  const c = yield step3(b)
  const d = yield step4(c)
  return yield step5(d)
})
```

You see `yield` everywhere, and you have to make sure that every step function returns a Promise.

### Async Functions

```js
async function doThings () {
  const a = await step1()
  const b = await step2()
  const c = await step3()
  const d = await step4()
  return await step5()
}
```

You see `await` everywhere, and you have to keep track of which step can be `await`’ed and which can not.

### sequenced

Using sequenced, it is reduced to:

```js
const doThings = (sequenced
  (step1)
  (step2)
  (step3)
  (step4)
  (step5)
  .run
)
```

You can also use CoffeeScript with alternative syntax

```coffee
doThings = sequenced [
  step1
  step2
  step3
  step4
  step5
]
.run
```


Motivation
----------

A lot of testing frameworks (especially acceptance testing)
come with its own way to handle asynchronity.
For example, [Nightwatch.js](http://nightwatchjs.org/) is very easy to use
because the operations are chainable, and Nightwatch manage the operations queue
by itself.

However, when creating more complex test suites,
I find Nightwatch’s operation queue hard to understand
(they don’t use promises).
When I tried to do some advanced stuff,
such as dropping the developer into an REPL,
so that they can write test suites interactively (like REPL-driven development),
the command doesn’t get run, because it’s waiting for the REPL to finish.

So I also looked at [Webdriver.io](http://webdriver.io/),
because they are Promise/A+ compliant,
but to write a test suite,
you need to switch between chaining and yielding (or `.then()`ing).
The resulting test code is not as elegant as writing in Nightwatch.
Moreover, you don’t get any automatic logging like in Nightwatch.

Most of what these test do is that they run asynchronous operation,
one after the other.
So why not abstract them?

It could look like this:

```js
function test (browser) {
  return (sequenced
    (browser.init())
    (browser.url('https://example.com/'))
    (browser.setValue('.SearchField', 'cats'))
    (browser.click('.SearchButton'))
    (browser.getTitle())
    (assert.match(/meow/))
    .run()
  )
}
```


API
---

```js
const sequenced = require('sequenced')
```


### sequenced(action)... &rarr; SequencedAction

Starts a sequenced action.
