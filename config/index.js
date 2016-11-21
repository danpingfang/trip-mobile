// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  entries: {
    common: './src/styles/common.scss',
    routeDetail:'./src/apps/routeDetail/main.js',
    login: './src/apps/login/main.js',
    attractionDetail: './src/apps/attractionDetail/main.js',
    addRecommend: './src/apps/addRecommend/main.js',
    recommend: './src/apps/recommend/main.js',
    recommendDetail: './src/apps/recommendDetail/main.js',
    line: './src/apps/line/main.js',
    nearby: './src/apps/nearby/main.js',
    friendRecommend: './src/apps/friendRecommend/main.js'
  },
  htmlTemplates: {
    login: './src/apps/login/index.html',
    routeDetail: './src/apps/routeDetail/index.html',
    attractionDetail: './src/apps/attractionDetail/index.html',
    addRecommend: './src/apps/addRecommend/index.html',
    recommend: './src/apps/recommend/index.html',
    recommendDetail: './src/apps/recommendDetail/index.html',
    line: './src/apps/line/index.html',
    nearby: './src/apps/nearby/index.html',
    friendRecommend: './src/apps/friendRecommend/index.html'
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
