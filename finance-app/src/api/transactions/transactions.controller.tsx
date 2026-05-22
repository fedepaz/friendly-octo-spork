// src/api/transactions/transactions.controller.tsx

import type { Context } from "hono";
import { TransactionsService } from "./transactions.service";
import { TransactionPage } from "@/pages/TransactionsPage";
import { ErrorPage } from "@/pages/ErrorPage";
import { TransactionRow } from "@/components/transactions/TransactionRow";
import type { CreateTransactionInput } from "./transactions.schema";
import type { TransactionType } from "@/generated/prisma";
import { AccountsService } from "../accounts/accounts.service";
import { CategoriesService } from "../categories/categories.service";

export class TransactionsController {
  private transactionService = new TransactionsService();
  private accountsService = new AccountsService();
  private categoriesService = new CategoriesService();

  getTransactionsData = async (c: Context) => {
    try {
      const payload = c.get("jwtPayload") as { sub: string };
      const userId = payload.sub;
      const month =
        c.req.query("month") || new Date().toISOString().slice(0, 7);

      const [transactions, accounts, categories] = await Promise.all([
        this.transactionService.findAllTransactions(userId, month),
        this.accountsService.findAccounts(userId),
        this.categoriesService.findCategories(userId),
      ]);

      const renderData = {
        transactions,
        accounts,
        categories,
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
