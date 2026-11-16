# Mobile Dashboard Single-Scroll Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the dashboard below `lg` one continuous page scroll (MonthSelector → charts → KPIs → action buttons last) with zero nested scroll windows, while keeping the `lg+` desktop layout byte-for-byte identical, and revise the Zero-Scroll standard in the UX agent doc to match.

**Architecture:** Pure CSS-responsiveness refactor — no DOM restructuring, no component moves. The existing `main` (`(dashboard)/layout.tsx:22`, already `overflow-y-auto`) becomes the only mobile scroller: `overflow-hidden`/`overflow-y-auto`/`flex-1`/`min-h-0` constraints on the dashboard shells are re-gated behind `lg:`, and CSS `order` (a layout class, exempt from the Spacing Lock) re-sorts the two RootDashboard children so charts render before KPIs on mobile — which places the action buttons (nested inside the KPIs grid) at the end of the page.

**Tech Stack:** Next.js 16 (App Router), Tailwind CSS v4, Jest + Testing Library, next-intl.

**Spec:** `docs/superpowers/specs/2026-11-16-mobile-dashboard-single-scroll-design.md`
**Issue:** fedepaz/friendly-octo-spork#107

## Global Constraints

- Desktop (`lg:` and up) class values must equal today's values exactly — the desktop experience must be pixel-identical.
- Spacing Lock: spacing classes are NOT responsive; `order`, `grid-cols-*`, `flex*`, `hidden`, `col-span-*` ARE responsive-allowed (layout). Charts keep `min-h-75` (300px) at all sizes.
- Typography stays within `text-xs`…`text-3xl`; control heights `h-6`…`h-10` only; no new hardcoded colors.
- Never commit unless the step says so; commit messages follow Conventional Commits (see `app/COMMIT_CONVENTIONS.md`) and are passed via `git commit -F app/.commits/<file>`. Pre-commit runs `pnpm lint` — it must pass (0 errors; existing warnings are acceptable).
- All commands run from `/home/fedepaz/Documents/proyectos/appFinance/app` unless stated otherwise.
- Tests: `pnpm --filter frontend test -- <path>` (Jest). Full suite: `pnpm test`.

## File Structure

| File | Responsibility |
|---|---|
| `apps/frontend/src/features/dashboard/components/RootDashboard.tsx` | Page shell: mobile = natural flow, `lg` = clipped Zero-Scroll column; owns mobile `order` of its two content children |
| `apps/frontend/src/features/dashboard/components/kpis/kpis-dashboard.tsx` | KPI grid root: `order-3` on mobile (renders after charts → buttons end the page) |
| `apps/frontend/src/features/dashboard/components/charts/main-charts-dashboard.tsx` | Charts grid root: `order-2` on mobile |
| `apps/frontend/src/features/dashboard/components/charts/sidebar/sidebar-charts-accounts.tsx` | Sidebar card: natural height on mobile |
| `apps/frontend/src/features/dashboard/components/charts/sidebar/sidebar-charts-budget.tsx` | Sidebar card: natural height on mobile |
| `apps/frontend/src/features/dashboard/components/charts/sidebar/sidebar-charts-recTrans.tsx` | Sidebar card + inner list: natural height on mobile |
| `docs/agents/ux_agent_finance.md` | Zero-Scroll standard revision (two-tier rule) |
| Tests: `features/dashboard/__tests__/RootDashboard.spec.tsx` (extend), `features/dashboard/components/charts/sidebar/__tests__/sidebar-charts-accounts.spec.tsx` (new) |

Explicitly unchanged: `analytic-charts-*.tsx` (their `min-h-75` already guarantees ≥300px and prevents flex collapse), `main-charts-dashboard`'s children wrappers, `kpis-dashboard` inner grid/buttons, `(dashboard)/layout.tsx`.

---

### Task 1: RootDashboard single-scroll shell + mobile ordering

**Files:**
- Modify: `apps/frontend/src/features/dashboard/components/RootDashboard.tsx:30`
- Modify: `apps/frontend/src/features/dashboard/components/kpis/kpis-dashboard.tsx:65`
- Modify: `apps/frontend/src/features/dashboard/components/charts/main-charts-dashboard.tsx:13`
- Test: `apps/frontend/src/features/dashboard/__tests__/RootDashboard.spec.tsx`

**Interfaces:**
- Consumes: nothing from earlier tasks.
- Produces: class contracts relied on by the whole plan — RootDashboard root carries `lg:flex-1 lg:min-h-0 lg:overflow-hidden` (no bare `overflow-hidden`); KPIs root carries `order-3 lg:order-none`; charts root carries `order-2 lg:order-none`.

- [ ] **Step 1: Write the failing tests**

Append this `describe` block at the end of `RootDashboard.spec.tsx` (inside the existing top-level scope, after the current `describe("RootDashboard", …)` closes — i.e. as a second top-level `describe`):

```tsx
describe("RootDashboard mobile single-scroll layout", () => {
  it("does not clip the dashboard shell below lg (page main is the scroller)", () => {
    const { container } = render(<RootDashboard />);
    const root = container.firstElementChild as HTMLElement;
    // no bare overflow-hidden/flex-1/min-h-0 — those exist only at lg:
    expect(root.className).not.toMatch(/(?:^| )overflow-hidden(?: |$)/);
    expect(root.className).not.toMatch(/(?:^| )flex-1(?: |$)/);
    expect(root.className).toContain("lg:overflow-hidden");
    expect(root.className).toContain("lg:flex-1");
    expect(root.className).toContain("lg:min-h-0");
  });

  it("orders charts before KPIs on mobile so the action buttons end the page", () => {
    render(<RootDashboard />);
    const chartsRoot = document.querySelector(".order-2");
    const kpisRoot = document.querySelector(".order-3");
    expect(chartsRoot).not.toBeNull();
    expect(kpisRoot).not.toBeNull();
    // reset at lg so desktop keeps DOM order (KPIs before charts)
    expect(chartsRoot?.className).toContain("lg:order-none");
    expect(kpisRoot?.className).toContain("lg:order-none");
  });
});
```

- [ ] **Step 2: Run the tests to verify they fail**

```bash
pnpm --filter frontend test -- src/features/dashboard/__tests__/RootDashboard.spec.tsx
```

Expected: 2 NEW FAILURES (`overflow-hidden` present without `lg:`; `.order-2`/`.order-3` not found). Pre-existing 3 tests still PASS.

- [ ] **Step 3: Implement — RootDashboard shell**

In `RootDashboard.tsx:30`, replace:

```tsx
<div className="flex flex-1 flex-col gap-3 min-h-0 overflow-hidden animate-premium-in mb-3">
```

with:

```tsx
<div className="flex flex-col gap-3 lg:flex-1 lg:min-h-0 lg:overflow-hidden animate-premium-in mb-3">
```

- [ ] **Step 4: Implement — KPIs root ordering + flow**

In `kpis-dashboard.tsx:65`, replace:

```tsx
<div className="grid  grid-cols-1 lg:grid-cols-12 gap-3 min-h-0 overflow-y-auto lg:overflow-hidden pr-1 custom-scrollbar">
```

with:

```tsx
<div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:min-h-0 lg:overflow-hidden pr-1 custom-scrollbar order-3 lg:order-none">
```

- [ ] **Step 5: Implement — charts root ordering + flow**

In `main-charts-dashboard.tsx:13`, replace:

```tsx
<div className="grid flex-1 grid-cols-1 lg:grid-cols-12 gap-3 min-h-0 overflow-y-auto lg:overflow-hidden pr-1 custom-scrollbar">
```

with:

```tsx
<div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:flex-1 lg:min-h-0 lg:overflow-hidden pr-1 custom-scrollbar order-2 lg:order-none">
```

- [ ] **Step 6: Run the full dashboard test files**

```bash
pnpm --filter frontend test -- src/features/dashboard
```

Expected: ALL PASS (RootDashboard 3 old + 2 new, KPIsDashboard 4, analytics tests unchanged).

- [ ] **Step 7: Verify desktop class parity by diff review**

```bash
git diff -- apps/frontend/src/features/dashboard
```

Confirm for each of the 3 files: every desktop-relevant class from the old string appears in the new string prefixed with `lg:` (or unprefixed when it was already unprefixed and non-constraining, e.g. `gap-3`, `pr-1`, `animate-premium-in`, `mb-3`, `grid-cols-1`, `custom-scrollbar`), and no unprefixed `overflow-hidden` / `overflow-y-auto` / `min-h-0` / `flex-1` remains.

- [ ] **Step 8: Lint**

```bash
pnpm lint
```

Expected: 0 errors (pre-existing warnings OK).

- [ ] **Step 9: Commit**

```bash
cat > .commits/2026-11-16-fix-dashboard-mobile-single-scroll.md <<'EOF'
fix(dashboard): single page scroll and mobile ordering below lg

The dashboard shell clipped its own content (overflow-hidden), leaving
the charts region a ~150px window with triple-nested scrolling. Below
lg the shell now flows naturally (page main is the only scroller) and
CSS order renders charts before KPIs so the action buttons end the
page. lg+ classes are unchanged.

Refs #107
EOF
git add apps/frontend/src/features/dashboard
git commit -F .commits/2026-11-16-fix-dashboard-mobile-single-scroll.md
```

Expected: pre-commit lint passes, commit created on `feat/mobile-dashboard-single-scroll`.

---

### Task 2: Sidebar cards flow naturally on mobile

**Files:**
- Modify: `apps/frontend/src/features/dashboard/components/charts/sidebar/sidebar-charts-accounts.tsx:12,18`
- Modify: `apps/frontend/src/features/dashboard/components/charts/sidebar/sidebar-charts-budget.tsx:33,39`
- Modify: `apps/frontend/src/features/dashboard/components/charts/sidebar/sidebar-charts-recTrans.tsx:71,95,96`
- Test: `apps/frontend/src/features/dashboard/components/charts/sidebar/__tests__/sidebar-charts-accounts.spec.tsx` (create)

**Interfaces:**
- Consumes: Task 1 (parent no longer clips; cards must not clip/self-scroll either).
- Produces: sidebar cards render at natural content height below `lg`; identical flex/overflow behavior at `lg:` as today.

- [ ] **Step 1: Write the failing test**

Create `apps/frontend/src/features/dashboard/components/charts/sidebar/__tests__/sidebar-charts-accounts.spec.tsx`:

```tsx
// src/features/dashboard/components/charts/sidebar/__tests__/sidebar-charts-accounts.spec.tsx
import { render } from "@testing-library/react";
import { SidebarChartsAccounts } from "../sidebar-charts-accounts";
import { useRecentAccounts } from "@/features/dashboard/hooks/dashboardHooks";

jest.mock("next-intl", () => ({
  useTranslations: () => () => "label",
}));

jest.mock("@/features/dashboard/hooks/dashboardHooks", () => ({
  useRecentAccounts: jest.fn(() => ({ data: [] })),
}));

describe("SidebarChartsAccounts mobile flow", () => {
  it("does not clip or self-scroll below lg", () => {
    const { container } = render(<SidebarChartsAccounts />);
    const card = container.firstElementChild as HTMLElement;

    expect(card.className).not.toMatch(/(?:^| )overflow-hidden(?: |$)/);
    expect(card.className).not.toMatch(/(?:^| )min-h-0(?: |$)/);
    expect(card.className).toContain("lg:overflow-hidden");
    expect(card.className).toContain("lg:min-h-0");

    const content = card.querySelector("[class*='space-y-2']");
    expect(content).not.toBeNull();
    expect(content?.className).not.toMatch(/(?:^| )overflow-y-auto(?: |$)/);
    expect(content?.className).toContain("lg:overflow-y-auto");
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

```bash
pnpm --filter frontend test -- src/features/dashboard/components/charts/sidebar/__tests__/sidebar-charts-accounts.spec.tsx
```

Expected: FAIL — card still has bare `overflow-hidden` / `min-h-0`, content has bare `overflow-y-auto`.

- [ ] **Step 3: Implement — accounts card**

In `sidebar-charts-accounts.tsx:12`, replace:

```tsx
<Card className="bg-card/40 border-border/40 shadow-premium rounded-none shrink-0 flex flex-col flex-1 min-h-0 overflow-hidden">
```

with:

```tsx
<Card className="bg-card/40 border-border/40 shadow-premium rounded-none flex flex-col lg:shrink-0 lg:flex-1 lg:min-h-0 lg:overflow-hidden">
```

In `sidebar-charts-accounts.tsx:18`, replace:

```tsx
<CardContent className="space-y-2 px-5 pb-4 overflow-y-auto custom-scrollbar">
```

with:

```tsx
<CardContent className="space-y-2 px-5 pb-4 lg:overflow-y-auto custom-scrollbar">
```

- [ ] **Step 4: Implement — budget card**

In `sidebar-charts-budget.tsx:33`, replace:

```tsx
<Card className="bg-card/40 border-border/40 shadow-premium rounded-none shrink-0 flex flex-col flex-1 min-h-0 overflow-hidden">
```

with:

```tsx
<Card className="bg-card/40 border-border/40 shadow-premium rounded-none flex flex-col lg:shrink-0 lg:flex-1 lg:min-h-0 lg:overflow-hidden">
```

In `sidebar-charts-budget.tsx:39`, replace:

```tsx
<CardContent className="space-y-4 px-5 pb-4 overflow-y-auto custom-scrollbar">
```

with:

```tsx
<CardContent className="space-y-4 px-5 pb-4 lg:overflow-y-auto custom-scrollbar">
```

- [ ] **Step 5: Implement — recent-transactions card**

In `sidebar-charts-recTrans.tsx:71`, replace:

```tsx
<Card className="bg-card/40 border-border/40 shadow-premium rounded-none shrink-0 flex flex-col flex-1 min-h-0 overflow-hidden">
```

with:

```tsx
<Card className="bg-card/40 border-border/40 shadow-premium rounded-none flex flex-col lg:shrink-0 lg:flex-1 lg:min-h-0 lg:overflow-hidden">
```

In `sidebar-charts-recTrans.tsx:95`, replace:

```tsx
<CardContent className="flex-1 min-h-0 px-5 pb-4 overflow-hidden">
```

with:

```tsx
<CardContent className="px-5 pb-4 lg:flex-1 lg:min-h-0 lg:overflow-hidden">
```

In `sidebar-charts-recTrans.tsx:96`, replace:

```tsx
<div className="h-full overflow-y-auto pr-1 custom-scrollbar">
```

with:

```tsx
<div className="pr-1 custom-scrollbar lg:h-full lg:overflow-y-auto">
```

(Note: `custom-scrollbar` is a plain CSS class in `globals.css`, not a Tailwind utility — it cannot take a `lg:` prefix; keeping it unprefixed is correct and inert when nothing scrolls.)

- [ ] **Step 6: Run dashboard tests**

```bash
pnpm --filter frontend test -- src/features/dashboard
```

Expected: ALL PASS (new sidebar spec green; Task 1 + KPIs + analytics unaffected).

- [ ] **Step 7: Lint**

```bash
pnpm lint
```

Expected: 0 errors.

- [ ] **Step 8: Commit**

```bash
cat > .commits/2026-11-16-fix-dashboard-sidebar-mobile-flow.md <<'EOF'
fix(dashboard): sidebar cards flow naturally on mobile

Sidebar cards used flex-1/min-h-0/overflow-hidden to share constrained
height, which collapses or self-scrolls them once the parent flows.
Below lg the cards now size to content and the page scrolls; lg+ keeps
the exact share-the-space behavior.

Refs #107
EOF
git add apps/frontend/src/features/dashboard
git commit -F .commits/2026-11-16-fix-dashboard-sidebar-mobile-flow.md
```

Expected: commit created.

---

### Task 3: Revise the Zero-Scroll standard in the UX agent doc

**Files:**
- Modify: `docs/agents/ux_agent_finance.md:23-42` (section `## Responsive Design: The "Zero-Scroll" Foundation`, mandate paragraph + implementation checklist)

**Interfaces:**
- Consumes: the approved interpretation from the spec (§4.3).
- Produces: the rewritten section text below — the single source of truth for future UX reviews.

- [ ] **Step 1: Replace the mandate paragraph and checklist**

In `docs/agents/ux_agent_finance.md`, replace this block (currently lines 23–42, from the section heading through the end of the implementation checklist — keep subsections `1. High-Density Mobile Strategy` and `2. Adaptive Scaling` exactly as they are between the new intro and the new checklist):

```markdown
## Responsive Design: Two-Tier Scrolling Standard

**STANDARD (revised 2026-11-16)** — supersedes the old single "Zero-Scroll" mandate. Rationale and approved design: `docs/superpowers/specs/2026-11-16-mobile-dashboard-single-scroll-design.md`.

**1. `lg`+ / large horizontal displays — Zero-Scroll goal:**
The desktop app should present core content without vertical scrolling, regardless of display size. Shrink-to-fit layouts, `dvh` constraints, and internal scrolling for data regions (tables) keep everything visible on a big display.

**2. Mobile / tablet (`< lg`) — one honest page scroll:**
A single page-level scroller (the route's `main`) is acceptable and expected. The hard invariant is **no nested scroll windows** — never scroll-within-scroll-within-scroll (the 2026-11-16 dashboard bug: page → charts region → individual cards). Minimize scroll height where cheap via the density rules below.

**3. Tables at any size:**
Internal scroll inside `DataTable` is correct and exempt (density is managed by table tokens): 10 default rows → internal scroll; 2 rows → fits without scrolling.

**4. Implementation Checklist**:
- [ ] Use `dvh` for full-height layouts.
- [ ] Apply `pb-safe-area-inset-bottom` for mobile navigation clearance.
- [ ] Below `lg`: NO nested scroll windows — content flows, the route `main` is the only scroller; charts/cards render at natural (min-constrained) height.
- [ ] At `lg`+: dashboard/table grids fit within 100dvh with internal region scrolling only where necessary.
- [ ] Minimize vertical margins and headers to prioritize content.
```

(If the file's subsections `1.`/`2.` are numbered inside the replaced range, preserve their original text verbatim and only renumber if needed for coherence — the two strategy subsections themselves must not change.)

- [ ] **Step 2: Sanity-check the doc**

```bash
rg -n "CRITICAL MANDATE|Two-Tier Scrolling|nested scroll" docs/agents/ux_agent_finance.md
```

Expected: `CRITICAL MANDATE` gone; `Two-Tier Scrolling Standard` and `nested scroll` present.

- [ ] **Step 3: Commit**

```bash
cat > .commits/2026-11-16-docs-zero-scroll-two-tier.md <<'EOF'
docs(agents): revise Zero-Scroll standard into two-tier scrolling rule

Zero-Scroll remains the goal for lg+ horizontal displays; mobile gets
one honest page scroller with a hard "no nested scroll windows"
invariant. Tables keep internal scroll at any viewport.

Refs #107
EOF
git add docs/agents/ux_agent_finance.md
git commit -F .commits/2026-11-16-docs-zero-scroll-two-tier.md
```

Expected: commit created.

---

### Task 4: Full verification

**Files:** none modified — verification only.

**Interfaces:**
- Consumes: Tasks 1–3.
- Produces: green gate for push + PR.

- [ ] **Step 1: Full test suite**

```bash
pnpm test
```

Expected: ALL PASS, 0 failures.

- [ ] **Step 2: Type-check + lint**

```bash
pnpm type-check && pnpm lint
```

Expected: both exit 0 (0 lint errors).

- [ ] **Step 3: Build the frontend**

```bash
pnpm build
```

Expected: frontend build succeeds.

- [ ] **Step 4: Manual viewport checklist**

Run `pnpm dev` and verify at the browser dev-tools level (or Playwright at 375×667 / 390×844 / 768×1024 / 1280×800 / 1440×900):

- Mobile: one continuous scroll — MonthSelector → 2 charts (≥300px each) → sidebar cards → KPI cards → `[+ New transaction]` / `[+ Card closing]` at the very end; no inner scrollbars on KPIs/charts/sidebar cards; `main` is the only scrollbar.
- Desktop `lg`+: layout identical to before this branch — KPIs + buttons top (8/4), charts below, everything bounded in 100dvh.
- Both action buttons still open their wizards on mobile.

- [ ] **Step 5: Confirm branch state**

```bash
git log --oneline dev..HEAD && git status --short
```

Expected: 4 commits (spec docs, Task 1, Task 2, Task 3) on `feat/mobile-dashboard-single-scroll`, clean working tree.

---

## Self-Review results (already applied)

1. **Spec coverage:** §4.1 mobile stack + ordering → Task 1 (`order-2`/`order-3` + flow); §4.2 component table → Tasks 1–2 (all listed files covered; analytic cards intentionally unchanged — `min-h-75` already prevents collapse, noted in File Structure); §4.3 docs → Task 3; §5 testing → Steps in Tasks 1–4; §4.4 loading/errors → no changes needed (boundaries untouched). Gap check: none.
2. **Placeholder scan:** no TBD/TODO; every code step shows the exact old/new strings.
3. **Type consistency:** class contracts (`order-2`/`order-3`/`lg:order-none`, `lg:overflow-hidden`) used identically in tests and implementations across Tasks 1–2.
