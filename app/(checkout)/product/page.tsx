import React, { Suspense } from "react";
import { ProductFilterProvider } from "@/app/contexts/ProductFilterContext";
import { QueryProvider } from "@/app/providers/QueryProvider";
import ProductClient from "./ProductClient";

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
