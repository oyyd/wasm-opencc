const { IS_NODE } = require('./utils')
const CONFIG = require('../generated/config')
const { parse } = require('./ConfigParser')

const SOURCE_KEYS = Object.keys(CONFIG)

// TODO: Allow user to proxy fetch function.
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

function getByFetch() {
  // TODO:
}

function getSource(sourceName) {
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
  }

  get() {
    let segmentationString
    const convertionStrings = []

    // TODO: Cache results.
    return new Promise((resolve, reject) => {
      const config = CONFIG[this.sourceName]
      const { segmentation, convertionChain } = parse(config)

      const tasks = []

      const getSegmentation = getSource(segmentation).then(str => {
        segmentationString = str
      })

      tasks.push(getSegmentation)

      convertionChain.forEach(item => {
        if (Array.isArray(item)) {
          const list = []

          convertionStrings.push(list)

          item.forEach(source => {
            const p = getSource(source).then(str => {
              list.push(str)
            })
            tasks.push(p)
          })
          return
        }

        const p = getSource(item).then(str => {
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
