const base = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');
const { ArticlePage } = require('../pages/ArticlePage');

/**
 * Extended test object with page objects pre-wired as fixtures.
 *
 * Why this matters: instead of every test doing
 *   const homePage = new HomePage(page);
 * we inject it once here. Tests stay declarative and read like specs,
 * not setup scripts. This is the same pattern used in production
 * Playwright frameworks at scale.
 */
exports.test = base.test.extend({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },

  articlePage: async ({ page }, use) => {
    const articlePage = new ArticlePage(page);
    await use(articlePage);
  },
});

exports.expect = base.expect;
