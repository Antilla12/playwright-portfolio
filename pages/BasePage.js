/**
 * BasePage
 * Shared helpers and conventions that every page object inherits.
 * Keeping this thin on purpose — it's a home for cross-cutting concerns
 * (navigation, waits, common assertions helpers), not a dumping ground.
 */
class BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  async goto(path = '/') {
    await this.page.goto(path);
  }

  async title() {
    return this.page.title();
  }

  async url() {
    return this.page.url();
  }

  /** Wait for network to be idle — useful after actions that trigger XHR (e.g. search suggestions) */
  async waitForNetworkIdle() {
    await this.page.waitForLoadState('networkidle');
  }
}

module.exports = { BasePage };
