import type { Metadata, Viewport } from "next";
import { CartProvider } from "@/contexts/CartContext";
import { Analytics } from "@vercel/analytics/react";
import "../globals.css";

export const metadata: Metadata = {
  title: "Difmark - Digital Game Marketplace",
  description: "Buy cheap digital games, gift cards, and software keys",
  keywords: ["games", "digital keys", "marketplace", "cheap games"],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

export default async function RootLayout(props: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await props.params;
  const { children } = props;
  // Ensure that the incoming `locale` is valid
  // (Assuming you create routing.ts with locales, or use config.ts)
  // For now, we will just use getMessages which will throw if invalid or fall back
  const messages = await getMessages();

  return (
    <html lang={locale} className="dark overflow-x-hidden">
      <body className="flex min-h-screen flex-col overflow-x-hidden bg-midnight-850 text-dm-text-primary antialiased">
        <NextIntlClientProvider messages={messages}>
          <CartProvider>
            {/* Skip to main content link for accessibility */}
            <a href="#main-content" className="skip-link">
              Skip to main content
            </a>

            {children}
            <Analytics />
          </CartProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
