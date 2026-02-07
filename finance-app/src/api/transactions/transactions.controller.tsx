// src/api/transactions/transactions.controller.tsx

import type { Context } from "hono";
import { TransactionsService } from "./transactions.service";
import { TransactionPage } from "@/pages/TransactionsPage";
import { ErrorPage } from "@/pages/ErrorPage";

export class TransactionsController {
  private transactionService = new TransactionsService();

  getTransactionsData = async (c: Context) => {
    try {
      const payload = c.get("jwtPayload") as { sub: string };
      const userId = payload.sub;
      const month = c.req.query("month");

      const data = await this.transactionService.getTransactionsByUser(userId, {
        month,
      });
      return c.render(<TransactionPage {...data} />);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      const stack = error instanceof Error ? error.stack : undefined;
      return c.render(<ErrorPage message={message} stack={stack} />);
    }
  };
}
