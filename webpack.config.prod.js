require("dotenv").config();

var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
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
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 8192
          }
        }
      },
      {
        test: /\.(png|jpg|gif)$/,
        type: "asset/resource"
      }
    ]
  };
};
const plugins = [
  new CopyPlugin({
    patterns: [{ from: "static/**/*" }]
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
  new MiniCssExtractPlugin({})
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
