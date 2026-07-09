"use client";

import { AuthProvider } from "@/contexts/AuthContext";
import { SettingsProvider } from "@/contexts/SettingsContext";
import { I18nProvider } from "@/contexts/I18nProvider";
import type { ReactNode } from "react";

/**
 * Combined app providers in a single client boundary.
 * Reduces React tree traversal during hydration from 3 passes to 1.
 */
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <SettingsProvider>
        <I18nProvider>{children}</I18nProvider>
      </SettingsProvider>
    </AuthProvider>
  );
}
