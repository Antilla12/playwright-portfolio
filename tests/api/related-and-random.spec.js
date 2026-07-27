const { test, expect } = require('@playwright/test');
const { api } = require('../../utils/test-data');

test.describe('Wikipedia REST API - random pages & revision metadata', () => {
  test('random summary endpoint returns a well-formed article', async ({ request }) => {
    const response = await request.get(`${api.baseUrl}/page/random/summary`);

    expect(response.ok()).toBeTruthy();
    const body = await response.json();

    expect(body).toHaveProperty('title');
    expect(body).toHaveProperty('extract');
    expect(body).toHaveProperty('content_urls');
  });

  test('page/title endpoint returns revision metadata for an existing article', async ({ request }) => {
    const response = await request.get(`${api.baseUrl}/page/title/JavaScript`);

    expect(response.ok()).toBeTruthy();
    const body = await response.json();

    expect(Array.isArray(body.items)).toBeTruthy();
    expect(body.items.length).toBeGreaterThan(0);
    expect(body.items[0].title).toBe('JavaScript');
    expect(body.items[0]).toHaveProperty('rev');
  });

  test('multiple sequential random calls return different articles (sanity check on randomness)', async ({ request }) => {
    const titles = new Set();

    for (let i = 0; i < 5; i++) {
      const response = await request.get(`${api.baseUrl}/page/random/summary`);
      const body = await response.json();
      titles.add(body.title);
    }

    // Not a strict guarantee, but 5 calls landing on the exact same article is effectively impossible
    expect(titles.size).toBeGreaterThan(1);
  });
});
