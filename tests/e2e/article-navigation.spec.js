const { test, expect } = require('../../fixtures/base');
const { articles } = require('../../utils/test-data');

test.describe('Article page navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`https://en.wikipedia.org/wiki/${articles.javascript}`);
  });

  test('article renders heading and body content', async ({ articlePage }) => {
    const heading = await articlePage.getHeadingText();
    expect(heading).toContain('JavaScript');

    const paragraphCount = await articlePage.getParagraphCount();
    expect(paragraphCount).toBeGreaterThan(0);
  });

  test('table of contents has multiple sections and links scroll to content', async ({ articlePage, page }) => {
    const tocCount = await articlePage.getTocItemCount();
    expect(tocCount).toBeGreaterThan(3);

    await articlePage.clickTocLink(1);
    // A successful in-page nav updates the URL hash
    await expect(page).toHaveURL(/#/);
  });

  test('article has an infobox summarizing key facts', async ({ articlePage }) => {
    const hasInfobox = await articlePage.hasInfobox();
    expect(hasInfobox).toBeTruthy();
  });

  test('searching from within an article navigates to a new page', async ({ articlePage, page }) => {
    await articlePage.searchFromArticle('Python (programming language)');
    await expect(page).toHaveURL(/Python/);
  });
});
