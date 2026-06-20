refactor: optimize card statement queries and recurrence timing UI

- Exclude recurring card expenses and align funding transfers target in card statement queries
- Query active recurrences using robust date range overlap logic instead of nextDate
- Add inline validation error for cardType in recurrence form
- Only show first payment timing option for actual recurrence setups
