'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _server2 = _interopRequireDefault(_server);

var _App = require('./App');

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function template(content) {
  return '\n  <!DOCTYPE html>\n  <html>\n    <head>\n      <title>wasm-opencc\u5F00\u653E\u4E2D\u6587\u8F6C\u6362wasm\u7248\u672C\uFF0C\u53EF\u5728\u6D4F\u89C8\u5668\u4E2D\u76F4\u63A5\u8FD0\u884C\u3002</title>\n      <meta charset="utf-8" />\n      <link rel="stylesheet" href="./codemirror.css" />\n    </head>\n    <body>\n      <div id="main">' + content + '</div>\n      <script src="./opencc-asm.js"></script>\n      <script src="./index.js"></script>\n    </body>\n  </html>\n  ';
}

function main() {
  var content = _server2.default.renderToString(_react2.default.createElement(_App2.default, null));

  _fs2.default.writeFile(_path2.default.resolve(__dirname, '../index.html'), template(content), function (err) {
    if (err) {
      throw err;
    }
  });
}

main();