feat: Implement robust authentication and schema updates

This commit introduces a comprehensive authentication system using JWT and cookies,
refactors the Hono application for modularity, and updates the Prisma schema
to use string-based CUIDs for user IDs.

Key changes include:
- Migrated User IDs to CUID strings for enhanced scalability and security.
- Added 'PAYMENT' to TransactionType enum.
- Implemented JWT-based authentication with 'auth_token' cookies.
- Introduced 'requireAuth' middleware for protected routes.
- Refactored Hono application with global middleware (logger, CORS).
- Established modular routing for API and page routes.
- Added global error handling and a 404 page.