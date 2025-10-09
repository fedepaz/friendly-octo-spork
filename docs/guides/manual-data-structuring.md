# Guide: Manual Data Structuring

This guide explains how to use the interactive helper script to process the raw CSV data from `plantillaInicial/informacionInicial/` and prepare it for database migration.

This script helps manage the manual process of assigning column types and tracking progress, ensuring consistency across all 71+ files.

## The Workflow

The script is designed to be run repeatedly. Each time you run it, you will process one file.

### 1. Run the Script

To start a session, run the following command from the project root:

```bash
bun run /home/fedepaz/Documents/proyectos/appFinance/finance-app/src/scripts/structureDataHelper.ts
```

### 2. Follow the Prompts

The script will automatically find the next chronological file you need to work on and will prompt you for input:

*   **Adding New Column Types**: The first time you see a new type of data (e.g., "gastos", "inversiones"), type `new` to add it to the master list. The script will assign it a permanent index.
*   **Selecting Columns for a File**: The script will show you the master list of all column types and their indices. You will enter the numbers corresponding to the data types present in the current CSV file (e.g., `1, 3`).
*   **Confirmation**: After you select the columns, the script will show a summary. You must confirm with `y` to save the progress for that file.

### 3. Manual JSON Creation

After a file is marked as complete by the script, your manual task is to create the corresponding structured JSON file in the `json_structured_data/` directory.

### 4. Repeat

Run the script again to process the next file. It will pick up exactly where you left off.

## Progress File

Your progress is saved in `json_structured_data/structuring_progress.json`. This file tracks which files you've completed and the master list of column types you've defined. You should not need to edit this file manually.
