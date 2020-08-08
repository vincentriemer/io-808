require("dotenv").config();

var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var FaviconsWebpackPlugin = require("favicons-webpack-plugin");
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
var OfflinePlugin = require("offline-plugin");
var WebpackPwaManifest = require("webpack-pwa-manifest");
var ReplacePlugin = require("webpack-plugin-replace");
var CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const babelConfig = require("./babelConfig");

var fontBaseURL = process.env.WEBFONT_BASE_URL;
var linotypeUserID = process.env.LINOTYPE_USER_ID;
var trackerURL = process.env.FATHOM_TRACKER_URL;
var trackerSiteID = process.env.FATHOM_SITE_ID;

const mode = "production";
const entry = { main: "./src/index" };
const optimization = {
  minimizer: [new TerserPlugin(), new OptimizeCSSAssetsPlugin({})],
  nodeEnv: "production"
};
const moduleSettings = isModern => {
  return {
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
              include: path.join(__dirname, "src"),
              ...babelConfig(isModern)
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
  };
};
const plugins = [
  new CopyPlugin({
    patterns: [{ from: "static/**/*" }]
  }),
  new ReplacePlugin({
    "process.nextTick": "Promise.resolve().then"
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
    templateParameters: {
      fontBaseURL,
      linotypeUserID,
      trackerURL,
      trackerSiteID
    },
    filename: "index.html",
    title: "iO-808"
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
  new WebpackPwaManifest({
    lang: "en",
    dir: "ltr",
    name: "iO-808",
    short_name: "io808",
    inject: true,
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
  new MiniCssExtractPlugin({}),
  new OfflinePlugin()
];
const resolve = {
  modules: [path.resolve(__dirname, "src"), "node_modules"],
  extensions: [".js", ".json"]
};

const legacyConfig = {
  mode,
  entry,
  output: {
    path: path.join(__dirname, "out"),
    filename: "[name].bundle.js",
    publicPath: ""
  },
  optimization,
  module: moduleSettings(false),
  plugins,
  resolve
};

const moduleConfig = {
  mode,
  entry,
  output: {
    path: path.join(__dirname, "out"),
    filename: "[name].mjs",
    publicPath: ""
  },
  optimization,
  module: moduleSettings(true),
  plugins,
  resolve
};

module.exports = [moduleConfig, legacyConfig];
