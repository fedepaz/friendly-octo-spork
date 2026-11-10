# LoadingBoundary & DataTable Optimizations Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add LoadingBoundary component for accessible Suspense wrappers, and enhance DataTable/SlideOverForm with CRUD operations, bulk delete, and performance optimizations.

**Architecture:** Three related components in the data display layer: (1) LoadingBoundary wraps Suspense with accessibility, (2) DataTable gets memo() + edit/delete/create actions + bulk operations, (3) SlideOverForm gets edit mode + confirmation dialog.

**Tech Stack:** React, TypeScript, @tanstack/react-table, react-hook-form, next-intl, shadcn/ui components (AlertDialog, Tooltip)

## Global Constraints

- All new props must be optional (non-breaking changes)
- Follow existing code conventions (use `useTranslations` for i18n)
- Run `pnpm lint` and `pnpm type-check` after each task
- Use TDD: write failing test first, then implement

---

## File Structure

| File | Action | Purpose |
|------|--------|---------|
| `src/components/common/loading-boundary.tsx` | Create | LoadingBoundary component |
| `src/components/common/__tests__/loading-boundary.test.tsx` | Create | LoadingBoundary tests |
| `src/components/common/index.ts` | Modify | Export LoadingBoundary |
| `src/features/investments/components/InvestmentsDashboard.tsx` | Modify | Migrate to LoadingBoundary |
| `src/components/data-display/data-table/data-table.tsx` | Modify | Add memo + CRUD actions |
| `src/components/data-display/data-table/slide-over-form.tsx` | Modify | Add edit mode + confirm |

---

### Task 1: Create LoadingBoundary Component

**Files:**
- Create: `src/components/common/loading-boundary.tsx`
- Create: `src/components/common/__tests__/loading-boundary.test.tsx`
- Modify: `src/components/common/index.ts`

**Interfaces:**
- Produces: `LoadingBoundary` component with `{ skeleton, name?, children }` props

- [ ] **Step 1: Write the failing test**

```tsx
// src/components/common/__tests__/loading-boundary.test.tsx
import { render, screen } from "@testing-library/react";
import { LoadingBoundary } from "../loading-boundary";

function AsyncComponent() {
  return <div data-testid="real-content">Loaded</div>;
}

function ThrowingComponent() {
  throw new Promise(() => {}); // Always suspends
}

describe("LoadingBoundary", () => {
  it("renders children when not suspended", () => {
    render(
      <LoadingBoundary skeleton={<div data-testid="skeleton" />}>
        <AsyncComponent />
      </LoadingBoundary>,
    );
    expect(screen.getByTestId("real-content")).toBeInTheDocument();
    expect(screen.queryByTestId("skeleton")).not.toBeInTheDocument();
  });

  it("shows skeleton when children suspend", () => {
    render(
      <LoadingBoundary skeleton={<div data-testid="skeleton" />}>
        <ThrowingComponent />
      </LoadingBoundary>,
    );
    expect(screen.getByTestId("skeleton")).toBeInTheDocument();
    expect(screen.queryByTestId("real-content")).not.toBeInTheDocument();
  });

  it("wraps skeleton in aria-busy and aria-live", () => {
    render(
      <LoadingBoundary skeleton={<div data-testid="skeleton" />}>
        <ThrowingComponent />
      </LoadingBoundary>,
    );
    const wrapper = screen.getByTestId("skeleton").parentElement;
    expect(wrapper).toHaveAttribute("aria-busy", "true");
    expect(wrapper).toHaveAttribute("aria-live", "polite");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm --filter frontend test -- --testPathPattern="loading-boundary" --no-coverage`
Expected: FAIL with "Cannot find module '../loading-boundary'"

- [ ] **Step 3: Write minimal implementation**

```tsx
// src/components/common/loading-boundary.tsx
import { Suspense, type ReactNode } from "react";

interface LoadingBoundaryProps {
  /** Required skeleton fallback. TypeScript enforces this. */
  skeleton: ReactNode;
  /** Optional name for dev-mode console logging */
  name?: string;
  /** Content that suspends */
  children: ReactNode;
}

export function LoadingBoundary({
  skeleton,
  name,
  children,
}: LoadingBoundaryProps) {
  if (process.env.NODE_ENV === "development" && name) {
    console.log(`[LoadingBoundary] "${name}" showing skeleton`);
  }

  return (
    <Suspense
      fallback={
        <div aria-busy="true" aria-live="polite">
          {skeleton}
        </div>
      }
    >
      {children}
    </Suspense>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm --filter frontend test -- --testPathPattern="loading-boundary" --no-coverage`
Expected: PASS

- [ ] **Step 5: Export from index**

```tsx
// src/components/common/index.ts
// Add this line:
export { LoadingBoundary } from "./loading-boundary";
```

- [ ] **Step 6: Run lint and type-check**

Run: `pnpm lint && pnpm type-check`
Expected: PASS

- [ ] **Step 7: Commit**

```bash
git add src/components/common/loading-boundary.tsx src/components/common/__tests__/loading-boundary.test.tsx src/components/common/index.ts
git commit -m "feat(components): add LoadingBoundary with accessibility support"
```

---

### Task 2: Migrate InvestmentsDashboard to LoadingBoundary

**Files:**
- Modify: `src/features/investments/components/InvestmentsDashboard.tsx`

**Interfaces:**
- Consumes: `LoadingBoundary` from Task 1
- Produces: Updated InvestmentsDashboard using LoadingBoundary

- [ ] **Step 1: Write the failing test**

```tsx
// src/features/investments/__tests__/loading-boundary-migration.test.tsx
import { render, screen } from "@testing-library/react";
import { InvestmentsDashboard } from "../components/InvestmentsDashboard";

// Mock the data table to avoid actual data fetching
jest.mock("../components/investments-data-table", () => ({
  InvestmentsDataTable: () => <div data-testid="data-table">DataTable</div>,
}));

describe("InvestmentsDashboard LoadingBoundary migration", () => {
  it("renders with LoadingBoundary wrapper", () => {
    render(<InvestmentsDashboard />);
    expect(screen.getByTestId("data-table")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm --filter frontend test -- --testPathPattern="loading-boundary-migration" --no-coverage`
Expected: FAIL (test may pass if component already works, but we're verifying the migration)

- [ ] **Step 3: Implement the migration**

```tsx
// src/features/investments/components/InvestmentsDashboard.tsx
import { InvestmentsDataTable } from "./investments-data-table";
import { InvestmentsDashboardSkeleton } from "./investments-dashboard-skeleton";
import { LoadingBoundary } from "@/components/common/loading-boundary";

export function InvestmentsDashboard() {
  return (
    <div className="flex-1 flex flex-col gap-3 min-h-0 animate-premium-in">
      <LoadingBoundary
        skeleton={<InvestmentsDashboardSkeleton />}
        name="investments"
      >
        <InvestmentsDataTable />
      </LoadingBoundary>
    </div>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm --filter frontend test -- --testPathPattern="loading-boundary-migration" --no-coverage`
Expected: PASS

- [ ] **Step 5: Run lint and type-check**

Run: `pnpm lint && pnpm type-check`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/features/investments/components/InvestmentsDashboard.tsx src/features/investments/__tests__/loading-boundary-migration.test.tsx
git commit -m "feat(investments): migrate to LoadingBoundary component"
```

---

### Task 3: Enhance DataTable with memo() and CRUD Props

**Files:**
- Modify: `src/components/data-display/data-table/data-table.tsx`

**Interfaces:**
- Consumes: Existing DataTable component
- Produces: Enhanced DataTable with optional onEdit, onDelete, onCreate, confirm, createLabel props

- [ ] **Step 1: Write the failing test**

```tsx
// src/components/data-display/data-table/__tests__/data-table-crud.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { DataTable } from "../data-table";

const mockColumns = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "amount", header: "Amount" },
];

const mockData = [
  { id: "1", name: "Test Item", amount: 100 },
  { id: "2", name: "Another Item", amount: 200 },
];

describe("DataTable CRUD enhancements", () => {
  it("renders edit button when onEdit provided", () => {
    const onEdit = jest.fn();
    render(
      <DataTable
        columns={mockColumns}
        data={mockData}
        title="Test"
        tableName="test"
        onEdit={onEdit}
        onView={() => {}}
      />,
    );
    expect(screen.getByLabelText("Editar")).toBeInTheDocument();
  });

  it("renders create button when onCreate provided", () => {
    const onCreate = jest.fn();
    render(
      <DataTable
        columns={mockColumns}
        data={mockData}
        title="Test"
        tableName="test"
        onCreate={onCreate}
        createLabel="Add New"
      />,
    );
    expect(screen.getByLabelText("Add New")).toBeInTheDocument();
  });

  it("calls onEdit when edit button clicked", () => {
    const onEdit = jest.fn();
    render(
      <DataTable
        columns={mockColumns}
        data={mockData}
        title="Test"
        tableName="test"
        onEdit={onEdit}
        onView={() => {}}
      />,
    );
    fireEvent.click(screen.getByLabelText("Editar"));
    expect(onEdit).toHaveBeenCalledWith(mockData[0]);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm --filter frontend test -- --testPathPattern="data-table-crud" --no-coverage`
Expected: FAIL with "Unable to find role button with name /editar/i"

- [ ] **Step 3: Implement memo wrapper**

Add `memo` import and wrap the component:

```tsx
// At top of file, add memo to imports:
import { Fragment, memo, ReactNode, useEffect, useMemo, useState } from "react";

// At bottom of file, before SortableHeader export:
// Rename function to DataTableInner, then export:
function DataTableInner<TData, TValue>({ ... }: DataTableProps<TData, TValue>) {
  // ... existing implementation ...
}

export const DataTable = memo(DataTableInner) as typeof DataTableInner;
```

- [ ] **Step 4: Add new props to DataTableProps**

```tsx
// Add to DataTableProps interface:
interface DataTableProps<TData, TValue> {
  // ... existing props ...
  onEdit?: (row: TData) => void;
  onDelete?: (row: TData) => void;
  onCreate?: () => void;
  createLabel?: string;
  confirm?: ConfirmConfig;
}

// Add ConfirmConfig type:
export type ConfirmConfig = {
  title: string;
  description: string;
  label?: string;
};
```

- [ ] **Step 5: Add edit/delete buttons to action column**

```tsx
// In actionColumn cell, add after the view button:
{onEdit && (
  <Tooltip>
    <TooltipTrigger asChild>
      <Button
        variant="outline"
        size="sm"
        className="min-h-10 text-primary"
        onClick={() => onEdit(row.original)}
        aria-label="Editar"
      >
        <Pencil className="h-4 w-4" />
      </Button>
    </TooltipTrigger>
    <TooltipContent side="top" className="border border-border shadow-md bg-popover">
      <p>Editar</p>
    </TooltipContent>
  </Tooltip>
)}
```

- [ ] **Step 6: Add create button to toolbar**

```tsx
// In the toolbar section, add after ExportDropdown:
{onCreate && (
  <Tooltip>
    <TooltipTrigger asChild>
      <Button
        variant="outline"
        size="sm"
        className="h-8 text-xs"
        onClick={onCreate}
        aria-label={createLabel || "Nuevo"}
      >
        <Plus className="h-3.5 w-3.5 mr-1" />
        {breakpoint === "sm" ? "" : createLabel || "Nuevo"}
      </Button>
    </TooltipTrigger>
    <TooltipContent side="top" className="border border-border shadow-md bg-popover">
      <p>{createLabel || "Nuevo"}</p>
    </TooltipContent>
  </Tooltip>
)}
```

- [ ] **Step 7: Add Pencil and Plus to imports**

```tsx
// Add to lucide-react imports:
import {
  ArrowUpDown,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  Filter,
  Pencil,
  Plus,
  Search,
} from "lucide-react";
```

- [ ] **Step 8: Run test to verify it passes**

Run: `pnpm --filter frontend test -- --testPathPattern="data-table-crud" --no-coverage`
Expected: PASS

- [ ] **Step 9: Run lint and type-check**

Run: `pnpm lint && pnpm type-check`
Expected: PASS

- [ ] **Step 10: Commit**

```bash
git add src/components/data-display/data-table/data-table.tsx src/components/data-display/data-table/__tests__/data-table-crud.test.tsx
git commit -m "feat(data-table): add memo wrapper and CRUD action props"
```

---

### Task 4: Add Bulk Delete and Confirmation Dialog to DataTable

**Files:**
- Modify: `src/components/data-display/data-table/data-table.tsx`

**Interfaces:**
- Consumes: DataTable from Task 3
- Produces: DataTable with bulk delete and confirmation dialog

- [ ] **Step 1: Write the failing test**

```tsx
// Add to data-table-crud.test.tsx:
describe("DataTable bulk delete", () => {
  it("shows bulk delete button when rows selected and onDelete provided", () => {
    const onDelete = jest.fn();
    render(
      <DataTable
        columns={mockColumns}
        data={mockData}
        title="Test"
        tableName="test"
        onDelete={onDelete}
        onView={() => {}}
      />,
    );
    // Select first row
    const checkboxes = screen.getAllByRole("checkbox");
    fireEvent.click(checkboxes[1]); // First data row checkbox
    expect(screen.getByLabelText(/Eliminar/)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm --filter frontend test -- --testPathPattern="data-table-crud" --no-coverage`
Expected: FAIL (bulk delete button not yet implemented)

- [ ] **Step 3: Add AlertDialog import**

```tsx
// Add to imports:
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
```

- [ ] **Step 4: Add state and handler**

```tsx
// Inside DataTableInner, add state:
const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
const [itemsToDelete, setItemsToDelete] = useState<TData | null>(null);
const [isBulkDelete, setIsBulkDelete] = useState(false);

// Add handlers:
const handleDeleteSingle = (item: TData) => {
  setIsBulkDelete(false);
  setItemsToDelete(item);
  setDeleteDialogOpen(true);
};

const handleBulkDelete = () => {
  setIsBulkDelete(true);
  setDeleteDialogOpen(true);
};

const confirmDelete = () => {
  if (!onDelete) return;
  if (isBulkDelete) {
    const selectedRows = table.getFilteredSelectedRowModel().rows;
    for (const row of selectedRows) {
      onDelete(row.original);
    }
  } else if (itemsToDelete) {
    onDelete(itemsToDelete);
  }
  table.resetRowSelection();
  setDeleteDialogOpen(false);
  setItemsToDelete(null);
  setIsBulkDelete(false);
};
```

- [ ] **Step 5: Add delete button to action column**

```tsx
// In actionColumn cell, add delete button:
{onDelete && (
  <Tooltip>
    <TooltipTrigger asChild>
      <Button
        variant="outline"
        size="sm"
        className="min-h-10 text-destructive"
        onClick={() => handleDeleteSingle(row.original)}
        aria-label="Eliminar"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </TooltipTrigger>
    <TooltipContent side="top" className="border border-border shadow-md bg-popover">
      <p>Eliminar</p>
    </TooltipContent>
  </Tooltip>
)}
```

- [ ] **Step 6: Add bulk delete button to toolbar**

```tsx
// In toolbar section, add after create button:
{selectedCount > 0 && onDelete && (
  <Tooltip>
    <TooltipTrigger asChild>
      <Button
        variant="destructive"
        size="sm"
        className="h-8 text-xs"
        onClick={handleBulkDelete}
        aria-label={`Eliminar ${selectedCount} seleccionados`}
      >
        <Trash2 className="mr-1.5 h-3.5 w-3.5" />
        {breakpoint === "sm" ? selectedCount : `Eliminar (${selectedCount})`}
      </Button>
    </TooltipTrigger>
    <TooltipContent side="top" className="border border-border shadow-md bg-popover">
      <p>Eliminar seleccionados</p>
    </TooltipContent>
  </Tooltip>
)}
```

- [ ] **Step 7: Add Trash2 to imports**

```tsx
// Add to lucide-react imports:
import {
  ArrowUpDown,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  Filter,
  Pencil,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
```

- [ ] **Step 8: Add AlertDialog JSX before closing fragment**

```tsx
// Add before the closing </> fragment:
<AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>
        {confirm?.title || "¿Estás seguro?"}
      </AlertDialogTitle>
      <AlertDialogDescription>
        {confirm?.description || "Esta acción no se puede deshacer."}
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancelar</AlertDialogCancel>
      <AlertDialogAction onClick={confirmDelete}>
        {confirm?.label || "Eliminar"}
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

- [ ] **Step 9: Run test to verify it passes**

Run: `pnpm --filter frontend test -- --testPathPattern="data-table-crud" --no-coverage`
Expected: PASS

- [ ] **Step 10: Run lint and type-check**

Run: `pnpm lint && pnpm type-check`
Expected: PASS

- [ ] **Step 11: Commit**

```bash
git add src/components/data-display/data-table/data-table.tsx
git commit -m "feat(data-table): add bulk delete with confirmation dialog"
```

---

### Task 5: Enhance SlideOverForm with Edit Mode and Confirmation

**Files:**
- Modify: `src/components/data-display/data-table/slide-over-form.tsx`

**Interfaces:**
- Consumes: Existing SlideOverForm component
- Produces: Enhanced SlideOverForm with edit mode, confirm dialog, disabled prop

- [ ] **Step 1: Write the failing test**

```tsx
// src/components/data-display/data-table/__tests__/slide-over-form-enhanced.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { SlideOverForm } from "../slide-over-form";

describe("SlideOverForm enhanced", () => {
  it("renders edit icon when mode is edit", () => {
    render(
      <SlideOverForm
        open={true}
        onOpenChange={() => {}}
        title="Test Form"
        mode="edit"
      >
        <div>Form content</div>
      </SlideOverForm>,
    );
    expect(screen.getByText("Actualizar")).toBeInTheDocument();
  });

  it("disables submit when disabled prop is true", () => {
    render(
      <SlideOverForm
        open={true}
        onOpenChange={() => {}}
        title="Test Form"
        mode="create"
        disabled={true}
      >
        <div>Form content</div>
      </SlideOverForm>,
    );
    const submitButton = screen.getByText("Crear");
    expect(submitButton).toBeDisabled();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm --filter frontend test -- --testPathPattern="slide-over-form-enhanced" --no-coverage`
Expected: FAIL with "Unable to find text: Actualizar"

- [ ] **Step 3: Update SlideOverMode type**

```tsx
// Change from:
type SlideOverMode = "create" | "view";

// To:
type SlideOverMode = "create" | "edit" | "view";
```

- [ ] **Step 4: Add new props**

```tsx
// Add to SlideOverFormProps:
interface SlideOverFormProps<T extends FieldValues> {
  // ... existing props ...
  disabled?: boolean;
  confirm?: {
    title: string;
    description: string;
    label?: string;
  };
}
```

- [ ] **Step 5: Add state and handlers**

```tsx
// Inside component, add:
const [confirmOpen, setConfirmOpen] = useState(false);

const isSubmitDisabled =
  disabled ||
  (form ? !form.formState.isValid || form.formState.isSubmitting : false);

const submitForm = () => {
  if (formId) {
    (document.getElementById(formId) as HTMLFormElement)?.requestSubmit();
  } else {
    onSave?.();
  }
};

const handleSubmitClick = () => {
  if (confirm) {
    setConfirmOpen(true);
  } else {
    submitForm();
  }
};

const handleConfirmSubmit = () => {
  setConfirmOpen(false);
  submitForm();
};
```

- [ ] **Step 6: Update getIcon for edit mode**

```tsx
// Update getIcon function:
const getIcon = () => {
  if (isViewMode) return <Eye className="mr-2 h-4 w-4" />;
  if (isCreateMode) return <Plus className="mr-2 h-4 w-4" />;
  return <Pencil className="mr-2 h-4 w-4" />;
};
```

- [ ] **Step 7: Update getActionLabel for edit mode**

```tsx
// Update getActionLabel function:
const getActionLabel = () => {
  if (isViewMode) return sofT("closeAction");
  if (isCreateMode) return saveLabel || sofT("createAction");
  return saveLabel || sofT("updateAction");
};
```

- [ ] **Step 8: Add Pencil and Loader2 to imports**

```tsx
// Update lucide-react import:
import { Eye, Plus, Pencil, Loader2 } from "lucide-react";
```

- [ ] **Step 9: Update submit button with disabled and loading states**

```tsx
// Update the submit Button:
<Button
  type={formId ? "submit" : "button"}
  form={formId}
  onClick={!formId ? handleSubmitClick : undefined}
  disabled={isSubmitDisabled}
>
  {form?.formState.isSubmitting ? (
    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
  ) : (
    getIcon()
  )}
  {getActionLabel()}
</Button>
```

- [ ] **Step 10: Add AlertDialog for confirmation**

```tsx
// Add imports:
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Add before closing </Sheet>:
<AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>{confirm?.title}</AlertDialogTitle>
      <AlertDialogDescription>
        {confirm?.description}
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancelar</AlertDialogCancel>
      <AlertDialogAction onClick={handleConfirmSubmit}>
        {confirm?.label || "Confirmar"}
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

- [ ] **Step 11: Add useState import**

```tsx
// Add to React imports:
import { useState } from "react";
```

- [ ] **Step 12: Run test to verify it passes**

Run: `pnpm --filter frontend test -- --testPathPattern="slide-over-form-enhanced" --no-coverage`
Expected: PASS

- [ ] **Step 13: Run lint and type-check**

Run: `pnpm lint && pnpm type-check`
Expected: PASS

- [ ] **Step 14: Commit**

```bash
git add src/components/data-display/data-table/slide-over-form.tsx src/components/data-display/data-table/__tests__/slide-over-form-enhanced.test.tsx
git commit -m "feat(slide-over-form): add edit mode and confirmation dialog"
```

---

### Task 6: Final Verification

**Files:**
- None (verification only)

- [ ] **Step 1: Run all tests**

Run: `pnpm test -- --no-coverage`
Expected: All tests PASS

- [ ] **Step 2: Run lint**

Run: `pnpm lint`
Expected: PASS

- [ ] **Step 3: Run type-check**

Run: `pnpm type-check`
Expected: PASS

- [ ] **Step 4: Run build**

Run: `pnpm build`
Expected: PASS

- [ ] **Step 5: Final commit if needed**

```bash
git add .
git commit -m "chore: final verification for LoadingBoundary and DataTable optimizations"
```

---

## Summary

| Task | Component | Changes |
|------|-----------|---------|
| 1 | LoadingBoundary | New component with accessibility |
| 2 | InvestmentsDashboard | Migrate to LoadingBoundary |
| 3 | DataTable | Add memo + CRUD props |
| 4 | DataTable | Add bulk delete + confirmation |
| 5 | SlideOverForm | Add edit mode + confirmation |
| 6 | Verification | Final checks |
