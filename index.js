'use strict'

module.exports = function sequenced (action) {
  if (arguments.length !== 1) {
    throw new Error('sequenced() only take 1 argument')
  }
  if (Array.isArray(action)) {
    return (action
      .reduce((sequence, nextAction) => sequence(nextAction), sequenced)
    )
  }
  var join = function (anotherAction) {
    if (arguments.length !== 1) {
      throw new Error('sequenced()...() only take 1 argument')
    }
    return sequenced(function () {
      return Promise.resolve(action.apply(this, arguments)).then(anotherAction)
    })
  }
  join.run = function () {
    return Promise.resolve().then(() => action.apply(this, arguments))
  }
  return join
}
