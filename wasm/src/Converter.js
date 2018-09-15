const config = require('../generated/config')
const M = require('./Module')

class Converter {
  constructor() {

  }

  createFromSource() {

  }

  checkReady() {
    if (!M.isReady()) {
      throw new Error('Try to create a Converter but the script is not ready.')
    }
  }

  createFromDictsString(segmentationStrings, convertionStrings) {
    this.checkReady()

    const wasmConverter = new M.Wasm()

    segmentationStrings.forEach((str) => {
      wasmConverter.pushSegmentation(str)
    })

    convertionStrings.forEach((str) => {
      wasmConverter.pushConversion(str)
    })

    wasmConverter.createConverter()

    this.wasmConverter = wasmConverter
  }

  convert(...args) {
    this.checkReady()
    return this.wasmConverter.convert(...args)
  }

  delete() {
    if (!this.wasmConverter) {
      return
    }

    this.wasmConverter.delete()
  }
}

module.exports = {
  Converter,
}
