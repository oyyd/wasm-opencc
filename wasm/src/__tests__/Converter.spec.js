const { ready } = require('../')
const { Converter } = require('../Converter')

const CHARACTERS = '凉\t涼\n'
const PHRASE = '冬暖夏凉\t冬暖夏涼\n'
const SEGS = [CHARACTERS]
const CONVERTIONS = [CHARACTERS, PHRASE]

describe('Converter', () => {
  describe('constructor', () => {
    it('should create new instances', () => {
      const instance = new Converter()

      instance.delete()
    })
  })

  describe('createFromDictsString', () => {
    it('should create wasmConverter by passing strings', (done) => {
      ready().then(() => {
        const instance = new Converter()
        instance.createFromDictsString(SEGS, CONVERTIONS)
        expect(instance.convert('冬暖夏凉'), '冬暖夏涼')
        instance.delete()
        done()
      })
    })
  })
})
