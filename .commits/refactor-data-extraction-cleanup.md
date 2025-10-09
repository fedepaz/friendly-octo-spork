refactor(data-extraction): remove local file dependencies and cleanup data

This commit refactors the data extraction process to be more robust and less dependent on local file paths.

- Updates the sheet name filter in `extract_sheets.ts` to more reliably exclude local file paths.
- Removes a metadata entry from `sheets_metadata.json` that pointed to a local file.
- Deletes numerous CSV files from `plantillaInicial/informacionInicial/` that are no longer needed.
- Updates `docker-compose.yml` for consistency.
