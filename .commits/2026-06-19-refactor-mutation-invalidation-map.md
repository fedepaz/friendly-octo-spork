refactor: centralize mutation invalidation into query-invalidation-map

- Add lib/query-invalidation-map.ts as single source of truth for
  which queries each mutation invalidates
- Refactor createTransaction and createAccount hooks to read from map
- Pattern scales easily: add one entry per new mutation, no hook edits
