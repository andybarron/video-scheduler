const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const DEV_MODE = process.env.NODE_ENV !== 'production';
const EXCLUDE = /node_modules/;
const PROD_MODE = !DEV_MODE;

module.exports = {
  mode: DEV_MODE ? 'development' : 'production',
  module: {
    rules: [
      {
        exclude: EXCLUDE,
        loader: 'babel-loader',
        test: /\.mjs$/,
        type: 'javascript/auto', // TODO: 'javascript/esm' breaks default imports?
      },
      {
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
        test: /\.css$/,
      },
    ],
    strictExportPresence: true,
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new ExtractTextPlugin({
      disable: DEV_MODE,
      filename: 'style.css',
    }),
    PROD_MODE && new OptimizeCssAssetsPlugin(),
  ].filter(plugin => plugin),
};