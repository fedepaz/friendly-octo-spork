import { Hono } from "hono";

import createDashboardController from "./dashboard.controller";

const dashboardRoutes = new Hono();

dashboardRoutes.get("/", createDashboardController);

export default dashboardRoutes;
