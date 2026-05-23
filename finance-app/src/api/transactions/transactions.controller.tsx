// src/api/transactions/transactions.controller.tsx

import type { Context } from "hono";
import { TransactionsService } from "./transactions.service";
import { TransactionPage } from "@/pages/TransactionsPage";
import { ErrorPage } from "@/pages/ErrorPage";

import type { CreateTransactionInput } from "./transactions.schema";
import { TransactionRow } from "@/components/transactions/TransactionRow";
import { AccountsService } from "../accounts/accounts.service";
import { CategoriesService } from "../categories/categories.service";
import { TransactionCard } from "@/components/transactions/TransactionCard";

export class TransactionsController {
  private transactionService = new TransactionsService();
  private accountsService = new AccountsService();
  private categoriesService = new CategoriesService();

  getTransactionsPage = async (c: Context) => {
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

      const transaction = await this.transactionService.createTransaction(userId, data);
      
      c.status(201);
      return c.html(<TransactionRow transaction={transaction} />);
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

  getTransactionById = async (c: Context) => {
    try {
      const payload = c.get("jwtPayload") as { sub: string };
      const userId = payload.sub;
      const id = c.req.param("id");
      const transaction = await this.transactionService.findTransactionById(
        userId,
        id,
      );

      return c.html(<TransactionCard transaction={transaction} />);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      return c.json({ error: message }, 500);
    }
  };
}
