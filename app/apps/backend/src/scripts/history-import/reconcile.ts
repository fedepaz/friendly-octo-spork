// apps/backend/src/scripts/history-import/reconcile.ts
// Stage 4: computed account balances vs the sheet's balance snapshots.
import { effectsForRow } from './accounts';
import type { ParsedRow, ParsedSnapshot } from './types';

export type CheckpointSeverity = 'fail' | 'info';

export interface Checkpoint {
  sheet: string;
  label: string;
  dateISO: string;
  accountName: string | null;
  expected: number;
  computed: number | null;
  diff: number | null;
  ok: boolean;
  severity: CheckpointSeverity;
}

export interface ReconcileReport {
  checks: Checkpoint[];
  passed: number;
  failed: number;
  infoCount: number;
  ok: boolean;
}

export interface ReconcileOptions {
  snapshots: ParsedSnapshot[];
  rows: ParsedRow[];
  tolerance?: number;
}

/** Snapshot cell labels → import account names. */
export const SNAPSHOT_ACCOUNTS: Record<string, string> = {
  saldomp: 'Mercado Pago',
  saldobanco: 'Banco',
  efectivo: 'Efectivo',
  tarjeta: 'Visa',
};

const DEFAULT_TOLERANCE = 0.01;

export function reconcile(options: ReconcileOptions): ReconcileReport {
  const tolerance = options.tolerance ?? DEFAULT_TOLERANCE;

  const checks: Checkpoint[] = options.snapshots.map((s) => {
    const accountName = SNAPSHOT_ACCOUNTS[s.label] ?? null;
    // EVERY snapshot is informational: the ledger records spends but not the
    // funding flows between accounts (cash top-ups, bank → wallet sweeps,
    // card sweeps), so account balances are not reconstructable from rows
    // alone. Checkpoints are shown for reference; table checksums are the
    // fidelity oracle.
    const severity: CheckpointSeverity = 'info';

    let computed: number | null = null;
    if (accountName !== null) {
      computed = 0;
      for (const row of options.rows) {
        if (row.dateISO > s.dateISO) continue; // ISO dates compare lexicographically
        for (const eff of effectsForRow(row)) {
          if (eff.account === accountName) computed += eff.delta;
        }
      }
    }

    const diff = computed === null ? null : computed - s.amount;
    const ok = diff !== null && Math.abs(diff) <= tolerance;

    return {
      sheet: s.sheet,
      label: s.label,
      dateISO: s.dateISO,
      accountName,
      expected: s.amount,
      computed,
      diff,
      ok,
      severity,
    };
  });

  const failed = checks.filter((c) => c.severity === 'fail' && !c.ok).length;
  const passed = checks.filter((c) => c.severity === 'fail' && c.ok).length;
  const infoCount = checks.filter((c) => c.severity === 'info').length;

  return {
    checks,
    passed,
    failed,
    infoCount,
    ok: failed === 0,
  };
}
