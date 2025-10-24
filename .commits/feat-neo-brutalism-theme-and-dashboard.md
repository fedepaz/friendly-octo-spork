feat: Implement Neo-Brutalism theme and Dashboard

This commit introduces a major UI overhaul with the implementation of a Neo-Brutalism design system.

- **New Theme:** A new `neobrutalism.css` file has been added to define the color palette, typography, and component styles for the new theme. The inline styles in `Layout.tsx` have been removed.
- **New Components:** A `Navbar.tsx` and a `DashboardPage.tsx` with its corresponding routes have been created.
- **UI Refactoring:** All existing pages and components have been refactored to use the new theme and its associated CSS classes.
- **Auth Flow:** The `requireAuth` middleware now redirects to `/login` for unauthorized users.
- **API Routes:** API routes are now prefixed with `/` instead of `/api/`.