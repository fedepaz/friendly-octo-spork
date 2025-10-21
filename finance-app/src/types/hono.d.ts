import 'hono';

type Env = {
  Variables: {
    userId: string;
    jwtPayload: { sub: string; iat: number; exp: number };
  };
};

declare module 'hono' {
  interface ContextRenderer {
    (content: string | Promise<string>, props?: { title?: string }): Response;
  }
  interface Context extends Env {}
}
