// src/api/accounts/accounts.service.ts
import { prisma } from "../../lib/prisma";
import type { CreateAccountInput, UpdateAccountInput } from "./accounts.schema";

export class AccountsService {
  async getAccounts(userId: string) {
    return await prisma.account.findMany({
      where: { userId },
      orderBy: { name: "asc" },
    });
  }

  async getAccountById(userId: string, id: number) {
    return await prisma.account.findFirst({
      where: { id, userId },
    });
  }

  async createAccount(userId: string, data: CreateAccountInput) {
    return await prisma.account.create({
      data: {
        ...data,
        userId,
        balance: data.balance || 0,
      },
    });
  }

  async updateAccount(userId: string, id: number, data: UpdateAccountInput) {
    return await prisma.account.update({
      where: { id, userId },
      data,
    });
  }

  async deleteAccount(userId: string, id: number) {
    return await prisma.account.delete({
      where: { id, userId },
    });
  }
}
