const path = require('path');
const common = require('./webpack.common.js');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(
  common,
  {
    mode: 'development',
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    devServer: {
      contentBase: path.join(__dirname, "dist"),
      port: 9000
    },
    devtool: false,
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/template.html',
        minify: false
      })
    ],
    module: {
      rules: [
        {
          test: /\.scss$/i,
          use: [
            'style-loader',  // 3. Inject styles into DOM
            'css-loader',    // 2. Turns CSS into JS
            'sass-loader'    // 1. Turns SASS into CSS
          ]
        },
      ]
    }
  }
);