var config = require('../config')
var webpack = require('webpack')
var merge = require('webpack-merge')
var utils = require('./utils')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

var htmlPlugins = [];
for (var k in config.htmlTemplates) {
  var filename = k + '.html';
  htmlPlugins.push(
    new HtmlWebpackPlugin({
      filename: filename,
      template: config.htmlTemplates[k],
      inject: true,
      chunks: ['vendor', 'common', k],
      chunksSortMode: function(a, b) {
        if (a.names[0] === 'common' || b.names[0] === 'common') {
          return 0;
        }
        if (a.names[0] > b.names[0]) {
          return 1;
        }
        if (a.names[0] < b.names[0]) {
          return -1;
        }
        return 0;
      }
    })
  );
}

module.exports = merge(baseWebpackConfig, {
  module: {
    loaders: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // eval-source-map is faster for development
  devtool: '#eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ].concat(htmlPlugins)
})
