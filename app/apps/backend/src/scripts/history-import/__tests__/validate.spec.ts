// apps/backend/src/scripts/history-import/__tests__/validate.spec.ts
import { validateParse } from '../validate';
import type { ParsedTable, ParseResult } from '../types';

function makeTable(
  total: number | null,
  amounts: number[],
  label = 'GASTOS',
  band = 0,
): ParsedTable {
  return {
    sheet: 'mayo2025',
    label,
    band,
    kind: 'header',
    typeMode: 'FIXED',
    fixedType: 'EXPENSE',
    total,
    rows: amounts.map((amount, i) => ({
      sheet: 'mayo2025',
      tableLabel: label,
      band,
      dateISO: `2025-05-${String(i + 1).padStart(2, '0')}`,
      dateInferred: false,
      amount,
      concept: `c${i}`,
      type: 'EXPENSE' as const,
    })),
  };
}

function makeResult(tables: ParsedTable[], quarantineCount = 0): ParseResult {
  return {
    sheets: [{ name: 'mayo2025', month: 5, year: 2025 }],
    tables,
    snapshots: [],
    quarantine: Array.from({ length: quarantineCount }, (_, i) => ({
      sheet: 'mayo2025',
      row: i,
      col: 0,
      cell: 'x',
      reason: 'unparseable-amount' as const,
    })),
    inferredDates: [],
  };
}

describe('validateParse: table checksums', () => {
  it('passes when row sums equal the sheet TOTAL (±0.01)', () => {
    const res = makeResult([makeTable(100.005, [50, 30, 20.005])]);

    const report = validateParse(res);

    expect(report.checks).toHaveLength(1);
    expect(report.checks[0]).toMatchObject({
      label: 'GASTOS',
      rowSum: expect.closeTo(100.005, 2),
      total: 100.005,
      ok: true,
    });
    expect(report.ok).toBe(true);
  });

  it('fails when row sums diverge from the TOTAL', () => {
    const res = makeResult([makeTable(1000, [50, 30])]);

    const report = validateParse(res);

    expect(report.failedChecks).toHaveLength(1);
    expect(report.failedChecks[0].diff).toBeCloseTo(-920, 2);
    // spec §6: checksums are reported, the abort gate is the quarantine rate
    expect(report.ok).toBe(true);
  });

  it('fails on diffs just above the 0.01 tolerance', () => {
    const res = makeResult([makeTable(100, [100.011])]);

    const report = validateParse(res);

    expect(report.failedChecks).toHaveLength(1);
    expect(report.ok).toBe(true); // reported, not gating
  });

  it('ignores tables without a TOTAL cell', () => {
    const res = makeResult([makeTable(null, [1, 2])]);

    const report = validateParse(res);

    expect(report.checks).toHaveLength(0);
    expect(report.ok).toBe(true);
  });

  it('skips phantom total-only tables (no parsed rows)', () => {
    const res = makeResult([makeTable(37622.33, [])]);

    const report = validateParse(res);

    expect(report.checks).toHaveLength(0);
    expect(report.failedChecks).toHaveLength(0);
    expect(report.ok).toBe(true);
  });
});

describe('validateParse: quarantine threshold', () => {
  it('stays ok below the default 5% quarantine rate', () => {
    const res = makeResult([makeTable(null, Array(99).fill(1))], 1);

    const report = validateParse(res);

    expect(report.quarantineRate).toBeCloseTo(0.01, 3);
    expect(report.ok).toBe(true);
  });

  it('fails above the default 5% quarantine rate', () => {
    const res = makeResult([makeTable(null, Array(94).fill(1))], 6);

    const report = validateParse(res);

    expect(report.ok).toBe(false);
    expect(report.quarantineRate).toBeCloseTo(0.06, 3);
  });

  it('honors a custom threshold', () => {
    const res = makeResult([makeTable(null, Array(90).fill(1))], 10);

    expect(validateParse(res).ok).toBe(false);
    expect(validateParse(res, { maxQuarantineRate: 0.2 }).ok).toBe(true);
  });

  it('does not divide by zero when nothing was parsed', () => {
    const report = validateParse(makeResult([]));

    expect(report.quarantineRate).toBe(0);
    expect(report.ok).toBe(true);
  });

  it('reports inferred dates without counting them as quarantine', () => {
    const res = makeResult([makeTable(null, Array(39).fill(1))], 1);
    res.inferredDates = [
      { sheet: 'mayo2025', row: 9, col: 0, cell: 'tres/seis' },
      { sheet: 'mayo2025', row: 10, col: 10, cell: 'disney+' },
    ];

    const report = validateParse(res);

    expect(report.inferredDates).toBe(2);
    expect(report.quarantinedRows).toBe(1);
    expect(report.quarantineRate).toBeCloseTo(1 / 40, 3);
    expect(report.ok).toBe(true);
  });
});
