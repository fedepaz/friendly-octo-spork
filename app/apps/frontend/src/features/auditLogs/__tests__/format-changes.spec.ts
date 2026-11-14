import { formatChanges } from '../lib/format-changes';

describe('formatChanges', () => {
  it('returns an em dash for null or empty changes', () => {
    expect(formatChanges(null)).toBe('—');
    expect(formatChanges({})).toBe('—');
  });

  it('renders primitive values as key: value pairs', () => {
    expect(formatChanges({ endpoint: '/accounts', method: 'POST' })).toBe(
      'endpoint: /accounts, method: POST',
    );
  });

  it('renders nested objects as JSON instead of [object Object]', () => {
    // Regression test for issue #72: the interceptor stores a request
    // snapshot whose params/query/body are objects — String(value) rendered
    // them as "[object Object]" in the Changes column.
    const summary = formatChanges({
      body: { name: 'Visa', password: '[REDACTED]' },
      method: 'POST',
    });
    expect(summary).not.toContain('[object Object]');
    expect(summary).toContain('{"name":"Visa"');
  });

  it('truncates summaries beyond the first two keys', () => {
    const summary = formatChanges({
      a: 1,
      b: 2,
      c: 3,
    });
    expect(summary).toBe('a: 1, b: 2...');
  });

  it('renders before/after diff objects with an arrow', () => {
    expect(
      formatChanges({ balance: { before: 100, after: 50 } }),
    ).toBe('balance: 100 → 50');
  });
});
