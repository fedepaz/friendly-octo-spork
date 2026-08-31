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
    return this.prisma.$queryRaw<InvestmentAccountRow[]>`
      SELECT
        a.id,
        a.name,
        a.currency,
        a.balance AS principal,
        COALESCE(r.total_earned, 0) AS "totalEarned",
        COALESCE(r.tx_count, 0) AS "transactionCount"
      FROM "Account" a
      LEFT JOIN (
        SELECT
          "sourceAccountId" AS id,
          SUM(amount) AS total_earned,
          COUNT(*) AS tx_count
        FROM "Transaction"
        WHERE type = 'RETURN'
        GROUP BY "sourceAccountId"
      ) r ON r.id = a.id
      WHERE a.type = 'INVESTMENT'
        AND a."userId" = ${userId}
        AND a."deletedAt" IS NULL
      ORDER BY a.name ASC
    `;
  }
}
