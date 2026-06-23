fix(card): correct balance updates and to-pay query logic

Remove shouldUpdateBalance guard so all card transactions update
account balances immediately. Fix recurrenceDash to-pay query to
match any transaction in the month, not just by currentPart.
Refactor AccountService with mapToDTO to eliminate duplication.
