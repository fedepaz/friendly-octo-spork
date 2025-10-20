import { Context } from "hono";
import { zValidator } from "@hono/zod-validator";
import { TransactionsService } from "./transactions.service";
import {
  createTransactionSchema,
  updateTransactionSchema,
  transactionFilterSchema,
} from "./transactions.schema";
import { TransactionRow } from "../../components/transactions/TransactionRow";
import { TransactionForm } from "../../components/transactions/TransactionForm";
import { TransactionsList } from "../../components/transactions/TransactionsList";
import { TransactionsPage } from "../../pages/TransactionsPage";

export class TransactionsController {
  private transactionsService = new TransactionsService();

  /**
   * GET / - Render full transactions page
   */
  getTransactionsPage = async (c: Context) => {
    const userId = c.get("userId");
    const filters = transactionFilterSchema.parse(c.req.query());

    const { transactions, total, hasMore } =
      await this.transactionsService.getTransactions(userId, filters);

    // Get accounts and categories for filters
    const accounts = await prisma.account.findMany({ where: { userId } });
    const categories = await prisma.category.findMany({ where: { userId } });

    return c.render(
      <TransactionsPage
        transactions={transactions}
        total={total}
        hasMore={hasMore}
        accounts={accounts}
        categories={categories}
      />
    );
  };

  /**
   * GET / (HTMX) - Get transactions list partial
   */
  getTransactionsList = async (c: Context) => {
    const userId = c.get("userId");
    const filters = transactionFilterSchema.parse(c.req.query());

    const { transactions, total, hasMore } =
      await this.transactionsService.getTransactions(userId, filters);

    return c.html(
      <TransactionsList
        transactions={transactions}
        total={total}
        hasMore={hasMore}
      />
    );
  };

  /**
   * POST / - Create new transaction
   */
  createTransaction = [
    zValidator("form", createTransactionSchema),
    async (c: Context) => {
      const userId = c.get("userId");
      const data = c.req.valid("form");

      const transaction = await this.transactionsService.createTransaction(
        userId,
        data
      );

      c.status(201);
      return c.html(<TransactionRow transaction={transaction} />);
    },
  ];

  /**
   * GET /:id - Get transaction details
   */
  getTransaction = async (c: Context) => {
    const userId = c.get("userId");
    const transactionId = Number(c.req.param("id"));

    const transaction = await this.transactionsService.getTransactionById(
      userId,
      transactionId
    );

    return c.json({ data: transaction });
  };

  /**
   * GET /:id/edit - Get edit form (HTMX)
   */
  getTransactionEditForm = async (c: Context) => {
    const userId = c.get("userId");
    const transactionId = Number(c.req.param("id"));

    const transaction = await this.transactionsService.getTransactionById(
      userId,
      transactionId
    );

    // Get accounts and categories for select options
    const accounts = await prisma.account.findMany({ where: { userId } });
    const categories = await prisma.category.findMany({ where: { userId } });

    return c.html(
      <TransactionForm
        transaction={transaction}
        accounts={accounts}
        categories={categories}
        isEdit={true}
      />
    );
  };

  /**
   * PUT /:id - Update transaction
   */
  updateTransaction = [
    zValidator("form", updateTransactionSchema),
    async (c: Context) => {
      const userId = c.get("userId");
      const transactionId = Number(c.req.param("id"));
      const data = c.req.valid("form");

      const transaction = await this.transactionsService.updateTransaction(
        userId,
        transactionId,
        data
      );

      return c.html(<TransactionRow transaction={transaction} />);
    },
  ];

  /**
   * DELETE /:id - Delete transaction
   */
  deleteTransaction = async (c: Context) => {
    const userId = c.get("userId");
    const transactionId = Number(c.req.param("id"));

    await this.transactionsService.deleteTransaction(userId, transactionId);

    c.status(204);
    return c.body(null);
  };
}
