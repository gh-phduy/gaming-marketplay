"use client";

/* ==========================================================================
   TYPE DEFINITIONS & INTERFACES
   ========================================================================== */

interface SpentCardProps {
  spent: {
    amount: number;
    currencySymbol: string;
    maxAmount: number;
  };
}

/* ==========================================================================
   MAIN COMPONENT: DashboardSpentCard
   ========================================================================== */

/**
 * DashboardSpentCard Component
 *
 * Displays the current cumulative spending progress bar up to a maximum threshold.
 */
export default function DashboardSpentCard({ spent }: SpentCardProps) {
  const progressPercent = spent.maxAmount > 0
    ? Math.min((spent.amount / spent.maxAmount) * 100, 100)
    : 0;

  return (
    <div
      id="dashboard-spent"
      className="flex flex-col justify-between rounded-xl bg-midnight-750 p-4 ring-1 ring-midnight-650"
    >
      <div>
        <h3 className="text-sm font-semibold text-white">Spent</h3>
        <p className="mt-0.5 text-xs text-steel-500">Total amount</p>
      </div>

      <div className="mt-3">
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-bold text-white">
            {spent.currencySymbol} {spent.amount.toFixed(2)}
          </span>
          <span className="text-xs text-steel-500">·</span>
          <span className="text-xs text-steel-500">
            {spent.currencySymbol} {spent.maxAmount.toFixed(2)}
          </span>
        </div>

        {/* Progress level bar */}
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-midnight-650">
          <div
            className="h-full rounded-full bg-gradient-to-r from-forest-500 to-forest-100 transition-all duration-700 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
}

