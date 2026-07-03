// apps/backend/test/integration/setup.ts
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

let prisma: PrismaClient;

beforeAll(() => {
  const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
  });
  prisma = new PrismaClient({ adapter });
});

afterAll(async () => {
  if (prisma) {
    await prisma.$disconnect();
  }
});

export { prisma };
