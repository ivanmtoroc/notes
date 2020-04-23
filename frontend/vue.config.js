const { InjectManifest } = require('workbox-webpack-plugin')

module.exports = {
  devServer: {
    watchOptions: {
      poll: true
    },
    disableHostCheck: true
  },
  configureWebpack: {
    output: {
      filename: 'static/js/app.js'
    },
    plugins: [
      new InjectManifest({
        swSrc: './public/service-worker.js',
        exclude: [/\.map$/, /img\/icons\//, /favicon\.ico$/, /^manifest.*\.js?$/]
      })
    ]
  },
  outputDir: './dist/',
  assetsDir: 'static'
}
