const { test, expect } = require('../../fixtures/base');

test.describe('Language selection', () => {
  test('selecting Spanish from the portal navigates to es.wikipedia.org', async ({ homePage, page }) => {
    await homePage.goto();
    await homePage.selectLanguage('es');

    await expect(page).toHaveURL(/es\.wikipedia\.org/);
  });

  test('selecting French from the portal navigates to fr.wikipedia.org', async ({ homePage, page }) => {
    await homePage.goto();
    await homePage.selectLanguage('fr');

    await expect(page).toHaveURL(/fr\.wikipedia\.org/);
  });
});
