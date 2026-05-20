// src/api/repositories/account.repository.ts

import type { Account, Prisma } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";

export class AccountRepository {
  // Get accounts
  async getAccounts(userId: string): Promise<Account[]> {
    return prisma.account.findMany({
      where: {
        userId,
      },
    });
  }

  // Get account by id
  async getAccountById(id: number): Promise<Account | null> {
    return prisma.account.findFirst({
      where: {
        id,
      },
    });
  }

  // Create account
  async saveAccount(
    data: Prisma.AccountUncheckedCreateInput,
    tx?: Prisma.TransactionClient,
  ): Promise<Account> {
    const client = tx || prisma;
    return client.account.create({
      data,
    });
  }

  // Update account balance
  async updateBalance(
    id: number,
    amount: Prisma.Decimal | number,
    operation: "increment" | "decrement",
    tx?: Prisma.TransactionClient,
  ): Promise<Account> {
    const client = tx || prisma;
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
