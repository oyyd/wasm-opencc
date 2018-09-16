const path = require('path');

module.exports = {
  // mode: 'production',
  entry: path.resolve(__dirname, './src/index.js'),
  output: {
    filename: 'index.js',
    path: __dirname,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: ['node_modules'],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['babel-preset-react', 'babel-preset-env'],
          },
        },
      },
    ],
  },
};
