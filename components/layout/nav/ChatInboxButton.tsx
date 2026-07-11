"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import Image from "next/image";
import { MessageCircle, X } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { playNotificationSound } from "@/lib/utils/audio";
import { useTranslations } from "next-intl";

interface ChatInboxButtonProps {
  accountId?: string | null;
}

type ChatPreview = {
  id: string;
  sellerId: string;
  buyerId: string;
  sellerName: string;
  avatar: string;
  message: string;
  createdAt: string;
  unread: boolean;
  unreadCount: number;
  recipientId: string;
  listingTitle: string;
};

export default function ChatInboxButton({ accountId }: ChatInboxButtonProps) {
  const t = useTranslations("nav");
  const [isOpen, setIsOpen] = useState(false);
  const [chats, setChats] = useState<ChatPreview[]>([]);
  const inboxRef = useRef<HTMLDivElement | null>(null);
  const unreadCount = useMemo(() => chats.reduce((total, chat) => total + chat.unreadCount, 0), [chats]);

  const mapDbConversationToPreview = (row: any, currentUserId: string): ChatPreview => {
    const isSeller = row.seller_id === currentUserId;
    const recipient = isSeller ? row.buyer : row.seller;

    // Get last message
    const sortedMessages = (row.messages || []).sort((a: any, b: any) =>
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    );
    const lastMsg = sortedMessages[sortedMessages.length - 1];
    const lastMsgText = lastMsg ? lastMsg.text : t("noMessagesYet");

    const formattedTime = lastMsg
      ? new Date(lastMsg.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      : new Date(row.updated_at).toLocaleDateString();

    const unreadCountVal = isSeller ? (row.unread_for_seller || 0) : (row.unread_for_buyer || 0);

    return {
      id: row.id,
      sellerId: row.seller_id,
      buyerId: row.buyer_id,
      sellerName: recipient?.display_name || t("unknown"),
      avatar: recipient?.avatar_url || "/avt1.png",
      message: lastMsgText,
      createdAt: formattedTime,
      unread: unreadCountVal > 0,
      unreadCount: unreadCountVal,
      recipientId: recipient?.id || "",
      listingTitle: row.listing_title || t("chat"),
    };
  };

  const fetchConversations = async () => {
    if (!accountId) return;

    const { data, error } = await supabase
      .from("conversations")
      .select(`
        *,
        seller:users!conversations_seller_id_fkey (
          id,
          display_name,
          avatar_url
        ),
        buyer:users!conversations_buyer_id_fkey (
          id,
          display_name,
          avatar_url
        ),
        messages (
          id,
          sender_id,
          text,
          created_at
        )
      `)
      .or(`buyer_id.eq.${accountId},seller_id.eq.${accountId}`)
      .order("updated_at", { ascending: false });

    if (error) {
      console.error("Error fetching conversations in nav:", error);
      return;
    }

    setChats((data || []).map((row) => mapDbConversationToPreview(row, accountId)));
  };

  useEffect(() => {
    void fetchConversations();

    if (!accountId) return;

    // Listen to message inserts to refresh unread counts
    const subscription = supabase
      .channel(`inbox-chats-${accountId}-${Math.random().toString(36).substring(7)}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        },
        (payload) => {
          const newRow = payload.new as any;
          if (newRow && newRow.sender_id !== accountId) {
            const activeChatId = (window as any).difmarkActiveChatId;
            if (newRow.conversation_id !== activeChatId) {
              playNotificationSound();
            }
          }
          void fetchConversations();
        }
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(subscription);
    };
  }, [accountId]);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!inboxRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleOpenChat = async (chat: ChatPreview) => {
    setIsOpen(false);

    if (!accountId) return;

    // Update local state instantly so the badge disappears immediately
    setChats((prevChats) =>
      prevChats.map((c) => (c.id === chat.id ? { ...c, unread: false, unreadCount: 0 } : c))
    );

    const isCurrentUserSeller = chat.sellerId === accountId;
    await supabase
      .from("conversations")
      .update({
        [isCurrentUserSeller ? "unread_for_seller" : "unread_for_buyer"]: 0,
      })
      .eq("id", chat.id);

    window.dispatchEvent(
      new CustomEvent("difmark:open-chat", {
        detail: {
          id: chat.id,
          sellerId: chat.sellerId,
          buyerId: chat.buyerId,
          recipientId: chat.recipientId,
          recipientName: chat.sellerName,
          recipientAvatar: chat.avatar,
          listingTitle: chat.listingTitle,
        },
      })
    );
  };

  return (
    <div ref={inboxRef} className="relative">
      <button
        type="button"
        aria-label={t("messages")}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
        className="relative flex h-10 w-10 items-center justify-center rounded-lg text-steel-500 transition hover:bg-white/[0.06] hover:text-dm-text-primary focus-visible:ring-2 focus-visible:ring-[#4ade80]/70 focus-visible:outline-none"
      >
        <MessageCircle size={24} aria-hidden />
        {unreadCount > 0 ? (
          <span className="absolute top-1 right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#ef4444] px-1 text-[10px] leading-none font-bold text-white">
            {unreadCount}
          </span>
        ) : null}
      </button>

      {isOpen ? (
        <div
          role="dialog"
          aria-label={t("messages")}
          className="fixed top-[78px] right-3 left-3 z-[90] overflow-hidden rounded-xl border border-[#2a3545] bg-[#161e28] text-white shadow-[0_24px_64px_rgba(0,0,0,0.55)] sm:absolute sm:top-[calc(100%+14px)] sm:right-0 sm:left-auto sm:w-[380px]"
        >
          <span
            className="absolute -top-2 right-9 hidden h-4 w-4 rotate-45 border-t border-l border-[#2a3545] bg-[#161e28] sm:block"
            aria-hidden
          />

          <div className="flex items-start justify-between px-5 pt-5 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-[6px] w-[6px] rounded-full bg-[#4ade80]" />
                <p className="text-[10px] font-bold tracking-[0.18em] text-[#6b7a8d] uppercase">
                  {t("inbox")}
                </p>
              </div>
              <h2 className="mt-2.5 text-xl leading-none font-bold">
                {t("messages")}
              </h2>
            </div>
            <button
              type="button"
              className="flex h-7 w-7 items-center justify-center rounded-md text-[#6b7a8d] transition hover:bg-white/[0.06] hover:text-white"
              onClick={() => setIsOpen(false)}
              aria-label={t("closeMessages")}
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="max-h-[min(420px,calc(100vh-220px))] space-y-0.5 overflow-y-auto px-2 pb-3">
            {chats.map((chat) => (
              <button
                key={chat.id}
                type="button"
                onClick={() => void handleOpenChat(chat)}
                className={`flex w-full items-start gap-3 rounded-lg px-3.5 py-3.5 text-left transition hover:bg-[#222f3f] ${
                  chat.unread ? "bg-[#1c2736]" : "bg-transparent"
                }`}
              >
                <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-[#111923]">
                  <Image
                    src={chat.avatar}
                    alt={chat.sellerName}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center justify-between gap-3">
                    <span className="truncate text-[13px] font-bold text-white">
                      {chat.sellerName}
                    </span>
                    <span className="shrink-0 text-[11px] font-semibold text-[#4ade80]">
                      {chat.createdAt}
                    </span>
                  </span>
                  <span className="mt-1 line-clamp-2 block text-[12px] leading-[18px] text-[#7a8ba0]">
                    {chat.message}
                  </span>
                </span>
                {chat.unreadCount > 0 ? (
                  <span className="mt-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#4ade80] px-1 text-[10px] font-bold text-black shrink-0">
                    {chat.unreadCount}
                  </span>
                ) : null}
              </button>
            ))}
            {chats.length === 0 && (
              <div className="px-5 py-8 text-center text-sm text-[#7a8ba0]">
                {t("noMessagesYet")}
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
