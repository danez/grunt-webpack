module.exports = function (grunt) {
  grunt.initConfig({
    webpack: {
      options: require("./webpack.config.js"),
      dev: {},
    },
  });

  grunt.loadTasks(process.env.GRUNT_WEBPACK_TASK);
};
