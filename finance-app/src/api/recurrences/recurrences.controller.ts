import { Context } from "hono";
import { zValidator } from "@hono/zod-validator";
import { RecurrencesService } from "./recurrences.service";
import {
  createRecurrenceSchema,
  updateRecurrenceSchema,
  recurrenceFilterSchema,
} from "./recurrences.schema";
import { RecurrenceCard } from "../../components/recurrences/RecurrenceCard";
import { RecurrenceForm } from "../../components/recurrences/RecurrenceForm";
import { RecurrencesList } from "../../components/recurrences/RecurrencesList";
import { RecurrencesPage } from "../../pages/RecurrencesPage";

export class RecurrencesController {
  private recurrencesService = new RecurrencesService();

  getRecurrencesPage = async (c: Context) => {
    const userId = c.get("userId");
    const filters = recurrenceFilterSchema.parse(c.req.query());

    const recurrences = await this.recurrencesService.getRecurrences(
      userId,
      filters
    );

    return c.render(<RecurrencesPage recurrences={recurrences} />);
  };

  getRecurrencesList = async (c: Context) => {
    const userId = c.get("userId");
    const filters = recurrenceFilterSchema.parse(c.req.query());

    const recurrences = await this.recurrencesService.getRecurrences(
      userId,
      filters
    );

    return c.html(<RecurrencesList recurrences={recurrences} />);
  };

  createRecurrence = [
    zValidator("form", createRecurrenceSchema),
    async (c: Context) => {
      const userId = c.get("userId");
      const data = c.req.valid("form");

      const recurrence = await this.recurrencesService.createRecurrence(
        userId,
        data
      );

      c.status(201);
      return c.html(<RecurrenceCard recurrence={recurrence} />);
    },
  ];

  getRecurrence = async (c: Context) => {
    const userId = c.get("userId");
    const recurrenceId = Number(c.req.param("id"));

    const recurrence = await this.recurrencesService.getRecurrenceById(
      userId,
      recurrenceId
    );

    return c.json({ data: recurrence });
  };

  updateRecurrence = [
    zValidator("json", updateRecurrenceSchema),
    async (c: Context) => {
      const userId = c.get("userId");
      const recurrenceId = Number(c.req.param("id"));
      const data = c.req.valid("json");

      const recurrence = await this.recurrencesService.updateRecurrence(
        userId,
        recurrenceId,
        data
      );

      return c.html(<RecurrenceCard recurrence={recurrence} />);
    },
  ];

  deleteRecurrence = async (c: Context) => {
    const userId = c.get("userId");
    const recurrenceId = Number(c.req.param("id"));

    await this.recurrencesService.deleteRecurrence(userId, recurrenceId);

    c.status(204);
    return c.body(null);
  };

  pauseRecurrence = async (c: Context) => {
    const userId = c.get("userId");
    const recurrenceId = Number(c.req.param("id"));

    const recurrence = await this.recurrencesService.pauseRecurrence(
      userId,
      recurrenceId
    );

    return c.html(<RecurrenceCard recurrence={recurrence} />);
  };

  resumeRecurrence = async (c: Context) => {
    const userId = c.get("userId");
    const recurrenceId = Number(c.req.param("id"));

    const recurrence = await this.recurrencesService.resumeRecurrence(
      userId,
      recurrenceId
    );

    return c.html(<RecurrenceCard recurrence={recurrence} />);
  };

  executeRecurrence = async (c: Context) => {
    const userId = c.get("userId");
    const recurrenceId = Number(c.req.param("id"));
    const transactionData = await c.req.json();

    const transaction = await this.recurrencesService.executeRecurrence(
      userId,
      recurrenceId,
      transactionData
    );

    return c.json({ data: transaction });
  };
}
