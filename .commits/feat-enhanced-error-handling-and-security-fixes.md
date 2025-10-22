feat: Implement enhanced error handling and address security concerns

This commit introduces a dedicated error page for improved user experience during errors and addresses identified security vulnerabilities.

- **Error Handling:**
  - Implemented a new `ErrorPage.tsx` component to display detailed error information (message, status code, and stack trace in development).
  - Updated the global `app.onError` handler in `src/index.tsx` to render the `ErrorPage` for page requests and return JSON for API requests.
  - Modified `accounts.controller.tsx` and `auth.controller.tsx` to render the `ErrorPage` on page-rendering failures.

- **Security Fixes:**
  - Removed sensitive logging of plain passwords from `auth.controller.tsx` (High Severity).
  - Re-evaluated and mitigated potential XSS in `LoginPage.tsx` by relying on Hono's default JSX escaping and ensuring error messages are plain strings (Low Severity).

- **Technical Improvements:**
  - Correctly augmented Hono's `Env` interface in `src/types/hono.d.ts` to resolve a linting error and ensure proper type inference for context variables.

- **Test File Deletions:**
  - Removed several test files (`errorHandler.spec.ts`, `accounts.spec.ts`, `auth.spec.ts`, `categories.spec.ts`, `dashboard.spec.ts`, `recurrences.spec.ts`, `transactions.spec.ts`) as confirmed by the user.