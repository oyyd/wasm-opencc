'use strict';

var Module = require('./Module');
var Converter = require('./Converter');

function ready() {
  return Module.readyPromise;
}

module.exports = {
  ready: ready,
  Converter: Converter
};