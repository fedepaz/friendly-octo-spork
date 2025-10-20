// tests/services/auth.test.ts
import { describe, it, expect, beforeEach, afterEach } from "bun:test";
import { prisma } from "../../src/lib/prisma";
import { AuthService } from "../../src/api/auth/auth.service";

// Mock environment variables for testing
process.env.JWT_SECRET = "test-jwt-secret";
process.env.ADMIN_USERNAME = "test-admin";

describe("AuthService", () => {
  let service: AuthService;
  const testPassword = "secure-test-password";

  beforeEach(async () => {
    // Hash the test password for the service
    process.env.ADMIN_PASSWORD_HASH = await Bun.password.hash(testPassword, {
      algorithm: "bcrypt",
      cost: 4,
    });
    service = new AuthService();
  });

  afterEach(async () => {
    // Clean up any created users if necessary (though AuthService doesn't create them)
    await prisma.user.deleteMany();
  });

  it("should verify a correct password", async () => {
    const isValid = await service.verifyPassword(testPassword);
    expect(isValid).toBeTrue();
  });

  it("should reject an incorrect password", async () => {
    const isValid = await service.verifyPassword("wrong-password");
    expect(isValid).toBeFalse();
  });

  it("should create a valid JWT token", async () => {
    const userId = "test-user-id";
    const token = await service.createToken(userId);
    expect(token).toBeString();
    expect(token.length).toBeGreaterThan(0);

    // Optionally, decode and verify payload (requires jwt.verify, not in AuthService)
    // const decoded = await jwt.verify(token, process.env.JWT_SECRET!);
    // expect(decoded.sub).toBe(userId);
  });

  it("should return the admin user ID", () => {
    const adminId = service.getAdminUserId();
    expect(adminId).toBe(process.env.ADMIN_USERNAME);
  });
});
