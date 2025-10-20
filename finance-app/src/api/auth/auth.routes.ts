// src/api/auth/auth.routes.ts
import { Hono } from "hono";
import { AuthController } from "./auth.controller";

const authRoutes = new Hono();
const controller = new AuthController();

authRoutes.post("/login", ...controller.login);
authRoutes.get("/logout", controller.logout);

export default authRoutes;
