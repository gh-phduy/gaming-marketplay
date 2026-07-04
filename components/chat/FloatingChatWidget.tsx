"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { X, Send, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
  id: string;
  senderId: string;
  text: string;
  createdAt: string;
  senderName: string;
  senderAvatar: string;
}

interface ActiveConversation {
  id: string;
  sellerId: string;
  buyerId: string;
  recipientId: string;
  recipientName: string;
  recipientAvatar: string;
  listingTitle: string;
}

export default function FloatingChatWidget() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [activeConversation, setActiveConversation] = useState<ActiveConversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Listen for custom trigger event to open chat
  useEffect(() => {
    const handleOpenChat = (event: Event) => {
      const customEvent = event as CustomEvent<ActiveConversation>;
      if (customEvent.detail) {
        setActiveConversation(customEvent.detail);
        setIsOpen(true);
      }
    };

    window.addEventListener("difmark:open-chat", handleOpenChat);
    return () => {
      window.removeEventListener("difmark:open-chat", handleOpenChat);
    };
  }, []);

  // Sync active chat ID to window so NavBar can suppress sounds/badges for it
  useEffect(() => {
    if (isOpen && activeConversation) {
      (window as any).difmarkActiveChatId = activeConversation.id;
    } else {
      (window as any).difmarkActiveChatId = null;
    }
    return () => {
      (window as any).difmarkActiveChatId = null;
    };
  }, [isOpen, activeConversation]);

  // Fetch messages and reset unread count when conversation changes
  useEffect(() => {
    if (!activeConversation || !isOpen) return;

    const resetUnreadOnOpen = async () => {
      if (!user?.id) return;
      const isCurrentUserSeller = activeConversation.sellerId === user.id;
      const { error } = await supabase
        .from("conversations")
        .update({
          [isCurrentUserSeller ? "unread_for_seller" : "unread_for_buyer"]: 0,
        })
        .eq("id", activeConversation.id);
      if (error) {
        console.error("Error resetting unread count on open:", error);
      }
    };

    void resetUnreadOnOpen();

    const fetchMessages = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from("messages")
          .select(`
            *,
            sender:users (
              id,
              display_name,
              avatar_url
            )
          `)
          .eq("conversation_id", activeConversation.id)
          .order("created_at", { ascending: true });

        if (error) throw error;

        const mappedMessages: Message[] = (data || []).map((row: any) => ({
          id: row.id,
          senderId: row.sender_id,
          text: row.text,
          createdAt: row.created_at,
          senderName: row.sender?.display_name || "User",
          senderAvatar: row.sender?.avatar_url || "/avt1.png",
        }));

        setMessages(mappedMessages);
      } catch (err) {
        console.error("Error loading messages:", err);
      } finally {
        setIsLoading(false);
      }
    };

    void fetchMessages();

    // Subscribe to real-time message inserts
    const subscription = supabase
      .channel(`chat-room:${activeConversation.id}-${Math.random().toString(36).substring(7)}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${activeConversation.id}`,
        },
        (payload) => {
          const newRow = payload.new as any;
          
          // Only append if it's not already in the state
          setMessages((prev) => {
            if (prev.some((m) => m.id === newRow.id)) return prev;

            const isCurrentUser = newRow.sender_id === user?.id;
            
            // If incoming message is from the other user, reset DB unread immediately since user is actively viewing
            if (!isCurrentUser) {
              const isCurrentUserSeller = activeConversation.sellerId === user?.id;
              void supabase
                .from("conversations")
                .update({
                  [isCurrentUserSeller ? "unread_for_seller" : "unread_for_buyer"]: 0,
                })
                .eq("id", activeConversation.id);
            }

            const senderName = isCurrentUser 
              ? (user?.name || "Me") 
              : activeConversation.recipientName;
            const senderAvatar = isCurrentUser 
              ? (user?.picture || "/avt1.png") 
              : activeConversation.recipientAvatar;

            return [
              ...prev,
              {
                id: newRow.id,
                senderId: newRow.sender_id,
                text: newRow.text,
                createdAt: newRow.created_at,
                senderName,
                senderAvatar,
              },
            ];
          });
        }
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(subscription);
    };
  }, [activeConversation, isOpen, user]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeConversation || !user || isSending) return;

    const messageText = newMessage.trim();
    setNewMessage("");
    setIsSending(true);

    try {
      const { data, error } = await supabase
        .from("messages")
        .insert({
          conversation_id: activeConversation.id,
          sender_id: user.id,
          text: messageText,
        })
        .select()
        .single();

      if (error) throw error;

      // Update local state immediately if realtime subscription is delayed
      setMessages((prev) => {
        if (prev.some((m) => m.id === data.id)) return prev;
        return [
          ...prev,
          {
            id: data.id,
            senderId: data.sender_id,
            text: data.text,
            createdAt: data.created_at,
            senderName: user.name || "Me",
            senderAvatar: user.picture || "/avt1.png",
          },
        ];
      });
    } catch (err) {
      console.error("Error sending message:", err);
    } finally {
      setIsSending(false);
    }
  };

  if (!isOpen || !activeConversation) return null;

  return (
    <div className="fixed right-6 bottom-6 z-50 flex h-[480px] w-[360px] flex-col overflow-hidden rounded-xl border border-white/[0.06] bg-[#161e28] text-white shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#2a3545] bg-[#1a2432] px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="relative h-9 w-9 overflow-hidden rounded-full bg-[#111923]">
            <Image
              src={activeConversation.recipientAvatar}
              alt={activeConversation.recipientName}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="text-sm font-bold leading-tight text-white">
              {activeConversation.recipientName}
            </h3>
            <p className="text-[10px] text-emerald-400">
              {activeConversation.listingTitle || "Marketplace Conversation"}
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="rounded-md p-1 text-[#6b7a8d] hover:bg-white/[0.06] hover:text-white"
        >
          <X size={18} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#111822]">
        {isLoading ? (
          <div className="flex h-full items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-emerald-400" />
          </div>
        ) : (
          <>
            {messages.map((msg) => {
              const isMe = msg.senderId === user?.id;
              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 max-w-[85%] ${
                    isMe ? "ml-auto flex-row-reverse" : ""
                  }`}
                >
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
                  <div
                    className={`rounded-lg px-3 py-2 text-xs leading-normal ${
                      isMe
                        ? "bg-[#4ade80] text-black font-semibold rounded-tr-none"
                        : "bg-[#252f3d] text-gray-100 rounded-tl-none"
                    }`}
                  >
                    <p className="break-words">{msg.text}</p>
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
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSendMessage} className="border-t border-[#2a3545] bg-[#161e28] p-3 flex gap-2">
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="h-10 bg-[#202936] border-none text-white placeholder:text-gray-500 focus-visible:ring-1 focus-visible:ring-emerald-400/50"
        />
        <Button
          type="submit"
          disabled={!newMessage.trim() || isSending}
          className="h-10 w-10 shrink-0 bg-emerald-400 p-0 text-black hover:bg-emerald-300 disabled:opacity-50"
        >
          <Send size={16} />
        </Button>
      </form>
    </div>
  );
}
