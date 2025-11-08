// src/api/expenses/expenses.routes.ts

import { Hono } from "hono";
import { ExpensesController } from "./expenses.controller";
import { TransactionsService } from "../transactions/transactions.service";

const expensesRoutes = new Hono();
const expensesController = new ExpensesController(new TransactionsService());

// GET /expenses - Full page
expensesRoutes.get("/", expensesController.getExpensesPage);

// GET /expenses/list?month=2023-01 - List of expenses for a month
expensesRoutes.get("/list", expensesController.getExpensesList);

// POST /expenses - Create expense
expensesRoutes.post("/", expensesController.createExpense);

export default expensesRoutes;
