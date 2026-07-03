// apps/backend/test/integration/fixtures/category.fixture.ts
import { PrismaClient } from '@prisma/client';

interface CreateCategoryParams {
  userId: string;
  name?: string;
  color?: string;
}

export async function createTestCategory(
  prisma: PrismaClient,
  params: CreateCategoryParams,
) {
  return prisma.category.create({
    data: {
      userId: params.userId,
      name: params.name ?? `category_${Date.now()}`,
      color: params.color ?? '#FF5733',
    },
  });
}
