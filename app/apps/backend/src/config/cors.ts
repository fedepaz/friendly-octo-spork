// src/config/cors.ts

// Cross-origin PATCH must be allowed: the change-password and permissions-save
// flows issue PATCH requests from the frontend origin (see issue #67).
export const CORS_METHODS = ['GET', 'POST', 'PATCH', 'OPTIONS'] as const;

export function buildCorsOptions(corsOrigins: string[]) {
  return {
    origin: corsOrigins,
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: [...CORS_METHODS],
  };
}
