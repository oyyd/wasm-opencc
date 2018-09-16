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

  it('should set getSource implmentation by setDictProxy', () => {
    const sourceName = 's2t.json'
    const dictSource = new DictSource(sourceName)
    let called = 0

    dictSource.setDictProxy((name) => {
      called += 1
      return `${name} content`
    })

    dictSource.get().then(([a, b]) => {
      expect(called).toBe(3)
      expect(typeof a).toBe('string')
      expect(Array.isArray(b))

      done()
    }).catch(err => {
      setTimeout(() => {
        throw err
      })
    })
  })

  it('should trigger catch when failing to get source', (done) => {
    const sourceName = 's2t.json'
    const dictSource = new DictSource(sourceName)
    let called = 0

    dictSource.setDictProxy((name) => {
      return Promise.reject(new Error('fail'))
    })

    dictSource.get().then(([a, b]) => {
      throw new Error()
    }).catch(err => {
      done()
    })
  })
})
