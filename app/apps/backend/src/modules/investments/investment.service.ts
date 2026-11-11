import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InvestmentRepository } from './repositories/investment.repository';
import { Currency } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/client';

export interface InvestmentDTO {
  id: string;
  name: string;
  currency: Currency;
  principal: string;
  totalEarned: string;
  totalValue: string;
  transactionCount: number;
}

@Injectable()
export class InvestmentService {
  private readonly logger = new Logger(InvestmentService.name);

  constructor(private readonly investmentRepo: InvestmentRepository) {}

  async getInvestments(userId: string): Promise<InvestmentDTO[]> {
    if (!userId) throw new BadRequestException('User id is required');
    this.logger.log(`Getting investments for user ${userId}`);

    const rows = await this.investmentRepo.getInvestmentAccounts(userId);

    return rows.map((row) => {
      const principal = row.principal;
      const totalEarned = row.totalEarned ?? new Decimal(0);
      const totalValue = principal.plus(totalEarned);

      return {
        id: row.id,
        name: row.name,
        currency: row.currency as Currency,
        principal: principal.toString(),
        totalEarned: totalEarned.toString(),
        totalValue: totalValue.toString(),
        transactionCount: Number(row.transactionCount),
      };
    });
  }
}
