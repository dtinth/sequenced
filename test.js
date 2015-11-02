
var sequenced = require('./')
var assert = require('assert')

const given = value => () => Promise.resolve(value)
const addSync = value => previous => previous + value
const check = expected => actual => {
  assert.strictEqual(actual, expected)
  console.log('OK: ' + actual + ' === ' + expected)
  return actual
}

const sequence = (sequenced
  (given(20))
  (check(20))
  (addSync(40))
  (check(60))
)

void (sequence.run()
  .then(() => console.log('OK!'))
  .catch(e => setTimeout(() => { throw e }, 0))
)
