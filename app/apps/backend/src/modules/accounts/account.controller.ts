// backend/src/modules/accounts/account.controller.ts

import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
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

@Controller('accounts')
export class AccountController {
  constructor(private readonly accountsService: AccountService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAccounts(@CurrentUser() user: AuthUser): Promise<AccountDTO[]> {
    return this.accountsService.getAccounts(user.id);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getAccountById(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.accountsService.getAccountById(user.id, id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async saveAccount(
    @CurrentUser() user: AuthUser,
    @Body(new ZodValidationPipe(createAccountSchema))
    accountData: CreateAccountInput,
  ): Promise<AccountDTO> {
    return this.accountsService.saveAccount(user.id, accountData);
  }
}
