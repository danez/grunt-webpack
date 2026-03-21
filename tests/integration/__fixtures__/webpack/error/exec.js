assertGrunt.failed();

expect(stdout).toMatch(/Can't resolve '\.\/b'/);
expect(stdout).toMatch(/\.\/entry\.js 1:8-22/);
