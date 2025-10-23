feat: Enhance auth flow and refactor accounts API

This commit introduces two main improvements:

1.  **Authentication Flow:**
    - Fixes a bug where users were not redirected after a successful login, making session persistence appear broken. The login controller now correctly redirects to the dashboard.
    - Makes the `redirectIfAuth` middleware self-sufficient by having it verify the JWT directly, ensuring that already logged-in users are properly redirected from public pages.

2.  **Accounts API Refactor:**
    - Refactors the accounts API to better support HTMX-driven partial updates.
    - The `createAccount` controller now handles both JSON and `x-www-form-urlencoded` content types, allowing for seamless form submissions from HTMX.
    - Adds a new route and controller to serve the account creation form as an HTML fragment.
    - Improves and renames schemas and controller methods for better clarity and consistency.