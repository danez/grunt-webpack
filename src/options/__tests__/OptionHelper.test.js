import { describe, expect, test } from "vitest";
import OptionHelper from "../__mocks__/TestOptionHelper";

describe("OptionHelper", () => {
  test("supports functions as options", () => {
    const options = () => ({ mode: "production" });
    const helper = new OptionHelper({
      config: {
        getRaw() {
          return options;
        },
        get() {
          return options;
        },
        process(value) {
          return value;
        },
      },
    });

    helper.preloadOptions(() => {
      expect(helper.getOptions()).toMatchSnapshot();
    });
  });

  test("supports Promise as options", () => {
    const options = Promise.resolve({
      mode: "production",
    });
    const helper = new OptionHelper({
      config: {
        getRaw() {
          return options;
        },
        get() {
          return options;
        },
        process(value) {
          return value;
        },
      },
    });

    helper.preloadOptions(() => {
      expect(helper.getOptions()).toMatchSnapshot();
    });
  });
});
