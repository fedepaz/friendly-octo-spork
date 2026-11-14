// apps/backend/src/scripts/history-import/__tests__/reconcile.spec.ts
import { reconcile } from '../reconcile';
import type { ParsedRow, ParsedSnapshot } from '../types';

function row(partial: Partial<ParsedRow> & { amount: number }): ParsedRow {
  return {
    sheet: 'mayo2025',
    tableLabel: 'GASTOS',
    band: 0,
    dateISO: '2025-05-10',
    dateInferred: false,
    concept: 'x',
    type: 'EXPENSE',
    ...partial,
  };
}

function snapshot(
  label: string,
  amount: number,
  dateISO = '2025-05-31',
): ParsedSnapshot {
  return { sheet: 'mayo2025', label, amount, dateISO };
}

describe('reconcile: snapshot checkpoints', () => {
  it('computes the account balance at the snapshot date and passes when it matches', () => {
    const report = reconcile({
      snapshots: [snapshot('efectivo', -1000)],
      rows: [row({ amount: 1000, dateISO: '2025-05-10' })],
    });

    expect(report.checks).toHaveLength(1);
    expect(report.checks[0]).toMatchObject({
      label: 'efectivo',
      accountName: 'Efectivo',
      expected: -1000,
      computed: -1000,
      diff: 0,
      ok: true,
      severity: 'info',
    });
    expect(report.ok).toBe(true);
  });

  it('shows snapshot divergence without failing (funding flows absent)', () => {
    const report = reconcile({
      snapshots: [snapshot('saldobanco', 999999)],
      rows: [
        row({
          amount: 500000,
          type: 'INCOME',
          tableLabel: 'INGRESOS',
          dateISO: '2025-05-01',
        }),
      ],
    });

    expect(report.checks[0]).toMatchObject({
      accountName: 'Banco',
      expected: 999999,
      computed: 500000,
      ok: false,
      severity: 'info',
    });
    expect(report.failed).toBe(0);
    expect(report.ok).toBe(true);
  });

  it('only counts rows dated on or before the snapshot date', () => {
    const report = reconcile({
      snapshots: [snapshot('efectivo', -1000)],
      rows: [
        row({ amount: 1000, dateISO: '2025-05-10' }),
        row({ amount: 999, dateISO: '2025-06-10' }),
      ],
    });

    expect(report.checks[0].computed).toBe(-1000);
    expect(report.ok).toBe(true);
  });

  it('treats card snapshots as informational (cards do not track balances)', () => {
    const report = reconcile({
      snapshots: [snapshot('tarjeta', 30000)],
      rows: [
        row({
          amount: 15299,
          tableLabel: 'GASTOS TARJETA',
          dateISO: '2025-05-04',
        }),
      ],
    });

    expect(report.checks[0]).toMatchObject({
      accountName: 'Visa',
      severity: 'info',
      computed: 0, // CARD source expenses never move the balance
      expected: 30000,
      ok: false,
    });
    expect(report.failed).toBe(0);
    expect(report.ok).toBe(true); // info mismatches never fail the report
  });

  it('marks snapshots without a known account as informational', () => {
    const report = reconcile({
      snapshots: [snapshot('mesanterior', 410587.2)],
      rows: [],
    });

    expect(report.checks[0]).toMatchObject({
      accountName: null,
      severity: 'info',
      computed: null,
    });
    expect(report.ok).toBe(true);
  });

  it('marks every checkpoint informational (report-only)', () => {
    const report = reconcile({
      snapshots: [
        snapshot('efectivo', -1000),
        snapshot('saldobanco', 500000),
        snapshot('saldomp', 7119.3),
      ],
      rows: [
        row({ amount: 1000, dateISO: '2025-05-10' }),
        row({
          amount: 500000,
          type: 'INCOME',
          tableLabel: 'INGRESOS',
          dateISO: '2025-05-01',
        }),
        // saldomp has no transactions → computed 0 ≠ 7119.3
      ],
    });

    expect(report.passed).toBe(0);
    expect(report.failed).toBe(0);
    expect(report.infoCount).toBe(3);
    expect(report.checks.map((c) => c.ok)).toEqual([true, true, false]);
    expect(report.ok).toBe(true);
  });

  it('tolerates float noise within 0.01', () => {
    const report = reconcile({
      snapshots: [snapshot('efectivo', -1000.004)],
      rows: [row({ amount: 1000, dateISO: '2025-05-10' })],
    });

    expect(report.checks[0].ok).toBe(true);
    expect(report.ok).toBe(true);
  });
});
