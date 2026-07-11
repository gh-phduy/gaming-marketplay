"use client";

import Image from "next/image";
import { useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import type { SellerProfile } from "../seller-profile.data";
import { useTranslations } from "next-intl";

interface SellerChatPanelProps {
  profile: SellerProfile;
  isOpen: boolean;
  onClose: () => void;
  onNotify: (message: string) => void;
}

export default function SellerChatPanel({
  profile,
  isOpen,
  onClose,
  onNotify,
}: SellerChatPanelProps) {
  const t = useTranslations("user");
  const [message, setMessage] = useState("");

  if (!isOpen) return null;

  const handleSendMessage = () => {
    if (!message.trim()) return;

    setMessage("");
    onNotify(t("messageSent"));
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center bg-black/60 px-3 py-4 backdrop-blur-sm sm:items-center">
      <section
        role="dialog"
        aria-modal="true"
        aria-label={`${t("chatWith")} ${profile.name}`}
        className="w-full max-w-[520px] overflow-hidden rounded-lg border border-midnight-650 bg-midnight-800 text-white shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-midnight-650 bg-midnight-750 px-5 py-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-midnight-700">
              <Image
                src={profile.avatar || "/avt1.png"}
                alt={profile.name}
                fill
                sizes="44px"
                className="object-cover"
              />
            </div>
            <div className="min-w-0">
              <h2 className="truncate text-lg font-bold">{profile.name}</h2>
              <p className="flex items-center gap-2 text-sm text-forest-500">
                <span className="h-2 w-2 rounded-full bg-forest-500" />
                {t("online")}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-md text-steel-500 transition hover:bg-midnight-650 hover:text-white"
            aria-label={t("closeChat")}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4 px-5 py-5">
          <div className="flex items-start gap-3">
            <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full bg-midnight-700">
              <Image
                src={profile.avatar || "/avt1.png"}
                alt={profile.name}
                fill
                sizes="32px"
                className="object-cover"
              />
            </div>
            <div className="max-w-[78%] rounded-lg bg-midnight-700 px-4 py-3 text-sm leading-6 text-steel-300">
              {t("chatGreeting")}
            </div>
          </div>

          <div className="rounded-lg border border-midnight-650 bg-midnight-750 px-4 py-3">
            <p className="flex items-center gap-2 text-xs font-bold tracking-[0.12em] text-steel-500 uppercase">
              <MessageCircle className="h-4 w-4" />
              {t("sellerStats")}
            </p>
            <div className="mt-3 grid grid-cols-3 gap-3 text-sm">
              <div>
                <p className="font-bold text-white">{profile.totalSales}</p>
                <p className="text-steel-500">{t("trades")}</p>
              </div>
              <div>
                <p className="font-bold text-white">
                  {profile.successRate.toFixed(1)}%
                </p>
                <p className="text-steel-500">{t("success")}</p>
              </div>
              <div>
                <p className="font-bold text-white">{profile.timezone}</p>
                <p className="text-steel-500">{t("timezone")}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-midnight-650 bg-midnight-750 p-4">
          <div className="flex gap-3">
            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder={t("writeAMessage")}
              rows={2}
              className="min-h-12 flex-1 resize-none rounded-md border border-midnight-650 bg-midnight-800 px-3 py-2 text-sm text-white outline-none transition placeholder:text-steel-600 focus:border-forest-500"
            />
            <button
              type="button"
              onClick={handleSendMessage}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-forest-500 text-midnight-950 transition hover:bg-forest-100 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={!message.trim()}
              aria-label={t("sendMessage")}
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
