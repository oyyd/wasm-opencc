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

const text = `一旦构造好异常对象，控制流即反向作业（在调用栈向上）直至它抵达 try 块的起点，在该点按出现顺序比较所有关联的 catch 块参数和异常对象的类型，以找到匹配（此过程的细节见 try-catch ）。若找不到匹配，则控制流继续回溯栈，直至下个 try 块，此后亦然。若找到匹配，则控制流跳到匹配的 catch 块。`
console.log(instance.convert(text))
