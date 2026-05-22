"use client";

import { AuthProvider } from "@/app/context/AuthContext";
import { SettingsProvider } from "@/app/context/SettingsContext";
import type { ReactNode } from "react";

/**
 * Combined app providers in a single client boundary.
 * Reduces React tree traversal during hydration from 3 passes to 1.
 */
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <SettingsProvider>{children}</SettingsProvider>
    </AuthProvider>
  );
}
