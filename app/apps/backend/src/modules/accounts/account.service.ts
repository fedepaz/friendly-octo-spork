// backend/src/modules/accounts/account.service.ts

import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { AccountRepository } from '../../repositories/account.repository';
import { AccountDTO, CreateAccountInput } from '@repo/shared';

@Injectable()
export class AccountService {
  private readonly logger = new Logger(AccountService.name);

  constructor(private readonly accountsRepo: AccountRepository) {}

  async getAccounts(userId: string): Promise<AccountDTO[]> {
    if (!userId) throw new BadRequestException('User id is required');
    this.logger.log(`Getting accounts for user ${userId}`);
    const accounts = await this.accountsRepo.getAccounts(userId);
    return accounts.map((account) => ({
      id: account.id,
      userId: account.userId,
      name: account.name,
      type: account.type,
      currency: account.currency,
      balance: account.balance.toString(),
    }));
  }

  async getAccountById(userId: string, id: string): Promise<AccountDTO | null> {
    if (!userId) throw new BadRequestException('User id is required');
    this.logger.log(`Getting account ${id} for user ${userId}`);
    const account = await this.accountsRepo.getAccountById(userId, id);
    if (!account) return null;
    return {
      id: account.id,
      userId: account.userId,
      name: account.name,
      type: account.type,
      currency: account.currency,
      balance: account.balance.toString(),
      transactionsFrom: account.transactionsFrom?.map((tx) => ({
        ...tx,
        amount: tx.amount.toString(),
      })),
      transactionsTo: account.transactionsTo?.map((tx) => ({
        ...tx,
        amount: tx.amount.toString(),
      })),
    };
  }

  async saveAccount(
    userId: string,
    accountData: CreateAccountInput,
  ): Promise<AccountDTO> {
    if (!userId) throw new BadRequestException('User id is required');
    this.logger.log(`Saving account ${accountData.name} for user ${userId}`);
    const account = await this.accountsRepo.saveAccount({
      userId,
      ...accountData,
    });
    return {
      id: account.id,
      userId: account.userId,
      name: account.name,
      type: account.type,
      currency: account.currency,
      balance: account.balance.toString(),
      transactionsFrom: account.transactionsFrom?.map((tx) => ({
        ...tx,
        amount: tx.amount.toString(),
      })),
      transactionsTo: account.transactionsTo?.map((tx) => ({
        ...tx,
        amount: tx.amount.toString(),
      })),
    };
  }
}
