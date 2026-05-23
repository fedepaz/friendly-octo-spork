// src/api/recurrences/recurrences.controller.tsx

import type { Context } from "hono";

import { RecurrencesService } from "./recurrences.service";
import { RecurrencesPage } from "@/pages/RecurrencesPage";
import { ErrorPage } from "@/pages/ErrorPage";
import { RecurrencesList } from "@/components/recurrences/RecurrencesList";
import {
  createRecurrenceSchema,
  updateRecurrenceSchema,
} from "./recurrences.schema";
import { RecurrenceEditForm } from "@/components/recurrences/RecurrenceEditForm";
import { AccountsService } from "../accounts/accounts.service";
import { CategoriesService } from "../categories/categories.service";
import { RecurrenceCard } from "@/components/recurrences/RecurrenceCard";

export class RecurrencesController {
  private recurrenceService = new RecurrencesService();
  private accountsService = new AccountsService();
  private categoriesService = new CategoriesService();

  getRecurrences = async (c: Context) => {
    try {
      const payload = c.get("jwtPayload") as { sub: string };
      const userId = payload.sub;

      const recurrences =
        await this.recurrenceService.findAllRecurrences(userId);

      return c.render(<RecurrencesPage recurrences={recurrences} />);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      const stack = error instanceof Error ? error.stack : undefined;
      return c.render(<ErrorPage message={message} stack={stack} />);
    }
  };

  createRecurrence = async (c: Context) => {
    try {
      const payload = c.get("jwtPayload") as { sub: string };
      const userId = payload.sub;

      const body = await c.req.parseBody();

      const validation = createRecurrenceSchema.safeParse(body);

      if (!validation.success) {
        return c.json({ error: validation.error.flatten() }, 400);
      }
      await this.recurrenceService.createRecurrence(userId, validation.data);

      const recurrences =
        await this.recurrenceService.findAllRecurrences(userId);
      return c.html(<RecurrencesList recurrences={recurrences} />);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      return c.json({ error: message }, 500);
    }
  };

  getRecurrenceById = async (c: Context) => {
    try {
      const payload = c.get("jwtPayload") as { sub: string };
      const userId = payload.sub;
      const id = c.req.param("id");

      const recurrence = await this.recurrenceService.findRecurrenceById(
        userId,
        id,
      );

      return c.html(<RecurrenceCard recurrence={recurrence} />);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      return c.json({ error: message }, 500);
    }
  };

  getEditForm = async (c: Context) => {
    try {
      const payload = c.get("jwtPayload") as { sub: string };
      const userId = payload.sub;
      const id = c.req.param("id");

      const [recurrence, accounts, categories] = await Promise.all([
        this.recurrenceService.findRecurrenceById(userId, id),
        this.accountsService.findAccounts(userId),
        this.categoriesService.findCategories(userId),
      ]);

      return c.html(
        <RecurrenceEditForm
          recurrence={recurrence}
          accounts={accounts}
          categories={categories}
        />,
      );
    } catch (error) {
      return c.html(<div class="alert alert-danger">Error loading form</div>);
    }
  };

  updateRecurrence = async (c: Context) => {
    try {
      const id = c.req.param("id");
      const payload = c.get("jwtPayload") as { sub: string };
      const userId = payload.sub;

      const body = await c.req.parseBody();
      const validation = updateRecurrenceSchema.safeParse(body);

      if (!validation.success) {
        return c.json({ error: validation.error.flatten() }, 400);
      }

      await this.recurrenceService.updateRecurrence(id, validation.data);

      const recurrences =
        await this.recurrenceService.findAllRecurrences(userId);
      return c.html(<RecurrencesList recurrences={recurrences} />);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      return c.json({ error: message }, 500);
    }
  };
}
