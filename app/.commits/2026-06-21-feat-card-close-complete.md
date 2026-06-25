feat(card): complete card close endpoint, API, and wizard wiring

Add POST /cards/close endpoint with Zod validation, frontend API
service, useUpdateCardBalance mutation hook with query invalidations,
and wire SmartFormProviderCard to CardCloseInputDTO.
