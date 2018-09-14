'use strict';

var EXT_FROM = '.ocd';
var EXT_TO = '.txt';

// NOTE: We will replace all .ocd with .txt.
function replaceExt(str) {
  if (str.indexOf(EXT_FROM) === str.length - EXT_FROM.length) {
    return str.replace(EXT_FROM, EXT_TO);
  }

  return str;
}

function parseDict(obj) {
  if (obj.type === 'group') {
    return obj.dicts.map(function (i) {
      return replaceExt(i.file);
    });
  }

  return replaceExt(obj.file);
}

function parse(json) {
  var segmentation = json.segmentation,
      convertionChain = json.conversion_chain;


  var result = {
    segmentation: parseDict(segmentation.dict),
    convertionChain: convertionChain.map(function (i) {
      return parseDict(i.dict);
    })
  };

  return result;
}

function isValidSegmentationArg(segmentationString) {
  return typeof segmentationString === 'string';
}

function isValidConvertionChainArg(arg) {
  var valid = true;

  if (!Array.isArray(arg)) {
    valid = false;
  }

  arg.forEach(function (i) {
    if (!Array.isArray(i) && typeof i !== 'string') {
      valid = false;
    }
  });

  return valid;
}

module.exports = {
  parse: parse,
  isValidSegmentationArg: isValidSegmentationArg,
  isValidConvertionChainArg: isValidConvertionChainArg
};