var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var FaviconsWebpackPlugin = require('favicons-webpack-plugin');
var OfflinePlugin = require('offline-plugin');

module.exports = {
  devtool: 'source-map',
  entry: [
    'core-js/es6/symbol',
    'core-js/es6/reflect',
    'core-js/fn/array/includes',
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
      { test: /\.js$/, loaders: ['babel'], include: path.join(__dirname, 'src') },
      { test: /\.(otf|eot|svg|ttf|woff|woff2).*$/, loader: 'url?limit=8192' }
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
    new FaviconsWebpackPlugin({
      logo: './base-favicon.png',
      inject: true,
      background: '#363830',
      title: 'iO-808',
      icons: {
        android: true,
        appleIcon: true,
        appleStartup: true,
        coast: false,
        favicons: true,
        firefox: true,
        opengraph: false,
        twitter: true,
        yandex: false,
        windows: true
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
      title: 'iO-808'
    }),
    new ExtractTextPlugin('styles.css'),
    new OfflinePlugin()
  ],
  resolve: {
    root: [
      path.resolve('./node_modules'),
      path.resolve('./src')
    ]
  }
};
