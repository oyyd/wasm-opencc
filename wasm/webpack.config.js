// NOTE: There are ploblems with chrome, uglifyjs, and embind
// so that we concat wasm files directly.
const webpack = require('webpack');
const path = require('path');

module.exports = {
  mode: 'production',
  resolve: {
    alias: {
      Module: path.resolve(__dirname, './src/Module'),
    },
  },
  // mode: 'production',
  entry: path.resolve(__dirname, './src/index.js'),
  output: {
    filename: 'asm.js',
    path: path.resolve(__dirname, './dist'),
  },
  externals: ['fs'],
  module: {
    rules: [
      // {
      //   // webpack loader bug: https://github.com/webpack-contrib/expose-loader/issues/55
      //   test: ASM_FILE,
      //   use: 'imports-loader?Module=Module',
      // },
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
