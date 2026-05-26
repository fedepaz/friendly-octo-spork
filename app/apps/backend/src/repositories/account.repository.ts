import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Account, Prisma } from '@prisma/client';

@Injectable()
export class AccountRepository {
  constructor(private prisma: PrismaService) {}

  async getAccounts(userId: string): Promise<Account[]> {
    return this.prisma.account.findMany({
      where: {
        userId,
        deletedAt: null,
      },
    });
  }

  async getAccountById(userId: string, id: string): Promise<Account | null> {
    return this.prisma.account.findFirst({
      where: {
        id,
        userId,
        deletedAt: null,
      },
    });
  }

  async saveAccount(
    data: Prisma.AccountUncheckedCreateInput,
    tx?: Prisma.TransactionClient,
  ): Promise<Account> {
    const client = tx || this.prisma;
    return client.account.create({
      data,
    });
  }

  async updateBalance(
    id: string,
    amount: number | Prisma.Decimal,
    operation: 'increment' | 'decrement',
    tx?: Prisma.TransactionClient,
  ): Promise<Account> {
    const client = tx || this.prisma;
    return client.account.update({
      where: { id },
      data: {
        balance: {
          [operation]: amount,
        },
      },
    });
  }
}
