// backend/src/modules/dashboard/repositories/accountDash.repository.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/prisma/prisma.service';
import { Account } from 'generated/prisma';

@Injectable()
export class AccountDashRepository {
  constructor(private prisma: PrismaService) {}

  /**
   * Returns the last `limit` accounts used by the user,
   * ordered by the most recent transaction date (source or target).
   */
  async getRecentAccounts(
    userId: string,
    limit: number = 3,
  ): Promise<Account[]> {
    // Raw SQL to get accounts with their latest transaction date
    const result = await this.prisma.$queryRaw<Account[]>`
      SELECT a.*
      FROM "Account" a
      LEFT JOIN (
        SELECT "sourceAccountId" as account_id, MAX(date) as last_date
        FROM "Transaction"
        WHERE "sourceAccountId" IS NOT NULL
        GROUP BY "sourceAccountId"
        UNION
        SELECT "targetAccountId" as account_id, MAX(date) as last_date
        FROM "Transaction"
        WHERE "targetAccountId" IS NOT NULL
        GROUP BY "targetAccountId"
      ) t ON t.account_id = a.id
      WHERE a."userId" = ${userId}
        AND a."deletedAt" IS NULL
      ORDER BY COALESCE(t.last_date, '1970-01-01'::timestamp) DESC
      LIMIT ${limit}
    `;

    return result;
  }
}
