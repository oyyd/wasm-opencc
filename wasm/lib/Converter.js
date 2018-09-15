'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var config = require('../generated/config');
var Module = require('./Module');

var Converter = function () {
  function Converter() {
    _classCallCheck(this, Converter);
  }

  _createClass(Converter, [{
    key: 'createFromSource',
    value: function createFromSource() {}
  }, {
    key: 'createFromDictsString',
    value: function createFromDictsString(segmentationStrings, convertionStrings) {
      var _this = this;

      if (!Module.isReady()) {
        throw new Error('Try to create a Converter but the script is not ready.');
      }

      var wasmConverter = new Module.Wasm();

      segmentationStrings.forEach(function (str) {
        _this.wasmConverter.pushSegmentation(str);
      });

      convertionStrings.forEach(function (str) {
        _this.wasmConverter.pushConversion(str);
      });

      this.wasmConverter.createConverter();

      this.wasmConverter = wasmConverter;
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