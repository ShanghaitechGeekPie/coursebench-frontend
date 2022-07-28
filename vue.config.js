const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = /\.(js|css|json|md|html|ico)(\?.*)?$/i;
const path = require('path')

module.exports = {
  productionSourceMap: false,
  chainWebpack: config => {
    config.plugins.delete('prefetch');
    if (process.env.NODE_ENV === 'production') {
      config.plugin('compressionPlugin')
        .use(new CompressionWebpackPlugin({
          filename: '[path][base].br',
          algorithm: 'brotliCompress',
          test: productionGzipExtensions,
          compressionOptions: {
            level: 11
          }
        }))
    }
  },
  devServer: {
    hot: true,
    port: 8000,
    compress: true
  },
  "transpileDependencies": [
    "vuetify"
  ],
  configureWebpack: {
    cache: {
      type: "filesystem"
    },
    resolve: {
      alias: {
        '@': path.join(__dirname, './src')
      }
    },
    externals: {
      'Config': JSON.stringify({
        // serverUrl: "http://localhost:3500/v1", 
        serverUrl: "https://coursebench.geekpie.club/v1"
        // serverUrl: "https://cb.wa-am.com:2/api/v1"
      })
    },
    module: {
      rules: [
        { 
          test: /\.md$/,
          use: ['./src/plugins/markdown-loader']
        }
      ]
    }
  }
}
