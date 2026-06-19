fix: auto-refresh dashboard/cards/recurrences after mutations and align docs with actual schema

- Fix dashboard query keys from flat strings to structured arrays so prefix matching works
- Add missing query invalidations in createTransaction and createAccount mutations
- Invalidate recurrences, cards, and dashboard after transaction creation
- Invalidate dashboard after account creation
- Fix docs: Decimal(15,2) → Decimal(19,4), add INSTALLMENT to RecurrenceType,
  clarify soft delete as opt-in
