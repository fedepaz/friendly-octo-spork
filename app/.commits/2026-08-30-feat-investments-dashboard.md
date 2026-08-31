feat(investments): add investment portfolio dashboard page

New /investments route showing INVESTMENT accounts with principal,
total earned (from RETURN transactions), and total value.

Backend: NestJS module with raw SQL aggregation query.
Frontend: DataTable with Suspense, useSuspenseQuery hook,
colocated skeleton, nav integration, i18n (es/en).

Also fixes Zero-Scroll compliance on UsersDashboard,
AuditLogDashboard, and PermissionsDashboard (flex-1 min-h-0).
