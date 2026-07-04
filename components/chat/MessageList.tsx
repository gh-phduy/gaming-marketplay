"use client";

import React, { RefObject } from "react";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import type { Message } from "./useFloatingChat";

/* ==========================================================================
   TYPE DEFINITIONS & INTERFACES
   ========================================================================== */

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
  currentUserId?: string;
  messagesEndRef: RefObject<HTMLDivElement | null>;
}

/* ==========================================================================
   MAIN COMPONENT: MessageList
   ========================================================================== */

/**
 * MessageList Component
 *
 * Renders the scrolling message timeline list.
 * Sorts and aligns rows (right for self, left for recipient) and handles
 * active scroll-to-bottom actions on new message arrival.
 */
export function MessageList({
  messages,
  isLoading,
  currentUserId,
  messagesEndRef,
}: MessageListProps) {
  // Loading skeleton state
  if (isLoading) {
    return (
      <div className="flex-1 overflow-y-auto p-4 bg-[#111822] flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-emerald-400" />
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#111822]">
      {messages.map((msg) => {
        const isMe = msg.senderId === currentUserId;
        
        return (
          <div
            key={msg.id}
            className={`flex items-start gap-2.5 max-w-[85%] ${
              isMe ? "ml-auto flex-row-reverse" : ""
            }`}
          >
            {/* Recipient Avatar display */}
            {!isMe && (
              <div className="relative h-7 w-7 shrink-0 overflow-hidden rounded-full bg-slate-700">
                <Image
                  src={msg.senderAvatar}
                  alt={msg.senderName}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            
            {/* Message bubble */}
            <div
              className={`rounded-lg px-3 py-2 text-xs leading-normal ${
                isMe
                  ? "bg-[#4ade80] text-black font-semibold rounded-tr-none"
                  : "bg-[#252f3d] text-gray-100 rounded-tl-none"
              }`}
            >
              <p className="break-words">{msg.text}</p>
              
              {/* Formatted timestamp */}
              <span className="block mt-1 text-[9px] opacity-60 text-right">
                {new Date(msg.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
        );
      })}
      
      {/* Scroll Anchor Ref element */}
      <div ref={messagesEndRef} />
    </div>
  );
}

