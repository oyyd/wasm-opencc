const { IS_NODE } = require('./utils')
const CONFIG = require('../generated/config')
const { parse } = require('./ConfigParser')

const SOURCE_KEYS = Object.keys(CONFIG)

function getByFs(sourceName) {
  const fs = require('fs')
  const path = require('path')
  // TODO: Pass this from outside.
  const NODE_DICT_PATH = path.resolve(__dirname, '../generated/dict')

  return new Promise((resolve, reject) => {
    fs.readFile(path.resolve(NODE_DICT_PATH, sourceName), (err, content) => {
      if (err) {
        reject(err)
        return
      }

      resolve(content.toString('utf8'))
    })
  })
}

function getByFetch(sourceName) {
  return fetch(sourceName).then(res => {
    return res.text()
  })
}

function getSource(proxy, sourceName_) {
  const sourceName = IS_NODE ? sourceName_ : `dict/${sourceName_}`

  if (typeof proxy === 'function') {
    return proxy(sourceName)
  }

  if (IS_NODE) {
    return getByFs(sourceName)
  }

  return getByFetch(sourceName)
}

class DictSource {
  constructor(sourceName) {
    if (!SOURCE_KEYS.find(i => i === sourceName)) {
      throw new Error(`invalid source name: ${sourceName}.\n All valid source names are: ${SOURCE_KEYS.join(', ')}`)
    }

    this.sourceName = sourceName
    this.proxy = null
  }

  setDictProxy(proxy) {
    if (typeof proxy !== 'function' && proxy !== null) {
      throw new Error('setDictProxy expect a function or null argument')
    }

    this.proxy
  }

  get() {
    const { proxy } = this
    let segmentationString
    const convertionStrings = []

    // TODO: Cache results.
    return new Promise((resolve, reject) => {
      const config = CONFIG[this.sourceName]
      const { segmentation, convertionChain } = parse(config)

      const tasks = []

      const getSegmentation = getSource(proxy, segmentation).then(str => {
        segmentationString = str
      })

      tasks.push(getSegmentation)

      convertionChain.forEach(item => {
        if (Array.isArray(item)) {
          const list = []

          convertionStrings.push(list)

          item.forEach(source => {
            const p = getSource(proxy, source).then(str => {
              list.push(str)
            })
            tasks.push(p)
          })
          return
        }

        const p = getSource(proxy, item).then(str => {
          convertionStrings.push(str)
        })
        tasks.push(p)
      })


      Promise.all(tasks).then(() => {
        resolve([
          segmentationString,
          convertionStrings,
        ])
      }).catch(err => {
        reject(err)
      })
    })
  }
}

module.exports = {
  DictSource,
}
