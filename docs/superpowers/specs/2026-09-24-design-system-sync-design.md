# Design System Sync — Design Spec

**Date:** 2026-09-24
**Source:** `fedepaz/sistemaDemo` PR #134 "feat(design-system): enforce token usage and responsive density across all components" (merged 2026-09-20, dev branch) + its `.gitignore` enforcement.
**Reference docs (in sistemaDemo repo):**
- `docs/superpowers/specs/2026-09-18-design-system-enforcement-design.md`
- `docs/superpowers/specs/2026-09-18-1366x768-density-fix-design.md`
- `TEMPLATE-PLAN.md` → "Design System Strategy" (canonical token system)

## Context

appFinance currently defines ~basic shadcn tokens in `app/apps/frontend/src/app/[locale]/globals.css` with **zero token consumption** in components: 199 hardcoded px arbitrary values (`h-[24px]`, `text-[13px]`…) across ~50 files, no density/layout/text tokens, `--radius: 0px`. sistemaDemo shipped the full enforcement (PR #134, 581 files) and a stricter `.gitignore` with tool files untracked (commit `40eb2c1`).

## Scope Decisions (user-confirmed)

| Decision | Choice |
|---|---|
| Port scope | **PR #134 only** — design system + gitignore |
| PR #136 (tests/security/CVE) | **Deferred** to a separate follow-up session |
| Scheduled security scan | **Stays blocking** in appFinance (sistemaDemo's non-blocking change is a bug to fix there) |
| Fonts | **Keep appFinance's** — Oxanium (sans), Source Code Pro (mono), current serif |
| Radius | **Keep `--radius: 0px`** — sharp corners are appFinance's theme |
| Enforcement depth | **Full** — primitives + shared + all feature components |
| Approach | **B: rule-based** — edit appFinance's own files per the spec; copy nothing wholesale |
| Verification | Automated checks + **ux-review skill** pass + 1366×768 dev-server sanity |
| Branch | `feat/design-system-sync` off current HEAD (after `feat/putting-the-work` checkpoint commits) |

## Section 1 — Token System (`[locale]/globals.css`)

Edit appFinance's file in place (i18n path unchanged). Add token groups to `:root` (structural tokens; `.dark` overrides colors only):

| Group | Tokens |
|---|---|
| Spacing | `--space-0/0-5/1/1-5/2/3/4/5/6/8/10` (0,2,4,6,8,12,16,20,24,32,40px) |
| Control heights | `--control-height-xs/sm/(default)/md/lg` (24/28/32/36/40px) |
| Table density | `--table-row-height`, `--table-header-height`, `--table-cell-px/py` (40/36/12/4); compact variant 32/32/8/2 |
| Typography | `--text-caption/body-sm/body/body-lg/subtitle/title/heading` (11/12/14/16/18/20/24px) |
| Layout | `--sidebar-width-compact/-/collapsed` (160/224/56px), `--header-height-compact/-` (40/48px) |
| Shadows | existing scale + `--shadow-premium` |
| Status colors | generic `--color-success`, `--color-info` (keep existing `--color-warning`) |

Deliberate deltas from sistemaDemo:

1. **Fonts kept**: `--font-sans: Oxanium`, `--font-mono: Source Code Pro`, serif unchanged.
2. **No domain colors**: sistemaDemo's `--color-siembra/germinacion/faltante/pre-expedicion` (agriculture) do not apply.
3. **Colors**: sistemaDemo's oklch shadcn palette is canonical (per TEMPLATE-PLAN: appFinance's palette is the legacy pattern).
4. **Radius stays `0px`** — the `--radius-sm/md/lg/xl` calc mappings remain, they resolve against 0.
5. **Typography remap in `@theme inline`** (the highest-impact change — zero component edits):

   ```css
   --text-xs: var(--text-caption);   /* 11px (was 12) */
   --text-sm: var(--text-body-sm);   /* 12px (was 14) */
   --text-base: var(--text-body);    /* 14px (was 16) */
   --text-lg: var(--text-body-lg);   /* 16px (was 18) */
   --text-xl: var(--text-subtitle);  /* 18px (was 20) */
   --text-2xl: var(--text-title);    /* 20px (was 24) */
   --text-3xl: var(--text-heading);  /* 24px (was 30) */
   ```

Dark mode: `.dark` overrides color tokens only; spacing/heights/density/typography shared.

**Visual impact (accepted):** denser UI, smaller base type, oklch palette shift. Radius/font unchanged.

## Section 2 — Component Enforcement (rule-based, className values only)

**2a. shadcn primitives** (`src/components/ui/`, ~16 files): hardcoded heights/paddings → control-height and space tokens, e.g. `h-9` → `h-(--control-height)`, `h-10` → `h-(--control-height-md)`, `px-4` → `px-(--space-4)`. Per spec, control heights are consumed directly (`h-(--control-height)`), no `@theme` mapping needed.

**2b. Shared components** (`layout/`, `data-display/`, `common/`, ~15 files):
- data-table: row/header/cell sizes from `--table-*` tokens; compact variant at intermediate viewports
- desktop-sidebar / mobile-navigation / headers: `--sidebar-width-*`, `--header-height-*`
- kpi-card, skeletons, empty-state, loading-boundary: `--space-*` / `--text-*`

**2c. Feature components** (~50 files, 199 hardcoded px occurrences): convert arbitrary px → nearest `--space-*` / `--control-height-*` / `--text-*` value. Rule: use the closest existing scale value; **do not invent tokens** (budget = the spec's ~46 tokens).

**2d. Responsive density**: appFinance already has `src/hooks/useMediaQuery.ts`; apply density-fix spec rules — compact table/header density at intermediate viewports (exact breakpoint rules are defined in sistemaDemo's `docs/superpowers/specs/2026-09-18-1366x768-density-fix-design.md`; that file is the source of truth during implementation, with 1366×768 as the primary baseline). No new hooks.

**Constraint:** no component API or JSX structure changes — `className` values only. Wizard step components get the same 2c sweep.

## Section 3 — Gitignore Update & Enforcement

**3a. Update `.gitignore`**: adopt sistemaDemo's current patterns, keeping appFinance-only `.bun`. Added patterns: `**/src/generated/`, `.env.production`, `.env.staging`, `.env.staging.local`, `.agents/`, `.skills/`, `.commits/`, `.superpowers/`, `.gemini/`, `.opencode/`, `.playwright-mcp/`, `skills-lock.json`, `**/backups/`, `raw_session.txt`.

**3b. Untrack 219 files** (`git rm -r --cached`, kept on disk):

| Group | Count | Notes |
|---|---|---|
| Root `.commits/` (legacy) | 131 | historical workflow files |
| `app/.commits/` | 66 | message files stay local; `git commit -F` unaffected |
| `app/apps/backend/src/generated/prisma/*` | 21 | safe: composite CI action runs `npx prisma generate`; verify Docker build does the same (plan step) |
| `app/.superpowers/sdd/progress.md` | 1 | tool state |

Pre-state: zero tracked files conflict with today's gitignore (verified via `git ls-files -ci --exclude-standard`).

**3c. AGENTS.md**: note that `app/.commits/` message files are no longer committed (ignored local inputs to `git commit -F`).

## Section 4 — Docs, Verification, Error Handling

**Docs:**
- AGENTS.md: token-enforcement rule (components consume tokens; never hardcode pixel sizes) + explicit `--radius: 0px` theme decision.
- `docs/agents/frontend_agent_finance.md`: token groups table.
- This spec.

**Verification (must pass before done):**
1. `pnpm lint`, `pnpm test` (125 frontend + 160 backend), `pnpm build` — green after each commit stage.
2. Frontend raw `tsc --noEmit`: error count stays at known baseline **30** (all pre-existing in `__tests__`); no new errors.
3. **ux-review skill** pass — fix what it flags.
4. Dev-server sanity at 1366×768 (the spec's baseline).

**Error handling:**
- Test failure after className sweep → test selectors depend on markup; adjust test or revert that file.
- ux-review flags missing token → only add a token if no existing one fits (46-token budget).
- Backend build fails after Prisma untrack → `npx prisma generate` restores; CI already generates.
- Pre-existing failures unrelated to this work → record, don't fix.

**Sequencing (6 commits on `feat/design-system-sync`):**
1. `.gitignore` update + untrack 219 files (+ AGENTS.md workflow note)
2. `globals.css` token groups + typography remap + palette
3. shadcn primitives + shared components (layout/data-display/common)
4. Feature component px→token sweep + responsive density
5. Docs (AGENTS.md rules, frontend agent profile, this spec)
6. ux-review fixes (only if flagged)

**Explicit non-goals:**
- No radius/rounding change; no font change; no domain colors.
- No PR #136 test port (next session); no `scheduled.yml` change (stays blocking).
- No component API/JSX restructuring; no tokens beyond the spec set.
- No commits/pushes unless the user explicitly asks (AGENTS.md rule).
