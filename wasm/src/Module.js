// TODO: babel polyfill
// `Module` for Embind.
const { IS_NODE } = require('./utils')
const NAME_ON_WINDOW = 'OpenCCWasm_'
const EMBIND_MODULE_NAME = 'EmbindModule_'

let ready = null

const Module = {
  NAME_ON_WINDOW,
  EMBIND_MODULE_NAME,
  ready_: IS_NODE,
  isReady: () => {
    return Module.ready_
  },
  readyPromise: new Promise((resolve) => {
    if (IS_NODE) {
      resolve()
      return
    }
    ready = resolve
  }),
  [EMBIND_MODULE_NAME]: {
    // `onRuntimeInitialized` won't be called on Node.
    onRuntimeInitialized: function() {
      Module.ready_ = true
      ready(this)
    },
  },
}

if (!IS_NODE) {
  window[NAME_ON_WINDOW] = Module
} else {
  const M = require('../generated/opencc-asm.js')
  Object.assign(Module[EMBIND_MODULE_NAME], {
    Wasm: M.Wasm,
  })
}

module.exports = Module
