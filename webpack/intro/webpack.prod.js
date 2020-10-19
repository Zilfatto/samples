const path = require('path');
const common = require('./webpack.common.js');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(
  common,
  {
    mode: 'production',
    output: {
      filename: '[name]-[contenthash].bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/template.html',
        minify: {
          collapseWhitespace: true,
          removeComments: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true
        }
      }),
      new MiniCssExtractPlugin({
        filename: '[name]-[contenthash].css'
      }),
      new CleanWebpackPlugin()
    ],
    module: {
      rules: [
        {
          test: /\.scss$/i,
          use: [
            MiniCssExtractPlugin.loader,  // 3. Extract CSS into files
            'css-loader',    // 2. Turns CSS into JS
            'sass-loader'    // 1. Turns SASS into CSS
          ]
        }
      ]
    },
    optimization: {
      minimizer: [
        new CssMinimizerPlugin(),
        new TerserPlugin()
      ]
    }
  }
);