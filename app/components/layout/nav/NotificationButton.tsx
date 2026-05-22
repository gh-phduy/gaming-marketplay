"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Bell,
  CheckCircle2,
  Clock3,
  type LucideIcon,
  MessageCircle,
  MoreHorizontal,
  PackageCheck,
  ShieldCheck,
  Tag,
} from "lucide-react";
import {
  formatNotificationTime,
  markAllMarketplaceNotificationsRead,
  markMarketplaceNotificationRead,
  readMarketplaceNotifications,
  subscribeMarketplaceNotifications,
  type MarketplaceNotification,
  type MarketplaceNotificationKind,
} from "@/app/components/notifications/notification-store";

type NotificationFilter = "all" | "unread";

const notificationPresentation: Record<
  MarketplaceNotificationKind,
  { icon: LucideIcon; tone: string; rail: string }
> = {
  payment: {
    icon: CheckCircle2,
    tone: "border-[#62d676]/25 bg-[#62d676]/12 text-[#62d676]",
    rail: "bg-[#62d676]",
  },
  delivery: {
    icon: PackageCheck,
    tone: "border-[#58a6ff]/25 bg-[#58a6ff]/12 text-[#58a6ff]",
    rail: "bg-[#58a6ff]",
  },
  message: {
    icon: MessageCircle,
    tone: "border-[#8b9bb4]/20 bg-[#8b9bb4]/10 text-[#c4cedc]",
    rail: "bg-[#8b9bb4]",
  },
  price: {
    icon: Tag,
    tone: "border-[#eac54f]/25 bg-[#eac54f]/12 text-[#eac54f]",
    rail: "bg-[#eac54f]",
  },
  security: {
    icon: ShieldCheck,
    tone: "border-[#62d676]/20 bg-[#62d676]/10 text-[#62d676]",
    rail: "bg-[#62d676]",
  },
};

function NotificationRow({
  notification,
  onSelect,
}: {
  notification: MarketplaceNotification;
  onSelect: (notification: MarketplaceNotification) => void;
}) {
  const presentation =
    notificationPresentation[notification.kind] ?? notificationPresentation.message;
  const Icon = presentation.icon;
  const isUnread = !notification.readAt;

  return (
    <button
      type="button"
      onClick={() => onSelect(notification)}
      className={`group relative grid w-full grid-cols-[42px_minmax(0,1fr)_auto] gap-3 overflow-hidden rounded-lg border px-3 py-3 text-left transition focus-visible:ring-2 focus-visible:ring-[#62d676]/70 focus-visible:outline-none ${
        isUnread
          ? "border-white/[0.07] bg-[#202936]/85 hover:border-[#62d676]/25 hover:bg-[#263240]"
          : "border-white/[0.04] bg-[#17212d]/70 hover:border-white/[0.08] hover:bg-[#202936]"
      }`}
    >
      <span
        className={`absolute top-0 bottom-0 left-0 w-0.5 opacity-0 transition group-hover:opacity-100 ${
          isUnread ? presentation.rail : "bg-[#536176]"
        }`}
        aria-hidden
      />
      <span
        className={`relative flex h-[42px] w-[42px] items-center justify-center rounded-md border ${presentation.tone}`}
      >
        <Icon className="h-5 w-5" aria-hidden />
        {isUnread ? (
          <span className="absolute -right-1 -bottom-1 h-3 w-3 rounded-full border-2 border-[#202936] bg-[#62d676]" />
        ) : null}
      </span>

      <span className="min-w-0">
        <span className="flex min-w-0 items-center gap-2">
          <span
            className={`truncate text-sm font-bold ${
              isUnread ? "text-white" : "text-[#d8e0ec]"
            }`}
          >
            {notification.title}
          </span>
          <span className="shrink-0 text-[11px] font-bold text-[#62d676]">
            {formatNotificationTime(notification.createdAt)}
          </span>
        </span>
        <span className="mt-1 line-clamp-2 block text-[13px] leading-5 text-[#aeb9c9] group-hover:text-[#dbe5f3]">
          {notification.description}
        </span>
      </span>

      {isUnread ? (
        <span className="mt-3.5 h-2 w-2 rounded-full bg-[#58a6ff] shadow-[0_0_0_3px_rgba(88,166,255,0.12)]" />
      ) : (
        <span className="mt-3.5 h-2 w-2 rounded-full bg-white/[0.08]" />
      )}
    </button>
  );
}

export default function NotificationButton() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState<NotificationFilter>("all");
  const [notifications, setNotifications] = useState<
    MarketplaceNotification[]
  >([]);
  const notificationRef = useRef<HTMLDivElement | null>(null);
  const unreadCount = useMemo(
    () => notifications.filter((notification) => !notification.readAt).length,
    [notifications],
  );
  const visibleNotifications = useMemo(
    () =>
      filter === "unread"
        ? notifications.filter((notification) => !notification.readAt)
        : notifications,
    [filter, notifications],
  );

  useEffect(() => {
    setNotifications(readMarketplaceNotifications());
    return subscribeMarketplaceNotifications(setNotifications);
  }, []);

  const handleSelectNotification = (notification: MarketplaceNotification) => {
    markMarketplaceNotificationRead(notification.id);
    setIsOpen(false);

    if (notification.href) {
      router.push(notification.href);
    }
  };

  const handleMarkAllRead = () => {
    markAllMarketplaceNotificationsRead();
    setFilter("all");
  };

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!notificationRef.current?.contains(event.target as Node)) {
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

  return (
    <div ref={notificationRef} className="relative">
      <button
        type="button"
        aria-label="Notifications"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
        className="relative flex h-10 w-10 items-center justify-center rounded-lg text-steel-500 transition hover:bg-white/[0.06] hover:text-dm-text-primary focus-visible:ring-2 focus-visible:ring-[#62d676]/70 focus-visible:outline-none"
      >
        <Bell size={24} aria-hidden />
        {unreadCount > 0 ? (
          <span className="absolute top-1 right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#ef4444] px-1 text-[10px] leading-none font-bold text-white">
            {unreadCount}
          </span>
        ) : null}
      </button>

      {isOpen ? (
        <div
          role="dialog"
          aria-label="Notifications"
          className="fixed top-[78px] right-3 left-3 z-[90] max-h-[calc(100vh-96px)] overflow-hidden rounded-lg border border-[#334155]/70 bg-[#17202b] text-white shadow-[0_28px_80px_rgba(0,0,0,0.48)] ring-1 ring-white/[0.035] sm:absolute sm:top-[calc(100%+14px)] sm:right-0 sm:left-auto sm:w-[414px]"
        >
          <span
            className="absolute -top-2 right-9 hidden h-4 w-4 rotate-45 border-t border-l border-[#334155]/70 bg-[#17202b] sm:block"
            aria-hidden
          />

          <div className="border-b border-white/[0.06] bg-[linear-gradient(180deg,rgba(53,65,82,0.34),rgba(23,32,43,0))] px-4 pt-4 pb-3">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#62d676] shadow-[0_0_16px_rgba(98,214,118,0.8)]" />
                  <p className="text-[11px] font-bold tracking-[0.16em] text-[#8ea0b7] uppercase">
                    Activity center
                  </p>
                </div>
                <h2 className="mt-2 text-[22px] leading-none font-bold">
                  Notifications
                </h2>
              </div>

              <div className="flex items-center gap-2">
                {unreadCount > 0 ? (
                  <span className="rounded-md border border-[#62d676]/20 bg-[#62d676]/12 px-2.5 py-1 text-xs font-bold text-[#62d676]">
                    {unreadCount} unread
                  </span>
                ) : null}
                <button
                  type="button"
                  aria-label="Mark all notifications as read"
                  onClick={handleMarkAllRead}
                  className="flex h-8 w-8 items-center justify-center rounded-md text-[#8b9bb4] transition hover:bg-white/[0.06] hover:text-white focus-visible:ring-2 focus-visible:ring-[#62d676]/70 focus-visible:outline-none"
                >
                  <MoreHorizontal className="h-5 w-5" aria-hidden />
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-1 bg-[#111923]/72 p-1 mx-4 mt-4 rounded-lg border border-white/[0.05]">
            <button
              type="button"
              aria-pressed={filter === "all"}
              onClick={() => setFilter("all")}
              className={`rounded-md px-4 py-2 text-sm font-bold transition focus-visible:ring-2 focus-visible:ring-[#62d676]/70 focus-visible:outline-none ${
                filter === "all"
                  ? "bg-[#35465d] text-white shadow-[0_8px_20px_rgba(0,0,0,0.22)]"
                  : "text-[#9caabe] hover:bg-white/[0.04] hover:text-white"
              }`}
            >
              All
            </button>
            <button
              type="button"
              aria-pressed={filter === "unread"}
              onClick={() => setFilter("unread")}
              className={`rounded-md px-4 py-2 text-sm font-bold transition focus-visible:ring-2 focus-visible:ring-[#62d676]/70 focus-visible:outline-none ${
                filter === "unread"
                  ? "bg-[#35465d] text-white shadow-[0_8px_20px_rgba(0,0,0,0.22)]"
                  : "text-[#9caabe] hover:bg-white/[0.04] hover:text-white"
              }`}
            >
              Unread
            </button>
          </div>

          <div className="flex items-center justify-between px-4 pt-4 pb-2">
            <span className="text-xs font-bold tracking-[0.12em] text-[#8ea0b7] uppercase">
              Recent activity
            </span>
            <button
              type="button"
              onClick={() => setFilter("all")}
              className="rounded-md px-2 py-1 text-xs font-bold text-[#58a6ff] transition hover:bg-[#58a6ff]/10 hover:text-[#8fc5ff] focus-visible:ring-2 focus-visible:ring-[#62d676]/70 focus-visible:outline-none"
            >
              See all
            </button>
          </div>

          <div className="max-h-[min(510px,calc(100vh-278px))] space-y-2 overflow-y-auto px-3 pb-3 [scrollbar-color:#526278_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#526278] [&::-webkit-scrollbar-track]:bg-transparent">
            {visibleNotifications.length > 0 ? (
              visibleNotifications.map((notification) => (
                <NotificationRow
                  key={notification.id}
                  notification={notification}
                  onSelect={handleSelectNotification}
                />
              ))
            ) : (
              <div className="rounded-lg border border-dashed border-white/[0.08] bg-[#111923]/70 px-4 py-9 text-center">
                <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-md border border-white/[0.06] bg-white/[0.04]">
                  <Clock3 className="h-6 w-6 text-[#8b9bb4]" />
                </span>
                <p className="mt-3 text-sm font-semibold text-white">
                  You are all caught up
                </p>
                <p className="mt-1 text-sm text-[#8b9bb4]">
                  New order updates will appear here.
                </p>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
