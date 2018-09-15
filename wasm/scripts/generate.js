const path = require('path')
const fs = require('fs')
const { writeFile, getFile, mergeConfig, DIR_FOLDER } = require('./merge_config')
const { ensureDir, copyFile, DIST_FOLDER } = require('./copy_dicts')
const { JS_FILE_NAME, concatFile } = require('./concat')
const { EMBIND_MODULE_NAME, NAME_ON_WINDOW } = require('../src/Module')

const MEM_FILE_NAME = `${JS_FILE_NAME}.mem`

const FILE_NAMES = [
  JS_FILE_NAME,
  MEM_FILE_NAME
]

const BUILT_FILE_PATH = path.resolve(__dirname, `../../build/rel/src/wasm/`)

async function copyBuiltFile(fileName) {
  const file = path.resolve(BUILT_FILE_PATH, fileName)
  const targetPath = path.resolve(DIR_FOLDER, `./${fileName}`)
  return copyFile(file, targetPath)
}

async function copyBuiltFiles() {
  for (let i = 0; i < FILE_NAMES.length; i += 1) {
    const fileName = FILE_NAMES[i]

    await copyBuiltFile(fileName)
  }
}

// NOTE: The compiled file could not recognize Jest environment correctly
// and we don't want to modify code inside in so we wrap it in a function
// and controll it from outside.
async function wrapASMFile() {
  const file = path.resolve(DIR_FOLDER, JS_FILE_NAME)
  const asmContent = await getFile(file)

  return writeFile(file, `(function(window) { var Module = typeof window === 'undefined' ? undefined : window.${NAME_ON_WINDOW}.${EMBIND_MODULE_NAME}; ${asmContent} })(!(typeof global !== 'undefined' && typeof process !== 'undefined' && process.version) ? window : undefined);`)
}

async function copyMemFile() {
  const file = path.resolve(BUILT_FILE_PATH, MEM_FILE_NAME)
  const targetPath = path.resolve(DIST_FOLDER, `./${MEM_FILE_NAME}`)
  return copyFile(file, targetPath)
}

async function main() {
  await ensureDir(DIR_FOLDER)
  await mergeConfig()
  await copyBuiltFiles()
  await wrapASMFile()
  await copyMemFile()
}

module.exports = {
  JS_FILE_NAME,
}

if (module === require.main) {
  main().catch((err) => console.error(err.stack()))
}
