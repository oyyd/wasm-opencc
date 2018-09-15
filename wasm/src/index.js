const Module = require('./Module')
const { Converter } = require('./Converter')
const { DictSource }  = require('./DictSource')

function ready() {
  return Module.readyPromise
}

const index = {
  ready,
  Converter,
  DictSource,
}

Object.assign(Module, index)

module.exports = index
