var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config.dev');
var historyApiFallback = require('connect-history-api-fallback');

var app = express();
var compiler = webpack(config);

app.use(historyApiFallback({
  verbose: false
}));

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
});

app.use(devMiddleware);
app.use(require('webpack-hot-middleware')(compiler));

app.listen(3000, function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:3000');
});
