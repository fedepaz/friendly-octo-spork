// src/api/transactions/transactions.routes.ts

import { Hono } from "hono";
import { TransactionsController } from "./transactions.controller";

const transactionsRoutes = new Hono();
const transactionController = new TransactionsController();

// GET /api/transactions - Full page
transactionsRoutes.get("/", transactionController.getTransactionsPage);

// POST /api/transactions - Create transaction
transactionsRoutes.post("/", transactionController.createTransaction);

// DELETE /api/transactions/:id - Delete transaction
transactionsRoutes.delete("/:id", transactionController.deleteTransaction);

export default transactionsRoutes;
