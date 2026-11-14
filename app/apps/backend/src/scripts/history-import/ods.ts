// apps/backend/src/scripts/history-import/ods.ts
// ODS content.xml → per-sheet cell matrix. Zero deps (zip + token scan).
import fs from 'node:fs';
import { readZipEntries } from './zip';

export interface Sheet {
  name: string;
  rows: string[][];
}

/** Column cap: real sheets pad hundreds of empty trailing columns. */
const MAX_COLS = 64;
const MAX_REPEAT_NONEMPTY = 100;

function decodeEntities(s: string): string {
  return s
    .replace(/&#x([0-9a-fA-F]+);/g, (_, h: string) =>
      String.fromCodePoint(parseInt(h, 16)),
    )
    .replace(/&#(\d+);/g, (_, d: string) =>
      String.fromCodePoint(parseInt(d, 10)),
    )
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&');
}

function parseAttrs(tag: string): Record<string, string> {
  const out: Record<string, string> = {};
  const re = /([\w:.-]+)="([^"]*)"/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(tag)) !== null) {
    out[m[1]] = m[2];
  }
  return out;
}

export function parseContentXml(xml: string): Sheet[] {
  const tokens = xml.split(/(<[^>]*>)/);
  const sheets: Sheet[] = [];
  let sheet: Sheet | null = null;
  let row: string[] | null = null;
  let rowRepeat = 1;
  let cell: { rep: number; value: string; text: string[] } | null = null;
  let inP = false;
  let pText = '';

  const finishCell = (): void => {
    if (!cell) return;
    if (row) {
      const text = cell.text.length > 0 ? cell.text.join('\n') : cell.value;
      if (text === '') {
        const room = Math.max(0, MAX_COLS - row.length);
        for (let i = 0; i < Math.min(cell.rep, room); i++) row.push('');
      } else {
        const times = Math.min(cell.rep, MAX_REPEAT_NONEMPTY);
        for (let i = 0; i < times && row.length < MAX_COLS; i++) {
          row.push(text);
        }
      }
    }
    cell = null;
  };

  const finishRow = (): void => {
    finishCell();
    if (row && sheet && row.some((c) => c !== '')) {
      const times = Math.min(rowRepeat, MAX_REPEAT_NONEMPTY);
      for (let i = 0; i < times; i++) sheet.rows.push([...row]);
    }
    row = null;
    rowRepeat = 1;
  };

  for (const tok of tokens) {
    if (tok === '') continue;

    if (tok[0] !== '<') {
      // text content
      if (inP) pText += decodeEntities(tok);
      continue;
    }

    if (tok.startsWith('</')) {
      if (tok === '</text:p>') {
        if (cell) cell.text.push(pText);
        inP = false;
        pText = '';
      } else if (
        tok === '</table:table-cell>' ||
        tok === '</table:covered-table-cell>'
      ) {
        finishCell();
      } else if (tok === '</table:table-row>') {
        finishRow();
      } else if (tok === '</table:table>') {
        finishRow();
        if (sheet) sheets.push(sheet);
        sheet = null;
      }
      continue;
    }

    // open or self-closing tags
    if (tok.startsWith('<text:p')) {
      if (!tok.endsWith('/>')) {
        inP = true;
        pText = '';
      }
      continue;
    }

    if (tok.startsWith('<table:table-cell')) {
      const attrs = parseAttrs(tok);
      cell = {
        rep: parseInt(attrs['table:number-columns-repeated'] ?? '1', 10) || 1,
        value: decodeEntities(
          attrs['office:string-value'] ?? attrs['office:value'] ?? '',
        ),
        text: [],
      };
      if (tok.endsWith('/>')) finishCell();
      continue;
    }

    if (tok.startsWith('<table:covered-table-cell')) {
      const attrs = parseAttrs(tok);
      const rep =
        parseInt(attrs['table:number-columns-repeated'] ?? '1', 10) || 1;
      if (row) {
        const room = Math.max(0, MAX_COLS - row.length);
        for (let i = 0; i < Math.min(rep, room); i++) row.push('');
      }
      continue;
    }

    if (tok.startsWith('<table:table-row')) {
      const attrs = parseAttrs(tok);
      rowRepeat = parseInt(attrs['table:number-rows-repeated'] ?? '1', 10) || 1;
      row = [];
      if (tok.endsWith('/>')) finishRow();
      continue;
    }

    if (tok.startsWith('<table:table ') || tok === '<table:table>') {
      const attrs = parseAttrs(tok);
      sheet = { name: decodeEntities(attrs['table:name'] ?? ''), rows: [] };
      if (tok.endsWith('/>')) {
        sheets.push(sheet);
        sheet = null;
      }
      continue;
    }

    // table-column, table-header-rows, table-row-group, named ranges, etc: ignore
  }

  if (sheet) sheets.push(sheet);
  return sheets;
}

export function readSheetsFromBuffer(buf: Buffer): Sheet[] {
  const entries = readZipEntries(buf);
  const content = entries.get('content.xml');
  if (!content) throw new Error('ODS file is missing content.xml');
  return parseContentXml(content.toString('utf8'));
}

export function readSheets(filePath: string): Sheet[] {
  return readSheetsFromBuffer(fs.readFileSync(filePath));
}
