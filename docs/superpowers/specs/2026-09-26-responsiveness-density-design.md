# Responsiveness & Density System + .gitignore Enforcement

**Date:** 2026-09-26
**Status:** Approved
**Source:** Port of `fedepaz/sistemaDemo` PR #134 (`fix/responsiveness`) + #135 (`SelectContent` fix), derived from two specs: *Design System Enforcement* and *1366×768 Density Fix*.
**Scope:** Frontend density/responsiveness system + root `.gitignore` enforcement.

---

## Problem

sistemaDemo established a complete responsiveness system — token-enforced typography, control-height and table-density tokens, layout density tiers, width-aware DataTable columns, and a spacing lock (spacing is identical at every breakpoint). None of it exists here:

- `globals.css` defines no density, control-height, table, sidebar, or header tokens, and does not remap Tailwind's text scale.
- shadcn/ui primitives use hardcoded heights (`h-9`, `h-8`, `h-10`).
- Sidebar is fixed at `w-56` (224px) and header at `h-12` regardless of viewport; main padding is `px-1 sm:px-2 lg:px-4`.
- DataTable column visibility is index-based (`sm: 2`, `md: 3`, `lg: 5` columns) instead of width-aware.
- 196 arbitrary `text-[Npx]` occurrences across 47 files; 37 spacing instances still carry `md:`/`lg:`/`xl:` prefixes.
- Root `.gitignore` does not ignore tool-specific files that are currently tracked: 131 files in `.commits/`, 66 in `app/.commits/`, `app/.superpowers/`, and `app/apps/backend/src/generated/`.

## Decisions (confirmed with user)

1. **Full system port** — typography remap, control-height/table tokens, density tiers, spacing lock, width-aware DataTable, arbitrary-value cleanup, `SelectContent` fix.
2. **Adopt sistemaDemo's layout tiers** exactly — including the base main padding change (`px-1 sm:px-2 lg:px-4` → `px-3 xl:px-5 2xl:px-8`). sistemaDemo is the reference for all future apps.
3. **gitignore: add rules + untrack** — patterns adopt sistemaDemo's list; currently tracked matches are removed from the index but stay on disk.
4. **Theme is preserved** — OKLCH colors, Oxanium/Source Code Pro fonts, radius `0`, shadows, animations, and Doom-64 density aesthetics are untouched. Only the responsiveness/density system changes.

---

## Part A — .gitignore Enforcement

### A1. Root `.gitignore` additions

Add (merging with existing entries, keeping our current structure and section style):

```
**/src/generated/
.env.production
.env.production.local
.env.staging
.env.staging.local

# Agents & Skills
.agents/
.skills/
.commits/
.superpowers/
.gemini/
.opencode/
.playwright-mcp/
skills-lock.json

# Backups & Session Dumps
**/backups/
raw_session.txt
```

Existing `app/.agents/` and `app/skills-lock.json` entries are redundant once the generic patterns land and are removed.

### A2. Untrack already-committed matches

`git rm -r --cached` (files remain on disk):

| Path | Tracked files | Notes |
|---|---|---|
| `.commits/` | 131 | Commit-message scratch files |
| `app/.commits/` | 66 | Same, referenced by AGENTS.md workflow — unaffected (files stay, just untracked) |
| `app/.superpowers/` | 1 | `sdd/` |
| `app/apps/backend/src/generated/` | ~20 | Stale Prisma client, see A3 |

Verify with `git status` that only deletions are staged, and `git check-ignore` returns the paths afterward.

### A3. Prisma generated-client blocker (must precede A2 for that path)

`app/apps/backend/src/generated/prisma/` is a **stale** client generated 2026-05-26 (empty `models/`, no `AuditLog`/`Entity`, schema copy predates `Decimal(19,4)` and the permissions models). The schema's `output = "../src/generated/prisma"` directive was removed in `57a8e1b`; `prisma generate` (invoked by the backend `build` script) now writes to the default `node_modules/.prisma/client`, which **is** current.

Four files still import the stale path via tsconfig `paths` (`"generated/prisma": ["./src/generated/prisma"]`):

- `src/modules/recurrences/repositories/recurrence.repository.ts`
- `src/modules/categories/repositories/categories.repository.ts`
- `src/modules/users/repositories/user.repository.ts`
- `src/modules/dashboard/repositories/accountDash.repository.ts`

**Change:** migrate these 4 imports to `@prisma/client` (already used by 14 other files), then delete the now-unused `"generated/prisma"` entry from `apps/backend/tsconfig.json` `paths`. Gate with `pnpm type-check`. After this, `src/generated/` carries no load-bearing code and is safe to untrack + ignore.

---

## Part B — Responsiveness System

### B1. `globals.css` — token layer (theme untouched)

Add to `:root` (no changes to `:root` color/font/radius/shadow declarations):

```css
/* Density spacing tokens */
--space-0: 0px; --space-0-5: 2px; --space-1: 4px; --space-1-5: 6px;
--space-2: 8px; --space-3: 12px; --space-4: 16px; --space-5: 20px;
--space-6: 24px; --space-8: 32px; --space-10: 40px;

/* Control height tokens */
--control-height-xs: 24px;  --control-height-sm: 28px;
--control-height: 32px;     --control-height-md: 36px;
--control-height-lg: 40px;

/* Table density tokens */
--table-header-height: 36px; --table-row-height: 40px;
--table-cell-px: 12px;       --table-cell-py: 4px;
--table-compact-header-height: 32px; --table-compact-row-height: 32px;
--table-compact-cell-px: 8px;        --table-compact-cell-py: 2px;

/* Typography tokens */
--text-caption: 11px; --text-body-sm: 12px; --text-body: 14px;
--text-body-lg: 16px; --text-subtitle: 18px; --text-title: 20px;
--text-heading: 24px;

/* Sidebar / header tokens (match B3 tiers) */
--sidebar-width-compact: 160px; --sidebar-width: 224px;
--sidebar-width-collapsed: 56px;
--header-height-compact: 40px;  --header-height: 48px;
```

Add to `@theme inline` — the **typography remap** (single highest-impact change; every `text-*` class in the app becomes a token consumer with zero component edits):

```css
--text-xs:  var(--text-caption);   /* 11px, was 12px */
--text-sm:  var(--text-body-sm);   /* 12px, was 14px */
--text-base: var(--text-body);     /* 14px, was 16px */
--text-lg:  var(--text-body-lg);   /* 16px, was 18px */
--text-xl:  var(--text-subtitle);  /* 18px, was 20px */
--text-2xl: var(--text-title);     /* 20px, was 24px */
--text-3xl: var(--text-heading);   /* 24px, was 30px */
```

Also dedupe the file's duplicated `@layer base` block (identical block appears twice, lines ~175-199 and ~237-261) — targeted cleanup, no behavior change.

### B2. shadcn/ui primitives → tokens

| Component | Change |
|---|---|
| `button.tsx` | default `h-9`→`h-(--control-height)`; sm `h-8`→`h-(--control-height-xs)`; lg `h-10`→`h-(--control-height-lg)`; icon `h-9 w-9`→`h-(--control-height) w-(--control-height)` |
| `input.tsx` | `h-9`→`h-(--control-height)`; drop `md:text-sm`, use `text-sm` |
| `select.tsx` | trigger `h-9`→`h-(--control-height)`; **PR #135 `max-h` on `SelectContent` is already present here** — verify only, no change |
| `tabs.tsx` | `TabsList` `h-9`→`h-(--control-height)` (trigger has no fixed height) |
| `toggle.tsx` | `h-9`/`h-8`/`h-10`→control-height tokens |
| `textarea.tsx` | `min-h-[60px]`→`min-h-[calc(var(--control-height)*2)]`; drop `md:text-sm` → `text-sm` |
| `table.tsx` | head `h-10`→`h-(--table-header-height)` |
| `form.tsx` | `text-[0.8rem]` (×2)→`text-sm` |
| `command.tsx` | input `h-10`→`h-(--control-height-lg)` |
| `dialog.tsx`, `sheet.tsx`, `alert-dialog.tsx`, `card.tsx` | `p-6`→`p-4` |
| `wizard-modal.tsx` (ours) | align heights to control-height tokens |

Unchanged: checkbox, switch, avatar, progress, separator, label, badge, tooltip, popover, skeleton, scroll-area, sonner (functional/intentional sizes).

### B3. Layout density tiers

| Component | Current | Adopted (sistemaDemo final) |
|---|---|---|
| `desktop-sidebar.tsx` | `isCollapsed ? "w-14" : "w-56"` | `isCollapsed ? "w-14" : "w-40 xl:w-48 2xl:w-56"` |
| `dashboard-header.tsx` | fixed `h-12` (incl. inner rows) | `h-10 xl:h-12 2xl:h-14` |
| `[locale]/(dashboard)/layout.tsx` main | `px-1 sm:px-2 lg:px-4` | `px-3 xl:px-5 2xl:px-8`, inner `space-y-2` (keep `pb-safe-area-inset-bottom py-1.5`) |
| `mobile-navigation.tsx`, `auth-header.tsx` | arbitrary `text-[Npx]` | token classes (part of B6) |

Tier summary (final sistemaDemo classes): base/md → compact (sidebar 160px, header 40px, padding 12px); xl (1280px → 1366px target) → standard (192px / 48px / 20px); 2xl (1536px) → spacious (224px / 56px / 32px).

### B4. DataTable — density tokens + width-aware columns

`components/data-display/data-table/data-table.tsx` (current values are single-density, no `xl:` variants — port sistemaDemo's compact/standard pattern onto them):

1. **Column visibility** — replace the index-based `useEffect` (`sm:2 / md:3 / lg:5`, lines ~213-236) with sistemaDemo's width-aware algorithm:
   - `ResizeObserver` on the scroll container (`div.flex-1.overflow-auto`) → `containerWidth` state
   - `availableForData = max(containerWidth - 140, 0)` (140px fixed: select + actions)
   - `maxDataColumns = floor(availableForData / (100 + 24))` (100px min column, 24px cell padding)
   - clamp to `[2, dataColumnCount]`; `select` and `actions` always visible
   - dependency: `[containerWidth, table]` instead of `[breakpoint, table]`
2. **Density tokens** — header row `h-10`→`h-(--table-compact-header-height) xl:h-(--table-header-height)`; data cells `h-12`→`h-(--table-compact-row-height) xl:h-(--table-row-height)`; toolbar/search/create/delete buttons `h-8`/`h-7`→`h-(--control-height-sm) xl:h-(--control-height)`; action-cell wrapper `min-h-10`→`min-h-[32px] xl:min-h-[40px]`; pagination buttons `h-7 w-8`→`h-(--control-height-xs)`.
3. **Typography** — all standalone `text-[10px]`/`text-[11px]` in the table → `text-xs` (per B6 rule).
4. **`data-table-skeleton.tsx`** — match the responsive density (`h-(--table-compact-header-height) xl:h-(--table-header-height)` etc.).

No existing test asserts column visibility or breakpoints (verified by grep) — safe to change.

### B5. SlideOverForm

`components/data-display/data-table/slide-over-form.tsx` — our file has no confirm dialog and no validation-error block (unlike sistemaDemo's); port the density model onto the structure that exists here, matching sistemaDemo's **final** values:

- Width: `sm:max-w-md` (line 74) → locked `max-w-lg` (512px), no responsive width scaling.
- SheetHeader (line 81): `px-6 py-5` → `px-3 py-2`.
- SheetTitle (line 86): `text-xl` → `text-lg` (weight/tracking/font preserved — theme).
- Scroll area (line 99): `px-6 py-8` → `px-3 py-2`.
- Children wrapper (line 102): `space-y-8` → `space-y-2`.
- SheetFooter (line 108): `px-6 py-5` → `px-3 py-2`.
- Footer buttons (lines 112/121/130): `h-12` → `h-(--control-height-md)` (36px — same visual height sistemaDemo uses for its `h-9` submit buttons, but token-driven); `text-[11px]` → `text-sm`.
- All `md:`-prefixed spacing inside is removed (spacing lock).

### B6. Feature-component sweep

1. **Arbitrary typography cleanup** — 196 occurrences / 47 files: `text-[7px]`–`text-[13px]` and `text-[0.8rem]` → nearest token class (`text-xs` for 7–11px, `text-sm` for 12–13px). Includes `desktop-sidebar`, `mobile-navigation`, `dashboard-header`, `kpi-card`, `data-table`, skeletons, and feature forms.
2. **Spacing lock** — 37 instances / 10 files: strip `md:`/`lg:`/`xl:`/`sm:` prefixes from `p-* px-* py-* pt-* pb-* pl-* pr-* mt-* mb-* ml-* mr-* mx-* my-* gap-* space-y-* rounded-* min-h-*`.
   **Stays responsive:** `text-*`, icon `h-*`/`w-*`, layout (`grid-cols-*`, `flex*`, `hidden`, `col-span-*`), constraints (`max-h-*`, `max-w-*`).
3. **Form density** — `space-y-3`→`space-y-2` (9 instances) and `p-6`→`p-4` (14 instances) across view/edit/create forms, skeletons, and dialogs.
4. **Form labels** — our labels are `text-[10px] font-black uppercase tracking-widest` (24 instances, **no `md:` variant**):
   - Size only: `text-[10px]` → `text-xs` (rule T1 below).
   - **Deviation from sistemaDemo (deliberate):** keep `font-black` and `tracking-widest`. sistemaDemo changed these to `font-bold`/`tracking-wider` for density, but font weight and letter-spacing are part of the Doom-64 theme the user explicitly asked to preserve. Same for the `text-[9px] md:text-[10px]` descriptions → `text-[9px] md:text-xs` (structure preserved, sizes tokenized).
5. **Feature dashboard gaps** — wrappers are already `gap-3` (19 instances); verify-only step, no change expected.

**Arbitrary-value replacement rules (47 files, 196 occurrences):**

| Rule | Pattern | Replacement |
|---|---|---|
| T1 | standalone `text-[7px]`, `text-[8px]`, `text-[9px]`, `text-[10px]`, `text-[11px]` | `text-xs` (11px after remap) |
| T2 | standalone `text-[12px]`, `text-[13px]` | `text-sm` |
| T3 | standalone `text-[14px]` | `text-base`; `text-[0.8rem]` → `text-sm` |
| T4 | responsive pairs `text-[9px] md:text-[10px]` / `md:text-[11px]` | `text-[9px] md:text-xs` (sub-11px base has no token; `md:` stays — typography remains responsive) |

### B7. Documentation

1. This spec: `docs/superpowers/specs/2026-09-26-responsiveness-density-design.md`.
2. Update `docs/agents/ux_agent_finance.md`:
   - Add the **spacing lock rule** (which classes are/aren't responsive).
   - Add the **token mandate**: use `--text-*`, `--control-height*`, `--table-*` tokens and token classes instead of arbitrary px values.
   - Keep the existing zero-scroll / high-density mandates (they are compatible — this system makes density token-driven).

---

## What Does NOT Change

- **Colors, fonts, radius, shadows, animations** (`:root`/`.dark` theme values, Oxanium, radius `0`).
- **Component APIs** — no prop or interface changes.
- **Data fetching, state, feature logic** — class strings and CSS only (plus the 4 Prisma import migrations in A3).
- **Icon sizes** (`h-4 w-4` etc.) — functional, not density-related.
- **Mobile layout structure** — mobile navigation, `dvh`/max-h zero-scroll constraints.

## Risks

| Risk | Mitigation |
|---|---|
| Typography remap shrinks text app-wide (`text-sm` 14→12px) | This is the intended sistemaDemo behavior; visual pass at 1366×768; individual overrides possible via explicit `text-[Npx]` only if review flags it |
| Control heights shrink 36→32px | 32px ≥ WCAG 24px minimum; mobile unaffected structurally |
| Width-aware columns change visible column counts | No tests assert visibility; manual check at 4 viewports |
| Prisma import migration surfaces type drift between stale and current client | `pnpm type-check` + `pnpm test` gate Part A |
| `.commits/` untracking surprises the documented commit workflow | Workflow only writes the file and passes it to `git commit -F`; tracking is irrelevant |

## Verification

Per phase: `pnpm lint`, `pnpm test`, `pnpm build` from `app/` (frontend coverage thresholds must hold: branches 60 / functions 80 / lines 70 / statements 70). **Gate amendment (2026-09-26, user decision):** `pnpm type-check` is structurally broken (`app/package.json` runs `tsc --noEmit` with no `app/tsconfig.json` — never existed in git history, not run by CI); `pnpm build` is the type gate instead (Next build type-checks frontend app code, `nest build` the backend, ts-jest the backend tests).

Visual pass (Playwright) after B6 at **1366×768 (acceptance target)**, 1280×800, 1920×1080, 768×1024 on: login, dashboard, transactions list, slide-over create/edit form, investments. Confirm jest-axe accessibility tests still pass.

## Implementation Order

1. Part A (gitignore + Prisma import migration) — independent, first.
2. B1 tokens → B2 primitives → B3 layout → B4 DataTable → B5 SlideOverForm (lint/type-check/test after each).
3. B6 sweep → B7 docs → full verification.

---

## Session 2 Amendments (2026-09-26) — OVERRIDE earlier sections on conflict

**Context:** A prior session (`feat/design-system-sync`, tip `dd6b850`, now fast-forwarded into `feat/responsiveness-density`) had already executed most of this spec. User decisions on re-discovery:

1. **Palette: appFinance red/gray wins.** Session-1 adopted sistemaDemo's canonical oklch palette (primary `oklch(0.5854 0.2041 277.1173)`, purple-blue). Reverted to the original red/gray (`:root` `oklch(0.4 0.2 27.5)`, `.dark` `oklch(0.6083 0.209 27.0276)`) while keeping session-1's token structure, status colors (`--color-success/-info`), typography remap, and shadow registrations. (Plan Task 1.)
2. **Labels: `font-black` + `tracking-widest` wins.** Session-1's 27 conversions to sistema's `font-bold tracking-wider` are reverted. (Plan Task 2.)
3. **`text-[9px]` bases (supersedes T4b).** Session-1's sweep converted every `text-[Npx]` including `text-[9px]` responsive-pair bases → `text-xs`; sistemaDemo ground truth also has zero `text-[9px]`. Adopted state stands (0 arbitrary values); wallet chip / budget rows / badge bodies are visual-pass watch spots for the size jump.
4. **Adopted without redo:** gitignore enforcement (219 files untracked), token layer, primitives (except `p-(--space-6)` + wizard `h-11` — Plan Task 6), layout tiers, SlideOverForm density, typography sweep, AGENTS.md/frontend-agent docs, review fixes.
5. **Spacing lock / form density remain** as specified above (B6 sections) — session-1 did not include them. Exact current-tree enumerations live in the plan.
6. **No-commits protocol:** nothing on this branch gets committed until the user explicitly says so; reviews run against controller-taken working-tree snapshots.

**Session-2 plan:** `docs/superpowers/plans/2026-09-26-responsiveness-density.md` (Tasks 1-7) — authoritative task breakdown.
