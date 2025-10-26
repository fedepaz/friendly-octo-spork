<!--
Sync Impact Report:
- Version change: (none) -> 1.0.0
- List of modified principles:
    - I. Single Source of Truth
    - II. Ultra-minimal UX with HTMX
    - III. SSR-First
    - IV. Developer Simplicity & User Speed
    - V. Test-Driven Development (TDD)
- Added sections: Technical Constraints, Development Workflow
- Removed sections: (none)
- Templates requiring updates:
    - .specify/templates/plan-template.md ⚠ pending
    - .specify/templates/spec-template.md ⚠ pending
    - .specify/templates/tasks-template.md ⚠ pending
    - .specify/templates/commands/*.md ⚠ pending
    - README.md ⚠ pending
    - docs/quickstart.md ⚠ pending
    - agent-specific guidance files (e.g., docs/architect_agent_finance.md, etc.) ⚠ pending
- Follow-up TODOs: TODO(RATIFICATION_DATE): Determine the original adoption date.
-->
# Personal Finance Tracker Constitution

## Core Principles

### I. Single Source of Truth
All financial activity (income, expenses, recurring payments, investments) is stored as typed transactions in a single Transaction table (or equivalent), with clear categories and metadata.

### II. Ultra-minimal UX with HTMX
The interface must feel like a smart spreadsheet—fast, keyboard-friendly, and form-based. Use HTMX for dynamic interactions (inline edits, form submissions, partial updates) without client-side JS frameworks.

### III. SSR-First
All pages are server-rendered with Hono JSX. No React hydration or SPAs.

### IV. Developer Simplicity & User Speed
Always optimize for developer simplicity and user speed—not feature completeness. "If it can be done in one HTML form with HTMX, do it. If it requires a modal or client-side state, reconsider."

### V. Test-Driven Development (TDD)
TDD is mandatory: Tests are written, user approves, tests fail, then implement. The Red-Green-Refactor cycle is strictly enforced.

## Technical Constraints

Stack: Bun runtime, Hono (with JSX), HTMX, Prisma ORM, Tailwind + Tabler UI. Database: Start with SQLite (dev), deploy with Neon (PostgreSQL). No external APIs in MVP (manual entry only). All data belongs to one user; no sharing, no roles.

## Development Workflow

Code reviews are mandatory for all changes. All new features and bug fixes must include corresponding unit and integration tests.

## Governance

This constitution supersedes all other practices. Amendments require documentation, approval, and a migration plan. All pull requests and reviews must verify compliance with these principles. Complexity must be justified.

**Version**: 1.0.0 | **Ratified**: TODO(RATIFICATION_DATE): Determine the original adoption date. | **Last Amended**: 2025-10-25
