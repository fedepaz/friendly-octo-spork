# Design System Sync Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Port sistemaDemo PR #134 (design-system enforcement + responsive density) and its `.gitignore` enforcement into appFinance as one refactor on branch `feat/design-system-sync`.

**Architecture:** Rule-based port: define sistemaDemo's approved token system in appFinance's `globals.css` (spacing / control-height / table-density / typography / layout tokens + oklch palette + typography remap), then sweep `className` values across `ui/` → shared → feature components so sizes consume tokens instead of hardcoded px, and apply the density tiers (sidebar / header / table / slide-over) at the 1366×768 baseline. Finally adopt sistemaDemo's stricter `.gitignore`, untrack 219 tool files, and document the rules.

**Tech Stack:** Next.js 16 App Router, Tailwind CSS v4 (`@theme inline`, arbitrary-value syntax `h-(--token)`), NestJS/Prisma backend (untouched except untracking generated client), pnpm + Turbo, Jest, ESLint/Prettier via `pnpm lint`.

**Spec:** `docs/superpowers/specs/2026-09-24-design-system-sync-design.md` (approved). Local reference copies: `/home/fedepaz/Documents/proyectos/sistemaDemo` (post-PR-#134 source of truth) and its specs `docs/superpowers/specs/2026-09-18-design-system-enforcement-design.md`, `docs/superpowers/specs/2026-09-18-1366x768-density-fix-design.md`.

## Global Constraints

- **Working dir:** all commands run from `/home/fedepaz/Documents/proyectos/appFinance/app` unless stated.
- **Branch:** create `feat/design-system-sync` off current `feat/putting-the-work`. Work only on this branch.
- **No push, no PR** unless the user explicitly asks. Commits follow the spec's 6-commit sequence (Task 1 = C1 gitignore, Task 2 = C2 tokens, Tasks 3+4 staged together = C3 primitives+shared, Task 5 = C4 feature sweep, Task 6 = C5 docs, Task 7 = C6 conditional review fixes). Commit messages: Conventional Commits per `app/COMMIT_CONVENTIONS.md`, written to `app/.commits/YYYY-MM-DD-<type>-<desc>.md`, committed with `git commit -F .commits/<file>`.
- **Locked design decisions (from spec):**
  - `--radius: 0px` stays (sharp corners are the appFinance theme). Radius calc mappings stay.
  - Fonts stay: Oxanium (sans), Source Code Pro (mono), current serif.
  - Keep appFinance's `--warning`/`--warning-foreground`, `--tracking-*`, `--transition-premium`, `--shadow-*` scale, `.dark` shadow block, i18n `globals.css` path (`src/app/[locale]/globals.css`).
  - No domain colors (no `--color-siembra` etc.).
  - No component API or JSX structure changes — `className` values only (plus the CSS file and docs).
  - No PR #136 content, no `scheduled.yml` change, no test port.
  - No `md:`-spacing lock sweep (only the files explicitly listed below get density edits).
  - No label restyles (`font-black`/`tracking-widest` weight changes are out of scope).
- **Token mapping tables (authoritative for every sweep):**

  **Text (enforcement spec §4):** `text-[7px]`/`[8px]`/`[9px]`/`[10px]`/`[11px]` → `text-xs` · `text-[12px]`/`[13px]` → `text-sm` · `text-[14px]` → `text-base` · `text-[16px]` → `text-lg` · `text-[18px]` → `text-xl` · `text-[20px]` → `text-2xl` · `text-[24px]` → `text-3xl` · `text-[0.8rem]` → `text-sm`. Any other `text-[Npx]` → nearest token by px value. **Collapse rule:** if base and responsive side map to the same token (`text-[9px] md:text-[11px]`), output a single class (`text-xs`); if they differ, keep the responsive pair (`text-xs md:text-sm`).

  **Heights (primitives/shared only; feature scale heights untouched):** `h-6`→`h-(--control-height-xs)` · `h-7`→`h-(--control-height-sm)` · `h-8`→`h-(--control-height)` · `h-9`→`h-(--control-height)` · `h-10`→`h-(--control-height-lg)`. **Exceptions (explicit tables win):** `button`/`toggle` `sm` variant `h-8`→`h-(--control-height-xs)`; `table.tsx` head `h-10`→`h-(--table-header-height)`; dashboard-header week box → `h-(--header-height-compact)`; all `Skeleton` bar heights stay unless listed as an explicit edit below; `avatar h-10 w-10` stays (functional/intentional per enforcement table).

  **Space tokens (scope: `src/components/ui/*.tsx` + kpi-card/feature-card/empty-state/loading-spinner only):** scale classes of families `p px py pt pb pl pr m mx my mt mb ml mr gap space-x space-y`, with or without breakpoint prefix, convert **only exact matches**: `0`→`--space-0`, `0.5`→`--space-0-5`, `1`→`--space-1`, `1.5`→`--space-1-5`, `2`→`--space-2`, `3`→`--space-3`, `4`→`--space-4`, `5`→`--space-5`, `6`→`--space-6`, `8`→`--space-8`, `10`→`--space-10`. Values without an exact token (`2.5`, `7`, `9`, `11+`, …) keep the scale class. Syntax: `px-4` → `px-(--space-4)`.

  **Keep (never convert):** `min-w-[…]`/`max-w-[…]`/`w-[…]`/`h-[…]` > 40px content constraints · `max-h-[300px]`/`max-h-[90dvh]`/`min-w-[8rem]` · `shadow-[…]` · `h-[1px]`/`w-[1px]` (separator) · all `w-[Npx]` skeleton bars · `min-h-dvh` · responsive `grid-cols-*` and `hidden`/`col-span-*`/`max-*` classes · feature-file scale spacing and heights not listed below.

- **Verification baselines (must hold after every task):**
  - `pnpm lint` → 0 errors (≈96 pre-existing warnings allowed).
  - `pnpm test` → all green (125 frontend + 160 backend tests).
  - `pnpm --filter frontend exec tsc --noEmit 2>&1 | grep -c 'error TS'` → **exactly 30** (all pre-existing in `__tests__`).
  - `pnpm build` → green (run at Task 2 and Task 7).
- **Error handling (from spec):** a test failing after a className sweep → fix the test selector or revert that file's edit. Backend build failing after Prisma untrack → `npx prisma generate` restores it (Dockerfile line 49 and `backend build` script already generate). Pre-existing failures unrelated to this work → record, don't fix.

## File Structure

| Area | Files | Task |
|---|---|---|
| Repo config | `.gitignore`, `AGENTS.md` (workflow note) | 1 |
| Tokens | `app/apps/frontend/src/app/[locale]/globals.css` | 2 |
| Primitives | `app/apps/frontend/src/components/ui/*.tsx` (31 files; ~22 edited) | 3 |
| Shared data-display | `data-display/data-table/{data-table,data-table-skeleton,column-filters,export-dropdown,month-selector,transType-selector,slide-over-form,data-table-cells}.tsx`, `kpi-card/`, `feature-card/` | 4 |
| Layout | `layout/{desktop-sidebar,dashboard-header,mobile-navigation,auth-header}.tsx`, `app/[locale]/(dashboard)/layout.tsx`, `app/[locale]/(auth)/layout.tsx` | 4 |
| Common / profile | `common/{empty-state,loading-spinner,language-switcher,database-unavailable,coming-soon}.tsx`, `user-profile/{user-sidebar-menu,user-info,user-password}.tsx` | 4 |
| Features | 27 files under `src/features/**` (Appendix A) | 5 |
| Docs | `AGENTS.md`, `docs/agents/frontend_agent_finance.md`, spec file | 6 |
| Verification | full suite + `ux-review` skill + 1366×768 dev-server sanity | 7 |

---

### Task 1: Branch, `.gitignore` enforcement, untrack 219 files, workflow note (Commit 1)

**Files:**
- Modify: `.gitignore`
- Modify: `AGENTS.md` (Commit Workflow item 4)
- Index only: 219 tracked files (kept on disk)

**Interfaces:**
- Produces: ignored patterns `**/src/generated/`, `.commits/`, `.superpowers/`, `.agents/`, `.skills/`, `.gemini/`, `.opencode/`, `.playwright-mcp/`, `skills-lock.json`, `.env.production`, `.env.staging`, `.env.staging.local`, `**/backups/`, `raw_session.txt` — later tasks rely on `.commits/` being untracked while `git commit -F .commits/<file>` keeps working.

- [ ] **Step 1: Create the branch**

```bash
git checkout -b feat/design-system-sync
```

Expected: `Switched to a new branch 'feat/design-system-sync'`

- [ ] **Step 2: Write `.gitignore` (sistemaDemo's patterns + appFinance-only `.bun`)**

Replace `.gitignore` at repo root with exactly:

```gitignore
# =========================
# OS & System Files
# =========================
.DS_Store
pids
*.pid
*.seed
*.pid.lock

# =========================
# Dependencies & Package Managers
# =========================
**/node_modules/
.pnpm/

# =========================
# Build & Compiled Output
# =========================
**/dist/
**/build/
**/.next/
**/.turbo/
**/out/
**/src/generated/
*.tsbuildinfo
next-env.d.ts

# =========================
# Logs & Debug Files
# =========================
# General logs
logs
*.log

# Node.js debug logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

# Diagnostic reports (https://nodejs.org/api/report.html)
report.[0-9]*.[0-9]*.[0-9]*.[0-9]*.json

# =========================
# Environment Variables
# =========================

# Alternatively, if you want to ignore specific ones but allow others:
.env
.env.local
.env.development.local
.env.test.local
.env.production
.env.production.local
.env.staging
.env.staging.local

# =========================
# Testing & Coverage
# =========================
**/coverage/
/.nyc_output

# =========================
# IDEs & Editors
# =========================
# General
/.idea
.project
.classpath
.c9/
*.launch
.settings/
*.sublime-workspace
**/.clerk

# VSCode (preserve workspace settings)
.vscode/*
!.vscode/settings.json
!.vscode/tasks.json
!.vscode/launch.json
!.vscode/extensions.json

# =========================
# Misc & Temporary Files
# =========================
.vercel
*.pem
.temp
.tmp
# bun
.bun

# =========================
# Agents & Skills
# =========================
.agents/
.skills/
.commits/
.superpowers/
.gemini/
.opencode/
.playwright-mcp/
skills-lock.json

# =========================
# Backups & Session Dumps
# =========================
**/backups/
raw_session.txt
```

- [ ] **Step 3: Untrack the 219 files (kept on disk)**

```bash
git rm -r --cached .commits
git rm -r --cached app/.commits
git rm -r --cached app/apps/backend/src/generated/prisma
git rm -r --cached app/.superpowers
```

- [ ] **Step 4: Verify the counts**

```bash
git diff --cached --name-only | wc -l
git ls-files -ci --exclude-standard | wc -l
```

Expected: `219` then `0`. (Group counts: root `.commits/` 131, `app/.commits/` 66, prisma 21, `app/.superpowers/sdd/progress.md` 1.)

- [ ] **Step 5: Prove the backend still builds with untracked Prisma client**

```bash
pnpm --filter backend exec prisma generate
```

Expected: `Generated Prisma Client` (Dockerfile:49 and `backend` `build` script also run `prisma generate` — CI/Docker safe).

- [ ] **Step 6: Update the Commit Workflow note in `AGENTS.md`**

In `AGENTS.md`, replace item 4 of `## Commit Workflow`:

```markdown
4. Save commit message to `app/.commits/YYYY-MM-DD-type-description.md`, then `git add . && git commit -F .commits/<file>`.
```

with:

```markdown
4. Save commit message to `app/.commits/YYYY-MM-DD-type-description.md`, then `git add . && git commit -F .commits/<file>`. These message files are gitignored local inputs — never committed.
```

- [ ] **Step 7: Verify lint and tests still pass**

```bash
pnpm lint && pnpm test
```

Expected: 0 lint errors; all tests green.

- [ ] **Step 8: Commit**

Save message to `app/.commits/2026-09-24-chore-gitignore-enforcement.md`:

```text
chore: adopt strict gitignore patterns and untrack tool files

- Add sistemaDemo PR #134 gitignore patterns (generated clients, tool
  dirs, staging env files, backups) while keeping .bun
- Untrack 219 files (.commits x2, prisma generated client, .superpowers)
  via git rm --cached; files stay on disk
- Note in AGENTS.md that .commits message files are local-only
```

```bash
git add .gitignore AGENTS.md .commits app/.commits app/apps/backend/src/generated app/.superpowers
git commit -F .commits/2026-09-24-chore-gitignore-enforcement.md
```

Expected: pre-commit `pnpm lint` hook passes; `git status` shows only the remaining untracked spec file.

---

### Task 2: `globals.css` — token groups, palette, typography remap (Commit 2)

**Files:**
- Modify: `app/apps/frontend/src/app/[locale]/globals.css`

**Interfaces:**
- Produces (the token system every later task consumes):
  - `--space-0/0-5/1/1-5/2/3/4/5/6/8/10` = 0/2/4/6/8/12/16/20/24/32/40px
  - `--control-height-xs/sm/(default)/md/lg` = 24/28/32/36/40px
  - `--table-header-height` 36, `--table-row-height` 40, `--table-cell-px` 12, `--table-cell-py` 4; compact: 32/32/8/2
  - `--text-caption/body-sm/body/body-lg/subtitle/title/heading` = 11/12/14/16/18/20/24px
  - `--sidebar-width-compact` 160, `--sidebar-width` 224, `--sidebar-width-collapsed` 56, `--header-height-compact` 40, `--header-height` 48
  - `--color-success` / `--color-info` (+ foregrounds mapped in `@theme inline`) — fixes the currently-undefined `text-info` used at `features/auditLogs/components/columns.tsx:177`
  - Tailwind remap: `text-xs`=11, `text-sm`=12, `text-base`=14, `text-lg`=16, `text-xl`=18, `text-2xl`=20, `text-3xl`=24
- Consumes: nothing (CSS only).

- [ ] **Step 1: Replace the `:root` palette (lines 10–43)**

Replace `background`…`destructive-foreground` and `border`…`sidebar-ring` values with sistemaDemo's canonical oklch palette, keeping `--warning` / `--warning-foreground` exactly as they are:

```css
  --background: oklch(0.9842 0.0034 247.8575);
  --foreground: oklch(0.2795 0.0368 260.031);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.2795 0.0368 260.031);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.2795 0.0368 260.031);
  --primary: oklch(0.5854 0.2041 277.1173);
  --primary-foreground: oklch(1 0 0);
  --secondary: oklch(0.9276 0.0058 264.5313);
  --secondary-foreground: oklch(0.3729 0.0306 259.7328);
  --muted: oklch(0.967 0.0029 264.5419);
  --muted-foreground: oklch(0.551 0.0234 264.3637);
  --accent: oklch(0.9299 0.0334 272.7879);
  --accent-foreground: oklch(0.3729 0.0306 259.7328);
  --destructive: oklch(0.6368 0.2078 25.3313);
  --destructive-foreground: oklch(1 0 0);
  --warning: oklch(0.8 0.15 80);
  --warning-foreground: oklch(0.2 0.05 80);
  --border: oklch(0.8717 0.0093 258.3382);
  --input: oklch(0.8717 0.0093 258.3382);
  --ring: oklch(0.5854 0.2041 277.1173);
  --chart-1: oklch(0.5854 0.2041 277.1173);
  --chart-2: oklch(0.5106 0.2301 276.9656);
  --chart-3: oklch(0.4568 0.2146 277.0229);
  --chart-4: oklch(0.3984 0.1773 277.3662);
  --chart-5: oklch(0.3588 0.1354 278.6973);
  --sidebar: oklch(0.967 0.0029 264.5419);
  --sidebar-foreground: oklch(0.2795 0.0368 260.031);
  --sidebar-primary: oklch(0.5854 0.2041 277.1173);
  --sidebar-primary-foreground: oklch(1 0 0);
  --sidebar-accent: oklch(0.9299 0.0334 272.7879);
  --sidebar-accent-foreground: oklch(0.3729 0.0306 259.7328);
  --sidebar-border: oklch(0.8717 0.0093 258.3382);
  --sidebar-ring: oklch(0.5854 0.2041 277.1173);
```

Fonts, `--radius: 0px`, `--tracking-*`, `--transition-premium`, `--shadow-premium`, `--shadow-etched` lines stay untouched.

- [ ] **Step 2: Replace the `.dark` palette (lines 61–98)**

```css
  --background: oklch(0.2077 0.0398 265.7549);
  --foreground: oklch(0.9288 0.0126 255.5078);
  --card: oklch(0.2795 0.0368 260.031);
  --card-foreground: oklch(0.9288 0.0126 255.5078);
  --popover: oklch(0.2795 0.0368 260.031);
  --popover-foreground: oklch(0.9288 0.0126 255.5078);
  --primary: oklch(0.6801 0.1583 276.9349);
  --primary-foreground: oklch(0.2077 0.0398 265.7549);
  --secondary: oklch(0.3351 0.0331 260.912);
  --secondary-foreground: oklch(0.8717 0.0093 258.3382);
  --muted: oklch(0.2427 0.0381 259.9437);
  --muted-foreground: oklch(0.7137 0.0192 261.3246);
  --accent: oklch(0.3729 0.0306 259.7328);
  --accent-foreground: oklch(0.8717 0.0093 258.3382);
  --destructive: oklch(0.6368 0.2078 25.3313);
  --destructive-foreground: oklch(0.2077 0.0398 265.7549);
  --warning: oklch(0.75 0.15 80);
  --warning-foreground: oklch(0 0 0);
  --border: oklch(0.4461 0.0263 256.8018);
  --input: oklch(0.4461 0.0263 256.8018);
  --ring: oklch(0.6801 0.1583 276.9349);
  --chart-1: oklch(0.6801 0.1583 276.9349);
  --chart-2: oklch(0.5854 0.2041 277.1173);
  --chart-3: oklch(0.5106 0.2301 276.9656);
  --chart-4: oklch(0.4568 0.2146 277.0229);
  --chart-5: oklch(0.3984 0.1773 277.3662);
  --sidebar: oklch(0.2795 0.0368 260.031);
  --sidebar-foreground: oklch(0.9288 0.0126 255.5078);
  --sidebar-primary: oklch(0.6801 0.1583 276.9349);
  --sidebar-primary-foreground: oklch(0.2077 0.0398 265.7549);
  --sidebar-accent: oklch(0.3729 0.0306 259.7328);
  --sidebar-accent-foreground: oklch(0.8717 0.0093 258.3382);
  --sidebar-border: oklch(0.4461 0.0263 256.8018);
  --sidebar-ring: oklch(0.6801 0.1583 276.9349);
```

The `.dark` `--shadow-*` block (lines 99–117) stays untouched.

- [ ] **Step 3: Append the token groups to `:root`**

Insert after `--spacing: 0.25rem;` (end of `:root`):

```css

  --tracking-normal: 0em;

  /* Density spacing tokens */
  --space-0: 0px;
  --space-0-5: 2px;
  --space-1: 4px;
  --space-1-5: 6px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;

  /* Control height tokens */
  --control-height-xs: 24px;
  --control-height-sm: 28px;
  --control-height: 32px;
  --control-height-md: 36px;
  --control-height-lg: 40px;

  /* Table density tokens */
  --table-header-height: 36px;
  --table-row-height: 40px;
  --table-cell-px: 12px;
  --table-cell-py: 4px;
  --table-compact-header-height: 32px;
  --table-compact-row-height: 32px;
  --table-compact-cell-px: 8px;
  --table-compact-cell-py: 2px;

  /* Typography tokens */
  --text-caption: 11px;
  --text-body-sm: 12px;
  --text-body: 14px;
  --text-body-lg: 16px;
  --text-subtitle: 18px;
  --text-title: 20px;
  --text-heading: 24px;

  /* Layout tokens */
  --sidebar-width-compact: 160px;
  --sidebar-width: 224px;
  --sidebar-width-collapsed: 56px;
  --header-height-compact: 40px;
  --header-height: 48px;
```

- [ ] **Step 4: Add status color blocks after the `.dark` block**

```css
/* Semantic status tokens */
:root {
  --color-success: oklch(0.65 0.19 155);
  --color-info: oklch(0.7 0.15 230);
}

.dark {
  --color-success: oklch(0.72 0.19 155);
  --color-info: oklch(0.78 0.12 230);
}
```

- [ ] **Step 5: Extend `@theme inline` — status, typography remap, shadows**

After `--font-serif: var(--font-serif);` insert:

```css

  /* Semantic status colors */
  --color-success: var(--color-success);
  --color-success-foreground: oklch(1 0 0);
  --color-info: var(--color-info);
  --color-info-foreground: oklch(1 0 0);

  /* Typography: remap Tailwind text sizes to token values */
  --text-xs: var(--text-caption);      /* 11px (was 12px) */
  --text-sm: var(--text-body-sm);      /* 12px (was 14px) */
  --text-base: var(--text-body);       /* 14px (was 16px) */
  --text-lg: var(--text-body-lg);      /* 16px (was 18px) */
  --text-xl: var(--text-subtitle);     /* 18px (was 20px) */
  --text-2xl: var(--text-title);       /* 20px (was 24px) */
  --text-3xl: var(--text-heading);     /* 24px (was 30px) */
```

After `--shadow-2xl: var(--shadow-2xl);` insert:

```css
  --shadow-premium: var(--shadow-premium);
  --shadow-etched: var(--shadow-etched);
```

Note: this **activates** the `.shadow-premium`/`.shadow-etched` utilities — they are referenced by components but currently generate no CSS (latent bug; verified absent from built CSS). Flagged for visual check in Task 7.

- [ ] **Step 6: Verify token definitions**

```bash
grep -c 'var(--text-' apps/frontend/src/app/\[locale\]/globals.css
grep -c -- '--control-height: 32px' apps/frontend/src/app/\[locale\]/globals.css
grep -c -- '--table-compact-row-height:' apps/frontend/src/app/\[locale\]/globals.css
grep -c -- '--color-success:' apps/frontend/src/app/\[locale\]/globals.css
grep -c -- '--sidebar-width-compact:' apps/frontend/src/app/\[locale\]/globals.css
```

Expected: `7` (the seven `--text-xs`…`--text-3xl` remap refs), `1`, `1` (structural token defined once in `:root`), `3` (`:root`, `.dark`, `@theme` ref), `1`.

- [ ] **Step 7: Build the frontend (CSS sanity)**

```bash
pnpm --filter frontend build
```

Expected: build succeeds (a CSS parse error fails here).

- [ ] **Step 8: Commit**

Save `app/.commits/2026-09-24-feat-design-token-system.md`:

```text
feat(frontend): add design token system and oklch palette

- Define spacing, control-height, table-density, typography and layout
  token groups in globals.css
- Adopt sistemaDemo canonical oklch shadcn palette (light + dark); keep
  appFinance fonts, radius 0px, warning tokens and shadow scale
- Add semantic success/info color tokens (fixes undefined text-info)
- Remap Tailwind text sizes to token values in @theme inline
- Register shadow-premium/shadow-etched utilities (currently dead)
```

```bash
git add "apps/frontend/src/app/[locale]/globals.css" .commits/2026-09-24-feat-design-token-system.md
git commit -F .commits/2026-09-24-feat-design-token-system.md
```

---

### Task 3: `ui/` primitives — heights, space tokens, text (Commit 3a, staged with Task 4)

**Files:** (exact edits listed; all paths under `apps/frontend/src/components/ui/`)
- `button.tsx`, `input.tsx`, `select.tsx`, `tabs.tsx`, `toggle.tsx`, `textarea.tsx`, `table.tsx`, `command.tsx`, `form.tsx`, `wizard-modal.tsx`
- Padding sweep (Global Constraints space-token rule) across all 31 `ui/*.tsx` (~79 base candidates + responsive variants)

**Interfaces:**
- Consumes: tokens from Task 2 (`--control-height*`, `--table-header-height`, `--space-*`).
- Produces: primitives sized with tokens — later shared/feature edits rely on `Button size="sm"` rendering 24px, inputs/triggers 32px, table head 36px.

- [ ] **Step 1: `button.tsx` sizes (lines 24–27)**

```tsx
default: "h-(--control-height) px-(--space-4) py-(--space-2)",
sm: "h-(--control-height-xs) rounded-md px-(--space-3) text-xs",
lg: "h-(--control-height-lg) rounded-md px-(--space-8)",
icon: "h-(--control-height) w-(--control-height)",
```

(was `h-9 px-4 py-2` / `h-8 rounded-md px-3 text-xs` / `h-10 rounded-md px-8` / `h-9 w-9`)

- [ ] **Step 2: `input.tsx` (line 11)**

`"flex h-9 w-full rounded-md … px-3 py-1 …"` → `"flex h-(--control-height) w-full rounded-md … px-(--space-3) py-(--space-1) …"` (rest unchanged; may keep trailing `md:text-sm` — sistemaDemo replaced it with plain `text-sm`; apply that too: `md:text-sm` → `text-sm`).

- [ ] **Step 3: `select.tsx` trigger (line 22)**

`h-9` → `h-(--control-height)`; `px-3 py-2` → `px-(--space-3) py-(--space-2)`.

- [ ] **Step 4: `tabs.tsx` list (line 17)**

`h-9` → `h-(--control-height)`; `p-1` → `p-(--space-1)`.

- [ ] **Step 5: `toggle.tsx` (lines 19–21)**

```tsx
default: "h-(--control-height) px-(--space-2) min-w-9",
sm: "h-(--control-height-xs) px-(--space-1-5) min-w-8",
lg: "h-(--control-height-lg) px-2.5 min-w-10",
```

(`px-2.5` = 10px has no token → stays scale; `min-w-*` widths are not space families → stay.)

- [ ] **Step 6: `textarea.tsx` (line 12)**

`min-h-[60px]` → `min-h-[calc(var(--control-height)*2)]`; `px-3 py-2` → `px-(--space-3) py-(--space-2)`; `md:text-sm` → `text-sm`.

- [ ] **Step 7: `table.tsx` head (line 76)**

`"h-10 px-2 text-left …"` → `"h-(--table-header-height) px-(--space-2) text-left …"`.

- [ ] **Step 8: `command.tsx` input (line 47)**

`h-10` → `h-(--control-height-lg)`; `py-3` → `py-(--space-3)`.

- [ ] **Step 9: `form.tsx` (lines 139, 161)**

`text-[0.8rem]` → `text-sm` (both occurrences).

- [ ] **Step 10: `wizard-modal.tsx`**

- Line 74: `className="w-8 h-8 flex items-center …"` → `className="w-(--control-height) h-(--control-height) flex items-center …"`.
- All `text-[Npx]` (6 occurrences, per Global Constraints text table) → `text-xs`.
- Space-token sweep of its 10 exact-match `p*/gap*` candidates.

- [ ] **Step 11: Space-token sweep across all `ui/*.tsx`**

Convert every exact-match spacing candidate per the Global Constraints table (families `p px py pt pb pl pr m* gap space-x space-y`, optional breakpoint prefix). Inventory first:

```bash
grep -rnoE '(^|[: "])(p|px|py|pt|pb|pl|pr|mt|mb|ml|mr|mx|my|gap|space-x|space-y)-(0|0\.5|1|1\.5|2|3|4|5|6|8|10)([^0-9./-]|$)' apps/frontend/src/components/ui/*.tsx | wc -l
```

Record the count (≈79 base + responsive variants), convert, re-run → expected `0` remaining exact matches.

Worked examples: dialog `"… gap-4 rounded-lg border p-6 …"` → `gap-(--space-4) … p-(--space-6)`; dropdown-menu `p-1` → `p-(--space-1)`; badge `px-2 py-0.5` → `px-(--space-2) py-(--space-0-5)`; alert-dialog `sm:space-x-2` → `sm:space-(--space-2)`; popover `p-4` → `p-(--space-4)`; command `space-y-1` → `space-y-(--space-1)`.

Do **not** touch: `avatar.tsx` (`h-10 w-10` stays), `checkbox.tsx`, `switch.tsx`, `progress.tsx` (`h-2`), `separator.tsx` (`h-[1px]`/`w-[1px]`), `skeleton.tsx`, `label.tsx`, `sonner.tsx`, `scroll-area.tsx` scrollbar sizes, `toggle-group.tsx` `gap-1`→ `gap-(--space-1)` is allowed (space family, exact match — convert it), `wizard-step-skeleton.tsx` bar heights stay.

- [ ] **Step 12: Verify primitives**

```bash
grep -rn 'h-9\|min-h-\[60px\]\|text-\[0.8rem\]' apps/frontend/src/components/ui/
grep -rn 'h-10' apps/frontend/src/components/ui/
pnpm lint
```

Expected: first grep → empty; second grep → only `avatar.tsx`; lint 0 errors.

- [ ] **Step 13: Run frontend tests**

```bash
pnpm --filter frontend test
```

Expected: 125 tests pass (no test asserts these classNames; a failure means the test encoded markup — adjust the selector or revert that file's edit).

- [ ] **Step 14: Stage (commit happens after Task 4)**

```bash
git add apps/frontend/src/components/ui
```

---

### Task 4: Shared components + responsive density (Commit 3b)

**Files:**
- Modify: `apps/frontend/src/components/data-display/data-table/data-table.tsx`
- Modify: `apps/frontend/src/components/data-display/data-table/data-table-skeleton.tsx`
- Modify: `apps/frontend/src/components/data-display/data-table/slide-over-form.tsx`
- Modify: `apps/frontend/src/components/data-display/data-table/column-filters.tsx`
- Modify: `apps/frontend/src/components/data-display/data-table/export-dropdown.tsx`
- Modify: `apps/frontend/src/components/data-display/data-table/{month-selector,transType-selector,data-table-cells}.tsx`
- Modify: `apps/frontend/src/components/data-display/kpi-card/kpi-card.tsx`, `feature-card/feature-card.tsx`
- Modify: `apps/frontend/src/components/layout/{desktop-sidebar,dashboard-header,mobile-navigation,auth-header}.tsx`
- Modify: `apps/frontend/src/app/[locale]/(dashboard)/layout.tsx`, `apps/frontend/src/app/[locale]/(auth)/layout.tsx`
- Modify: `apps/frontend/src/components/common/{empty-state,loading-spinner,language-switcher,database-unavailable,coming-soon}.tsx`
- Modify: `apps/frontend/src/components/user-profile/{user-sidebar-menu,user-info,user-password}.tsx`
- Sweep: all `text-[Npx]` in these files (Appendix B, ≈66 occurrences)

**Interfaces:**
- Consumes: Task 2 tokens; Task 3 primitives (`Button size="sm"` = 24px, Input = 32px).
- Produces: density tiers — sidebar `w-40 xl:w-48 2xl:w-56`, header `h-10 xl:h-12 2xl:h-14`, table rows `h-(--table-compact-row-height) xl:h-(--table-row-height)`, slide-over `max-w-lg` — feature dashboards (Task 5) inherit these via the shared `DataTable`/`SlideOverForm`.

- [ ] **Step 1: `data-table.tsx` — §5 token migration (exact line edits)**

| Line | Old | New |
|---|---|---|
| 149 | `flex items-center justify-center gap-2 min-h-10` | `flex items-center justify-center gap-2 min-h-(--table-compact-row-height) xl:min-h-(--table-row-height)` |
| 155 | `min-h-10 text-muted-foreground` | `min-h-(--table-compact-row-height) xl:min-h-(--table-row-height) text-muted-foreground` |
| 263 | `text-[10px] font-bold uppercase …` (CardDescription) | `text-xs font-bold uppercase …` |
| 271 | `text-[10px] font-black …` (count badge) | `text-xs font-black …` |
| 285 | `h-8 … text-[10px] … px-3` (columns button) | `h-(--control-height-sm) xl:h-(--control-height) … text-xs … px-3` |
| 303 | `text-[11px] font-bold py-2 px-3 …` (menu item) | `text-xs font-bold py-2 px-3 …` |
| 322 | `h-8 pl-7 text-[10px] …` (search Input) | `h-(--control-height-sm) xl:h-(--control-height) pl-7 text-xs …` |
| 355 | `h-10 py-0 text-[10px] font-black uppercase tracking-widest text-muted-foreground/50` (TableHead) | `h-(--table-compact-header-height) xl:h-(--table-header-height) py-1 text-xs font-black uppercase tracking-widest text-muted-foreground/50` |
| 380 | `py-2.5 px-3 text-[11px] font-bold h-12` (TableCell) | `py-(--table-compact-cell-py) xl:py-(--table-cell-py) px-(--table-compact-cell-px) xl:px-(--table-cell-px) text-xs xl:text-sm font-bold h-(--table-compact-row-height) xl:h-(--table-row-height)` |
| 395 | `h-32 text-center text-[11px] …` (empty row) | `h-32 text-center text-xs …` |
| 407, 412, 431 | `text-[10px] …` (footer labels) | `text-xs …` |
| 421 | `h-7 w-8 text-[10px] font-mono …` (page-size buttons) | `h-(--control-height-xs) xl:h-(--control-height-sm) w-8 text-xs font-mono …` |
| 444, 452 | `h-8 w-8 p-0 …` (prev/next) | `h-(--control-height-xs) xl:h-(--control-height-sm) w-7 p-0 …` |

Also `text-[11px]`/`text-[10px]` anywhere else in this file → `text-xs` (remaining list is covered above; verify with grep).

- [ ] **Step 2: `data-table-skeleton.tsx` — match the real table**

- TableHead cells (lines 50–56 cn args and line 61): add `h-(--table-compact-header-height) xl:h-(--table-header-height) py-1 text-xs font-semibold` to the className (keep existing `hidden sm:table-cell` conditionals).
- TableCell (lines 70–72): add `h-(--table-compact-row-height) xl:h-(--table-row-height) py-0.5 xl:py-1 px-2 xl:px-3 text-xs xl:text-sm`.
- Line 39 search skeleton `h-9 w-full` → `h-8 w-full` (matches the search input's 32px).
- Line 41 export skeleton `h-9 w-[80px] sm:w-[100px]` → `h-10 w-[80px] sm:w-[100px]` (matches `min-h-(--space-10)` export button).
- Line 95 pagination skeleton `h-8 w-[70px]` → `h-7 w-[70px]` (matches 28px pagination controls).
- All `w-[…]` bar widths **stay** (content shapes).

- [ ] **Step 3: `slide-over-form.tsx` — density (ground-truth values)**

| Line | Old | New |
|---|---|---|
| 74 | `"w-full sm:max-w-md flex flex-col …"` | `"w-full max-w-lg flex flex-col …"` |
| 81 | `px-6 py-5 border-b …` (SheetHeader) | `px-3 py-2 border-b …` |
| 83 | `text-[10px] font-black uppercase …` | `text-xs font-black uppercase …` |
| 90 | `text-[10px] font-mono uppercase …` | `text-xs font-mono uppercase …` |
| 99 | `h-full px-6 py-8 custom-scrollbar` | `h-full px-3 py-2 custom-scrollbar` |
| 102 | `space-y-8 animate-premium-in` | `space-y-2 animate-premium-in` |
| 108 | `px-6 py-5 border-t …` (SheetFooter) | `px-3 py-2 border-t …` |
| 112 | `w-full h-12 text-[11px] …` | `w-full h-(--control-height-md) text-xs …` |
| 121 | `flex-1 h-12 text-[11px] …` | `flex-1 h-(--control-height-md) text-xs …` |
| 130 | `flex-1 h-12 text-[11px] …` | `flex-1 h-(--control-height-md) text-xs …` |

`SheetTitle text-xl` stays (remap already shrinks it to 18px). `gap-4` (line 118) stays.

- [ ] **Step 4: `column-filters.tsx` / `export-dropdown.tsx`**

- `column-filters.tsx:48` `className="h-8 border-dashed bg-transparent"` → `"h-(--control-height-sm) xl:h-(--control-height) border-dashed bg-transparent"`. Keep `w-[200px]` popover.
- `export-dropdown.tsx:45` `className="min-h-[40px] bg-transparent"` → `className="min-h-(--space-10) bg-transparent"`.

- [ ] **Step 5: `month-selector.tsx`, `transType-selector.tsx`, `data-table-cells.tsx`**

All `text-[Npx]` (3 / 3 / 4 occurrences) → `text-xs` per the text table. No other changes.

- [ ] **Step 6: Layout density**

- `desktop-sidebar.tsx:348`: `isCollapsed ? "w-14" : "w-56",` → `isCollapsed ? "w-14" : "w-40 xl:w-48 2xl:w-56",`
- `desktop-sidebar.tsx` text sweep: all `text-[Npx]` (10 occurrences: lines 91, 101, 110, 116, 132, 136, 170, 226, 266, 393) → `text-xs`. Keep `h-8`/`h-7` nav-row heights (feature-scale heights out of scope).
- `dashboard-header.tsx:46`: `flex h-12 items-center` → `flex h-10 xl:h-12 2xl:h-14 items-center`
- `dashboard-header.tsx:61`: `px-4 border-r border-border/40 h-12 cursor-help` → `px-4 border-r border-border/40 h-(--header-height-compact) xl:h-12 cursor-help`
- `dashboard-header.tsx` text sweep: lines 66, 77, 81, 92 → `text-xs`.
- `mobile-navigation.tsx` text sweep: lines 85, 89, 96, 192, 228, 254 → `text-xs`.
- `auth-header.tsx` text sweep: 1 occurrence → `text-xs`.
- `(dashboard)/layout.tsx:22`: `px-1 sm:px-2 lg:px-4 py-1.5` → `px-3 xl:px-5 2xl:px-8 py-1.5`
- `(dashboard)/layout.tsx:23`: `space-y-4` → `space-y-2`
- `(auth)/layout.tsx` text sweep: 2 occurrences → `text-xs`.

- [ ] **Step 7: kpi-card / feature-card / common / user-profile**

- `kpi-card.tsx`: text sweep (lines 31, 37, 42, 47 → `text-xs`); space sweep: `px-4`→`px-(--space-4)` (lines 30, 34), `gap-1.5`→`gap-(--space-1-5)`, `px-1.5`→`px-(--space-1-5)`, `py-0.5`→`py-(--space-0-5)`.
- `feature-card.tsx`: text sweep (2 → `text-xs`); space sweep: `p-5`→`p-(--space-5)` (CardHeader line 42) and other exact matches.
- `empty-state.tsx`: space sweep: `gap-3`→`gap-(--space-3)`, `gap-1`→`gap-(--space-1)`, `mt-2`→`mt-(--space-2)`; keep `py-16`, `h-14 w-14`, `h-7 w-7`, `max-w-[250px]`.
- `loading-spinner.tsx`: space sweep: `gap-1.5`→`gap-(--space-1-5)`, `gap-3`→`gap-(--space-3)`, `px-6`→`px-(--space-6)`; keep `gap-12`, `w-[600px] h-[600px]`, indicator sizes.
- `language-switcher.tsx` (2), `database-unavailable.tsx` (2), `coming-soon.tsx` (2), `user-sidebar-menu.tsx` (8), `user-info.tsx` (2), `user-password.tsx` (2): text sweep → `text-xs` (per table); no spacing changes.

- [ ] **Step 8: Verify shared work**

```bash
grep -rn 'text-\[' apps/frontend/src/components/ | grep -v '__tests__'
grep -rn 'min-h-\[40px\]\|sm:max-w-md' apps/frontend/src/components/
grep -rnoE '(^|[: "])(p|px|py|pt|pb|pl|pr|mt|mb|ml|mr|mx|my|gap|space-x|space-y)-(0|0\.5|1|1\.5|2|3|4|5|6|8|10)([^0-9./-]|$)' apps/frontend/src/components/ui/*.tsx apps/frontend/src/components/data-display/kpi-card/*.tsx apps/frontend/src/components/data-display/feature-card/*.tsx apps/frontend/src/components/common/empty-state.tsx apps/frontend/src/components/common/loading-spinner.tsx | wc -l
pnpm lint
```

Expected: first two greps → empty; count → `0`; lint 0 errors.

- [ ] **Step 9: Tests + tsc baseline**

```bash
pnpm --filter frontend test
pnpm --filter frontend exec tsc --noEmit 2>&1 | grep -c 'error TS'
```

Expected: all pass; `30`.

- [ ] **Step 10: Commit (Tasks 3 + 4)**

Save `app/.commits/2026-09-24-refactor-token-consumption-shared.md`:

```text
refactor(frontend): consume design tokens in primitives and shared components

- Size shadcn primitives with control-height/table tokens and space
  tokens (button, input, select, tabs, toggle, textarea, table, command)
- Migrate DataTable to table-density tokens with compact/xl tiers;
  align skeleton; tokenise slide-over density (max-w-lg, px-3 py-2,
  space-y-2, h-(--control-height-md) actions)
- Apply layout density: sidebar w-40 xl:w-48 2xl:w-56, header
  h-10 xl:h-12 2xl:h-14, dashboard px-3 xl:px-5 2xl:px-8 space-y-2
- Replace all arbitrary text-[Npx] in shared components with text
  tokens per the enforcement mapping
```

```bash
git add apps/frontend/src/components apps/frontend/src/app
git commit -F .commits/2026-09-24-refactor-token-consumption-shared.md
```

---

### Task 5: Feature component px → token sweep (Commit 4)

**Files:** 27 feature files (Appendix A; ≈130 `text-[Npx]` occurrences + arbitrary px in `auditLogs/columns.tsx`).

**Interfaces:**
- Consumes: Task 2 tokens + remapped sizes; shared density from Task 4 (feature dashboards render inside `SlideOverForm`/`DataTable`).
- Produces: zero arbitrary text px under `src/features/**`.

- [ ] **Step 1: Establish the exact worklist**

```bash
grep -rc 'text-\[' apps/frontend/src/features --include='*.tsx' | sort -t: -k2 -rn | grep -v ':0$'
```

Expected: 27 files ≈ Appendix A counts (counts are from planning — trust this grep).

- [ ] **Step 2: Apply the text table to every occurrence**

For each file, replace each `text-[Npx]`/`text-[0.8rem]` per Global Constraints (7–11 → `text-xs`; 12–13 → `text-sm`; …). Apply the **collapse rule** for responsive pairs — the only file with pairs is `features/auditLogs/components/auditLog-form.tsx`:

- `text-[9px] md:text-[11px] font-bold uppercase tracking-wider` → `text-xs font-bold uppercase tracking-wider` (both sides → `text-xs`, collapse)
- `text-[10px] md:text-[13px]` → `text-xs md:text-sm` (different tokens, keep pair)

Worked example — `auditLog-form.tsx` (26 occurrences: 8× `[11px]`, 6× `[10px]`, 11× `[9px]`, 1× `[8px]`, all → `text-xs`), then confirm:

```bash
grep -c 'text-\[' apps/frontend/src/features/auditLogs/components/auditLog-form.tsx
```

Expected: `0`.

- [ ] **Step 3: `auditLogs/columns.tsx` — arbitrary px**

- Lines 116, 131, 157, 175: `text-[11px]` → `text-xs`; line 139: `text-[9px]` → `text-xs`.
- **Keep** `min-w-[160px]`, `max-w-[200px]`, `min-w-[140px]`, `min-w-[120px]`, `max-w-[100px]`, `max-w-[120px]` (column width constraints — no token fits; Global Constraints keep-rule).

- [ ] **Step 4: Sweep remaining feature files**

For each file in Appendix A: apply Step 2's mapping. Keep-rules apply (`w-[…]`/`min-w`/`max-w`/`shadow-[…]`/responsive grid/`hidden` stay; scale spacing and scale heights in features stay untouched). Wizard steps and `SmartFormProvider*` files are included in the list.

- [ ] **Step 5: Verify the sweep**

```bash
grep -rn 'text-\[' apps/frontend/src/features --include='*.tsx' | wc -l
grep -rnoE '(^|[^-a-z])(w|h|min-h|min-w|p|px|py|gap|rounded)-\[[0-9.]+px\]' apps/frontend/src/features --include='*.tsx'
pnpm lint
```

Expected: first → `0`; second → only `min-w`/`max-w`-style constraints (e.g. none expected under `features/` besides width constraints — any `p-[Npx]`/`h-[Npx]` found must be converted if a token ≤40px fits, otherwise documented); lint 0 errors.

- [ ] **Step 6: Tests + tsc**

```bash
pnpm --filter frontend test
pnpm --filter frontend exec tsc --noEmit 2>&1 | grep -c 'error TS'
```

Expected: all pass; `30`.

- [ ] **Step 7: Commit**

Save `app/.commits/2026-09-24-refactor-feature-token-sweep.md`:

```text
refactor(frontend): replace hardcoded pixel values in feature components

- Convert ~130 arbitrary text-[Npx] values across 27 feature files to
  text tokens per the enforcement mapping (collapse duplicate
  responsive pairs)
- Keep content width constraints (min-w/max-w column and skeleton
  shapes) as-is; no component APIs changed
```

```bash
git add apps/frontend/src/features .commits/2026-09-24-refactor-feature-token-sweep.md
git commit -F .commits/2026-09-24-refactor-feature-token-sweep.md
```

---

### Task 6: Documentation (Commit 5)

**Files:**
- Modify: `AGENTS.md`
- Modify: `docs/agents/frontend_agent_finance.md`
- Add (stage): `docs/superpowers/specs/2026-09-24-design-system-sync-design.md`

**Interfaces:**
- Consumes: the token groups produced in Task 2 (documented verbatim).

- [ ] **Step 1: Add the token-enforcement rule to `AGENTS.md`**

In `## Architecture & Conventions`, after the bullet `- **Categories are seeded/read-only** …`, insert:

```markdown
- **Design tokens (enforced)**: `className` values consume CSS tokens from `[locale]/globals.css` — control heights `h-(--control-height)` (xs/sm/default/md/lg = 24/28/32/36/40px), table density `h-(--table-compact-row-height) xl:h-(--table-row-height)` + `--table-cell-*`, spacing `px-(--space-4)` (scale 0…40px), layout `--sidebar-width-*` / `--header-height-*`, typography via the remap (`text-xs`=11px … `text-3xl`=24px). Never introduce arbitrary px (`text-[13px]`, `h-[24px]`) — use the nearest token; if no token fits (widths > 40px, content shapes), keep the existing scale class. Never add tokens outside the approved set. `--radius: 0px` (sharp corners) and the Oxanium/Source Code Pro fonts are deliberate theme decisions — do not "fix" them.
```

- [ ] **Step 2: Add the token table to `docs/agents/frontend_agent_finance.md`**

Insert before `## Tech Stack Mastery`:

```markdown
## Design Token System

All sizing in components comes from CSS custom properties defined in `apps/frontend/src/app/[locale]/globals.css`.

| Group | Tokens (values) |
|---|---|
| Spacing | `--space-0/0-5/1/1-5/2/3/4/5/6/8/10` (0/2/4/6/8/12/16/20/24/32/40px) |
| Control heights | `--control-height-xs/sm/(default)/md/lg` (24/28/32/36/40px) |
| Table density | `--table-header-height` 36, `--table-row-height` 40, `--table-cell-px` 12, `--table-cell-py` 4; compact: 32/32/8/2 |
| Typography | `--text-caption/body-sm/body/body-lg/subtitle/title/heading` (11/12/14/16/18/20/24px), remapped onto `text-xs`…`text-3xl` |
| Layout | `--sidebar-width-compact/-/collapsed` (160/224/56px), `--header-height-compact/-` (40/48px) |
| Status | `--color-success`, `--color-info`, `--color-warning` (+ `-foreground` variants) |

Consumption examples: `h-(--control-height)`, `px-(--space-4)`, `h-(--table-compact-row-height) xl:h-(--table-row-height)`, `w-40 xl:w-48 2xl:w-56` (sidebar), `text-xs` (11px after remap). Radius stays `0px` by design; fonts are Oxanium / Source Code Pro.
```

- [ ] **Step 3: Stage the spec file**

```bash
git add docs/superpowers/specs/2026-09-24-design-system-sync-design.md docs/superpowers/plans/2026-09-24-design-system-sync.md
```

- [ ] **Step 4: Verify lint (prettier)**

```bash
pnpm lint
```

Expected: 0 errors.

- [ ] **Step 5: Commit**

Save `app/.commits/2026-09-24-docs-token-enforcement.md`:

```text
docs: add design token rules to agent guidelines

- AGENTS.md: token-enforcement convention, radius/font theme decisions
- frontend agent profile: token groups table with values and syntax
- Add approved design-system-sync spec and implementation plan
```

```bash
git add AGENTS.md docs/agents/frontend_agent_finance.md docs/superpowers .commits/2026-09-24-docs-token-enforcement.md
git commit -F .commits/2026-09-24-docs-token-enforcement.md
```

---

### Task 7: Full verification, ux-review, 1366×768 sanity (Commit 6, conditional)

**Files:**
- Modify: whatever the ux-review pass flags (className-only fixes).
- Possibly revert: `--shadow-premium`/`--shadow-etched` `@theme` registration if visually wrong (single block, easily undone).

- [ ] **Step 1: Full automated suite**

```bash
pnpm lint
pnpm test
pnpm build
pnpm --filter frontend exec tsc --noEmit 2>&1 | grep -c 'error TS'
```

Expected: lint 0 errors; all tests green (125 + 160); build succeeds; tsc → `30`.

- [ ] **Step 2: Sweep audits (record output)**

```bash
grep -rn 'text-\[' apps/frontend/src --include='*.tsx' | grep -v '__tests__' | wc -l
grep -rnoE '(^|[^-a-z])(w|h|min-h|min-w|p|px|py|pt|pb|pl|pr|mx|my|mt|mb|ml|mr|gap|space-y|space-x|rounded|border)-\[[0-9.]+px\]' apps/frontend/src --include='*.tsx' | wc -l
grep -rn 'h-9' apps/frontend/src/components/ui/
```

Expected: `0`; `26` (the documented keeps: 15 skeleton bars, 4 audit column widths, 2 separator, 2 scroll-area, 2 loading-spinner, 1 column-filters popover); empty.

- [ ] **Step 3: Run the ux-review skill**

Invoke `skill ux-review` and apply its checklist against the changed surfaces (palette shift, remapped type scale, activated `shadow-premium`, table density, slide-over density). Fix flagged issues with className-only edits.

- [ ] **Step 4: Dev-server sanity at 1366×768**

```bash
pnpm dev:frontend
```

In the browser tool: open `http://localhost:3000`, resize to 1366×768, verify: sidebar `w-48` (192px) tier, header 48px tier, dashboard grid fits without horizontal scroll, a feature `DataTable` shows compact header/row heights with sensible column count, `SlideOverForm` opens at 512px with tight `space-y-2` sections, dark mode toggle works, no console errors. Also spot-check 1920×1080 (2xl tier: sidebar 224 / header 56) and 768×1024.

- [ ] **Step 5: If Step 3/4 produced fixes, commit (conditional)**

Save `app/.commits/2026-09-24-fix-design-system-review.md`:

```text
fix(frontend): address design system review findings

- <bullet list of the concrete fixes made>
```

```bash
git add -A apps/frontend docs
git commit -F .commits/2026-09-24-fix-design-system-review.md
```

If no changes were needed, skip this commit (document that in the final report).

- [ ] **Step 6: Final report to user**

Summarize: commits created (hashes), verification results vs baselines, ux-review findings/fixes, and explicitly **do not push** — wait for the user's instruction.

---

## Appendix A — Feature sweep files (Task 5)

Counts from planning (re-verify with the Step 1 grep):

| File (under `apps/frontend/src/features/`) | `text-[` |
|---|---|
| `auditLogs/components/auditLog-form.tsx` | 26 (incl. responsive pairs → collapse) |
| `cards/components/cards-view-form.tsx` | 15 |
| `dashboard/components/charts/sidebar/sidebar-charts-recTrans.tsx` | 12 |
| `accounts/components/account-create-form.tsx` | 9 |
| `accounts/components/account-view-form.tsx` | 7 |
| `auth/components/register-form.tsx` | 6 |
| `updateRecurrence/components/steps/stepRecurrence-form.tsx` | 5 |
| `auditLogs/components/columns.tsx` | 5 text + keep 6 width constraints |
| `updateCardBalance/components/steps/stepConfirm-form.tsx` | 4 |
| `dashboard/components/kpis/kpis-dashboard.tsx` | 4 |
| `dashboard/components/charts/sidebar/sidebar-charts-budget.tsx` | 4 |
| `cards/components/columns.tsx` | 4 |
| `auth/components/login-form.tsx` | 4 |
| `users/components/users-view-form.tsx` | 3 |
| `updateRecurrence/components/steps/stepBudget-form.tsx` | 3 |
| `dashboard/components/charts/sidebar/sidebar-charts-accounts.tsx` | 3 |
| `dashboard/components/charts/analytics/analytic-charts-main.tsx` | 3 |
| `dashboard/components/charts/analytics/analytic-charts-bottom.tsx` | 2 |
| `cards/components/cards-data-table.tsx` | 2 |
| `auth/components/AuthDashboard.tsx` | 2 |
| `updateRecurrence/providers/SmartFormProviderRecurrence.tsx` | 1 |
| `updateCardBalance/providers/SmartFormProviderCard.tsx` | 1 |
| `updateCardBalance/components/steps/stepUpdate-form.tsx` | 1 |
| `recurrences/components/recurrence-view-form.tsx` | 1 |
| `recurrences/components/columns.tsx` | 1 |
| `permissions/components/permission-row-item.tsx` | 1 |
| `createTransaction/providers/SmartFormProvider.tsx` | 1 |

## Appendix B — Shared sweep files (Task 4, text occurrences)

| File (under `apps/frontend/src/`) | `text-[` |
|---|---|
| `components/data-display/data-table/data-table.tsx` | 12 |
| `components/layout/desktop-sidebar.tsx` | 10 |
| `components/user-profile/user-sidebar-menu.tsx` | 8 |
| `components/ui/wizard-modal.tsx` | 6 (Task 3) |
| `components/layout/mobile-navigation.tsx` | 6 |
| `components/data-display/data-table/slide-over-form.tsx` | 5 |
| `components/data-display/kpi-card/kpi-card.tsx` | 4 |
| `components/layout/dashboard-header.tsx` | 4 |
| `components/data-display/data-table/data-table-cells.tsx` | 4 |
| `components/data-display/data-table/month-selector.tsx` | 3 |
| `components/data-display/data-table/transType-selector.tsx` | 3 |
| `components/ui/form.tsx` | 2 (Task 3) |
| `components/data-display/feature-card/feature-card.tsx` | 2 |
| `components/user-profile/user-password.tsx` | 2 |
| `components/user-profile/user-info.tsx` | 2 |
| `components/common/language-switcher.tsx` | 2 |
| `components/common/database-unavailable.tsx` | 2 |
| `components/common/coming-soon.tsx` | 2 |
| `app/[locale]/(auth)/layout.tsx` | 2 |
| `components/layout/auth-header.tsx` | 1 |

(Plus non-text edits: data-table §5 rows, skeleton, slide-over density, sidebar/header/layout density, column-filters/export-dropdown heights — all listed in Task 4.)
