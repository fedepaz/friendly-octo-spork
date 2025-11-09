// src/api/expenses/expenses.controller.tsx

import type { Context } from "hono";
import type { TransactionsService } from "../transactions/transactions.service";
import { createExpenseSchema } from "./expenses.schema";
import { ErrorPage } from "@/pages/ErrorPage";
import { TransactionPage } from "@/pages/TransactionsPage";
import { TransactionList } from "@/components/transactions/TransactionList";
import { TransactionRow } from "@/components/transactions/TransactionRow";

export class ExpensesController {
  constructor(private transactionService: TransactionsService) {}

  // GET /expenses - Full page
  getExpensesPage = async (c: Context) => {
    try {
      const payload = c.get("jwtPayload") as { sub: string };
      const userId = payload.sub;

      const month = (c.req.query("month") as string) || this.getCurrentMonth();
      const expenses = await this.transactionService.getTransactionsByType(
        userId,
        "EXPENSE",
        { month }
      );

      return c.render(
        <TransactionPage
          transactions={expenses}
          currentMonth={month}
          transactionType="expenses"
          title="Gastos"
          navItem="/expenses"
        />
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      const stack = error instanceof Error ? error.stack : undefined;
      return c.render(<ErrorPage message={message} stack={stack} />);
    }
  };

  // GET /expenses/list?month=2023-01 - List of expenses for a month
  getExpensesList = async (c: Context) => {
    try {
      const payload = c.get("jwtPayload") as { sub: string };
      const userId = payload.sub;

      const month = (c.req.query("month") as string) || this.getCurrentMonth();
      const expenses = await this.transactionService.getTransactionsByType(
        userId,
        "EXPENSE",
        { month }
      );

      return c.html(
        <TransactionList
          transactions={expenses}
          currentMonth={month}
          transactionType="expenses"
        />
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      const stack = error instanceof Error ? error.stack : undefined;
      return c.render(<ErrorPage message={message} stack={stack} />);
    }
  };

  // POST /expenses - Create expense
  createExpense = async (c: Context) => {
    try {
      const payload = c.get("jwtPayload") as { sub: string };
      const userId = payload.sub;

      // Parse form data
      const body = await c.req.parseBody();
      const validationResult = createExpenseSchema.safeParse(body);
      if (!validationResult.success) {
        return c.render(<ErrorPage message={validationResult.error.message} />);
      }

      const expenseCreated = await this.transactionService.createTransaction(
        userId,
        validationResult.data
      );

      const expense = await this.transactionService.getTransactionById(
        expenseCreated.id
      );

      return c.html(<TransactionRow transaction={expense} />);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      const stack = error instanceof Error ? error.stack : undefined;
      return c.render(<ErrorPage message={message} stack={stack} />);
    }
  };

  // Helper: Get current month in YYYY-MM format
  private getCurrentMonth(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    return `${year}-${month}`;
  }
}
