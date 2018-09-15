const fs = require('fs')
const path = require('path')

const DIR_FOLDER = path.resolve(__dirname, '../generated/')
const PREFIX = path.resolve(__dirname, '../../data/config')
const TARGET_PATH = path.resolve(DIR_FOLDER, './config.js')

async function getFilesInAFolder(dirpath) {
  return new Promise((resolve, reject) => {
    fs.readdir(dirpath, (err, files) => {
      if (err) {
        reject(err)
        return
      }

      resolve(files)
    })
  })
}

async function getConfigFileNames() {
  return getFilesInAFolder(PREFIX).then(files => {
    return files.filter(i => path.extname(i) === '.json')
  })
}

async function getFileContent(name) {
  const filePath = path.resolve(PREFIX, `./${name}`)

  return new Promise((resolve, reject) => {
    fs.readFile(filePath, {
      encoding: 'utf8',
    }, (err, content) => {
      if (err) {
        reject(err)
        return
      }
      resolve(content)
    })
  })
}

async function getAllConfigFiles() {
  const fileNames = await getConfigFileNames()
  const fileConfigByNames = {}

  for (let i = 0; i < fileNames.length; i += 1) {
    const name = fileNames[i]
    const file = await getFileContent(name)

    fileConfigByNames[name] = JSON.parse(file)
  }

  return fileConfigByNames
}

async function writeFile(targetPath, string) {
  return new Promise((resolve, reject) => {
    fs.writeFile(targetPath, string, (err) => {
      if (err) {
        reject(err)
        return
      }

      resolve()
    })
  })
}

async function main() {
  const fileConfigByNames = await getAllConfigFiles()

  const content = `module.exports = ${JSON.stringify(fileConfigByNames)}`

  return writeFile(TARGET_PATH, content)
}

module.exports = {
  DIR_FOLDER,
  mergeConfig: main,
  writeFile,
  getFilesInAFolder,
}

if (module === require.main) {
  main().catch(err => setTimeout(() => {
    throw err
  }))
}
