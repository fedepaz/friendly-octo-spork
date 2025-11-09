// src/api/incomes/incomes.controller.tsx

import type { Context } from "hono";
import type { TransactionsService } from "../transactions/transactions.service";
import { ErrorPage } from "@/pages/ErrorPage";
import { TransactionPage } from "@/pages/TransactionsPage";
import { TransactionList } from "@/components/transactions/TransactionList";
import { TransactionRow } from "@/components/transactions/TransactionRow";
import { createIncomeSchema } from "./incomes.schema";

export class IncomesController {
  constructor(private transactionService: TransactionsService) {}

  // GET /incomes - Full page
  getIncomesPage = async (c: Context) => {
    try {
      const payload = c.get("jwtPayload") as { sub: string };
      const userId = payload.sub;

      const month = (c.req.query("month") as string) || this.getCurrentMonth();
      const incomes = await this.transactionService.getTransactionsByType(
        userId,
        "INCOME",
        { month }
      );

      return c.render(
        <TransactionPage
          transactions={incomes}
          currentMonth={month}
          transactionType="incomes"
          title="Ingresos"
          navItem="/incomes"
        />
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      const stack = error instanceof Error ? error.stack : undefined;
      return c.render(<ErrorPage message={message} stack={stack} />);
    }
  };

  // GET /incomes/list?month=2023-01 - List of incomes for a month
  getIncomesList = async (c: Context) => {
    try {
      const payload = c.get("jwtPayload") as { sub: string };
      const userId = payload.sub;

      const month = (c.req.query("month") as string) || this.getCurrentMonth();
      const incomes = await this.transactionService.getTransactionsByType(
        userId,
        "INCOME",
        { month }
      );

      return c.html(
        <TransactionList
          transactions={incomes}
          currentMonth={month}
          transactionType="incomes"
        />
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      const stack = error instanceof Error ? error.stack : undefined;
      return c.render(<ErrorPage message={message} stack={stack} />);
    }
  };

  // POST /incomes - Create income
  createIncome = async (c: Context) => {
    try {
      const payload = c.get("jwtPayload") as { sub: string };
      const userId = payload.sub;

      // Parse form data
      const body = await c.req.parseBody();
      const validationResult = createIncomeSchema.safeParse(body);
      if (!validationResult.success) {
        return c.render(<ErrorPage message={validationResult.error.message} />);
      }

      const income = await this.transactionService.createTransaction(
        userId,
        validationResult.data
      );

      const incomeRow = await this.transactionService.getTransactionById(
        income.id
      );

      return c.html(<TransactionRow transaction={incomeRow} />);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      const stack = error instanceof Error ? error.stack : undefined;
      return c.render(<ErrorPage message={message} stack={stack} />);
    }
  };

  private getCurrentMonth(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    return `${year}-${month}`;
  }
}
