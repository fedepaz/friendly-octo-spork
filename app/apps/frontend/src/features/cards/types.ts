import type { CardStatementDTO, CardType, TransactionDTO, RecurrenceDTO } from '@repo/shared';

export type { CardStatementDTO, CardType, TransactionDTO, RecurrenceDTO };

export type CardCloseStatus = 'open' | 'closed';

export interface CardStatement {
  recurrences: RecurrenceDTO[];
  oneTimers: TransactionDTO[];
  payments: TransactionDTO[];
  summary: {
    totalRecurrences: string;
    totalOneTimers: string;
    totalPayments: string;
    balance: string;
  };
}
