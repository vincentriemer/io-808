var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var FaviconsWebpackPlugin = require("favicons-webpack-plugin");
var UglifyJsPlugin = require("uglifyjs-webpack-plugin");
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
var OfflinePlugin = require("offline-plugin");
var WebpackPwaManifest = require("webpack-pwa-manifest");
var ReplacePlugin = require("webpack-plugin-replace");
// var BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
//   .BundleAnalyzerPlugin;

module.exports = {
  mode: "production",
  devtool: "source-map",
  entry: ["./src/index"],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
    splitChunks: {
      cacheGroups: {
        styles: {
          name: "styles",
          test: /\.css$/,
          chunks: "all",
          enforce: true
        }
      }
    },
    nodeEnv: "production"
  },
  node: false,
  output: {
    path: path.join(__dirname, "out"),
    filename: "bundle.js",
    publicPath: ""
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: [{ loader: "pug-loader", options: {} }]
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: "css-loader", options: { importLoaders: 1 } },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: [require("autoprefixer")]
            }
          }
        ]
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              include: path.join(__dirname, "src")
            }
          }
        ]
      },
      {
        test: /\.(otf|eot|svg|ttf|woff|woff2).*$/,
        loader: "url-loader?limit=8192"
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {}
          }
        ]
      }
    ]
  },
  plugins: [
    new ReplacePlugin({
      "process.nextTick": "Promise.resolve().then"
    }),
    new FaviconsWebpackPlugin({
      logo: "./base-favicon.png",
      inject: true,
      background: "#363830",
      title: "iO-808",
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
      template: "src/index.pug",
      filename: "index.html",
      title: "iO-808"
    }),
    new WebpackPwaManifest({
      lang: "en",
      dir: "ltr",
      name: "iO-808",
      short_name: "io808",
      description:
        "A fully recreated web-based TR-808 drum machine using React, Redux, and the Web Audio API.",
      background_color: "#363830",
      theme_color: "#363830",
      orientation: "landscape",
      display: "standalone",
      icons: [
        {
          src: path.resolve("./base-favicon.png"),
          sizes: [96, 128, 192, 256, 384, 512]
        }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: "styles.css"
    }),
    new OfflinePlugin()
    // new BundleAnalyzerPlugin()
  ],
  resolve: {
    modules: [path.resolve(__dirname, "src"), "node_modules"],
    extensions: [".js", ".json"]
  }
};
