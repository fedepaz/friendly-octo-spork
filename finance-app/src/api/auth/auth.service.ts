// src/api/auth/auth.service.ts
import { sign } from "hono/jwt";

export class AuthService {
  private readonly JWT_SECRET: string;
  private readonly ADMIN_USERNAME: string;
  private readonly ADMIN_PASSWORD_HASH: string;

  constructor() {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }
    if (!process.env.ADMIN_USERNAME) {
      throw new Error("ADMIN_USERNAME is not defined");
    }
    if (!process.env.ADMIN_PASSWORD_HASH) {
      throw new Error("ADMIN_PASSWORD_HASH is not defined");
    }
    this.JWT_SECRET = process.env.JWT_SECRET;
    this.ADMIN_USERNAME = process.env.ADMIN_USERNAME;
    this.ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH;
  }

  async verifyPassword(password: string): Promise<boolean> {
    // Bun.password.verify is optimized for bcrypt
    return await Bun.password.verify(password, this.ADMIN_PASSWORD_HASH);
  }

  async createToken(userId: string): Promise<string> {
    const payload = {
      sub: userId,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 24 hour expiry
    };
    return await sign(payload, this.JWT_SECRET);
  }

  getAdminUserId(): string {
    return this.ADMIN_USERNAME;
  }
}
