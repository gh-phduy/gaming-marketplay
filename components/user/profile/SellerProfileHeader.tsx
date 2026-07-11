"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import {
  BadgeCheck,
  Banknote,
  CheckCircle2,
  ChevronDown,
  Copy,
  Languages,
  Link2,
  MapPin,
  MessageCircle,
  Send,
  Share2,
  ShieldCheck,
  ThumbsDown,
  ThumbsUp,
  Trophy,
  Twitter,
  UserCheck,
  UserPlus,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getSellerProfilePath } from "../seller-profile.route";
import type { SellerProfile } from "../seller-profile.data";

interface SellerProfileHeaderProps {
  profile: SellerProfile;
  isDescriptionOpen: boolean;
  isFollowing: boolean;
  onToggleDescription: () => void;
  onToggleFollow: () => void;
  onOpenChat: () => void;
  onNotify: (message: string) => void;
}

function formatNumber(value: number) {
  return value.toLocaleString("en-US").replace(/,/g, " ");
}

function FlagBadge({ code }: { code: string }) {
  const t = useTranslations("user");

  if (code === "BG") {
    return (
      <span
        className="inline-flex h-4 w-7 overflow-hidden rounded-sm border border-white/20"
        aria-label={t("bulgaria")}
      >
        <span className="h-full flex-1 bg-white" />
        <span className="h-full flex-1 bg-forest-500" />
        <span className="h-full flex-1 bg-red-500" />
      </span>
    );
  }

  if (code === "EN") {
    return (
      <span className="relative inline-flex h-5 w-7 overflow-hidden rounded-sm">
        <Image src="/en.svg" alt={t("english")} fill className="object-cover" />
      </span>
    );
  }

  return <span className="font-semibold text-white">{code}</span>;
}

function StatPair({
  label,
  value,
  icon,
  tone = "default",
}: {
  label: string;
  value: string;
  icon?: ReactNode;
  tone?: "default" | "positive" | "negative";
}) {
  const toneClass =
    tone === "positive"
      ? "text-forest-500"
      : tone === "negative"
        ? "text-red-400"
        : "text-white";

  return (
    <div className="grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-2">
      <span className="inline-flex items-center gap-2 text-steel-300">
        {icon}
        {label}
      </span>
      <span className={`font-bold ${toneClass}`}>{value}</span>
    </div>
  );
}

export default function SellerProfileHeader({
  profile,
  isDescriptionOpen,
  isFollowing,
  onToggleDescription,
  onToggleFollow,
  onOpenChat,
  onNotify,
}: SellerProfileHeaderProps) {
  const t = useTranslations("user");

  const profilePath = getSellerProfilePath(profile.name);

  const getShareUrl = () => {
    if (typeof window === "undefined") {
      return profilePath;
    }

    return `${window.location.origin}${profilePath}`;
  };

  const copyProfileLink = async () => {
    const shareUrl = getShareUrl();

    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
      }
      onNotify(t("profileLinkCopied"));
    } catch {
      onNotify(t("profileLinkReadyToCopy"));
    }
  };

  const openShareWindow = (target: "telegram" | "twitter" | "whatsapp") => {
    const url = encodeURIComponent(getShareUrl());
    const text = encodeURIComponent(`Check ${profile.name} on Difmark`);
    const shareTargets = {
      telegram: `https://t.me/share/url?url=${url}&text=${text}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
      whatsapp: `https://wa.me/?text=${text}%20${url}`,
    };

    window.open(shareTargets[target], "_blank", "noopener,noreferrer");
  };

  return (
    <section className="overflow-hidden rounded-md bg-midnight-800 shadow-2xl shadow-black/20">
      <div className="relative h-[150px] w-full overflow-hidden bg-midnight-700 sm:h-[180px]">
        <Image
          src={profile.banner}
          alt={`${profile.name} banner`}
          fill
          className="object-cover"
          priority
          sizes="1140px"
        />
        <Popover>
          <PopoverTrigger className="absolute top-4 right-5 inline-flex h-10 items-center gap-2 rounded-lg bg-midnight-700/80 px-4 text-sm font-bold text-white shadow-lg transition hover:bg-midnight-650">
            <Share2 className="h-4 w-4" />
            {t("share")}
          </PopoverTrigger>
          <PopoverContent
            align="end"
            sideOffset={10}
            className="w-auto flex-row items-center gap-2 rounded-lg border border-midnight-650 bg-midnight-700 p-2 text-white"
          >
            <button
              type="button"
              onClick={copyProfileLink}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-midnight-650 text-steel-300 transition hover:text-white"
              aria-label={t("copyProfileLink")}
            >
              <Link2 className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => openShareWindow("telegram")}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-500 text-white transition hover:bg-sky-400"
              aria-label={t("shareOnTelegram")}
            >
              <Send className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => openShareWindow("twitter")}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white transition hover:bg-blue-400"
              aria-label={t("shareOnTwitter")}
            >
              <Twitter className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => openShareWindow("whatsapp")}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-forest-500 text-white transition hover:bg-forest-500/80"
              aria-label={t("shareOnWhatsApp")}
            >
              <MessageCircle className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={copyProfileLink}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500 text-white transition hover:bg-indigo-400"
              aria-label={t("copyProfileUrl")}
            >
              <Copy className="h-4 w-4" />
            </button>
          </PopoverContent>
        </Popover>
      </div>

      <div className="bg-midnight-750 px-5 py-5 sm:px-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative -mt-14 h-[124px] w-[124px] shrink-0 overflow-visible">
              <div className="relative h-[116px] w-[116px] overflow-hidden rounded-full bg-midnight-700 shadow-[0_0_30px_rgba(87,199,239,0.35)] ring-4 ring-midnight-750">
                <Image
                  src={profile.avatar || "/avt1.png"}
                  alt={profile.name}
                  fill
                  className="object-cover"
                  sizes="116px"
                />
              </div>
              <span className="absolute right-2 bottom-4 z-10 flex h-7 w-7 items-center justify-center rounded-full border-2 border-midnight-750 bg-forest-500 text-white">
                <CheckCircle2 className="h-5 w-5" />
              </span>
            </div>

            <div className="min-w-0">
              <h1 className="flex items-center gap-2 text-3xl leading-tight font-bold sm:text-4xl">
                {profile.name}
                <BadgeCheck className="h-5 w-5 text-white" aria-label={t("verified")} />
              </h1>
              <p className="mt-1 text-sm text-steel-500">
                {t("memberSince")} {profile.memberSince}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-4 text-base">
                <button
                  type="button"
                  onClick={onOpenChat}
                  className="inline-flex items-center gap-2 text-forest-500 transition hover:text-forest-100"
                >
                  <MessageCircle className="h-5 w-5" />
                  {t("openChat")}
                </button>
                <span className="hidden h-6 w-px bg-midnight-650 sm:block" />
                <button
                  type="button"
                  onClick={onToggleFollow}
                  className={`inline-flex items-center gap-2 transition ${
                    isFollowing
                      ? "text-red-400 hover:text-red-300"
                      : "text-forest-500 hover:text-forest-100"
                  }`}
                >
                  {isFollowing ? (
                    <UserCheck className="h-5 w-5" />
                  ) : (
                    <UserPlus className="h-5 w-5" />
                  )}
                  {isFollowing ? t("unfollow") : t("follow")}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-steel-300 md:self-start md:pt-2">
            <span>{t("seller")}</span>
            <Trophy className="h-4 w-4 text-cyan-200" />
            <span className="font-bold text-white">{profile.tier}</span>
          </div>
        </div>
      </div>

      <div className="grid gap-5 bg-midnight-800 px-5 py-6 text-base sm:px-8 md:grid-cols-4 md:gap-0">
        <div className="space-y-3 md:border-r md:border-midnight-650 md:pr-8">
          <StatPair
            label={t("positiveFeedbacks")}
            value={`${profile.positiveFeedbacks.toFixed(2)} %`}
            icon={<ThumbsUp className="h-4 w-4 text-forest-500" />}
            tone="positive"
          />
          <StatPair
            label={t("negativeFeedbacks")}
            value={`${profile.negativeFeedbacks.toFixed(2)} %`}
            icon={<ThumbsDown className="h-4 w-4 text-red-400" />}
            tone="negative"
          />
        </div>

        <div className="space-y-3 md:border-r md:border-midnight-650 md:px-8">
          <StatPair
            label={t("totalTrades")}
            value={formatNumber(profile.totalSales)}
            icon={<Trophy className="h-4 w-4 text-steel-500" />}
          />
          <StatPair
            label={t("totalReviews")}
            value={formatNumber(profile.totalFeedbacks)}
            icon={<ShieldCheck className="h-4 w-4 text-steel-500" />}
          />
        </div>

        <div className="space-y-3 md:border-r md:border-midnight-650 md:px-8">
          <StatPair
            label={t("location")}
            value=""
            icon={<MapPin className="h-4 w-4 text-steel-500" />}
          />
          <div className="-mt-9 flex justify-end">
            <FlagBadge code={profile.location} />
          </div>
          <StatPair
            label={t("language")}
            value=""
            icon={<Languages className="h-4 w-4 text-steel-500" />}
          />
          <div className="-mt-9 flex justify-end">
            <FlagBadge code={profile.language} />
          </div>
        </div>

        <div className="space-y-3 md:pl-8">
          <StatPair
            label={t("currency")}
            value={profile.currency}
            icon={<Banknote className="h-4 w-4 text-steel-500" />}
          />
          <StatPair label={t("followers")} value={formatNumber(profile.followers)} />
        </div>
      </div>

      <div className="bg-midnight-800 px-5 pb-6 sm:px-8">
        <div className="border-t border-midnight-650 pt-6">
          <button
            type="button"
            onClick={onToggleDescription}
            className="flex w-full items-center justify-between gap-4 text-left"
          >
            <span className="inline-flex items-center gap-2 text-lg font-bold">
              <Copy className="h-5 w-5" />
              {t("storeDescription")}
            </span>
            <span className="inline-flex items-center gap-3 text-forest-500">
              {isDescriptionOpen ? t("hide") : t("show")}
              <ChevronDown
                className={`h-5 w-5 transition-transform ${
                  isDescriptionOpen ? "rotate-180" : ""
                }`}
              />
            </span>
          </button>

          {isDescriptionOpen ? (
            <div className="mt-4 space-y-5 text-base leading-7 text-steel-300">
              {profile.description.split(". ").map((line, index) => {
                const text = line.endsWith(".") ? line : `${line}.`;
                return (
                  <p key={`${text}-${index}`} className="max-w-[960px]">
                    <CheckCircle2 className="mr-2 inline h-4 w-4 text-violet-400" />
                    {text}
                  </p>
                );
              })}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
