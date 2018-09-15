'use strict';

var _require = require('../index'),
    ready = _require.ready;

describe('Module', function () {
  it('should resolve the promise when ready', function (done) {
    ready().then(done);
  });
});