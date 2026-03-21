const path = require("path");
const webpack = require("webpack");

module.exports = function (grunt) {
  grunt.initConfig({
    webpack: {
      test: {
        watch: true,
        mode: "none",
        entry: path.join(__dirname, "entry"),
        output: {
          path: __dirname,
          filename: "output.js",
        },
        plugins: [new webpack.DefinePlugin({ okey: JSON.stringify("dokey") })],
      },
    },
  });

  grunt.loadTasks(process.env.GRUNT_WEBPACK_TASK);
};
