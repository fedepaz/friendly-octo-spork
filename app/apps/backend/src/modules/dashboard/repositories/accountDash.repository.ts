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
  async getRecentAccounts(userId: string): Promise<Account[]> {
    const limit = 3;
    // Raw SQL to get accounts with their latest transaction date
    const result = await this.prisma.$queryRaw<Account[]>`
       SELECT a.*
    FROM "Account" a
    LEFT JOIN (
      SELECT account_id, MAX(last_date) as last_date
      FROM (
        SELECT "sourceAccountId" as account_id, MAX(date) as last_date
        FROM "Transaction"
        WHERE "sourceAccountId" IS NOT NULL
          AND "userId" = ${userId}
        GROUP BY "sourceAccountId"
        UNION ALL
        SELECT "targetAccountId" as account_id, MAX(date) as last_date
        FROM "Transaction"
        WHERE "targetAccountId" IS NOT NULL
          AND "userId" = ${userId}
        GROUP BY "targetAccountId"
      ) AS combined
      GROUP BY account_id
    ) t ON t.account_id = a.id
    WHERE a."userId" = ${userId}
      AND a."deletedAt" IS NULL
    ORDER BY COALESCE(t.last_date, '1970-01-01'::timestamp) DESC
    LIMIT ${limit}
  `;
    return result;
  }
}
