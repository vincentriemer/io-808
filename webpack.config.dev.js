var path = require("path");
var webpack = require("webpack");
var NpmInstallPlugin = require("npm-install-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var OfflinePlugin = require("offline-plugin");

module.exports = {
  devtool: "cheap-module-source-map",
  entry: [
    "eventsource-polyfill",
    "webpack-hot-middleware/client",
    "core-js/es6/symbol",
    "core-js/es6/reflect",
    "core-js/fn/array/includes",
    "./src/index",
  ],
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/",
    hotUpdateChunkFilename: "[id].hot-update.js",
    hotUpdateMainFilename: "hot-update.json",
  },
  module: {
    loaders: [
      { test: /\.jade$/, loader: "jade" },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          "style-loader",
          "css-loader!postcss-loader"
        ),
      },
      {
        test: /\.js$/,
        loaders: ["babel"],
        include: path.join(__dirname, "src"),
      },
      { test: /\.(otf|eot|svg|ttf|woff|woff2).*$/, loader: "url?limit=8192" },
      { test: /\.(WAV|wav)$/, loader: "file" },
      {
        test: /\.json$/,
        loader: "json-loader",
      },
    ],
  },
  postcss: [require("autoprefixer")],
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development"),
      },
    }),
    new NpmInstallPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      inject: false,
      cache: false,
      template: "src/index.jade",
      filename: "index.html",
      title: "iO-808",
    }),
    new ExtractTextPlugin("styles.css") /*,
    new OfflinePlugin()*/,
  ],
  resolve: {
    root: [path.resolve("./node_modules"), path.resolve("./src")],
  },
};
