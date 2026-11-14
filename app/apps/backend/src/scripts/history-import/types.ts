// apps/backend/src/scripts/history-import/types.ts
// Shared normalized types for the history-import pipeline.

export type ImportTxType = 'EXPENSE' | 'INCOME' | 'TRANSFER';

export interface ParsedRow {
  sheet: string;
  /** Human label of the source table (e.g. 'GASTOS', 'GASTO DIARIO') */
  tableLabel: string;
  band: number;
  dateISO: string;
  dateInferred: boolean;
  amount: number;
  concept: string;
  type: ImportTxType;
}

export interface ParsedTable {
  sheet: string;
  label: string;
  band: number;
  kind: 'header' | 'label';
  typeMode: 'FIXED' | 'KEYWORD';
  fixedType: ImportTxType;
  rows: ParsedRow[];
  total: number | null;
}

export interface ParsedSnapshot {
  sheet: string;
  /** Raw cell label, e.g. 'saldoMP' */
  label: string;
  amount: number;
  /** End of the sheet's month — checkpoint date */
  dateISO: string;
}

export interface SheetMeta {
  name: string;
  /** 1-12 */
  month: number;
  year: number;
}

export type QuarantineReason = 'unparseable-amount';

export interface QuarantineEntry {
  sheet: string;
  row: number;
  col: number;
  cell: string;
  reason: QuarantineReason;
}

/** A date cell that could not be parsed — imported with an inferred date. */
export interface InferredDateEntry {
  sheet: string;
  row: number;
  col: number;
  cell: string;
}

export interface ParseResult {
  sheets: SheetMeta[];
  tables: ParsedTable[];
  snapshots: ParsedSnapshot[];
  quarantine: QuarantineEntry[];
  inferredDates: InferredDateEntry[];
}
