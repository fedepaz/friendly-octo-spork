refactor(frontend): normalize permissions and investments feature types

Move permissions types from types/types.ts to the feature-root
types.ts (single importer in constants/table-meta.ts updated) and
extract InvestmentDTO from investmentsService.ts into a new
investments/types.ts. Categorize permissions/index.ts barrel exports
with Components/Hooks/Services sections to match the other 12
feature barrels.
