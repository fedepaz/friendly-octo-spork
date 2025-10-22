import { Hono } from "hono";
import { AuthController } from "./auth.controller";

const authRoutes = new Hono();
const authController = new AuthController();

authRoutes.get("/", (c) => c.redirect("/login"));
authRoutes.get("/login", authController.getLoginPage);
authRoutes.post("/login", authController.getPostLogin);

export default authRoutes;
