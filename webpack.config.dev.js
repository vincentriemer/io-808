var path = require('path');
var webpack = require('webpack');
var NpmInstallPlugin = require('npm-install-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: [
    'eventsource-polyfill',
    'webpack-hot-middleware/client',
    'core-js/es6/reflect',
    'core-js/es7/includes',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
    hotUpdateChunkFilename: "[id].hot-update.js",
    hotUpdateMainFilename: "hot-update.json"
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
    new NpmInstallPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      inject: false,
      cache: false,
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
