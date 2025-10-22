// src/api/auth/auth.controller.tsx

import { Context } from "hono";
import { AuthService } from "./auth.service";

import { setCookie } from "hono/cookie";
import { loginSchema } from "./auth.schema";
import { LoginPage } from "@/pages/LoginPage";
import Layout from "@/components/shared/Layout";

export class AuthController {
  private authService = new AuthService();
  getLoginPage = (c: Context) => {
    try {
      return c.render(<LoginPage />);
    } catch (error) {
      console.error("Error rendering login page:", error);
      return c.json(
        {
          error: "Internal Server Error",
          message:
            error instanceof Error
              ? error.message
              : "An unknown error occurred",
        },
        500
      );
    }
  };

  getPostLogin = async (c: Context) => {
    try {
      const body = await c.req.parseBody();
      const email = body.email as string;
      const plainPassword = body.plainPassword as string;
      console.log("Email and password:");
      console.log(email, plainPassword);
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
      console.error("Error logging in:", error);
      return c.json(
        {
          error: "Internal Server Error",
          message:
            error instanceof Error
              ? error.message
              : "An unknown error occurred",
        },
        500
      );
    }
  };
}
