const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = {
  devtool: 'inline-source-map',
  mode: 'development',
  entry: {
    app: path.join(__dirname, 'src/main.ts')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['ts-loader']
      },
      {
        test: /\.obj$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              mimetype: 'application/octet-stream'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin([{
      from: __dirname + '/src/assets',
      to: __dirname + '/dist/assets'
    }])
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: false,
    hot: true,
    host: 'localhost',
    port: 9000,
    stats: 'errors-only',
    // open: true // 自动在浏览器中打开
  },
  resolve: {
    extensions: [
      '.wasm',
      '.mjs',
      '.js',
      '.ts',
      '.json',
      '.jpg',
      '.png',
      '.gif',
      '.bmp',
      '.obj'
    ]
  }
};
module.exports = config;
