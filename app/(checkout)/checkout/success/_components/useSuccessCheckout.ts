"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import {
  readCheckoutOrderSnapshot,
  type CheckoutOrderSnapshot,
} from "@/components/checkout/checkout-session";
import { addMarketplaceNotification } from "@/components/notifications/notification-store";

export const PROCESSED_PAYMENT_INTENT_KEY = "processed_payment_intent";

export function formatCurrency(value: number, currency: string) {
  return `${currency} ${value.toFixed(2)}`;
}

export function truncatePaymentId(paymentIntent: string | null) {
  if (!paymentIntent) return "Unavailable";
  if (paymentIntent.length <= 18) return paymentIntent;
  return `${paymentIntent.slice(0, 12)}...${paymentIntent.slice(-6)}`;
}

function getNotificationDescription(
  snapshot: CheckoutOrderSnapshot | null,
  total: string
) {
  if (!snapshot?.items.length) {
    return `Your payment was confirmed successfully. Total paid: ${total}.`;
  }

  const itemCount = snapshot.items.reduce(
    (count, item) => count + item.quantity,
    0
  );
  const firstItem = snapshot.items[0];
  const extraItems = itemCount > 1 ? ` and ${itemCount - 1} more` : "";

  return `${firstItem.name}${extraItems} ${
    itemCount === 1 ? "was" : "were"
  } paid successfully. Total paid: ${total}.`;
}

export function useSuccessCheckout() {
  const searchParams = useSearchParams();
  const { resetCart } = useCart();
  const { user, isLoading: isAuthLoading } = useAuth();
  
  const [status, setStatus] = useState<"succeeded" | "failed" | null>(null);
  const [orderSnapshot, setOrderSnapshot] = useState<CheckoutOrderSnapshot | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [dbError, setDbError] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);

  const paymentIntent = searchParams.get("payment_intent");
  const redirectStatus = searchParams.get("redirect_status");
  const accountId = user?.id || user?.email || null;

  const saveOrderToDb = async (
    snapshot: CheckoutOrderSnapshot | null,
    currentUser: any
  ) => {
    if (!snapshot || !currentUser?.id || !paymentIntent) return;

    setIsSyncing(true);
    setDbError(null);

    const isUuid = (val: string) =>
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(val);

    if (!isUuid(currentUser.id)) {
      setDbError(
        "You are logged in with a mock user. Cannot save transaction to database. Please log in using Google."
      );
      setIsSyncing(false);
      return;
    }

    try {
      const { error: upsertError } = await supabase
        .from("users")
        .upsert(
          {
            id: currentUser.id,
            email: currentUser.email || "",
            display_name: currentUser.name || currentUser.email || "User",
            avatar_url: currentUser.picture || "/avt1.png",
          },
          { onConflict: "id" }
        );

      if (upsertError) {
        console.error("Error upserting user in Supabase:", upsertError);
        setDbError(`Failed to sync user profile: ${upsertError.message}`);
        setIsSyncing(false);
        return;
      }

      const orderRows = snapshot.items.map((item) => ({
        buyer_id: currentUser.id,
        product_id: isUuid(item.id) ? item.id : null,
        quantity: item.quantity,
        total_price: item.price * item.quantity,
        currency: item.currency || "USD",
        status: "completed",
        stripe_payment_intent: paymentIntent,
      }));

      const { error: orderError } = await supabase
        .from("orders")
        .insert(orderRows);

      if (orderError) {
        console.error("Error writing order to Supabase:", orderError);
        setDbError(`Failed to save transaction: ${orderError.message}`);
        setIsSyncing(false);
        return;
      }

      console.log("Successfully recorded order in database");

      addMarketplaceNotification(
        {
          id: `payment-${paymentIntent}`,
          kind: "payment",
          title: "Payment confirmed",
          description: getNotificationDescription(
            snapshot,
            formatCurrency(snapshot?.total ?? 0, snapshot?.currency ?? "$")
          ),
          href: `/checkout/success?payment_intent=${encodeURIComponent(
            paymentIntent
          )}&redirect_status=succeeded`,
        },
        accountId
      );

      resetCart();
      const processedPaymentIntentKey = accountId
        ? `${PROCESSED_PAYMENT_INTENT_KEY}:${accountId}`
        : PROCESSED_PAYMENT_INTENT_KEY;
      localStorage.setItem(processedPaymentIntentKey, paymentIntent);
      setDbError(null);
    } catch (err: any) {
      console.error("Unexpected sync error:", err);
      setDbError(`Unexpected error during system sync: ${err.message || err}`);
    } finally {
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    if (isAuthLoading) return;

    if (!paymentIntent) {
      setStatus("failed");
      return;
    }

    if (redirectStatus !== "succeeded") {
      setStatus("failed");
      return;
    }

    const snapshot = readCheckoutOrderSnapshot();
    setOrderSnapshot(snapshot);
    setStatus("succeeded");
    setShowToast(true);

    const processedPaymentIntentKey = accountId
      ? `${PROCESSED_PAYMENT_INTENT_KEY}:${accountId}`
      : PROCESSED_PAYMENT_INTENT_KEY;
    const processedPaymentIntent = localStorage.getItem(processedPaymentIntentKey);

    if (processedPaymentIntent !== paymentIntent) {
      if (snapshot && user) {
        void saveOrderToDb(snapshot, user);
      } else if (!user) {
        setDbError("No logged in user found. Please sign in to complete system sync.");
      }
    }

    const timeoutId = window.setTimeout(() => setShowToast(false), 6200);
    return () => window.clearTimeout(timeoutId);
  }, [accountId, isAuthLoading, paymentIntent, redirectStatus, user]);

  const itemCount = useMemo(
    () =>
      orderSnapshot?.items.reduce((total, item) => total + item.quantity, 0) ?? 0,
    [orderSnapshot]
  );
  
  const currency = orderSnapshot?.currency ?? "$";
  const total = orderSnapshot?.total ?? 0;
  const formattedTotal = formatCurrency(total, currency);
  const displayedItemCount = itemCount || 1;

  return {
    status,
    orderSnapshot,
    showToast,
    setShowToast,
    dbError,
    isSyncing,
    paymentIntent,
    formattedTotal,
    displayedItemCount,
    user,
    saveOrderToDb,
  };
}
