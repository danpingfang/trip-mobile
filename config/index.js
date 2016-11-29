// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  entries: {
    common: './src/styles/common.scss',
    login: './src/views/login/main.js',
    recommendAdd: './src/views/recommend/add/main.js',
    recommendList: './src/views/recommend/list/main.js',
    recommendDetail: './src/views/recommend/detail/main.js',
    friendRecommendList: './src/views/recommend/friendList/main.js',
    lineDetail:'./src/views/line/detail/main.js',
    lineMap:'./src/views/line/map/main.js',
    nearby: './src/views/poi/nearby/main.js',
    poiDetail: './src/views/poi/detail/main.js',
    user: './src/views/user/home/main.js',
  },
  htmlTemplates: {
    login: './src/views/login/index.html',
    recommendAdd: './src/views/recommend/add/index.html',
    recommendList: './src/views/recommend/list/index.html',
    recommendDetail: './src/views/recommend/detail/index.html',
    friendRecommendList: './src/views/recommend/friendList/index.html',
    lineDetail:'./src/views/line/detail/index.html',
    lineMap:'./src/views/line/map/index.html',
    nearby: './src/views/poi/nearby/index.html',
    poiDetail: './src/views/poi/detail/index.html',
    user: './src/views/user/home/index.html',
  },
  build: {
    env: require('./prod.env'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: false,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  },
  dev: {
    env: require('./dev.env'),
    port: 8080,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
