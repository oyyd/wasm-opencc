const { DictSource } = require('../DictSource')

describe('DictSource', () => {
  it('should throw when passing invalid source key', (done) => {
    try {
      new DictSource('INVALID')
    } catch (e) {
      done()
    }
  })

  it('should get source file content', (done) => {
    const dictSource = new DictSource('s2t.json')

    dictSource.get().then(([a, b]) => {
      expect(typeof a).toBe('string')
      expect(Array.isArray(b))

      done()
    }).catch(err => {
      setTimeout(() => {
        throw err
      })
    })
  })
})
