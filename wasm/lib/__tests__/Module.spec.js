'use strict';

var _require = require('../Module'),
    isReady = _require.isReady,
    readyPromise = _require.readyPromise;

describe('Module', function () {
  it('should resolve the promise when ready', function (done) {
    expect(isReady()).toBe(true);
    readyPromise.then(done);
  });
});