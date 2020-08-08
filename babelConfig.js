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
