feat: Generate category mapping files and update Prisma schema

Generated category mapping JSON files in `docs/guides/categoryMigration/` based on the provided guide.
These files map over 1200 old categories to 20 master categories, chunked into 100 categories per file.

Also, updated the Prisma `Category` model to make the `type` field optional to accommodate categories that may not fit into predefined types. This change is reflected in `schema.prisma` and the generated Prisma client files.
