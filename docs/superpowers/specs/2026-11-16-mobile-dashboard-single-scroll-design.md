# Mobile Dashboard: Single-Page Scroll + Zero-Scroll Doc Revision

**Date:** 2026-11-16
**Status:** Approved (design sections 1–3 confirmed by user)
**Scope:** Dashboard screen on mobile (`< lg`) + deliberate revision of the Zero-Scroll standard in `docs/agents/ux_agent_finance.md`.

## 1. Problem

On mobile the dashboard is a fixed-height column that clips its own content:

- `RootDashboard.tsx:30` — `flex flex-1 flex-col gap-3 min-h-0 overflow-hidden` caps the whole dashboard at viewport height.
- `kpis-dashboard.tsx:65` — KPI block (3 stacked cards + 2 full-width action buttons, `:120-135`) auto-sizes to ~350–450px.
- `main-charts-dashboard.tsx:13` — charts region gets only the leftover `flex-1` space (~100–200px) and scrolls **internally** over ~1200px+ of content (`analytic-charts-main.tsx:43` and `analytic-charts-bottom.tsx:40` are each `min-h-75` = 300px, plus 3 sidebar cards).
- Result: triple-nested scrolling (page → charts region → individual cards), graphs effectively invisible, action buttons wedged between KPIs and charts.

## 2. Goals

1. On mobile, the dashboard renders as **one continuous page scroll** (scroller = existing `main` in `(dashboard)/layout.tsx:22`, already `overflow-y-auto`).
2. **No nested scroll windows** on mobile — KPIs grid, charts region, and sidebar cards flow naturally.
3. Action buttons stay in the flow (no FAB, no header actions) and move to the **end** of the mobile stack.
4. Desktop (`lg`+) behavior is **unchanged** — today's Zero-Scroll bento stays as-is.
5. Revise the Zero-Scroll docs to match the agreed interpretation.

## 3. Non-goals

- No FAB, no actions cluster in the header (explicitly rejected by user).
- No reordering or restyling of desktop layout.
- No changes to the P0–P2 baseline violations found in the 2026-11-16 whole-app review (tracked separately).
- No chart library / data changes.

## 4. Design

### 4.1 Mobile stack (`< lg`), top → bottom

```
header (existing)
MonthSelector            ← stays first; scopes KPIs + charts
KPI cards ×3 (stacked)   ← summary first (charts-first is an accepted alternative)
Chart: Income/Expense    ← min-h-75 (300px), full width
Chart: Net flow          ← min-h-75 (300px), full width
Sidebar cards: Accounts / Budget / Recent transactions
[ + New transaction ]    ← buttons LAST, full width
[ + Card closing ]
─────────────────────
main scrolls as one page
```

Order is achieved with responsive `order` utilities (layout classes are exempt from the Spacing Lock) or a small DOM reorder gated at `lg:` — implementation choice for the plan.

### 4.2 Component changes

| File | Change |
|---|---|
| `features/dashboard/components/RootDashboard.tsx:30` | Drop `overflow-hidden` / `flex-1` / `min-h-0` on mobile; restore current values at `lg:` (e.g. `lg:flex-1 lg:min-h-0 lg:overflow-hidden`). |
| `features/dashboard/components/kpis/kpis-dashboard.tsx:65` | `overflow-y-auto lg:overflow-hidden` → mobile flows naturally; buttons column gets mobile `order-last` (moved after charts). |
| `features/dashboard/components/charts/main-charts-dashboard.tsx:13` | Same: `overflow-y-auto lg:overflow-hidden` → natural flow on mobile. |
| `features/dashboard/components/charts/analytics/analytic-charts-dashboard.tsx:33` | Children keep `min-h-75`; remove mobile `min-h-0`-driven shrinking (flow instead). |
| `features/dashboard/components/charts/sidebar/sidebar-charts-dashboard.tsx:33` | Same treatment; sidebar cards flow at natural height on mobile (no `flex-1` share-the-remaining-space). |
| Sidebar card internals (`sidebar-charts-{accounts,budget,recTrans}.tsx`) | Inner `overflow-y-auto` only at `lg:`; mobile content fully expanded. |

Desktop (`lg:`) class values must equal today's values exactly — verified by comparing before/after at 1440px.

### 4.3 Docs revision (`docs/agents/ux_agent_finance.md`, "Zero-Scroll" section)

Replace the single "CRITICAL MANDATE" framing with:

- **`lg`+ / large horizontal displays:** Zero-Scroll remains the goal — shrink-to-fit, `dvh`, internal scroll only for data regions (tables).
- **Mobile:** one page scroll is acceptable and expected. The invariant becomes **"no nested scroll windows"** (never scroll-within-scroll-within-scroll) plus minimizing scroll height where cheap (tight density, `gap-2`…`gap-4`, `p-3`/`p-4`).
- **Tables:** internal scroll is correct at any viewport (10 default rows → internal scroll, fine; 2 rows → fits, no scroll).

Also update the implementation checklist in that section: replace "Ensure DataTable and Dashboard grids fit within 100dvh" (mobile) with the nested-scroll prohibition.

### 4.4 Loading / errors

Unchanged: route `loading.tsx` (Level 1), `Suspense`/`LoadingBoundary` boundaries around KPIs and each chart card (Level 2) keep working — boundaries are per data section and don't constrain layout. The structural error block and global error handling are untouched.

## 5. Testing

- Manual at 375×667, 390×844, 768×1024 (tablet, still `< lg`): one page scroll from MonthSelector → buttons; no inner scrollbar on KPIs/charts/sidebar cards; charts render ≥300px tall; both buttons reachable at the end.
- Manual at 1280×800 and 1440×900: pixel-identical to current desktop layout (bento fits 100dvh, internal regions behave as today).
- `pnpm lint` + `pnpm type-check` pass.
- Existing dashboard unit tests pass (`pnpm test`).

## 6. Sequencing

This spec is the first slice of the mobile upgrade. The whole-app baseline findings (P0 toolbar clipping, P1 token/density/loading violations, P2 polish) are a separate follow-up spec/plan.
