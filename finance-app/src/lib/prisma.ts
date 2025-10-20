// src/lib/prisma.ts
import { PrismaClient } from "../generated/prisma";

/**
 * Prisma Client Singleton for Local PostgreSQL
 *
 * This ensures we only create ONE instance of PrismaClient
 * across the entire application.
 */

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    // Logging configuration
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"] // Ver todas las queries en dev
        : ["error"], // Solo errores en producción
  });

// Function to connect Prisma Client
export async function connectPrisma() {
  try {
    await prisma.$connect();
    console.log("✅ Prisma client connected");
  } catch (error) {
    console.error("❌ Failed to connect Prisma client", error);
    process.exit(1);
  }
}

// Store in global to reuse across hot-reloads in development
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

// Graceful shutdown
process.on("beforeExit", async () => {
  await prisma.$disconnect();
});

// Re-export Prisma enums for centralized access
export { TransactionType, AccountType, Currency, CategoryType, RecurrenceType } from "../generated/prisma";

/**
 * Usage:
 *
 * import { prisma } from './lib/prisma';
 *
 * const users = await prisma.user.findMany();
 */
