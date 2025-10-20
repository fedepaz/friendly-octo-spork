// src/api/recurrences/recurrences.controller.tsx
import { Context } from "hono";
import { zValidator } from "@hono/zod-validator";
import { RecurrencesService } from "./recurrences.service";
import { createRecurrenceSchema, updateRecurrenceSchema } from "./recurrences.schema";

// Assume these components exist and will be created later
const RecurrencesPage = (props: any) => <div>Recurrences Page</div>;
const RecurrencesList = (props: any) => <div>Recurrences List</div>;
const RecurrenceForm = (props: any) => <div>Recurrence Form</div>;

export class RecurrencesController {
  private service = new RecurrencesService();

  // GET /recurrences -> Renders the full page
  public getRecurrencesPage = async (c: Context) => {
    const userId = c.get("userId");
    const recurrences = await this.service.getRecurrences(userId);
    return c.render(<RecurrencesPage recurrences={recurrences} />);
  };

  // GET /api/recurrences -> Returns a list of recurrences (for HTMX)
  public listRecurrences = async (c: Context) => {
    const userId = c.get("userId");
    const recurrences = await this.service.getRecurrences(userId);
    return c.html(<RecurrencesList recurrences={recurrences} />);
  };

  // POST /api/recurrences -> Creates a new recurrence
  public createRecurrence = [
    zValidator("form", createRecurrenceSchema),
    async (c: Context) => {
      const userId = c.get("userId");
      const data = c.req.valid("form");

      const newRecurrence = await this.service.createRecurrence(userId, data);

      c.status(201);
      return c.json(newRecurrence);
    },
  ];

  // GET /api/recurrences/:id -> Gets a single recurrence
  public getRecurrence = async (c: Context) => {
    const userId = c.get("userId");
    const id = Number(c.req.param("id"));
    const recurrence = await this.service.getRecurrenceById(userId, id);
    if (!recurrence) {
      return c.json({ error: "Not Found" }, 404);
    }
    return c.json(recurrence);
  };

  // PUT /api/recurrences/:id -> Updates a recurrence
  public updateRecurrence = [
    zValidator("form", updateRecurrenceSchema),
    async (c: Context) => {
      const userId = c.get("userId");
      const id = Number(c.req.param("id"));
      const data = c.req.valid("form");

      const updatedRecurrence = await this.service.updateRecurrence(userId, id, data);

      return c.json(updatedRecurrence);
    },
  ];

  // DELETE /api/recurrences/:id -> Deletes a recurrence
  public deleteRecurrence = async (c: Context) => {
    const userId = c.get("userId");
    const id = Number(c.req.param("id"));

    await this.service.deleteRecurrence(userId, id);

    c.status(204);
    return c.body(null);
  };

  // PUT /api/recurrences/:id/pause -> Pauses a recurrence
  public pauseRecurrence = async (c: Context) => {
    const userId = c.get("userId");
    const id = Number(c.req.param("id"));

    const updatedRecurrence = await this.service.pauseRecurrence(userId, id);

    return c.json(updatedRecurrence);
  };

  // PUT /api/recurrences/:id/resume -> Resumes a recurrence
  public resumeRecurrence = async (c: Context) => {
    const userId = c.get("userId");
    const id = Number(c.req.param("id"));

    const updatedRecurrence = await this.service.resumeRecurrence(userId, id);

    return c.json(updatedRecurrence);
  };

  // POST /api/recurrences/:id/execute -> Executes next recurrence transaction
  public executeRecurrence = async (c: Context) => {
    const userId = c.get("userId");
    const id = Number(c.req.param("id"));

    const updatedRecurrence = await this.service.executeNextRecurrence(userId, id);

    c.status(200);
    return c.json(updatedRecurrence);
  };
}
