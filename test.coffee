
sequenced = require './'
assert = require 'assert'

given = (value) -> -> Promise.resolve(value)
addSync = (value) -> (previous) -> previous + value
check = (expected) -> (actual) ->
  assert.strictEqual actual, expected
  console.log "OK: #{actual} === #{expected}"
  actual

sequence = sequenced [
  given 20
  check 20
  addSync 40
  check 60
]

sequence.run()
  .then -> console.log('OK!')
  .catch (e) -> setTimeout (-> throw e), 0
