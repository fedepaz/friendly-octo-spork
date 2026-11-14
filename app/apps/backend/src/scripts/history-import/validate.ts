// apps/backend/src/scripts/history-import/validate.ts
// Stage 2: per-table checksums against sheet TOTALs + quarantine rate gate.
import type { ParseResult } from './types';

export interface TableCheck {
  sheet: string;
  label: string;
  band: number;
  rowSum: number;
  total: number;
  diff: number;
  ok: boolean;
}

export interface ValidationReport {
  checks: TableCheck[];
  failedChecks: TableCheck[];
  importedRows: number;
  quarantinedRows: number;
  /** Rows imported with an inferred date (reported, never gating) */
  inferredDates: number;
  quarantineRate: number;
  /** Gate per spec §6: quarantine rate only — checksums are report-only */
  ok: boolean;
}

export interface ValidateOptions {
  maxQuarantineRate?: number;
  tolerance?: number;
}

const DEFAULTS = {
  maxQuarantineRate: 0.05,
  tolerance: 0.01,
};

export function validateParse(
  result: ParseResult,
  options?: ValidateOptions,
): ValidationReport {
  const maxQuarantineRate =
    options?.maxQuarantineRate ?? DEFAULTS.maxQuarantineRate;
  const tolerance = options?.tolerance ?? DEFAULTS.tolerance;

  const checks: TableCheck[] = [];
  let importedRows = 0;

  for (const table of result.tables) {
    importedRows += table.rows.length;
    // Phantom total-only tables (no parsed rows) carry no signal
    if (table.total === null || table.rows.length === 0) continue;
    const rowSum = table.rows.reduce((acc, r) => acc + r.amount, 0);
    const diff = rowSum - table.total;
    checks.push({
      sheet: table.sheet,
      label: table.label,
      band: table.band,
      rowSum,
      total: table.total,
      diff,
      ok: Math.abs(diff) <= tolerance,
    });
  }

  const failedChecks = checks.filter((c) => !c.ok);
  const quarantinedRows = result.quarantine.length;
  const denominator = importedRows + quarantinedRows;
  const quarantineRate = denominator === 0 ? 0 : quarantinedRows / denominator;

  return {
    checks,
    failedChecks,
    importedRows,
    quarantinedRows,
    inferredDates: result.inferredDates.length,
    quarantineRate,
    ok: quarantineRate <= maxQuarantineRate,
  };
}
