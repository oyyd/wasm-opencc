const Module = require('./Module')
const { Converter } = require('./Converter')
const { DictSource }  = require('./DictSource')

function ready() {
  return Module.readyPromise
}

const index = {
  Converter,
  DictSource,
}

Object.assign(Module, index)

index.ready = ready

module.exports = index
