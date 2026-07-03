// apps/backend/test/integration/helpers/db.helper.ts
import { PrismaClient } from '@prisma/client';

export async function cleanDatabase(prisma: PrismaClient): Promise<void> {
  // Order matters due to foreign keys
  await prisma.$executeRaw`TRUNCATE TABLE "Transaction" CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Recurrence" CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Account" CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Category" CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "User" CASCADE`;
}
