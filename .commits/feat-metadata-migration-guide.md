feat: Add guide for metadata migration

This commit introduces a new guide, `docs/guides/guide-after-report-II.md`, which provides a step-by-step process for migrating data from the `metadata` JSON field to dedicated columns.

The guide is divided into two phases:
- Phase 1: Cleaning up empty metadata objects.
- Phase 2: Migrating installment data to the `Recurrence` model.

This guide will serve as a reference for performing the migration and ensures that the process is documented and repeatable.
