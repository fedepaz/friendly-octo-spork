// src/middleware/errorHandler.ts
import { Context } from "hono";
import { ZodError } from "zod";
import { HTTPException } from "hono/http-exception";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export const errorHandler = (err: Error, c: Context) => {
  // ZodError - validation errors
  if (err instanceof ZodError) {
    return c.json(
      {
        error: "Validation failed",
        details: err.issues.map((issue) => ({
          path: issue.path,
          message: issue.message,
        })),
      },
      400
    );
  }

  // HTTPException - Hono's HTTP errors
  if (err instanceof HTTPException) {
    return c.json(
      {
        error: err.message,
      },
      err.status
    );
  }

  // Prisma errors
  if (err instanceof PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      return c.json(
        {
          error: "A record with this value already exists",
        },
        409
      );
    }
    if (err.code === "P2025") {
      return c.json(
        {
          error: "Record not found",
        },
        404
      );
    }
  }

  // Generic errors - don't expose internal error messages
  console.error("Unhandled error:", err);
  return c.json(
    {
      error: "Internal server error",
    },
    500
  );
};
