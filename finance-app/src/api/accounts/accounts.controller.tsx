// src/api/accounts/accounts.controller.tsx

import type { Context } from "hono";
import { AccountsService } from "./accounts.service";
import { createAccountSchema } from "./accounts.schema";
import { AccountsPage } from "@/pages/AccountsPage";
import { ErrorPage } from "@/pages/ErrorPage";
import { AccountsList } from "@/components/accounts/AccountsList";
import {
  AccountForm,
  type AccountFormErrors,
} from "@/components/accounts/AccountForm";

import { AccountCard } from "@/components/accounts/AccountCard";
import { Toast } from "@/components/shared/Toast";

export class AccountsController {
  private accountService = new AccountsService();
  getAccountsPage = async (c: Context) => {
    try {
      const payload = c.get("jwtPayload") as { sub: string };
      const userId = payload.sub;
      const accounts = await this.accountService.findAccounts(userId);

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

      const body = await c.req.parseBody();
      const validation = createAccountSchema.safeParse(body);
      console.log(validation);
      if (!validation.success) {
        return c.json({ error: validation.error.flatten() }, 400);
      }
      await this.accountService.createAccount(userId, validation.data);

      const accounts = await this.accountService.findAccounts(userId);
      return c.html(
        <>
          <AccountsList accounts={accounts} />
          <Toast message="Account created successfully" type="success" />
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

  getAccountForm = async (c: Context) => {
    try {
      return c.html(<AccountForm />);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      return c.html(<Toast message={message} type="error" />);
    }
  };

  getAccountById = async (c: Context) => {
    try {
      const payload = c.get("jwtPayload") as { sub: string };
      const userId = payload.sub;
      const id = c.req.param("id");

      const account = await this.accountService.findAccountById(userId, id);

      return c.html(<AccountCard account={account} />);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      return c.html(<Toast message={message} type="error" />);
    }
  };
}
