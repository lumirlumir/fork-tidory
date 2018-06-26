/**
 * @author Mansu Jeong
 * @description 
 * Copyright (c) Mansu Jeong. All rights reserved.
 * 
 * Ref. https://webpack.js.org/configuration/dev-server/
 * Webpack. https://webpack.js.org/
 * 
 * Author. Mansu Jeong
 * Homepage. http://www.tidory.com
 * Github. https://github.com/pronist/
 */

const wd = process.cwd();

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackBaseConfig = require(path.resolve(wd, './webpack.base.conf'));
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TidoryBuildWebpackPlugin = require('./webpack.build.plugin');

module.exports = merge(webpackBaseConfig, {
  output: {
		filename: 'tidory.bundle.js',
    path: path.resolve(wd, './dist/images'),
    publicPath: "./images"
  },
  stats: "errors-only",
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { discardComments: { removeAll: true } },
      canPrint: true
    }),
    new CopyWebpackPlugin([{ from: 'images', to: './' }]),
    new CopyWebpackPlugin([{ from: 'docs', to: '../' }]),
    new HtmlWebpackPlugin({
      template: path.resolve(wd, './index.pug'),
      filename: path.resolve(wd, './dist/skin.html'),
      inject: true,
      dev: false,
      minify: {
        removeComments: false,
        collapseWhitespace: true,
        caseSensitive: true
      }
		}),
		new TidoryBuildWebpackPlugin()
  ]
});