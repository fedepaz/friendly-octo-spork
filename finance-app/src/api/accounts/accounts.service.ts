// src/api/accounts/accounts.service.ts

import type { AccountDTO, CreateAccountInput } from "./accounts.schema";
import { AccountRepository } from "../repositories/account.repository";
import type { Prisma } from "@/generated/prisma";

export class AccountsService {
  private accountRepository = new AccountRepository();

  private mapToAccountDTO(
    account: Prisma.AccountGetPayload<object>,
  ): AccountDTO {
    return {
      ...account,
      balance: Number(account.balance), // Convert Prisma.Decimal to number
    };
  }

  async findAccounts(userId: string): Promise<AccountDTO[]> {
    if (!userId) {
      throw new Error("User id is required");
    }
    const accounts = await this.accountRepository.getAccounts(userId);
    if (!accounts) {
      throw new Error("Accounts not found");
    }
    return accounts.map((account) => this.mapToAccountDTO(account));
  }

  async findAccountById(accountId: string): Promise<AccountDTO> {
    if (!accountId) {
      throw new Error("Account id is required");
    }
    const account = await this.accountRepository.getAccountById(accountId);

    if (!account) {
      throw new Error("Account not found");
    }

    return this.mapToAccountDTO(account);
  }

  async createAccount(
    userId: string,
    data: CreateAccountInput,
  ): Promise<AccountDTO> {
    const account = await this.accountRepository.saveAccount({
      ...data,
      userId,
    });

    return this.mapToAccountDTO(account);
  }
}
