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
    return this.accountsRepo.getAccounts(userId);
  }

  async getAccountById(userId: string, id: string): Promise<AccountDTO | null> {
    if (!userId) throw new BadRequestException('User id is required');
    this.logger.log(`Getting account ${id} for user ${userId}`);
    return this.accountsRepo.getAccountById(userId, id);
  }

  async saveAccount(
    userId: string,
    accountData: CreateAccountInput,
  ): Promise<AccountDTO> {
    if (!userId) throw new BadRequestException('User id is required');
    this.logger.log(`Saving account ${accountData.name} for user ${userId}`);
    return this.accountsRepo.saveAccount({
      userId,
      ...accountData,
    });
  }
}
