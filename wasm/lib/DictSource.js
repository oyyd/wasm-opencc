'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _require = require('./utils'),
    IS_NODE = _require.IS_NODE;

var CONFIG = require('../generated/config');

var _require2 = require('./ConfigParser'),
    parse = _require2.parse;

var SOURCE_KEYS = Object.keys(CONFIG);

function getByFs(sourceName) {
  var fs = require('fs');
  var path = require('path');
  // TODO: Pass this from outside.
  var NODE_DICT_PATH = path.resolve(__dirname, '../generated/dict');

  return new Promise(function (resolve, reject) {
    fs.readFile(path.resolve(NODE_DICT_PATH, sourceName), function (err, content) {
      if (err) {
        reject(err);
        return;
      }

      resolve(content.toString('utf8'));
    });
  });
}

function getByFetch(sourceName) {
  return fetch(sourceName).then(function (res) {
    if (res.ok) {
      return res.text();
    }

    throw new Error('faield to fetch: ' + sourceName);
  });
}

function getSource(proxy, files, sourceName_) {
  if (files[sourceName_]) {
    return files[sourceName_];
  }

  var p = void 0;

  if (typeof proxy === 'function') {
    p = proxy(sourceName_);
  } else if (IS_NODE) {
    p = getByFs(sourceName_);
  } else {
    p = getByFetch('dict/' + sourceName_);
  }

  files[sourceName_] = p;

  return p;
}

var DictSource = function () {
  function DictSource(sourceName) {
    _classCallCheck(this, DictSource);

    if (!SOURCE_KEYS.find(function (i) {
      return i === sourceName;
    })) {
      throw new Error('invalid source name: ' + sourceName + '.\n All valid source names are: ' + SOURCE_KEYS.join(', '));
    }

    this.sourceName = sourceName;
    this.proxy = null;
  }

  _createClass(DictSource, [{
    key: 'setDictProxy',
    value: function setDictProxy(proxy) {
      if (typeof proxy !== 'function' && proxy !== null) {
        throw new Error('setDictProxy expect a function or null argument');
      }

      this.proxy;
    }
  }, {
    key: 'get',
    value: function get() {
      var _this = this;

      var proxy = this.proxy;

      var segmentationString = void 0;
      var convertionStrings = [];

      return new Promise(function (resolve, reject) {
        var config = CONFIG[_this.sourceName];

        var _parse = parse(config),
            segmentation = _parse.segmentation,
            convertionChain = _parse.convertionChain;

        // TODO: refactor


        var files = {};
        var tasks = [];
        var error = null;

        var setError = function setError(p) {
          p.catch(function (e) {
            console.log('catch', e);
            error = e;
          });

          return p;
        };

        var getSegmentation = setError(getSource(proxy, files, segmentation).then(function (str) {
          segmentationString = str;
        }));

        tasks.push(getSegmentation);

        convertionChain.forEach(function (item) {
          if (Array.isArray(item)) {
            var list = [];

            convertionStrings.push(list);

            item.forEach(function (source) {
              var p = setError(getSource(proxy, files, source).then(function (str) {
                list.push(str);
              }));
              tasks.push(p);
            });
            return;
          }

          var p = setError(getSource(proxy, files, item).then(function (str) {
            convertionStrings.push(str);
          }));
          tasks.push(p);
        });

        Promise.all(tasks).then(function () {
          if (error) {
            reject(new Error('DictSource.get failed: ' + error.message));
            return;
          }
          resolve([segmentationString, convertionStrings]);
        });
      });
    }
  }]);

  return DictSource;
}();

module.exports = {
  DictSource: DictSource
};