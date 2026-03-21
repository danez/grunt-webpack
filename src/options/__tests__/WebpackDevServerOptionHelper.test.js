import { describe, expect, test } from "vitest";
import WebpackDevServerOptionHelper from "../WebpackDevServerOptionHelper";

describe("WebpackDevServerOptionHelper", () => {
  test("host is localhost by default", () => {
    const options = {};
    const helper = new WebpackDevServerOptionHelper();

    helper.readRawConfig = () => options;

    helper.preloadOptions(() => {
      expect(helper.getWebpackOptions()).toMatchSnapshot();
      expect(helper.getWebpackDevServerOptions()).toMatchSnapshot();
    });
  });

  test("supports array config for webpack", () => {
    const options = [
      { devServer: { port: 8080 } },
      { devServer: { port: 9090 } },
    ];
    const helper = new WebpackDevServerOptionHelper();

    helper.getOptions = () => options;

    expect(helper.getWebpackOptions()).toMatchSnapshot();
    expect(helper.getWebpackDevServerOptions()).toMatchSnapshot();
  });
});
