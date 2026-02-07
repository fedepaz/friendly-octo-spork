// src/api/transactions/transactions.routes.ts

import { Hono } from "hono";
import { TransactionsController } from "./transactions.controller";

const transactionsRoutes = new Hono();
const transactionsController = new TransactionsController();

transactionsRoutes.get("/", transactionsController.getTransactionsData);

export default transactionsRoutes;
