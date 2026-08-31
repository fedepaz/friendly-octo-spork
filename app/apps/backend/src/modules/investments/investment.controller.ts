import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { InvestmentService, InvestmentDTO } from './investment.service';
import { CurrentUser } from '../auth/decorators/current-user.decorators';
import { AuthUser } from '../auth/types/auth-user.type';
import { RequirePermission } from '../permissions/decorators/require-permission.decorator';

@Controller('investments')
export class InvestmentController {
  constructor(private readonly investmentService: InvestmentService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @RequirePermission({ tableName: 'accounts', action: 'read' })
  async getInvestments(
    @CurrentUser() user: AuthUser,
  ): Promise<InvestmentDTO[]> {
    return this.investmentService.getInvestments(user.id);
  }
}
