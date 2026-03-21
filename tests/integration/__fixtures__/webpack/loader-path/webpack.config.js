const path = require("path");

const config = {
  mode: "none",
  entry: {
    main: "./main.js",
  },
  module: {
    rules: [
      {
        test: /\.js/,
        use: ["test-loader"],
      },
    ],
  },
};

module.exports = config;
