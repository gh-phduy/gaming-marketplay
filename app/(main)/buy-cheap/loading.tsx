/**
 * Loading UI for Buy Cheap Page
 *
 * Automatically used by Next.js while the page is loading.
 */

import { Skeleton } from "@/components/ui/skeleton";
import {
  TitleSkeleton,
  ProductSectionSkeleton,
} from "../../components/product/PageSkeletons";

export default function Loading() {
  return (
    <main className="flex w-full max-w-[1590px] flex-col items-center gap-y-6 px-3 pt-28 sm:gap-y-8 sm:px-5 sm:pt-32 md:px-6 md:pt-40 lg:px-8">
      {/* Breadcrumbs Skeleton */}
      <div className="flex w-full gap-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-32" />
      </div>

      {/* Title Skeleton */}
      <TitleSkeleton />

      {/* Main Content: Gallery + PurchaseCard */}
      <ProductSectionSkeleton />

      {/* Description Section Skeleton */}
      <Skeleton className="h-[200px] w-full rounded-xl" />

      {/* Seller List Skeleton */}
      <Skeleton className="h-[300px] w-full rounded-xl" />
    </main>
  );
}
