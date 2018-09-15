const Module = require('./Module')
const Converter = require('./Converter')

function ready() {
  return Module.readyPromise
}

module.exports = {
  ready,
  Converter,
}
