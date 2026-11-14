// apps/backend/src/scripts/history-import/__tests__/parse.spec.ts
import { parseSheets } from '../parse';
import type { ParseResult, ParsedTable } from '../types';
import { readSheetsFromBuffer } from '../ods';
import { buildOds } from './fixtures/buildOds';

type Cell = string | number | null;
type Row = Cell[] | Record<number, string | number>;

function sparse(m: Record<number, string | number>): Cell[] {
  const keys = Object.keys(m).map(Number);
  const max = keys.length ? Math.max(...keys) : -1;
  const arr: Cell[] = new Array(max + 1).fill(null);
  for (const k of keys) arr[k] = m[k];
  return arr;
}

function parse(name: string, rows: Row[]): ParseResult {
  const normalized = rows.map((r) => (Array.isArray(r) ? r : sparse(r)));
  return parseSheets(
    readSheetsFromBuffer(buildOds([{ name, rows: normalized }])),
  );
}

function table(res: ParseResult, label: string): ParsedTable {
  const t = res.tables.find((x) => x.label === label);
  if (!t) {
    throw new Error(
      `table ${label} not found; got [${res.tables.map((x) => x.label).join(', ')}]`,
    );
  }
  return t;
}

describe('parseSheets: header tables', () => {
  const res = parse('mayo2025', [
    sparse({ 0: 'GASTOS', 3: 'PAGOS' }),
    sparse({
      0: 'FECHA',
      1: 'MONTO',
      2: 'CONCEPTO',
      5: 'FECHA',
      6: 'MONTO',
      7: 'CONCEPTO',
    }),
    sparse({
      0: '01/may/25',
      1: '45.499,39',
      2: 'notebook',
      5: 'jue 8 de may de 25',
      6: '380.000,00',
      7: 'alquiler',
    }),
    sparse({ 0: 'TOTAL', 1: '45.499,39', 5: 'TOTAL', 6: '380.000,00' }),
    sparse({ 0: '10/may/25', 1: '9.999,99', 2: 'after-total' }),
  ]);

  it('parses the GASTOS header table with label, type, total', () => {
    const gastos = table(res, 'GASTOS');
    expect(gastos.band).toBe(0);
    expect(gastos.kind).toBe('header');
    expect(gastos.total).toBe(45499.39);
    expect(gastos.rows).toHaveLength(1);
    expect(gastos.rows[0]).toMatchObject({
      dateISO: '2025-05-01',
      amount: 45499.39,
      concept: 'notebook',
      type: 'EXPENSE',
      dateInferred: false,
    });
  });

  it('associates the offset PAGOS label (col 3) with the col-5 header', () => {
    const pagos = table(res, 'PAGOS');
    expect(pagos.band).toBe(5);
    expect(pagos.total).toBe(380000);
    expect(pagos.rows[0]).toMatchObject({
      concept: 'alquiler',
      type: 'EXPENSE',
      dateISO: '2025-05-08',
    });
  });

  it('closes a table at its TOTAL row (later rows are ignored)', () => {
    const all = res.tables.flatMap((t) => t.rows.map((r) => r.concept));
    expect(all).not.toContain('after-total');
  });

  it('falls back to EXPENSE with empty label when no label exists', () => {
    const r = parse('mayo2025', [
      sparse({ 0: 'FECHA', 1: 'MONTO', 2: 'CONCEPTO' }),
      sparse({ 0: '01/may/25', 1: '10,00', 2: 'x' }),
    ]);
    expect(r.tables).toHaveLength(1);
    expect(r.tables[0].label).toBe('');
    expect(r.tables[0].fixedType).toBe('EXPENSE');
  });
});

describe('parseSheets: headerless label tables', () => {
  it('parses the daily-spend grid under its GASTO DIARIO label', () => {
    const res = parse('mayo2025', [
      sparse({ 14: 'GASTO DIARIO' }),
      sparse({ 14: 'jue 01/may 25', 15: '2.000,00', 16: 'sube' }),
      sparse({ 14: 'vie 02/may 25', 15: '8.000,00', 16: 'peluSube' }),
    ]);
    const grid = table(res, 'GASTO DIARIO');
    expect(grid.kind).toBe('label');
    expect(grid.band).toBe(14);
    expect(grid.rows).toHaveLength(2);
    expect(grid.rows[0]).toMatchObject({
      dateISO: '2025-05-01',
      amount: 2000,
      concept: 'sube',
      type: 'EXPENSE',
    });
  });

  it('parses headerless INGRESOS rows, inferring the sheet month for dateless rows', () => {
    const res = parse('mayo2025', [
      sparse({ 10: 'INGRESOS' }),
      sparse({ 10: 'sáb 1 de mar de 25', 11: '1.100.153,57', 12: 'sueldo' }),
      sparse({ 11: '16.208,09', 12: 'inversiones' }),
    ]);
    const ingresos = table(res, 'INGRESOS');
    expect(ingresos.rows).toHaveLength(2);
    expect(ingresos.rows[0]).toMatchObject({
      type: 'INCOME',
      dateISO: '2025-03-01',
      dateInferred: false,
      concept: 'sueldo',
    });
    expect(ingresos.rows[1]).toMatchObject({
      type: 'INCOME',
      dateISO: '2025-05-01',
      dateInferred: true,
      concept: 'inversiones',
    });
  });

  it('restarts the same band when a new label + header appear (stacked tables)', () => {
    const res = parse('mayo2025', [
      sparse({ 0: 'GASTOS' }),
      sparse({ 0: 'FECHA', 1: 'MONTO', 2: 'CONCEPTO' }),
      sparse({ 0: '01/may/25', 1: '1.000,00', 2: 'first' }),
      sparse({ 0: 'TOTAL', 1: '1.000,00' }),
      sparse({ 0: 'GASTOS TARJETA' }),
      sparse({ 0: 'FECHA', 1: 'MONTO', 2: 'CONCEPTO' }),
      sparse({ 0: '02/may/25', 1: '2.000,00', 2: 'second' }),
    ]);
    const band0 = res.tables.filter((t) => t.band === 0);
    expect(band0).toHaveLength(2);
    expect(band0[0].label).toBe('GASTOS');
    expect(band0[0].rows.map((r) => r.concept)).toEqual(['first']);
    expect(band0[1].label).toBe('GASTOS TARJETA');
    expect(band0[1].rows.map((r) => r.concept)).toEqual(['second']);
  });
});

describe('parseSheets: type classification', () => {
  it('keyword-classifies TRANSFERENCIAS rows', () => {
    const res = parse('mayo2025', [
      sparse({ 20: 'TRANSFERENCIAS' }),
      sparse({ 20: 'FECHA', 21: 'MONTO', 22: 'CONCEPTO' }),
      sparse({ 20: 'jue 1 de may de 25', 21: '905.000,00', 22: 'sueldo' }),
      sparse({ 20: 'vie 16 de may de 25', 21: '500.000,00', 22: 'alquiler' }),
      sparse({ 20: 'jue 8 de may de 25', 21: '50.000,00', 22: 'mesPasado' }),
    ]);
    const t = table(res, 'TRANSFERENCIAS');
    expect(t.typeMode).toBe('KEYWORD');
    expect(t.rows.map((r) => [r.concept, r.type])).toEqual([
      ['sueldo', 'INCOME'],
      ['alquiler', 'EXPENSE'],
      ['mesPasado', 'TRANSFER'],
    ]);
  });
});

describe('parseSheets: skips and quarantine', () => {
  it('excludes the metric band (17) even when it has a header', () => {
    const res = parse('mayo2025', [
      sparse({ 17: 'FECHA', 18: 'MONTO', 19: 'CONCEPTO' }),
      sparse({ 17: 'jue 01/may 25', 18: '1,88', 19: 'costoVida' }),
    ]);
    expect(res.tables).toHaveLength(0);
    expect(res.quarantine).toHaveLength(0);
  });

  it('silently skips metric rows, numeric concepts, labels and zero amounts', () => {
    const res = parse('mayo2025', [
      sparse({ 0: 'GASTOS' }),
      sparse({ 0: 'FECHA', 1: 'MONTO', 2: 'CONCEPTO' }),
      // label + amount + numeric concept
      sparse({ 0: 'TARJETA', 1: '30000', 2: '-14637,93' }),
      // known label in date cell + amount + free-text concept
      sparse({ 0: 'GASTOS', 1: '3.227.899,13', 2: 'dolar blue' }),
      // label + amount, no concept
      sparse({ 0: 'aumento', 1: '29.324,47' }),
      // zero amount
      sparse({ 0: '01/may/25', 1: '0,00', 2: 'zero' }),
      // date-only day (no spending)
      sparse({ 0: '02/may/25' }),
      // 'total' as concept (summary row, not a transaction)
      sparse({ 1: '123,45', 2: 'total' }),
      // real row
      sparse({ 0: '01/may/25', 1: '1.000,00', 2: 'ok' }),
    ]);
    const t = table(res, 'GASTOS');
    expect(t.rows.map((r) => r.concept)).toEqual(['ok']);
    expect(res.quarantine).toHaveLength(0);
  });

  it('infers the sheet date for unparseable date cells and reports them', () => {
    const res = parse('mayo2025', [
      sparse({ 0: 'GASTOS' }),
      sparse({ 0: 'FECHA', 1: 'MONTO', 2: 'CONCEPTO' }),
      sparse({ 0: 'sube', 1: '54,16', 2: 'VERDADERO' }),
      sparse({ 0: '03/may/25', 1: '10,00', 2: 'fine' }),
    ]);
    const t = table(res, 'GASTOS');
    expect(t.rows.map((r) => r.concept)).toEqual(['VERDADERO', 'fine']);
    expect(t.rows[0]).toMatchObject({
      dateInferred: true,
      dateISO: '2025-05-01',
      amount: 54.16,
    });
    expect(res.inferredDates).toEqual([
      expect.objectContaining({ sheet: 'mayo2025', cell: 'sube' }),
    ]);
    expect(res.quarantine).toHaveLength(0);
  });

  it('quarantines rows with real money but an unparseable amount', () => {
    const res = parse('mayo2025', [
      sparse({ 0: 'GASTOS' }),
      sparse({ 0: 'FECHA', 1: 'MONTO', 2: 'CONCEPTO' }),
      sparse({ 0: '01/may/25', 1: 'not-a-number', 2: 'weird' }),
      sparse({ 0: '03/may/25', 1: '10,00', 2: 'fine' }),
    ]);
    const t = table(res, 'GASTOS');
    expect(t.rows.map((r) => r.concept)).toEqual(['fine']);
    expect(res.quarantine).toEqual([
      expect.objectContaining({
        sheet: 'mayo2025',
        reason: 'unparseable-amount',
        cell: 'not-a-number',
      }),
    ]);
  });

  it('imports dateless money rows even without a concept (description null)', () => {
    const res = parse('mayo2025', [
      sparse({ 10: 'INGRESOS' }),
      sparse({ 11: '118.651,62' }),
    ]);
    const t = table(res, 'INGRESOS');
    expect(t.rows).toHaveLength(1);
    expect(t.rows[0]).toMatchObject({
      amount: 118651.62,
      concept: '',
      dateInferred: true,
    });
    expect(res.quarantine).toHaveLength(0);
    expect(res.inferredDates).toHaveLength(0); // no date cell to report
  });

  it('treats bare day numbers in date cells as days of the sheet month', () => {
    const res = parse('mayo2025', [
      sparse({ 14: 'GASTO DIARIO' }),
      sparse({ 14: '5', 15: '2.000,00', 16: 'pan' }),
      sparse({ 14: '14', 15: '1.000,00', 16: 'yerba' }),
      sparse({ 14: '05', 15: '500,00', 16: 'pan' }),
    ]);
    const grid = table(res, 'GASTO DIARIO');
    expect(grid.rows.map((r) => [r.dateISO, r.dateInferred])).toEqual([
      ['2025-05-05', false],
      ['2025-05-14', false],
      ['2025-05-05', false],
    ]);
    expect(res.inferredDates).toHaveLength(0);
  });

  it('silently skips section markers and footnotes in date cells', () => {
    const res = parse('mayo2025', [
      sparse({ 0: 'GASTOS' }),
      sparse({ 0: 'FECHA', 1: 'MONTO', 2: 'CONCEPTO' }),
      sparse({ 0: '*', 1: '10,00', 2: 'footnote' }),
      sparse({ 0: 'JUNIO', 1: '20,00', 2: 'month-header' }),
      sparse({ 0: 'DIARIO', 1: '30,00', 2: 'diario-header' }),
      sparse({ 0: '01/may/25', 1: '10,00', 2: 'ok' }),
    ]);
    const t = table(res, 'GASTOS');
    expect(t.rows.map((r) => r.concept)).toEqual(['ok']);
    expect(res.quarantine).toHaveLength(0);
    expect(res.inferredDates).toHaveLength(0);
  });

  it('does not quarantine structural junk when both date and amount are unparseable', () => {
    const res = parse('mayo2025', [
      sparse({ 6: 'FECHA', 7: 'MONTO', 8: 'CONCEPTO' }),
      sparse({ 5: 'FECHA', 6: 'MONTO', 7: 'CONCEPTO' }),
      sparse({ 5: '01/may/25', 6: '100,00', 7: 'y' }),
    ]);
    const band5 = res.tables.find((t) => t.band === 5);
    expect(band5?.rows.map((r) => r.concept)).toEqual(['y']);
    // the phantom col-6 header table is empty and gets dropped
    expect(res.tables.every((t) => t.rows.length > 0 || t.total !== null)).toBe(
      true,
    );
    expect(res.quarantine).toHaveLength(0);
  });
});

describe('parseSheets: sheets, snapshots', () => {
  it('attaches sheet month/year and skips external-link sheets', () => {
    const res = parseSheets(
      readSheetsFromBuffer(
        buildOds([
          { name: 'DIciembre2021', rows: [['x']] },
          {
            name: "'file:///home/u/Documents/Personal/Gastos.ods'#Julio2022",
            rows: [['y']],
          },
          { name: 'Abril', rows: [['z']] },
        ]),
      ),
    );
    expect(res.sheets).toEqual([
      { name: 'DIciembre2021', month: 12, year: 2021 },
      { name: 'Abril', month: 4, year: 2020 },
    ]);
  });

  it('extracts balance snapshots with a month-end checkpoint date', () => {
    const res = parse('mayo2025', [
      sparse({ 0: 'TARJETA', 1: '30000' }),
      sparse({ 10: 'saldoMP', 11: '7.119,30' }),
      sparse({ 10: 'efectivo', 11: '200,00' }),
      sparse({ 10: 'saldoBanco', 11: '1.368,15', 12: 'x' }),
    ]);
    expect(res.snapshots).toEqual([
      expect.objectContaining({
        label: 'tarjeta',
        amount: 30000,
        dateISO: '2025-05-31',
      }),
      expect.objectContaining({
        label: 'saldomp',
        amount: 7119.3,
        dateISO: '2025-05-31',
      }),
      expect.objectContaining({
        label: 'efectivo',
        amount: 200,
        dateISO: '2025-05-31',
      }),
    ]);
    // saldoBanco has a non-empty concept cell → not a snapshot
    expect(res.snapshots).toHaveLength(3);
    expect(res.snapshots.map((s) => s.label)).not.toContain('saldobanco');
  });
});
