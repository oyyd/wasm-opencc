import fs from 'fs'
import path from 'path'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import App from './App'

function template(content) {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <title>wasm-opencc开放中文转换wasm版本，可在浏览器中直接运行。</title>
      <meta charset="utf-8" />
      <link rel="stylesheet" href="./codemirror.css" />
    </head>
    <body>
      <div id="main">${content}</div>
      <script src="./opencc-asm.js"></script>
      <script src="./index.js"></script>
    </body>
  </html>
  `
}

function main() {
  const content = ReactDOMServer.renderToString(
    <App />
  )

  fs.writeFile(path.resolve(__dirname, '../index.html'), template(content), (err) => {
    if (err) {
      throw err
    }
  })
}

main()
