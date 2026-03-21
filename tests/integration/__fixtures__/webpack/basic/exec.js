assertGrunt.success();

const content = fs.readFileSync(path.join(cwd, "output.js"), "utf-8");
expect(content).toMatch(/console\.log\("dokey"\)/);

// stats should be displayed by default
expect(stdout).toMatch(/output\.js/);
expect(stdout).toMatch(/\[emitted\]/);
expect(stdout).toMatch(/main/);
