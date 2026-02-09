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
  ): Promise<Account> {
    return prisma.account.create({
      data,
    });
  }
}
