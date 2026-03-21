import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    name: "lib",
    include: ["**/__tests__/**/*.test.js", "**/tests/integration/**/*.test.js"],
    deps: {
      interopDefault: false,
    },
    coverage: {
      all: true,
      include: ["src/**"],
      provider: "v8",
      reporter: ["text", "lcov"],
    },
  },
});
