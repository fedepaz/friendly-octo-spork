// src/modules/auth/interfaces/jwt-payload.interface.ts

export interface JwtPayload {
  sub: string;
  name: string;
}

export interface JwtRefreshPayload {
  sub: string;
}
