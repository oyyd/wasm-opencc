const IS_NODE = !!(
  typeof global !== 'undefined' &&
  typeof process !== 'undefined' &&
  process.version
);


module.exports = {
  IS_NODE,
}
