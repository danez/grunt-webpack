import path from "node:path";
import crypto from "node:crypto";
import fs from "fs-extra";
import glob from "fast-glob";
import assertGruntFactory from "../utils/assertGrunt";
import {
  afterAll,
  afterEach,
  beforeEach,
  describe,
  expect,
  test,
} from "vitest";
import { execa } from "execa";

const TMP_DIRECTORY = path.join(__dirname, "tmp");
const GRUNT_BIN = path.join(__dirname, "../../node_modules/.bin/grunt");
const TASKS_DIR = path.join(__dirname, "../../tasks");

const files = glob.sync(path.join(__dirname, "__fixtures__/**/Gruntfile.js"), {
  dot: true,
});
const tests = new Map();

function runExec(code, opts) {
  const sandbox = Object.assign(
    {
      fs,
      path,
      assertGrunt: assertGruntFactory(opts.failed, opts.stdout, opts.timeout),
      expect,
    },
    opts,
  );

  const fn = new Function(...Object.keys(sandbox), code);

  return fn.apply(null, Object.values(sandbox));
}

files.forEach((file) => {
  const directory = path.dirname(file);
  const relativeDirectory = path.relative(
    path.join(__dirname, "__fixtures__"),
    directory,
  );
  const name = relativeDirectory.replace(/\//g, " ");

  tests.set(name, { directory, relativeDirectory });
});

describe("Fixture Tests", () => {
  beforeEach(async (context) => {
    context.cwd = path.join(
      TMP_DIRECTORY,
      "integration",
      crypto.randomBytes(20).toString("hex"),
    );
    await fs.ensureDir(context.cwd);
  });

  afterEach(async (context) => {
    await fs.remove(context.cwd);
  });

  afterAll(async () => {
    await fs.remove(TMP_DIRECTORY);
  });

  tests.forEach(({ directory, relativeDirectory }, name) => {
    const directoryParts = relativeDirectory.split("/");
    const testFunc = directoryParts.pop().startsWith(".")
      ? test.skip
      : test.concurrent;

    testFunc(
      name,
      async ({ cwd }) => {
        await fs.copy(directory, cwd);
        const optionsLoc = path.join(cwd, "options.json");
        let options;

        if (await fs.exists(optionsLoc)) {
          options = require(optionsLoc);
        } else {
          options = {
            args: [directoryParts.shift()],
          };
        }

        options.args.unshift("--stack");

        const execLoc = path.join(cwd, "exec.js");
        let execCode;

        if (await fs.exists(execLoc)) {
          execCode = await fs.readFile(execLoc, "utf-8");
        }
        let result;

        try {
          result = await execa(GRUNT_BIN, options.args, {
            env: {
              GRUNT_WEBPACK_TASK: TASKS_DIR,
            },
            cwd,
            timeout: 5000,
          });
        } catch (error) {
          result = error;
        }

        const { stdout, stderr, timedOut, failed } = result;

        if (execCode) {
          try {
            runExec(execCode, {
              cwd,
              stderr,
              stdout,
              failed,
              timeout: timedOut,
            });
          } catch (error) {
            // eslint-disable-next-line no-console
            console.log(stdout, stderr);
            throw error;
          }
        }
      },
      15000,
    );
  });
});
