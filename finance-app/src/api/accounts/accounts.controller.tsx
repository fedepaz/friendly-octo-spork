// src/api/accounts/accounts.controller.tsx

import { Context } from "hono";
import { AccountsService } from "./accounts.service";
import type {
  CreateAccountInput,
  GetAccountsFilterInput,
} from "./accounts.schema";
import { AccountList } from "@/components/accounts/AccountsList";
import { ErrorPage } from "@/pages/ErrorPage";

export class AccountsController {
  private accountService = new AccountsService();
  getLoginPage = async (c: Context) => {
    try {
      const payload = c.get("jwtPayload") as { sub: string };
      const userId = payload.sub;

      const query = c.req.query() as GetAccountsFilterInput;
      const accounts = await this.accountService.getAccounts(userId, query);

      return c.render(<AccountList accounts={accounts} />);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      const stack = error instanceof Error ? error.stack : undefined;
      return c.render(<ErrorPage message={message} stack={stack} />);
    }
  };

  getCreatePage = async (c: Context) => {
    try {
      const payload = c.get("jwtPayload") as { sub: string };
      const userId = payload.sub;

      const data: CreateAccountInput = await c.req.json();

      const account = await this.accountService.createAccount(userId, data);

      const accounts = await this.accountService.getAccounts(userId);
      return c.render(<AccountList accounts={accounts} />);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      const stack = error instanceof Error ? error.stack : undefined;
      return c.render(<ErrorPage message={message} stack={stack} />);
    }
  };
}
