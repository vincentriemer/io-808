#!/usr/bin/env node

var fs = require('fs-extra');
var Markdown = require('markdown-it');
var imgix = require('markdown-it-imgix');
var jade = require('jade');
var sass = require('node-sass');

var stringRequire = function (module, filename) {
  module.exports = fs.readFileSync(filename, 'utf8');
};

require.extensions['.md'] = stringRequire;

// CSS
var css = sass.renderSync({
  file: './docs/sass/style.scss',
  outputStyle: 'compressed'
}).css;

var md = new Markdown({
  html: true
});
md.use(require('markdown-it-anchor'));
md.use(require('markdown-it-table-of-contents'), { includeLevel: [2,3] });
if (process.env.NODE_ENV === 'production')
  md.use(imgix, {
    match: "images",
    domain: 'io808.imgix.net',
    params: {
      ch: 'DPR',
      dpr: 2,
      h: 300,
      auto: 'compress'
    }
  });

// pages
var tutorialMD = require('./docs/tutorial.md');
var content = md.render(tutorialMD);

// render
var fn = jade.compileFile('./docs/template.jade', {});
var html = fn({ content: content, css: css });

var htmlPath = './out/tutorial.html';
var imagesPath = './out/images';

fs.outputFileSync(htmlPath, html);
fs.copySync('./docs/images', imagesPath, { clobber: true });