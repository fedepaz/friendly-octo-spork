// backend/src/modules/card/card.module.ts

import { Module } from '@nestjs/common';
import { CardController } from './card.controller';
import { CardService } from './card.service';
import { CardRepository } from './repositories/card.repository';
import { AccountsModule } from '../accounts/account.module';
import { TransactionModule } from '../transactions/transaction.module';
import { PrismaModule } from '../../infra/prisma/prisma.module';

@Module({
  imports: [PrismaModule, TransactionModule, AccountsModule],
  controllers: [CardController],
  providers: [CardService, CardRepository],
  exports: [CardService, CardRepository],
})
export class CardModule {}
