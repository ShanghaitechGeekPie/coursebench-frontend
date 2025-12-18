const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = /\.(js|css|json|md|html|ico)(\?.*)?$/i;
const path = require('path');
const process = require('process');
const fs = require('fs');

module.exports = {
  productionSourceMap: false,
  chainWebpack: (config) => {
    config.plugins.delete('prefetch');
    if (process.env.NODE_ENV === 'production') {
      config.plugin('compressionPlugin').use(
        new CompressionWebpackPlugin({
          filename: '[path][base].br',
          algorithm: 'brotliCompress',
          test: productionGzipExtensions,
          compressionOptions: {
            level: 11,
          },
        }),
      );
    }
  },
  devServer: {
    hot: true,
    port: 8000,
    compress: true,
    proxy: {
      '/v1': {
        target: 'http://coursebench.org',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          // '^/v1': ''  // 如果后端不需要/v1前缀，可以移除它
        }
      }
    }
  },
  transpileDependencies: ['vuetify'],
  configureWebpack: {
    cache: {
      type: 'filesystem',
    },
    resolve: {
      alias: {
        '@': path.join(__dirname, './src'),
      },
    },
    externals: {
      Config: JSON.stringify({
        serverUrl: process.env.SERVER,
        buildVersion: process.env.BUILD_VERSION,
        buildMode: process.env.BUILD_MODE,
      }),
      Policy: JSON.stringify({
        privacyPolicy: fs.readFileSync(
          path.join(__dirname, './src/assets/privacy_policy.md'),
          'utf8',
        ),
        termsOfService: fs.readFileSync(
          path.join(__dirname, './src/assets/terms_of_service.md'),
          'utf8',
        ),
        commentPolicy: fs.readFileSync(
          path.join(__dirname, './src/assets/comment_policy.md'),
          'utf8',
        ),
        benchReviewerPolicy: fs.readFileSync(
          path.join(__dirname, './src/assets/bench_reviewer.md'),
          'utf8',
        ),
      }),
    },
    module: {
      rules: [
        {
          test: /\.md$/,
          use: ['./src/plugins/markdown-loader'],
        },
      ],
    },
  },
};
