feat: implement jwt authentication and shared zod validation

- Implement Auth module with JWT, Passport, and Bcrypt
- Add GlobalAuthGuard and @Public decorator for route security
- Standardize @repo/shared package with Zod schemas and build scripts
- Add ZodValidationPipe for unified request validation
- Implement RequestIdMiddleware for traceability
- Add UserAuthRepository with soft-delete awareness
- Correct login logic to properly handle deletedAt status