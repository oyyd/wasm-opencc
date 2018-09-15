// TODO: babel polyfill
// `Module` for Embind.
const { IS_NODE } = require('./utils')

let ready = null

const Module = {
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
  // `onRuntimeInitialized` won't be called on Node.
  onRuntimeInitialized: function() {
    ready_ = true
    ready(this)
  },
}

if (!IS_NODE) {
  window.Module = Module
} else {
  const M = require('../generated/asm')
  Object.assign(Module, {
    Wasm: M.Wasm,
  })
}

module.exports = Module
