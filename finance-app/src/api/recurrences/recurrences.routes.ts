// src/api/recurrences/recurrences.routes.ts
import { Hono } from "hono";
import { RecurrencesController } from "./recurrences.controller";

const recurrencesRoutes = new Hono();
const controller = new RecurrencesController();

// Page route
recurrencesRoutes.get("/", controller.getRecurrencesPage);

// API routes
recurrencesRoutes.get("/api/recurrences", controller.listRecurrences);
recurrencesRoutes.post("/api/recurrences", ...controller.createRecurrence);
recurrencesRoutes.get("/api/recurrences/:id", controller.getRecurrence);
recurrencesRoutes.put("/api/recurrences/:id", ...controller.updateRecurrence);
recurrencesRoutes.delete("/api/recurrences/:id", controller.deleteRecurrence);
recurrencesRoutes.put("/api/recurrences/:id/pause", controller.pauseRecurrence);
recurrencesRoutes.put("/api/recurrences/:id/resume", controller.resumeRecurrence);
recurrencesRoutes.post("/api/recurrences/:id/execute", controller.executeRecurrence);

export default recurrencesRoutes;