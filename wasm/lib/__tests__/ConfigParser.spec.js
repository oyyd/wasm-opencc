"use strict";

var _require = require('../ConfigParser'),
    parse = _require.parse;

var config = {
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
};

describe('ConfigParser', function () {
  describe('parse', function () {
    it('should parse content correctly', function () {
      var _parse = parse(config),
          segmentation = _parse.segmentation,
          convertionChain = _parse.convertionChain;

      expect(typeof segmentation === 'string').toBe(true);
      expect(Array.isArray(convertionChain)).toBe(true);

      convertionChain.forEach(function (i) {
        expect(Array.isArray(convertionChain) || typeof convertionChain === 'string').toBe(true);
      });
    });
  });
});