// apps/backend/src/scripts/history-import/columnMaps.ts
// Static knowledge about the ledger layout: section labels → table types,
// metric/snapshot labels, excluded metric bands, and band fallbacks.
import type { ImportTxType } from './types';

/** Section labels that identify a mini-table and how rows are typed. */
export const KNOWN_TABLE_TYPES: Record<string, ImportTxType | 'KEYWORD'> = {
  gastos: 'EXPENSE',
  pagos: 'EXPENSE',
  ingresos: 'INCOME',
  'gastos tarjeta': 'EXPENSE',
  'gastos tarjeta exc': 'EXPENSE',
  'gastos extras': 'EXPENSE',
  'gasto diario': 'EXPENSE',
  gastostarjetavisa: 'EXPENSE',
  transferencias: 'KEYWORD',
};

/** Balance cells used as reconciliation oracles (never imported). */
export const SNAPSHOT_LABELS = new Set([
  'saldomp',
  'saldobanco',
  'efectivo',
  'tarjeta',
  'mesanterior',
  'mesqueviene',
]);

/** Column bands that hold pure metrics (daily exchange/interest grids). */
export const EXCLUDED_BANDS = new Set([17]);

export function normalizeLabel(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');
}

/** Type used when a table has no recognizable section label. */
export function fallbackTypeForBand(band: number): ImportTxType {
  return band === 10 ? 'INCOME' : 'EXPENSE';
}

/**
 * Date cells that are section markers, month headers or footnotes rather
 * than dates — their rows are skipped silently.
 */
export const SECTION_DATE_MARKERS = new Set([
  'diario',
  'enero',
  'febrero',
  'marzo',
  'abril',
  'mayo',
  'junio',
  'julio',
  'agosto',
  'septiembre',
  'setiembre',
  'octubre',
  'noviembre',
  'diciembre',
]);
