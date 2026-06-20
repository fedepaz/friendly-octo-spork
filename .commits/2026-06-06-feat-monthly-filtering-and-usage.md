feat: monthly transaction filtering and category usage enrichment

Implements backend support for monthly transaction filtering and standardizes category
retrieval by merging usage data. This supports the "start of month/end of month" 
financial workflow and simplifies frontend data fetching.

Backend:
- Add GET /transactions/month/:month/:year endpoint.
- Merge getCategoriesWithUsage into default getCategories in CategoriesController.
- Clean up redundant 'usage' endpoint.
- Refine exception filtering logic.

Frontend:
- Add MonthSelector component for monthly navigation.
- Update transactionService with fetchByMonth.

Docs:
- Register MonthSelector in components-list.md.
- Update api_implementation_guide.md with consolidation patterns.
