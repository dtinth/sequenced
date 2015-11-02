'use strict'

const sequenced = require('./')

const wait = (value, timeout) => () => {
  return new Promise(resolve => setTimeout(() => resolve(value), timeout))
}

const p = (...prefix) => (thing) => (console.log(...prefix, thing), thing)

const sequence = (sequenced
  (p('go'))
  (wait('wow', 1000))
  (p('one'))
  (wait('doge', 2000))
  (p('two'))
  (wait('cool', 3000))
  (p('done!'))
)

sequence.run()
