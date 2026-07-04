import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

/**
 * Detailed Skeleton for PurchaseCard component
 * Matches the exact layout of the real PurchaseCard
 */
export function PurchaseCardSkeleton() {
  return (
    <Card className="w-[780px] border-none bg-[#2a3441]/80 backdrop-blur-md">
      <CardContent className="flex flex-col gap-6 p-6">
        {/* Seller Info Section */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {/* Seller Avatar */}
            <div className="relative h-12 w-12 shrink-0">
              <Skeleton className="h-12 w-12 rounded-full" />
            </div>

            {/* Seller Name and Badges */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-4 rounded-full" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-20" />
                {/* Star Rating */}
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-4 w-4 rounded-full" />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8 rounded" />
            <Skeleton className="h-8 w-8 rounded" />
            <Skeleton className="h-8 w-8 rounded" />
          </div>
        </div>

        {/* Product Details Grid */}
        <div className="grid grid-cols-2 gap-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center justify-between py-2">
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4 rounded" />
                <Skeleton className="h-4 w-20" />
              </div>
              <Skeleton className="h-4 w-24" />
            </div>
          ))}
        </div>

        {/* Divider with Price Label */}
        <div className="flex items-center gap-4">
          <Separator className="flex-1 bg-gray-600" />
          <Skeleton className="h-4 w-12" />
          <Separator className="flex-1 bg-gray-600" />
        </div>

        {/* Price Section */}
        {/* <div className="flex items-center justify-center gap-4">
                    <Skeleton className="h-10 w-32" />
                    <Skeleton className="h-6 w-20" />
                </div> */}

        {/* Payment Methods */}
        <div className="flex items-center justify-center gap-2">
          <Skeleton className="h-8 w-20 rounded-full" />
          <Skeleton className="h-8 w-20 rounded-full" />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Skeleton className="h-12 flex-1 rounded-lg" />
          <Skeleton className="h-12 flex-1 rounded-lg" />
        </div>
      </CardContent>
    </Card>
  );
}
