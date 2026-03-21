import { describe, expect, test } from "vitest";
import WebpackOptionHelper from "../WebpackOptionHelper";

describe("WebpackOptionHelper", () => {
  test("watch options is part of webpack options", () => {
    const options = {
      watch: true,
      watchOptions: { aggregateTimeout: 300, poll: 1000 },
    };
    const helper = new WebpackOptionHelper();

    helper.getOptions = () => options;

    const result = helper.getWebpackOptions();

    expect(result).toEqual({
      watchOptions: { aggregateTimeout: 300, poll: 1000 },
    });
  });
});
