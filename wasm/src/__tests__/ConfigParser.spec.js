const { parse } = require('../ConfigParser')

const config = {
  "name": "Traditional Chinese (Taiwan standard) to Simplified Chinese (with phrases)",
  "segmentation": {
    "type": "mmseg",
    "dict": {
      "type": "ocd",
      "file": "TSPhrases.ocd"
    }
  },
  "conversion_chain": [{
    "dict": {
      "type": "group",
      "dicts": [{
        "type": "ocd",
        "file": "TWVariantsRevPhrases.ocd"
      }, {
        "type": "ocd",
        "file": "TWVariantsRev.ocd"
      }]
    }
  }, {
    "dict": {
      "type": "ocd",
      "file": "TWPhrasesRev.ocd"
    }
  }, {
    "dict": {
      "type": "group",
      "dicts": [{
        "type": "ocd",
        "file": "TSPhrases.ocd"
      }, {
        "type": "ocd",
        "file": "TSCharacters.ocd"
      }]
    }
  }]
}

describe('ConfigParser', () => {
  describe('parse', () => {
    it('should parse content correctly', () => {
      const { segmentation, convertionChain } = parse(config)

      expect(typeof segmentation === 'string').toBe(true)
      expect(Array.isArray(convertionChain)).toBe(true)

      convertionChain.forEach(i => {
        expect(Array.isArray(convertionChain) || typeof convertionChain === 'string').toBe(true)
      })
    })
  })
})
