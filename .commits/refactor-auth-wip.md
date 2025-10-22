refactor(auth): WIP - Implement user authentication and modular route structure

This commit is a work-in-progress that introduces the foundation for user authentication and refactors the application to use a more modular and maintainable route structure.

- Adds `passwordHash` to the `User` model in `schema.prisma`.
- Refactors `index.tsx` to use `hono/jsx-renderer` and a main `Layout` component.
- Implements JWT authentication middleware (`jwtMiddleware`, `redirectIfAuth`, `requireAuth`).
- Modularizes routes by introducing `authRoutes` and `accountsRoutes`.
- Updates `errorHandler.ts` for more specific Zod error handling.
- Adds `bun-types` to `tsconfig.json`.
- Adds `@prisma/client` and `prisma` to `package.json`.