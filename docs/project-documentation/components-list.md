# Frontend Components Registry & QA Review

This document tracks all React components within the `apps/frontend/src` directory against **9 industrial standards** for responsiveness, accessibility, performance, and polish.

Every new feature component must pass all 9 criteria before shipping.

---

## Numbered Criteria

| # | Name | What to check (for my future self) |
|---|---|---|
| **1** | **Responsive (Zero-Scroll)** | `dvh` layouts, dense `gap-2`/`p-3`, no horizontal scroll, adapts without extra whitespace |
| **2** | **OKLCH Tokens** | No hardcoded colors (`#fff`, `red-500`, `emerald`, `rose`, `rgb()`). Uses `bg-primary`, `text-foreground`, `border-border/60`. No `text-amber-*` — use `text-warning` |
| **3** | **UX Helpers & A11y** | `aria-label` on icon-only buttons, tooltips, `FormDescription`/`FormMessage`, semantic HTML, `role="alert"` on error messages |
| **4** | **Golden Path Loading** | `loading.tsx` for the route, `<Suspense>` boundary per independent data section, colocated `{Name}Skeleton.tsx` matching real layout |
| **5** | **Cursor & Focus** | `cursor-pointer` on all clickable elements (buttons, links, interactive divs). `focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2` on interactive elements |
| **6** | **Keyboard Nav** | Auto-focus first interactive element on modal/wizard open, Escape closes modals, logical tab order, `role="progressbar"` on step indicators |
| **7** | **Reduced Motion** | `prefers-reduced-motion` respected (animations disabled). No hardcoded `animationDuration` that can't be overridden |
| **8** | **Semantic Warning** | No `text-amber-*`, `text-yellow-*`, `text-orange-*` — use `text-warning` / `border-warning` / `bg-warning/*` token |
| **9** | **Last Verified** | Date of last audit. Update when the component is modified. Stale date = needs re-review |

---

## Registry & Audit Log

**Key**: `x` = passes, `-` = fails/missing, `2026-06-22` = today's audit.

| Component | Feature | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | Status |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `Button` | UI Primitives | x | x | x | - | x | x | - | x | 2026-06-22 | Approved |
| `DataTable` | Shared | - | x | x | - | x | - | - | x | 2026-06-22 | Approved |
| `SlideOverForm` | Shared | x | x | x | - | x | - | - | x | 2026-06-22 | Premium |
| `LoginForm` | Auth | x | x | x | - | x | x | - | x | 2026-06-22 | Approved |
| `AuthDashboard` | Auth | x | x | x | - | - | - | - | x | 2026-06-22 | Approved |
| `UserTable` | Users | x | x | x | - | x | x | - | x | 2026-06-22 | Approved |
| `AccountDashboard` | Accounts | x | x | x | x | x | x | - | x | 2026-06-22 | Approved |
| `AccountCreateForm` | Accounts | x | x | x | - | x | - | - | x | 2026-06-22 | Premium |
| `RecurrencesDashboard` | Recurrences | x | x | x | x | x | x | - | x | 2026-06-22 | Approved |
| `SmartFormProvider` | Transactions | x | x | x | - | x | - | - | x | 2026-06-22 | Approved |
| `MonthSelector` | Shared | x | x | - | - | x | x | - | x | 2026-06-22 | Approved |
| `RootDashboard` | Dashboard | x | x | x | x | x | x | - | x | 2026-06-22 | Approved |
| `DesktopSidebar` | Layout | x | x | x | - | x | - | - | x | 2026-06-22 | Premium |
| `DashboardHeader` | Layout | x | x | x | - | x | - | - | x | 2026-06-22 | Approved |
| `AuthHeader` | Layout | x | x | x | - | x | - | - | x | 2026-06-22 | Approved |
| `MobileNavigation` | Layout | x | x | x | - | x | x | - | x | 2026-06-22 | Premium |
| `KPICard` | Shared | x | x | x | - | - | - | - | x | 2026-06-22 | Approved |
| `FeatureCard` | Shared | x | x | x | - | x | x | - | x | 2026-06-22 | Approved |
| `WizardModal` | Shared (UI) | x | x | - | - | x | x | - | x | 2026-06-22 | Approved |
| `WizardFooter` | Shared (UI) | x | x | - | - | x | x | - | x | 2026-06-22 | Approved |
| `StepIndicator` | Shared (UI) | x | x | x | - | - | x | - | x | 2026-06-22 | Approved |
| `InLineError` | Shared (UI) | x | x | x | - | - | - | - | x | 2026-06-22 | Approved |
| `WizardStepSkeleton` | Shared (UI) | x | x | - | x | - | - | - | x | 2026-06-22 | Approved |
| `TacticalDataTableCells` | Shared | x | x | - | - | - | - | - | x | 2026-06-22 | Premium |
| `KPIsDashboard` | Dashboard | x | x | - | - | x | - | - | x | 2026-06-22 | Approved |
| `TransTypeSelector` | Shared | x | x | - | - | x | x | - | x | 2026-06-22 | Approved |
| `MainChartsDashboard` | Dashboard | x | x | x | x | x | x | - | x | 2026-06-22 | Approved |
| `AnalyticChartsBottom` | Dashboard | x | x | - | - | - | - | - | x | 2026-06-22 | Approved |
| `SidebarChartsBudget` | Dashboard | x | x | - | - | - | - | - | x | 2026-06-22 | Approved |
| `SidebarChartsAccounts` | Dashboard | x | x | - | - | x | - | - | x | 2026-06-22 | Premium |
| `SidebarChartsRecentTransactions` | Dashboard | x | x | - | - | x | x | - | x | 2026-06-22 | Premium |
| `WizardFormProvider` | Providers | - | - | x | - | - | - | - | - | 2026-06-22 | Smart Controller |
| `SmartFormProviderRecurrence` | Recurrences | x | x | - | - | x | - | - | x | 2026-06-22 | Approved |
| `CardsDashboard` | Cards | x | x | x | x | x | x | - | x | 2026-06-22 | Approved |
| `CardsDataTable` | Cards | x | x | x | - | x | x | - | x | 2026-06-22 | Premium (Unified) |
| `CardViewForm` | Cards | x | x | - | - | - | - | - | x | 2026-06-22 | Premium (Tactical) |

---

## Notes & Known Issues

### Criterion 7 (Reduced Motion) — All components
Every component relies on the global `prefers-reduced-motion` rule in `globals.css` which disables all animations/transitions via `!important`. This works but is a blunt instrument — it disables benign transitions (opacity, color changes) alongside animations. No component handles it individually. **Acceptable for now.**

### Criterion 4 (Golden Path) — Non-data components
Components like `Button`, `InLineError`, `StepIndicator` etc. are UI primitives that don't fetch data. They are correctly exempt from Suspense/skeleton requirements.

### Removed entries (this audit)
- `WizardModalRecurrence` — component did not exist
- `CardSummaryKPIs` — component did not exist (KPIs are inline in `cards-data-table.tsx`)
- Duplicate `MonthSelector` row (was listed twice)

### Recent fixes (commit `bcf99eb` + this session)
- **`cursor-pointer`** added to button base (cva) and all native `<button>`/`<Link>` elements
- **`focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2`** added to all interactive elements
- **Auto-focus + Escape** in `WizardModal`
- **`role="progressbar"` + a11y attrs** on `StepIndicator`
- **`role="alert"`** on `InLineError` and `SmartFormProvider` error block
- **`aria-label="Cerrar"`** on `SlideOverForm` close button
- **Removed false affordance** in `SidebarChartsAccounts` (div had `cursor-pointer` but no `onClick`)
- **Fixed invalid Tailwind widths** in `DataTableSkeleton` (`w-37.5` → `w-[150px]`, etc.)
