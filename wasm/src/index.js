const Module = require('./Module')
const { Converter } = require('./Converter')
const { DictSource }  = require('./DictSource')

function ready() {
  return Module.readyPromise
}

module.exports = {
  ready,
  Converter,
  DictSource,
}
