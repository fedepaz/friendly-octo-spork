feat: Implement sidebar navigation and refactor authentication system

This commit introduces a new sidebar navigation layout, replacing the previous top navigation bar. A mobile-friendly hamburger menu has also been integrated.

The authentication system has been significantly refactored:
- JWT token generation and verification logic have been centralized in `src/middleware/auth.ts`.
- New middleware for token refreshing (`refreshTokenIfNeeded`) and improved cookie handling (`setAuthCookie`, `deleteCookie`) have been added.
- Route protection in `src/index.tsx` has been updated to utilize the new authentication middleware.
- The `Navbar` component has been removed, and all main pages now use the new `Layout` component with sidebar integration.
- Frontend agent documentation (`docs/frontend_agent_finance.md`) has been updated to reflect the new UI/UX guidelines for Neo-Brutalism design and sidebar navigation.