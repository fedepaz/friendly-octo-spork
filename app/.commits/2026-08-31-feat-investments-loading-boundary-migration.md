feat(investments): migrate to LoadingBoundary component

Replace raw `<Suspense>` in InvestmentsDashboard with the new
LoadingBoundary component from Task 1, which adds accessibility
attributes (aria-busy, aria-live) and dev-mode logging.

- Wrap InvestmentsDataTable with LoadingBoundary
- Pass InvestmentsDashboardSkeleton as the required skeleton prop
- Add "investments" name for dev-mode console logging
- Add test verifying component renders correctly after migration
