"use client";

import {
  ArrowUpRight,
  ChevronRight,
  Eye,
} from "lucide-react";

interface WalletSectionProps {
  wallet: {
    available: number;
    pending: number;
    bonus: number;
    currencySymbol: string;
  };
  currency: {
    name: string;
    code: string;
    symbol: string;
    flagCode: string;
  };
}

const flagEmoji: Record<string, string> = {
  US: "🇺🇸",
  EU: "🇪🇺",
  GB: "🇬🇧",
  JP: "🇯🇵",
};

export default function DashboardWalletSection({
  wallet,
  currency,
}: WalletSectionProps) {
  return (
    <section id="dashboard-wallet" className="space-y-4">
      {/* Currency Header */}
      <div className="rounded-xl bg-midnight-800 p-5">
        <div className="flex items-center gap-3">
          <span className="text-2xl" role="img" aria-label={currency.name}>
            {flagEmoji[currency.flagCode] || "🏳️"}
          </span>
          <div>
            <p className="text-sm font-bold text-white">{currency.name}</p>
            <p className="text-xs text-steel-500">{currency.code}</p>
          </div>
        </div>
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* Available Balance */}
        <div className="group relative overflow-hidden rounded-xl bg-midnight-800 p-5 ring-1 ring-midnight-650 transition-all hover:ring-forest-500/30">
          <div className="absolute inset-0 bg-gradient-to-br from-forest-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          <div className="relative">
            <p className="text-xs text-steel-500">Available Balance</p>
            <p className="mt-2 text-2xl font-bold text-white">
              {wallet.currencySymbol} {wallet.available.toFixed(2)}
            </p>
            <button
              type="button"
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-midnight-750 py-2.5 text-sm font-medium text-white ring-1 ring-midnight-650 transition-all hover:bg-midnight-700 hover:ring-forest-500/40"
            >
              <ArrowUpRight className="h-4 w-4" />
              Top up
            </button>
          </div>
        </div>

        {/* Pending Balance */}
        <div className="group relative overflow-hidden rounded-xl bg-midnight-800 p-5 ring-1 ring-midnight-650 transition-all hover:ring-dm-accent-yellow/30">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          <div className="relative">
            <p className="text-xs text-steel-500">Pending Balance</p>
            <p className="mt-2 text-2xl font-bold text-white">
              {wallet.currencySymbol} {wallet.pending.toFixed(2)}
            </p>
            <button
              type="button"
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-midnight-750 py-2.5 text-sm font-medium text-white ring-1 ring-midnight-650 transition-all hover:bg-midnight-700 hover:ring-dm-accent-yellow/40"
            >
              <Eye className="h-4 w-4" />
              Review
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Bonus Balance */}
        <div className="group relative overflow-hidden rounded-xl bg-midnight-800 p-5 ring-1 ring-midnight-650 transition-all hover:ring-purple-500/30">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          <div className="relative">
            <p className="text-xs text-steel-500">Bonus Balance</p>
            <p className="mt-2 text-2xl font-bold text-white">
              {wallet.currencySymbol} {wallet.bonus.toFixed(2)}
            </p>
            <button
              type="button"
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-midnight-750 py-2.5 text-sm font-medium text-white ring-1 ring-midnight-650 transition-all hover:bg-midnight-700 hover:ring-purple-500/40"
            >
              <Eye className="h-4 w-4" />
              Review
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
