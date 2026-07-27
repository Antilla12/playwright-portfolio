// @ts-check
const { defineConfig, devices } = require('@playwright/test');
require('dotenv').config();

/**
 * Playwright configuration.
 * Docs: https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',

  // Run tests in files in parallel
  fullyParallel: true,

  // Fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: !!process.env.CI,

  // Retry failed tests on CI only
  retries: process.env.CI ? 2 : 0,

  // Limit parallel workers on CI, use default locally
  workers: process.env.CI ? 2 : undefined,

  // Reporters: HTML report (visual, shareable) + list (readable CI logs) + JUnit (for CI integrations)
  reporter: [
    ['html', { open: 'never' }],
    ['list'],
    ['junit', { outputFile: 'test-results/junit.xml' }],
  ],

  // Shared settings for all projects
  use: {
    baseURL: process.env.BASE_URL || 'https://www.wikipedia.org',

    // Collect trace on first retry so failures are debuggable without re-running
    trace: 'on-first-retry',

    // Screenshot only on failure keeps the report lean
    screenshot: 'only-on-failure',

    // Video on first retry, useful for showcasing flaky repro or demos
    video: 'retain-on-failure',

    // Slow down actions slightly so live demos (UI mode / headed) are easy to follow.
    // Set DEMO_MODE=1 locally when presenting; CI ignores this.
    launchOptions: {
      slowMo: process.env.DEMO_MODE ? 400 : 0,
    },
  },

  // Cross-browser coverage — a portfolio should demonstrate this even if you mainly develop on one
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 7'] },
    },
  ],
});
