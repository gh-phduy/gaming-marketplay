import React, { Suspense } from "react";
import { ProductFilterProvider } from "@/contexts/ProductFilterContext";
import { QueryProvider } from "@/contexts/QueryProvider";
import ProductClient from "./_components/ProductClient";

export default function ProductPage() {
  return (
    <QueryProvider>
      <ProductFilterProvider>
        <Suspense
          fallback={
            <div className="flex min-h-screen items-center justify-center text-white">
              Loading...
            </div>
          }
        >
          <ProductClient />
        </Suspense>
      </ProductFilterProvider>
    </QueryProvider>
  );
}
