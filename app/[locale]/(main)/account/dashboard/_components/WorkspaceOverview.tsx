"use client";

import React from "react";
import { Plus, ChevronRight } from "lucide-react";
import type { UserDashboardProfile } from "../_lib/dashboard.data";
import {
  cyberPanelClass,
  cyberInnerPanelClass,
  cyberPrimaryButtonClass,
  formatMoney,
  ConversationPreview,
} from "./SellerWorkspaceComponents";
import type { WorkspaceTab } from "./useSellerWorkspace";
import { useTranslations } from "next-intl";

/* ==========================================================================
   TYPE DEFINITIONS & INTERFACES
   ========================================================================== */

interface WorkspaceOverviewProps {
  profile: UserDashboardProfile;
  stats: {
    publishedListings: number;
    grossRevenue: number;
    unreadMessages: number;
    lowStock: number;
    totalSales: number;
  };
  listings: any[];
  conversations: any[];
  activeConversation: any;
  setActiveTab: (tab: WorkspaceTab) => void;
  handleSelectConversation: (id: string) => void;
}

/* ==========================================================================
   MAIN COMPONENT: WorkspaceOverview
   ========================================================================== */

/**
 * WorkspaceOverview Component
 *
 * Renders the dashboard dashboard metrics for gross revenues, median replies,
 * verification status, and recent buyer messages.
 */
export function WorkspaceOverview({
  profile,
  stats,
  listings,
  conversations,
  activeConversation,
  setActiveTab,
  handleSelectConversation,
}: WorkspaceOverviewProps) {
  const t = useTranslations("dashboard");

  return (
    <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
      
      {/* Sales Overview & Next Payout Metrics Panel */}
      <div className={`${cyberPanelClass} p-4`}>
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-base font-bold">{t("salesCommand")}</h3>
          <button
            type="button"
            onClick={() => setActiveTab("create")}
            className={`${cyberPrimaryButtonClass} h-9 px-3 text-xs`}
          >
            <Plus className="h-4 w-4" />
            {t("newProduct")}
          </button>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {/* Next Payout calculation block */}
          <div className={`${cyberInnerPanelClass} p-4`}>
            <p className="text-xs text-steel-500">{t("nextPayout")}</p>
            <p className="mt-2 text-xl font-bold text-white">
              {formatMoney(
                profile.currency.symbol,
                stats.grossRevenue * 0.82,
              )}
            </p>
            <p className="mt-2 text-xs text-steel-500">
              {t("pendingSettlement")}
            </p>
          </div>

          {/* Response times calculation block */}
          <div className={`${cyberInnerPanelClass} p-4`}>
            <p className="text-xs text-steel-500">{t("responseTime")}</p>
            <p className="mt-2 text-xl font-bold text-white">14 min</p>
            <p className="mt-2 text-xs text-steel-500">
              {t("medianReply")}
            </p>
          </div>

          {/* Verification status block */}
          <div className={`${cyberInnerPanelClass} p-4`}>
            <p className="text-xs text-steel-500">{t("verification")}</p>
            <p className="mt-2 text-xl font-bold text-forest-500 drop-shadow-[0_0_10px_rgba(70,202,67,0.4)]">
              {t("active")}
            </p>
            <p className="mt-2 text-xs text-steel-500">
              {t("toolsUnlocked")}
            </p>
          </div>
        </div>
      </div>

      {/* Latest Buyer Chats panel */}
      <div className={`${cyberPanelClass} p-4`}>
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold">{t("latestBuyerChat")}</h3>
          <button
            type="button"
            onClick={() => setActiveTab("inbox")}
            className="inline-flex items-center gap-1 text-xs font-bold text-forest-100 transition hover:text-forest-100"
          >
            {t("inbox")}
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="mt-4 space-y-2">
          {conversations.slice(0, 3).map((conversation) => (
            <ConversationPreview
              key={conversation.id}
              conversation={conversation}
              isActive={conversation.id === activeConversation?.id}
              onSelect={() => {
                setActiveTab("inbox");
                handleSelectConversation(conversation.id);
              }}
            />
          ))}
          
          {conversations.length === 0 ? (
            <div className="rounded-lg border border-dashed border-forest-500/20 bg-black/20 py-8 text-center text-sm text-steel-500">
              {t("noBuyerMessages")}
            </div>
          ) : null}
        </div>
      </div>

    </div>
  );
}
