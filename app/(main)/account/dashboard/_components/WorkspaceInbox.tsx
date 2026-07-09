"use client";

import React from "react";
import Image from "next/image";
import { Inbox, Send } from "lucide-react";
import {
  cyberPanelClass,
  cyberInputClass,
  cyberPrimaryButtonClass,
  ConversationPreview,
} from "./SellerWorkspaceComponents";
import { formatSellerStoreTime } from "@/components/marketplace/seller-marketplace-store";

/* ==========================================================================
   TYPE DEFINITIONS & INTERFACES
   ========================================================================== */

interface WorkspaceInboxProps {
  conversations: any[];
  activeConversation: any;
  replyText: string;
  setReplyText: (value: string) => void;
  handleSelectConversation: (id: string) => void;
  handleSendReply: () => void;
}

/* ==========================================================================
   MAIN COMPONENT: WorkspaceInbox
   ========================================================================== */

/**
 * WorkspaceInbox Component
 *
 * Renders the communication panel displaying buyer conversation history threads
 * and an active interactive timeline dialog with real-time text input replies.
 */
export function WorkspaceInbox({
  conversations,
  activeConversation,
  replyText,
  setReplyText,
  handleSelectConversation,
  handleSendReply,
}: WorkspaceInboxProps) {
  return (
    <div
      id="seller-inbox"
      className="grid min-h-[520px] gap-4 lg:grid-cols-[360px_1fr]"
    >
      {/* Left Column: Conversation thread listing sidebar */}
      <div className="space-y-2">
        {conversations.map((conversation) => (
          <ConversationPreview
            key={conversation.id}
            conversation={conversation}
            isActive={conversation.id === activeConversation?.id}
            onSelect={() => handleSelectConversation(conversation.id)}
          />
        ))}

        {/* Empty Inbox state banner */}
        {conversations.length === 0 ? (
          <div className="rounded-xl border border-dashed border-forest-500/20 bg-black/25 py-12 text-center text-sm text-steel-500">
            No conversations yet.
          </div>
        ) : null}
      </div>

      {/* Right Column: Chat timeline dialog log */}
      <div
        className={`${cyberPanelClass} flex min-h-[520px] flex-col overflow-hidden`}
      >
        {activeConversation ? (
          <>
            {/* Conversation Header recipient stats */}
            <div className="flex items-center justify-between gap-3 border-b border-forest-500/15 bg-black/20 px-4 py-4">
              <div className="flex min-w-0 items-center gap-3">
                <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-forest-500/25 bg-black shadow-[0_0_18px_rgba(98,214,118,0.16)]">
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
              <span className="rounded-full border border-forest-500/25 bg-forest-500/10/10 px-2.5 py-1 text-xs font-bold text-forest-100">
                Buyer
              </span>
            </div>

            {/* Messages body scrolling segment */}
            <div className="flex-1 space-y-4 overflow-y-auto px-4 py-5 [scrollbar-color:#62d676_transparent] [scrollbar-width:thin]">
              {activeConversation.messages.map((message: any) => {
                const isSeller = message.senderRole === "seller";

                return (
                  <div
                    key={message.id}
                    className={`flex ${isSeller ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[82%] rounded-2xl px-4 py-3 ${
                        isSeller
                          ? "rounded-br-md bg-[linear-gradient(135deg,#d0f0d6,#62d676)] text-midnight-950 shadow-[0_0_20px_rgba(98,214,118,0.24)]"
                          : "rounded-bl-md border border-cyan-300/10 bg-black/35 text-white"
                      }`}
                    >
                      <p className="text-sm leading-6">{message.text}</p>
                      <p
                        className={`mt-2 text-xs ${
                          isSeller ? "text-midnight-900/70" : "text-steel-500"
                        }`}
                      >
                        {formatSellerStoreTime(message.createdAt)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Text Reply Composer section */}
            <div className="border-t border-forest-500/15 bg-black/20 p-4">
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
          /* Empty Chat state banner */
          <div className="flex flex-1 flex-col items-center justify-center text-center text-steel-500">
            <Inbox className="h-12 w-12 text-forest-100/70 drop-shadow-[0_0_12px_rgba(98,214,118,0.45)]" />
            <p className="mt-3 text-sm font-bold text-white">
              Select a conversation
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
