// apps/backend/test/integration/fixtures/account.fixture.ts
import { PrismaClient, AccountType, Currency } from '@prisma/client';

interface CreateAccountParams {
  userId: string;
  name?: string;
  type?: AccountType;
  currency?: Currency;
  balance?: number;
}

export async function createTestAccount(
  prisma: PrismaClient,
  params: CreateAccountParams,
) {
  return prisma.account.create({
    data: {
      userId: params.userId,
      name: params.name ?? `account_${Date.now()}`,
      type: params.type ?? 'BANK',
      currency: params.currency ?? 'ARS',
      balance: params.balance ?? 0,
    },
  });
}
