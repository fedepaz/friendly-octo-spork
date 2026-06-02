// backend/src/modules/accounts/account.service.ts

import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import {
  AccountRepository,
  AccountWithRelations,
} from '../../repositories/account.repository';
import { AccountDTO, CreateAccountInput } from '@repo/shared';

@Injectable()
export class AccountService {
  private readonly logger = new Logger(AccountService.name);

  constructor(private readonly accountsRepo: AccountRepository) {}

  private mapToDTO(account: AccountWithRelations): AccountDTO {
    return {
      ...account,
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

  async getAccounts(userId: string): Promise<AccountDTO[]> {
    if (!userId) throw new BadRequestException('User id is required');
    this.logger.log(`Getting accounts for user ${userId}`);
    const accounts = await this.accountsRepo.getAccounts(userId);
    return accounts.map((account) => this.mapToDTO(account));
  }

  async getAccountById(userId: string, id: string): Promise<AccountDTO | null> {
    if (!userId) throw new BadRequestException('User id is required');
    this.logger.log(`Getting account ${id} for user ${userId}`);
    const account = await this.accountsRepo.getAccountById(userId, id);
    return account ? this.mapToDTO(account) : null;
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
    return this.mapToDTO(account);
  }
}
