var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: [
    'core-js/es6/reflect',
    'core-js/es7/includes',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'out'),
    filename: 'bundle.js',
    publicPath: ''
  },
  module: {
    loaders: [
      { test: /\.jade$/, loader: 'jade' },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader') },
      { test: /\.js$/, loaders: ['babel'], include: path.join(__dirname, 'src') }
    ]
  },
  postcss: [
    require('autoprefixer')
  ],
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    new HtmlWebpackPlugin({
      inject: false,
      cache: false,
      minify: {
        collapseWhitespace: true,
        html5: true,
        minifyCSS: true,
        minifyJS: true,
        removeComments: true,
        useShortDoctype: true
      },
      template: 'src/index.jade',
      filename: 'index.html',
      title: 'io-808'
    }),
    new ExtractTextPlugin('styles.css')
  ],
  resolve: {
    root: [
      path.resolve('./node_modules'),
      path.resolve('./src')
    ]
  }
};
