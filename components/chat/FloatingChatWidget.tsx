"use client";

import React from "react";
import { useFloatingChat } from "./useFloatingChat";
import { ChatHeader } from "./ChatHeader";
import { MessageList } from "./MessageList";
import { ChatInput } from "./ChatInput";

export default function FloatingChatWidget() {
  const {
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
    currentUser,
  } = useFloatingChat();

  if (!isOpen || !activeConversation) return null;

  return (
    <div className="fixed right-6 bottom-6 z-50 flex h-[480px] w-[360px] flex-col overflow-hidden rounded-xl border border-white/[0.06] bg-[#161e28] text-white shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
      <ChatHeader
        conversation={activeConversation}
        onClose={() => setIsOpen(false)}
      />
      <MessageList
        messages={messages}
        isLoading={isLoading}
        currentUserId={currentUser?.id}
        messagesEndRef={messagesEndRef}
      />
      <ChatInput
        value={newMessage}
        onChange={setNewMessage}
        onSubmit={handleSendMessage}
        isSending={isSending}
      />
    </div>
  );
}
