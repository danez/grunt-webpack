assertGrunt.timeout();

const content = fs.readFileSync(path.join(cwd, "output.js"), "utf-8");
expect(content).toMatch(/console\.log\("dokey"\)/);

expect(stdout).not.toMatch(/DEP_WEBPACK_WATCH_WITHOUT_CALLBACK/);
expect(stderr).not.toMatch(/DEP_WEBPACK_WATCH_WITHOUT_CALLBACK/);
