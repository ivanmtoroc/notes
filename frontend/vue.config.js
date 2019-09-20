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
    optimization: {
      splitChunks: false
    }
  },
  filenameHashing: false,
  outputDir: './dist/',
  assetsDir: 'static'
}
