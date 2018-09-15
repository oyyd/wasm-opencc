const EXT_FROM = '.ocd'
const EXT_TO = '.txt'

// NOTE: We will replace all .ocd with .txt.
function replaceExt(str) {
  if (str.indexOf(EXT_FROM) === str.length - EXT_FROM.length) {
    return str.replace(EXT_FROM, EXT_TO)
  }

  return str
}

function parseDict(obj) {
  if (obj.type === 'group') {
    return obj.dicts.map(i => replaceExt(i.file))
  }

  return replaceExt(obj.file)
}

function parse(json) {
  const { segmentation, conversion_chain: convertionChain } = json

  const result = {
    segmentation: parseDict(segmentation.dict),
    convertionChain: convertionChain.map(i => parseDict(i.dict))
  }

  return result
}

function isValidSegmentationArg(segmentationString) {
  return typeof segmentationString === 'string'
}

function isValidConvertionChainArg(arg) {
  let valid = true

  if (!Array.isArray(arg)) {
    valid = false
  }

  arg.forEach(i => {
    if (!Array.isArray(i) && typeof i !== 'string') {
      valid = false
    }
  })

  return valid
}

module.exports = {
  parse,
  isValidSegmentationArg,
  isValidConvertionChainArg,
}
