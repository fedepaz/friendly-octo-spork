// src/api/recurrences/recurrences.controller.tsx

import type { Context } from "hono";

import { RecurrencesService } from "./recurrences.service";
import { RecurrencesPage } from "@/pages/RecurrencesPage";
import { ErrorPage } from "@/pages/ErrorPage";
import { RecurrenceForm } from "@/components/recurrences/RecurrenceForm";
import { RecurrencesList } from "@/components/recurrences/RecurrencesList";
import { updateRecurrenceSchema } from "./recurrences.schema";

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

  createRecurrence = async (c: Context) => {
    try {
      const payload = c.get("jwtPayload") as { sub: string };
      const userId = payload.sub;

      const body = await c.req.parseBody();
      // Simple parse for now, can add full schema validation if needed
      const data = {
        name: body.name as string,
        amount: Number(body.amount),
        frequency: body.frequency as any,
        totalParts: Number(body.totalParts),
        currentPart: Number(body.currentPart),
        startDate: body.startDate as string,
        type: "EXPENSE" as any, // Default to expense for now or get from body
      };

      await this.recurrenceService.createRecurrence(userId, data);

      const recurrences = await this.recurrenceService.findAllRecurrences(userId);
      return c.html(<RecurrencesList recurrences={recurrences} />);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      return c.json({ error: message }, 500);
    }
  };

  getEditForm = async (c: Context) => {
    try {
      const id = c.req.param("id");
      const recurrence = await this.recurrenceService.findRecurrenceById(id);
      return c.html(<RecurrenceForm recurrence={recurrence} />);
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
      
      const recurrences = await this.recurrenceService.findAllRecurrences(userId);
      return c.html(<RecurrencesList recurrences={recurrences} />);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      return c.json({ error: message }, 500);
    }
  };
}
