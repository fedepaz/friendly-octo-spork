// src/api/recurrences/recurrences.routes.ts

import { Hono } from "hono";
import { RecurrencesController } from "./recurrences.controller";

const recurrencesRoutes = new Hono();
const recurrencesController = new RecurrencesController();

recurrencesRoutes.get("/", recurrencesController.getRecurrences);
recurrencesRoutes.get("/new", recurrencesController.getRecurrenceForm);

export default recurrencesRoutes;
