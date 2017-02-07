const path = require('path');
const webpack = require('webpack');
const excluded = /node_modules(\/|\\)((?!(omni-common-ui)).)/;
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './app/app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: excluded,
      loader: {
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-2'],
          cacheDirectory: true,
        },
      },
    }],
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({
      template: './app/index.html',
    }),
  ],
};
