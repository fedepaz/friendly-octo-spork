// src/api/auth/auth.controller.tsx

import { Context } from "hono";
import { AuthService } from "./auth.service";

import { setCookie } from "hono/cookie";
import { loginSchema } from "./auth.schema";
import { LoginPage } from "@/pages/LoginPage";
import Layout from "@/components/shared/Layout";
import { ErrorPage } from "@/pages/ErrorPage";

export class AuthController {
  private authService = new AuthService();
  getLoginPage = (c: Context) => {
    try {
      return c.render(<LoginPage />);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      const stack = error instanceof Error ? error.stack : undefined;
      return c.render(
        <ErrorPage message={message} stack={stack} statusCode={500} />
      );
    }
  };

  getPostLogin = async (c: Context) => {
    try {
      const body = await c.req.parseBody();
      const email = body.email as string;
      const plainPassword = body.password as string;

      const safeParsed = loginSchema.safeParse({ email, plainPassword });

      if (!safeParsed.success) {
        return c.json(safeParsed.error, 400);
      }

      const token = await this.authService.login({
        email,
        plainPassword,
      });
      setCookie(c, "auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      });

      return c.render(<Layout />);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      const stack = error instanceof Error ? error.stack : undefined;

      return c.render(<ErrorPage message={message} stack={stack} />);
    }
  };
}
