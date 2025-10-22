// src/api/auth/auth.service.ts

import { prisma } from "@/lib/prisma";
import { generateToken } from "@/lib/jwt";
import { password } from "bun";
import type { LoginInput } from "./auth.schema";

export class AuthService {
  login = async (parameters: LoginInput) => {
    const { email, plainPassword } = parameters;
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isPasswordValid = await password.verify(
      plainPassword,
      user.passwordHash as string
    );

    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    const token = await generateToken(user.id);

    return token;
  };
}
