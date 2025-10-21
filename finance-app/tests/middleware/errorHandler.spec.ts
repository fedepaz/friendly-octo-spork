// tests/middleware/errorHandler.test.ts
import { describe, it, expect } from "bun:test";
import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { ZodError } from "zod";
import { errorHandler } from "@/middleware/errorHandler";

describe("errorHandler", () => {
  it("should handle ZodError", async () => {
    const err = new ZodError([]);
    const c = {
      json: (data: any, status: number) => {
        expect(status).toBe(400);
        expect(data.error).toBe("Validation failed");
      },
    } as Context;
    await errorHandler(err, c);
  });

  it("should handle HTTPException", async () => {
    const err = new HTTPException(404, { message: "Not Found" });
    const c = {
      json: (data: any, status: number) => {
        expect(status).toBe(404);
        expect(data.error).toBe("Not Found");
      },
    } as Context;
    await errorHandler(err, c);
  });

  it("should handle Prisma P2002 error", async () => {
    const err = { code: "P2002" } as any;
    const c = {
      json: (data: any, status: number) => {
        expect(status).toBe(409);
        expect(data.error).toBe("Duplicate entry");
      },
    } as Context;
    await errorHandler(err, c);
  });

  it("should handle Prisma P2025 error", async () => {
    const err = { code: "P2025" } as any;
    const c = {
      json: (data: any, status: number) => {
        expect(status).toBe(404);
        expect(data.error).toBe("Record not found");
      },
    } as Context;
    await errorHandler(err, c);
  });

  it("should handle generic error", async () => {
    const err = new Error("Something went wrong");
    const c = {
      json: (data: any, status: number) => {
        expect(status).toBe(500);
        expect(data.error).toBe("Internal server error");
      },
    } as Context;
    await errorHandler(err, c);
  });
});
