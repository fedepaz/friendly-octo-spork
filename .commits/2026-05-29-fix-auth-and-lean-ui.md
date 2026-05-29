fix(auth): resolve unauthorized loops and streamline lean frontend

- Backend: Fix JwtStrategy logic to correctly allow active users (previously throwing 401).
- Backend: Mark /auth/refresh as @Public() to enable token refresh on expiration.
- Frontend: Remove redundant weather feature, skeletons, and boilerplate pages.
- Frontend: Refactor RootDashboard and Layout for a leaner, finance-focused MVP.
- Frontend: Integrate Shadcn/UI with components.json and core dependencies.
- Frontend: Simplify sidebar and navigation by removing dynamic permission checks for MVP.
- Docs: Codify Shadcn/UI as the official UI standard in frontend_agent_finance.md.
