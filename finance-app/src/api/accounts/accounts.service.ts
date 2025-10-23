// src/api/accounts/accounts.service.ts

import type { Prisma } from "@/generated/prisma";
import { prisma } from "../../lib/prisma";
import type { CreateAccountInput, AccountFilterInput } from "./accounts.schema";

export class AccountsService {
  async getAccounts(userId: string, filters?: AccountFilterInput) {
    const where: Prisma.AccountWhereInput = {
      userId,
      ...(filters?.type && { type: filters.type }),
      ...(filters?.currency && { currency: filters.currency }),
    };

    const accounts = await prisma.account.findMany({
      where,
    });

    return accounts;
  }

  async createAccount(userId: string, data: CreateAccountInput) {
    const account = await prisma.account.create({
      data: {
        userId,
        name: data.name,
        type: data.type,
        currency: data.currency,
        balance: data.balance,
      },
    });

    return account;
  }
}
