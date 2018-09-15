'use strict';

var Module = require('./Module');

var _require = require('./Converter'),
    Converter = _require.Converter;

var _require2 = require('./DictSource'),
    DictSource = _require2.DictSource;

function ready() {
  return Module.readyPromise;
}

var index = {
  Converter: Converter,
  DictSource: DictSource
};

Object.assign(Module, index);

index.ready = ready;

module.exports = index;