const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';

const excluded = /node_modules(\/|\\)((?!(omni-common-ui)).)/;
const publicPath = 'http://localhost:8000';

module.exports = {
  entry: {
    signIn: ['./client/signIn', hotMiddlewareScript],
    dashboards: ['./client/dashboards', hotMiddlewareScript],
  },
  output: {
    filename: './[name]/bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath,
  },
  devtool: 'source-map',
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
    },
    {
      test: /\.scss$/,
      loader: 'style!css?sourceMap!resolve-url!sass?sourceMap',
    }],
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
};
