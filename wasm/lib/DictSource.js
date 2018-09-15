'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

// TODO: Allow user to proxy fetch function.
var getByFs = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(sourceName) {
    var fs, path, NODE_DICT_PATH;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            fs = rquire('fs');
            path = require('path');
            // TODO: Pass this from outside.

            NODE_DICT_PATH = path.resolve(__dirname, '../generated/dict');
            return _context.abrupt('return', new Promise(function (resolve, reject) {
              fs.readFile(path.resolve(NODE_DICT_PATH, sourceName), function (err, content) {
                if (err) {
                  reject(err);
                  return;
                }

                resolve(content);
              });
            }));

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getByFs(_x) {
    return _ref.apply(this, arguments);
  };
}();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var _require = require('./utils'),
    IS_NODE = _require.IS_NODE;

var config = require('../generated/config');

var _require2 = require('./ConfigParser'),
    parse = _require2.parse;

var SOURCE_KEYS = Object.keys(config);

function getByFetch() {
  // TODO:
}

function getSource(sourceName) {
  if (IS_NODE) {
    return getByFs(sourceName);
  }

  return getByFetch(sourceName);
}

var DictSource = function () {
  function DictSource(sourceName) {
    _classCallCheck(this, DictSource);

    if (!SOURCE_KEYS.find(function (i) {
      return i === sourceName;
    })) {
      throw new Error('invalid source name: ' + sourceName + '.\n All valid source names are: ' + SOURCE_KEYS.join(', '));
    }

    this.sourceName = sourceName;
  }

  _createClass(DictSource, [{
    key: 'get',
    value: function get() {
      // TODO: Cache results.
      return new Promise(function (resolve, reject) {
        var config = config[sourceName];

        var _parse = parse(config),
            segmentation = _parse.segmentation,
            convertionChain = _parse.convertionChain;
        // ignore .ocd

        var segmentationStrings = [];
        var convertionStrings = [];

        // TODO:
        Promise.all([segmentation, convertion]);

        resolve({
          segmentationStrings: segmentationStrings,
          convertionStrings: convertionStrings
        });
      });
    }
  }]);

  return DictSource;
}();

module.exports = {
  DictSource: DictSource
};