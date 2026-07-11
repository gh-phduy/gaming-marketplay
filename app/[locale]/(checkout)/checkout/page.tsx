import React, { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import CheckoutClient from "./_components/CheckoutClient";

export default async function CheckoutPage() {
  const t = await getTranslations("checkout");
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center text-white">
          {t("loading")}
        </div>
      }
    >
      <CheckoutClient />
    </Suspense>
  );
}
