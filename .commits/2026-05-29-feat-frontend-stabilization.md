feat(frontend): align dependencies and stabilize starter app

- Update package.json with comprehensive dependencies (Radix UI, TanStack, Lucide, etc.).
- Remove redundant OpenMeteo weather feature and related files.
- Synchronize @repo/shared with missing UserProfile and Register schemas.
- Refactor User components to use 'name' instead of 'firstName'/'lastName'/'username'.
- Simplify and stub permission logic for single-user MVP.
- Fix ThemeProvider types and Login form field mismatches.
- Resolve 230+ TypeScript and linting errors.
