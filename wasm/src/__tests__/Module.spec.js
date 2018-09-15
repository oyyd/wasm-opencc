const { isReady, readyPromise } = require('../Module')

describe('Module', () => {
  it('should resolve the promise when ready', (done) => {
    expect(isReady()).toBe(true)
    readyPromise.then(done)
  })
})
