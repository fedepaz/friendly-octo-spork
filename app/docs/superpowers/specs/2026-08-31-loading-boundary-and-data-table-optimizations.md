# Design: LoadingBoundary & DataTable Optimizations

> **Date**: 2026-08-31
> **Status**: Draft - Pending Review
> **Source**: Patterns from `sistemaDemo` repo (PR #120)

## Context

This project shares programming logic with `sistemaDemo` (different business logic, same architecture). Two proven patterns from sistemaDemo are being brought to appFinance:

1. **LoadingBoundary** - A reusable Suspense wrapper with accessibility
2. **DataTable Optimizations** - Performance memo, edit/delete CRUD, bulk operations

## 1. LoadingBoundary Component

### Problem
Raw `<Suspense fallback={...}>` lacks accessibility attributes and dev-mode debugging. Each feature manually wraps skeletons without consistent patterns.

### Solution
Create a `LoadingBoundary` component that:
- Requires a `skeleton` prop (TypeScript enforced)
- Wraps skeleton in `aria-busy="true"` + `aria-live="polite"` for screen readers
- Optionally logs dev-mode messages via `name` prop

### Files
- **New**: `src/components/common/loading-boundary.tsx`
- **New**: `src/components/common/__tests__/loading-boundary.test.tsx`
- **Modified**: `src/components/common/index.ts` (export)
- **Modified**: `src/features/investments/components/InvestmentsDashboard.tsx` (migration)

### API
```tsx
interface LoadingBoundaryProps {
  skeleton: ReactNode;    // Required - TypeScript enforces this
  name?: string;          // Optional dev-mode logging
  children: ReactNode;
}

<LoadingBoundary skeleton={<InvestmentsDashboardSkeleton />} name="investments">
  <InvestmentsDataTable />
</LoadingBoundary>
```

## 2. DataTable Optimizations

### Problem
- No `memo()` causes unnecessary re-renders
- View-only actions (no edit/delete)
- No bulk operations
- No tooltips on action buttons

### Solution
Enhance existing DataTable with:
- `memo()` wrapper for performance
- Optional `onEdit`, `onDelete`, `onCreate` callbacks
- Bulk delete with confirmation dialog
- Tooltips on all action buttons
- `createLabel` prop for create button text

### Files
- **Modified**: `src/components/data-display/data-table/data-table.tsx`

### New Props (all optional - non-breaking)
```tsx
interface DataTableProps<TData, TValue> {
  // ... existing props ...
  onEdit?: (row: TData) => void;
  onDelete?: (row: TData) => void;
  onCreate?: () => void;
  createLabel?: string;           // Default: "Nuevo"
  confirm?: ConfirmConfig;        // Delete confirmation dialog
}

type ConfirmConfig = {
  title: string;
  description: string;
  label?: string;
};
```

### Changes
1. Split `DataTable` into `DataTableInner` + `export const DataTable = memo(DataTableInner)`
2. Add Edit/Delete/View tooltips on action buttons
3. Add Create button in toolbar when `onCreate` provided
4. Add bulk delete button when rows selected + `onDelete` provided
5. Add `AlertDialog` for delete confirmation when `confirm` prop provided

## 3. SlideOverForm Enhancements

### Problem
- Only supports `create` and `view` modes
- No confirmation dialog before submit
- No loading state indicator

### Solution
- Add `"edit"` mode with Pencil icon
- Add `confirm` prop with `AlertDialog` before submit
- Add `disabled` prop to disable submit button
- Add `Loader2` spinner during form submission

### Files
- **Modified**: `src/components/data-display/data-table/slide-over-form.tsx`

### New Props
```tsx
type SlideOverMode = "create" | "edit" | "view";  // Added "edit"

interface SlideOverFormProps<T extends FieldValues> {
  // ... existing props ...
  mode?: SlideOverMode;           // Added "edit"
  disabled?: boolean;             // New
  confirm?: ConfirmConfig;        // New - shows AlertDialog
}
```

### Changes
1. Add `"edit"` to `SlideOverMode` type
2. Add `ConfirmConfig` type import
3. Add `confirm` state and `AlertDialog` component
4. Add `handleSubmitClick` that shows confirm dialog if `confirm` prop provided
5. Add `Loader2` icon during `form.formState.isSubmitting`
6. Add `disabled` prop to disable submit button

## Testing

### LoadingBoundary
- Renders children when not suspended
- Shows skeleton when children suspend
- Wraps skeleton in aria-busy and aria-live
- Requires skeleton prop (TypeScript enforcement)

### DataTable
- Existing tests continue passing (non-breaking changes)
- New props are all optional

### SlideOverForm
- Existing tests continue passing
- New modes and props are optional

## Migration Path

1. Create `LoadingBoundary` component + tests
2. Export from `components/common/index.ts`
3. Migrate `InvestmentsDashboard.tsx` to use `LoadingBoundary`
4. Enhance `DataTable` with memo + new props
5. Enhance `SlideOverForm` with edit mode + confirm
6. Run `pnpm lint` and `pnpm type-check` to verify
