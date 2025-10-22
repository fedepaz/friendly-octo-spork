// src/api/accounts/accounts.controller.tsx

import { Context } from "hono";
import { AccountsService } from "./accounts.service";
import type {
  CreateAccountInput,
  GetAccountsFilterInput,
} from "./accounts.schema";
import { AccountList } from "@/components/accounts/AccountsList";

export class AccountsController {
  private accountService = new AccountsService();
  getLoginPage = async (c: Context) => {
    try {
      const payload = c.get("jwtPayload") as { sub: string };
      const userId = payload.sub;

      const query = c.req.query() as GetAccountsFilterInput;
      const accounts = await this.accountService.getAccounts(userId, query);

      const isHtmx = c.req.header("HX-Request") === "true";

      if (isHtmx) {
        return c.html(<AccountList accounts={accounts} />);
      } else {
        return c.json({
          data: accounts,
          total: accounts.length,
        });
      }
    } catch (error) {
      console.error("Error fetching accounts:", error);
      return c.json(
        {
          error: "Internal Server Error",
          message:
            error instanceof Error
              ? error.message
              : "An unknown error occurred",
        },
        500
      );
    }
  };

  getCreatePage = async (c: Context) => {
    try {
      const payload = c.get("jwtPayload") as { sub: string };
      const userId = payload.sub;

      const data: CreateAccountInput = await c.req.json();

      const account = await this.accountService.createAccount(userId, data);

      const isHtmx = c.req.header("HX-Request") === "true";
      if (isHtmx) {
        const accounts = await this.accountService.getAccounts(userId);
        return c.html(<AccountList accounts={accounts} />);
      } else {
        return c.json(
          {
            data: account,
          },
          201
        );
      }
    } catch (error) {
      console.error("Error creating account:", error);
      return c.json(
        {
          error: "Internal Server Error",
          message:
            error instanceof Error
              ? error.message
              : "An unknown error occurred",
        },
        500
      );
    }
  };
}
