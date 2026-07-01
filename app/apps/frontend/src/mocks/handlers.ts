import { http, HttpResponse } from 'msw';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

export const handlers = [
  // Default handlers – override in individual tests via server.use()
  http.get(`${BACKEND_URL}/accounts`, () => {
    return HttpResponse.json([]);
  }),
  http.get(`${BACKEND_URL}/transactions`, () => {
    return HttpResponse.json({ data: [], total: 0, page: 1, limit: 50, totalPages: 0 });
  }),
  http.get(`${BACKEND_URL}/categories`, () => {
    return HttpResponse.json([]);
  }),
  http.post(`${BACKEND_URL}/auth/login`, () => {
    return HttpResponse.json({
      user: { id: '00000000-0000-0000-0000-000000000001', name: 'Test', email: 'test@example.com' },
      accessToken: 'mock-access-token',
      refreshToken: 'mock-refresh-token',
      isDefaultPassword: false,
    });
  }),
  http.post(`${BACKEND_URL}/auth/logout`, () => {
    return HttpResponse.json(null, { status: 200 });
  }),
];
