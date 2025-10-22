import 'hono';

declare module 'hono' {
  interface Env {
    Variables: {
      userId: string;
      jwtPayload: { sub: string; iat: number; exp: number };
    };
  }
  interface ContextRenderer {
    (content: string | Promise<string>, props?: { title?: string }): Response;
  }
}
