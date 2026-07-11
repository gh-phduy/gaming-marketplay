"use client";

import { Lock, Star, Users, UserRoundCheck } from "lucide-react";
import type { ReactNode } from "react";

import { useTranslations } from "next-intl";

interface SellerProfileTabsProps {
  activeTab: "store" | "reviews" | "followers" | "following";
  onChangeTab: (tab: "store" | "reviews" | "followers" | "following") => void;
}

export default function SellerProfileTabs({
  activeTab,
  onChangeTab,
}: SellerProfileTabsProps) {
  const t = useTranslations("user");

  const TABS: Array<{
    key: "store" | "reviews" | "followers" | "following";
    label: string;
    icon: ReactNode;
  }> = [
    { key: "store", label: t("storeTab"), icon: <Lock size={14} /> },
    { key: "reviews", label: t("reviewsTab"), icon: <Star size={14} /> },
    { key: "followers", label: t("followersTab"), icon: <Users size={14} /> },
    { key: "following", label: t("followingTab"), icon: <UserRoundCheck size={14} /> },
  ];

  return (
    <section className="rounded-lg border border-midnight-700 bg-midnight-800 p-1.5">
      <div className="grid grid-cols-2 gap-2 800:grid-cols-4">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => onChangeTab(tab.key)}
            className={`inline-flex h-10 items-center justify-center gap-2 rounded-md text-sm font-semibold transition-colors ${
              activeTab === tab.key
                ? "bg-midnight-700 text-white"
                : "bg-transparent text-steel-500 hover:bg-midnight-700/40"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>
    </section>
  );
}
