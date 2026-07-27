const { BasePage } = require('./BasePage');

/**
 * ArticlePage
 * Represents an individual Wikipedia article (en.wikipedia.org/wiki/<Title>).
 */
class ArticlePage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);

    this.heading = page.locator('#firstHeading');
    this.tableOfContents = page.locator('#vector-toc, .toc');
    this.tocLinks = page.locator('#vector-toc a, .toc a');
    this.contentParagraphs = page.locator('#mw-content-text p');
    this.languageButton = page.locator('#p-lang-btn, #p-lang');
    this.searchInput = page.locator('#searchform input[name="search"], #searchInput');
    this.infobox = page.locator('.infobox').first();
    this.references = page.locator('#References, .references');
    this.randomArticleLink = page.locator('#n-randompage a, li#t-random a');
  }

  async getHeadingText() {
    return this.heading.textContent();
  }

  async getTocItemCount() {
    return this.tocLinks.count();
  }

  async clickTocLink(index = 0) {
    await this.tocLinks.nth(index).click();
  }

  async hasInfobox() {
    return this.infobox.isVisible().catch(() => false);
  }

  async getParagraphCount() {
    return this.contentParagraphs.count();
  }

  async searchFromArticle(term) {
    await this.searchInput.fill(term);
    await this.page.keyboard.press('Enter');
  }

  async goToRandomArticle() {
    await this.randomArticleLink.click();
    await this.page.waitForLoadState('domcontentloaded');
  }
}

module.exports = { ArticlePage };
