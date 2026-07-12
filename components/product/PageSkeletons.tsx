import { memo } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductGallerySkeleton } from "./ProductGallerySkeleton";
import { PurchaseCardSkeleton } from "./PurchaseCardSkeleton";

export const TitleSkeleton = memo(() => (
  <Skeleton className="h-10 w-[400px]" />
));
TitleSkeleton.displayName = "TitleSkeleton";

export const ProductSectionSkeleton = memo(() => (
  <div className="flex w-full flex-col gap-5 lg:flex-row lg:gap-6">
    {/* Gallery Skeleton - Detailed */}
    <ProductGallerySkeleton />
    {/* PurchaseCard Skeleton - Detailed */}
    <PurchaseCardSkeleton />
  </div>
));
ProductSectionSkeleton.displayName = "ProductSectionSkeleton";
