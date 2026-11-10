# Responsiveness & Density — Session 2 (Resumed) — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete the responsiveness/density port: revert palette + labels to appFinance's theme decisions (overriding two deltas of the adopted session-1 work), migrate Prisma imports, ship width-aware DataTable column visibility, enforce the spacing lock and form density, document the rules, and run full verification.

**Spec:** `docs/superpowers/specs/2026-09-26-responsiveness-density-design.md` — read it first; its **Session 2 Amendments** section overrides any earlier section where they conflict.

**Base:** `feat/responsiveness-density` @ `dd6b850` — session-1's `design-system-sync` work (branch tip `recover/design-system-sync`) fast-forwarded in. Tasks 2-5, 7, 8 of the original session-2 plan are **already done there** and are collapsed into Part 0 below.

**Tech Stack:** Next.js 16, Tailwind CSS v4 (CSS-first `@theme`), shadcn/ui, NestJS + Prisma 7, pnpm + Turbo, Jest.

## Global Constraints

- **Branch:** `feat/responsiveness-density` (already checked out). Do NOT switch branches.
- **Implementers NEVER run git write commands** — no `git commit`, `git add`, `git rm`, `git stash`, `git checkout` of files, no branch operations. Leave every change in the working tree. (The controller snapshots the tree for reviews; no git object writes are needed from you.)
- **All commands run from** `/home/fedepaz/Documents/proyectos/appFinance/app` unless stated otherwise.
- **Theme (restored, do not change):** appFinance red/gray OKLCH palette in `:root`/`.dark` (Task 1 restores it), fonts (Oxanium / Source Code Pro), `--radius: 0px`, shadows, animations; labels use `font-black` + `tracking-widest`/`tracking-tighter` (Task 2 restores these).
- **Spacing lock definition:** `p-* px-* py-* pt-* pb-* pl-* pr-* mt-* mb-* ml-* mr-* mx-* my-* gap-* space-x-* space-y-* rounded-* min-h-*` are NOT responsive — delete responsive suffixes, keep the base (mobile) value. **Stays responsive:** `text-*`, icon sizes, `hidden`/`grid-cols-*`/`flex*`/`col-span-*`, `max-w-*`/`max-h-*`, top-level layout tiers (`px-3 xl:px-5 2xl:px-8`), and the whole `data-table` family (`data-table.tsx`, `data-table-skeleton.tsx`, cells) — data tables are exempt from the lock (spec §B4).
- **Gates after every task:** `pnpm lint`, `pnpm test`, `pnpm build` (from `app/`). Frontend coverage thresholds must hold: branches 60 / functions 80 / lines 70 / statements 70. **Gate amendment (2026-09-26, user decision):** `pnpm type-check` is structurally broken (`app/package.json` runs `tsc --noEmit` with no `app/tsconfig.json` — never existed in git history, not run by CI) — `pnpm build` is the type gate instead (Next build type-checks frontend app code, `nest build` type-checks backend, ts-jest type-checks backend tests). Do not run `pnpm type-check`.
- Design tokens already exist in globals.css (Part 0) — consume them (`h-(--control-height)`, `px-(--space-4)`, …); never introduce new tokens or arbitrary px.

## Part 0 — Adopted from session-1 (`recover/design-system-sync`, tip `dd6b850`) — verify, don't redo

| Session-1 work | Evidence | Notes / carry-overs |
|---|---|---|
| `.gitignore` rules + untrack 219 files | commit `6f2e7ff` | `**/src/generated/`, `.commits/`, `.superpowers/`… all untracked; files stay on disk |
| Token layer in `globals.css` (spacing/control/table/typography/layout tokens, status colors, text-size remap, shadows) | commit `33816cc` | **Palette NOT kept** → Task 1. **Duplicate `@layer base` not deduped** (count=2) → Task 1. `.dark` self-referential `--color-success/-info` — safe only while unlayered `:root` outranks; visual check watches it |
| shadcn/ui primitives tokenized (button/input/select/tabs/toggle/textarea/table/command/form/wizard heights, space tokens) | commit `9643c6e` | `SelectContent` keeps `max-h-[--radix-select-content-available-height]` (PR #135) — do not modify. **Exception:** `p-(--space-6)` left in dialog/sheet/alert-dialog/card → Task 6. `wizard-modal` still `h-11` → Task 6 |
| Layout tiers: sidebar `w-40 xl:w-48 2xl:w-56`, header `h-10 xl:h-12 2xl:h-14`, main `px-3 xl:px-5 2xl:px-8 space-y-2` | commit `9643c6e` | Verify only (Task 5) |
| SlideOverForm density (`max-w-lg`, `px-3 py-2`, `space-y-2`, `h-(--control-height-md)` footer buttons) | commit `9643c6e` | Residue grep clean — no action |
| Arbitrary typography sweep: `text-[Npx]` 196 → **0** | commits `bf968ac`, `dd6b850` | Deviation from spec T4b: `text-[9px]` pair-bases were converted to `text-xs` (11px) too; sistemaDemo ground truth also has zero `text-[9px]`, so the adopted state stands. **Visual watch:** wallet chip, budget rows, badge bodies (size-jump Minors from session-1 ledger) |
| Docs: AGENTS.md token-enforcement bullet + `.commits` note, `frontend_agent_finance.md` token table, session-1 spec/plan committed | commit `234e5f6` | `ux_agent_finance.md` still pending → Task 7 |
| Review fixes (flattened dead ternary in user-sidebar-menu, misc) | commits `39ac638`, `dd6b850` | — |
| Session-1 ledger Minors for final triage | `.superpowers/sdd/progress.md` | skeleton pagination arrows `h-8 w-8` (→ Task 4 fixes), `shadow-premium`/`shadow-etched` visual check, wallet-chip/budget-row size jump (→ visual pass), `.dark` self-referential success/info |

**Not adopted (superseded by this plan):** session-1's sistemaDemo palette (purple-blue primary) and its `font-bold tracking-wider` label conversion — user decisions 2026-09-26 revert both (Tasks 1-2).

## File Structure (this session's tasks)

| Task | Files |
|---|---|
| 1 | `apps/frontend/src/app/[locale]/globals.css` |
| 2 | 19 files with `font-bold uppercase tracking-wider` |
| 3 | 5 backend repositories + `apps/backend/tsconfig.json` |
| 4 | `components/data-display/data-table/data-table.tsx`, `data-table-skeleton.tsx` |
| 5 | 10 files with responsive spacing (list in task) |
| 6 | 4 ui primitives + wizard-modal + 7 feature/common files |
| 7 | `docs/agents/ux_agent_finance.md` |

---

### Task 1: Restore appFinance palette + dedupe `@layer base` + baseline gates

**Why:** Session-1 adopted sistemaDemo's oklch palette (purple-blue primary, hue 277). The user's decision is to keep appFinance's red/gray palette (hue 27). Session-1 also never completed verification — baseline gates run first so any pre-existing failure is attributable.

**Files:**
- Modify: `apps/frontend/src/app/[locale]/globals.css`

- [ ] **Step 1: Baseline gates (before any edit)**

```bash
pnpm lint && pnpm test && pnpm build
```
Record pass/fail for each (session-1's verification task was never finished — this is the true baseline). If something fails, note it as **pre-existing** in your report; do not fix it here unless it is caused by a broken state of this file.

- [ ] **Step 2: Restore the color values from `58269dd`**

```bash
git show 58269dd:app/apps/frontend/src/app/\[locale\]/globals.css > /tmp/globals-orig.css
```

Compare `/tmp/globals-orig.css` with the working file and apply this rule **inside `:root { … }` and `.dark { … }` blocks only**:

- For every custom property (`--name: value;`) that exists in **both** versions of the same block → restore the **original** value (the red/gray palette, e.g. light `--primary: oklch(0.4 0.2 27.5)`, dark `--primary: oklch(0.6083 0.209 27.0276)`).
- For properties that exist **only** in the current file (token groups `--space-*`, `--control-height*`, `--table-*`, `--text-caption…`, `--sidebar-width*`, `--header-height*`; status `--color-success/-info` blocks; `--shadow-premium/-etched`) → **keep them**.
- Do **not** touch the `@theme inline { … }` block (typography remap, status/shadow registrations stay).
- Fonts and `--radius` resolve to the same values in both versions — no visible change expected there.

- [ ] **Step 3: Dedupe the duplicated `@layer base` block**

The file contains **two** identical `@layer base { … }` blocks (each ending with the `.custom-scrollbar` rules). `grep -c '@layer base'` currently returns `2`. Delete the second occurrence entirely; keep one. Do not delete `@keyframes` or `prefers-reduced-motion` blocks.

- [ ] **Step 4: Verify + gates**

```bash
grep -n -- '--primary:' apps/frontend/src/app/\[locale\]/globals.css | head -4
grep -c '@layer base' apps/frontend/src/app/\[locale\]/globals.css
grep -c -- '--color-info\|--color-success' apps/frontend/src/app/\[locale\]/globals.css
```
Expected: primary lines show the **original red** values from Step 2 (light `0.4 0.2 27.5`, dark `0.6083 0.209 27.0276`); `@layer base` count = `1`; status colors still defined (count > 0). Also diff the `:root`/`.dark` common properties against `/tmp/globals-orig.css` and confirm no original property still carries a session-1 value.

```bash
pnpm lint && pnpm test && pnpm build
```
Expected: same results as Step 1 baseline (failures identical to baseline are pre-existing — report them; new failures are yours).

---

### Task 2: Restore label weight/tracking (`font-black` + `tracking-widest`)

**Why:** Session-1 converted 27 labels (19 files) to sistemaDemo's `font-bold uppercase tracking-wider`. User decision: Doom-64 labels stay `font-black uppercase tracking-widest`.

**Files:** the 19 files containing `font-bold uppercase tracking-wider` (enumerate with the Step 1 grep).

- [ ] **Step 1: Inventory**

```bash
grep -rn 'font-bold uppercase tracking-wider' apps/frontend/src --include='*.tsx'
```
Expected: 27 matches across 19 files.

- [ ] **Step 2: Exact replacement**

In every match, replace the substring:
`font-bold uppercase tracking-wider` → `font-black uppercase tracking-widest`

Scope rules:
- Only this exact pattern. Do **not** touch non-uppercase `font-bold` (e.g., data cells `text-xs font-bold` in `data-table.tsx`), do **not** touch `tracking-tighter` (display titles keep it), do not change any `text-*` sizes.

- [ ] **Step 3: Residue + test assertions**

```bash
grep -rn 'tracking-wider' apps/frontend/src --include='*.tsx'
grep -rn 'font-bold uppercase' apps/frontend/src --include='*.tsx'
```
Expected: no matches. If a straggler uses a different uppercase weight/tracking combo, compare that line with `git show 58269dd:<file>` — if the original was `font-black`/`tracking-widest`, convert it too; report anything ambiguous instead of guessing.

```bash
grep -rn 'tracking-wider\|font-bold uppercase' apps/frontend/src --include='*.spec.*' --include='*.test.*'
```
Expected: no test asserts the old style. If one does, update the assertion to the restored style (that is in scope).

```bash
pnpm lint && pnpm test && pnpm build
```
Expected: pass.

---

### Task 3: Migrate Prisma imports off the stale generated client

**Why:** `apps/backend/src/generated/prisma` is a stale May-2026 artifact (untracked+ignored since Part 0, still on disk). `prisma generate` writes to `node_modules/.prisma/client` (exposed as `@prisma/client`). Five import sites still reference the stale copy.

**Files:**
- Modify: `apps/backend/src/modules/recurrences/repositories/recurrence.repository.ts` (line 6)
- Modify: `apps/backend/src/modules/categories/repositories/categories.repository.ts` (line 5)
- Modify: `apps/backend/src/modules/users/repositories/user.repository.ts` (line 3)
- Modify: `apps/backend/src/modules/dashboard/repositories/accountDash.repository.ts` (line 5)
- Modify: `apps/backend/src/modules/auth/repositories/userAuth.repository.ts` (line 8 — **relative** import: `from '../../../generated/prisma/client'`)
- Modify: `apps/backend/tsconfig.json` (line 25 — remove the `"generated/prisma"` paths entry)

- [ ] **Step 1: Confirm the import lines**

```bash
grep -rn "generated/prisma" apps/backend --include='*.ts' --include='*.json' | grep -v 'src/generated/'
```
Expected: exactly the 5 files above + `tsconfig.json:25`.

- [ ] **Step 2: Replace each import**

Only the module specifier changes; preserve the exact symbol list and quote style:
```ts
import { TransactionType } from 'generated/prisma';   // → '@prisma/client'
import { User } from '../../../generated/prisma/client'; // → '@prisma/client'
```

- [ ] **Step 3: Remove the dead tsconfig path mapping**

In `apps/backend/tsconfig.json`, delete `"generated/prisma": ["./src/generated/prisma"]`. If `compilerOptions.paths` becomes empty, remove the `paths` key entirely. Leave `baseUrl` as-is.

- [ ] **Step 4: Verify no references remain**

```bash
grep -rn "generated/prisma" apps/backend --include='*.ts' --include='*.json' | grep -v 'src/generated/'
```
Expected: no output.

- [ ] **Step 5: Gates**

```bash
pnpm --filter backend test && pnpm lint && pnpm build
```
Expected: all pass. If type errors appear (surfaced by `pnpm build`'s `nest build` step; e.g., `Decimal` field-type drift between the stale and current client), align the repository's type annotation to the `@prisma/client` type (`Prisma.Decimal` or `decimal.js` `Decimal`), then re-run.

Note: do **not** delete `apps/backend/src/generated/` — it is ignored by `.gitignore` and out of scope.

---

### Task 4: DataTable — width-aware column visibility + density residue + skeleton alignment

**Why:** The last major functional gap versus the spec: columns are still hidden by viewport breakpoint counts (`sm`=2, `md`=3, `lg`=5) instead of actual container width. Session-1 already tokenized most density classes — you apply the width algorithm, the three remaining density rows, and the skeleton height alignment.

**Files:**
- Modify: `apps/frontend/src/components/data-display/data-table/data-table.tsx`
- Modify: `apps/frontend/src/components/data-display/data-table/data-table-skeleton.tsx`

**Interfaces:**
- Produces: `tableContainerRef` callback ref feeding `containerWidth` → `columnVisibility`. `breakpoint` stays in use (column-filter label, line ~288) — keep the `useBreakpoint()` call.

- [ ] **Step 1: Add `useCallback` to the React import**

```tsx
import { Fragment, ReactNode, useCallback, useEffect, useMemo, useState } from "react";
```
(Adjust to the file's current import list — only add `useCallback`.)

- [ ] **Step 2: Add width state + ResizeObserver ref (insert right after the `useTable(...)` call closes, ~line 208-210)**

```tsx
  const [containerWidth, setContainerWidth] = useState(0);
  const tableContainerRef = useCallback((node: HTMLDivElement | null) => {
    if (!node) return;
    const observer = new ResizeObserver(([entry]) => {
      setContainerWidth(entry.contentRect.width);
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
```

- [ ] **Step 3: Replace the breakpoint-indexed visibility effect (lines ~212-241)**

Replace this entire block:
```tsx
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const allColumns = table.getAllColumns();
    const columnsId = allColumns.map((column) => column.id);

    const visibility: VisibilityState = {};

    // 768px (md) target: Squeeze the data to fit
    // We prioritize keeping core data and the actions column
    let visibleCount = columnsId.length;

    if (breakpoint === "sm") {
      visibleCount = 2; // Mobile: Minimal data
    } else if (breakpoint === "md") {
      visibleCount = 3; // Cheap Screen (768px): Focus on the essentials
    } else if (breakpoint === "lg") {
      visibleCount = 5; // Standard Laptop
    }

    columnsId.forEach((id, index) => {
      if (id === "actions" || id === "select") {
        visibility[id] = true; // Never hide actions or selection
      } else {
        visibility[id] = index < visibleCount;
      }
    });

    setColumnVisibility(visibility);
  }, [breakpoint]);
  /* eslint-enable react-hooks/exhaustive-deps */
```
with:
```tsx
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const allColumns = table.getAllColumns();
    const columnsId = allColumns.map((column) => column.id);

    const fixedWidth = 140;
    const minColumnWidth = 100;
    const cellPadding = 24;

    const availableForData = Math.max(containerWidth - fixedWidth, 0);
    const maxDataColumns =
      containerWidth > 0
        ? Math.floor(availableForData / (minColumnWidth + cellPadding))
        : 5;

    const dataColumnCount = columnsId.filter(
      (id) => id !== "actions" && id !== "select",
    ).length;
    const visibleCount = Math.min(Math.max(maxDataColumns, 2), dataColumnCount);

    const visibility: VisibilityState = {};
    columnsId.forEach((id, index) => {
      if (id === "actions" || id === "select") {
        visibility[id] = true;
      } else {
        visibility[id] = index < visibleCount;
      }
    });

    setColumnVisibility(visibility);
  }, [containerWidth, table]);
  /* eslint-enable react-hooks/exhaustive-deps */
```

- [ ] **Step 4: Attach the ref to the scroll container**

```tsx
// before
<div className="flex-1 overflow-auto custom-scrollbar">
// after
<div ref={tableContainerRef} className="flex-1 overflow-auto custom-scrollbar">
```

- [ ] **Step 5: Density residue in data-table.tsx (3 rows; everything else already tokenized — verify, don't redo)**

| Line (approx) | Before | After |
|---|---|---|
| 256 | `<CardHeader className="px-5 pt-5 pb-3">` | `<CardHeader className="px-4 md:px-5 pt-4 md:pt-5 pb-2 md:pb-3">` |
| 279 | toolbar `... px-5 py-2 space-x-3 shrink-0 border-y ...` | `... px-4 py-2 space-x-3 shrink-0 border-y ...` |
| 406 | pagination `... gap-4 px-5 py-3 shrink-0 border-t ...` | `... gap-4 px-4 py-3 shrink-0 border-t ...` |

(The `md:` on CardHeader is intentional — data tables are exempt from the spacing lock and sistemaDemo's final file carries these tiers.) Lines 149/155 (min-h), 285/322 (controls), 355 (header cells), 380 (data cells), 421/444/452 (pagination) are already tokenized — leave them.

- [ ] **Step 6: data-table-skeleton.tsx — align heights (spacing lines 93/95 belong to Task 5)**

| Line | Before | After |
|---|---|---|
| 30, 31 | `h-8 w-[80px] sm:w-[90px]` (×2) | `h-(--control-height-sm) xl:h-(--control-height) w-[80px] sm:w-[90px]` |
| 39 | `h-8 w-full` | `h-(--control-height-sm) xl:h-(--control-height) w-full` |
| 41 | `h-10 w-[80px] sm:w-[100px]` | `h-(--control-height-sm) xl:h-(--control-height) w-[80px] sm:w-[100px]` |
| 82 | `h-8 w-8` | `h-(--control-height-xs) xl:h-(--control-height-sm) w-8` |
| 98 | `h-7 w-[70px]` | `h-(--control-height-xs) xl:h-(--control-height-sm) w-[70px]` |
| 104, 105, 106, 107 | `h-8 w-8` (two have `hidden lg:block` — keep that) | `h-(--control-height-xs) xl:h-(--control-height-sm) w-8` |

Leave as-is: line 25 (`h-8` title), line 29 (`h-6` badge), all `h-4` text skeletons (content-driven), and the tokenized `TableHead`/`TableCell` rows (53/61/73).

- [ ] **Step 7: Residue check + gates**

```bash
grep -nE 'visibleCount = [235]|breakpoint === "(sm|md|lg)"' apps/frontend/src/components/data-display/data-table/data-table.tsx
```
Expected: only the line-288 `{breakpoint === "sm" ? "" : dtT("columnsLabel")}` usage — no visibility-count matches.

```bash
pnpm lint && pnpm test && pnpm build
```
Expected: pass. `features/auditLogs/__tests__/auditLog-data-table.spec.tsx` exercises this component and must still pass (no test asserts column visibility — verified during planning).

---

### Task 5: Spacing lock (responsive suffix sweep)

**Rule:** delete responsive spacing suffixes, keep the base (mobile) value. This table was re-enumerated against the current tree — apply **exactly** these; then run the verify grep to catch anything outside the table.

| File | Line(s) | Before → After |
|---|---|---|
| `features/auditLogs/components/auditLog-form.tsx` | 31 | `gap-3 md:gap-6 pb-6 md:pb-8` → `gap-3 pb-6` |
| same | 35, 75, 111, 131 | `py-2 md:py-4` → `py-2` |
| same | 41, 81 | `gap-2 md:gap-4 pt-3 md:pt-4` → `gap-2 pt-3` |
| same | 42, 51, 59, 82, 95 | `space-y-0.5 md:space-y-1` → `space-y-0.5` |
| same | 138, 156, 168 | `space-y-0.5 md:space-y-1.5` → `space-y-0.5` |
| same | 64, 101 | `py-0.5 md:py-1` → `py-0.5` |
| same | 117 | `pt-3 md:pt-4` → `pt-3` |
| same | 118 | `p-3 md:p-4` → `p-3` |
| same | 137 | `gap-3 md:gap-6 pt-3 md:pt-4` → `gap-3 pt-3` |
| `components/user-profile/user-menu.tsx` | 36 | `p-2 md:p-4 space-x-2 md:space-x-0 space-y-0 md:space-y-2` → `p-2 space-x-2 space-y-0` (KEEP `md:border-b-0 md:border-r` and `md:w-40` — borders/widths are not in the lock) |
| same | 64 | `p-4 md:p-6` → `p-4` |
| `components/common/coming-soon.tsx` | 10 | `p-4 sm:p-6 md:p-8` → `p-4` |
| same | 11 | `space-y-6 md:space-y-8` → `space-y-6` |
| `components/common/pending-permissions.tsx` | 11 | `px-6 py-24 sm:py-32 lg:px-8` → `px-6 py-24` |
| `components/common/not-found.tsx` | 11 | same |
| `components/common/database-unavailable.tsx` | 11 | same |
| `app/[locale]/(auth)/layout.tsx` | 19 | `p-4 sm:p-6` → `p-4` (drop `sm:p-6`) |
| same | 43 | `p-6 sm:p-10` → `p-6` (Task 6 then converts that `p-6` → `p-4`) |
| `components/data-display/data-table/data-table-skeleton.tsx` | 93 | strip ` md:mx-0` → `... sm:w-[200px] mx-auto"` |
| same | 95 | `space-y-4 sm:space-y-0 sm:space-x-6 lg:space-x-8` → `gap-4` (keep `sm:flex-row`) |

Verify-only (no action): `components/ui/alert-dialog.tsx` keeps only `sm:rounded-lg`; `app/[locale]/(dashboard)/layout.tsx` already has `px-3 xl:px-5 2xl:px-8`.

- [ ] **Step 1:** Apply the table above.
- [ ] **Step 2: Verify**

```bash
grep -rnE '\b(md|lg|xl|sm):(p-[0-9]|px-[0-9]|py-[0-9]|pt-[0-9]|pb-[0-9]|gap-[0-9]|space-[xy]-[0-9]|rounded-[a-z0-9]+)' apps/frontend/src --include='*.tsx' | grep -v 'data-display/data-table/data-table.tsx'
```
Expected allowed matches **only**: `alert-dialog.tsx:39 …sm:rounded-lg`, `(dashboard)/layout.tsx:22 …xl:px-5 2xl:px-8`, `data-table-skeleton.tsx:73 …xl:py-1 px-2 xl:px-3` (data-table family, exempt). Everything else is a miss — fix it (this also covers spec §B6.5 feature dashboards).

```bash
pnpm lint && pnpm test && pnpm build
```
Expected: pass.

---

### Task 6: Form density — `p-6`→`p-4`, ui primitives' `p-(--space-6)`→`p-(--space-4)`, `space-y-3`→`space-y-2`, wizard buttons

**Why:** Session-1 tokenized paddings but kept the 24px values; the spec's density target is 16px for dialogs/cards/forms and 8px section gaps.

- [ ] **Step 1: UI primitives (token form — use the token, not a scale class)**

| File | Line | Before | After |
|---|---|---|---|
| `components/ui/dialog.tsx` | 63 | `gap-(--space-4) rounded-lg border p-(--space-6) shadow-lg` | `… p-(--space-4) shadow-lg` |
| `components/ui/sheet.tsx` | 34 | `bg-background p-(--space-6) shadow-lg` | `bg-background p-(--space-4) shadow-lg` |
| `components/ui/alert-dialog.tsx` | 39 | `border bg-background p-(--space-6) shadow-lg` | `border bg-background p-(--space-4) shadow-lg` (keep `sm:rounded-lg`) |
| `components/ui/card.tsx` | 26 | `space-y-(--space-1-5) p-(--space-6)` | `space-y-(--space-1-5) p-(--space-4)` |
| `components/ui/card.tsx` | 60 | `p-(--space-6) pt-(--space-0)` | `p-(--space-4) pt-(--space-0)` |
| `components/ui/card.tsx` | 70 | `flex items-center p-(--space-6) pt-(--space-0)` | `flex items-center p-(--space-4) pt-(--space-0)` |
| `components/ui/wizard-modal.tsx` | 139, 150, 160 | `className="h-11 px-(--space-4) …` (×3) | `className="h-(--control-height-md) px-(--space-4) …` |

- [ ] **Step 2: Standalone `p-6` → `p-4` (scale class files)**

| File | Line |
|---|---|
| `components/common/pending-permissions.tsx` | 25 |
| `components/common/database-unavailable.tsx` | 25 |
| `app/[locale]/(auth)/layout.tsx` | 43 (now bare `p-6` after Task 5) |
| `features/users/components/users-view-form.tsx` | 20 |
| `features/accounts/components/account-view-form.tsx` | 53 |

- [ ] **Step 3: `space-y-3` → `space-y-2` (9 instances)**

| File | Count |
|---|---|
| `features/recurrences/components/recurrence-view-form.tsx` | 1 |
| `features/transactions/components/transactions-view-form.tsx` | 1 |
| `features/dashboard/components/charts/dashboard-charts-skeleton.tsx` | 2 |
| `features/dashboard/components/charts/sidebar/sidebar-charts-dashboard.tsx` | 1 |
| `features/cards/components/cards-view-form.tsx` | 2 |
| `features/updateRecurrence/components/steps/stepRecurrence-form.tsx` | 1 |
| `features/permissions/components/permission-manager-skeleton.tsx` | 1 |

- [ ] **Step 4: Verify + gates**

```bash
grep -rnE '\bp-6\b' apps/frontend/src --include='*.tsx'
grep -rn 'p-(--space-6)' apps/frontend/src/components/ui/dialog.tsx apps/frontend/src/components/ui/sheet.tsx apps/frontend/src/components/ui/alert-dialog.tsx apps/frontend/src/components/ui/card.tsx
grep -rn '\bspace-y-3\b' apps/frontend/src --include='*.tsx'
grep -rn '\bh-11\b' apps/frontend/src/components/ui/wizard-modal.tsx
```
Expected: no output from any of the four. (`command.tsx`'s `py-(--space-6)` is intentional empty-state padding — not in scope.)

```bash
pnpm lint && pnpm test && pnpm build
```
Expected: pass.

---

### Task 7: Documentation + full gates (visual pass is the controller's, not yours)

**Files:**
- Modify: `docs/agents/ux_agent_finance.md`

- [ ] **Step 1: Update `docs/agents/ux_agent_finance.md`**

Under the existing "Responsive Design: The 'Zero-Scroll' Foundation" section, add two subsections (keep everything already in the file — add, don't replace):

```markdown
**2. Spacing Lock (mandatory)**:
- Spacing classes (`p-*`, `px-*`, `py-*`, `pt-*`, `pb-*`, `pl-*`, `pr-*`, `mt-*`, `mb-*`, `ml-*`, `mr-*`, `mx-*`, `my-*`, `gap-*`, `space-x-*`, `space-y-*`, `rounded-*`, `min-h-*`) are NOT responsive. Use one value at all breakpoints — wider viewports gain breathing room through width, not padding.
- Responsive by design: typography (`text-*`), icon sizes (`h-*`/`w-*`), layout (`grid-cols-*`, `flex*`, `hidden`, `col-span-*`), constraints (`max-w-*`, `max-h-*`), and top-level layout containers (main padding tiers `px-3 xl:px-5 2xl:px-8`).
- Data tables are exempt (density is managed by table tokens).

**3. Token Mandate**:
- Never hardcode pixel sizes. Typography → `text-*` utilities (remapped to `--text-caption`…`--text-heading`, i.e. 11/12/14/16/18/20/24px). Control heights → `h-(--control-height-xs|sm||md|lg)` (24/28/32/36/40px). Table density → `--table-*` tokens. Layout → `--sidebar-width*` / `--header-height*`.
- No arbitrary `text-[Npx]` classes — use `text-xs`/`text-sm`/`text-base`.
```

- [ ] **Step 2: Full gates**

From `app/`:
```bash
pnpm lint && pnpm test && pnpm build
```
Expected: all exit 0; frontend coverage thresholds hold; production build succeeds. Report exact pass/fail per command.

- [ ] **Step 3: Residue sweep (report anything unexpected)**

```bash
grep -rhoE 'text-\[[0-9]+px\]|text-\[0\.8rem\]' apps/frontend/src --include='*.tsx' | sort | uniq -c
grep -rnE '\bh-(9|8|10)\b' apps/frontend/src/components/ui/*.tsx
```
Expected: first → only `text-[9px]` if any (should be none); second → only intentional functional heights (`switch`, `avatar`, `checkbox`). Report, don't force-fix stragglers.

- [ ] **Step 4: Report**

Summarize files changed, gate results per command, and any deviations from the spec. **Do not commit** — the controller handles review packaging and the user commits explicitly.

---

## Controller steps (not dispatched)

- **Visual acceptance** after Task 7: dev server + browser at **1366×768** (target), 1280×800, 1920×1080, 768×1024 — login, dashboard (sidebar/header/padding tiers), transactions table (~7-8 columns at 1366, width-aware), slide-over (512px, `space-y-2`, 36px buttons), investments; watch Part 0 visual-watch items (wallet chip/budget rows/badges, shadow-premium/etched, dialog `p-4`, `.dark` success/info). Fix regressions toward sistemaDemo's values (spec §B) — never revert tokens — then re-run gates.
- **Final whole-branch review** (SDD skill) before any merge/PR discussion. No commits anywhere without the user's explicit instruction.
