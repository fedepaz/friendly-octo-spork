feat: Implement Gemini-driven data structuring and consolidate JSON output

Replaced the manual TypeScript script-based data structuring with a new
Gemini-driven workflow. The agent now directly processes CSV files into
structured JSON based on defined rules.

- Introduced `docs/guides/data-structuring-rules.md` for detailed structuring guidelines.
- Consolidated all structured JSON data into `finance-app/json_structured_data/`.
- Updated `finance-app/json_structured_data/structuring_progress.json` to track processing status.
- Deprecated and removed `finance-app/src/scripts/structure_sheet_data.ts` and `finance-app/src/scripts/types.ts`.