"use client";

import { ShieldCheck, ChevronRight, X } from "lucide-react";
import { useState } from "react";

export default function DashboardVerificationBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div
      id="verification-banner"
      className="group relative flex items-center justify-between overflow-hidden rounded-xl bg-gradient-to-r from-forest-500/15 via-forest-500/10 to-midnight-800 px-5 py-3.5 ring-1 ring-forest-500/20"
    >
      {/* Animated glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-forest-500/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative flex items-center gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-forest-500/20">
          <ShieldCheck className="h-4 w-4 text-forest-500" />
        </div>
        <p className="text-sm text-steel-300">
          If you want to{" "}
          <span className="font-semibold text-white">open the seller role</span>
          , please go through verification. It will take{" "}
          <span className="font-semibold text-white">5 minutes</span>.
        </p>
      </div>

      <div className="relative flex items-center gap-3">
        <button
          type="button"
          className="group/btn inline-flex items-center gap-2 rounded-lg bg-forest-500 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-forest-500/20 transition-all hover:bg-forest-100/90 hover:shadow-forest-500/30"
        >
          GO TO VERIFICATION
          <ChevronRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
        </button>
        <button
          type="button"
          onClick={() => setIsVisible(false)}
          className="rounded-full p-1 text-steel-500 transition hover:bg-midnight-700 hover:text-white"
          aria-label="Dismiss verification banner"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
