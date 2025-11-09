// src/api/transfers/transfers.controller.tsx

import type { Context } from "hono";
import type { TransactionsService } from "../transactions/transactions.service";
import { ErrorPage } from "@/pages/ErrorPage";
import { TransactionPage } from "@/pages/TransactionsPage";
import { TransactionList } from "@/components/transactions/TransactionList";
import { TransactionRow } from "@/components/transactions/TransactionRow";
import { createTransferSchema } from "./transfers.schema";

export class TransfersController {
  constructor(private transactionService: TransactionsService) {}

  // GET /transfers - Full page
  getTransfersPage = async (c: Context) => {
    try {
      const payload = c.get("jwtPayload") as { sub: string };
      const userId = payload.sub;

      const month = (c.req.query("month") as string) || this.getCurrentMonth();
      const transfers = await this.transactionService.getTransactionsByType(
        userId,
        "TRANSFER",
        { month }
      );

      return c.render(
        <TransactionPage
          transactions={transfers}
          currentMonth={month}
          transactionType="transfers"
          title="Transferencias"
          navItem="/transfers"
        />
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      const stack = error instanceof Error ? error.stack : undefined;
      return c.render(<ErrorPage message={message} stack={stack} />);
    }
  };

  // GET /transfers/list?month=2023-01 - List of transfers for a month
  getTransfersList = async (c: Context) => {
    try {
      const payload = c.get("jwtPayload") as { sub: string };
      const userId = payload.sub;

      const month = (c.req.query("month") as string) || this.getCurrentMonth();
      const transfers = await this.transactionService.getTransactionsByType(
        userId,
        "TRANSFER",
        { month }
      );

      return c.html(
        <TransactionList
          transactions={transfers}
          currentMonth={month}
          transactionType="transfers"
        />
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      const stack = error instanceof Error ? error.stack : undefined;
      return c.render(<ErrorPage message={message} stack={stack} />);
    }
  };

  // POST /transfers - Create transfer
  createTransfer = async (c: Context) => {
    try {
      const payload = c.get("jwtPayload") as { sub: string };
      const userId = payload.sub;

      // Parse form data
      const body = await c.req.parseBody();
      const validationResult = createTransferSchema.safeParse(body);
      if (!validationResult.success) {
        return c.render(<ErrorPage message={validationResult.error.message} />);
      }

      const transfer = await this.transactionService.createTransaction(
        userId,
        validationResult.data
      );

      const transferRow = await this.transactionService.getTransactionById(
        transfer.id
      );

      return c.html(<TransactionRow transaction={transferRow} />);
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
