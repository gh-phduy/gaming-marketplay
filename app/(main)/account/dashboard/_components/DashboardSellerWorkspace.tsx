"use client";

import React from "react";
import Image from "next/image";
import {
  Archive,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  ClipboardList,
  Inbox,
  LayoutDashboard,
  MessageCircle,
  PackagePlus,
  Plus,
  Send,
  ShieldCheck,
  Store,
  Upload,
  X,
} from "lucide-react";
import type { UserDashboardProfile } from "../_lib/dashboard.data";
import {
  useSellerWorkspace,
  productTypeOptions,
  platformOptions,
  deliveryOptions,
  regionOptions,
  imageOptions,
  type WorkspaceTab,
} from "./useSellerWorkspace";
import {
  cyberPanelClass,
  cyberInnerPanelClass,
  cyberInputClass,
  cyberTextareaClass,
  cyberPrimaryButtonClass,
  cyberGhostButtonClass,
  formatMoney,
  ProductImage,
  MetricTile,
  ListingRow,
  ConversationPreview,
} from "./SellerWorkspaceComponents";
import { formatSellerStoreTime } from "@/components/marketplace/seller-marketplace-store";

interface DashboardSellerWorkspaceProps {
  profile: UserDashboardProfile;
}

const workspaceTabs: Array<{
  id: WorkspaceTab;
  label: string;
  icon: React.ElementType;
}> = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "products", label: "Listings", icon: ClipboardList },
  { id: "create", label: "Create offer", icon: PackagePlus },
  { id: "inbox", label: "Inbox", icon: Inbox },
];

export default function DashboardSellerWorkspace({
  profile,
}: DashboardSellerWorkspaceProps) {
  const {
    activeTab,
    setActiveTab,
    listings,
    conversations,
    activeConversation,
    replyText,
    setReplyText,
    formError,
    toastMessage,
    form,
    stats,
    updateFormField,
    handleUploadImage,
    handleSaveListing,
    handleChangeStatus,
    handleDeleteListing,
    handleSelectConversation,
    handleSendReply,
  } = useSellerWorkspace(profile);

  return (
    <section
      id="seller-workspace"
      className="relative rounded-xl border border-lime-300/20 bg-[linear-gradient(135deg,rgba(5,9,11,0.98),rgba(21,29,39,0.96)_52%,rgba(8,16,13,0.98))] text-white shadow-[0_0_48px_rgba(132,255,0,0.13)] ring-1 ring-lime-300/15"
    >
      <div className="pointer-events-none absolute inset-x-4 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(190,255,67,0.8),rgba(34,211,238,0.28),transparent)]" />
      <div className="pointer-events-none absolute inset-0 rounded-xl bg-[linear-gradient(90deg,rgba(132,255,0,0.035)_1px,transparent_1px),linear-gradient(180deg,rgba(34,211,238,0.028)_1px,transparent_1px)] bg-[size:34px_34px] opacity-70" />
      
      <div className="relative z-10 border-b border-lime-300/15 bg-[linear-gradient(135deg,rgba(14,24,22,0.86),rgba(27,35,48,0.74))] px-5 py-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-lime-300/35 bg-[linear-gradient(135deg,rgba(190,255,67,0.22),rgba(18,217,132,0.08))] text-lime-300 shadow-[0_0_24px_rgba(163,255,18,0.28)] ring-1 ring-lime-300/20">
                <Store className="h-5 w-5 drop-shadow-[0_0_8px_rgba(163,255,18,0.85)]" />
              </span>
              <div>
                <p className="text-xs font-bold tracking-[0.16em] text-lime-300/80 uppercase">
                  Seller role
                </p>
                <h2 className="bg-[linear-gradient(90deg,#ffffff,#d8ff38_46%,#21f58c)] bg-clip-text text-xl font-bold text-transparent drop-shadow-[0_0_14px_rgba(163,255,18,0.18)]">
                  Seller workspace
                </h2>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 rounded-xl border border-lime-300/15 bg-black/35 p-1 shadow-[inset_0_0_24px_rgba(132,255,0,0.05)] ring-1 ring-white/5 sm:grid-cols-4">
            {workspaceTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`inline-flex h-10 items-center justify-center gap-2 rounded-lg px-3 text-sm font-bold transition ${
                    isActive
                      ? "border border-lime-300/35 bg-[linear-gradient(135deg,rgba(190,255,67,0.28),rgba(34,197,94,0.1))] text-white shadow-[0_0_22px_rgba(163,255,18,0.22)]"
                      : "text-steel-400 hover:bg-lime-300/10 hover:text-lime-100"
                  }`}
                >
                  <Icon
                    className={`h-4 w-4 ${
                      isActive
                        ? "text-lime-300 drop-shadow-[0_0_8px_rgba(163,255,18,0.8)]"
                        : ""
                    }`}
                  />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="relative z-10 space-y-5 p-5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <MetricTile
            icon={Store}
            label="Active listings"
            value={`${stats.publishedListings}`}
            detail={`${listings.length} total products`}
          />
          <MetricTile
            icon={CircleDollarSign}
            label="Gross sales"
            value={formatMoney(profile.currency.symbol, stats.grossRevenue)}
            detail={`${stats.totalSales} completed orders`}
            tone="yellow"
          />
          <MetricTile
            icon={MessageCircle}
            label="Unread chats"
            value={`${stats.unreadMessages}`}
            detail={`${conversations.length} buyer threads`}
            tone="blue"
          />
          <MetricTile
            icon={ShieldCheck}
            label="Store health"
            value={stats.lowStock > 0 ? "Watch" : "Good"}
            detail={
              stats.lowStock > 0
                ? `${stats.lowStock} listing low on stock`
                : "Listings are ready"
            }
            tone={stats.lowStock > 0 ? "yellow" : "green"}
          />
        </div>

        {activeTab === "overview" ? (
          <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <div className={`${cyberPanelClass} p-4`}>
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-base font-bold">Sales command</h3>
                <button
                  type="button"
                  onClick={() => setActiveTab("create")}
                  className={`${cyberPrimaryButtonClass} h-9 px-3 text-xs`}
                >
                  <Plus className="h-4 w-4" />
                  New product
                </button>
              </div>
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                <div className={`${cyberInnerPanelClass} p-4`}>
                  <p className="text-xs text-steel-500">Next payout</p>
                  <p className="mt-2 text-xl font-bold text-white">
                    {formatMoney(
                      profile.currency.symbol,
                      stats.grossRevenue * 0.82,
                    )}
                  </p>
                  <p className="mt-2 text-xs text-steel-500">
                    Pending settlement
                  </p>
                </div>
                <div className={`${cyberInnerPanelClass} p-4`}>
                  <p className="text-xs text-steel-500">Response time</p>
                  <p className="mt-2 text-xl font-bold text-white">14 min</p>
                  <p className="mt-2 text-xs text-steel-500">
                    Median chat reply
                  </p>
                </div>
                <div className={`${cyberInnerPanelClass} p-4`}>
                  <p className="text-xs text-steel-500">Verification</p>
                  <p className="mt-2 text-xl font-bold text-lime-300 drop-shadow-[0_0_10px_rgba(163,255,18,0.32)]">
                    Active
                  </p>
                  <p className="mt-2 text-xs text-steel-500">
                    Seller tools unlocked
                  </p>
                </div>
              </div>
            </div>

            <div className={`${cyberPanelClass} p-4`}>
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold">Latest buyer chat</h3>
                <button
                  type="button"
                  onClick={() => setActiveTab("inbox")}
                  className="inline-flex items-center gap-1 text-xs font-bold text-lime-300 transition hover:text-lime-100"
                >
                  Inbox
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
                  <div className="rounded-lg border border-dashed border-lime-300/20 bg-black/20 py-8 text-center text-sm text-steel-500">
                    No buyer messages yet.
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        ) : null}

        {activeTab === "products" ? (
          <div className="space-y-3">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <h3 className="text-base font-bold">Product listings</h3>
                <p className="mt-1 text-xs text-steel-500">
                  {listings.length} products in seller catalog
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab("create")}
                className={`${cyberPrimaryButtonClass} h-10 px-4 text-sm`}
              >
                <PackagePlus className="h-4 w-4" />
                Create product
              </button>
            </div>

            {listings.map((listing) => (
              <ListingRow
                key={listing.id}
                listing={listing}
                onChangeStatus={handleChangeStatus}
                onDelete={handleDeleteListing}
              />
            ))}

            {listings.length === 0 ? (
              <div className="rounded-xl border border-dashed border-lime-300/20 bg-black/20 py-12 text-center shadow-[inset_0_0_28px_rgba(132,255,0,0.05)]">
                <Store className="mx-auto h-10 w-10 text-lime-300/70 drop-shadow-[0_0_12px_rgba(163,255,18,0.45)]" />
                <p className="mt-3 text-sm font-bold text-white">
                  No products yet
                </p>
              </div>
            ) : null}
          </div>
        ) : null}

        {activeTab === "create" ? (
          <div className="grid max-h-none gap-5 overflow-visible xl:grid-cols-[minmax(0,1fr)_minmax(280px,320px)]">
            <div className={`${cyberPanelClass} min-w-0 p-4`}>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="space-y-2 md:col-span-2">
                  <span className="text-xs font-bold text-lime-100/80">
                    Product name
                  </span>
                  <input
                    value={form.title}
                    onChange={(event) =>
                      updateFormField("title", event.target.value)
                    }
                    className={cyberInputClass}
                    placeholder="Example: Steam Gift Card $50"
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-xs font-bold text-lime-100/80">
                    Product type
                  </span>
                  <select
                    value={form.productType}
                    onChange={(event) =>
                      updateFormField("productType", event.target.value)
                    }
                    className={cyberInputClass}
                  >
                    {productTypeOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="space-y-2">
                  <span className="text-xs font-bold text-lime-100/80">
                    Platform
                  </span>
                  <select
                    value={form.platform}
                    onChange={(event) =>
                      updateFormField("platform", event.target.value)
                    }
                    className={cyberInputClass}
                  >
                    {platformOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="space-y-2">
                  <span className="text-xs font-bold text-lime-100/80">
                    Edition
                  </span>
                  <input
                    value={form.edition}
                    onChange={(event) =>
                      updateFormField("edition", event.target.value)
                    }
                    className={cyberInputClass}
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-xs font-bold text-lime-100/80">
                    Region
                  </span>
                  <select
                    value={form.activationRegion}
                    onChange={(event) =>
                      updateFormField("activationRegion", event.target.value)
                    }
                    className={cyberInputClass}
                  >
                    {regionOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="space-y-2">
                  <span className="text-xs font-bold text-lime-100/80">
                    Delivery
                  </span>
                  <select
                    value={form.delivery}
                    onChange={(event) =>
                      updateFormField("delivery", event.target.value)
                    }
                    className={cyberInputClass}
                  >
                    {deliveryOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>

                <div className="space-y-2">
                  <span className="text-xs font-bold text-lime-100/80">
                    Image
                  </span>
                  <div className="grid grid-cols-[88px_1fr] gap-3">
                    <div className="relative h-16 overflow-hidden rounded-lg border border-lime-300/25 bg-black shadow-[0_0_18px_rgba(163,255,18,0.12)]">
                      <ProductImage
                        src={form.imageUrl}
                        alt="Product upload preview"
                        sizes="88px"
                      />
                    </div>
                    <div className="flex min-w-0 flex-col gap-2">
                      <label
                        className={`${cyberPrimaryButtonClass} h-10 cursor-pointer px-3 text-sm`}
                      >
                        <Upload className="h-4 w-4" />
                        Upload image
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleUploadImage}
                          className="sr-only"
                        />
                      </label>
                      <button
                        type="button"
                        onClick={() =>
                          updateFormField("imageUrl", imageOptions[0].value)
                        }
                        className={`${cyberGhostButtonClass} h-8 px-3 text-xs text-steel-300`}
                      >
                        <X className="h-3.5 w-3.5" />
                        Reset
                      </button>
                    </div>
                  </div>
                </div>

                <label className="space-y-2">
                  <span className="text-xs font-bold text-lime-100/80">
                    Price
                  </span>
                  <div className="grid grid-cols-[74px_1fr] gap-2">
                    <input
                      value={form.currency}
                      onChange={(event) =>
                        updateFormField("currency", event.target.value)
                      }
                      className={cyberInputClass}
                    />
                    <input
                      value={form.price}
                      type="number"
                      min="0"
                      step="0.01"
                      onChange={(event) =>
                        updateFormField("price", event.target.value)
                      }
                      className={cyberInputClass}
                    />
                  </div>
                </label>

                <label className="space-y-2">
                  <span className="text-xs font-bold text-lime-100/80">
                    Stock
                  </span>
                  <input
                    value={form.stock}
                    type="number"
                    min="0"
                    step="1"
                    onChange={(event) =>
                      updateFormField("stock", event.target.value)
                    }
                    className={cyberInputClass}
                  />
                </label>

                <label className="space-y-2 md:col-span-2">
                  <span className="text-xs font-bold text-lime-100/80">
                    Description
                  </span>
                  <textarea
                    value={form.description}
                    onChange={(event) =>
                      updateFormField("description", event.target.value)
                    }
                    className={cyberTextareaClass}
                    placeholder="Delivery notes, warranty, activation details"
                  />
                </label>
              </div>

              {formError ? (
                <p className="mt-4 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-300">
                  {formError}
                </p>
              ) : null}

              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => handleSaveListing("draft")}
                  className={`${cyberGhostButtonClass} h-11 px-5 text-sm`}
                >
                  <Archive className="h-4 w-4" />
                  Save draft
                </button>
                <button
                  type="button"
                  onClick={() => handleSaveListing("published")}
                  className={`${cyberPrimaryButtonClass} h-11 px-5 text-sm`}
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Publish now
                </button>
              </div>
            </div>

            <div className={`${cyberPanelClass} min-w-0 overflow-hidden p-4`}>
              <p className="text-xs font-bold tracking-[0.16em] text-lime-300/75 uppercase">
                Preview
              </p>
              <div className="relative mt-4 aspect-[16/10] overflow-hidden rounded-xl border border-lime-300/25 bg-black shadow-[0_0_26px_rgba(163,255,18,0.14)]">
                <ProductImage
                  src={form.imageUrl}
                  alt={form.title || "Product preview"}
                  sizes="320px"
                />
              </div>
              <h3 className="mt-4 line-clamp-2 text-lg font-bold drop-shadow-[0_0_10px_rgba(163,255,18,0.2)]">
                {form.title || "New product"}
              </h3>
              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                <span className="rounded-full border border-lime-300/15 bg-lime-300/10 px-2.5 py-1 text-lime-100">
                  {form.productType}
                </span>
                <span className="rounded-full border border-cyan-300/15 bg-cyan-300/10 px-2.5 py-1 text-cyan-100">
                  {form.platform}
                </span>
                <span className="rounded-full border border-lime-300/25 bg-lime-300/10 px-2.5 py-1 font-bold text-lime-300">
                  {form.delivery}
                </span>
              </div>
              <div className="mt-5 grid gap-2 border-t border-lime-300/15 pt-4 sm:grid-cols-[1fr_auto] sm:items-end">
                <span className="text-xs text-steel-500">Total amount</span>
                <span className="min-w-0 text-left text-2xl leading-tight font-bold break-words text-lime-100 drop-shadow-[0_0_12px_rgba(163,255,18,0.24)] sm:text-right">
                  {form.currency} {Number(form.price || 0).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        ) : null}

        {activeTab === "inbox" ? (
          <div
            id="seller-inbox"
            className="grid min-h-[520px] gap-4 lg:grid-cols-[360px_1fr]"
          >
            <div className="space-y-2">
              {conversations.map((conversation) => (
                <ConversationPreview
                  key={conversation.id}
                  conversation={conversation}
                  isActive={conversation.id === activeConversation?.id}
                  onSelect={() => handleSelectConversation(conversation.id)}
                />
              ))}

              {conversations.length === 0 ? (
                <div className="rounded-xl border border-dashed border-lime-300/20 bg-black/25 py-12 text-center text-sm text-steel-500">
                  No conversations yet.
                </div>
              ) : null}
            </div>

            <div
              className={`${cyberPanelClass} flex min-h-[520px] flex-col overflow-hidden`}
            >
              {activeConversation ? (
                <>
                  <div className="flex items-center justify-between gap-3 border-b border-lime-300/15 bg-black/20 px-4 py-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-lime-300/25 bg-black shadow-[0_0_18px_rgba(163,255,18,0.16)]">
                        <Image
                          src={activeConversation.buyerAvatar}
                          alt={activeConversation.buyerName}
                          fill
                          sizes="44px"
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate font-bold text-white">
                          {activeConversation.buyerName}
                        </p>
                        <p className="truncate text-xs text-steel-500">
                          {activeConversation.listingTitle} /{" "}
                          {activeConversation.sellerName}
                        </p>
                      </div>
                    </div>
                    <span className="rounded-full border border-lime-300/25 bg-lime-300/10 px-2.5 py-1 text-xs font-bold text-lime-300">
                      Buyer
                    </span>
                  </div>

                  <div className="flex-1 space-y-4 overflow-y-auto px-4 py-5 [scrollbar-color:#a3ff12_transparent] [scrollbar-width:thin]">
                    {activeConversation.messages.map((message) => {
                      const isSeller = message.senderRole === "seller";

                      return (
                        <div
                          key={message.id}
                          className={`flex ${isSeller ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[82%] rounded-2xl px-4 py-3 ${
                              isSeller
                                ? "rounded-br-md bg-[linear-gradient(135deg,#d8ff38,#31e96e)] text-midnight-950 shadow-[0_0_20px_rgba(163,255,18,0.24)]"
                                : "rounded-bl-md border border-cyan-300/10 bg-black/35 text-white"
                            }`}
                          >
                            <p className="text-sm leading-6">{message.text}</p>
                            <p
                              className={`mt-2 text-xs ${
                                isSeller
                                  ? "text-midnight-900/70"
                                  : "text-steel-500"
                              }`}
                            >
                              {formatSellerStoreTime(message.createdAt)}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="border-t border-lime-300/15 bg-black/20 p-4">
                    <div className="flex gap-3">
                      <input
                        value={replyText}
                        onChange={(event) => setReplyText(event.target.value)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter") {
                            event.preventDefault();
                            handleSendReply();
                          }
                        }}
                        className={`${cyberInputClass} h-12 min-w-0 flex-1`}
                        placeholder="Reply to buyer..."
                      />
                      <button
                        type="button"
                        onClick={handleSendReply}
                        className={`${cyberPrimaryButtonClass} h-12 w-12 shrink-0 p-0`}
                        aria-label="Send reply"
                      >
                        <Send className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-1 flex-col items-center justify-center text-center text-steel-500">
                  <Inbox className="h-12 w-12 text-lime-300/70 drop-shadow-[0_0_12px_rgba(163,255,18,0.45)]" />
                  <p className="mt-3 text-sm font-bold text-white">
                    Select a conversation
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : null}
      </div>

      {toastMessage ? (
        <div className="fixed right-4 bottom-6 left-4 z-[80] mx-auto flex max-w-[520px] items-center gap-3 rounded-lg border border-lime-300/25 bg-[linear-gradient(135deg,rgba(7,12,14,0.96),rgba(29,37,50,0.94))] px-4 py-3 text-sm text-white shadow-[0_0_34px_rgba(163,255,18,0.18)] sm:left-1/2 sm:-translate-x-1/2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[linear-gradient(135deg,#d8ff38,#31e96e)] text-midnight-950 shadow-[0_0_18px_rgba(163,255,18,0.38)]">
            <CheckCircle2 className="h-4 w-4" />
          </span>
          {toastMessage}
        </div>
      ) : null}
    </section>
  );
}
