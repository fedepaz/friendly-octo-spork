// backend/prisma.config.ts

import { defineConfig } from 'prisma/config';
import 'dotenv/config';

const databaseDev = process.env.DATABASE_URL;

export default defineConfig({
  schema: 'prisma/',
  migrations: {
    path: 'prisma/migrations',
    seed: 'npx tsx prisma/seed.ts',
  },
  datasource: {
    url: databaseDev,
  },
});
