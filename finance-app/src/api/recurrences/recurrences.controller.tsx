// src/api/recurrences/recurrences.controller.tsx

import type { Context } from "hono";

import { RecurrencesService } from "./recurrences.service";
import { RecurrencesPage } from "@/pages/RecurrencesPage";
import { ErrorPage } from "@/pages/ErrorPage";
import { RecurrenceForm } from "@/components/recurrences/RecurrenceForm";

export class RecurrencesController {
  private recurrenceService = new RecurrencesService();

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

  getRecurrenceForm = async (c: Context) => {
    return c.html(<RecurrenceForm />);
  };
}
