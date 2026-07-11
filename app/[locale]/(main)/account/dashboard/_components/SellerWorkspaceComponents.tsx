"use client";

import React from "react";
import Image from "next/image";
import {
  Archive,
  CheckCircle2,
  Eye,
  Pause,
  Trash2,
} from "lucide-react";
import {
  formatSellerStoreTime,
  type SellerConversation,
  type SellerListing,
  type SellerListingStatus,
} from "@/components/marketplace/seller-marketplace-store";

/* ==========================================================================
   STYLE CLASS CONSTANTS (CYBER STYLES)
   ========================================================================== */

export const cyberPanelClass =
  "rounded-xl border border-midnight-650/60 bg-midnight-750 shadow-md shadow-black/15 transition-all duration-300 hover:border-midnight-600";
export const cyberInnerPanelClass =
  "rounded-lg border border-midnight-700/60 bg-midnight-850 shadow-[inset_0_0_12px_rgba(0,0,0,0.15)]";
export const cyberInputClass =
  "h-11 w-full rounded-lg border border-midnight-650 bg-midnight-900/60 px-3 text-sm text-white transition outline-none hover:border-midnight-500 focus:border-forest-500 focus:ring-1 focus:ring-forest-500";
export const cyberTextareaClass =
  "min-h-28 w-full resize-none rounded-lg border border-midnight-650 bg-midnight-900/60 px-3 py-3 text-sm leading-6 text-white transition outline-none hover:border-midnight-500 focus:border-forest-500 focus:ring-1 focus:ring-forest-500";
export const cyberPrimaryButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-lg bg-accent-green hover:bg-accent-green-hover font-bold text-white transition-all duration-200";
export const cyberGhostButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-lg border border-midnight-650 bg-midnight-800/80 font-bold text-gray-200 transition-all duration-200 hover:border-midnight-500 hover:bg-midnight-700 hover:text-white";

/* ==========================================================================
   FORMATTING UTILITIES
   ========================================================================== */

/**
 * Formats a numeric value into a standard currency money string.
 */
export function formatMoney(currency: string, value: number) {
  return `${currency} ${value.toFixed(2)}`;
}

/* ==========================================================================
   COMPONENTS: ProductImage, StatusBadge, MetricTile, ListingRow, ConversationPreview
   ========================================================================== */

/**
 * ProductImage Component
 * Renders next/image bindings or base64 data-url previews safely.
 */
export function ProductImage({
  src,
  alt,
  sizes,
}: {
  src: string;
  alt: string;
  sizes: string;
}) {
  if (src.startsWith("data:") || src.startsWith("blob:")) {
    return <img src={src} alt={alt} className="h-full w-full object-cover" />;
  }

  return (
    <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
  );
}

/**
 * statusClasses Utility
 * Maps listing statuses to style class combinations.
 */
export function statusClasses(status: SellerListingStatus) {
  if (status === "published") {
    return "border-forest-500/35 bg-forest-500/10/10 text-forest-100 shadow-[0_0_14px_rgba(98,214,118,0.18)]";
  }

  if (status === "paused") {
    return "border-yellow-300/30 bg-yellow-300/10 text-yellow-200 shadow-[0_0_14px_rgba(253,224,71,0.14)]";
  }

  return "border-cyan-300/20 bg-cyan-300/5 text-cyan-100";
}

/**
 * StatusBadge Component
 * Renders an inline colored status dot.
 */
export function StatusBadge({ status }: { status: SellerListingStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-bold capitalize ${statusClasses(status)}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

/**
 * MetricTile Component
 * Renders a key-value metric card inside the dashboard grid.
 */
export function MetricTile({
  icon: Icon,
  label,
  value,
  detail,
  tone = "green",
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  detail: string;
  tone?: "green" | "blue" | "yellow" | "steel";
}) {
  const toneClass = {
    green:
      "text-forest-500 bg-forest-500/10 border border-forest-500/20",
    blue:
      "text-cyan-400 bg-cyan-500/10 border border-cyan-500/20",
    yellow:
      "text-yellow-400 bg-yellow-500/10 border border-yellow-500/20",
    steel:
      "text-forest-100 bg-forest-500/5 border border-forest-500/10",
  }[tone];

  return (
    <div className={`${cyberPanelClass} group relative overflow-hidden p-4`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs text-forest-100/60">{label}</p>
          <p className="mt-2 text-2xl font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.05)]">
            {value}
          </p>
        </div>
        <span
          className={`flex h-10 w-10 items-center justify-center rounded-lg ${toneClass}`}
        >
          <Icon className="h-5 w-5 drop-shadow-[0_0_6px_currentColor]" />
        </span>
      </div>
      <p className="text-steel-400 mt-3 text-xs">{detail}</p>
    </div>
  );
}

/**
 * ListingRow Component
 * Renders product overview details (views, stock, platform) and status triggers.
 */
export function ListingRow({
  listing,
  onChangeStatus,
  onDelete,
}: {
  listing: SellerListing;
  onChangeStatus: (listingId: string, status: SellerListingStatus) => void;
  onDelete: (listingId: string) => void;
}) {
  const nextPrimaryStatus =
    listing.status === "published" ? "paused" : "published";

  return (
    <div
      className={`${cyberPanelClass} grid gap-4 p-4 transition hover:border-forest-500/30 hover:shadow-[0_0_36px_rgba(98,214,118,0.12)] lg:grid-cols-[1fr_auto] lg:items-center`}
    >
      <div className="flex min-w-0 gap-4">
        <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg border border-forest-500/20 bg-black shadow-[0_0_18px_rgba(98,214,118,0.12)]">
          <ProductImage
            src={listing.imageUrl}
            alt={listing.title}
            sizes="112px"
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="truncate text-base font-bold text-white">
              {listing.title}
            </h3>
            <StatusBadge status={listing.status} />
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-steel-500">
            <span>{listing.productType}</span>
            <span>{listing.platform}</span>
            <span>{listing.activationRegion}</span>
            <span>{listing.delivery}</span>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">
            <span className="font-bold text-white">
              {formatMoney(listing.currency, listing.price)}
            </span>
            <span className="text-steel-300">{listing.stock} in stock</span>
            <span className="inline-flex items-center gap-1 text-steel-500">
              <Eye className="h-3.5 w-3.5" />
              {listing.views}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 lg:justify-end">
        <button
          type="button"
          onClick={() => onChangeStatus(listing.id, nextPrimaryStatus)}
          className={`${cyberGhostButtonClass} h-9 px-3 text-xs`}
        >
          {nextPrimaryStatus === "published" ? (
            <CheckCircle2 className="h-4 w-4 text-forest-100 drop-shadow-[0_0_8px_rgba(98,214,118,0.8)]" />
          ) : (
            <Pause className="h-4 w-4 text-yellow-300" />
          )}
          {nextPrimaryStatus === "published" ? "Publish" : "Pause"}
        </button>
        <button
          type="button"
          onClick={() => onChangeStatus(listing.id, "draft")}
          className={`${cyberGhostButtonClass} h-9 px-3 text-xs text-steel-300`}
        >
          <Archive className="h-4 w-4" />
          Draft
        </button>
        <button
          type="button"
          onClick={() => onDelete(listing.id)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-red-400/20 bg-red-500/10 text-red-300 shadow-[0_0_16px_rgba(248,113,113,0.12)] transition hover:bg-red-500/20"
          aria-label={`Delete ${listing.title}`}
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

/**
 * ConversationPreview Component
 * Renders buyer avatar rows and shows unread counts.
 */
export function ConversationPreview({
  conversation,
  isActive,
  onSelect,
}: {
  conversation: SellerConversation;
  isActive: boolean;
  onSelect: () => void;
}) {
  const latestMessage =
    conversation.messages[conversation.messages.length - 1]?.text ??
    "No messages yet";

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex w-full gap-3 rounded-xl p-3 text-left ring-1 transition ${
        isActive
          ? "border border-forest-500/25 bg-forest-500/10/10 shadow-[0_0_26px_rgba(98,214,118,0.14)] ring-forest-500/20"
          : "border border-forest-500/10 bg-black/25 ring-white/5 hover:border-forest-500/25 hover:bg-forest-500/10/5"
      }`}
    >
      <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-forest-500/25 bg-black shadow-[0_0_18px_rgba(98,214,118,0.16)]">
        <Image
          src={conversation.buyerAvatar}
          alt={conversation.buyerName}
          fill
          sizes="44px"
          className="object-cover"
        />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p className="truncate text-sm font-bold text-white">
            {conversation.buyerName}
          </p>
          <span className="shrink-0 text-xs text-steel-500">
            {formatSellerStoreTime(conversation.updatedAt)}
          </span>
        </div>
        <p className="mt-1 truncate text-xs font-medium text-forest-100">
          {conversation.listingTitle} / {conversation.sellerName}
        </p>
        <p className="mt-1 line-clamp-1 text-xs text-steel-500">
          {latestMessage}
        </p>
      </div>
      {conversation.unreadForSeller > 0 ? (
        <span className="mt-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1.5 text-[11px] font-bold text-white">
          {conversation.unreadForSeller}
        </span>
      ) : null}
    </button>
  );
}

