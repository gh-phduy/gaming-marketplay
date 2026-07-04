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

export const cyberPanelClass =
  "rounded-xl border border-lime-300/15 bg-[linear-gradient(135deg,rgba(7,12,14,0.95),rgba(29,37,50,0.9))] shadow-[0_0_32px_rgba(132,255,0,0.08)] ring-1 ring-white/5";
export const cyberInnerPanelClass =
  "rounded-lg border border-lime-300/10 bg-black/25 shadow-[inset_0_0_24px_rgba(132,255,0,0.04)] ring-1 ring-white/5";
export const cyberInputClass =
  "h-11 w-full rounded-lg border border-lime-300/20 bg-black/35 px-3 text-sm text-white shadow-[inset_0_0_18px_rgba(0,0,0,0.34)] transition outline-none placeholder:text-steel-500 hover:border-lime-300/35 focus:border-lime-300 focus:shadow-[0_0_18px_rgba(163,255,18,0.18)]";
export const cyberTextareaClass =
  "min-h-28 w-full resize-none rounded-lg border border-lime-300/20 bg-black/35 px-3 py-3 text-sm leading-6 text-white shadow-[inset_0_0_18px_rgba(0,0,0,0.34)] transition outline-none placeholder:text-steel-500 hover:border-lime-300/35 focus:border-lime-300 focus:shadow-[0_0_18px_rgba(163,255,18,0.18)]";
export const cyberPrimaryButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-lg bg-[linear-gradient(135deg,#d8ff38,#5bea41_48%,#12d984)] font-bold text-midnight-950 shadow-[0_0_24px_rgba(163,255,18,0.3)] transition hover:shadow-[0_0_34px_rgba(163,255,18,0.48)]";
export const cyberGhostButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-lg border border-lime-300/15 bg-black/30 font-bold text-lime-100 shadow-[0_0_18px_rgba(132,255,0,0.08)] transition hover:border-lime-300/35 hover:bg-lime-300/10 hover:text-white";

export function formatMoney(currency: string, value: number) {
  return `${currency} ${value.toFixed(2)}`;
}

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

export function statusClasses(status: SellerListingStatus) {
  if (status === "published") {
    return "border-lime-300/35 bg-lime-300/10 text-lime-300 shadow-[0_0_14px_rgba(163,255,18,0.18)]";
  }

  if (status === "paused") {
    return "border-yellow-300/30 bg-yellow-300/10 text-yellow-200 shadow-[0_0_14px_rgba(253,224,71,0.14)]";
  }

  return "border-cyan-300/20 bg-cyan-300/5 text-cyan-100";
}

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
      "text-lime-300 bg-[linear-gradient(135deg,rgba(163,255,18,0.22),rgba(34,197,94,0.08))] ring-lime-300/35 shadow-[0_0_22px_rgba(163,255,18,0.22)]",
    blue: "text-cyan-200 bg-[linear-gradient(135deg,rgba(34,211,238,0.18),rgba(59,130,246,0.08))] ring-cyan-300/30 shadow-[0_0_22px_rgba(34,211,238,0.16)]",
    yellow:
      "text-yellow-200 bg-[linear-gradient(135deg,rgba(253,224,71,0.18),rgba(132,255,0,0.08))] ring-yellow-300/30 shadow-[0_0_22px_rgba(253,224,71,0.14)]",
    steel:
      "text-lime-100 bg-[linear-gradient(135deg,rgba(148,163,184,0.12),rgba(132,255,0,0.06))] ring-lime-300/20",
  }[tone];

  return (
    <div className={`${cyberPanelClass} group relative overflow-hidden p-4`}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(190,255,67,0.72),transparent)]" />
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs text-lime-100/60">{label}</p>
          <p className="mt-2 text-2xl font-bold text-white drop-shadow-[0_0_10px_rgba(163,255,18,0.2)]">
            {value}
          </p>
        </div>
        <span
          className={`flex h-10 w-10 items-center justify-center rounded-lg ring-1 ${toneClass}`}
        >
          <Icon className="h-5 w-5 drop-shadow-[0_0_8px_rgba(163,255,18,0.75)]" />
        </span>
      </div>
      <p className="text-steel-400 mt-3 text-xs">{detail}</p>
    </div>
  );
}

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
      className={`${cyberPanelClass} grid gap-4 p-4 transition hover:border-lime-300/30 hover:shadow-[0_0_36px_rgba(132,255,0,0.12)] lg:grid-cols-[1fr_auto] lg:items-center`}
    >
      <div className="flex min-w-0 gap-4">
        <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg border border-lime-300/20 bg-black shadow-[0_0_18px_rgba(132,255,0,0.12)]">
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
            <CheckCircle2 className="h-4 w-4 text-lime-300 drop-shadow-[0_0_8px_rgba(163,255,18,0.8)]" />
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
          ? "border border-lime-300/25 bg-lime-300/10 shadow-[0_0_26px_rgba(163,255,18,0.14)] ring-lime-300/35"
          : "border border-lime-300/10 bg-black/25 ring-white/5 hover:border-lime-300/25 hover:bg-lime-300/5"
      }`}
    >
      <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-lime-300/25 bg-black shadow-[0_0_18px_rgba(163,255,18,0.16)]">
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
        <p className="mt-1 truncate text-xs font-medium text-lime-300">
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
