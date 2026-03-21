import { expect } from "vitest";

export default function (failed, stdout, timeout) {
  return {
    success: function assertGruntSuccess() {
      expect(timeout).toBe(false);
      expect(failed).toBe(false);
      expect(stdout).not.toMatch(/ERROR/i);
    },
    failed: function assertGruntFailed() {
      expect(timeout).toBe(false);
      expect(failed).toBe(true);
      expect(stdout).toMatch(/ERROR/i);
    },
    timeout: function assertGruntTimeout() {
      expect(timeout).toBe(true);
      expect(stdout).not.toMatch(/ERROR/i);
    },
  };
}
