// src/middleware/errorHandler.ts
import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { ZodError } from "zod";

export async function errorHandler(err: Error, c: Context) {
  console.error("❌ Error:", err);

  // Handle Zod validation errors
  if (err instanceof ZodError) {
    return c.json(
      {
        error: "Validation failed",
        details: err.errors.map((e) => ({
          path: e.path.join("."),
          message: e.message,
        })),
      },
      400
    );
  }

  // Handle HTTP exceptions from Hono
  if (err instanceof HTTPException) {
    return c.json(
      {
        error: err.message,
      },
      err.status
    );
  }

  // Handle Prisma errors
  if ("code" in err) {
    const prismaError = err as any;

    switch (prismaError.code) {
      case "P2002":
        return c.json(
          {
            error: "Duplicate entry",
            message: "A record with this value already exists",
          },
          409
        );

      case "P2025":
        return c.json(
          {
            error: "Record not found",
            message: "The requested record does not exist",
          },
          404
        );

      case "P2003":
        return c.json(
          {
            error: "Foreign key constraint failed",
            message: "Related record does not exist",
          },
          400
        );

      case "P2014":
        return c.json(
          {
            error: "Relation violation",
            message: "Cannot delete record with related records",
          },
          400
        );

      default:
        console.error("Prisma error:", prismaError);
    }
  }

  // Handle custom application errors
  if (err.message) {
    const statusCode = err.message.includes("not found")
      ? 404
      : err.message.includes("Unauthorized")
      ? 401
      : err.message.includes("Forbidden")
      ? 403
      : err.message.includes("Cannot delete")
      ? 400
      : 500;

    return c.json(
      {
        error: err.message,
      },
      statusCode
    );
  }

  // Generic server error
  return c.json(
    {
      error: "Internal server error",
      message:
        process.env.NODE_ENV === "development"
          ? err.message
          : "Something went wrong",
    },
    500
  );
}
