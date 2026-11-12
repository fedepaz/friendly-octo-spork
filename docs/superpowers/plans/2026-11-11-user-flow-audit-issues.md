# User-Flow Audit Issue Set — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create the 14 approved GitHub issues (13 checklist audit tasks + 1 epic) plus the two labels they need, so the full user-flow audit can be tackled one issue at a time.

**Architecture:** Pure GitHub issue creation via `gh` CLI — no application code changes. One label-setup task, one task per issue (body content is verbatim from the approved spec), one epic task that links all 13 tasks last (per the `epic.yml` convention), and one docs-PR task to land the spec + plan on `dev`.

**Tech Stack:** GitHub CLI (`gh`), GitHub Issues (task/epic YAML templates as body conventions), markdown task-list checkboxes.

## Global Constraints

- Source of truth: `docs/superpowers/specs/2026-11-11-user-flow-audit-design.md` — checklists reproduced verbatim with three documented adaptations: (a) the #3 matrix meta-text is operationalized as instruction + the actual table; (b) spec references like "same matrix as #3" become descriptive text in issue bodies (avoids GitHub mislinking to unrelated issue #3); (c) two parentheticals relocated to sub-headings. On divergence in these areas, the plan's operational form wins. Elsewhere, the spec wins.
- Titles: English, format `audit(scope): short description` (epic uses `epic: ...`).
- Every task-issue body follows the `task.yml` structure (What should be done / Type / Extra context) **plus a `## Checks` section this issue type adds**: `## What should be done?` (with the RULE paragraph), `## Type` = `audit`, `## Checks` (grouped `- [ ]` outcome checks), `## Extra context`.
- RULE paragraph (verbatim in every task body): `RULE: every ✗ → open a follow-up issue (bug/enhancement), link it in "Extra context". NEVER fix inside this audit.`
- Labels: `audit` on all 13 tasks; `epic` on the epic. Both labels must exist before issues are created (Task 1).
- Creation order: **13 tasks first, epic last**, then paste task links into the epic's Tasks checklist.
- Follow-up issues (found later during audits) reference `Found in #<audit-issue>` — not part of this plan.
- No application code, no migrations, no `app/` changes in this plan — deliverable is GitHub state + two docs committed on branch `docs/user-flow-audit-spec`.
- Every `gh issue create` must be verified with `gh issue view` or `gh issue list --search` before the next task starts.

---

### Task 1: Create labels `audit` and `epic`

**Files:**
- None (GitHub labels; repo: `fedepaz/friendly-octo-spork`)

**Interfaces:**
- Consumes: nothing
- Produces: labels `audit` and `epic` available for Tasks 2–15

- [ ] **Step 1: Create both labels**

```bash
gh label create audit --repo fedepaz/friendly-octo-spork --color 5319e7 --description "Flow audit checklist task" --force
gh label create epic --repo fedepaz/friendly-octo-spork --color 0e8a16 --description "Large feature split into tasks" --force
```

- [ ] **Step 2: Verify both labels exist**

Run: `gh label list --repo fedepaz/friendly-octo-spork --search "audit" && gh label list --repo fedepaz/friendly-octo-spork --search "epic"`
Expected: both `audit` and `epic` rows present (search each separately if needed).

---

### Task 2: Issue — `audit(auth)`

**Files:**
- None (GitHub issue)

**Interfaces:**
- Consumes: label `audit` (Task 1)
- Produces: open issue (record its number as `AUTH_ISSUE` for the epic)

- [ ] **Step 1: Create the issue**

```bash
gh issue create --repo fedepaz/friendly-octo-spork \
  --title "audit(auth): registration, login, and session lifecycle" \
  --label "audit" \
  --body "$(cat <<'EOF_BODY'
## What should be done?
Walk the auth flow end-to-end — running app OR code trace; every check must be observable either way. Tick ✓/✗ with one line of evidence (screenshot, API response, or code path).

RULE: every ✗ → open a follow-up issue (bug/enhancement), link it in "Extra context". NEVER fix inside this audit.

## Type
audit

## Checks
### Registration & login
- [ ] Register creates the account and lands on the dashboard; invalid/duplicate input shows errors
- [ ] Login works with valid creds; wrong creds show a friendly error (no crash)
### Session lifecycle
- [ ] Session survives page refresh; expired/invalid session redirects to login
- [ ] Logout clears everything — back button never shows authenticated content

## Extra context
<!-- follow-up links as they appear -->
EOF_BODY
)"
```

- [ ] **Step 2: Verify**

Run: `gh issue list --repo fedepaz/friendly-octo-spork --search "registration, login, and session lifecycle" --json number,title,labels,state`
Expected: one row, `state: OPEN`, label `audit`, title exactly `audit(auth): registration, login, and session lifecycle`. Record the issue number.

---

### Task 3: Issue — `audit(accounts)`

**Files:**
- None (GitHub issue)

**Interfaces:**
- Consumes: label `audit`
- Produces: open issue (record number for the epic)

- [ ] **Step 1: Create the issue**

```bash
gh issue create --repo fedepaz/friendly-octo-spork \
  --title "audit(accounts): creation, types, initial amount, balance integrity" \
  --label "audit" \
  --body "$(cat <<'EOF_BODY'
## What should be done?
Walk the accounts flow end-to-end — running app OR code trace; every check must be observable either way. Tick ✓/✗ with one line of evidence (screenshot, API response, or code path).

RULE: every ✗ → open a follow-up issue (bug/enhancement), link it in "Extra context". NEVER fix inside this audit.

## Type
audit

## Checks
### Creation & types
- [ ] Create account: all types selectable, fields validated
### Initial amount & balance integrity
- [ ] Initial amount is editable and lands in the balance correctly
- [ ] Balance = initial amount ± transactions, and updates immediately after a new transaction
### Soft delete
- [ ] Soft-delete: account vanishes from lists/selectors but data remains (no hard delete)

## Extra context
<!-- follow-up links as they appear -->
EOF_BODY
)"
```

- [ ] **Step 2: Verify**

Run: `gh issue list --repo fedepaz/friendly-octo-spork --search "creation, types, initial amount" --json number,title,labels,state`
Expected: one OPEN row, label `audit`, exact title. Record the number.

---

### Task 4: Issue — `audit(transactions)` wizard (the magic)

**Files:**
- None (GitHub issue)

**Interfaces:**
- Consumes: label `audit`
- Produces: open issue with the debit/credit matrix table (record number for the epic)

- [ ] **Step 1: Create the issue**

```bash
gh issue create --repo fedepaz/friendly-octo-spork \
  --title "audit(transactions): new-transaction wizard debit/credit correctness" \
  --label "audit" \
  --body "$(cat <<'EOF_BODY'
## What should be done?
Walk the new-transaction wizard end-to-end — running app OR code trace; every check must be observable either way. Tick ✓/✗ with one line of evidence (screenshot, API response, or code path).

RULE: every ✗ → open a follow-up issue (bug/enhancement), link it in "Extra context". NEVER fix inside this audit.

## Type
audit

## Checks
### Wizard steps
- [ ] All wizard steps navigate + validate (type → account → amount → category → budget → recurrence → review); review shows a correct summary
### Debit/credit matrix (the heart of the app)
- [ ] For each account type × transaction type, the balance moves the right direction — fill every cell below with the **expected** effect observed/derived (debit / credit / no-op), then verify against actual behavior:

| | BANK | WALLET | CASH | CARD | INVESTMENT |
|---|---|---|---|---|---|
| INCOME | | | | | |
| EXPENSE | | | | | |
| TRANSFER | | | | | |
| INVESTMENT | | | | | |
| RETURN | | | | | |
| PAYMENT | | | | | |

### Effects after submit
- [ ] Submitted transaction appears in the list at once and moves balance + dashboard KPIs
- [ ] Choosing recurrence in the wizard actually creates the linked recurrence

## Extra context
<!-- follow-up links as they appear -->
EOF_BODY
)"
```

- [ ] **Step 2: Verify**

Run: `gh issue list --repo fedepaz/friendly-octo-spork --search "new-transaction wizard" --json number,title,labels,state`
Expected: one OPEN row, label `audit`, exact title. Confirm the body contains the matrix table: `gh issue view <N> --json body --jq '.body' | grep -c "WALLET"` → `1`. Record the number.

---

### Task 5: Issue — `audit(transactions): list`

**Files:**
- None (GitHub issue)

**Interfaces:**
- Consumes: label `audit`
- Produces: open issue (record number for the epic)

- [ ] **Step 1: Create the issue**

```bash
gh issue create --repo fedepaz/friendly-octo-spork \
  --title "audit(transactions): list, filters, month query, pagination" \
  --label "audit" \
  --body "$(cat <<'EOF_BODY'
## What should be done?
Walk the transactions list end-to-end — running app OR code trace; every check must be observable either way. Tick ✓/✗ with one line of evidence (screenshot, API response, or code path).

RULE: every ✗ → open a follow-up issue (bug/enhancement), link it in "Extra context". NEVER fix inside this audit.

## Type
audit

## Checks
### Filters & month query
- [ ] Filters (account/category/type) work; month navigation scopes correctly — "this month empty, last month full" must be provable
### Pagination
- [ ] Quantity pagination: page size, next/prev, counts correct; empty-month state sane
### Categories & detail (folded scope)
- [ ] Category names display correctly everywhere; detail view complete

## Extra context
<!-- follow-up links as they appear -->
EOF_BODY
)"
```

- [ ] **Step 2: Verify**

Run: `gh issue list --repo fedepaz/friendly-octo-spork --search "list, filters, month query" --json number,title,labels,state`
Expected: one OPEN row, label `audit`, exact title. Record the number.

---

### Task 6: Issue — `audit(recurrences): loans`

**Files:**
- None (GitHub issue)

**Interfaces:**
- Consumes: label `audit`
- Produces: open issue (record number for the epic)

- [ ] **Step 1: Create the issue**

```bash
gh issue create --repo fedepaz/friendly-octo-spork \
  --title "audit(recurrences): recurrences and loans lifecycle" \
  --label "audit" \
  --body "$(cat <<'EOF_BODY'
## What should be done?
Walk the recurrences (incl. loans) flow end-to-end — running app OR code trace; every check must be observable either way. Tick ✓/✗ with one line of evidence (screenshot, API response, or code path).

RULE: every ✗ → open a follow-up issue (bug/enhancement), link it in "Extra context". NEVER fix inside this audit.

## Type
audit

## Checks
### Create & update
- [ ] Create/update (`updateRecurrence`) works; edits affect future occurrences
### Loans as recurrences
- [ ] Loans-as-recurrences (`INSTALLMENT` recurrence type): scheduled occurrences appear on the right dates across month navigation
### Execution effects
- [ ] Executed occurrences create transactions that hit balances via the same matrix as the wizard audit (issue with `new-transaction wizard`)
- [ ] Pause/active (if present) respected; no double-execution on month boundary

## Extra context
<!-- follow-up links as they appear -->
EOF_BODY
)"
```

- [ ] **Step 2: Verify**

Run: `gh issue list --repo fedepaz/friendly-octo-spork --search "recurrences and loans lifecycle" --json number,title,labels,state`
Expected: one OPEN row, label `audit`, exact title. Record the number.

---

### Task 7: Issue — `audit(cards)`

**Files:**
- None (GitHub issue)

**Interfaces:**
- Consumes: label `audit`
- Produces: open issue (record number for the epic)

- [ ] **Step 1: Create the issue**

```bash
gh issue create --repo fedepaz/friendly-octo-spork \
  --title "audit(cards): lifecycle, payments, next-month toPay, pagination" \
  --label "audit" \
  --body "$(cat <<'EOF_BODY'
## What should be done?
Walk the cards flow end-to-end — running app OR code trace; every check must be observable either way. Tick ✓/✗ with one line of evidence (screenshot, API response, or code path).

RULE: every ✗ → open a follow-up issue (bug/enhancement), link it in "Extra context". NEVER fix inside this audit.

## Type
audit

## Checks
### Card lifecycle
- [ ] Create card validated; card spend ties to the card and updates its balance
### Payments (`updateCardBalance`)
- [ ] `updateCardBalance` payment flow reduces what's owed; pending/paid states correct
### Next-month toPay
- [ ] Next month shows the correct `toPay` (sum of pending, excluding paid)
### Pagination
- [ ] >10 pending payments paginate correctly (page size, nav, totals)

## Extra context
<!-- follow-up links as they appear -->
EOF_BODY
)"
```

- [ ] **Step 2: Verify**

Run: `gh issue list --repo fedepaz/friendly-octo-spork --search "next-month toPay" --json number,title,labels,state`
Expected: one OPEN row, label `audit`, exact title. Record the number.

---

### Task 8: Issue — `audit(dashboard)`

**Files:**
- None (GitHub issue)

**Interfaces:**
- Consumes: label `audit`
- Produces: open issue (record number for the epic)

- [ ] **Step 1: Create the issue**

```bash
gh issue create --repo fedepaz/friendly-octo-spork \
  --title "audit(dashboard): KPIs, charts, month navigation" \
  --label "audit" \
  --body "$(cat <<'EOF_BODY'
## What should be done?
Walk the dashboard end-to-end — running app OR code trace; every check must be observable either way. Tick ✓/✗ with one line of evidence (screenshot, API response, or code path).

RULE: every ✗ → open a follow-up issue (bug/enhancement), link it in "Extra context". NEVER fix inside this audit.

## Type
audit

## Checks
### Data integrity
- [ ] KPIs and charts reconcile with underlying data (spot-check sums against transactions/accounts)
### Month navigation & states
- [ ] Month navigation updates every widget consistently; empty/new-month states render sanely
### Loading
- [ ] Skeletons appear while loading; no layout jump after data arrives

## Extra context
<!-- follow-up links as they appear -->
EOF_BODY
)"
```

- [ ] **Step 2: Verify**

Run: `gh issue list --repo fedepaz/friendly-octo-spork --search "KPIs, charts, month navigation" --json number,title,labels,state`
Expected: one OPEN row, label `audit`, exact title. Record the number.

---

### Task 9: Issue — `audit(investments)`

**Files:**
- None (GitHub issue)

**Interfaces:**
- Consumes: label `audit`
- Produces: open issue (record number for the epic)

- [ ] **Step 1: Create the issue**

```bash
gh issue create --repo fedepaz/friendly-octo-spork \
  --title "audit(investments): portfolio view and reinvest returns" \
  --label "audit" \
  --body "$(cat <<'EOF_BODY'
## What should be done?
Walk the investments flow end-to-end — running app OR code trace; every check must be observable either way. Tick ✓/✗ with one line of evidence (screenshot, API response, or code path).

RULE: every ✗ → open a follow-up issue (bug/enhancement), link it in "Extra context". NEVER fix inside this audit.

## Type
audit

## Checks
### Portfolio view
- [ ] Portfolio lists investment accounts with correct totals/columns
### Reinvest returns
- [ ] Reinvest-returns flow creates the right transactions and moves balances (same matrix as the wizard audit)
### Filters & states
- [ ] Filters/search work; empty state correct

## Extra context
<!-- follow-up links as they appear -->
EOF_BODY
)"
```

- [ ] **Step 2: Verify**

Run: `gh issue list --repo fedepaz/friendly-octo-spork --search "portfolio view and reinvest returns" --json number,title,labels,state`
Expected: one OPEN row, label `audit`, exact title. Record the number.

---

### Task 10: Issue — `audit(users)`

**Files:**
- None (GitHub issue)

**Interfaces:**
- Consumes: label `audit`
- Produces: open issue (record number for the epic)

- [ ] **Step 1: Create the issue**

```bash
gh issue create --repo fedepaz/friendly-octo-spork \
  --title "audit(users): management, profile, and password" \
  --label "audit" \
  --body "$(cat <<'EOF_BODY'
## What should be done?
Walk the users/profile flow end-to-end — running app OR code trace; every check must be observable either way. Tick ✓/✗ with one line of evidence (screenshot, API response, or code path).

RULE: every ✗ → open a follow-up issue (bug/enhancement), link it in "Extra context". NEVER fix inside this audit.

## Type
audit

## Checks
### User management
- [ ] User list/create works (admin flow); soft-delete hides without destroying data
### Profile & password
- [ ] Profile displays correctly; password change works (old password required, errors on mismatch)
### Deleted user
- [ ] Deleted user can no longer log in

## Extra context
<!-- follow-up links as they appear -->
EOF_BODY
)"
```

- [ ] **Step 2: Verify**

Run: `gh issue list --repo fedepaz/friendly-octo-spork --search "management, profile, and password" --json number,title,labels,state`
Expected: one OPEN row, label `audit`, exact title. Record the number.

---

### Task 11: Issue — `audit(permissions)`

**Files:**
- None (GitHub issue)

**Interfaces:**
- Consumes: label `audit`
- Produces: open issue (record number for the epic)

- [ ] **Step 1: Create the issue**

```bash
gh issue create --repo fedepaz/friendly-octo-spork \
  --title "audit(permissions): permission matrix behavior" \
  --label "audit" \
  --body "$(cat <<'EOF_BODY'
## What should be done?
Walk the permissions flow end-to-end — running app OR code trace; every check must be observable either way. Tick ✓/✗ with one line of evidence (screenshot, API response, or code path).

RULE: every ✗ → open a follow-up issue (bug/enhancement), link it in "Extra context". NEVER fix inside this audit.

## Type
audit

## Checks
### Matrix rendering
- [ ] Matrix renders entities × C/R/U/D accurately for the selected user
### Enforcement
- [ ] Toggling a permission takes effect (e.g., revoking `cards` read hides the nav item/endpoint)
### Alerts entity (seeded in PR #29)
- [ ] The `alerts` entity appears and gates the header bell
### Reset
- [ ] Reset/re-grant returns to expected state

## Extra context
<!-- follow-up links as they appear -->
EOF_BODY
)"
```

- [ ] **Step 2: Verify**

Run: `gh issue list --repo fedepaz/friendly-octo-spork --search "permission matrix behavior" --json number,title,labels,state`
Expected: one OPEN row, label `audit`, exact title. Record the number.

---

### Task 12: Issue — `audit(audit-logs)`

**Files:**
- None (GitHub issue)

**Interfaces:**
- Consumes: label `audit`
- Produces: open issue (record number for the epic)

- [ ] **Step 1: Create the issue**

```bash
gh issue create --repo fedepaz/friendly-octo-spork \
  --title "audit(audit-logs): trail listing and filters" \
  --label "audit" \
  --body "$(cat <<'EOF_BODY'
## What should be done?
Walk the audit-logs screen end-to-end — running app OR code trace; every check must be observable either way. Tick ✓/✗ with one line of evidence (screenshot, API response, or code path).

RULE: every ✗ → open a follow-up issue (bug/enhancement), link it in "Extra context". NEVER fix inside this audit.

## Type
audit

## Checks
### What gets logged
- [ ] POST/PATCH/DELETE are logged, GET is not (per design)
### Entry contents
- [ ] Entry shows user, action, entity, changes diff, IP, duration
### Sanitization
- [ ] Secrets sanitized — no password/token ever appears in a log entry
### Listing
- [ ] Filters + month query + quantity pagination work

## Extra context
<!-- follow-up links as they appear -->
EOF_BODY
)"
```

- [ ] **Step 2: Verify**

Run: `gh issue list --repo fedepaz/friendly-octo-spork --search "trail listing and filters" --json number,title,labels,state`
Expected: one OPEN row, label `audit`, exact title. Record the number.

---

### Task 13: Issue — `audit(ui): pagination consistency`

**Files:**
- None (GitHub issue)

**Interfaces:**
- Consumes: label `audit`
- Produces: open issue (record number for the epic)

- [ ] **Step 1: Create the issue**

```bash
gh issue create --repo fedepaz/friendly-octo-spork \
  --title "audit(ui): pagination & month-query consistency across screens" \
  --label "audit" \
  --body "$(cat <<'EOF_BODY'
## What should be done?
Compare pagination and month-query behavior across every list screen — running app OR code trace; every check must be observable either way. Tick ✓/✗ with one line of evidence (screenshot, API response, or code path).

RULE: every ✗ → open a follow-up issue (bug/enhancement), link it in "Extra context". NEVER fix inside this audit.

## Type
audit

## Checks
### Shared pattern
- [ ] Every list screen (transactions, cards, recurrences, investments, users, audit-logs) uses the same pagination component/pattern
### Decoupling rule (month = filter, quantity = page size)
- [ ] Month query and quantity pagination are decoupled identically everywhere
### Consistency of states
- [ ] Same empty-month messaging; any intentional deviation gets documented in this issue body

## Extra context
<!-- follow-up links as they appear -->
EOF_BODY
)"
```

- [ ] **Step 2: Verify**

Run: `gh issue list --repo fedepaz/friendly-octo-spork --search "month-query consistency" --json number,title,labels,state`
Expected: one OPEN row, label `audit`, exact title. Record the number.

---

### Task 14: Issue — `audit(ui): i18n & responsive`

**Files:**
- None (GitHub issue)

**Interfaces:**
- Consumes: label `audit`
- Produces: open issue (record number for the epic)

- [ ] **Step 1: Create the issue**

```bash
gh issue create --repo fedepaz/friendly-octo-spork \
  --title "audit(ui): i18n coverage and responsive behavior" \
  --label "audit" \
  --body "$(cat <<'EOF_BODY'
## What should be done?
Audit i18n and responsiveness across the app — running app OR code trace; every check must be observable either way. Tick ✓/✗ with one line of evidence (screenshot, API response, or code path).

RULE: every ✗ → open a follow-up issue (bug/enhancement), link it in "Extra context". NEVER fix inside this audit.

## Type
audit

## Checks
### i18n
- [ ] No hardcoded user-facing strings (spot-check every screen; en/es parity)
### Responsive
- [ ] Mobile breakpoints behave (`visual-pass/` screenshots at 390/768/1024/1366 are the reference)
### Design tokens
- [ ] Design tokens respected — no rogue arbitrary px, correct control heights

## Extra context
<!-- follow-up links as they appear -->
EOF_BODY
)"
```

- [ ] **Step 2: Verify**

Run: `gh issue list --repo fedepaz/friendly-octo-spork --search "i18n coverage" --json number,title,labels,state`
Expected: one OPEN row, label `audit`, exact title. Record the number.

---

### Task 15: Epic — link all 13 tasks

**Files:**
- None (GitHub issue)

**Interfaces:**
- Consumes: the 13 issue numbers from Tasks 2–14
- Produces: open epic with a complete Tasks checklist (single source of truth for coverage)

- [ ] **Step 1: Collect the 13 task numbers**

Run: `gh issue list --repo fedepaz/friendly-octo-spork --label audit --json number,title --jq 'sort_by(.number) | .[] | "\(.number) \(.title)"'`
Expected: exactly 13 rows. If any is missing, re-run the missing task before continuing.

- [ ] **Step 2: Create the epic (replace each `*_ISSUE` placeholder with the real number from Step 1)**

```bash
gh issue create --repo fedepaz/friendly-octo-spork \
  --title "epic: full user-flow audit — journey checklist" \
  --label "epic" \
  --body "$(cat <<'EOF_BODY'
## Description

Walk the entire user journey and tick every check. Fixes never happen inside audit tasks — they become linked follow-up issues (`Found in #<audit-issue>`).

Journey map:

1. User enters → registers / logs in
2. Creates an account (types, editable initial amount)
3. Presses **new transaction** → the magic: debit/credit per account type × transaction type
4. Accounts stay correct through payments, recurrences (loans), and card spend
5. Every list screen: month query + quantity pagination
6. Cards: next-month `toPay`, >10 payments paginated

Design spec: `docs/superpowers/specs/2026-11-11-user-flow-audit-design.md`

RULE: every ✗ → open a follow-up issue (bug/enhancement), link it in the task's "Extra context". NEVER fix inside an audit task.

## Tasks

- [ ] #AUTH_ISSUE — audit(auth): registration, login, and session lifecycle
- [ ] #ACCOUNTS_ISSUE — audit(accounts): creation, types, initial amount, balance integrity
- [ ] #WIZARD_ISSUE — audit(transactions): new-transaction wizard debit/credit correctness
- [ ] #TXLIST_ISSUE — audit(transactions): list, filters, month query, pagination
- [ ] #RECURRENCES_ISSUE — audit(recurrences): recurrences and loans lifecycle
- [ ] #CARDS_ISSUE — audit(cards): lifecycle, payments, next-month toPay, pagination
- [ ] #DASHBOARD_ISSUE — audit(dashboard): KPIs, charts, month navigation
- [ ] #INVESTMENTS_ISSUE — audit(investments): portfolio view and reinvest returns
- [ ] #USERS_ISSUE — audit(users): management, profile, and password
- [ ] #PERMISSIONS_ISSUE — audit(permissions): permission matrix behavior
- [ ] #AUDITLOGS_ISSUE — audit(audit-logs): trail listing and filters
- [ ] #PAGINATION_ISSUE — audit(ui): pagination & month-query consistency across screens
- [ ] #I18N_ISSUE — audit(ui): i18n coverage and responsive behavior
EOF_BODY
)"
```

- [ ] **Step 3: Verify the epic**

Run: `gh issue view <EPIC_N> --json title,labels,body --jq '{title, labels: [.labels[].name], links: (.body | [scan("#[0-9]+")] | length)}'`
Expected: title `epic: full user-flow audit — journey checklist`, labels contain `epic`, `links: 13`.

---

### Task 16: Push spec + plan docs and open PR to `dev`

**Files:**
- Modify: none (both files already committed on `docs/user-flow-audit-spec`; this task only lands them)

**Interfaces:**
- Consumes: spec commit + plan commit on `docs/user-flow-audit-spec`
- Produces: PR into `dev` containing spec + plan (user merges)

- [ ] **Step 1: Push and open the PR**

```bash
git push -u origin docs/user-flow-audit-spec
gh pr create --repo fedepaz/friendly-octo-spork --base dev --head docs/user-flow-audit-spec \
  --title "docs: add user-flow audit spec and implementation plan" \
  --body "$(cat <<'EOF_PR'
## Summary
Adds the approved design spec and the implementation plan for the 14-issue user-flow audit set (13 checklist tasks + 1 epic), per the brainstorming session.

### Testing & Security
- Docs-only; pre-commit lint passed
EOF_PR
)"
```

Expected: PR URL printed targeting `dev`. **Do not merge** — the user merges.

- [ ] **Step 2: Final verification of the whole deliverable**

Run: `gh issue list --repo fedepaz/friendly-octo-spork --state open --json number,title,labels --jq 'length' && gh issue list --repo fedepaz/friendly-octo-spork --label epic --state open --json number --jq 'length'`
Expected: `14` open issues (13 tasks + 1 epic) — plus any unrelated issues (currently none). Epic present.
