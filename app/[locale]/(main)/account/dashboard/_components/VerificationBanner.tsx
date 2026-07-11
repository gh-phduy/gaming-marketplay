"use client";

import { ShieldCheck, ChevronRight, X } from "lucide-react";
import { useState } from "react";

/* ==========================================================================
   MAIN COMPONENT: DashboardVerificationBanner
   ========================================================================== */

/**
 * DashboardVerificationBanner Component
 *
 * Renders a dismissible notification block urging the user to proceed
 * through KYC verification to unlock full seller status tools.
 */
export default function DashboardVerificationBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div
      id="verification-banner"
      className="group relative flex flex-col md:flex-row items-start md:items-center justify-between overflow-hidden rounded-xl bg-[#0c1612] border border-forest-900 px-5 py-4 gap-4"
    >
      <div className="relative flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-forest-900/60 text-forest-500">
          <ShieldCheck className="h-5 w-5" />
        </div>
        <p className="text-sm text-gray-300">
          If you want to{" "}
          <span className="font-bold text-white">open the seller role</span>
          , please go through verification. It will take{" "}
          <span className="font-bold text-white">5 minutes</span>.
        </p>
      </div>

      <div className="relative flex items-center gap-3 shrink-0">
        <button
          type="button"
          className="group/btn inline-flex items-center gap-1.5 rounded-lg bg-accent-green hover:bg-accent-green-hover px-4 py-2.5 text-xs font-bold text-white transition-all duration-200"
        >
          GO TO VERIFICATION
          <ChevronRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
        </button>
        <button
          type="button"
          onClick={() => setIsVisible(false)}
          className="rounded-full p-1 text-gray-500 transition hover:bg-midnight-700 hover:text-white"
          aria-label="Dismiss verification banner"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

