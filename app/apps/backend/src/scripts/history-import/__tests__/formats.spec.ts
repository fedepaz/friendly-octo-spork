// apps/backend/src/scripts/history-import/__tests__/formats.spec.ts
import { parseNumber, parseSheetMonthYear, parseSpanishDate } from '../formats';

describe('parseNumber (Argentine formats)', () => {
  it('parses thousands + decimal comma', () => {
    expect(parseNumber('2.000,00')).toBe(2000);
    expect(parseNumber('3.227.899,13')).toBe(3227899.13);
    expect(parseNumber('-14.748,00')).toBe(-14748);
    expect(parseNumber('1.100.153,57')).toBe(1100153.57);
  });

  it('parses plain integers', () => {
    expect(parseNumber('30000')).toBe(30000);
    expect(parseNumber('174320')).toBe(174320);
    expect(parseNumber('0')).toBe(0);
  });

  it('parses raw dot-decimal values (office:value fallback)', () => {
    expect(parseNumber('3227899.13')).toBe(3227899.13);
    expect(parseNumber('23063.86')).toBe(23063.86);
    expect(parseNumber('-210431.834676667')).toBeCloseTo(-210431.834676667);
  });

  it('parses whole-thousands display text as thousands', () => {
    expect(parseNumber('410.587')).toBe(410587);
  });

  it('parses single comma decimals', () => {
    expect(parseNumber('54,16')).toBe(54.16);
    expect(parseNumber('1,88')).toBe(1.88);
    expect(parseNumber('9.400,00')).toBe(9400);
  });

  it('parses negatives with leading minus', () => {
    expect(parseNumber('-881034,287643333')).toBeCloseTo(-881034.287643333);
  });

  it('returns null for non-numeric content', () => {
    expect(parseNumber('')).toBeNull();
    expect(parseNumber(undefined)).toBeNull();
    expect(parseNumber('jue 01/may 25')).toBeNull();
    expect(parseNumber('TOTAL')).toBeNull();
  });
});

describe('parseSpanishDate', () => {
  it('parses short format with optional weekday: jue 01/may 25', () => {
    expect(parseSpanishDate('jue 01/may 25')).toEqual(new Date(2025, 4, 1));
    expect(parseSpanishDate('sáb 03/may 25')).toEqual(new Date(2025, 4, 3));
    expect(parseSpanishDate('03/may/25')).toEqual(new Date(2025, 4, 3));
  });

  it('parses long format: jue 8 de may de 25', () => {
    expect(parseSpanishDate('jue 8 de may de 25')).toEqual(
      new Date(2025, 4, 8),
    );
    expect(parseSpanishDate('sáb 31 de may de 25')).toEqual(
      new Date(2025, 4, 31),
    );
    expect(parseSpanishDate('8 de may de 2025')).toEqual(new Date(2025, 4, 8));
  });

  it('parses all Spanish month abbreviations', () => {
    expect(parseSpanishDate('01/ene/25')).toEqual(new Date(2025, 0, 1));
    expect(parseSpanishDate('01/feb/25')).toEqual(new Date(2025, 1, 1));
    expect(parseSpanishDate('01/mar/25')).toEqual(new Date(2025, 2, 1));
    expect(parseSpanishDate('01/abr/25')).toEqual(new Date(2025, 3, 1));
    expect(parseSpanishDate('01/jun/25')).toEqual(new Date(2025, 5, 1));
    expect(parseSpanishDate('01/jul/25')).toEqual(new Date(2025, 6, 1));
    expect(parseSpanishDate('01/ago/25')).toEqual(new Date(2025, 7, 1));
    expect(parseSpanishDate('01/sep/25')).toEqual(new Date(2025, 8, 1));
    expect(parseSpanishDate('01/oct/25')).toEqual(new Date(2025, 9, 1));
    expect(parseSpanishDate('01/nov/25')).toEqual(new Date(2025, 10, 1));
    expect(parseSpanishDate('01/dic/25')).toEqual(new Date(2025, 11, 1));
  });

  it('parses ISO dates as a fallback', () => {
    expect(parseSpanishDate('2025-05-01')).toEqual(new Date(2025, 4, 1));
  });

  it('returns null for unparseable dates', () => {
    expect(parseSpanishDate('')).toBeNull();
    expect(parseSpanishDate('TOTAL')).toBeNull();
    expect(parseSpanishDate('99/xyz/25')).toBeNull();
    expect(parseSpanishDate(undefined)).toBeNull();
  });
});

describe('parseSheetMonthYear', () => {
  it('parses month + 4-digit year from sheet names', () => {
    expect(parseSheetMonthYear('mayo2025')).toEqual({ month: 5, year: 2025 });
    expect(parseSheetMonthYear('Enero2021')).toEqual({ month: 1, year: 2021 });
    expect(parseSheetMonthYear('DIciembre2021')).toEqual({
      month: 12,
      year: 2021,
    });
    expect(parseSheetMonthYear('agosto2024')).toEqual({ month: 8, year: 2024 });
    expect(parseSheetMonthYear('septiembre2025')).toEqual({
      month: 9,
      year: 2025,
    });
  });

  it('defaults yearless sheet names to 2020', () => {
    expect(parseSheetMonthYear('Abril')).toEqual({ month: 4, year: 2020 });
    expect(parseSheetMonthYear('Diciembre')).toEqual({ month: 12, year: 2020 });
  });

  it('returns null for external-link or unknown sheet names', () => {
    expect(
      parseSheetMonthYear(
        "'file:///home/user/Documents/Personal/Gastos.ods'#Julio2022",
      ),
    ).toBeNull();
    expect(parseSheetMonthYear('whatever')).toBeNull();
  });
});
