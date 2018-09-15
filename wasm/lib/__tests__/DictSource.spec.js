'use strict';

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
  });
});