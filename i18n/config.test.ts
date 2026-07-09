import { describe, it, expect } from "vitest";
import { locales, localeNames, localeToLanguageCode } from "./config";

describe("i18n Config", () => {
  it("should contain 'vi' in locales", () => {
    expect(locales).toContain("vi");
  });

  it("should map 'vi' to 'Tiếng Việt' in localeNames", () => {
    expect(localeNames.vi).toBe("Tiếng Việt");
  });

  it("should map 'VI' to 'vi' in localeToLanguageCode", () => {
    expect(localeToLanguageCode.VI).toBe("vi");
  });

  it("should map all locales in localeToLanguageCode to valid locales in config", () => {
    Object.values(localeToLanguageCode).forEach((langCode) => {
      expect(locales).toContain(langCode);
    });
  });
});
