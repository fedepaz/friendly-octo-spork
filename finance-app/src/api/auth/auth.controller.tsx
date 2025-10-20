// src/api/auth/auth.controller.tsx
import { Context } from "hono";
import { setCookie, deleteCookie } from "hono/cookie";
import { AuthService } from "./auth.service";
import { zValidator } from "@hono/zod-validator";
import { loginSchema } from "./auth.schema"; // Assuming auth.schema.ts will be created

export class AuthController {
  private authService = new AuthService();

  public login = [
    zValidator("form", loginSchema),
    async (c: Context) => {
      // Temporarily bypass password verification for development
      // const { password } = c.req.valid("form");
      // const isAuthenticated = await this.authService.verifyPassword(password);
      // if (!isAuthenticated) {
      //   c.status(401);
      //   return c.json({ error: "Invalid credentials" });
      // }

      const userId = this.authService.getAdminUserId();
      const token = await this.authService.createToken(userId);

      setCookie(c, "auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        path: "/",
        maxAge: 60 * 60 * 24, // 1 day
      });

      return c.redirect("/dashboard");
    },
  ];

  public logout = (c: Context) => {
    deleteCookie(c, "auth_token", {
      path: "/",
    });
    return c.redirect("/login");
  };
}
