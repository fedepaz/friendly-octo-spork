// src/api/accounts/accounts.controller.tsx

import type { Context } from "hono";
import { AccountsService } from "./accounts.service";
import type { AccountFilterInput, CreateAccountInput } from "./accounts.schema";
import { AccountsPage } from "@/pages/AccountsPage";
import { ErrorPage } from "@/pages/ErrorPage";
import { AccountsList } from "@/components/accounts/AccountsList";
import { AccountForm } from "@/components/accounts/AccountForm";
import type { AccountType, Currency } from "@/generated/prisma";

export class AccountsController {
  private accountService = new AccountsService();
  getAccountsPage = async (c: Context) => {
    try {
      const payload = c.get("jwtPayload") as { sub: string };
      const userId = payload.sub;

      const query = c.req.query() as AccountFilterInput;
      const accounts = await this.accountService.getAccounts(userId, query);

      return c.render(<AccountsPage accounts={accounts} />);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      const stack = error instanceof Error ? error.stack : undefined;
      return c.render(<ErrorPage message={message} stack={stack} />);
    }
  };

  createAccount = async (c: Context) => {
    try {
      const payload = c.get("jwtPayload") as { sub: string };
      const userId = payload.sub;

      // Parse form data for HTMX requests
      const contentType = c.req.header("content-type");
      let data: CreateAccountInput;

      if (contentType?.includes("application/json")) {
        data = await c.req.json();
      } else {
        // Handle form data from HTMX
        const formData = await c.req.parseBody();
        data = {
          name: formData.name as string,
          type: formData.type as AccountType,
          currency: formData.currency as Currency,
          balance: parseFloat(formData.balance as string) || 0,
        };
      }

      await this.accountService.createAccount(userId, data);

      const accounts = await this.accountService.getAccounts(userId);
      return c.html(<AccountsList accounts={accounts} />);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      const stack = error instanceof Error ? error.stack : undefined;
      return c.render(<ErrorPage message={message} stack={stack} />);
    }
  };

  getAccountForm = async (c: Context) => {
    return c.html(<AccountForm />);
  };
}
