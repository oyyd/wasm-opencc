// Webpack build for browsers only.
// NOTE: There are ploblems with chrome, uglifyjs, and embind
// so that we concat wasm files directly.
const webpack = require('webpack');
const path = require('path');
const { JS_FILE_NAME } = require('./scripts/generate')

module.exports = {
  mode: 'production',
  resolve: {
    alias: {
      Module: path.resolve(__dirname, './src/Module'),
    },
  },
  entry: path.resolve(__dirname, './src/index.js'),
  output: {
    filename: JS_FILE_NAME,
    path: path.resolve(__dirname, './dist'),
  },
  externals: [
    'fs',
    function(context, request, callback) {
      if (/opencc-asm/.test(request)){
        return callback(null, 'commonjs ' + request);
      }
      callback();
    }
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: ['node_modules'],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['babel-preset-env'],
          },
        },
      },
    ],
  },
};
