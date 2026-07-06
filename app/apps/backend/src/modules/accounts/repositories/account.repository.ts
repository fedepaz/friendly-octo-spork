// backend/src/repositories/account.repository.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/prisma/prisma.service';
import { Prisma } from '@prisma/client';

export type AccountWithRelations = Prisma.AccountGetPayload<{
  include: {
    transactionsFrom: true;
    transactionsTo: true;
  };
}>;

@Injectable()
export class AccountRepository {
  constructor(private prisma: PrismaService) {}

  async getAccounts(userId: string): Promise<AccountWithRelations[]> {
    return this.prisma.account.findMany({
      where: {
        userId,
        deletedAt: null,
      },
      include: {
        transactionsFrom: true,
        transactionsTo: true,
      },
    });
  }

  async getAccountById(
    userId: string,
    id: string,
  ): Promise<AccountWithRelations | null> {
    return this.prisma.account.findFirst({
      where: {
        id,
        userId,
        deletedAt: null,
      },
      include: {
        transactionsFrom: true,
        transactionsTo: true,
      },
    });
  }

  async saveAccount(
    data: Prisma.AccountUncheckedCreateInput,
    tx?: Prisma.TransactionClient,
  ): Promise<AccountWithRelations> {
    const client = tx || this.prisma;
    return client.account.create({
      data,
      include: {
        transactionsFrom: true,
        transactionsTo: true,
      },
    });
  }

  async updateBalance(
    id: string,
    amount: Prisma.DecimalJsLike | number | string,
    operation: 'increment' | 'decrement',
    tx?: Prisma.TransactionClient,
  ): Promise<AccountWithRelations> {
    const client = tx || this.prisma;
    return client.account.update({
      where: { id },
      data: {
        balance: {
          [operation]: amount,
        },
      },
      include: {
        transactionsFrom: true,
        transactionsTo: true,
      },
    });
  }
}
