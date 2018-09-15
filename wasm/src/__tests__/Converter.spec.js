const { ready } = require('../')
const { Converter } = require('../Converter')

const CHARACTERS = '凉\t涼\n'
const PHRASE = '冬暖夏凉\t冬暖夏涼\n'
const SEGS = CHARACTERS
const CONVERTIONS = [CHARACTERS, PHRASE]

describe('Converter', () => {
  describe('constructor', () => {
    it('should throw for invalid arguments', (done) => {
      try {
        const instance = new Converter()
      } catch (err) {
        done()
      }
    })
  })

  describe('createFromDictsString', () => {
    it('should create wasmConverter by passing strings', (done) => {
      const instance = new Converter(SEGS, CONVERTIONS)
      expect(instance.convert('冬暖夏凉')).toEqual('冬暖夏涼')
      instance.delete()
      done()
    })
  })
})
