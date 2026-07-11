"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";

export function SuccessToast({
  isVisible,
  itemCount,
  total,
}: {
  isVisible: boolean;
  itemCount: number;
  total: string;
}) {
  if (!isVisible) return null;

  return (
    <div
      role="status"
      className="fixed top-24 right-5 z-50 w-[min(420px,calc(100vw-40px))] overflow-hidden rounded-lg border border-emerald-400/25 bg-[#1f2937] text-white shadow-[0_24px_60px_rgba(0,0,0,0.35)]"
    >
      <div className="h-1 bg-[#62d676]" />
      <div className="flex gap-4 p-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#62d676]/15 text-[#62d676]">
          <CheckCircle2 className="h-6 w-6" aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold">Payment completed successfully</p>
          <p className="mt-1 text-sm leading-5 text-slate-300">
            {itemCount} {itemCount === 1 ? "product" : "products"} confirmed.
            Total paid: <span className="font-semibold text-white">{total}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
