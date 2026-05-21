feat: implement soft delete and transition to CUID primary keys

Updates the database architecture to support modern data management patterns.

Key changes:
- Schema: Added 'deletedAt' and 'deletedByUserId' to User and Account for soft delete support.
- Schema: Transitioned primary keys from Int to CUID (VarChar 36) for Account, Category, Recurrence, and Transaction.
- Fix: Corrected foreign key type mismatches in Transaction and Recurrence models to align with CUID IDs.
- Docs: Updated Architect and Backend agent profiles with new ID and Soft Delete standards.
- Docs: Revised Database Workflow guide to document the Soft Delete procedure.
- Migration: Generated and applied migration `20260521010501_soft_delete_and_cuid_transition`.
