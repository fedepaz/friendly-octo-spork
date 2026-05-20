feat: implement monthly date-range filtering for transactions

- Update TransactionRepository to accept gte/lte filters, include relations, and sort by descending date
- Update TransactionsService to parse 'YYYY-MM' strings into bound Date objects
- Default TransactionsController query to current month and feed filtered data to Hono JSX template
- Make navItem property optional in TransactionPageProps to avoid TS compilation errors
