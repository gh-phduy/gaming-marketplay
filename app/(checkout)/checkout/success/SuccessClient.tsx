"use client";

import React, { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Copy,
  Home,
  Loader2,
  PackageCheck,
  ReceiptText,
  ShieldCheck,
  X,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import {
  readCheckoutOrderSnapshot,
  type CheckoutOrderSnapshot,
} from "@/components/checkout/checkout-session";
import { addMarketplaceNotification } from "@/components/notifications/notification-store";

const PROCESSED_PAYMENT_INTENT_KEY = "processed_payment_intent";

function formatCurrency(value: number, currency: string) {
  return `${currency} ${value.toFixed(2)}`;
}

function truncatePaymentId(paymentIntent: string | null) {
  if (!paymentIntent) return "Unavailable";
  if (paymentIntent.length <= 18) return paymentIntent;
  return `${paymentIntent.slice(0, 12)}...${paymentIntent.slice(-6)}`;
}

function getNotificationDescription(
  snapshot: CheckoutOrderSnapshot | null,
  total: string,
) {
  if (!snapshot?.items.length) {
    return `Your payment was confirmed successfully. Total paid: ${total}.`;
  }

  const itemCount = snapshot.items.reduce(
    (count, item) => count + item.quantity,
    0,
  );
  const firstItem = snapshot.items[0];
  const extraItems = itemCount > 1 ? ` and ${itemCount - 1} more` : "";

  return `${firstItem.name}${extraItems} ${
    itemCount === 1 ? "was" : "were"
  } paid successfully. Total paid: ${total}.`;
}

function SuccessToast({
  isVisible,
  itemCount,
  total,
}: {
  isVisible: boolean;
  itemCount: number;
  total: string;
}) {
  if (!isVisible) return null;

  return (
    <div
      role="status"
      className="fixed top-24 right-5 z-50 w-[min(420px,calc(100vw-40px))] overflow-hidden rounded-lg border border-emerald-400/25 bg-[#1f2937] text-white shadow-[0_24px_60px_rgba(0,0,0,0.35)]"
    >
      <div className="h-1 bg-[#62d676]" />
      <div className="flex gap-4 p-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#62d676]/15 text-[#62d676]">
          <CheckCircle2 className="h-6 w-6" aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold">Payment completed successfully</p>
          <p className="mt-1 text-sm leading-5 text-slate-300">
            {itemCount} {itemCount === 1 ? "product" : "products"} confirmed.
            Total paid: <span className="font-semibold text-white">{total}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SuccessClient() {
  const searchParams = useSearchParams();
  const { resetCart } = useCart();
  const { user, isLoading: isAuthLoading } = useAuth();
  const [status, setStatus] = useState<"succeeded" | "failed" | null>(null);
  const [orderSnapshot, setOrderSnapshot] =
    useState<CheckoutOrderSnapshot | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [dbError, setDbError] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);

  const paymentIntent = searchParams.get("payment_intent");
  const redirectStatus = searchParams.get("redirect_status");
  const accountId = user?.id || user?.email || null;

  const saveOrderToDb = async (snapshot: CheckoutOrderSnapshot | null, currentUser: any) => {
    if (!snapshot || !currentUser?.id || !paymentIntent) return;

    setIsSyncing(true);
    setDbError(null);

    const isUuid = (val: string) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(val);

    if (!isUuid(currentUser.id)) {
      setDbError("You are logged in with a mock user. Cannot save transaction to database. Please log in using Google.");
      setIsSyncing(false);
      return;
    }

    try {
      // Step 1: Ensure user profile exists in public.users to satisfy Foreign Key constraint
      const { error: upsertError } = await supabase
        .from("users")
        .upsert({
          id: currentUser.id,
          email: currentUser.email || "",
          display_name: currentUser.name || currentUser.email || "User",
          avatar_url: currentUser.picture || "/avt1.png",
        }, { onConflict: "id" });

      if (upsertError) {
        console.error("Error upserting user in Supabase:", upsertError);
        setDbError(`Failed to sync user profile: ${upsertError.message}`);
        setIsSyncing(false);
        return;
      }

      // Step 2: Insert order rows
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

      // Step 3: Success! Reset cart, show notification, and mark as processed in localStorage
      addMarketplaceNotification({
        id: `payment-${paymentIntent}`,
        kind: "payment",
        title: "Payment confirmed",
        description: getNotificationDescription(
          snapshot,
          formatCurrency(snapshot?.total ?? 0, snapshot?.currency ?? "$"),
        ),
        href: `/checkout/success?payment_intent=${encodeURIComponent(
          paymentIntent,
        )}&redirect_status=succeeded`,
      }, accountId);

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
      orderSnapshot?.items.reduce((total, item) => total + item.quantity, 0) ??
      0,
    [orderSnapshot],
  );
  const currency = orderSnapshot?.currency ?? "$";
  const total = orderSnapshot?.total ?? 0;
  const formattedTotal = formatCurrency(total, currency);
  const displayedItemCount = itemCount || 1;

  if (status === null) {
    return (
      <div className="flex h-[60vh] w-full items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-[#62d676]" />
      </div>
    );
  }

  if (status === "failed") {
    return (
      <main className="mx-auto flex min-h-[calc(100vh-80px)] w-full max-w-[880px] items-center justify-center px-4 py-12">
        <div className="w-full rounded-lg border border-red-500/20 bg-[#1f2937] p-8 text-center shadow-[0_24px_60px_rgba(0,0,0,0.22)]">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10">
            <XCircle className="h-11 w-11 text-red-400" />
          </div>
          <h1 className="mt-6 text-3xl font-bold text-white">
            Payment could not be completed
          </h1>
          <p className="mx-auto mt-3 max-w-[560px] text-sm leading-6 text-slate-300">
            We could not confirm this payment. Your cart has not been cleared,
            so you can review the order and try again securely.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button
              asChild
              className="h-12 rounded-md bg-[#62d676] px-6 font-bold text-[#111827] hover:bg-[#56c96a]"
            >
              <Link href="/checkout">Return to checkout</Link>
            </Button>
            <Button
              asChild
              variant="secondary"
              className="h-12 rounded-md bg-[#303a4a] px-6 font-semibold text-white hover:bg-[#3a4658]"
            >
              <Link href="/">Back to marketplace</Link>
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="relative mx-auto w-full max-w-[1180px] px-4 py-10 sm:px-6 lg:px-8">
      <SuccessToast
        isVisible={showToast}
        itemCount={displayedItemCount}
        total={formattedTotal}
      />

      {dbError && (
        <div className="mb-6 rounded-lg border border-yellow-500/20 bg-[#2b2b1d] p-6 text-yellow-400 shadow-md">
          <div className="flex items-start gap-4">
            <AlertCircle className="h-6 w-6 shrink-0 text-yellow-500" />
            <div className="flex-1">
              <h3 className="text-base font-bold text-white">Payment succeeded, but system sync failed</h3>
              <p className="mt-1 text-sm text-gray-300">
                Your payment was processed successfully by Stripe, but we couldn't record the transaction in our database due to: <br/>
                <span className="font-mono text-red-400 text-xs block mt-2 bg-black/35 p-2 rounded">{dbError}</span>
              </p>
              <div className="mt-4 flex gap-3">
                <Button
                  onClick={() => void saveOrderToDb(orderSnapshot, user)}
                  disabled={isSyncing}
                  className="h-9 rounded bg-[#62d676] px-4 text-xs font-bold text-[#111827] hover:bg-[#56c96a] disabled:opacity-50"
                >
                  {isSyncing ? "Syncing..." : "Retry System Sync"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      <section className="overflow-hidden rounded-lg border border-white/[0.06] bg-[#1f2937] shadow-[0_24px_70px_rgba(0,0,0,0.28)]">
        <div className="border-b border-white/[0.06] bg-[linear-gradient(135deg,rgba(98,214,118,0.16),rgba(31,41,55,0.3)_42%,rgba(51,65,85,0.38))] px-6 py-8 sm:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex min-w-0 gap-5">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border border-[#62d676]/25 bg-[#62d676]/12">
                <CheckCircle2 className="h-9 w-9 text-[#62d676]" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold tracking-wide text-[#62d676] uppercase">
                  Payment confirmed
                </p>
                <h1 className="mt-2 text-3xl leading-tight font-bold text-white sm:text-4xl">
                  Your order is ready
                </h1>
                <p className="mt-3 max-w-[680px] text-sm leading-6 text-slate-300">
                  Thank you for your purchase. We have confirmed the payment and
                  secured the products below for your Difmark account.
                </p>
              </div>
            </div>

            <div className="rounded-lg border border-white/[0.06] bg-[#151c26]/70 p-4 lg:min-w-[260px]">
              <p className="text-xs font-semibold text-slate-400 uppercase">
                Total paid
              </p>
              <p className="mt-2 text-3xl font-bold text-white">
                {formattedTotal}
              </p>
              <p className="mt-1 text-sm text-slate-400">
                {displayedItemCount}{" "}
                {displayedItemCount === 1 ? "product" : "products"}
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="space-y-5">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-xl font-bold text-white">Purchased items</h2>
              <span className="rounded-full bg-[#62d676]/12 px-3 py-1 text-xs font-semibold text-[#62d676]">
                Paid successfully
              </span>
            </div>

            {orderSnapshot?.items.length ? (
              <div className="space-y-3">
                {orderSnapshot.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 rounded-lg border border-white/[0.05] bg-[#151c26]/80 p-3"
                  >
                    <div className="relative h-24 w-36 shrink-0 overflow-hidden rounded-md bg-[#0f1722]">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="144px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col justify-center">
                      <h3 className="truncate text-base font-bold text-white">
                        {item.name}
                      </h3>
                      <p className="mt-1 text-sm text-slate-400">
                        {item.platform}
                      </p>
                      <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
                        <span className="rounded bg-[#263241] px-2.5 py-1 text-slate-300">
                          Quantity: {item.quantity}
                        </span>
                        <span className="font-semibold text-white">
                          {formatCurrency(item.price * item.quantity, item.currency)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex gap-4 rounded-lg border border-[#eac54f]/20 bg-[#eac54f]/8 p-4 text-sm leading-6 text-slate-300">
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#eac54f]" />
                <p>
                  Payment was confirmed, but the local order snapshot is no
                  longer available in this browser session. You can still use
                  the payment reference below for support.
                </p>
              </div>
            )}
          </div>

          <aside className="space-y-4">
            <div className="rounded-lg border border-white/[0.06] bg-[#151c26]/80 p-5">
              <div className="flex items-center gap-3">
                <ReceiptText className="h-5 w-5 text-[#62d676]" />
                <h2 className="font-bold text-white">Payment details</h2>
              </div>
              <div className="mt-5 space-y-4 text-sm">
                <div>
                  <p className="text-slate-400">Payment ID</p>
                  <div className="mt-1 flex items-center justify-between gap-3 rounded-md bg-[#222c3b] px-3 py-2">
                    <span className="truncate font-mono text-xs text-white">
                      {truncatePaymentId(paymentIntent)}
                    </span>
                    <Copy className="h-4 w-4 shrink-0 text-slate-400" />
                  </div>
                </div>
                <div className="flex justify-between border-t border-white/[0.06] pt-4">
                  <span className="text-slate-400">Status</span>
                  <span className="font-semibold text-[#62d676]">Succeeded</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Delivery</span>
                  <span className="font-semibold text-white">Instant</span>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-white/[0.06] bg-[#151c26]/80 p-5">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <ShieldCheck className="mt-0.5 h-5 w-5 text-[#62d676]" />
                  <div>
                    <p className="font-semibold text-white">Order protected</p>
                    <p className="mt-1 text-sm leading-5 text-slate-400">
                      Difmark protection remains active while your order is
                      delivered.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <PackageCheck className="mt-0.5 h-5 w-5 text-[#62d676]" />
                  <div>
                    <p className="font-semibold text-white">Next step</p>
                    <p className="mt-1 text-sm leading-5 text-slate-400">
                      Check your account inventory and seller messages for
                      delivery details.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-3">
              <Button
                asChild
                className="h-12 rounded-md bg-[#62d676] font-bold text-[#111827] hover:bg-[#56c96a]"
              >
                <Link href="/product">
                  Continue shopping
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="secondary"
                className="h-12 rounded-md bg-[#303a4a] font-semibold text-white hover:bg-[#3a4658]"
              >
                <Link href="/">
                  <Home className="mr-2 h-4 w-4" />
                  Back to home
                </Link>
              </Button>
            </div>
          </aside>
        </div>
      </section>

      {showToast ? (
        <button
          type="button"
          aria-label="Dismiss payment notification"
          onClick={() => setShowToast(false)}
          className="fixed top-[104px] right-7 z-[60] hidden h-8 w-8 items-center justify-center rounded-md text-slate-300 transition hover:bg-white/10 hover:text-white sm:flex"
        >
          <X className="h-4 w-4" />
        </button>
      ) : null}
    </main>
  );
}
