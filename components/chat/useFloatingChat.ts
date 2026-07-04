"use client";

import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";

export interface Message {
  id: string;
  senderId: string;
  text: string;
  createdAt: string;
  senderName: string;
  senderAvatar: string;
}

export interface ActiveConversation {
  id: string;
  sellerId: string;
  buyerId: string;
  recipientId: string;
  recipientName: string;
  recipientAvatar: string;
  listingTitle: string;
}

export function useFloatingChat() {
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

  return {
    isOpen,
    setIsOpen,
    activeConversation,
    messages,
    newMessage,
    setNewMessage,
    isLoading,
    isSending,
    messagesEndRef,
    handleSendMessage,
    currentUser: user,
  };
}
