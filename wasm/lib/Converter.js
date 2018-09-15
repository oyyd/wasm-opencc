'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var config = require('../generated/config');
var M = require('./Module');

var _require = require('./ConfigParser'),
    isValidSegmentationArg = _require.isValidSegmentationArg,
    isValidConvertionChainArg = _require.isValidConvertionChainArg;

function checkReady() {
  if (!M.isReady()) {
    throw new Error('Try to create a Converter but the script is not ready.');
  }
}

function createFromSource_() {}

function createFromDictsString_(converter, segmentationString, convertionStrings) {
  checkReady();

  var wasmConverter = new M.Wasm();

  wasmConverter.pushSegmentation(segmentationString);

  convertionStrings.forEach(function (str) {
    wasmConverter.pushConversion(str);
  });

  wasmConverter.createConverter();

  converter.wasmConverter = wasmConverter;
}

var Converter = function () {
  function Converter() {
    _classCallCheck(this, Converter);

    this.checkReady = checkReady;

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (args.length === 2 && isValidSegmentationArg(args[0]) && isValidConvertionChainArg(args[1])) {
      createFromDictsString_.apply(undefined, [this].concat(args));
      return;
    } else if (args.length === 1 && typeof args[0] === 'string') {
      createFromSource_.apply(undefined, [this].concat(args));
      return;
    }

    throw new Error('Invalid constructor arguments for Converter.');
  }

  _createClass(Converter, [{
    key: 'convert',
    value: function convert() {
      var _wasmConverter;

      this.checkReady();
      return (_wasmConverter = this.wasmConverter).convert.apply(_wasmConverter, arguments);
    }
  }, {
    key: 'delete',
    value: function _delete() {
      if (!this.wasmConverter) {
        return;
      }

      this.wasmConverter.delete();
    }
  }]);

  return Converter;
}();

module.exports = {
  Converter: Converter
};