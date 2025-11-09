// src/api/investments/investments.routes.ts

import { Hono } from "hono";
import { InvestmentsController } from "./investments.controller";
import { TransactionsService } from "../transactions/transactions.service";

const investmentsRoutes = new Hono();
const investmentsController = new InvestmentsController(
  new TransactionsService()
);

// GET /investments - Full page
investmentsRoutes.get("/", investmentsController.getInvestmentsPage);

// GET /investments/list?month=2023-01 - List of investments for a month
investmentsRoutes.get("/list", investmentsController.getInvestmentsList);

// POST /investments - Create investment
investmentsRoutes.post("/", investmentsController.createInvestment);

export default investmentsRoutes;
