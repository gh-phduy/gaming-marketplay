"use client";

import React from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSending: boolean;
}

export function ChatInput({ value, onChange, onSubmit, isSending }: ChatInputProps) {
  return (
    <form onSubmit={onSubmit} className="border-t border-[#2a3545] bg-[#161e28] p-3 flex gap-2">
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type a message..."
        className="h-10 bg-[#202936] border-none text-white placeholder:text-gray-500 focus-visible:ring-1 focus-visible:ring-emerald-400/50"
      />
      <Button
        type="submit"
        disabled={!value.trim() || isSending}
        className="h-10 w-10 shrink-0 bg-emerald-400 p-0 text-black hover:bg-emerald-300 disabled:opacity-50"
      >
        <Send size={16} />
      </Button>
    </form>
  );
}
