docs: Update metadata analysis report and migration guide

- Updated `docs/guides/metadata_analysis_report.md` to include a granular month-by-month summary of metadata key usage.
- Updated `docs/guides/guide-after-report.md` to reflect the new method for executing database write operations. The guide now instructs users to create temporary SQL files and pipe them to `psql` via `docker exec`, ensuring safer and more robust migration steps.
- Completed all four phases of the data migration from the `metadata` JSON field to dedicated columns, as outlined in the guide.
