// src/api/returns/returns.routes.ts

import { Hono } from "hono";
import { ReturnsController } from "./returns.controller";
import { TransactionsService } from "../transactions/transactions.service";

const returnsRoutes = new Hono();
const returnsController = new ReturnsController(new TransactionsService());

// GET /returns - Full page
returnsRoutes.get("/", returnsController.getReturnsPage);

// GET /returns/list?month=2023-01 - List of returns for a month
returnsRoutes.get("/list", returnsController.getReturnsList);

// POST /returns - Create return
returnsRoutes.post("/", returnsController.createReturn);

export default returnsRoutes;
