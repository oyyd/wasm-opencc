const index = require('../index')

describe('index', () => {
  const from = `一旦构造好异常对象，控制流即反向作业（在调用栈向上）直至它抵达 try 块的起点，在该点按出现顺序比较所有关联的 catch 块参数和异常对象的类型，以找到匹配（此过程的细节见 try-catch ）。若找不到匹配，则控制流继续回溯栈，直至下个 try 块，此后亦然。若找到匹配，则控制流跳到匹配的 catch 块。`
  const to = `一旦構造好異常對象，控制流即反向作業（在調用棧向上）直至它抵達 try 塊的起點，在該點按出現順序比較所有關聯的 catch 塊參數和異常對象的類型，以找到匹配（此過程的細節見 try-catch ）。若找不到匹配，則控制流繼續回溯棧，直至下個 try 塊，此後亦然。若找到匹配，則控制流跳到匹配的 catch 塊。`

  it('should have expected keys', () => {
    ['ready', 'Converter', 'DictSource'].forEach((name) => {
      expect(index[name]).toBeTruthy()
    })
  })

  it('should work as an example', (done) => {
    const { Converter, DictSource } = index

    const dictSource = new DictSource('s2t.json')
    dictSource.get().then((args) => {
      const converter = new Converter(...args)

      expect(converter.convert(from)).toBe(to)

      converter.delete()
      done()
    })
  })
})
