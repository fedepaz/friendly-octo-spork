// src/api/transactions/transactions.controller.tsx

import type { Context } from "hono";
import { TransactionsService } from "./transactions.service";
import { TransactionPage } from "@/pages/TransactionsPage";
import { ErrorPage } from "@/pages/ErrorPage";
import { TransactionRow } from "@/components/transactions/TransactionRow";
import type { CreateTransactionInput } from "./transactions.schema";
import type { TransactionType } from "@/generated/prisma";

export class TransactionsController {
  private transactionService = new TransactionsService();

  getTransactionsData = async (c: Context) => {
    try {
      const payload = c.get("jwtPayload") as { sub: string };
      const userId = payload.sub;
      const month =
        c.req.query("month") || new Date().toISOString().slice(0, 7);

      const transactions = await this.transactionService.findAllTransactions(
        userId,
        month,
      );

      const renderData = {
        transactions,
        currentMonth: month,
        transactionType: "expenses" as const,
        title: "Expenses",
      };

      return c.render(<TransactionPage {...renderData} />);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      const stack = error instanceof Error ? error.stack : undefined;
      return c.render(<ErrorPage message={message} stack={stack} />);
    }
  };

  createTransaction = async (c: Context) => {
    try {
      const payload = c.get("jwtPayload") as { sub: string };
      const userId = payload.sub;
      const data = c.req.valid("form" as never) as CreateTransactionInput;

      const transaction = await this.transactionService.createTransaction(
        userId,
        data,
      );

      c.status(201);
      return c.html(<TransactionRow transaction={transaction as any} />);
    } catch (error) {
      console.error("Error creating transaction:", error);
      const message = error instanceof Error ? error.message : "Unknown error";
      return c.html(
        <div class="alert alert-danger" role="alert">
          {message}
        </div>,
      );
    }
  };
}
