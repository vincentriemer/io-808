#!/usr/bin/env node

var fs = require("fs-extra");
var path = require("path");

var Markdown = require("markdown-it");
var pug = require("pug");

var sass = require("node-sass");
var uncss = require("uncss");
var CleanCSS = require("clean-css");

var htmlMinify = require("html-minifier").minify;

var stringRequire = function(module, filename) {
  module.exports = fs.readFileSync(filename, "utf8");
};

require.extensions[".md"] = stringRequire;

var srcDir = path.resolve("./tutorial");
var outputDir = path.resolve("./out");

function renderHtml(content, css) {
  var html = fn({
    content: content,
    css: css,
    livereload: process.env.NODE_ENV !== "production",
  });

  // minify html
  var htmlMin = htmlMinify(html, {
    removeComments: true,
    collapseWhitespace: true,
    processScripts: ["text/javascript"],
  });

  var htmlPath = path.join(outputDir, "tutorial.html");
  var imagesPath = path.join(outputDir, "images");
  var exampleFilename = "io808-full-example.json";

  // save html file
  fs.outputFileSync(htmlPath, htmlMin);

  // copy images
  fs.copySync("./tutorial/images", imagesPath, { clobber: true });

  // copy example savefile
  fs.copySync(
    path.join(srcDir, exampleFilename),
    path.join(outputDir, exampleFilename),
    { clobber: true }
  );
}

// CSS
var rawCSS = sass
  .renderSync({
    file: path.join(srcDir, "sass", "style.scss"),
  })
  .css.toString();

var md = new Markdown({ html: true });
md.use(require("markdown-it-anchor"));
md.use(require("markdown-it-table-of-contents"), { includeLevel: [2, 3] });
md.use(require("markdown-it-decorate"));
md.use(require("markdown-it-video"), {
  youtube: { width: 853, height: 480 },
});

// pages
var tutorialMD = require("./tutorial/tutorial.md");
var content = md.render(tutorialMD);

// render
var fn = pug.compileFile(path.join(srcDir, "template.pug"), {});

if (process.env.NODE_ENV === "production") {
  var testHtml = fn({ content: content, css: "" });

  uncss(
    testHtml,
    {
      ignore: ["canvas"],
      raw: rawCSS,
    },
    function(err, unCSS) {
      if (err) return console.error(err);

      var prodCSS = new CleanCSS({ roundingPrecision: -1 }).minify(unCSS)
        .styles;

      renderHtml(content, prodCSS);
    }
  );
} else {
  renderHtml(content, rawCSS);
}
