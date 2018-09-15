const config = require('../generated/config')
const M = require('./Module')

class Converter {
  constructor() {

  }

  createFromSource() {

  }

  createFromDictsString(segmentationStrings, convertionStrings) {
    if (!M.isReady()) {
      throw new Error('Try to create a Converter but the script is not ready.')
    }

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
