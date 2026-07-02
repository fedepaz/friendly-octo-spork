// apps/backend/test/integration/fixtures/transaction.fixture.ts
import { PrismaClient, TransactionType } from '@prisma/client';

interface CreateTransactionParams {
  userId: string;
  type?: TransactionType;
  amount?: number;
  date?: Date;
  description?: string;
  sourceAccountId?: string;
  targetAccountId?: string;
  categoryId?: string;
}

export async function createTestTransaction(
  prisma: PrismaClient,
  params: CreateTransactionParams,
) {
  return prisma.transaction.create({
    data: {
      userId: params.userId,
      type: params.type ?? 'EXPENSE',
      amount: params.amount ?? 1000,
      date: params.date ?? new Date(),
      description: params.description ?? `Transaction ${Date.now()}`,
      sourceAccountId: params.sourceAccountId,
      targetAccountId: params.targetAccountId,
      categoryId: params.categoryId,
    },
  });
}
