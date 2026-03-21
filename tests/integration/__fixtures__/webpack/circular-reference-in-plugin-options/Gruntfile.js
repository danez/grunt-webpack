const path = require("path");
const webpack = require("webpack");

const plugin = new webpack.DefinePlugin({ test: JSON.stringify("test") });
plugin.circle = plugin;

module.exports = function (grunt) {
  grunt.initConfig({
    webpack: {
      test: {
        mode: "none",
        entry: path.join(__dirname, "entry"),
        output: {
          path: __dirname,
          filename: "output.js",
        },
        plugins: [plugin],
      },
    },
  });

  grunt.loadTasks(process.env.GRUNT_WEBPACK_TASK);
};
