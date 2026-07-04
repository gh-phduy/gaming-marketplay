"use client";

import { useEffect, useState } from "react";
import { useSettings } from "@/contexts/SettingsContext";
import { localeToLanguageCode } from "@/i18n/config";

type Translations = Record<string, any>;

const translationCache: Record<string, Translations> = {};

async function loadTranslations(locale: string): Promise<Translations> {
  if (translationCache[locale]) {
    return translationCache[locale];
  }

  try {
    const messages = await import(`@/messages/${locale}.json`);
    translationCache[locale] = messages.default;
    return messages.default;
  } catch (error) {
    console.error(`Failed to load translations for ${locale}:`, error);
    // Fallback to English
    if (locale !== "en") {
      return loadTranslations("en");
    }
    return {};
  }
}

export function useTranslations(namespace?: string) {
  const { language } = useSettings();
  const [translations, setTranslations] = useState<Translations>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const locale = localeToLanguageCode[language] || "en";

    loadTranslations(locale).then((msgs) => {
      setTranslations(msgs);
      setIsLoading(false);
    });
  }, [language]);

  const t = (key: string, defaultValue?: string) => {
    if (isLoading) return defaultValue || key;

    if (!namespace) {
      return defaultValue || key;
    }

    try {
      const keys = key.split(".");
      let value: any = translations[namespace];

      for (const k of keys) {
        if (value && typeof value === "object") {
          value = value[k];
        } else {
          value = undefined;
          break;
        }
      }

      return value || defaultValue || key;
    } catch (error) {
      return defaultValue || key;
    }
  };

  return t;
}
