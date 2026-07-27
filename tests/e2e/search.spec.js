const { test, expect } = require('../../fixtures/base');
const { searchTerms } = require('../../utils/test-data');

test.describe('Wikipedia search', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.goto();
  });

  test('home page loads with the language portal', async ({ homePage, page }) => {
    await expect(page).toHaveTitle(/Wikipedia/);
    await expect(homePage.logo).toBeVisible();
  });

  test('typing a query shows live search suggestions', async ({ homePage }) => {
    await homePage.search(searchTerms.withSuggestions);

    const suggestions = await homePage.getSuggestionTexts();

    expect(suggestions.length).toBeGreaterThan(0);
  });

  test('submitting a search navigates to the matching article', async ({ homePage, articlePage, page }) => {
    await homePage.searchAndGo(searchTerms.article);

    await expect(page).toHaveURL(/\/wiki\//);
    const heading = await articlePage.getHeadingText();
    expect(heading?.toLowerCase()).toContain('automation');
  });

  test('clicking a suggestion navigates directly to that article', async ({ homePage, articlePage, page }) => {
    await homePage.search(searchTerms.withSuggestions);
    await homePage.getSuggestionTexts(); // ensures suggestions are rendered before interacting
    await homePage.clickFirstSuggestion();

    await expect(page).toHaveURL(/\/wiki\//);
    await expect(articlePage.heading).toBeVisible();
  });
});
