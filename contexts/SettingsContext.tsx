"use client";

import { createContext, useContext, useCallback, ReactNode } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { localeToLanguageCode } from "@/i18n/config";

interface SettingsContextType {
  language: string;
  setLanguage: (lang: string) => void;
  currency: string;
  setCurrency: (curr: string) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined,
);

/**
 * Preload a translation file into the module-level cache used by useTranslations.
 * By the time React re-renders after setLanguage, the cache is already warm
 * so every useTranslations hook can swap synchronously in a single frame.
 */
async function preloadTranslations(locale: string): Promise<void> {
  // Access the same cache object used by useTranslations
  const { ensureCached } = await import("@/hooks/useTranslations");
  await ensureCached(locale);
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageRaw] = useLocalStorage<string>("app-language", "EN");
  const [currency, setCurrency] = useLocalStorage<string>(
    "app-currency",
    "USD",
  );

  const setLanguage = useCallback(
    (lang: string) => {
      const locale = localeToLanguageCode[lang] || "en";

      // Preload the translation file, then commit the language change.
      // If the file is already cached this resolves instantly (micro-task).
      preloadTranslations(locale).then(() => {
        setLanguageRaw(lang);
      });
    },
    [setLanguageRaw],
  );

  return (
    <SettingsContext.Provider
      value={{
        language,
        setLanguage,
        currency,
        setCurrency,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}
