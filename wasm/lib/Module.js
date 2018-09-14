'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// TODO: babel polyfill
// `Module` for Embind.
var _require = require('./utils'),
    IS_NODE = _require.IS_NODE;

var NAME_ON_WINDOW = 'OpenCCWasm_';
var EMBIND_MODULE_NAME = 'EmbindModule_';

var ready = null;

var Module = _defineProperty({
  NAME_ON_WINDOW: NAME_ON_WINDOW,
  EMBIND_MODULE_NAME: EMBIND_MODULE_NAME,
  ready_: IS_NODE,
  isReady: function isReady() {
    return Module.ready_;
  },
  readyPromise: new Promise(function (resolve) {
    if (IS_NODE) {
      resolve();
      return;
    }
    ready = resolve;
  })
}, EMBIND_MODULE_NAME, {
  // `onRuntimeInitialized` won't be called on Node.
  onRuntimeInitialized: function onRuntimeInitialized() {
    Module.ready_ = true;
    ready(this);
  }
});

if (!IS_NODE) {
  window[NAME_ON_WINDOW] = Module;
} else {
  var M = require('../generated/opencc-asm.js');
  Object.assign(Module[EMBIND_MODULE_NAME], {
    Wasm: M.Wasm
  });
}

module.exports = Module;