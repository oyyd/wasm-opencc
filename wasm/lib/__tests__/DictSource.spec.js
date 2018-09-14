'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _require = require('../DictSource'),
    DictSource = _require.DictSource;

describe('DictSource', function () {
  it('should throw when passing invalid source key', function (done) {
    try {
      new DictSource('INVALID');
    } catch (e) {
      done();
    }
  });

  it('should get source file content', function (done) {
    var dictSource = new DictSource('s2t.json');

    dictSource.get().then(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          a = _ref2[0],
          b = _ref2[1];

      expect(typeof a === 'undefined' ? 'undefined' : _typeof(a)).toBe('string');
      expect(Array.isArray(b));

      done();
    }).catch(function (err) {
      setTimeout(function () {
        throw err;
      });
    });
  });

  it('should set getSource implmentation by setDictProxy', function () {
    var sourceName = 's2t.json';
    var dictSource = new DictSource(sourceName);
    var called = 0;

    dictSource.setDictProxy(function (name) {
      called += 1;
      return name + ' content';
    });

    dictSource.get().then(function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
          a = _ref4[0],
          b = _ref4[1];

      expect(called).toBe(3);
      expect(typeof a === 'undefined' ? 'undefined' : _typeof(a)).toBe('string');
      expect(Array.isArray(b));

      done();
    }).catch(function (err) {
      setTimeout(function () {
        throw err;
      });
    });
  });
});