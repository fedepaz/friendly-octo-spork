feat(cards): implement monthly statement ledger and settle workflow (WIP)

- Refactor CardRepository to use raw SQL for monthly statements
- Add running balance calculation via window functions
- Union recurrences, one-time expenses, and card payments into a single view
- Update shared schemas with CardStatementItem Zod definitions
- Wire frontend CardsDataTable to use month-based filtering and new DTO

Note: This is a Work In Progress commit. Frontend view forms are in a partially completed state.