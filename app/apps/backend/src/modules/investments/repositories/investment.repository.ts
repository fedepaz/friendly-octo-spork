import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/prisma/prisma.service';
import { Prisma } from '@prisma/client';

export type InvestmentAccountRow = {
  id: string;
  name: string;
  currency: string;
  principal: Prisma.Decimal;
  totalEarned: Prisma.Decimal | null;
  transactionCount: bigint;
};

@Injectable()
export class InvestmentRepository {
  constructor(private prisma: PrismaService) {}

  async getInvestmentAccounts(userId: string): Promise<InvestmentAccountRow[]> {
    // #65: principal must EXCLUDE returns credited to the account (the
    // balance already includes them), and returns are attributed on
    // either side — the wizard's reinvest path credits targetAccountId
    // (source is never set), cash-out returns originate from
    // sourceAccountId. Grouping by source alone left earned/count at 0
    // for reinvested returns.
    return this.prisma.$queryRaw<InvestmentAccountRow[]>`
      SELECT
        a.id,
        a.name,
        a.currency,
        (a.balance - COALESCE(earn.credited, 0)) AS principal,
        COALESCE(earn.total_earned, 0) AS "totalEarned",
        COALESCE(earn.tx_count, 0) AS "transactionCount"
      FROM "Account" a
      LEFT JOIN LATERAL (
        SELECT
          SUM(t.amount) AS total_earned,
          COUNT(*) AS tx_count,
          SUM(t.amount) FILTER (
            WHERE t."targetAccountId" = a.id
          ) AS credited
        FROM "Transaction" t
        WHERE t.type = 'RETURN'
          AND (
            t."targetAccountId" = a.id
            OR t."sourceAccountId" = a.id
          )
      ) earn ON true
      WHERE a.type = 'INVESTMENT'
        AND a."userId" = ${userId}
        AND a."deletedAt" IS NULL
      ORDER BY a.name ASC
    `;
  }
}
