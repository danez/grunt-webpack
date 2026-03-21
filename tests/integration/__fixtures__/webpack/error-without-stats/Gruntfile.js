const path = require("path");
const webpack = require("webpack");

module.exports = function (grunt) {
  grunt.initConfig({
    webpack: {
      test: {
        mode: "none",
        stats: false,
        entry: path.join(__dirname, "entry"),
        output: {
          path: __dirname,
          filename: "output.js",
        },
        stats: {
          colors: false,
        },
      },
    },
  });

  grunt.loadTasks(process.env.GRUNT_WEBPACK_TASK);
};
