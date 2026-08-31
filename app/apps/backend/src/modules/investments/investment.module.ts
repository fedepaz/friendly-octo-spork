import { Module } from '@nestjs/common';
import { InvestmentController } from './investment.controller';
import { InvestmentService } from './investment.service';
import { InvestmentRepository } from './repositories/investment.repository';

@Module({
  controllers: [InvestmentController],
  providers: [InvestmentService, InvestmentRepository],
  exports: [InvestmentService],
})
export class InvestmentsModule {}
