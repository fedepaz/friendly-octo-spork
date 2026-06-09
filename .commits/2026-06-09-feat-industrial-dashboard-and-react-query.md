feat: industrial dashboard implementation and react query refactor

- Implement backend DashboardModule with specialized aggregation repositories
- Utilize optimized Raw SQL (generate_series, FILTER) for robust financial reporting
- Refactor frontend to React Query v5 (useSuspenseQuery) for declarative data fetching
- Align dashboard layout with "Zero-Scroll" and "Industrial UX" standards
- Add shared Zod schemas for dashboard DTOs to ensure end-to-end type safety
- Remove legacy Dolar API placeholders in favor of internal financial data
