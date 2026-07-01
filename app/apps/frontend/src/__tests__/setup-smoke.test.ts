/**
 * Smoke test to verify the Jest + React Testing Library + MSW infrastructure works.
 * This test will be removed once real tests are added.
 */

// Verify @testing-library/jest-dom matchers are available
describe('Jest + React Testing Library + MSW infrastructure', () => {
  it('has jest-dom matchers available', () => {
    const div = document.createElement('div');
    div.textContent = 'Hello';
    document.body.appendChild(div);

    // This uses the toBeInTheDocument matcher from @testing-library/jest-dom
    expect(div).toBeInTheDocument();

    document.body.removeChild(div);
  });

  it('has MSW handlers importable', async () => {
    // Verify MSW module can be imported
    const { http, HttpResponse } = await import('msw');
    expect(http).toBeDefined();
    expect(HttpResponse).toBeDefined();
  });

  it('has MSW server importable', async () => {
    // Verify MSW server setup works
    const { server } = await import('@/mocks/server');
    expect(server).toBeDefined();
    expect(typeof server.listen).toBe('function');
    expect(typeof server.close).toBe('function');
  });

  it('has TextEncoder/TextDecoder polyfills', () => {
    expect(global.TextEncoder).toBeDefined();
    expect(global.TextDecoder).toBeDefined();
  });
});
