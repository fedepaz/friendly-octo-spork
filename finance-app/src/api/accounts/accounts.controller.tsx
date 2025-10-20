// src/api/accounts/accounts.controller.tsx
import { Context } from "hono";
import { zValidator } from "@hono/zod-validator";
import { AccountsService } from "./accounts.service";
import { createAccountSchema, updateAccountSchema } from "./accounts.schema";

// Assume these components exist and will be created later
// We will use placeholder functions for now
const AccountsPage = (props: any) => <div>Accounts Page</div>;
const AccountsList = (props: any) => <div>Accounts List</div>;
const AccountForm = (props: any) => <div>Account Form</div>;

export class AccountsController {
  private service = new AccountsService();

  // GET /accounts -> Renders the full page
  public getAccountsPage = async (c: Context) => {
    const userId = c.get("userId");
    const accounts = await this.service.getAccounts(userId);
    return c.render(<AccountsPage accounts={accounts} />);
  };

  // GET /api/accounts -> Returns a list of accounts (for HTMX)
  public listAccounts = async (c: Context) => {
    const userId = c.get("userId");
    const accounts = await this.service.getAccounts(userId);
    return c.html(<AccountsList accounts={accounts} />);
  };

  // POST /api/accounts -> Creates a new account
  public createAccount = [
    zValidator("form", createAccountSchema),
    async (c: Context) => {
      const userId = c.get("userId");
      const data = c.req.valid("form");

      const newAccount = await this.service.createAccount(userId, data);

      c.status(201);
      // For HTMX, we might return just the new account row or the whole list
      // For now, let's just return the new account as JSON
      return c.json(newAccount);
    },
  ];

  // GET /api/accounts/:id -> Gets a single account
  public getAccount = async (c: Context) => {
    const userId = c.get("userId");
    const id = Number(c.req.param("id"));
    const account = await this.service.getAccountById(userId, id);
    if (!account) {
      return c.json({ error: "Not Found" }, 404);
    }
    return c.json(account);
  };

  // PUT /api/accounts/:id -> Updates an account
  public updateAccount = [
    zValidator("form", updateAccountSchema),
    async (c: Context) => {
      const userId = c.get("userId");
      const id = Number(c.req.param("id"));
      const data = c.req.valid("form");

      const updatedAccount = await this.service.updateAccount(userId, id, data);

      return c.json(updatedAccount);
    },
  ];

  // DELETE /api/accounts/:id -> Deletes an account
  public deleteAccount = async (c: Context) => {
    const userId = c.get("userId");
    const id = Number(c.req.param("id"));

    await this.service.deleteAccount(userId, id);

    c.status(204);
    return c.body(null);
  };
}
