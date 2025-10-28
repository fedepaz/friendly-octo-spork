// src/api/transactions/transactions.controller.tsx

import type { Context } from "hono";
import { TransactionsService } from "./transactions.service";
import { TransactionForm } from "@/components/transactions/TransactionForm";
import { TransactionRow } from "@/components/transactions/TransactionRow";
import { ErrorPage } from "@/pages/ErrorPage";
import { TransactionsPage } from "@/pages/TransactionsPage";
import { ZodError, z } from "zod";
import {
  createTransactionSchema,
  validateTransactionType,
} from "./transactions.schema";

export class TransactionsController {
  private transactionService = new TransactionsService();

  // GET /transactions - Full page
  getTransactionsPage = async (c: Context) => {
    try {
      const payload = c.get("jwtPayload") as { sub: string };
      const userId = payload.sub;

      const [transactions, categories, accounts, recurrences] =
        await Promise.all([
          this.transactionService.getTransactions(userId),
          this.transactionService.getCategories(userId),
          this.transactionService.getAccounts(userId),
          this.transactionService.getActiveRecurrences(userId),
        ]);

      return c.render(
        <TransactionsPage
          data={{ transactions, categories, accounts, recurrences }}
        />
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      const stack = error instanceof Error ? error.stack : undefined;
      return c.render(<ErrorPage message={message} stack={stack} />);
    }
  };

  // POST /transactions - Create transaction (HTMX)
  createTransaction = async (c: Context) => {
    try {
      const payload = c.get("jwtPayload") as { sub: string };
      const userId = payload.sub;

      // Parse form data
      const formData = await c.req.parseBody();

      // Convert empty strings to null for optional fields
      const rawData = {
        type: formData.type as string,
        amount: Number(formData.amount),
        date: new Date(formData.date as string),
        description: formData.description as string,
        categoryId: formData.categoryId ? Number(formData.categoryId) : null,
        sourceAccountId: formData.sourceAccountId
          ? Number(formData.sourceAccountId)
          : null,
        targetAccountId: formData.targetAccountId
          ? Number(formData.targetAccountId)
          : null,
        recurrenceId: formData.recurrenceId
          ? Number(formData.recurrenceId)
          : null,
        metadata: formData.metadata
          ? (JSON.parse(formData.metadata as string) as Record<string, unknown>)
          : null,
      };

      // Validate with Zod
      const validatedData = createTransactionSchema.parse(rawData);

      // Type-specific validation
      const { isValid, errors } = validateTransactionType(validatedData);

      if (!isValid) {
        // Return form with errors
        const [categories, accounts, recurrences] = await Promise.all([
          this.transactionService.getCategories(userId),
          this.transactionService.getAccounts(userId),
          this.transactionService.getActiveRecurrences(userId),
        ]);

        return c.html(
          <TransactionForm
            categories={categories}
            accounts={accounts}
            recurrences={recurrences}
            errors={errors}
          />,
          400
        );
      }

      // Create transaction (with balance updates)
      const transaction = await this.transactionService.createTransaction(
        userId,
        validatedData
      );

      // Return ONLY the new transaction row (HTMX will prepend it)
      return c.html(<TransactionRow transaction={transaction} />);
    } catch (error) {
      if (error instanceof ZodError) {
        // Validation errors
        const [categories, accounts, recurrences] = await Promise.all([
          this.transactionService.getCategories(this.getUserId(c)),
          this.transactionService.getAccounts(this.getUserId(c)),
          this.transactionService.getActiveRecurrences(this.getUserId(c)),
        ]);

        const formErrors: Record<string, string> = {};
        for (const err of error.issues) {
          if (err.path[0]) {
            formErrors[String(err.path[0])] = err.message;
          }
        }

        return c.html(
          <TransactionForm
            categories={categories}
            accounts={accounts}
            recurrences={recurrences}
            errors={formErrors}
          />,
          400
        );
      }

      // Database or other errors
      const message = error instanceof Error ? error.message : "Unknown error";
      return c.html(
        <div class="bg-destructive text-destructive-foreground p-4 border-2 border-border">
          <strong>Error:</strong> {message}
        </div>,
        500
      );
    }
  };

  // DELETE /transactions/:id
  deleteTransaction = async (c: Context) => {
    try {
      const payload = c.get("jwtPayload") as { sub: string };
      const userId = payload.sub;
      const transactionId = parseInt(c.req.param("id"));

      await this.transactionService.deleteTransaction(userId, transactionId);

      // Return empty content (HTMX will remove the row)
      return c.html("", 200);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      return c.html(
        <div class="bg-destructive text-destructive-foreground p-4">
          {message}
        </div>,
        500
      );
    }
  };

  // Helper
  private getUserId(c: Context): string {
    const payload = c.get("jwtPayload") as { sub: string };
    return payload.sub;
  }
}
