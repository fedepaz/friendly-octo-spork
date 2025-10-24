// src/api/dashboard/dashboard.routes.ts

import { Hono } from "hono";
import { DashboardController } from "./dashboard.controller";

const dashboardRoutes = new Hono();
const dashboardController = new DashboardController();

dashboardRoutes.get("/", dashboardController.getDashboardData);

export default dashboardRoutes;
