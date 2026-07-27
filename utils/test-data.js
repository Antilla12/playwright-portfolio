/**
 * Centralized test data. Keeping these out of the spec files means
 * updating a search term or API endpoint doesn't require touching test logic.
 */
module.exports = {
  searchTerms: {
    valid: 'Playwright',
    withSuggestions: 'Software test',
    article: 'Automation',
  },
  articles: {
    playwright: 'Software_testing',
    javascript: 'JavaScript',
  },
  languages: {
    english: 'en',
    spanish: 'es',
    french: 'fr',
  },
  api: {
    baseUrl: 'https://en.wikipedia.org/api/rest_v1',
  },
};
