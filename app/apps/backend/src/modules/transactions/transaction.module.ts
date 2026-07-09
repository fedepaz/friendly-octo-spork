// backend/src/modules/transactions/transaction.module.ts

import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { TransactionRepository } from './repositories/transaction.repository';
import { AccountsModule } from '../accounts/account.module';
import { PrismaModule } from '../../infra/prisma/prisma.module';
import { RecurrencesModule } from '../recurrences/recurrence.module';

@Module({
  imports: [AccountsModule, PrismaModule, RecurrencesModule],
  controllers: [TransactionController],
  providers: [TransactionService, TransactionRepository],
  exports: [TransactionService],
})
export class TransactionModule {}
