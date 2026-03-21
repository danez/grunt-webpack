const path = require("path");
const webpack = require("webpack");

module.exports = function (grunt) {
  grunt.initConfig({
    name: "Webpack",
    outputFileName: "output.js",
    pkg: {
      copyright: "<%= name %>",
      version: "6.55.345",
    },
    webpack: {
      test: (config) => ({
        mode: "none",
        entry: path.join(__dirname, "entry"),
        output: {
          path: __dirname,
          filename: "<%= outputFileName %>",
        },
        plugins: [
          new webpack.BannerPlugin({
            banner: `/*! ${config.pkg.copyright} - Version ${config.pkg.version} dated ${grunt.template.today()} */`,
            raw: true,
          }),
        ],
      }),
    },
  });

  grunt.loadTasks(process.env.GRUNT_WEBPACK_TASK);
};
