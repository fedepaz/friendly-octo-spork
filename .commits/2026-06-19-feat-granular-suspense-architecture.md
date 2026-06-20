feat: implement granular Suspense architecture with colocated skeletons

- Add Suspense boundaries to RootDashboard (KPIs + Charts) with
  layout-matching skeletons (DashboardKPIsSkeleton, DashboardChartsSkeleton)
- Add nested Suspense inside wizard FormContainer/FormContainerRecurrence
  to keep modal shell visible during step data loading
- Repurpose orphaned transactions-wizard-skeleton.tsx into WizardStepSkeleton
  used by both create and update recurrence wizards
- Remove dead isLoading/if(isLoading)/LoadingSpinner from 4 dashboard
  components — useSuspenseQuery does not return isLoading
- Document query invalidation map, Suspense architecture, and nested
  Suspense pattern in frontend and UX agent docs
