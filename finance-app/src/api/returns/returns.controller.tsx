// src/api/returns/returns.controller.tsx

import type { Context } from "hono";
import type { TransactionsService } from "../transactions/transactions.service";
import { ErrorPage } from "@/pages/ErrorPage";
import { TransactionPage } from "@/pages/TransactionsPage";
import { TransactionList } from "@/components/transactions/TransactionList";
import { TransactionRow } from "@/components/transactions/TransactionRow";
import { createReturnSchema } from "./returns.schema";

export class ReturnsController {
  constructor(private transactionService: TransactionsService) {}

  // GET /returns - Full page
  getReturnsPage = async (c: Context) => {
    try {
      const payload = c.get("jwtPayload") as { sub: string };
      const userId = payload.sub;

      const month = (c.req.query("month") as string) || this.getCurrentMonth();
      const returns = await this.transactionService.getTransactionsByType(
        userId,
        "RETURN",
        { month }
      );

      return c.render(
        <TransactionPage
          transactions={returns}
          currentMonth={month}
          transactionType="returns"
          title="Devoluciones"
          navItem="/returns"
        />
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      const stack = error instanceof Error ? error.stack : undefined;
      return c.render(<ErrorPage message={message} stack={stack} />);
    }
  };

  // GET /returns/list?month=2023-01 - List of returns for a month
  getReturnsList = async (c: Context) => {
    try {
      const payload = c.get("jwtPayload") as { sub: string };
      const userId = payload.sub;

      const month = (c.req.query("month") as string) || this.getCurrentMonth();
      const returns = await this.transactionService.getTransactionsByType(
        userId,
        "RETURN",
        { month }
      );

      return c.html(
        <TransactionList
          transactions={returns}
          currentMonth={month}
          transactionType="returns"
        />
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      const stack = error instanceof Error ? error.stack : undefined;
      return c.render(<ErrorPage message={message} stack={stack} />);
    }
  };

  // POST /returns - Create return
  createReturn = async (c: Context) => {
    try {
      const payload = c.get("jwtPayload") as { sub: string };
      const userId = payload.sub;

      // Parse form data
      const body = await c.req.parseBody();
      const validationResult = createReturnSchema.safeParse(body);
      if (!validationResult.success) {
        return c.render(<ErrorPage message={validationResult.error.message} />);
      }

      const returnCreated = await this.transactionService.createTransaction(
        userId,
        validationResult.data
      );

      const returnRow = await this.transactionService.getTransactionById(
        returnCreated.id
      );

      return c.html(<TransactionRow transaction={returnRow} />);
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
