feat: Implement category review and consolidation workflow

Introduces `create-reviewed-chunks.ts` to generate corrected versions of category mappings based on user review.

Updates `apply-consolidation.ts` to dynamically load the complete, corrected set of mapping files and adds 5 new master categories (Income, Education, Pets, Professional Services, Taxes & Fees) with their associated colors.

The new workflow enables a systematic review and application of category mappings, ensuring data consistency before the final database migration.
