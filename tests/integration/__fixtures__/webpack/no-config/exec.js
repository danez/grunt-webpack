assertGrunt.failed();

expect(stdout).toMatch(/No configuration was found for webpack./);
