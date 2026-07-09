"use client";

import { useEffect, useState, useRef } from "react";
import { useSettings } from "@/contexts/SettingsContext";
import { localeToLanguageCode } from "@/i18n/config";

type Translations = Record<string, any>;

/** Module-level cache shared across all hook instances */
const translationCache: Record<string, Translations> = {};

/**
 * Load translations for a locale into the cache.
 * Returns the cached data (hits cache on subsequent calls).
 */
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

/**
 * Public API for SettingsContext to preload a locale before committing state.
 * This ensures the cache is warm so useTranslations hooks swap synchronously.
 */
export async function ensureCached(locale: string): Promise<void> {
  await loadTranslations(locale);
}

export function useTranslations(namespace?: string) {
  const { language } = useSettings();
  const localeRef = useRef(localeToLanguageCode[language] || "en");

  // Synchronous initializer: use cache if available
  const [translations, setTranslations] = useState<Translations>(() => {
    const locale = localeToLanguageCode[language] || "en";
    return translationCache[locale] || {};
  });
  const [isLoading, setIsLoading] = useState(() => {
    const locale = localeToLanguageCode[language] || "en";
    return !translationCache[locale];
  });

  useEffect(() => {
    const locale = localeToLanguageCode[language] || "en";
    localeRef.current = locale;

    // Fast path: cache is already warm (preloaded by SettingsContext)
    if (translationCache[locale]) {
      setTranslations(translationCache[locale]);
      setIsLoading(false);
      return;
    }

    // Slow path: first load only (e.g. initial page render)
    loadTranslations(locale).then((msgs) => {
      // Guard against stale responses if language changed again while loading
      if (localeRef.current === locale) {
        setTranslations(msgs);
        setIsLoading(false);
      }
    });
  }, [language]);

  const t = (key: string, valuesOrDefault?: Record<string, any> | string, fallback?: string) => {
    let values: Record<string, any> | undefined = undefined;
    let defaultValue: string | undefined = undefined;

    if (typeof valuesOrDefault === "string") {
      defaultValue = valuesOrDefault;
    } else if (valuesOrDefault) {
      values = valuesOrDefault;
      defaultValue = fallback;
    } else {
      defaultValue = fallback;
    }

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

      let result = value || defaultValue || key;
      
      if (typeof result === "string" && values) {
        for (const [k, v] of Object.entries(values)) {
          result = result.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
        }
      }

      return result;
    } catch (error) {
      return defaultValue || key;
    }
  };

  return t;
}
