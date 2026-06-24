refactor(dashboard): replace hardcoded budget limits with real spending metrics

Remove BUDGET_CONFIG, remove month/year params from endpoint, compute
spent/dailyAvg/projectedEnd/daysElapsed/daysLeft from actual transactions.
Fix 'generated/prisma' import path. Update frontend to display new data.
