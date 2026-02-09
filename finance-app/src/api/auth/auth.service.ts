// src/api/auth/auth.service.ts

import { password } from "bun";
import type { LoginInput } from "./auth.schema";
import { generateToken } from "@/middleware/auth";
import { UserRepository } from "../repositories/user.repository";

export class AuthService {
  private userRepository = new UserRepository();
  login = async (parameters: LoginInput) => {
    const { email, plainPassword } = parameters;
    const user = await this.userRepository.getUserByEmail(email);

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isPasswordValid = await password.verify(
      plainPassword,
      user.passwordHash,
    );

    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    const token = await generateToken(user.id);

    return token;
  };
}
