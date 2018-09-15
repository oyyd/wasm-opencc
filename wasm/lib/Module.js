'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// TODO: babel polyfill
// `Module` for Embind.
var _require = require('./utils'),
    IS_NODE = _require.IS_NODE;

console.log('IS_NODE', IS_NODE);

var ready = null;

var Module = {
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
  }),
  // `onRuntimeInitialized` won't be called on Node.
  onRuntimeInitialized: function onRuntimeInitialized() {
    ready_ = true;
    ready(this);
  }
};

if (IS_NODE) {
  console.log("require('../generated/asm').Wasm", require('../generated/asm').Wasm);
  Object.assign(Module, {
    // TODO: Make sure this won't be bundled.
    Wasm: require('../generated/asm').Wasm
  });
}

if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) !== undefined) {
  window.Module = Module;
}

module.exports = Module;