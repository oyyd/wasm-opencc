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
    if (res.ok) {
      return res.text()
    }

    throw new Error(`faield to fetch: ${sourceName}`)
  })
}

function getSource(proxy, files, sourceName_) {
  if (files[sourceName_]) {
    return files[sourceName_]
  }

  let p

  if (typeof proxy === 'function') {
    p = proxy(sourceName_)
  } else if (IS_NODE) {
    p = getByFs(sourceName_)
  } else {
    p = getByFetch(`dict/${sourceName_}`)
  }

  files[sourceName_] = p

  return p
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

    this.proxy = proxy
  }

  get() {
    const { proxy } = this
    let segmentationString
    const convertionStrings = []

    return new Promise((resolve, reject) => {
      const config = CONFIG[this.sourceName]
      const { segmentation, convertionChain } = parse(config)

      // TODO: refactor
      const files = {}
      const tasks = []
      let error = null

      const setError = (p) => {
        p.catch(e => {
          console.log('catch', e)
          error = e
        })

        return p
      }

      const getSegmentation = setError(getSource(proxy, files, segmentation).then(str => {
        segmentationString = str
      }))

      tasks.push(getSegmentation)

      convertionChain.forEach(item => {
        if (Array.isArray(item)) {
          const list = []

          convertionStrings.push(list)

          item.forEach(source => {
            const p = setError(getSource(proxy, files, source).then(str => {
              list.push(str)
            }))
            tasks.push(p)
          })
          return
        }

        const p = setError(getSource(proxy, files, item).then(str => {
          convertionStrings.push(str)
        }))
        tasks.push(p)
      })


      Promise.all(tasks).then(() => {
        if (error) {
          reject(new Error(`DictSource.get failed: ${error.message}`))
          return
        }
        resolve([
          segmentationString,
          convertionStrings,
        ])
      })
    })
  }
}

module.exports = {
  DictSource,
}
