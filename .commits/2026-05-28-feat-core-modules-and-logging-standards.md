feat(backend): implement core modules and standardize logging patterns

- Implement Categories, Recurrences, and Transactions modules (Controller/Service).
- Enforce new logging standard: manual logs moved from Controllers to Services.
- Update shared Zod schemas for flexible metadata handling using z.unknown().
- Update backend_agent_finance.md with codified logging and observability rules.
- Clean up AccountController and ensure global auth guard protection.