import React, { Suspense } from "react";
import CheckoutClient from "./_components/CheckoutClient";

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center text-white">
          Loading...
        </div>
      }
    >
      <CheckoutClient />
    </Suspense>
  );
}
