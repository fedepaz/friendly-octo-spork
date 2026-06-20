refactor: implement high-precision Decimal handling and account activity feed

- Established 'Penny-Perfect' precision: Migrated all monetary fields to Decimal(19, 4).
- Implemented 'String Wire' pattern: Money is transmitted as strings via API to prevent floating-point errors.
- Enriched AccountDTO: Added transactionsFrom/To relations for pre-loaded activity data.
- Enhanced Account View: Implemented a high-density 'Recent Activity' feed with visual inflow/outflow cues.
- Resolved Circular Dependencies: Refactored shared schemas using manual interfaces and z.lazy().
- Backend Improvements: Refactored Account/Transaction/Recurrence services to use string-based mapping.
- Documentation: Updated the API Implementation Guide with new high-precision standards.
- UI: Added styles for PAYMENT transaction type and updated formatCurrency utility.