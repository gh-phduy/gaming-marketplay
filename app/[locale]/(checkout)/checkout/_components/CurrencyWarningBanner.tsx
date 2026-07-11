"use client";

import React from "react";
import { AlertCircle, ChevronRight } from "lucide-react";

/* ==========================================================================
   MAIN COMPONENT: CurrencyWarningBanner
   ========================================================================== */

/**
 * CurrencyWarningBanner Component
 *
 * Renders an alert notification when the selected checkout currency
 * is different from the user's localized geo-location defaults.
 */
export function CurrencyWarningBanner() {
  return (
    <div className="flex flex-col items-start justify-between gap-3 rounded-md border border-[#30363d] bg-[#2a2a35] p-3 text-xs text-gray-400 sm:flex-row sm:items-center sm:text-sm">
      {/* Alert details */}
      <div className="flex items-center gap-2">
        <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
        <span>
          The currency you have selected is different from the currency of
          your current location
        </span>
      </div>
      
      {/* Reset selector link button */}
      <button className="flex shrink-0 items-center gap-1 text-[#58a6ff] transition-colors hover:text-[#79b8ff] hover:underline">
        Default currency <ChevronRight className="h-3 w-3" />
      </button>
    </div>
  );
}
