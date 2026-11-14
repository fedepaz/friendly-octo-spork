// apps/backend/src/scripts/history-import/parse.ts
// Sheet grids → normalized tables, rows, snapshots, quarantine.
import {
  EXCLUDED_BANDS,
  KNOWN_TABLE_TYPES,
  SECTION_DATE_MARKERS,
  SNAPSHOT_LABELS,
  fallbackTypeForBand,
  normalizeLabel,
} from './columnMaps';
import { parseNumber, parseSheetMonthYear, parseSpanishDate } from './formats';
import { classifyType } from './keywords';
import type { Sheet } from './ods';
import type {
  ImportTxType,
  ParseResult,
  ParsedTable,
  SheetMeta,
} from './types';

interface RecentLabel {
  row: number;
  col: number;
  norm: string;
  display: string;
}

function toLocalISO(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function monthEndISO(meta: SheetMeta): string {
  // day 0 of next month = last day of this month
  return toLocalISO(new Date(meta.year, meta.month, 0));
}

function firstOfMonthISO(meta: SheetMeta): string {
  return toLocalISO(new Date(meta.year, meta.month - 1, 1));
}

/** Bare 1-31 in a date cell = day of the sheet's month (era-2020 grids). */
function bareDayToDate(dateCell: string, meta: SheetMeta): Date | null {
  const m = /^(\d{1,2})$/.exec(dateCell);
  if (!m) return null;
  const day = Number(m[1]);
  if (day < 1 || day > 31) return null;
  const date = new Date(meta.year, meta.month - 1, day);
  return date.getMonth() === meta.month - 1 ? date : null;
}

function isSectionMarker(dateCell: string): boolean {
  if (/^[*]{1,3}$/.test(dateCell)) return true;
  return SECTION_DATE_MARKERS.has(normalizeLabel(dateCell));
}

function makeTable(
  sheet: string,
  label: string,
  band: number,
  kind: 'header' | 'label',
): ParsedTable {
  const norm = normalizeLabel(label);
  const mapped = norm ? KNOWN_TABLE_TYPES[norm] : undefined;
  const typeMode: ParsedTable['typeMode'] =
    mapped === 'KEYWORD' ? 'KEYWORD' : 'FIXED';
  const fixedType: ImportTxType =
    mapped && mapped !== 'KEYWORD'
      ? mapped
      : mapped === 'KEYWORD'
        ? 'EXPENSE'
        : fallbackTypeForBand(band);
  return {
    sheet,
    label,
    band,
    kind,
    typeMode,
    fixedType,
    rows: [],
    total: null,
  };
}

function findLabel(
  recent: RecentLabel[],
  row: number,
  col: number,
): RecentLabel | null {
  let best: RecentLabel | null = null;
  let bestRowDist = Infinity;
  let bestColDist = Infinity;
  for (const l of recent) {
    const rowDist = row - l.row;
    if (rowDist < 0 || rowDist > 3) continue;
    const colDist = Math.abs(l.col - col);
    if (colDist > 4) continue;
    if (
      rowDist < bestRowDist ||
      (rowDist === bestRowDist && colDist < bestColDist)
    ) {
      best = l;
      bestRowDist = rowDist;
      bestColDist = colDist;
    }
  }
  return best;
}

function parseOneSheet(
  sheet: Sheet,
  meta: SheetMeta,
  result: ParseResult,
): void {
  const active = new Map<number, ParsedTable>();
  const recent: RecentLabel[] = [];

  const closeOverlapping = (col: number): void => {
    for (const b of Array.from(active.keys())) {
      if (b !== col && Math.abs(b - col) <= 2) active.delete(b);
    }
  };

  const startHeader = (rowIdx: number, col: number): void => {
    if (EXCLUDED_BANDS.has(col)) return;
    closeOverlapping(col);
    const existing = active.get(col);
    const found = findLabel(recent, rowIdx, col);
    const label = found ? found.display : '';
    if (existing && existing.rows.length === 0 && existing.total === null) {
      // upgrade the label-started empty table
      const upgraded = makeTable(sheet.name, label, col, 'header');
      Object.assign(existing, upgraded);
      return;
    }
    if (existing) active.delete(col);
    const t = makeTable(sheet.name, label, col, 'header');
    result.tables.push(t);
    active.set(col, t);
  };

  const handleLabelCell = (rowIdx: number, col: number, raw: string): void => {
    const norm = normalizeLabel(raw);
    const mapped = KNOWN_TABLE_TYPES[norm];
    if (mapped === undefined) return;
    recent.push({ row: rowIdx, col, norm, display: raw.trim() });
    if (EXCLUDED_BANDS.has(col)) return;

    // Do not restart when a live table with data overlaps the label column —
    // summary labels ("GASTOS | 3.2M | dolar blue") must not wipe rows.
    for (const b of Array.from(active.keys())) {
      if (Math.abs(b - col) <= 2) {
        const t = active.get(b)!;
        if (t.rows.length > 0 || t.total !== null) return;
      }
    }
    closeOverlapping(col);
    const existing = active.get(col);
    if (existing) {
      const fresh = makeTable(sheet.name, raw.trim(), col, 'label');
      Object.assign(existing, fresh);
      return;
    }
    const t = makeTable(sheet.name, raw.trim(), col, 'label');
    result.tables.push(t);
    active.set(col, t);
  };

  sheet.rows.forEach((row, rowIdx) => {
    const cellAt = (i: number): string => (row[i] ?? '').toString().trim();

    // 1. known section labels
    for (let c = 0; c < row.length; c++) {
      const v = cellAt(c);
      if (v !== '') handleLabelCell(rowIdx, c, v);
    }

    // 2. balance snapshots (independent of tables)
    for (let c = 0; c < row.length; c++) {
      const v = cellAt(c);
      if (v === '' || !SNAPSHOT_LABELS.has(normalizeLabel(v))) continue;
      const amount = parseNumber(cellAt(c + 1));
      if (amount === null) continue;
      if (cellAt(c + 2) !== '') continue; // metric rows have no concept
      result.snapshots.push({
        sheet: sheet.name,
        label: normalizeLabel(v),
        amount,
        dateISO: monthEndISO(meta),
      });
    }

    // 3. FECHA/MONTO/CONCEPTO headers
    for (let c = 0; c + 2 < row.length; c++) {
      if (
        cellAt(c).toUpperCase() === 'FECHA' &&
        cellAt(c + 1).toUpperCase() === 'MONTO' &&
        cellAt(c + 2).toUpperCase() === 'CONCEPTO'
      ) {
        startHeader(rowIdx, c);
      }
    }

    // 4. data rows for every active band
    for (const [band, tbl] of Array.from(active.entries())) {
      const dateCell = cellAt(band);
      const amountRaw = cellAt(band + 1);
      const concept = cellAt(band + 2);

      // TOTAL row closes the table
      if (
        dateCell.toLowerCase() === 'total' &&
        parseNumber(amountRaw) !== null
      ) {
        if (tbl.total === null) tbl.total = parseNumber(amountRaw);
        active.delete(band);
        continue;
      }

      if (dateCell === '' && amountRaw === '') continue;

      let date = parseSpanishDate(dateCell);
      const amount = parseNumber(amountRaw);

      if (amount === null) {
        if (amountRaw === '') continue; // date-only day
        if (date !== null) {
          result.quarantine.push({
            sheet: sheet.name,
            row: rowIdx,
            col: band,
            cell: amountRaw,
            reason: 'unparseable-amount',
          });
        }
        // both junk → structural row, skip silently
        continue;
      }

      if (amount === 0) continue;
      if (normalizeLabel(dateCell) in KNOWN_TABLE_TYPES) continue; // summary label row
      if (isSectionMarker(dateCell)) continue; // footnotes/month headers/markers
      if (concept !== '' && parseNumber(concept) !== null) continue; // numeric concept
      if (normalizeLabel(concept) === 'total') continue; // summary in concept col

      if (dateCell === '') {
        // Real money with no date (maybe no concept) → infer the sheet's month
        tbl.rows.push({
          sheet: sheet.name,
          tableLabel: tbl.label,
          band,
          dateISO: firstOfMonthISO(meta),
          dateInferred: true,
          amount,
          concept,
          type:
            tbl.typeMode === 'KEYWORD' ? classifyType(concept) : tbl.fixedType,
        });
        continue;
      }

      if (date === null) {
        date = bareDayToDate(dateCell, meta); // era sheets use '14' for day 14
      }

      if (date === null) {
        if (concept === '') continue; // metric label + amount (e.g. aumento|29324)
        // Installment labels / names used as dates (spec §5.3): import with
        // the sheet's month, reported for review.
        result.inferredDates.push({
          sheet: sheet.name,
          row: rowIdx,
          col: band,
          cell: dateCell,
        });
        tbl.rows.push({
          sheet: sheet.name,
          tableLabel: tbl.label,
          band,
          dateISO: firstOfMonthISO(meta),
          dateInferred: true,
          amount,
          concept,
          type:
            tbl.typeMode === 'KEYWORD' ? classifyType(concept) : tbl.fixedType,
        });
        continue;
      }

      tbl.rows.push({
        sheet: sheet.name,
        tableLabel: tbl.label,
        band,
        dateISO: toLocalISO(date),
        dateInferred: false,
        amount,
        concept,
        type:
          tbl.typeMode === 'KEYWORD' ? classifyType(concept) : tbl.fixedType,
      });
    }
  });
}

export function parseSheets(sheets: Sheet[]): ParseResult {
  const result: ParseResult = {
    sheets: [],
    tables: [],
    snapshots: [],
    quarantine: [],
    inferredDates: [],
  };
  for (const sheet of sheets) {
    const parsedName = parseSheetMonthYear(sheet.name);
    if (!parsedName) continue; // external-link or unknown sheet
    const meta: SheetMeta = { name: sheet.name, ...parsedName };
    result.sheets.push(meta);
    parseOneSheet(sheet, meta, result);
  }
  result.tables = result.tables.filter(
    (t) => t.rows.length > 0 || t.total !== null,
  );
  return result;
}
