import { defineConfig } from "prisma/config";
import * as dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    seed: "bun prisma/seed.ts",
  },
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});
