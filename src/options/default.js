"use strict";

const { merge } = require("webpack-merge");

const gruntOptions = {
  failOnError: (options) => {
    // if watch enabled default to failOnError false
    return Array.isArray(options)
      ? options.every((option) => !option.watch)
      : !options.watch;
  },
  progress: process.stdout.isTTY,
  storeStatsTo: null,
  keepalive: (options) => {
    // if watch enabled default to keepalive true
    return Array.isArray(options)
      ? options.some((option) => option.watch)
      : !!options.watch;
  },
  watch: null,
};

const webpackOptions = {
  stats: {
    cached: false,
    cachedAssets: false,
    colors: true,
  },
};

const webpackDevServerOptions = {
  devServer: {
    host: "localhost",
  },
  stats: {
    cached: false,
    cachedAssets: false,
    colors: true,
  },
};

function mergeOptions(defaultOptions, options, targetOptions) {
  if (Array.isArray(targetOptions) && Array.isArray(options)) {
    if (targetOptions.length !== options.length) {
      throw new Error(
        "Cannot have both `options` and `target` be an array with different length. " +
          "If using arrays for both please ensure they are the same size.",
      );
    }

    return targetOptions.map((opt, index) =>
      merge(defaultOptions, options[index], opt),
    );
  }

  if (Array.isArray(targetOptions)) {
    return targetOptions.map((opt) => merge(defaultOptions, options, opt));
  } else if (Array.isArray(options)) {
    return options.map((opt) => merge(defaultOptions, opt, targetOptions));
  }

  return merge(defaultOptions, options, targetOptions);
}

exports.gruntOptions = gruntOptions;
exports.webpackOptions = webpackOptions;
exports.webpackDevServerOptions = webpackDevServerOptions;

exports.mergeOptions = mergeOptions;
