import React, { Suspense } from "react";
import NavBar from "../components/layout/NavBar";
import { AuthProvider } from "../context/AuthContext";
import { CartProvider } from "../context/CartContext";
import { SettingsProvider } from "../context/SettingsContext";

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <SettingsProvider>
        <CartProvider>
          <div className="min-h-screen bg-midnight-850 font-sans text-slate-200">
            <Suspense fallback={<div className="h-16 w-full bg-transparent" />}>
              <NavBar />
            </Suspense>
            <div className="flex flex-1 flex-col items-center pt-20">{children}</div>
            {/* No Footer here as per implementation plan for checkout */}
          </div>
        </CartProvider>
      </SettingsProvider>
    </AuthProvider>
  );
}
