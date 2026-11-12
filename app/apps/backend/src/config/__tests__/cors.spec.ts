import { buildCorsOptions, CORS_METHODS } from '../cors';

describe('buildCorsOptions', () => {
  it('allows PATCH so cross-origin PATCH requests pass CORS preflight', () => {
    // Regression test for issue #67: change-password and permissions-save
    // PATCH requests were rejected by preflight because PATCH was missing
    // from the enabled CORS methods.
    const options = buildCorsOptions(['http://localhost:3000']);

    expect(options.methods).toContain('PATCH');
  });

  it('keeps the previously enabled methods and CORS settings', () => {
    const options = buildCorsOptions([]);

    expect(options.methods).toEqual(
      expect.arrayContaining(['GET', 'POST', 'OPTIONS']),
    );
    expect(CORS_METHODS).toHaveLength(options.methods.length);
    expect(options.credentials).toBe(true);
    expect(options.allowedHeaders).toEqual(['Content-Type', 'Authorization']);
  });

  it('passes through the configured origins', () => {
    const origins = ['http://localhost:3000', 'https://example.com'];

    expect(buildCorsOptions(origins).origin).toEqual(origins);
  });
});
