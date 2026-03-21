assertGrunt.success();

const content = fs.readFileSync(path.join(cwd, 'main.bundle.js'), 'utf-8');
expect(content).toMatch(/console\.log\("dokey"\)/);

// stats should be displayed by default
expect(stdout).toMatch(/\[emitted\]/);
expect(stdout).toMatch(/main\.bundle\.js/);
expect(stdout).toMatch(/common\.bundle\.js/);

