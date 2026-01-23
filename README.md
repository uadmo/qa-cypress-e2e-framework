# QA Cypress E2E Framework

This repository contains an end‑to‑end test automation framework built with **Cypress + TypeScript**. It covers both **UI testing** (SauceDemo) and **API testing** (public APIs such as JSONPlaceholder / Reqres‑like services), following clean project structure and best practices.

The goal of this project is to demonstrate how to structure a real‑world Cypress framework with clear separation of concerns, reusable components, and CI integration.

---

## Tech Stack

- Cypress
- TypeScript
- Node.js / npm
- GitHub Actions (CI)

---

## Project Structure

```
qa-cypress-e2e-framework
│
├── .github/workflows
│   └── cypress.yml           # CI pipeline
│
├── cypress
│   ├── e2e
│   │   ├── api               # API tests
│   │   │   ├── articles.cy.ts
│   │   │   └── users.cy.ts
│   │   └── ui                # UI tests
│   │       ├── login
│   │       │   └── login.cy.ts
│   │       └── dashboard
│   │           └── inventory.cy.ts
│   │
│   ├── fixtures              # Test data
│   │   ├── users.json
│   │   └── articles.json
│   │
│   ├── pages                 # Page Objects
│   │   └── LoginPage.ts
│   │
│   ├── support               # Cypress commands & setup
│   ├── types                 # TypeScript types
│   └── screenshots
│
├── env.json                  # Environment configuration
├── cypress.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

---

## Environments

All environments are centralized in **env.json**:

```json
{
    "dev": {
        "baseUrl": "https://www.saucedemo.com",
        "apiUrl": "https://reqres.in/api",
        "jsonplaceholderUrl": "https://jsonplaceholder.typicode.com",
        "realworldUrl": "https://demo.realworld.io"
    },
    "staging": {
        "baseUrl": "https://www.saucedemo.com",
        "apiUrl": "https://reqres.in/api",
        "jsonplaceholderUrl": "https://jsonplaceholder.typicode.com",
        "realworldUrl": "https://demo.realworld.io"
    },
    "prod": {
        "baseUrl": "https://www.saucedemo.com",
        "apiUrl": "https://reqres.in/api",
        "jsonplaceholderUrl": "https://jsonplaceholder.typicode.com",
        "realworldUrl": "https://demo.realworld.io"
    }
}
```

- **baseUrl** → used for UI tests (SauceDemo)
- **apiUrl** → used only where applicable for API tests
- **jsonplaceholderUrl** → used only where applicable for API tests
- **realworldUrl** → used only where applicable for API tests

 UI authentication for SauceDemo is performed via the UI (not API/session‑based), as SauceDemo does not support reliable API login for Cypress sessions.

---

## Test Types

### UI Tests

- Login flow (SauceDemo)
- Inventory page validation
- Page Object Model is used for maintainability

### API Tests

- User endpoints
- Articles endpoints
- Uses `cy.request()` and `cy.intercept()`
- Fixtures are reused as mock responses where applicable

---

## Running the Tests

### Install dependencies

```bash
npm install
```

### Open Cypress Test Runner

```bash
npx cypress open
```

### Run all tests (headless)

```bash
npx cypress run
```

### Run against a specific environment

```bash
npx cypress run --env environment=dev
```

---

## Continuous Integration

This project uses **GitHub Actions** to automatically run Cypress tests on push and pull requests.

The pipeline:
- Installs dependencies
- Runs Cypress in headless mode
- Fails the build if any test fails

CI configuration can be found in:
```
.github/workflows/cypress.yml
```

---

## Key Design Decisions

- Clear separation between **UI** and **API** tests
- No Cypress session usage for SauceDemo (UI‑based login only)
- Fixtures used as a single source of test data
- TypeScript types added for API responses
- Environment config centralized in one file

---

## Author

Created for learning and demonstration purposes as a scalable Cypress E2E framework.

