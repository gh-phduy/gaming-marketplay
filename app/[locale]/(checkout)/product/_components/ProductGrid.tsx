"use client";

import ProductGridItem from "@/components/product/ProductGridItem";
import type { Product } from "../_lib/product-listing";

/* ==========================================================================
   TYPE DEFINITIONS & INTERFACES
   ========================================================================== */

interface ProductGridProps {
  products: Product[];
  isLoading: boolean;
}

/* ==========================================================================
   MAIN COMPONENT: ProductGrid
   ========================================================================== */

/**
 * ProductGrid Component
 *
 * Renders the products grid list.
 * Integrates an animate-pulse skeleton fallback container when loading.
 */
export default function ProductGrid({ products, isLoading }: ProductGridProps) {
  // Loading skeleton placeholder state
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className="aspect-video animate-pulse rounded-lg bg-midnight-750 sm:aspect-auto sm:h-[250px]"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductGridItem
          key={product.id}
          id={product.id}
          title={product.title}
          price={product.price}
          image={product.image}
          platform={product.platform}
        />
      ))}
    </div>
  );
}

