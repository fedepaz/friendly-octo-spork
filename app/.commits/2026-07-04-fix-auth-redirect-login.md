fix(auth): redirect to login on session expiration

- Add redirect to /login when token refresh fails in clientFetch
- Clear localStorage and redirect on "Sesión expirada" error in ErrorProvider
- Ensures users are automatically redirected to login when session expires
