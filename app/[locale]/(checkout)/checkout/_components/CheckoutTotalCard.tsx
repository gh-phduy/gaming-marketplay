"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";

/* ==========================================================================
   TYPE DEFINITIONS & INTERFACES
   ========================================================================== */

interface CheckoutTotalCardProps {
  amount: number;
}

/* ==========================================================================
   MAIN COMPONENT: CheckoutTotalCard
   ========================================================================== */

/**
 * CheckoutTotalCard Component
 *
 * Displays pricing summaries (discounts, fees, cashback reward estimates)
 * and holds the discount code application field.
 */
export function CheckoutTotalCard({ amount }: CheckoutTotalCardProps) {
  return (
    <div className="space-y-6 rounded-lg border border-[#30363d] bg-midnight-700 p-6">
      <h2 className="text-xl font-semibold text-white">Checkout total</h2>

      {/* Pricing Breakdown details */}
      <div className="space-y-2 text-sm">
        <div className="flex justify-between text-gray-400">
          <span>Discount:</span>
          <span className="font-medium">$ 0.00</span>
        </div>
        <div className="flex justify-between text-gray-400">
          <span>Difmark balance pay:</span>
          <span className="font-medium">$ 0.00</span>
        </div>
        <div className="flex justify-between text-gray-400">
          <span>Payment method fee:</span>
          <span className="font-medium">$ 0.00</span>
        </div>
        <div className="flex justify-between text-[#46ca43]">
          <span className="flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3" /> Cashback:
          </span>
          <span className="font-medium">
            $ {(amount * 0.03).toFixed(2)}
          </span>
        </div>
      </div>

      {/* Grand Total cost */}
      <div className="flex items-center justify-between border-t border-[#30363d] pt-4">
        <span className="text-[#58a6ff]">Total:</span>
        <span className="text-2xl font-bold text-white">
          $ {amount.toFixed(2)}
        </span>
      </div>

      {/* Discount code submit wrapper */}
      <div className="relative">
        <Input
          placeholder="DISCOUNT CODE"
          className="rounded border-none bg-[#242c38] pr-20 text-white uppercase placeholder:text-gray-500"
        />
        <button className="absolute top-1 right-1 bottom-1 rounded bg-[#374050] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#444c5d]">
          Apply
        </button>
      </div>
    </div>
  );
}
