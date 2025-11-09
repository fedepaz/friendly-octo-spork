// src/api/payments/payments.routes.ts

import { Hono } from "hono";
import { PaymentsController } from "./payments.controller";
import { TransactionsService } from "../transactions/transactions.service";

const paymentsRoutes = new Hono();
const paymentsController = new PaymentsController(new TransactionsService());

// GET /payments - Full page
paymentsRoutes.get("/", paymentsController.getPaymentsPage);

// GET /payments/list?month=2023-01 - List of payments for a month
paymentsRoutes.get("/list", paymentsController.getPaymentsList);

// POST /payments - Create payment
paymentsRoutes.post("/", paymentsController.createPayment);

export default paymentsRoutes;
