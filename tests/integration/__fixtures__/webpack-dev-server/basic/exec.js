assertGrunt.timeout();

// stats should be displayed by default
expect(stdout).toMatch(/output\.js/);
expect(stdout).toMatch(/\[emitted\]/);
expect(stdout).toMatch(/main/);
expect(stderr).toMatch(/\[webpack-dev-server\] Project is running at:/);


