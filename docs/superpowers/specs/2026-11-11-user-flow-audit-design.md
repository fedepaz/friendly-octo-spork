# Design Spec — Full User-Flow Audit (Issue-Task Set)

**Date:** 2026-11-11
**Status:** Approved (all sections signed off in the brainstorming session; §5 checklists approved verbatim)
**Output of this spec:** 1 epic + 13 checklist task issues on GitHub. This spec is the single source of truth for their content; fixes discovered during audits are explicitly out of scope here.

---

## 1. Goal

Audit the entire user journey of appFinance by creating bounded, checklist-style issue-tasks that can be tackled deeply one at a time — by a human clicking through the app, or by an agent tracing code — without leaving any screen or flow out.

## 2. Settled Decisions

| Question | Decision |
|---|---|
| What each issue produces | **Checklist**: concrete `- [ ]` outcome checks; ticking them off completes the issue; every ✗ spawns a separate follow-up fix issue |
| Coverage | **Every screen** in the app — core money flow + all remaining screens + cross-cutting concerns |
| Who runs the checks | **Either** — checks are phrased as observable outcomes verifiable manually in the running app *or* by code/endpoint trace |
| Pagination placement | **Both**: behavior checks embedded per screen, PLUS one cross-cutting consistency issue |
| Structure | **Epic umbrella** (`epic.yml` pattern): tasks created first, links pasted into the epic last |
| Loans | Modeled as **recurrences** — no separate feature exists or is planned |

## 3. The Epic

**Title:** `epic: full user-flow audit — journey checklist`
**Label:** `epic`
**Description:** the settled plan + 6-step journey map:

1. User enters → registers / logs in
2. Creates an account (types, editable initial amount)
3. Presses **new transaction** → the magic: debit/credit per account type × transaction type
4. Accounts stay correct through payments, recurrences (loans), and card spend
5. Every list screen: month query + quantity pagination
6. Cards: next-month `toPay`, >10 payments paginated

Plus the audit rule (§6) and a Tasks checklist linking the 13 task issues.

**Epic is created last**, after all 13 tasks exist (per `epic.yml`: "Create the task issues first, then paste their links here").

## 4. The 13 Task Issues

| # | Title | Covers |
|---|---|---|
| 1 | `audit(auth): registration, login, and session lifecycle` | register, login, logout, session redirect/expiration |
| 2 | `audit(accounts): creation, types, initial amount, balance integrity` | account types, editable first amount, soft-delete, balances |
| 3 | `audit(transactions): new-transaction wizard debit/credit correctness` | the magic — steps, type/account logic, balance effects |
| 4 | `audit(transactions): list, filters, month query, pagination` | list screen + categories display/filters (folded) |
| 5 | `audit(recurrences): recurrences and loans lifecycle` | create/update (`updateRecurrence`), execution, loans-as-recurrences |
| 6 | `audit(cards): lifecycle, payments, next-month toPay, pagination` | `updateCardBalance`, toPay calc, >10 payments |
| 7 | `audit(dashboard): KPIs, charts, month navigation` | root dashboard |
| 8 | `audit(investments): portfolio view and reinvest returns` | investments feature |
| 9 | `audit(users): management, profile, and password` | users CRUD, soft-delete, profile/password |
| 10 | `audit(permissions): permission matrix behavior` | permissions UI, nav gating, `alerts` entity |
| 11 | `audit(audit-logs): trail listing and filters` | audit screen, sanitization |
| 12 | `audit(ui): pagination & month-query consistency across screens` | cross-cutting pattern consistency |
| 13 | `audit(ui): i18n coverage and responsive behavior` | en/es parity, breakpoints, tokens |

**Folded** (no separate issue): categories → `#4` (+ checks in `#3`), profile/password → `#9`, `updateCardBalance` → `#6`, `updateRecurrence` → `#5`.

## 5. Checklists (approved verbatim)

Every check is an observable outcome. Evidence = one line (screenshot, API response, or code path). Core issues `#1`–`#6`:

### `#1` audit(auth)
- [ ] Register creates the account and lands on the dashboard; invalid/duplicate input shows errors
- [ ] Login works with valid creds; wrong creds show a friendly error (no crash)
- [ ] Session survives page refresh; expired/invalid session redirects to login
- [ ] Logout clears everything — back button never shows authenticated content

### `#2` audit(accounts)
- [ ] Create account: all types selectable, fields validated
- [ ] Initial amount is editable and lands in the balance correctly
- [ ] Balance = initial amount ± transactions, and updates immediately after a new transaction
- [ ] Soft-delete: account vanishes from lists/selectors but data remains (no hard delete)

### `#3` audit(transactions) — the magic
- [ ] All wizard steps navigate + validate (type → account → amount → category → budget → recurrence → review); review shows a correct summary
- [ ] Debit/credit matrix: for each account type × transaction type, the balance moves the right direction — the issue body ships a pre-created empty matrix table for the auditor to fill: **rows** = `INCOME, EXPENSE, TRANSFER, INVESTMENT, RETURN, PAYMENT` (shared enums), **columns** = `BANK, WALLET, CASH, CARD, INVESTMENT`, **cells** = expected effect (debit / credit / no-op)
- [ ] Submitted transaction appears in the list at once and moves balance + dashboard KPIs
- [ ] Choosing recurrence in the wizard actually creates the linked recurrence

### `#4` audit(transactions): list
- [ ] Filters (account/category/type) work; month navigation scopes correctly — "this month empty, last month full" must be provable
- [ ] Quantity pagination: page size, next/prev, counts correct; empty-month state sane
- [ ] Category names display correctly everywhere; detail view complete

### `#5` audit(recurrences): loans
- [ ] Create/update (`updateRecurrence`) works; edits affect future occurrences
- [ ] Loans-as-recurrences (`INSTALLMENT` recurrence type): scheduled occurrences appear on the right dates across month navigation
- [ ] Executed occurrences create transactions that hit balances via the same matrix as `#3`
- [ ] Pause/active (if present) respected; no double-execution on month boundary

### `#6` audit(cards)
- [ ] Create card validated; card spend ties to the card and updates its balance
- [ ] `updateCardBalance` payment flow reduces what's owed; pending/paid states correct
- [ ] Next month shows the correct `toPay` (sum of pending, excluding paid)
- [ ] >10 pending payments paginate correctly (page size, nav, totals)

Remaining screens `#7`–`#11`:

### `#7` audit(dashboard)
- [ ] KPIs and charts reconcile with underlying data (spot-check sums against transactions/accounts)
- [ ] Month navigation updates every widget consistently; empty/new-month states render sanely
- [ ] Skeletons appear while loading; no layout jump after data arrives

### `#8` audit(investments)
- [ ] Portfolio lists investment accounts with correct totals/columns
- [ ] Reinvest-returns flow creates the right transactions and moves balances (same matrix as `#3`)
- [ ] Filters/search work; empty state correct

### `#9` audit(users)
- [ ] User list/create works (admin flow); soft-delete hides without destroying data
- [ ] Profile displays correctly; password change works (old password required, errors on mismatch)
- [ ] Deleted user can no longer log in

### `#10` audit(permissions)
- [ ] Matrix renders entities × C/R/U/D accurately for the selected user
- [ ] Toggling a permission takes effect (e.g., revoking `cards` read hides the nav item/endpoint)
- [ ] The `alerts` entity appears and gates the header bell (seeded in PR #29)
- [ ] Reset/re-grant returns to expected state

### `#11` audit(audit-logs)
- [ ] POST/PATCH/DELETE are logged, GET is not (per design)
- [ ] Entry shows user, action, entity, changes diff, IP, duration
- [ ] Secrets sanitized — no password/token ever appears in a log entry
- [ ] Filters + month query + quantity pagination work

Cross-cutting `#12`–`#13`:

### `#12` audit(ui): pagination & month-query consistency
- [ ] Every list screen (transactions, cards, recurrences, investments, users, audit-logs) uses the same pagination component/pattern
- [ ] Month query and quantity pagination are decoupled identically everywhere (month = filter, quantity = page size)
- [ ] Same empty-month messaging; any intentional deviation gets documented in the issue body

### `#13` audit(ui): i18n & responsive
- [ ] No hardcoded user-facing strings (spot-check every screen; en/es parity)
- [ ] Mobile breakpoints behave (`visual-pass/` screenshots at 390/768/1024/1366 are the reference)
- [ ] Design tokens respected — no rogue arbitrary px, correct control heights

## 6. Conventions (all 14 issues)

**Titles:** English, `audit(scope): short description` (family of issue #32's `docs:` style).

**Body** (mirrors `task.yml` + a `## Checks` section this issue type adds):

```markdown
## What should be done?
Walk <area> end-to-end — running app OR code trace; every check must be
observable either way. Tick ✓/✗ with one line of evidence
(screenshot, API response, or code path).

RULE: every ✗ → open a follow-up issue (bug/enhancement), link it in
"Extra context". NEVER fix inside this audit.

## Type
audit  <!-- new label, not the task.yml dropdown values -->

## Checks
### <sub-area>
- [ ] outcome check…

## Extra context
<!-- follow-up links as they appear -->
```

**Epic body** (mirrors `epic.yml`): Description = journey map + audit rule; Tasks = `- [ ] #N` for all 13.

**Labels:** create `audit` label → applied to the 13 tasks; epic gets `epic`.

**Linking:** follow-ups say `Found in #<audit-issue>`; the epic checklist is the single source of truth for coverage/progress.

**Creation order:** 13 tasks first → epic last, links pasted in.

## 7. Out of Scope

- Fixing anything found by a checklist (follow-up issues only)
- The GitHub ruleset `required_status_checks` change (tracked separately, still pending)
- Writing-plans/implementation for the follow-ups themselves — each audit is tackled in its own cycle later
