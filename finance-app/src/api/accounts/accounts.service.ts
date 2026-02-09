// src/api/accounts/accounts.service.ts

import type { CreateAccountInput } from "./accounts.schema";
import { AccountRepository } from "../repositories/account.repository";

export class AccountsService {
  private accountRepository = new AccountRepository();
  async findAccounts(userId: string) {
    if (!userId) {
      throw new Error("User id is required");
    }
    const accounts = await this.accountRepository.getAccounts(userId);
    if (!accounts) {
      throw new Error("Accounts not found");
    }
    return accounts;
  }

  async findAccountById(accountId: number) {
    if (!accountId) {
      throw new Error("Account id is required");
    }
    const account = await this.accountRepository.getAccountById(accountId);

    if (!account) {
      throw new Error("Account not found");
    }

    return account;
  }

  async createAccount(userId: string, data: CreateAccountInput) {
    const account = await this.accountRepository.saveAccount({
      ...data,
      userId,
    });

    return account;
  }
}
