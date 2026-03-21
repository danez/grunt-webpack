import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import prettierRecommended from "eslint-plugin-prettier/recommended";

export default defineConfig([
  globalIgnores(["**/coverage", "**/node_modules", "**/__fixtures__"]),
  js.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },

      ecmaVersion: 2022,
    },

    rules: {
      "no-console": "error",
      "no-shadow": "error",
      "no-var": "error",

      "padding-line-between-statements": [
        "error",
        {
          blankLine: "always",
          prev: "*",
          next: "return",
        },
        {
          blankLine: "always",
          prev: ["const", "let", "var"],
          next: "*",
        },
        {
          blankLine: "any",
          prev: ["const", "let", "var"],
          next: ["const", "let", "var"],
        },
        {
          blankLine: "never",
          prev: ["import"],
          next: ["import"],
        },
      ],

      "prefer-const": "error",
    },
  },
  {
    files: ["**/*.cjs", "**/*.js"],

    languageOptions: {
      sourceType: "script",
    },

    rules: {
      strict: ["error", "global"],
    },
  },
  {
    files: ["**/*.mjs", "**/*.test.js"],
    languageOptions: {
      sourceType: "module",
    },
  },
  prettierRecommended,
]);
