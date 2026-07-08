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
import { RequirePermission } from '../permissions/decorators/require-permission.decorator';

@Controller('accounts')
export class AccountController {
  constructor(private readonly accountsService: AccountService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @RequirePermission({ tableName: 'accounts', action: 'read' })
  async getAccounts(@CurrentUser() user: AuthUser): Promise<AccountDTO[]> {
    return this.accountsService.getAccounts(user.id);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @RequirePermission({ tableName: 'accounts', action: 'read' })
  async getAccountById(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string,
  ): Promise<AccountDTO | null> {
    return this.accountsService.getAccountById(user.id, id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @RequirePermission({ tableName: 'accounts', action: 'create' })
  async saveAccount(
    @CurrentUser() user: AuthUser,
    @Body(new ZodValidationPipe(createAccountSchema))
    accountData: CreateAccountInput,
  ): Promise<AccountDTO> {
    return this.accountsService.saveAccount(user.id, accountData);
  }
}
