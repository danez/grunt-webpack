assertGrunt.success();

const content = fs.readFileSync(path.join(cwd, 'output.js'), 'utf-8');
expect(content).toMatch(/console\.log\("dokey"\)/);

