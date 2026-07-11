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

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageRaw] = useLocalStorage<string>("app-language", "EN");
  const [currency, setCurrency] = useLocalStorage<string>(
    "app-currency",
    "USD",
  );

  const setLanguage = useCallback(
    (lang: string) => {
      setLanguageRaw(lang);
      // We will rely on window.location or Link components for locale routing,
      // but if a user changes the language in settings, we should refresh to apply middleware.
      // For a proper next-intl implementation, this should ideally use the localized useRouter.
      if (typeof window !== "undefined") {
        const locale = localeToLanguageCode[lang] || "en";
        const currentPath = window.location.pathname;
        const currentLocaleMatch = currentPath.match(/^\/([a-z]{2})(?:\/|$)/);
        if (currentLocaleMatch) {
           const newPath = currentPath.replace(`/${currentLocaleMatch[1]}`, `/${locale}`);
           window.location.href = newPath + window.location.search;
        } else {
           window.location.href = `/${locale}${currentPath}${window.location.search}`;
        }
      }
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
