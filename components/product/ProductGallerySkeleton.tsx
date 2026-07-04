import { Skeleton } from "@/components/ui/skeleton";

/**
 * Detailed Skeleton for ProductGallery component
 * Matches the layout of the real ProductGallery with main image and thumbnails
 */
export function ProductGallerySkeleton() {
  return (
    <div className="flex w-[780px] flex-col gap-4">
      {/* Main Image Skeleton */}
      <Skeleton className="h-[450px] w-full rounded-xl" />

      {/* Thumbnails Skeleton */}
    </div>
  );
}
