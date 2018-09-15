'use strict';

var _require = require('../'),
    ready = _require.ready;

var _require2 = require('../Converter'),
    Converter = _require2.Converter;

var CHARACTERS = '凉\t涼\n';
var PHRASE = '冬暖夏凉\t冬暖夏涼\n';
var SEGS = [CHARACTERS];
var CONVERTIONS = [CHARACTERS, PHRASE];

describe('Converter', function () {
  describe('constructor', function () {
    it('should create new instances', function () {
      var instance = new Converter();

      instance.delete();
    });
  });

  describe('createFromDictsString', function () {
    it('should create wasmConverter by passing strings', function (done) {
      ready().then(function () {
        console.log("ENTER");
        var instance = new Converter();
        instance.createFromDictsString(SEGS, CONVERTIONS);
        expect(instance.convert('冬暖夏凉'), '冬暖夏涼');
        instance.delete();
        done();
      });
    });
  });
});