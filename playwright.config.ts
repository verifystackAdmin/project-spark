/**
 * Playwright defaults without Lovable tooling. Install when adding e2e:
 * `npm i -D @playwright/test`
 */
export default {
  testDir: "e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL ?? "http://127.0.0.1:5173",
    trace: "on-first-retry",
  },
};
