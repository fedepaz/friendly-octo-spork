refactor: implement robust error mapping and minimalist UX patterns

Implements a standardized error handling architecture across the monorepo 
and refines the transaction creation flow with automated UX patterns.

- Implemented global `AllExceptionsFilter` in NestJS with Pino logging.
- Standardized `ZodValidationPipe` to return full flattened error details.
- Introduced `mapServerErrorsToForm` utility for server-to-client field sync.
- Automated Transaction Date handling in UI to reduce user friction.
- Refactored `SmartFormProvider` to surgically map backend validation errors.
- Removed redundant toast notifications in favor of centralized feedback.
- Updated `SMART_FORM_TUTORIAL.md` with the new error mapping standard.
