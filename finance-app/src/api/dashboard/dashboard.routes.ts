// src/api/dashboard/dashboard.routes.ts
import { Hono } from "hono";
import { DashboardController } from "./dashboard.controller";

const dashboardRoutes = new Hono();
const controller = new DashboardController();

// Page route
dashboardRoutes.get("/", controller.getDashboardPage);

// API routes for partial updates
dashboardRoutes.get("/api/dashboard/stats", controller.getMonthlyStats);
dashboardRoutes.get("/api/dashboard/chart", controller.getMonthlyChart);
dashboardRoutes.get("/api/dashboard/recent", controller.getRecentActivity);

export default dashboardRoutes;