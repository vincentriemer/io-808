var path = require('path');
var NpmInstallPlugin = require('npm-install-webpack-plugin');

module.exports = {
  module: {
    loaders: [
      {
        test: /\.css$/,
        loaders: [
          'style?sourceMap',
          'css',
        ],
        include: path.resolve(__dirname, '../')
      },
      {
        test: /\.(otf|eot|svg|ttf|woff|woff2).*$/,
        loader: 'url?limit=8192',
        include: path.resolve(__dirname, '../')
      }
    ]
  },
  plugins: [
    new NpmInstallPlugin({
      install: true
    })
  ],
  resolve: {
    root: [
      path.resolve('./node_modules'),
      path.resolve('./src'),
    ]
  }
};