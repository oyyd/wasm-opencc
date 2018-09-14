'use strict';

// `Module` for Embind.
window.Module = {
  onRuntimeInitialized: function onRuntimeInitialized() {
    console.log('called', Module);
    // console.log('lerp result: ' + Module.lerp(1, 2, 0.5));
  }
};

module.exports = Module;