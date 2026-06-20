// src/api/repositories/user.repository.ts

import type { User } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";

export class UserRepository {
  // Get user by id
  async getUserById(userId: string): Promise<User | null> {
    return prisma.user.findFirst({
      where: { id: userId },
    });
  }

  // Get user by email
  async getUserByEmail(email: string): Promise<User | null> {
    return prisma.user.findFirst({
      where: { email },
    });
  }
}
