# Frontend Components Registry & QA Review

This document tracks all React components within the `apps/frontend/src` directory against **9 industrial standards** for responsiveness, accessibility, performance, and polish.

Every new feature component must pass all 9 criteria before shipping.

---

## Numbered Criteria

| # | Name | What to check (for my future self) |
|---|---|---|
| **1** | **Responsive (Two-Tier Scrolling)** | `dvh` layouts, dense `gap-2`/`p-3`, no horizontal scroll, adapts without extra whitespace |
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

**Key**: `x` = passes, `-` = fails/missing, `2026-11-16` = date of last audit.

| Component | Feature | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | Status |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `Button` | UI Primitives | x | x | x | - | x | x | - | x | 2026-08-30 | Approved |
| `DataTable` | Shared | - | x | x | - | x | - | - | x | 2026-08-30 | Approved |
| `SlideOverForm` | Shared | x | x | x | - | x | - | - | x | 2026-08-30 | Premium |
| `LoginForm` | Auth | x | x | x | - | x | x | - | x | 2026-08-30 | Approved |
| `AuthDashboard` | Auth | x | x | x | - | - | - | - | x | 2026-08-30 | Approved |
| `UsersDashboard` | Users | x | x | x | x | x | x | - | x | 2026-08-30 | Approved |
| `AccountDashboard` | Accounts | x | x | x | x | x | x | - | x | 2026-08-30 | Approved |
| `AccountCreateForm` | Accounts | x | x | x | - | x | - | - | x | 2026-08-30 | Premium |
| `RecurrencesDashboard` | Recurrences | x | x | x | x | x | x | - | x | 2026-08-30 | Approved |
| `SmartFormProvider` | Transactions | x | x | x | - | x | - | - | x | 2026-08-30 | Approved |
| `MonthSelector` | Shared | x | x | - | - | x | x | - | x | 2026-08-30 | Approved |
| `RootDashboard` | Dashboard | x | x | x | x | x | x | - | x | 2026-11-16 | Approved |
| `DesktopSidebar` | Layout | x | x | x | - | x | - | - | x | 2026-08-30 | Premium |
| `DashboardHeader` | Layout | x | x | x | - | x | - | - | x | 2026-08-30 | Approved |
| `AuthHeader` | Layout | x | x | x | - | x | - | - | x | 2026-08-30 | Approved |
| `MobileNavigation` | Layout | x | x | x | - | x | x | - | x | 2026-08-30 | Premium |
| `KPICard` | Shared | x | x | x | - | - | - | - | x | 2026-08-30 | Approved |
| `FeatureCard` | Shared | x | x | x | - | x | x | - | x | 2026-08-30 | Approved |
| `WizardModal` | Shared (UI) | x | x | - | - | x | x | - | x | 2026-08-30 | Approved |
| `WizardFooter` | Shared (UI) | x | x | - | - | x | x | - | x | 2026-08-30 | Approved |
| `StepIndicator` | Shared (UI) | x | x | x | - | - | x | - | x | 2026-08-30 | Approved |
| `InLineError` | Shared (UI) | x | x | x | - | - | - | - | x | 2026-08-30 | Approved |
| `WizardStepSkeleton` | Shared (UI) | x | x | - | x | - | - | - | x | 2026-08-30 | Approved |
| `TacticalDataTableCells` | Shared | x | x | - | - | - | - | - | x | 2026-08-30 | Premium |
| `KPIsDashboard` | Dashboard | x | x | - | - | x | - | - | x | 2026-11-16 | Approved |
| `TransTypeSelector` | Shared | x | x | - | - | x | x | - | x | 2026-08-30 | Approved |
| `MainChartsDashboard` | Dashboard | x | x | x | x | x | x | - | x | 2026-11-16 | Approved |
| `AnalyticChartsBottom` | Dashboard | x | x | - | - | - | - | - | x | 2026-08-30 | Approved |
| `SidebarChartsBudget` | Dashboard | x | x | - | - | - | - | - | x | 2026-08-30 | Approved |
| `SidebarChartsAccounts` | Dashboard | x | x | - | - | x | - | - | x | 2026-08-30 | Premium |
| `SidebarChartsRecentTransactions` | Dashboard | x | x | - | - | x | x | - | x | 2026-08-30 | Premium |
| `WizardFormProvider` | Providers | - | - | x | - | - | - | - | - | 2026-08-30 | Smart Controller |
| `SmartFormProviderRecurrence` | Recurrences | x | x | - | - | x | - | - | x | 2026-08-30 | Approved |
| `AuditLogDashboard` | AuditLogs | x | x | x | x | x | x | - | x | 2026-08-30 | Approved |
| `PermissionsDashboard` | Permissions | x | x | x | x | x | x | - | x | 2026-08-30 | Approved |
| `CardsDashboard` | Cards | x | x | x | x | x | x | - | x | 2026-08-30 | Approved |
| `CardsDataTable` | Cards | x | x | x | - | x | x | - | x | 2026-08-30 | Premium (Unified) |
| `CardViewForm` | Cards | x | x | - | - | - | - | - | x | 2026-08-30 | Premium (Tactical) |
| `AnalyticChartsMain` | Dashboard | x | x | - | - | - | - | - | x | 2026-11-16 | Approved |
| `TransactionsDataTable` | Transactions | - | x | x | - | x | - | - | x | 2026-11-16 | Needs fixes |
| `AccountDataTable` | Accounts | - | x | x | - | x | - | - | x | 2026-11-16 | Needs fixes |
| `UsersDataTable` | Users | - | x | x | - | x | - | - | x | 2026-11-16 | Needs fixes |
| `RecurrencesDataTable` | Recurrences | - | x | x | - | x | - | - | x | 2026-11-16 | Needs fixes |
| `InvestmentsDataTable` | Investments | - | x | x | - | x | - | - | x | 2026-11-16 | Needs fixes |
| `AuditLogDataTable` | AuditLogs | - | x | x | - | x | - | - | x | 2026-11-16 | Needs fixes |
| `ExportDropdown` | Shared | x | x | x | - | - | x | - | x | 2026-11-16 | Needs fixes |
| `DataTableFacetedFilter` | Shared | x | x | x | - | - | x | - | x | 2026-11-16 | Needs fixes |
| `AuditActionSelector` | AuditLogs | x | x | - | - | x | x | - | x | 2026-11-16 | Approved |
| `PermissionsUserManager` | Permissions | - | x | x | - | x | x | - | x | 2026-11-16 | Needs fixes |
| `PermissionRowItem` | Permissions | - | x | - | - | x | x | - | x | 2026-11-16 | Needs fixes |
| `LoadingBoundary` | Shared | x | x | x | x | x | x | - | x | 2026-11-16 | Premium |
| `EmptyState` | Shared | - | x | x | - | x | x | - | x | 2026-11-16 | Needs fixes |
| `AlertModalDialog` | Modals | - | x | - | - | x | - | - | x | 2026-11-16 | Needs fixes |

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

### Recent fixes (commit `bcf99eb` + previous sessions)
- **`cursor-pointer`** added to button base (cva) and all native `<button>`/`<Link>` elements
- **`focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2`** added to all interactive elements
- **Auto-focus + Escape** in `WizardModal`
- **`role="progressbar"` + a11y attrs** on `StepIndicator`
- **`role="alert"`** on `InLineError` and `SmartFormProvider` error block
- **`aria-label="Cerrar"`** on `SlideOverForm` close button
- **Removed false affordance** in `SidebarChartsAccounts` (div had `cursor-pointer` but no `onClick`)
- **Fixed invalid Tailwind widths** in `DataTableSkeleton` (`w-37.5` → `w-[150px]`, etc.)

### Recent fixes (2026-08-30 — UX/UI review)
- **`UsersDashboard`**: Added `flex-1 min-h-0 animate-premium-in` to wrapper div for Zero-Scroll compliance
- **`AuditLogDashboard`**: Added `flex-1 min-h-0 animate-premium-in` to wrapper div for Zero-Scroll compliance
- **`PermissionsDashboard`**: Added `animate-premium-in` to wrapper div for consistency
- **Renamed** `UserTable` to `UsersDashboard` in registry (component name mismatch)

### Known issues (2026-11-16 — whole-app baseline review)
Full audit with `file:line` evidence. Priority groups:

- **P0 (mobile-breaking):** DataTable toolbar clips at 375px (`data-table.tsx:399,460`); table card not height-bounded (`data-table.tsx:375`); wizard structural error block renders outside the fixed modal, invisible (`SmartFormProvider*.tsx`); mobile nav skips permission filtering (`mobile-navigation.tsx:172`); card-close wizard double-submit (`SmartFormProviderCard.tsx:58`); touch targets <32px (pagination, checkboxes, Switch, card toggle).
- **P1:** off-token `h-12` inputs; `text-2.5` classes generate nothing (cards/recurrences/transactions view forms); Spacing Lock violations (`data-table.tsx:376`, `data-table-skeleton.tsx:73`, `alert-dialog.tsx:39`); SM density caps exceeded (wizard `px-5 py-6`, `space-y-6/8`, icons `h-5+`); hardcoded `bg-black/*` backdrops (`dialog.tsx:41`, `sheet.tsx:24`, `alert-dialog.tsx:21`); LoadingBoundary used in 1/15 sections; `PermissionsDashboard` text fallback while its skeleton is dead code.
- **P2:** false `cursor-pointer` on non-clickable rows (`data-table.tsx:504`); `dropdown-menu.tsx:84`/`command.tsx:118`/`select.tsx` missing cursor; focus styles use ring/none instead of the mandated outline; `AlertModalDialog` has no close button; review-step `grid-cols-2` single-child half-width button; `SlideOverForm` capped by `sm:max-w-sm` from `sheet.tsx:43`.

**Mobile dashboard redesign** (single page scroll, buttons last, Zero-Scroll docs revision) specified separately: `docs/superpowers/specs/2026-11-16-mobile-dashboard-single-scroll-design.md`.

- **Resolved on this branch:** dashboard mobile scroll (single page scroll + ordering, see spec) — registry rows re-approved 2026-11-16; Zero-Scroll standard revised to the two-tier rule (`ux_agent_finance.md`, `qa_agent_finance.md`).
