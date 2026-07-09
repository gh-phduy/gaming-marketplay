import { describe, it, expect } from "vitest";
import {
  isValidEmail,
  isStrongPassword,
  sanitizeString,
  normalizeWhitespace,
  isNotEmpty,
  isInRange,
  isValidUrl,
  validateSearchQuery,
} from "./validation";

describe("Validation Utilities", () => {
  describe("isValidEmail", () => {
    it("should return true for valid emails", () => {
      expect(isValidEmail("test@example.com")).toBe(true);
      expect(isValidEmail("user.name+tag@domain.co.uk")).toBe(true);
    });

    it("should return false for invalid emails", () => {
      expect(isValidEmail("plainaddress")).toBe(false);
      expect(isValidEmail("@no-local-part.com")).toBe(false);
      expect(isValidEmail("Outlook Contact <outlook@test.com>")).toBe(false);
    });
  });

  describe("isStrongPassword", () => {
    it("should return true for strong passwords", () => {
      expect(isStrongPassword("StrongPass1")).toBe(true);
      expect(isStrongPassword("P@ssw0rd2024")).toBe(true);
    });

    it("should return false if too short", () => {
      expect(isStrongPassword("Str1")).toBe(false);
    });

    it("should return false if no uppercase", () => {
      expect(isStrongPassword("weakpass1")).toBe(false);
    });

    it("should return false if no lowercase", () => {
      expect(isStrongPassword("WEAKPASS1")).toBe(false);
    });

    it("should return false if no number", () => {
      expect(isStrongPassword("StrongPassword")).toBe(false);
    });
  });

  describe("sanitizeString", () => {
    it("should escape HTML tags", () => {
      expect(sanitizeString("<script>alert(1)</script>")).toBe(
        "&lt;script&gt;alert(1)&lt;&#x2F;script&gt;"
      );
    });

    it("should escape quotes and ampersands", () => {
      expect(sanitizeString("Mac & Cheese")).toBe("Mac &amp; Cheese");
      expect(sanitizeString('He said "Hello"')).toBe("He said &quot;Hello&quot;");
    });
  });

  describe("normalizeWhitespace", () => {
    it("should trim and remove multiple spaces", () => {
      expect(normalizeWhitespace("  hello   world  ")).toBe("hello world");
    });
  });

  describe("isNotEmpty", () => {
    it("should return true for non-empty strings", () => {
      expect(isNotEmpty("hello")).toBe(true);
      expect(isNotEmpty(" a ")).toBe(true);
    });

    it("should return false for empty or nullish values", () => {
      expect(isNotEmpty("")).toBe(false);
      expect(isNotEmpty("   ")).toBe(false);
      expect(isNotEmpty(null)).toBe(false);
      expect(isNotEmpty(undefined)).toBe(false);
    });
  });

  describe("isInRange", () => {
    it("should return true if inside range", () => {
      expect(isInRange(5, 1, 10)).toBe(true);
      expect(isInRange(1, 1, 10)).toBe(true);
      expect(isInRange(10, 1, 10)).toBe(true);
    });

    it("should return false if outside range", () => {
      expect(isInRange(0, 1, 10)).toBe(false);
      expect(isInRange(11, 1, 10)).toBe(false);
    });
  });

  describe("isValidUrl", () => {
    it("should return true for valid URLs", () => {
      expect(isValidUrl("https://example.com")).toBe(true);
      expect(isValidUrl("http://localhost:3000")).toBe(true);
    });

    it("should return false for invalid URLs", () => {
      expect(isValidUrl("not-a-url")).toBe(false);
    });
  });

  describe("validateSearchQuery", () => {
    it("should validate and sanitize normal query", () => {
      const result = validateSearchQuery("  hello   world  ");
      expect(result.isValid).toBe(true);
      expect(result.sanitized).toBe("hello world");
    });

    it("should truncate and invalidate long query", () => {
      const longQuery = "a".repeat(150);
      const result = validateSearchQuery(longQuery);
      expect(result.isValid).toBe(false);
      expect(result.sanitized.length).toBe(100);
      expect(result.error).toContain("too long");
    });
  });
});
