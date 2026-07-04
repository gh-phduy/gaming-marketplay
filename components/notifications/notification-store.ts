"use client";

export type MarketplaceNotificationKind =
  | "payment"
  | "delivery"
  | "message"
  | "price"
  | "security";

export type MarketplaceNotification = {
  id: string;
  kind: MarketplaceNotificationKind;
  title: string;
  description: string;
  createdAt: string;
  readAt: string | null;
  href?: string;
};

export type MarketplaceNotificationInput = Omit<
  MarketplaceNotification,
  "createdAt" | "readAt"
> & {
  createdAt?: string;
  readAt?: string | null;
};

export const MARKETPLACE_NOTIFICATIONS_EVENT =
  "difmark:notifications-changed";

const MARKETPLACE_NOTIFICATIONS_STORAGE_KEY = "difmark_notifications";
const MAX_NOTIFICATIONS = 40;
const minute = 60 * 1000;
const seededAt = Date.now();

const seedNotifications: MarketplaceNotification[] = [
  {
    id: "payment-valorant",
    kind: "payment",
    title: "Payment confirmed",
    description:
      "Valorant - 11 000 VP was paid successfully. Total paid: $ 29.94.",
    createdAt: new Date(seededAt - 24 * 60 * minute).toISOString(),
    readAt: null,
    href: "/product",
  },
  {
    id: "payment-cod",
    kind: "payment",
    title: "Payment confirmed",
    description:
      "Call of Duty Black Ops 7 and 1 more were paid successfully. Total paid: $ 109.98.",
    createdAt: new Date(seededAt - 2 * 24 * 60 * minute).toISOString(),
    readAt: new Date(seededAt - 24 * 60 * minute).toISOString(),
    href: "/product",
  },
  {
    id: "payment-codevein",
    kind: "payment",
    title: "Payment confirmed",
    description:
      "Code Vein II was paid successfully. Total paid: $ 49.99.",
    createdAt: new Date(seededAt - 2 * 24 * 60 * minute).toISOString(),
    readAt: new Date(seededAt - 24 * 60 * minute).toISOString(),
    href: "/product",
  },
  {
    id: "payment-arcraiders",
    kind: "payment",
    title: "Payment confirmed",
    description:
      "Arc Raiders was paid successfully. Total paid: $ 59.99.",
    createdAt: new Date(seededAt - 2 * 24 * 60 * minute).toISOString(),
    readAt: new Date(seededAt - 24 * 60 * minute).toISOString(),
    href: "/product",
  },
  {
    id: "delivery-ready",
    kind: "delivery",
    title: "Product delivery is ready",
    description:
      "GameKeys Pro has added delivery details to your Xbox Live purchase.",
    createdAt: new Date(seededAt - 2 * 24 * 60 * minute).toISOString(),
    readAt: null,
    href: "/product",
  },
];

function isMarketplaceNotification(
  value: unknown,
): value is MarketplaceNotification {
  if (!value || typeof value !== "object") return false;

  const notification = value as MarketplaceNotification;
  return (
    typeof notification.id === "string" &&
    typeof notification.kind === "string" &&
    typeof notification.title === "string" &&
    typeof notification.description === "string" &&
    typeof notification.createdAt === "string" &&
    (notification.readAt === null || typeof notification.readAt === "string") &&
    (notification.href === undefined || typeof notification.href === "string")
  );
}

function sortNotifications(notifications: MarketplaceNotification[]) {
  return [...notifications].sort(
    (first, second) =>
      new Date(second.createdAt).getTime() - new Date(first.createdAt).getTime(),
  );
}

function dispatchNotificationChange() {
  if (typeof window === "undefined") return;

  window.dispatchEvent(new Event(MARKETPLACE_NOTIFICATIONS_EVENT));
}

function getMarketplaceNotificationsStorageKey(accountId?: string | null) {
  const normalizedAccountId = accountId?.trim();
  if (!normalizedAccountId) return MARKETPLACE_NOTIFICATIONS_STORAGE_KEY;

  return `${MARKETPLACE_NOTIFICATIONS_STORAGE_KEY}:${normalizedAccountId}`;
}

function getSeedNotifications(accountId?: string | null) {
  return accountId?.trim() ? [] : seedNotifications;
}

export function readMarketplaceNotifications(accountId?: string | null) {
  const fallbackNotifications = getSeedNotifications(accountId);
  if (typeof window === "undefined") return fallbackNotifications;

  const storedNotifications = window.localStorage.getItem(
    getMarketplaceNotificationsStorageKey(accountId),
  );
  if (!storedNotifications) return sortNotifications(fallbackNotifications);

  try {
    const parsed = JSON.parse(storedNotifications) as unknown;
    if (!Array.isArray(parsed)) return sortNotifications(fallbackNotifications);

    const notifications = parsed.filter(isMarketplaceNotification);
    return sortNotifications(notifications);
  } catch {
    window.localStorage.removeItem(
      getMarketplaceNotificationsStorageKey(accountId),
    );
    return sortNotifications(fallbackNotifications);
  }
}

export function saveMarketplaceNotifications(
  notifications: MarketplaceNotification[],
  accountId?: string | null,
) {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(
    getMarketplaceNotificationsStorageKey(accountId),
    JSON.stringify(sortNotifications(notifications).slice(0, MAX_NOTIFICATIONS)),
  );
  dispatchNotificationChange();
}

export function addMarketplaceNotification(
  notification: MarketplaceNotificationInput,
  accountId?: string | null,
) {
  const notifications = readMarketplaceNotifications(accountId);
  const nextNotification: MarketplaceNotification = {
    ...notification,
    createdAt: notification.createdAt ?? new Date().toISOString(),
    readAt: notification.readAt ?? null,
  };
  const nextNotifications = [
    nextNotification,
    ...notifications.filter((item) => item.id !== notification.id),
  ];

  saveMarketplaceNotifications(nextNotifications, accountId);
}

export function markMarketplaceNotificationRead(
  id: string,
  accountId?: string | null,
) {
  const notifications = readMarketplaceNotifications(accountId);
  const nextNotifications = notifications.map((notification) =>
    notification.id === id && !notification.readAt
      ? { ...notification, readAt: new Date().toISOString() }
      : notification,
  );

  saveMarketplaceNotifications(nextNotifications, accountId);
}

export function markAllMarketplaceNotificationsRead(accountId?: string | null) {
  const readAt = new Date().toISOString();
  const notifications = readMarketplaceNotifications(accountId);
  const nextNotifications = notifications.map((notification) => ({
    ...notification,
    readAt: notification.readAt ?? readAt,
  }));

  saveMarketplaceNotifications(nextNotifications, accountId);
}

export function subscribeMarketplaceNotifications(
  callback: (notifications: MarketplaceNotification[]) => void,
  accountId?: string | null,
) {
  if (typeof window === "undefined") return () => {};

  const storageKey = getMarketplaceNotificationsStorageKey(accountId);
  const handleChange = () => callback(readMarketplaceNotifications(accountId));
  const handleStorage = (event: StorageEvent) => {
    if (event.key === storageKey) {
      handleChange();
    }
  };

  window.addEventListener(MARKETPLACE_NOTIFICATIONS_EVENT, handleChange);
  window.addEventListener("storage", handleStorage);

  return () => {
    window.removeEventListener(MARKETPLACE_NOTIFICATIONS_EVENT, handleChange);
    window.removeEventListener("storage", handleStorage);
  };
}

export function formatNotificationTime(createdAt: string) {
  const createdTime = new Date(createdAt).getTime();
  if (Number.isNaN(createdTime)) return "now";

  const elapsed = Date.now() - createdTime;
  if (elapsed < minute) return "now";
  if (elapsed < 60 * minute) return `${Math.floor(elapsed / minute)}m`;
  if (elapsed < 24 * 60 * minute) {
    return `${Math.floor(elapsed / (60 * minute))}h`;
  }
  if (elapsed < 48 * 60 * minute) return "Yesterday";

  return `${Math.floor(elapsed / (24 * 60 * minute))}d`;
}
