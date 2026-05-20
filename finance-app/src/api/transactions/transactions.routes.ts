// src/api/transactions/transactions.routes.ts

import { Hono } from "hono";
import { TransactionsController } from "./transactions.controller";
import { zValidator } from "@hono/zod-validator";
import { createTransactionSchema } from "./transactions.schema";

const transactionsRoutes = new Hono();
const transactionsController = new TransactionsController();

transactionsRoutes.get("/", transactionsController.getTransactionsData);
//transactionsRoutes.post(
//  "/",
//  zValidator("form", createTransactionSchema),
//  transactionsController.createTransaction,
//);

export default transactionsRoutes;
