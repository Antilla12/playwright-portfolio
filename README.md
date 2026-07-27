# Playwright Test Automation Framework — Wikipedia

[![Playwright Tests](https://github.com/YOUR_USERNAME/YOUR_REPO/actions/workflows/playwright.yml/badge.svg)](https://github.com/YOUR_USERNAME/YOUR_REPO/actions/workflows/playwright.yml)

An end-to-end and API test automation framework built with **Playwright** and **JavaScript**, demonstrated against [Wikipedia](https://www.wikipedia.org). Built as a portfolio project to showcase a production-style test architecture: Page Object Model, custom fixtures, API testing, cross-browser execution, and CI/CD with automated reporting.

> Why Wikipedia? It's a real, complex, high-traffic third-party site — not a purpose-built QA sandbox. It shows the framework can handle dynamic content, live search suggestions, multi-language navigation, and a public REST API, closer to what testing a real product looks like.

---

## What this project demonstrates

| Area | Implementation |
|---|---|
| **Design pattern** | Page Object Model (`/pages`) — locators and actions live with the page, tests read like specs |
| **Fixtures** | Custom Playwright fixtures (`/fixtures/base.js`) inject page objects automatically, no boilerplate in tests |
| **UI testing** | Search, typeahead suggestions, article navigation, table of contents, language switching |
| **API testing** | Wikipedia's public REST API — status codes, response shape, error handling, edge cases |
| **Cross-browser** | Chromium, Firefox, WebKit, and mobile viewport (Pixel 7) |
| **CI/CD** | GitHub Actions — runs on every push/PR, uploads HTML + JUnit reports as artifacts |
| **Reporting** | Built-in HTML reporter with trace viewer, screenshots and video on failure |
| **Notifications** | Slack webhook integration (see setup below) |

---

## Project structure

```
playwright-portfolio/
├── .github/workflows/playwright.yml   # CI pipeline
├── fixtures/base.js                   # Custom fixtures (page object injection)
├── pages/                             # Page Object Model
│   ├── BasePage.js
│   ├── HomePage.js
│   └── ArticlePage.js
├── tests/
│   ├── e2e/                           # UI test specs
│   │   ├── search.spec.js
│   │   ├── article-navigation.spec.js
│   │   └── language-switch.spec.js
│   └── api/                           # API test specs (no browser)
│       ├── page-summary.spec.js
│       └── related-and-random.spec.js
├── utils/test-data.js                 # Centralized test data
├── playwright.config.js
└── .env.example
```

---

## Getting started

### Prerequisites
- Node.js 18+
- (Recommended) [Playwright VS Code extension](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright) — auto-recommended if you open this repo in a Codespace or VS Code.

### Install

```bash
npm install
npx playwright install --with-deps
```

### Run tests

```bash
npm test                 # run everything, headless, all browsers
npm run test:e2e         # UI tests only
npm run test:api         # API tests only
npm run test:ui          # Playwright's interactive UI Mode — best for live demos
npm run test:headed      # headed run (needs a display; use UI mode in Codespaces)
npm run test:debug       # step-through debugger
```

### View the report

```bash
npm run report
```

### Generate new tests interactively

```bash
npm run codegen
```

---

## Running live demos in a Codespace

Codespaces have no display, so headed mode won't show a browser window. Instead:

- **`npm run test:ui`** — Playwright's Test UI, forwarded through the Codespaces port. Gives a full timeline of every action (click, fill, navigate) with DOM snapshots — this is the best way to *show* the automation happening.
- Set `DEMO_MODE=1` in `.env` (copy from `.env.example`) to slow actions down so they're easy to follow when presenting.

---

## CI/CD pipeline

Every push and pull request to `main` triggers `.github/workflows/playwright.yml`, which:

1. Installs dependencies and Playwright browsers
2. Runs the full test suite
3. Uploads the HTML report and JUnit results as workflow artifacts (kept 14 days)
4. *(optional)* Notifies Slack on pass/fail

### Enabling Slack notifications

1. Create a Slack [Incoming Webhook](https://api.slack.com/messaging/webhooks) in your workspace.
2. Add it as a repository secret: **Settings → Secrets and variables → Actions → New repository secret** named `SLACK_WEBHOOK_URL`.
3. Uncomment the two Slack steps at the bottom of `.github/workflows/playwright.yml`.

---

## Design notes

- **Why fixtures over manual instantiation?** Injecting page objects as fixtures (`fixtures/base.js`) means every test starts from a clean, typed page object with zero setup lines — matches how larger Playwright frameworks scale to hundreds of specs without repeated boilerplate.
- **Why the HTML reporter over Allure?** The built-in reporter needs no extra runtime (Allure requires Java) and already gives trace viewing, screenshots, and video — the right tradeoff for CI simplicity. Swapping in `allure-playwright` is a one-line reporter change if a project needs it.
- **Why API tests alongside UI tests?** Real QA roles expect testing below the UI layer. Wikipedia's REST API needs no auth, making it a clean, reproducible example of status code, schema, and edge-case testing.

---

## License

MIT
