// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  entries: {
    common: './src/styles/common.scss',
    login: './src/apps/login/main.js',
    attractionDetail: './src/apps/attractionDetail/main.js',
    routeDetail: './src/apps/routeDetail/main.js',
    friendRecommend: './src/apps/friendRecommend/main.js',
    addRecommend: './src/apps/addRecommend/main.js',
    search: './src/apps/search/main.js',
    // recommend: './src/apps/recommend/main.js',
    photoDetail: './src/apps/photoDetail/main.js'
  },
  htmlTemplates: {
    login: './src/apps/login/index.html',
    attractionDetail: './src/apps/attractionDetail/index.html',
    routeDetail: './src/apps/routeDetail/index.html',
    friendRecommend: './src/apps/friendRecommend/index.html',
    addRecommend: './src/apps/addRecommend/index.html',
    search: './src/apps/search/index.html',
    // recommend: './src/apps/recommend/index.html',
    photoDetail: './src/apps/photoDetail/index.html'
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
