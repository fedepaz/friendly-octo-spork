refactor: unify auth layout and implement smart header navigation

This commit centralizes the project's 'Premium Industrial' branding within the auth route group and implements a context-aware navigation header for login and registration flows.

Key Changes:
- Unified (auth) layout: Centralized branding, logo, and industrial background animations to ensure visual stability during auth transitions.
- Smart AuthHeader: Implemented dynamic route switching between Login and Register using 'usePathname' and 'asChild' navigation patterns.
- Form Refinement: Added tactical 'InLineError' validation to the RegisterForm for real-time Zod feedback.
- DataTable Polish: Refined layout margins and removed redundant wrappers in the core DataTable component.
- Skeleton Standardization: Unified Suspense and Skeleton patterns across Transactions and Accounts dashboards.
- Routes: Formalized 'ROUTES.REGISTER' in the global routes configuration.