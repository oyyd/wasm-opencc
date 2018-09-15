// NOTE: There are ploblems with chrome, uglifyjs, and embind
// so that we concat wasm files directly.
const fs = require('fs')
const path = require('path')
const { writeFile } = require('./merge_config')
const { JS_FILE_NAME } = require('./generate')

async function getFileContent(filePath) {
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

async function main() {
  const targetFile = path.resolve(__dirname, `../dist/${JS_FILE_NAME}`)
  const asmContent = await getFileContent(path.resolve(__dirname, `../generated/${JS_FILE_NAME}`))
  const content = await getFileContent(targetFile)

  return writeFile(targetFile, `${content};\n// WASCM_CONTENT\n ${asmContent};`)
}

main()
