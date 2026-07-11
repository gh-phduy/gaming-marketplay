"use client";

import {
  ArrowUpRight,
  ChevronRight,
  Eye,
} from "lucide-react";

import { useTranslations } from "next-intl";

/* ==========================================================================
   TYPE DEFINITIONS & CONFIGURATIONS
   ========================================================================== */

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

/* ==========================================================================
   MAIN COMPONENT: DashboardWalletSection
   ========================================================================== */

/**
 * DashboardWalletSection Component
 *
 * Renders the balances summary section, splitting amount balances
 * into Available, Pending, and Bonus segments.
 */
export default function DashboardWalletSection({
  wallet,
  currency,
}: WalletSectionProps) {
  const t = useTranslations("dashboard");

  return (
    <section id="dashboard-wallet" className="space-y-4">
      
      {/* Active Local Currency Header */}
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

      {/* Balance Cards grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        
        {/* Available Balance card */}
        <div className="group relative overflow-hidden rounded-xl bg-midnight-800 p-5 ring-1 ring-midnight-650 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-forest-500/10 hover:ring-forest-500/50">
          <div className="absolute inset-0 bg-gradient-to-br from-forest-500/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="relative">
            <p className="text-xs text-steel-500">{t("availableBalance")}</p>
            <p className="mt-2 text-2xl font-bold text-white">
              {wallet.currencySymbol} {wallet.available.toFixed(2)}
            </p>
            <button
              type="button"
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-midnight-750 py-2.5 text-sm font-medium text-white ring-1 ring-midnight-650 transition-all hover:bg-midnight-700 hover:ring-forest-500/40"
            >
              <ArrowUpRight className="h-4 w-4" />
              {t("topUp")}
            </button>
          </div>
        </div>

        {/* Pending Balance card */}
        <div className="group relative overflow-hidden rounded-xl bg-midnight-800 p-5 ring-1 ring-midnight-650 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-forest-500/10 hover:ring-forest-500/50">
          <div className="absolute inset-0 bg-gradient-to-br from-forest-500/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="relative">
            <p className="text-xs text-steel-500">{t("pendingBalance")}</p>
            <p className="mt-2 text-2xl font-bold text-white">
              {wallet.currencySymbol} {wallet.pending.toFixed(2)}
            </p>
            <button
              type="button"
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-midnight-750 py-2.5 text-sm font-medium text-white ring-1 ring-midnight-650 transition-all hover:bg-midnight-700 hover:ring-forest-500/40"
            >
              <Eye className="h-4 w-4" />
              {t("review")}
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Bonus Balance card */}
        <div className="group relative overflow-hidden rounded-xl bg-midnight-800 p-5 ring-1 ring-midnight-650 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-forest-500/10 hover:ring-forest-500/50">
          <div className="absolute inset-0 bg-gradient-to-br from-forest-500/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="relative">
            <p className="text-xs text-steel-500">{t("bonusBalance")}</p>
            <p className="mt-2 text-2xl font-bold text-white">
              {wallet.currencySymbol} {wallet.bonus.toFixed(2)}
            </p>
            <button
              type="button"
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-midnight-750 py-2.5 text-sm font-medium text-white ring-1 ring-midnight-650 transition-all hover:bg-midnight-700 hover:ring-forest-500/40"
            >
              <Eye className="h-4 w-4" />
              {t("review")}
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

