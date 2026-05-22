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
    id: "delivery-ready",
    kind: "delivery",
    title: "Product delivery is ready",
    description:
      "GameKeys Pro has added delivery details to your Xbox Live purchase.",
    createdAt: new Date(seededAt - 18 * minute).toISOString(),
    readAt: null,
    href: "/product",
  },
  {
    id: "seller-message",
    kind: "message",
    title: "New seller message",
    description:
      "CodesMarket replied to your support thread about activation guidance.",
    createdAt: new Date(seededAt - 65 * minute).toISOString(),
    readAt: new Date(seededAt - 42 * minute).toISOString(),
    href: "/product",
  },
  {
    id: "price-alert",
    kind: "price",
    title: "Price alert",
    description:
      "Arc Raiders dropped below your watched price. New offers start from $59.99.",
    createdAt: new Date(seededAt - 4 * 60 * minute).toISOString(),
    readAt: null,
    href: "/product",
  },
  {
    id: "security-check",
    kind: "security",
    title: "Account protection updated",
    description:
      "Your latest checkout was verified by Difmark purchase protection.",
    createdAt: new Date(seededAt - 26 * 60 * minute).toISOString(),
    readAt: new Date(seededAt - 20 * 60 * minute).toISOString(),
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

export function readMarketplaceNotifications() {
  if (typeof window === "undefined") return seedNotifications;

  const storedNotifications = window.localStorage.getItem(
    MARKETPLACE_NOTIFICATIONS_STORAGE_KEY,
  );
  if (!storedNotifications) return sortNotifications(seedNotifications);

  try {
    const parsed = JSON.parse(storedNotifications) as unknown;
    if (!Array.isArray(parsed)) return sortNotifications(seedNotifications);

    const notifications = parsed.filter(isMarketplaceNotification);
    return notifications.length
      ? sortNotifications(notifications)
      : sortNotifications(seedNotifications);
  } catch {
    window.localStorage.removeItem(MARKETPLACE_NOTIFICATIONS_STORAGE_KEY);
    return sortNotifications(seedNotifications);
  }
}

export function saveMarketplaceNotifications(
  notifications: MarketplaceNotification[],
) {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(
    MARKETPLACE_NOTIFICATIONS_STORAGE_KEY,
    JSON.stringify(sortNotifications(notifications).slice(0, MAX_NOTIFICATIONS)),
  );
  dispatchNotificationChange();
}

export function addMarketplaceNotification(
  notification: MarketplaceNotificationInput,
) {
  const notifications = readMarketplaceNotifications();
  const nextNotification: MarketplaceNotification = {
    ...notification,
    createdAt: notification.createdAt ?? new Date().toISOString(),
    readAt: notification.readAt ?? null,
  };
  const nextNotifications = [
    nextNotification,
    ...notifications.filter((item) => item.id !== notification.id),
  ];

  saveMarketplaceNotifications(nextNotifications);
}

export function markMarketplaceNotificationRead(id: string) {
  const notifications = readMarketplaceNotifications();
  const nextNotifications = notifications.map((notification) =>
    notification.id === id && !notification.readAt
      ? { ...notification, readAt: new Date().toISOString() }
      : notification,
  );

  saveMarketplaceNotifications(nextNotifications);
}

export function markAllMarketplaceNotificationsRead() {
  const readAt = new Date().toISOString();
  const notifications = readMarketplaceNotifications();
  const nextNotifications = notifications.map((notification) => ({
    ...notification,
    readAt: notification.readAt ?? readAt,
  }));

  saveMarketplaceNotifications(nextNotifications);
}

export function subscribeMarketplaceNotifications(
  callback: (notifications: MarketplaceNotification[]) => void,
) {
  if (typeof window === "undefined") return () => {};

  const handleChange = () => callback(readMarketplaceNotifications());
  const handleStorage = (event: StorageEvent) => {
    if (event.key === MARKETPLACE_NOTIFICATIONS_STORAGE_KEY) {
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
