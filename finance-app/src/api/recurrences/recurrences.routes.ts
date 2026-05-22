// src/api/recurrences/recurrences.routes.ts

import { Hono } from "hono";
import { RecurrencesController } from "./recurrences.controller";

const recurrencesRoutes = new Hono();
const recurrencesController = new RecurrencesController();

recurrencesRoutes.get("/", recurrencesController.getRecurrences);
recurrencesRoutes.post("/", recurrencesController.createRecurrence);
recurrencesRoutes.get("/:id/edit", recurrencesController.getEditForm);
recurrencesRoutes.put("/:id", recurrencesController.updateRecurrence);
recurrencesRoutes.patch("/:id", recurrencesController.updateRecurrence);

export default recurrencesRoutes;
