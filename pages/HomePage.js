const { BasePage } = require('./BasePage');

/**
 * HomePage
 * Represents the wikipedia.org language-portal landing page
 * (the page with the globe logo and the language grid).
 */
class HomePage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);

    // Locators are defined once here and reused across every test —
    // if Wikipedia changes their markup, we fix it in one place.
    this.searchInput = page.locator('#searchInput');
    this.searchSuggestions = page.locator('.suggestion-link');
    this.searchGoButton = page.locator('button[type="submit"]');
    this.logo = page.locator('.central-featured-logo');
    this.languageLinks = page.locator('#js-link-box-en a, .central-featured-lang a');
  }

  async goto() {
    await super.goto('/');
  }

  async search(term) {
    await this.searchInput.click();
    await this.searchInput.fill(term);
  }

  async submitSearch() {
    await this.page.keyboard.press('Enter');
  }

  async searchAndGo(term) {
    await this.search(term);
    await this.submitSearch();
  }

  /** Returns the list of visible suggestion texts while typeahead is open */
  async getSuggestionTexts() {
    await this.searchSuggestions.first().waitFor({ state: 'visible' });
    return this.searchSuggestions.allTextContents();
  }

  async clickFirstSuggestion() {
    await this.searchSuggestions.first().click();
  }

  async selectLanguage(langCode) {
    await this.page.locator(`#js-link-box-${langCode}`).click();
  }
}

module.exports = { HomePage };
