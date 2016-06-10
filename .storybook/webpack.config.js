/**
 * Created by vincentriemer on 4/23/16.
 */
var path = require('path');
var NpmInstallPlugin = require('npm-install-webpack-plugin');

module.exports = {
  module: {
    loaders: [
      {
        test: /\.css$/,
        loaders: [
          'style?sourceMap',
          'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]'
        ],
        include: path.resolve(__dirname, '../')
      },
      {
        test: /\.scss$/,
        loaders: [
          'style?sourceMap',
          'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
          'resolve-url',
          'sass?sourceMap'
        ],
        include: path.resolve(__dirname, '../')
      }
    ]
  },
  plugins: [
    new NpmInstallPlugin({
      dev: true
    })
  ]
};