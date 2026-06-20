feat(backend): implement accounts module and enhance health monitoring

- Implement `AccountsModule` with full CRUD support (Controller, Service, Repository).
- Enforce strict user-scoping for all account operations using `GlobalAuthGuard` and `@CurrentUser`.
- Integrate shared Zod validation (`createAccountSchema`) for account creation.
- Enhance `HealthController` with explicit HTTP status codes and detailed logging.
- Register `AccountsModule` in `AppModule` for global availability.
- Ensure soft-delete compliance (`deletedAt: null`) in all account queries.
