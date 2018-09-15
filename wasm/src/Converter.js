const config = require('../generated/config');
const M = require('./Module');
const {
  isValidSegmentationArg,
  isValidConvertionChainArg,
} = require('./ConfigParser');

function checkReady() {
  if (!M.isReady()) {
    throw new Error('Try to create a Converter but the script is not ready.');
  }
}

function createFromDictsString_(
  converter,
  segmentationString,
  convertionStrings,
) {
  checkReady();

  const wasmConverter = new M.Wasm();

  wasmConverter.pushSegmentation(segmentationString);

  convertionStrings.forEach(item => {
    if (Array.isArray(item)) {
      item.forEach(str => {
        wasmConverter.pushConversion(str)
      })
      wasmConverter.createConvertionGroup()
      return
    }

    wasmConverter.pushConversion(item)
    wasmConverter.createConvertionGroup()
  })

  wasmConverter.createConverter();

  converter.wasmConverter = wasmConverter;
}

class Converter {
  constructor(...args) {
    this.checkReady = checkReady;

    if (
      args.length === 2 &&
      isValidSegmentationArg(args[0]) &&
      isValidConvertionChainArg(args[1])
    ) {
      createFromDictsString_(this, ...args);
      return;
    }

    throw new Error('Invalid constructor arguments for Converter.');
  }

  convert(...args) {
    this.checkReady();
    return this.wasmConverter.convert(...args);
  }

  delete() {
    if (!this.wasmConverter) {
      return;
    }

    this.wasmConverter.delete();
  }
}

module.exports = {
  Converter,
};
