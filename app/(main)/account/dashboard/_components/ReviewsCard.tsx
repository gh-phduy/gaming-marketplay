"use client";

import { Star } from "lucide-react";

/* ==========================================================================
   TYPE DEFINITIONS & INTERFACES
   ========================================================================== */

interface ReviewsCardProps {
  reviews: {
    count: number;
    total: number;
  };
}

/* ==========================================================================
   MAIN COMPONENT: DashboardReviewsCard
   ========================================================================== */

/**
 * DashboardReviewsCard Component
 *
 * Displays star rating icons and reviews sum counts.
 */
export default function DashboardReviewsCard({ reviews }: ReviewsCardProps) {
  return (
    <div
      id="dashboard-reviews"
      className="flex flex-col justify-between rounded-xl bg-midnight-750 p-4 ring-1 ring-midnight-650"
    >
      <div>
        <h3 className="text-sm font-semibold text-white">Reviews</h3>
        <p className="mt-0.5 text-xs text-steel-500">for any orders</p>
      </div>

      <div className="mt-3">
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-bold text-white">{reviews.count}</span>
          <span className="text-xs text-steel-500">·</span>
          <span className="text-xs text-steel-500">
            {reviews.total} reviews
          </span>
        </div>

        {/* Star rating visualization icons list */}
        <div className="mt-3 flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={`star-${i}`}
              className={`h-3.5 w-3.5 ${
                i < reviews.count
                  ? "fill-dm-accent-yellow text-dm-accent-yellow"
                  : "text-midnight-650"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

