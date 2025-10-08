feat: Implement first step of interactive migration modularization

This commit introduces the `extract_sheets.ts` script, which is the first step in modularizing the interactive finance migration process.

Key changes include:
- Created `finance-app/src/scripts/extract_sheets.ts` to read ODS/XLSX files, parse and sort sheets, and save raw sheet data as CSVs and a metadata JSON.
- Refactored `parsearNombreHoja` in `extract_sheets.ts` for more robust month/year extraction.
- Added filtering for invalid sheet names in `extract_sheets.ts` to prevent errors from external references.
- Refactored `finance-app/src/scripts/migracionInteractiva.ts` to improve date parsing and usage, and enhance Prisma disconnection error handling.
- Updated Prisma client import paths in `test-db.ts` and `migracionInteractiva.ts` to use the local generated client.
- Cleaned up unnecessary ESLint disable comments across several files.
- Included automatic Prisma configuration updates (postinstall: false) in generated Prisma client files.