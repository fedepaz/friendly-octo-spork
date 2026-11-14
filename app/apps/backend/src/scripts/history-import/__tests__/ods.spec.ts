// apps/backend/src/scripts/history-import/__tests__/ods.spec.ts
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { readSheets, readSheetsFromBuffer } from '../ods';
import { buildZip } from '../zip';
import { buildOds } from './fixtures/buildOds';

function writeTempOds(buf: Buffer): string {
  const file = path.join(
    os.tmpdir(),
    `history-import-test-${Date.now()}-${Math.random().toString(36).slice(2)}.ods`,
  );
  fs.writeFileSync(file, buf);
  return file;
}

describe('history-import ods reader', () => {
  it('returns sheet names in document order', () => {
    const ods = buildOds([
      { name: 'Abril', rows: [['GASTOS']] },
      { name: 'Mayo2021', rows: [['x']] },
    ]);

    const sheets = readSheetsFromBuffer(ods);

    expect(sheets.map((s) => s.name)).toEqual(['Abril', 'Mayo2021']);
  });

  it('reads cell text at correct row/column positions', () => {
    const ods = buildOds([
      {
        name: 'S',
        rows: [
          ['FECHA', 'MONTO', 'CONCEPTO'],
          ['jue 01/may 25', '2.000,00', 'sube'],
          [null, null, null, 'lonely'],
        ],
      },
    ]);

    const sheets = readSheetsFromBuffer(ods);

    expect(sheets[0].rows).toEqual([
      ['FECHA', 'MONTO', 'CONCEPTO'],
      ['jue 01/may 25', '2.000,00', 'sube'],
      ['', '', '', 'lonely'],
    ]);
  });

  it('expands number-columns-repeated empty cells', () => {
    const ods = buildOds([{ name: 'S', rows: [['A', null, null, null, 'B']] }]);

    const sheets = readSheetsFromBuffer(ods);

    expect(sheets[0].rows[0]).toEqual(['A', '', '', '', 'B']);
  });

  it('falls back to the office:value attribute when no text:p exists', () => {
    const contentXml =
      `<?xml version="1.0" encoding="UTF-8"?>` +
      `<office:document-content ` +
      `xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0" ` +
      `xmlns:table="urn:oasis:names:tc:opendocument:xmlns:table:1.0" ` +
      `xmlns:text="urn:oasis:names:tc:opendocument:xmlns:text:1.0">` +
      `<office:body><office:spreadsheet>` +
      `<table:table table:name="S">` +
      `<table:table-row>` +
      `<table:table-cell office:value-type="float" office:value="3227899.13"/>` +
      `</table:table-row>` +
      `</table:table></office:spreadsheet></office:body></office:document-content>`;
    const ods = buildZip({ 'content.xml': Buffer.from(contentXml) });

    const sheets = readSheetsFromBuffer(ods);

    expect(sheets[0].rows).toEqual([['3227899.13']]);
  });

  it('joins multiple text:p paragraphs with a newline', () => {
    const contentXml =
      `<?xml version="1.0" encoding="UTF-8"?>` +
      `<office:document-content ` +
      `xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0" ` +
      `xmlns:table="urn:oasis:names:tc:opendocument:xmlns:table:1.0" ` +
      `xmlns:text="urn:oasis:names:tc:opendocument:xmlns:text:1.0">` +
      `<office:body><office:spreadsheet>` +
      `<table:table table:name="S">` +
      `<table:table-row>` +
      `<table:table-cell office:value-type="string">` +
      `<text:p>linea 1</text:p><text:p>linea 2</text:p>` +
      `</table:table-cell>` +
      `</table:table-row>` +
      `</table:table></office:spreadsheet></office:body></office:document-content>`;
    const ods = buildZip({ 'content.xml': Buffer.from(contentXml) });

    const sheets = readSheetsFromBuffer(ods);

    expect(sheets[0].rows).toEqual([['linea 1\nlinea 2']]);
  });

  it('reads a file from disk', () => {
    const ods = buildOds([{ name: 'S', rows: [['disk']] }]);
    const file = writeTempOds(ods);

    try {
      const sheets = readSheets(file);
      expect(sheets[0].rows[0]).toEqual(['disk']);
    } finally {
      fs.unlinkSync(file);
    }
  });

  it('throws for a file that is not an ODS', () => {
    expect(() => readSheetsFromBuffer(Buffer.from('garbage'))).toThrow(/zip/i);
  });
});
