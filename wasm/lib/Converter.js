'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var config = require('../generated/config');
var M = require('./Module');

var Converter = function () {
  function Converter() {
    _classCallCheck(this, Converter);
  }

  _createClass(Converter, [{
    key: 'createFromSource',
    value: function createFromSource() {}
  }, {
    key: 'checkReady',
    value: function checkReady() {
      if (!M.isReady()) {
        throw new Error('Try to create a Converter but the script is not ready.');
      }
    }
  }, {
    key: 'createFromDictsString',
    value: function createFromDictsString(segmentationStrings, convertionStrings) {
      this.checkReady();

      var wasmConverter = new M.Wasm();

      segmentationStrings.forEach(function (str) {
        wasmConverter.pushSegmentation(str);
      });

      convertionStrings.forEach(function (str) {
        wasmConverter.pushConversion(str);
      });

      wasmConverter.createConverter();

      this.wasmConverter = wasmConverter;
    }
  }, {
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