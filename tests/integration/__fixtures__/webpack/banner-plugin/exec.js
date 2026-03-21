assertGrunt.success();

const content = fs.readFileSync(path.join(cwd, "output.js"), "utf-8");
expect(content).toMatch(/\/\*! Webpack - Version 6.55.345 dated/);

// stats should be displayed by default
expect(stdout).toMatch(/output\.js/);
expect(stdout).toMatch(/\[emitted\]/);
expect(stdout).toMatch(/main/);
