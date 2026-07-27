const { test, expect } = require('@playwright/test');
const { api } = require('../../utils/test-data');

/**
 * API tests use Playwright's built-in `request` fixture — no browser context needed,
 * which makes these tests fast and a good demonstration of testing beyond the UI layer.
 * Endpoint docs: https://en.wikipedia.org/api/rest_v1/
 */
test.describe('Wikipedia REST API - page summary', () => {
  test('returns a valid summary for an existing article', async ({ request }) => {
    const response = await request.get(`${api.baseUrl}/page/summary/JavaScript`);

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.title).toBe('JavaScript');
    expect(body.type).toBe('standard');
    expect(body.extract).toBeTruthy();
    expect(body.content_urls.desktop.page).toContain('en.wikipedia.org/wiki/JavaScript');
  });

  test('returns 404 for a non-existent article', async ({ request }) => {
    const response = await request.get(
      `${api.baseUrl}/page/summary/ThisArticleDoesNotExist_${Date.now()}`
    );

    expect(response.status()).toBe(404);

    const body = await response.json();
    expect(body.status).toBe(404);
  });

  test('response includes expected content-type header', async ({ request }) => {
    const response = await request.get(`${api.baseUrl}/page/summary/Automation`);

    expect(response.headers()['content-type']).toContain('application/json');
  });

  test('handles articles with special characters / URL encoding', async ({ request }) => {
    const response = await request.get(
      `${api.baseUrl}/page/summary/${encodeURIComponent('C++ ')}`
    );

    // Wikipedia normalizes this to the "C++" article
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body.title.toLowerCase()).toContain('c++');
  });
});
