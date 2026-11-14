// apps/backend/src/scripts/history-import/__tests__/fixtures/buildOds.ts
// Builds a minimal ODS file (mimetype + content.xml) from in-memory sheet
// definitions. Used by unit tests so the real personal spreadsheet never
// appears in tests.
import { buildZip } from '../../zip';

export interface SheetDef {
  name: string;
  /** Rows of cell values; null/undefined = empty cell. */
  rows: (string | number | null)[][];
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

interface CellOptions {
  /** Emit office:value instead of <text:p> (numeric cell without display text) */
  valueOnly?: boolean;
}

function cellXml(
  value: string | number | null,
  opts: CellOptions = {},
): string {
  if (value === null || value === undefined || value === '') {
    return '<table:table-cell office:value-type="string"/>';
  }
  if (opts.valueOnly) {
    return `<table:table-cell office:value-type="float" office:value="${escapeXml(
      String(value),
    )}"/>`;
  }
  return (
    `<table:table-cell office:value-type="string">` +
    `<text:p>${escapeXml(String(value))}</text:p>` +
    `</table:table-cell>`
  );
}

/** Compacts runs of empty cells into number-columns-repeated cells. */
function rowXml(row: (string | number | null)[]): string {
  const parts: string[] = [];
  let i = 0;
  while (i < row.length) {
    const v = row[i];
    if (v === null || v === undefined || v === '') {
      let run = 1;
      while (
        i + run < row.length &&
        (row[i + run] === null ||
          row[i + run] === undefined ||
          row[i + run] === '')
      ) {
        run++;
      }
      parts.push(
        `<table:table-cell office:value-type="string" table:number-columns-repeated="${run}"/>`,
      );
      i += run;
    } else {
      parts.push(cellXml(v));
      i++;
    }
  }
  return `<table:table-row>${parts.join('')}</table:table-row>`;
}

export function buildOds(sheets: SheetDef[]): Buffer {
  const tables = sheets
    .map((sheet) => {
      const rows = sheet.rows.map((r) => rowXml(r)).join('');
      return `<table:table table:name="${escapeXml(sheet.name)}">${rows}</table:table>`;
    })
    .join('');

  const contentXml =
    `<?xml version="1.0" encoding="UTF-8"?>` +
    `<office:document-content ` +
    `xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0" ` +
    `xmlns:table="urn:oasis:names:tc:opendocument:xmlns:table:1.0" ` +
    `xmlns:text="urn:oasis:names:tc:opendocument:xmlns:text:1.0" ` +
    `office:version="1.3">` +
    `<office:body><office:spreadsheet>${tables}</office:spreadsheet></office:body>` +
    `</office:document-content>`;

  return buildZip({
    mimetype: Buffer.from('application/vnd.oasis.opendocument.spreadsheet'),
    'content.xml': Buffer.from(contentXml),
  });
}
