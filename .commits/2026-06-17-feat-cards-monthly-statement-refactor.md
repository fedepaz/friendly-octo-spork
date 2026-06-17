feat(cards): refactor monthly statement to separate transactions and pending recurrences

- Refactored CardRepository.getMonthlyStatement to use distinct Prisma queries for transactions and pending recurrences.
- Updated CardService and CardController to return structured data, improving clarity between settled and projected card expenses.
- Enhanced CardStatementItemSchema with more specific source type enums.
- Added comprehensive mapping for Transaction and Recurrence DTOs in the card module.
