import { Hono } from "hono";
import { AuthController } from "./auth.controller";
import { getCookie } from "hono/cookie";
import { verify } from "hono/jwt";

const authRoutes = new Hono();
const authController = new AuthController();

authRoutes.get("/", async (c) => {
  const token = getCookie(c, "auth_token");
  if (!token) {
    return c.redirect("/login");
  }
  const payload = await verify(token, process.env.JWT_SECRET || "");
  if (!payload) {
    return c.redirect("/login");
  }
  return c.redirect("/dashboard");
});
authRoutes.get("/login", authController.getLoginPage);
authRoutes.post("/login", authController.getPostLogin);

export default authRoutes;
