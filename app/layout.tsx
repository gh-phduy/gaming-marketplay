import type { Metadata, Viewport } from "next";
import { CartProvider } from "@/contexts/CartContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Difmark - Digital Game Marketplace",
  description: "Buy cheap digital games, gift cards, and software keys",
  keywords: ["games", "digital keys", "marketplace", "cheap games"],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark overflow-x-hidden">
      <body className="flex min-h-screen flex-col overflow-x-hidden bg-midnight-850 text-dm-text-primary antialiased">
        <CartProvider>
          {/* Skip to main content link for accessibility */}
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>

          {children}
        </CartProvider>
      </body>
    </html>
  );
}
