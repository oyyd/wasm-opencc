'use strict';

// TODO: babel polyfill
// `Module` for Embind.
var _require = require('./utils'),
    IS_NODE = _require.IS_NODE;

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

if (!IS_NODE) {
  window.Module = Module;
} else {
  var M = require('../generated/asm');
  Object.assign(Module, {
    Wasm: M.Wasm
  });
}

module.exports = Module;