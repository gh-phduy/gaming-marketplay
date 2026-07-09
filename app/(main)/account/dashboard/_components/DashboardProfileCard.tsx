"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, DollarSign, ExternalLink, ChevronRight } from "lucide-react";
import type { UserDashboardProfile } from "../_lib/dashboard.data";
import DashboardLevelCard from "./LevelCard";
import DashboardSpentCard from "./SpentCard";
import DashboardReviewsCard from "./ReviewsCard";
import { getSellerProfilePath } from "@/components/user/seller-profile.route";

/* ==========================================================================
   SUPPORTING WIDGETS
   ========================================================================== */

/**
 * ProfileFlag Component
 * Renders small rounded country flag SVG graphics.
 */
function ProfileFlag({ code }: { code: string }) {
  const mappedCode = code.toLowerCase() === "gb" ? "en" : code.toLowerCase();
  return (
    <div className="relative h-3 w-[18px] shrink-0 overflow-hidden rounded-xs border border-white/5 flex items-center">
      <img
        src={`/${mappedCode}.svg`}
        alt={code}
        className="h-full w-full object-cover"
      />
    </div>
  );
}

/* ==========================================================================
   TYPE DEFINITIONS & INTERFACES
   ========================================================================== */

interface DashboardProfileCardProps {
  accountProfile: UserDashboardProfile;
}

/* ==========================================================================
   MAIN COMPONENT: DashboardProfileCard
   ========================================================================== */

/**
 * DashboardProfileCard Component
 *
 * Renders the top user profile card featuring membership stats,
 * localized settings parameters, level achievements, and spent summaries.
 */
export function DashboardProfileCard({
  accountProfile,
}: DashboardProfileCardProps) {
  return (
    <section
      id="dashboard-profile"
      className="overflow-hidden rounded-xl bg-midnight-800 shadow-2xl shadow-black/20"
    >
      <div className="flex flex-col gap-6 p-6 lg:flex-row">
        
        {/* Left Column: User avatar and localization details */}
        <div className="flex flex-1 flex-col gap-5">
          <div className="flex items-start gap-5">
            {/* Avatar thumbnail container */}
            <div className="group relative h-[112px] w-[112px] shrink-0 cursor-pointer">
              <div className="relative h-full w-full overflow-hidden rounded-full bg-midnight-700 ring-[3px] ring-midnight-650 transition-all group-hover:ring-forest-500/50">
                <Image
                  src={accountProfile.avatarUrl}
                  alt={accountProfile.username}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="112px"
                />
              </div>
              {/* Verified badge icon */}
              {accountProfile.isVerified && (
                <span className="absolute right-1 bottom-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-midnight-800 bg-forest-500 shadow-lg shadow-black/20">
                  <Check className="h-4 w-4 stroke-[3] text-white" />
                </span>
              )}
            </div>

            {/* Username & membership timestamp */}
            <div className="min-w-0 pt-2">
              <h1 className="text-xl font-bold tracking-tight">
                {accountProfile.username}
              </h1>
              <p className="mt-0.5 text-sm text-steel-400">
                Member since {accountProfile.memberSince}
              </p>
            </div>
          </div>

          {/* Localized parameters: Location, Language, Currency */}
          <div className="space-y-2.5 pl-1 text-sm text-steel-300">
            <div className="flex items-center gap-3">
              <span className="w-[72px] text-steel-500">Location:</span>
              <div className="flex items-center gap-2">
                <ProfileFlag code={accountProfile.location.flagCode} />
                <span className="text-gray-400 font-semibold uppercase">{accountProfile.location.flagCode}</span>
                <span className="font-semibold text-sky-400">
                  {accountProfile.location.name}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-[72px] text-steel-500">Language:</span>
              <div className="flex items-center gap-2">
                <ProfileFlag code={accountProfile.language.flagCode} />
                <span className="text-gray-400 font-semibold uppercase">{accountProfile.language.flagCode}</span>
                <span className="font-semibold text-sky-400">
                  {accountProfile.language.name}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-[72px] text-steel-500">Currency:</span>
              <div className="flex items-center gap-2">
                <span className="font-bold text-forest-500">{accountProfile.currency.symbol}</span>
                <span className="font-semibold text-gray-400 uppercase">{accountProfile.currency.code}</span>
                <span className="font-semibold text-sky-400">
                  {accountProfile.currency.name}
                </span>
              </div>
            </div>
          </div>

          {/* Link to public seller page */}
          <Link
            href={getSellerProfilePath(accountProfile.username)}
            className="group mt-1 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-forest-500 transition hover:text-forest-100"
          >
            <ExternalLink className="h-4 w-4" />
            Public profile
            <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Right Column: LevelCard, SpentCard, and Cashback banner */}
        <div className="flex flex-1 flex-col gap-4">
          <DashboardLevelCard
            level={accountProfile.level}
            cashback={accountProfile.cashback}
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <DashboardSpentCard spent={accountProfile.spent} />
            <DashboardReviewsCard reviews={accountProfile.reviews} />
          </div>

          {/* Cashback program banner invitation */}
          <div className="flex items-center justify-between rounded-lg bg-midnight-750/50 px-4 py-2.5">
            <span className="text-xs text-steel-500">
              Increase your cashback percentage and save money
            </span>
            <button
              type="button"
              className="group inline-flex items-center gap-1 text-xs font-semibold text-dm-accent-orange transition hover:text-dm-accent-yellow"
            >
              Cashback program
              <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
