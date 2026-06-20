feat(auth): implement global authentication guard and shared schema integration

- Register GlobalAuthGuard as a global APP_GUARD in AppModule.
- Integrate shared Zod schemas (LoginAuth, RefreshToken, ChangePassword) from @repo/shared into AuthController and AuthService.
- Enable @Public() decorator for opt-out authentication.
- Add app/COMMIT_CONVENTIONS.md to enforce conventional commits.
- Update turbo.json with optimized task definitions (prisma:generate, test).
- Remove outdated ROADMAP.md (Bun/Hono reference).
- Fix minor type issue in AuthService email field.
- Add development dependencies for commitlint, husky, and playwright.
