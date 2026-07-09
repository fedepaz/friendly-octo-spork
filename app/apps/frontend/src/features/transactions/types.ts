import type { TransactionDTO, TransactionType } from '@repo/shared';

export type { TransactionDTO, TransactionType };

export interface TransactionFilter {
  month: number;
  year: number;
  type?: TransactionType;
}
