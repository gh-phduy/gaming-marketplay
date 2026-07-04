"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Check,
  DollarSign,
  ExternalLink,
  ChevronRight,
  Clock,
} from "lucide-react";
import type { UserDashboardProfile } from "./dashboard.data";
import DashboardVerificationBanner from "./_components/VerificationBanner";
import DashboardLevelCard from "./_components/LevelCard";
import DashboardSpentCard from "./_components/SpentCard";
import DashboardReviewsCard from "./_components/ReviewsCard";
import DashboardWalletSection from "./_components/WalletSection";
import DashboardRecentOrders from "./_components/RecentOrders";
import DashboardSecurityCard from "./_components/SecurityCard";
import DashboardSellerWorkspace from "./_components/DashboardSellerWorkspace";
import { useAuth } from "@/contexts/AuthContext";
import { useSettings } from "@/contexts/SettingsContext";
import { LANGUAGES, CURRENCIES } from "@/components/auth/userMenu/constants";
import {
  getSellerProfilePath,
  normalizeSellerRouteKey,
} from "@/components/user/seller-profile.route";

interface DashboardClientProps {
  profile: UserDashboardProfile;
}

function FlagIcon({ code }: { code: string }) {
  const flagMap: Record<string, string> = {
    VN: "🇻🇳",
    US: "🇺🇸",
    EN: "🇬🇧",
    DE: "🇩🇪",
    FR: "🇫🇷",
    JP: "🇯🇵",
    KR: "🇰🇷",
    CN: "🇨🇳",
    PL: "🇵🇱",
    ES: "🇪🇸",
    PT: "🇵🇹",
    NL: "🇳🇱",
    IT: "🇮🇹",
    JA: "🇯🇵",
    KO: "🇰🇷",
    TR: "🇹🇷",
    FI: "🇫🇮",
    AR: "🇸🇦",
    EL: "🇬🇷",
    NO: "🇳🇴",
    DA: "🇩🇰",
    SV: "🇸🇪",
  };

  return (
    <span className="text-base" role="img" aria-label={code}>
      {flagMap[code.toUpperCase()] || "🏳️"}
    </span>
  );
}

export default function DashboardClient({ profile }: DashboardClientProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const { language: currentLangCode, currency: currentCurrencyCode } = useSettings();
  const [currentTime, setCurrentTime] = useState<string>("");
  const [currentDate, setCurrentDate] = useState<string>("");
  const [exchangeRateTime, setExchangeRateTime] = useState<string>("");

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/");
    }
  }, [user, isLoading, router]);

  const accountProfile = useMemo<UserDashboardProfile>(() => {
    const emailName = user?.email?.split("@")[0];
    const username = user?.name || emailName || profile.username || "Guest";
    const avatarUrl = user?.picture || profile.avatarUrl || "/avt1.png";

    const langObj = LANGUAGES.find((l) => l.code === currentLangCode);
    const currObj = CURRENCIES.find((c) => c.code === currentCurrencyCode);

    // Map currency flagCode from the currency code
    const currencyFlagCode = currentCurrencyCode === "EUR" ? "EU" : (currentCurrencyCode === "GBP" ? "GB" : (currentCurrencyCode === "JPY" ? "JP" : "US"));

    return {
      ...profile,
      id: user?.id || user?.email || profile.id || "guest",
      username,
      avatarUrl,
      language: {
        name: langObj?.name || profile.language.name || "English",
        flagCode: currentLangCode || "EN",
      },
      currency: {
        name: currObj?.name || profile.currency.name || "US Dollar",
        code: currentCurrencyCode || "USD",
        symbol: currObj?.symbol || profile.currency.symbol || "$",
        flagCode: currencyFlagCode,
      },
      spent: {
        ...profile.spent,
        currencySymbol: currObj?.symbol || profile.spent.currencySymbol || "$",
      },
      wallet: {
        ...profile.wallet,
        currencySymbol: currObj?.symbol || profile.wallet.currencySymbol || "$",
      },
      recentOrders: profile.recentOrders || [],
    };
  }, [profile, user, currentLangCode, currentCurrencyCode]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        timeZoneName: "shortOffset",
      });
      const dateStr = now.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      setCurrentTime(timeStr);
      setCurrentDate(dateStr);

      const exchangeStr = now.toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
      });
      const exchangeTime = now.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setExchangeRateTime(`${exchangeStr}, ${exchangeTime}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!user || typeof window === "undefined") return;

    window.localStorage.setItem(
      `difmark_public_seller_profiles:${normalizeSellerRouteKey(
        accountProfile.username,
      )}`,
      JSON.stringify({
        id: accountProfile.id,
        name: accountProfile.username,
        avatar: accountProfile.avatarUrl,
        memberSince: accountProfile.memberSince,
        location: accountProfile.location.flagCode,
        language: accountProfile.language.flagCode,
      }),
    );
  }, [accountProfile, user]);

  if (isLoading || !user) {
    return null;
  }

  return (
    <main
      id="main-content"
      className="w-full bg-midnight-950 px-3 pt-4 pb-16 text-white sm:px-4"
    >
      <div className="mx-auto w-full max-w-[1140px] space-y-4">
        {/* Verification Banner */}
        <DashboardVerificationBanner />

        {/* Main Profile Section */}
        <section
          id="dashboard-profile"
          className="overflow-hidden rounded-xl bg-midnight-800 shadow-2xl shadow-black/20"
        >
          {/* Profile Info Row */}
          <div className="flex flex-col gap-6 p-6 lg:flex-row">
            {/* Left: Avatar + User Info */}
            <div className="flex flex-1 flex-col gap-5">
              <div className="flex items-start gap-5">
                {/* Avatar */}
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
                  {/* Verified badge */}
                  {accountProfile.isVerified && (
                    <span className="absolute right-1 bottom-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-midnight-800 bg-forest-500 shadow-lg shadow-black/20">
                      <Check className="h-4 w-4 stroke-[3] text-white" />
                    </span>
                  )}
                </div>

                {/* Username + Member Since */}
                <div className="min-w-0 pt-2">
                  <h1 className="text-xl font-bold tracking-tight">
                    {accountProfile.username}
                  </h1>
                  <p className="mt-0.5 text-sm text-steel-400">
                    Member since {accountProfile.memberSince}
                  </p>
                </div>
              </div>

              {/* Location / Language / Currency */}
              <div className="space-y-2.5 pl-1 text-sm text-steel-300">
                <div className="flex items-center gap-3">
                  <span className="w-[72px] text-steel-500">Location:</span>
                  <FlagIcon code={accountProfile.location.flagCode} />
                  <span className="font-medium text-dm-accent-blue">
                    {accountProfile.location.name}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-[72px] text-steel-500">Language:</span>
                  <FlagIcon code={accountProfile.language.flagCode} />
                  <span className="font-medium text-dm-accent-blue">
                    {accountProfile.language.name}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-[72px] text-steel-500">Currency:</span>
                  <DollarSign className="h-4 w-4 text-forest-500" />
                  <span className="font-medium text-dm-accent-blue">
                    {accountProfile.currency.name}
                  </span>
                </div>
              </div>

              {/* Public profile link */}
              <Link
                href={getSellerProfilePath(accountProfile.username)}
                className="group mt-1 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-forest-500 transition hover:text-forest-100"
              >
                <ExternalLink className="h-4 w-4" />
                Public profile
                <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            {/* Right: Level + Stats */}
            <div className="flex flex-1 flex-col gap-4">
              <DashboardLevelCard
                level={accountProfile.level}
                cashback={accountProfile.cashback}
              />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <DashboardSpentCard spent={accountProfile.spent} />
                <DashboardReviewsCard reviews={accountProfile.reviews} />
              </div>

              {/* Cashback program link */}
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

        {/* Time + Exchange Rate Bar */}
        <div className="flex flex-col items-center justify-between gap-2 rounded-xl bg-midnight-800 px-6 py-3.5 text-sm sm:flex-row">
          <div className="flex items-center gap-2 text-steel-300">
            <Clock className="h-4 w-4 text-steel-500" />
            <span>
              Time:{" "}
              <span className="font-semibold text-white">
                {currentDate}, {currentTime}
              </span>
            </span>
          </div>
          <span className="text-steel-500">
            last exchange rate updated {exchangeRateTime}
          </span>
        </div>

        <DashboardSellerWorkspace profile={accountProfile} />

        {/* Wallet Section */}
        <DashboardWalletSection
          wallet={accountProfile.wallet}
          currency={accountProfile.currency}
        />

        {/* Recent Orders + Security Row */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <DashboardRecentOrders orders={accountProfile.recentOrders} />
          </div>
          <DashboardSecurityCard isVerified={accountProfile.isVerified} />
        </div>
      </div>
    </main>
  );
}
