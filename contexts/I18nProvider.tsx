"use client";

import { NextIntlClientProvider } from "next-intl";
import { ReactNode, useEffect, useState } from "react";
import { useSettings } from "@/contexts/SettingsContext";
import { localeToLanguageCode } from "@/i18n/config";

interface I18nProviderProps {
  children: ReactNode;
}

export function I18nProvider({ children }: I18nProviderProps) {
  const { language } = useSettings();
  const [messages, setMessages] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadMessages() {
      setIsLoading(true);
      try {
        // Convert language code (EN, DE, etc.) to locale (en, de, etc.)
        const locale = localeToLanguageCode[language] || "en";
        const msgs = await import(`@/messages/${locale}.json`);
        setMessages(msgs.default);
      } catch (error) {
        console.error("Failed to load messages:", error);
        // Fallback to English
        const msgs = await import(`@/messages/en.json`);
        setMessages(msgs.default);
      } finally {
        setIsLoading(false);
      }
    }

    loadMessages();
  }, [language]);

  if (isLoading || !messages) {
    return <>{children}</>;
  }

  const locale = localeToLanguageCode[language] || "en";

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
