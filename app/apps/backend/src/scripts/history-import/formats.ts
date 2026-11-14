// apps/backend/src/scripts/history-import/formats.ts
// Argentine number formats and Spanish date formats used by the ledger.

const THOUSANDS_ONLY = /^\d{1,3}(\.\d{3})+$/;
const NUMERIC = /^[+-]?(\d+(\.\d*)?|\.\d+)$/;

export function parseNumber(raw: string | undefined | null): number | null {
  if (raw === undefined || raw === null) return null;
  const s = String(raw).trim();
  if (s === '') return null;

  let normalized: string;
  const hasDot = s.includes('.');
  const hasComma = s.includes(',');

  if (hasDot && hasComma) {
    // Argentine: 3.227.899,13 → thousands dots, decimal comma
    normalized = s.replace(/\./g, '').replace(/,/g, '.');
  } else if (hasComma) {
    // Decimal comma: 54,16
    normalized = s.replace(/,/g, '.');
  } else if (hasDot) {
    // Either thousands display (410.587) or raw dot-decimal (23063.86)
    normalized = THOUSANDS_ONLY.test(s) ? s.replace(/\./g, '') : s;
  } else {
    normalized = s;
  }

  if (!NUMERIC.test(normalized)) return null;
  const n = Number(normalized);
  return Number.isFinite(n) ? n : null;
}

const MONTHS: Record<string, number> = {
  ene: 0,
  feb: 1,
  mar: 2,
  abr: 3,
  may: 4,
  jun: 5,
  jul: 6,
  ago: 7,
  sep: 8,
  set: 8,
  sept: 8,
  oct: 9,
  nov: 10,
  dic: 11,
  enero: 0,
  febrero: 1,
  marzo: 2,
  abril: 3,
  mayo: 4,
  junio: 5,
  julio: 6,
  agosto: 7,
  septiembre: 8,
  setiembre: 8,
  octubre: 9,
  noviembre: 10,
  diciembre: 11,
};

function makeDate(day: number, month0: number, yearToken: number): Date | null {
  const year =
    yearToken < 70
      ? 2000 + yearToken
      : yearToken < 100
        ? 1900 + yearToken
        : yearToken;
  if (!(day >= 1 && day <= 31) || !(month0 >= 0 && month0 <= 11)) return null;
  const date = new Date(year, month0, day);
  // rejects invalid days like Feb 31
  return date.getMonth() === month0 ? date : null;
}

const ISO = /^(\d{4})-(\d{1,2})-(\d{1,2})$/;
// optional weekday, dd, separator (/ or space), month, separator, yy
const SHORT =
  /^(?:\S{2,5}\s+)?(\d{1,2})[/\s]([A-Za-záéíóúÁÉÍÓÚ]{3,})[/\s](\d{2,4})$/;
// optional weekday, "d de month de yy"
const LONG =
  /^(?:\S{2,5}\s+)?(\d{1,2})\s+de\s+([A-Za-záéíóúÁÉÍÓÚ]+)\s+de\s+(\d{2,4})$/;

export function parseSpanishDate(raw: string | undefined | null): Date | null {
  if (raw === undefined || raw === null) return null;
  const s = String(raw).trim().replace(/\s+/g, ' ');
  if (s === '') return null;

  const iso = ISO.exec(s);
  if (iso) {
    return makeDate(Number(iso[3]), Number(iso[2]) - 1, Number(iso[1]));
  }

  const short = SHORT.exec(s);
  if (short) {
    const month0 = MONTHS[short[2].toLowerCase()];
    if (month0 === undefined) return null;
    return makeDate(Number(short[1]), month0, Number(short[3]));
  }

  const long = LONG.exec(s);
  if (long) {
    const month0 = MONTHS[long[2].toLowerCase()];
    if (month0 === undefined) return null;
    return makeDate(Number(long[1]), month0, Number(long[3]));
  }

  return null;
}

const MONTH_KEYS_DESC = Object.keys(MONTHS).sort((a, b) => b.length - a.length);

export function parseSheetMonthYear(
  name: string,
): { month: number; year: number } | null {
  const n = name.trim().toLowerCase();
  if (n.includes('file:') || n.includes('#')) return null;

  for (const key of MONTH_KEYS_DESC) {
    if (n.startsWith(key)) {
      const rest = n.slice(key.length);
      if (rest === '') return { month: MONTHS[key] + 1, year: 2020 };
      if (/^\d{4}$/.test(rest)) {
        return { month: MONTHS[key] + 1, year: Number(rest) };
      }
      return null;
    }
  }
  return null;
}
