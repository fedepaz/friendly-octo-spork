// src/lib/jwt.ts

import { sign, verify } from "hono/jwt";

const JWT_SECRET =
  process.env.JWT_SECRET || "your-super-secret-key-change-this";

export async function generateToken(userId: string): Promise<string> {
  const payload = {
    sub: userId,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 24 hours
  };

  const token = await sign(payload, JWT_SECRET);

  return token;
}

export async function verifyToken(token: string) {
  try {
    const payload = await verify(token, JWT_SECRET);
    return payload;
  } catch (error) {
    console.error("Error verifying token:", error);
    return null;
  }
}

if (import.meta.main) {
  const userId = process.argv[2];

  if (!userId) {
    console.error("Usage: node src/lib/jwt.ts <userId>");
    process.exit(1);
  }

  const token = await generateToken(userId);
  console.log("\n Generated Token:");
  console.log(token);
  console.log("\n");
  console.log("   Cookie name: auth_token");
  console.log(`   Cookie value: ${token}`);
  console.log("\n");
}
