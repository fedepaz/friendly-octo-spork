import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { AccountRepository } from './repositories/account.repository';
import { CategoriesRepository } from './repositories/categories.repository';
import { RecurrenceRepository } from './repositories/recurrence.repository';
import { TransactionRepository } from './repositories/transaction.repository';
import { UserRepository } from './repositories/user.repository';

@Global()
@Module({
  providers: [
    PrismaService,
    AccountRepository,
    CategoriesRepository,
    RecurrenceRepository,
    TransactionRepository,
    UserRepository,
  ],
  exports: [
    PrismaService,
    AccountRepository,
    CategoriesRepository,
    RecurrenceRepository,
    TransactionRepository,
    UserRepository,
  ],
})
export class DatabaseModule {}
