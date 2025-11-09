// src/api/payments/payments.controller.tsx

import type { Context } from "hono";
import type { TransactionsService } from "../transactions/transactions.service";
import { ErrorPage } from "@/pages/ErrorPage";
import { TransactionPage } from "@/pages/TransactionsPage";
import { TransactionList } from "@/components/transactions/TransactionList";
import { TransactionRow } from "@/components/transactions/TransactionRow";
import { createPaymentSchema } from "./payments.schema";

export class PaymentsController {
  constructor(private transactionService: TransactionsService) {}

  // GET /payments - Full page
  getPaymentsPage = async (c: Context) => {
    try {
      const payload = c.get("jwtPayload") as { sub: string };
      const userId = payload.sub;

      const month = (c.req.query("month") as string) || this.getCurrentMonth();
      const payments = await this.transactionService.getTransactionsByType(
        userId,
        "PAYMENT",
        { month }
      );

      return c.render(
        <TransactionPage
          transactions={payments}
          currentMonth={month}
          transactionType="payments"
          title="Pagos"
          navItem="/payments"
        />
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      const stack = error instanceof Error ? error.stack : undefined;
      return c.render(<ErrorPage message={message} stack={stack} />);
    }
  };

  // GET /payments/list?month=2023-01 - List of payments for a month
  getPaymentsList = async (c: Context) => {
    try {
      const payload = c.get("jwtPayload") as { sub: string };
      const userId = payload.sub;

      const month = (c.req.query("month") as string) || this.getCurrentMonth();
      const payments = await this.transactionService.getTransactionsByType(
        userId,
        "PAYMENT",
        { month }
      );

      return c.html(
        <TransactionList
          transactions={payments}
          currentMonth={month}
          transactionType="payments"
        />
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      const stack = error instanceof Error ? error.stack : undefined;
      return c.render(<ErrorPage message={message} stack={stack} />);
    }
  };

  // POST /payments - Create payment
  createPayment = async (c: Context) => {
    try {
      const payload = c.get("jwtPayload") as { sub: string };
      const userId = payload.sub;

      // Parse form data
      const body = await c.req.parseBody();
      const validationResult = createPaymentSchema.safeParse(body);
      if (!validationResult.success) {
        return c.render(<ErrorPage message={validationResult.error.message} />);
      }

      const payment = await this.transactionService.createTransaction(
        userId,
        validationResult.data
      );

      const paymentRow = await this.transactionService.getTransactionById(
        payment.id
      );

      return c.html(<TransactionRow transaction={paymentRow} />);
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
