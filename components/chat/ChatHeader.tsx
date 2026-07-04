"use client";

import React from "react";
import Image from "next/image";
import { X } from "lucide-react";
import type { ActiveConversation } from "./useFloatingChat";

/* ==========================================================================
   TYPE DEFINITIONS & INTERFACES
   ========================================================================== */

interface ChatHeaderProps {
  conversation: ActiveConversation;
  onClose: () => void;
}

/* ==========================================================================
   MAIN COMPONENT: ChatHeader
   ========================================================================== */

/**
 * ChatHeader Component
 *
 * Renders the top navigation panel of the floating chat window.
 * Displays the recipient's avatar thumbnail, name, active listing title,
 * and handles closing triggers.
 */
export function ChatHeader({ conversation, onClose }: ChatHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b border-[#2a3545] bg-[#1a2432] px-4 py-3">
      {/* Recipient Details Segment */}
      <div className="flex items-center gap-3">
        <div className="relative h-9 w-9 overflow-hidden rounded-full bg-[#111923]">
          <Image
            src={conversation.recipientAvatar}
            alt={conversation.recipientName}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h3 className="text-sm font-bold leading-tight text-white">
            {conversation.recipientName}
          </h3>
          <p className="text-[10px] text-emerald-400">
            {conversation.listingTitle || "Marketplace Conversation"}
          </p>
        </div>
      </div>
      
      {/* Close Action Trigger */}
      <button
        onClick={onClose}
        className="rounded-md p-1 text-[#6b7a8d] hover:bg-white/[0.06] hover:text-white"
        aria-label="Close chat"
      >
        <X size={18} />
      </button>
    </div>
  );
}

