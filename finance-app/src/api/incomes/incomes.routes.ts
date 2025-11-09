// src/api/incomes/incomes.routes.ts

import { Hono } from "hono";
import { IncomesController } from "./incomes.controller";
import { TransactionsService } from "../transactions/transactions.service";

const incomesRoutes = new Hono();
const incomesController = new IncomesController(new TransactionsService());

// GET /incomes - Full page
incomesRoutes.get("/", incomesController.getIncomesPage);

// GET /incomes/list?month=2023-01 - List of incomes for a month
incomesRoutes.get("/list", incomesController.getIncomesList);

// POST /incomes - Create income
incomesRoutes.post("/", incomesController.createIncome);

export default incomesRoutes;
