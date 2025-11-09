// src/api/transfers/transfers.routes.ts

import { Hono } from "hono";
import { TransfersController } from "./transfers.controller";
import { TransactionsService } from "../transactions/transactions.service";

const transfersRoutes = new Hono();
const transfersController = new TransfersController(new TransactionsService());

// GET /transfers - Full page
transfersRoutes.get("/", transfersController.getTransfersPage);

// GET /transfers/list?month=2023-01 - List of transfers for a month
transfersRoutes.get("/list", transfersController.getTransfersList);

// POST /transfers - Create transfer
transfersRoutes.post("/", transfersController.createTransfer);

export default transfersRoutes;
