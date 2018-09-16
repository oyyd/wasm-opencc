const fs = require('fs')
const path = require('path')
const { DIR_FOLDER, getFilesInAFolder } = require('./merge_config')

const DICT_PATH = path.resolve(__dirname, '../../data/dictionary')
const BUILT_DICT_PATH = path.resolve(__dirname, '../../build/rel/data')
const GENERATED_FOLDER = DIR_FOLDER
const DIST_FOLDER = path.resolve(__dirname, '../dist')
const DICT_NAME = 'dict'
const TARGET_FOLDERS = [
  path.resolve(GENERATED_FOLDER, DICT_NAME),
  path.resolve(DIST_FOLDER, DICT_NAME),
]

async function ensureDir(folder) {
  return new Promise((resovle) => {
    fs.mkdir(folder, (err) => {
      resovle()
    })
  })
}

async function copyFile(file, targetPath) {
  return new Promise((resolve, reject) => {
    fs.copyFile(file, targetPath, (err) => {
      if (err) {
        reject(err)
        return
      }
      resolve()
    })
  })
}

async function copyDicts_(dictPath) {
  let files = await getFilesInAFolder(dictPath)
  files = files.filter(i => path.extname(i) === '.txt')

  for (let i = 0; i < TARGET_FOLDERS.length; i += 1) {
    const folder = TARGET_FOLDERS[i]
    await ensureDir(folder)
  }

  for (let i = 0; i < files.length; i += 1) {
    const file = files[i]
    const srcFile = path.resolve(dictPath, file)
    for (let j = 0; j < TARGET_FOLDERS.length; j += 1) {
      const folder = TARGET_FOLDERS[j]
      await copyFile(srcFile, path.resolve(folder, file))
    }
  }
}

async function copyDicts() {
  await copyDicts_(DICT_PATH)
  await copyDicts_(BUILT_DICT_PATH)
}

module.exports = {
  copyDicts,
  DIST_FOLDER,
  copyFile,
  ensureDir,
}

if (module === require.main) {
  copyDicts()
}
