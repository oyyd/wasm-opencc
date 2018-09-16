# wasm-opencc

[![npm-version](https://img.shields.io/npm/v/wasm-opencc.svg?style=flat-square)](https://www.npmjs.com/package/wasm-opencc)
[![travis-ribbon](https://travis-ci.com/oyyd/wasm-opencc.svg?branch=master)](https://travis-ci.com/oyyd/wasm-opencc#)

wasm-opencc开放中文转换[OpenCC](https://github.com/BYVoid/OpenCC)的wasm版本。

这个项目对OpenCC进行了添加修改修改，并利用[Emscripten](https://github.com/kripken/emscripten)进行编译，在OpenCC进行中文简繁体转换的能力上具有以下特性：

- 可在浏览器环境中直接运行。（wasm）
- 在node，eletron中运行不需要再进行addon编译，避免复杂的addon部署工作。理论上应该也可以在React Native和Web Worker中运行(未经测试)。（wasm）
- 分离了字典数据的加载和文本转换功能，在浏览器中只加载必要的字典数据，并允许自定义数据加载方式，方便从CDN上加载数据。

## 安装

对于浏览器环境，请直接拷贝dist文件夹中的文件并在浏览器中加载，**注意请一并拷贝dist文件夹下的.mem文件**，该.mem文件为代码运行的必要文件。

```html
<!DOCTYPE html>
<html>
  <head></head>
  <body>
    <script src="./opencc-asm.js"></script>
    <script>
      const { DictSource, Converter } = OpenCCWasm_
      OpenCCWasm_.ready().then(() => {
        // 获取s2t.json字典数据
        const dictSource = new DictSource('s2t.json');
        return dictSource.get();
      }).then((args) => {
        const converter = new Converter(...args)
        console.log(converter.convert('繁体'))
        // 注意当不再需要使用converter时，请调用delete方法以释放内存
        converter.delete()
      })
    </script>
  </body>
</html>
```

相关文件大小（不包含字典文件）：

- opencc-asm.js (655kB, gzip后164kB)
- opencc-asm.js.mem (25kB, gzip后8kB)

当前项目中的wasm代码，实际上是asmjs版本，并非用于浏览器原生WebAssembly的版本。asmjs的版本兼容性更好，WebAssembly版本体积更小（约在在250kB左右）。

对于node环境，可以直接利用npm安装:

```
$ npm i -d wasm-opencc
```

安装后加载使用：

```js
const { DictSource, Converter } = require('wasm-opencc')
const dictSource = new DictSource('s2t.json');

dictSource.get().then(() => {
  const converter = new Converter(...args)
  console.log(converter.convert('繁体'))
  // 注意当不再需要使用converter时，请调用delete方法以释放内存
  converter.delete()
})
```

注意OpenCC本身具有[Node Addon版本](https://www.npmjs.com/package/opencc)，请根据自己的需要选择。

## API

### ready()

在浏览器上，请先调用ready函数，并在结束后再进行`Converter`的相关操作。在Node上不需要等待ready函数结束，直接使用即可。

### class DictSource

#### new DictSource(string dictName)

`DictSource`用于获取字典数据，以初始化`Converter`。如果你熟悉OpenCC中Converter所需要的数据格式，和数据构成结构，你也可以完全避开`DictSource`，直接把字典数据的字符串传递给Converter。

`dictName`所接受的参数请参照：[預設配置文件](https://github.com/BYVoid/OpenCC#configurations-%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6)

#### DictSource.get()

`DictSource.get()`默认会根据运行环境不同，采用不同的方式获取数据。

`DictSource.get()`返回一个Promise，这个Promise在resolve时会返回构建`Converter`所需要的参数的数组，当获取字典数据失败时会reject。返回参数的意义请参照`new Converter()`。

#### DictSource.setDictProxy(function proxy)

自定义获取数据的函数:

```js
const dictSource = new DictSource('s2t.json')

dictSource.setDictProxy((dictName) => {
  // proxy需要返回一个promise
  return Promise.resolve('僞\t偽\n')
})

dictSource.get() // 会调用
```

DictSource会给`proxy`函数传入所需要的字典名称，而`proxy`函数需要返回一个promise以告知DictSource请求结束或请求失败。成功的话需要resolve对应的字典数据内容，失败的话请reject一个`Error`对象。

### class Conveter

#### new Converter(string semgentation, Array<Array<string>|string> convertionChain)

`Converter`用来进行文本转换。

其中semgentation为分词用的数据；convertionChain按顺序定义了转换时所使用的一系列数据字典。

#### Converter.convert(string text)

`Converter.convert`进行文本转换操作，同步操作。

#### Converter.delete()

销毁该实例在wasm中对应对象的实例。**请注意：在不需要使用converter以后，一定要手动调用delete方法销毁内存。**

目前要求用户手动调用delete这点不可避免，这是Embind和目前wasm机制所决定的，可参照[Embind -- Memory Management](https://kripken.github.io/emscripten-site/docs/porting/connecting_cpp_and_javascript/embind.html#memory-management)。

## 已知问题
  - 暂不接受`.ocd`类型的字典数据
  - uglifyjs相关问题：在开发过程中发现，用uglifyjs处理wasm编译的代码后，会导致其在Chrome上无法正常运行（但在safari上可以正常运行）。个人猜测是Chrome引发的问题。
  - 因为上述原因，加之编译后代码本身的一些问题，作者对于在浏览器中运行的文件进行了一些自定义的处理并进行了bundle。如果你的项目要运行在浏览器环境上的话，不建议你对wasm-opencc自己进行bundle。

## 其他可能会实行的计划
  - 进行Benchmark，探究Cpp版本，Node Addon版本和wasm版本之间的性能差距。
  - 提供WebAssembly版本。
  - 用closure进行编译提高效率。

## Contribute

请先安装Emscripten和OpenCC所需依赖，然后：

进行Emscripten编译代码：

```
make -f WasmMakefile
```

构建js相关代码：

```
cd wasm && npm run build
```

构建文档：

```
cd wasm && npm run docs
```

运行测试：

```
cd wasm && npm run test
```

## 闲谈

OpenCC很好，但遗憾的是我们必须开个服务才能使用，而我先前一直想在浏览器上直接运行，对页面的文本直接进行转换。而后发现[tesseract.js](https://github.com/naptha/tesseract.js)是使用Emscripten编译而成，对wasm相关技术的成熟度感到意外，遂有了这个项目。

一开始我没有打算提供node版本的代码，因为@byvoid自己早就做了addon的版本。但后来想到自己在[nysocks](https://github.com/oyyd/nysocks)上经历过的问题，深知addon在维护和部署上的困难，遂一并生成了一份在node运行的版本。

**那么现在Emscripten/WebAssembly是否足够成熟了呢？** 如果你期望的是开箱即用，文档社区齐全，不会碰到太多问题的工具的话，我的想法是没有；但如果你愿意投入时间去解决你会碰到的问题，并且认为WebAssembly本身要解决的问题并不容易的话，我觉得你在使用Emscripten的过程中会觉得它比你使用前所想象的更加成熟一些。而WebAssembly最大的优势诚如其文档所言，你可以直接将生成llvm的项目运行在js环境下。

另外一直听闻Rust社区在WebAssembly这一领域上有所作为。

## License

这个项目在OpenCC的基础上添加了`/src/wasm`文件夹下的代码。原项目中多个文件夹下的CMakeLists.txt都被进行了一定程度上的修改。wasm相关的js代码主要放在`/wasm`文件夹下，为新增代码。`/docs`中的代码用于gh-pages展现文档。

[Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0.html)
