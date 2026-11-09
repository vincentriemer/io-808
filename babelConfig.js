const path = require("path");

function babelConfig(module) {
  return {
    presets: [
      [
        "@babel/preset-env",
        {
          targets: {
            esmodules: module
          },
          loose: true,
          bugfixes: true,
          modules: false
        }
      ],
      "@babel/preset-react"
    ],
    plugins: [
      [
        "@stylexjs/babel-plugin",
        {
          dev: process.env.NODE_ENV !== "production",
          runtimeInjection: false,
          treeshakeCompensation: true,
          aliases: {
            "theme/*": path.resolve(__dirname, "src/theme/*")
          },
          unstable_moduleResolution: {
            type: "commonJS",
            rootDir: __dirname
          }
        }
      ],
      "@babel/plugin-syntax-dynamic-import",
      "@babel/plugin-proposal-class-properties",
      [
        "babel-plugin-polyfill-corejs3",
        {
          method: "usage-global",
          targets: { esmodules: module }
        }
      ]
    ]
  };
}

module.exports = babelConfig;
