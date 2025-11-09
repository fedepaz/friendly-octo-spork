// src/api/investments/investments.controller.tsx

import type { Context } from "hono";
import type { TransactionsService } from "../transactions/transactions.service";
import { ErrorPage } from "@/pages/ErrorPage";
import { TransactionPage } from "@/pages/TransactionsPage";
import { TransactionList } from "@/components/transactions/TransactionList";
import { TransactionRow } from "@/components/transactions/TransactionRow";
import { createInvestmentSchema } from "./investments.schema";

export class InvestmentsController {
  constructor(private transactionService: TransactionsService) {}

  // GET /investments - Full page
  getInvestmentsPage = async (c: Context) => {
    try {
      const payload = c.get("jwtPayload") as { sub: string };
      const userId = payload.sub;

      const month = (c.req.query("month") as string) || this.getCurrentMonth();
      const investments = await this.transactionService.getTransactionsByType(
        userId,
        "INVESTMENT",
        { month }
      );

      return c.render(
        <TransactionPage
          transactions={investments}
          currentMonth={month}
          transactionType="investments"
          title="Inversiones"
          navItem="/investments"
        />
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      const stack = error instanceof Error ? error.stack : undefined;
      return c.render(<ErrorPage message={message} stack={stack} />);
    }
  };

  // GET /investments/list?month=2023-01 - List of investments for a month
  getInvestmentsList = async (c: Context) => {
    try {
      const payload = c.get("jwtPayload") as { sub: string };
      const userId = payload.sub;

      const month = (c.req.query("month") as string) || this.getCurrentMonth();
      const investments = await this.transactionService.getTransactionsByType(
        userId,
        "INVESTMENT",
        { month }
      );

      return c.html(
        <TransactionList
          transactions={investments}
          currentMonth={month}
          transactionType="investments"
        />
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      const stack = error instanceof Error ? error.stack : undefined;
      return c.render(<ErrorPage message={message} stack={stack} />);
    }
  };

  // POST /investments - Create investment
  createInvestment = async (c: Context) => {
    try {
      const payload = c.get("jwtPayload") as { sub: string };
      const userId = payload.sub;

      // Parse form data
      const body = await c.req.parseBody();
      const validationResult = createInvestmentSchema.safeParse(body);
      if (!validationResult.success) {
        return c.render(<ErrorPage message={validationResult.error.message} />);
      }

      const investment = await this.transactionService.createTransaction(
        userId,
        validationResult.data
      );

      const investmentRow = await this.transactionService.getTransactionById(
        investment.id
      );

      return c.html(<TransactionRow transaction={investmentRow} />);
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
