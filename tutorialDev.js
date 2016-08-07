#!/usr/bin/env node

var exec = require('child_process').execFile;
var watch = require('node-watch');
var livereload = require('livereload');

var reloadServer = livereload.createServer();

watch('./tutorial', function(filename) {
  exec('./buildTutorial.js', function(err) {
    if (err) return console.error(err);
    console.log(filename + ' changed!');
  });
});

reloadServer.watch('./out');

console.log('Watch server sucessfully started!');


