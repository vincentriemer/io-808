var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config.dev');
var historyApiFallback = require('connect-history-api-fallback');

var compiler = webpack(config);
var app = express();
var server = app.listen(3000, (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:3000');
});

const io = require('socket.io')(server);
io.on('connection', function(client){
  client.on('event', function(data){});
  client.on('disconnect', function(){});
});

const abletonlink = require('abletonlink');
const link = new abletonlink();
link.startUpdate(60, (beat, phase, bpm) => {
  io.emit('action', {type: 'tempo', payload: {bpm: bpm} });
});

app.use(historyApiFallback({
  verbose: false
}));

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
});

app.use(devMiddleware);
app.use(require('webpack-hot-middleware')(compiler));

