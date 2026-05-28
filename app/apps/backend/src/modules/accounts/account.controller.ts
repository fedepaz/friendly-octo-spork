// backend/src/modules/accounts/account.controller.ts

import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Param,
  Post,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { CurrentUser } from '../auth/decorators/current-user.decorators';
import {
  AccountDTO,
  CreateAccountInput,
  createAccountSchema,
} from '@repo/shared';
import { AuthUser } from '../auth/types/auth-user.type';
import { ZodValidationPipe } from '../../shared/pipes/zod-validation-pipe';
import { Public } from '../../shared/decorators/public.decorator';

@Controller('accounts')
export class AccountController {
  private readonly logger = new Logger(AccountController.name);
  constructor(private readonly accountsService: AccountService) {}

  @Get()
  @Public()
  @HttpCode(HttpStatus.OK)
  async getAccounts(@CurrentUser() user: AuthUser): Promise<AccountDTO[]> {
    const accounts = await this.accountsService.getAccounts(user.id);
    this.logger.log(`Getting accounts for user ${user.id}`);
    return accounts;
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getAccountById(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    const account = await this.accountsService.getAccountById(user.id, id);
    this.logger.log(`Getting account ${id} for user ${user.id}`);
    return account;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async saveAccount(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string,
    @Body(new ZodValidationPipe(createAccountSchema))
    accountData: CreateAccountInput,
  ): Promise<AccountDTO> {
    const account = await this.accountsService.saveAccount(
      user.id,
      accountData,
    );
    this.logger.log(`Saving account ${id} for user ${user.id}`);
    return account;
  }
}
