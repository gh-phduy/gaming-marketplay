import { describe, it, expect } from "vitest";
import { loginSchema, signupSchema } from "./auth.schema";

describe("Auth Schemas", () => {
  describe("loginSchema", () => {
    it("should validate valid input", () => {
      const result = loginSchema.safeParse({
        email: "test@example.com",
        password: "Password123",
      });
      expect(result.success).toBe(true);
    });

    it("should reject invalid email", () => {
      const result = loginSchema.safeParse({
        email: "not-an-email",
        password: "Password123",
      });
      expect(result.success).toBe(false);
    });
  });

  describe("signupSchema", () => {
    it("should validate correct signup data", () => {
      const result = signupSchema.safeParse({
        email: "test@example.com",
        password: "StrongPassword1",
        confirmPassword: "StrongPassword1",
        firstName: "John",
        lastName: "Doe",
        acceptTerms: true,
      });
      expect(result.success).toBe(true);
    });

    it("should reject weak passwords", () => {
      const result = signupSchema.safeParse({
        email: "test@example.com",
        password: "weak",
        confirmPassword: "weak",
        firstName: "John",
        lastName: "Doe",
        acceptTerms: true,
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain("at least 8 characters");
      }
    });

    it("should reject mismatching passwords", () => {
      const result = signupSchema.safeParse({
        email: "test@example.com",
        password: "StrongPassword1",
        confirmPassword: "StrongPassword2",
        firstName: "John",
        lastName: "Doe",
        acceptTerms: true,
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("Passwords do not match");
      }
    });

    it("should require acceptTerms", () => {
      const result = signupSchema.safeParse({
        email: "test@example.com",
        password: "StrongPassword1",
        confirmPassword: "StrongPassword1",
        firstName: "John",
        lastName: "Doe",
        acceptTerms: false,
      });
      expect(result.success).toBe(false);
    });
  });
});
