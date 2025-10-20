// src/api/transactions/transactions.routes.ts
import { Hono } from "hono";
import { TransactionsController } from "./transactions.controller";

const transactionsRoutes = new Hono();
const controller = new TransactionsController();

// Page route
transactionsRoutes.get("/", controller.getTransactionsPage);

// API routes
transactionsRoutes.get("/api/transactions", controller.listTransactions);
transactionsRoutes.post("/api/transactions", ...controller.createTransaction);
transactionsRoutes.get("/api/transactions/:id", controller.getTransaction);
transactionsRoutes.put("/api/transactions/:id", ...controller.updateTransaction);
transactionsRoutes.delete("/api/transactions/:id", controller.deleteTransaction);
transactionsRoutes.get("/api/transactions/:id/edit", controller.getEditForm); // HTMX edit form

export default transactionsRoutes;