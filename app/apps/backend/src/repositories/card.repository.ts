// backend/src/repositories/card.repository.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../infra/prisma/prisma.service';
import { CardType, Prisma } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/client';

export type CardTransactionsWithRelations = Prisma.TransactionGetPayload<{
  include: {
    category: true;
    sourceAccount: true;
    targetAccount: true;
    recurrence: true;
  };
}>;
export type MonthlyStatementLine = {
  // Identification
  source_id: string;
  source_type: 'RECURRENCE' | 'TRANSACTION';

  // Core fields
  description: string;
  amount: Decimal;
  date: Date;
  installment_info: string | null;
  card_type: CardType | null;

  // Relations (flattened)
  category_id: string | null;
  category_name: string | null;
  category_color: string | null;

  source_account_id: string | null;
  source_account_name: string | null;
  target_account_id: string | null;
  target_account_name: string | null;

  // Running balance
  running_balance: Decimal;
};

@Injectable()
export class CardRepository {
  constructor(private prisma: PrismaService) {}

  async getCardTransactions(
    userId: string,
  ): Promise<CardTransactionsWithRelations[]> {
    return this.prisma.transaction.findMany({
      where: {
        userId,
      },
      include: {
        category: true,
        sourceAccount: true,
        targetAccount: true,
        recurrence: true,
      },
      orderBy: {
        date: 'desc',
      },
    });
  }

  async getCardTransactionByAccountId(
    userId: string,
    accountId: string,
  ): Promise<CardTransactionsWithRelations | null> {
    return this.prisma.transaction.findFirst({
      where: {
        userId,
        sourceAccountId: accountId,
      },
      include: {
        category: true,
        sourceAccount: true,
        targetAccount: true,
        recurrence: true,
      },
    });
  }

  async getCardTransactionByMonth(
    userId: string,
    month: number,
    year: number,
  ): Promise<CardTransactionsWithRelations[]> {
    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 0, 23, 59, 59);

    return this.prisma.transaction.findMany({
      where: {
        userId,
        date: {
          gte: start,
          lte: end,
        },
        isCardExpense: true,
      },
      include: {
        category: true,
        sourceAccount: true,
        targetAccount: true,
        recurrence: true,
      },
      orderBy: {
        date: 'desc',
      },
    });
  }
  // Investigations
  async getMonthlyStatement(
    userId: string,
    year: number,
    month: number,
  ): Promise<MonthlyStatementLine[]> {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59);

    return this.prisma.$queryRaw<MonthlyStatementLine[]>`
    WITH card_movements AS (
      -- 1. All card recurrences due this month (installment or recurring)
      SELECT
        r.id AS source_id,
        'RECURRENCE' AS source_type,
        r.name AS description,
        r.amount,
        r."nextDate" AS date,
        CASE 
          WHEN r.frequency = 'INSTALLMENT' 
          THEN CONCAT(r.current_part + 1, '/', r.total_parts)
          ELSE NULL
        END AS installment_info,
        r.card_type,
        c.id AS category_id,
        c.name AS category_name,
        c.color AS category_color,
        src.id AS source_account_id,
        src.name AS source_account_name,
        tgt.id AS target_account_id,
        tgt.name AS target_account_name
      FROM "Recurrence" r
      LEFT JOIN "Category" c ON c.id = r."categoryId"
      LEFT JOIN "Account" src ON src.id = r."sourceAccountId"
      LEFT JOIN "Account" tgt ON tgt.id = r."targetAccountId"
      WHERE r."userId" = ${userId}
        AND r."isCardExpense" = true
        AND r.active = true
        AND r."nextDate" BETWEEN ${startDate} AND ${endDate}
        AND (r."endDate" IS NULL OR r."endDate" >= ${startDate})

      UNION ALL

      -- 2. One‑time card expenses (no recurrence)
      SELECT
        t.id,
        'TRANSACTION' AS source_type,
        COALESCE(t.description, 'Card charge') AS description,
        t.amount,
        t.date,
        NULL AS installment_info,
        t.card_type,
        c.id AS category_id,
        c.name AS category_name,
        c.color AS category_color,
        src.id AS source_account_id,
        src.name AS source_account_name,
        tgt.id AS target_account_id,
        tgt.name AS target_account_name
      FROM "Transaction" t
      LEFT JOIN "Category" c ON c.id = t."categoryId"
      LEFT JOIN "Account" src ON src.id = t."sourceAccountId"
      LEFT JOIN "Account" tgt ON tgt.id = t."targetAccountId"
      WHERE t."userId" = ${userId}
        AND t."isCardExpense" = true
        AND t.recurrenceId IS NULL
        AND t.date BETWEEN ${startDate} AND ${endDate}

      UNION ALL

      -- 3. Payments into any card account (transfers where target is a CARD account)
      SELECT
        t.id,
        'TRANSACTION' AS source_type,
        CONCAT('Payment to ', a.name) AS description,
        -t.amount AS amount,
        t.date,
        NULL AS installment_info,
        NULL AS card_type,
        NULL AS category_id,
        NULL AS category_name,
        NULL AS category_color,
        NULL AS source_account_id,
        NULL AS source_account_name,
        t.target_account_id AS target_account_id,
        a.name AS target_account_name
      FROM "Transaction" t
      JOIN "Account" a ON a.id = t.target_account_id
      WHERE t."userId" = ${userId}
        AND t.type = 'TRANSFER'
        AND a.type = 'CARD'
        AND t.date BETWEEN ${startDate} AND ${endDate}
    )
    SELECT
      source_id,
      source_type,
      description,
      amount,
      date,
      installment_info,
      card_type,
      category_id,
      category_name,
      category_color,
      source_account_id,
      source_account_name,
      target_account_id,
      target_account_name,
      SUM(amount) OVER (ORDER BY date, source_id) AS running_balance
    FROM card_movements
    ORDER BY date, source_id
  `;
  }
}
