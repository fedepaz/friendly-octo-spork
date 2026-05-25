// src/api/transactions/transactions.controller.tsx

import type { Context } from "hono";
import { TransactionsService } from "./transactions.service";
import { TransactionPage } from "@/pages/TransactionsPage";
import { ErrorPage } from "@/pages/ErrorPage";

import type { CreateTransactionInput } from "./transactions.schema";

import { AccountsService } from "../accounts/accounts.service";
import { CategoriesService } from "../categories/categories.service";
import { TransactionCard } from "@/components/transactions/TransactionCard";
import { Toast } from "@/components/shared/Toast";

import { RecurrencesService } from "../recurrences/recurrences.service";
import { TransactionNewRecurrenceForm } from "@/components/transactions/TransactionNewRecurrenceForm";
import { TransactionLinkRecurrenceForm } from "@/components/transactions/TransactionLinkRecurrenceForm";
import { TransactionForm } from "@/components/transactions/TransactionForm";

export class TransactionsController {
  private transactionService = new TransactionsService();
  private accountsService = new AccountsService();
  private categoriesService = new CategoriesService();
  private recurrencesService = new RecurrencesService();

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

  getTransactionForm = async (c: Context) => {
    try {
      const payload = c.get("jwtPayload") as { sub: string };
      const userId = payload.sub;
      const accounts = await this.accountsService.findAccounts(userId);
      const categories = await this.categoriesService.findCategories(userId);

      return c.html(
        <TransactionForm accounts={accounts} categories={categories} />,
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      return c.html(<Toast message={message} type="error" />);
    }
  };

  createTransaction = async (c: Context) => {
    try {
      const payload = c.get("jwtPayload") as { sub: string };
      const userId = payload.sub;
      const data = c.req.valid("form" as never) as CreateTransactionInput;

      await this.transactionService.createTransaction(userId, data);

      c.header("HX-Trigger", "refreshDashboard");
      return c.html(
        <>
          <Toast message="Transaction created successfully" type="success" />
          <script
            dangerouslySetInnerHTML={{
              __html: `document.getElementById("htmx-modal").style.display = "none";`,
            }}
          />
        </>,
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      return c.html(<Toast message={message} type="error" />);
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

  getTransactionNewRecurrenceForm = async (c: Context) => {
    try {
      const payload = c.get("jwtPayload") as { sub: string };
      const userId = payload.sub;
      const accounts = await this.accountsService.findAccounts(userId);
      const categories = await this.categoriesService.findCategories(userId);

      return c.html(
        <TransactionNewRecurrenceForm
          accounts={accounts}
          categories={categories}
        />,
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      return c.html(<Toast message={message} type="error" />);
    }
  };

  createTransactionWithNewRecurrence = async (c: Context) => {
    try {
      const payload = c.get("jwtPayload") as { sub: string };
      const userId = payload.sub;
      const data = c.req.valid("form" as never) as CreateTransactionInput;

      await this.transactionService.createTransaction(userId, data);

      c.header("HX-Trigger", "refreshDashboard");
      return c.html(
        <>
          <Toast message="Transaction created successfully" type="success" />
          <script
            dangerouslySetInnerHTML={{
              __html: `document.getElementById("htmx-modal").style.display = "none";`,
            }}
          />
        </>,
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      return c.html(<Toast message={message} type="error" />);
    }
  };

  getTransactionLinkRecurrenceForm = async (c: Context) => {
    try {
      const payload = c.get("jwtPayload") as { sub: string };
      const recurrenceId = c.req.param("recurrenceId");
      const userId = payload.sub;
      const accounts = await this.accountsService.findAccounts(userId);
      const categories = await this.categoriesService.findCategories(userId);
      const recurrence = await this.recurrencesService.findRecurrenceById(
        userId,
        recurrenceId,
      );
      const sourceAccountId = recurrence.sourceAccountId?.toString();
      const accountSource = await this.accountsService.findAccountById(
        userId,
        sourceAccountId ?? "",
      );
      return c.html(
        <TransactionLinkRecurrenceForm
          accounts={accounts}
          categories={categories}
          recurrence={recurrence}
          accountSource={accountSource}
        />,
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      return c.html(<Toast message={message} type="error" />);
    }
  };
  createTransactionLinkRecurrence = async (c: Context) => {
    try {
      const payload = c.get("jwtPayload") as { sub: string };
      const userId = payload.sub;
      const data = c.req.valid("form" as never) as CreateTransactionInput;

      await this.transactionService.createTransaction(userId, data);

      c.header("HX-Trigger", "refreshDashboard");
      return c.html(
        <>
          <Toast message="Transaction created successfully" type="success" />
          <script
            dangerouslySetInnerHTML={{
              __html: `document.getElementById("htmx-modal").style.display = "none";`,
            }}
          />
        </>,
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      return c.html(<Toast message={message} type="error" />);
    }
  };
}
