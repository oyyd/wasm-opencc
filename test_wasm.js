const fs = require('fs')
const path = require('path')
const m = require('./build/rel/src/wasm/opencc_wasm')

const DICT_PATH = path.resolve(__dirname, './data/dictionary/')
const segmentationPaths = [
  path.resolve(DICT_PATH, 'STPhrases.txt'),
]

const conversionDictPaths = [
  path.resolve(DICT_PATH, 'STPhrases.txt'),
  path.resolve(DICT_PATH, 'STCharacters.txt'),
]

const readFile = i => fs.readFileSync(i, {
  encoding: 'utf8',
})

const segmentationTexts = segmentationPaths.map(readFile)
const conversionDictTexts = conversionDictPaths.map(readFile)

const instance = new m.Wasm()

segmentationTexts.forEach(t => instance.createTextDict_(t))
conversionDictTexts.forEach(t => {
  instance.pushConversion_(t)
})

instance.createConverter_()

console.log(instance.convert('一了百当百当百当百当百当当当当'))
