feat: Create interactive helper for manual data structuring

Introduces a stateful, interactive command-line script to guide the manual process of structuring historical CSV data. This script manages a master index of column types and tracks which files have been processed, ensuring consistency and allowing the user to stop and resume the task.

The script reads files chronologically, prompts the user to associate data with indexed column types, and records the progress in a dedicated JSON file.

This commit also includes:
- A new guide (`docs/guides/manual-data-structuring.md`) explaining how to use the script.
- A new governance rule in `GEMINI.md` to ensure no actions are taken without explicit user consent.