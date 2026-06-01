feat: true zero-scroll vertical layout and industrial ui stabilization

Layout:
- Refactor DashboardLayout to enforce overflow-hidden on desktop.
- Implement flexible height distribution in RootDashboard for vertical viewport fit.
- Add custom-scrollbar utility for high-density internal scrolling.
- Fix chart visibility on mobile with adaptive min-heights.

UI/UX Stabilization:
- Enforce Zero-Radius mandate across all core forms and system pages.
- Standardize font usage (Sans for UI, Mono for data) in Auth and Profile views.
- Refactor ComingSoon and DatabaseUnavailable pages with industrial HUD aesthetic.

Docs:
- Register all remaining frontend components in components-list.md.
