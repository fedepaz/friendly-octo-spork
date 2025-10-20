// src/api/transactions/transactions.controller.tsx
import { Context } from "hono";
import { zValidator } from "@hono/zod-validator";
import { TransactionsService } from "./transactions.service";
import { createTransactionSchema, updateTransactionSchema, transactionFilterSchema } from "./transactions.schema";

// Assume these components exist and will be created later
const TransactionsPage = (props: any) => <div>Transactions Page</div>;
const TransactionsList = (props: any) => <div>Transactions List</div>;
const TransactionForm = (props: any) => <div>Transaction Form</div>;
const TransactionFilters = (props: any) => <div>Transaction Filters</div>;
const TransactionRow = (props: any) => <div>Transaction Row</div>;

export class TransactionsController {
  private service = new TransactionsService();

  // GET /transactions -> Renders the full page
  public getTransactionsPage = async (c: Context) => {
    const userId = c.get("userId");
    const filters = c.req.query();
    const transactions = await this.service.getTransactions(userId, filters);
    return c.render(<TransactionsPage transactions={transactions} filters={filters} />);
  };

  // GET /api/transactions -> Returns a list of transactions (for HTMX)
  public listTransactions = async (c: Context) => {
    const userId = c.get("userId");
    const filters = c.req.query();
    const transactions = await this.service.getTransactions(userId, filters);
    return c.html(<TransactionsList transactions={transactions} />);
  };

  // POST /api/transactions -> Creates a new transaction
  public createTransaction = [
    zValidator("form", createTransactionSchema),
    async (c: Context) => {
      const userId = c.get("userId");
      const data = c.req.valid("form");

      const newTransaction = await this.service.createTransaction(userId, data);

      c.status(201);
      return c.html(<TransactionRow transaction={newTransaction} />);
    },
  ];

  // GET /api/transactions/:id -> Gets a single transaction
  public getTransaction = async (c: Context) => {
    const userId = c.get("userId");
    const id = Number(c.req.param("id"));
    const transaction = await this.service.getTransactionById(userId, id);
    if (!transaction) {
      return c.json({ error: "Not Found" }, 404);
    }
    return c.json(transaction);
  };

  // PUT /api/transactions/:id -> Updates a transaction
  public updateTransaction = [
    zValidator("form", updateTransactionSchema),
    async (c: Context) => {
      const userId = c.get("userId");
      const id = Number(c.req.param("id"));
      const data = c.req.valid("form");

      const updatedTransaction = await this.service.updateTransaction(userId, id, data);

      return c.html(<TransactionRow transaction={updatedTransaction} />);
    },
  ];

  // DELETE /api/transactions/:id -> Deletes a transaction
  public deleteTransaction = async (c: Context) => {
    const userId = c.get("userId");
    const id = Number(c.req.param("id"));

    await this.service.deleteTransaction(userId, id);

    c.status(204);
    return c.body(null);
  };

  // GET /api/transactions/:id/edit -> Returns edit form (HTMX)
  public getEditForm = async (c: Context) => {
    const userId = c.get("userId");
    const id = Number(c.req.param("id"));
    const transaction = await this.service.getTransactionById(userId, id);
    if (!transaction) {
      return c.html(<div>Transaction not found</div>, 404);
    }
    // Assuming an EditForm component exists
    return c.html(<div>Edit Form for {transaction.description}</div>);
  };
}
