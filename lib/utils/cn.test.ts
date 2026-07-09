import { describe, it, expect } from "vitest";
import { cn } from "./cn";

describe("cn utility", () => {
  it("should merge basic class names", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("should handle conditional class names", () => {
    expect(cn("foo", true && "bar", false && "baz")).toBe("foo bar");
  });

  it("should handle array class names", () => {
    expect(cn(["foo", "bar"], "baz")).toBe("foo bar baz");
  });

  it("should merge tailwind classes properly using tailwind-merge", () => {
    // twMerge logic: p-4 should overwrite p-2
    expect(cn("p-2 text-red-500", "p-4")).toBe("text-red-500 p-4");
  });
});
