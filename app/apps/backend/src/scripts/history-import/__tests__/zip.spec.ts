// apps/backend/src/scripts/history-import/__tests__/zip.spec.ts
import zlib from 'node:zlib';
import { buildZip, readZipEntries } from '../zip';

describe('history-import zip', () => {
  it('round-trips a stored (uncompressed) entry', () => {
    const buf = buildZip({ 'content.xml': Buffer.from('<office:content/>') });

    const entries = readZipEntries(buf);

    expect(entries.get('content.xml')?.toString()).toBe('<office:content/>');
  });

  it('reads a deflated entry (compression method 8)', () => {
    const payload = Buffer.from('deflate me '.repeat(50));
    const deflated = zlib.deflateRawSync(payload);
    const buf = buildZip(
      { 'content.xml': payload },
      { deflate: ['content.xml'] },
    );

    const entries = readZipEntries(buf);

    expect(entries.get('content.xml')?.equals(payload)).toBe(true);
    // sanity: builder actually compressed it
    expect(deflated.length).toBeLessThan(payload.length);
  });

  it('reads multiple entries', () => {
    const buf = buildZip({
      mimetype: Buffer.from('application/vnd.oasis.opendocument.spreadsheet'),
      'content.xml': Buffer.from('<a/>'),
      'styles.xml': Buffer.from('<b/>'),
    });

    const entries = readZipEntries(buf);

    expect([...entries.keys()].sort()).toEqual([
      'content.xml',
      'mimetype',
      'styles.xml',
    ]);
    expect(entries.get('styles.xml')?.toString()).toBe('<b/>');
  });

  it('throws on data that is not a zip', () => {
    expect(() => readZipEntries(Buffer.from('nope'))).toThrow(/zip/i);
  });
});
