const path = require("path");
const webpack = require("webpack");

module.exports = function (grunt) {
  grunt.initConfig({
    webpack: {
      options: {
        optimization: {
          minimize: true,
        },
      },
      test: [
        {
          mode: "none",
          entry: path.join(__dirname, "entry"),
          output: {
            path: __dirname,
            filename: "bundle.js",
          },
          plugins: [new webpack.BannerPlugin("this is a banner")],
        },
        {
          mode: "none",
          entry: path.join(__dirname, "entry2"),
          output: {
            path: __dirname,
            filename: "bundle2.js",
          },
        },
      ],
    },
  });

  grunt.loadTasks(process.env.GRUNT_WEBPACK_TASK);
};
