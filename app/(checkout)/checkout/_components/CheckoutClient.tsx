"use client";

import React, { useState, useEffect, useMemo } from "react";
import { supabase } from "@/lib/supabase";
import { useSearchParams } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import {
  readCheckoutOrderSnapshot,
  type CheckoutOrderItem,
  type CheckoutOrderSnapshot,
} from "@/components/checkout/checkout-session";
import { ProductApiResponse } from "@/types/api-product";
import { useCart } from "@/contexts/CartContext";

// Import modular presentational components
import { PaymentFilters } from "./PaymentFilters";
import { CurrencyWarningBanner } from "./CurrencyWarningBanner";
import { CheckoutTotalCard } from "./CheckoutTotalCard";
import { CheckoutOrderSummary } from "./CheckoutOrderSummary";

/* ==========================================================================
   MAIN COMPONENT: CheckoutClient Page Coordinator
   ========================================================================== */

/**
 * CheckoutClient Component
 *
 * Coordinates checkout flow. Performs calculations for cart total additions or
 * direct topup orders, builds PaymentIntents from Stripe API endpoints, and
 * maps mock seller data configurations.
 */
export default function CheckoutClient() {
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");
  const isDirectTopUpCheckout = searchParams.get("directTopUp") === "1";
  const { cartItems } = useCart();

  // Component local states
  const [selectedMethod, setSelectedMethod] = useState("visa");
  const [clientSecret, setClientSecret] = useState("");
  const [directTopUpOrder, setDirectTopUpOrder] = useState<
    CheckoutOrderSnapshot | null | undefined
  >(undefined);
  const [productData, setProductData] = useState<ProductApiResponse | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);

  // Memoized lazy initializer for loadStripe promise wrapper
  const stripePromise = useMemo(() => {
    if (!clientSecret || !process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
      return null;
    }

    return loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  }, [clientSecret]);

  // Compute total value sum of standard items in the cart
  const cartTotal = useMemo(
    () =>
      cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    [cartItems],
  );

  // Compute actual billing total based on routing flow parameters
  const amount = useMemo(() => {
    if (isDirectTopUpCheckout && directTopUpOrder)
      return directTopUpOrder.total;
    if (isDirectTopUpCheckout && directTopUpOrder === undefined) return 0;
    if (!productId && cartTotal > 0) return cartTotal;
    if (productData?.data.price) return productData.data.price;
    return 99.97;
  }, [
    cartTotal,
    directTopUpOrder,
    isDirectTopUpCheckout,
    productData?.data.price,
    productId,
  ]);

  // Consolidate array list of items being purchased
  const orderItems = useMemo<CheckoutOrderItem[]>(() => {
    if (productData) {
      return [
        {
          id: productData.data.id,
          name: productData.data.name,
          platform: productData.data.platform,
          image: productData.data.images[0] ?? "/battlefield_6.jpg",
          price: productData.data.price,
          currency: productData.data.currency,
          quantity: 1,
        },
      ];
    }

    if (isDirectTopUpCheckout && directTopUpOrder) {
      return directTopUpOrder.items;
    }

    return cartItems.map((item) => ({
      id: item.id,
      name: item.name,
      platform: item.platform,
      image: item.image,
      price: item.price,
      currency: item.currency,
      quantity: item.quantity,
    }));
  }, [cartItems, directTopUpOrder, isDirectTopUpCheckout, productData]);

  // Sync direct topup cache snapshot details
  useEffect(() => {
    if (!isDirectTopUpCheckout) {
      setDirectTopUpOrder(undefined);
      return;
    }

    setDirectTopUpOrder(readCheckoutOrderSnapshot());
  }, [isDirectTopUpCheckout]);

  // Fetch product data details from Supabase database
  useEffect(() => {
    if (!productId) {
      setIsLoading(false);
      return;
    }

    async function fetchProduct() {
      try {
        const { data, error } = await supabase
          .from("products")
          .select(`
            *,
            seller:users (
              id,
              display_name,
              avatar_url,
              rating,
              is_verified_seller
            )
          `)
          .eq("id", productId)
          .single();

        if (error || !data) {
          console.error("Failed to fetch product from Supabase:", error);
          return;
        }

        // Map product details with seller credentials
        const mapped = {
          data: {
            id: data.id,
            name: data.title,
            type: data.category,
            platform: data.platform || "PC",
            edition: "Standard",
            delivery: "Instant",
            activationRegion: data.region,
            price: Number(data.price),
            currency: data.currency,
            images: [data.image_url || "/cyberpunk_2077.jpg"],
          },
          seller: {
            id: data.seller?.id || "unknown",
            name: data.seller?.display_name || "Unknown Seller",
            avatar: data.seller?.avatar_url || "/avt1.png",
            isOnline: true,
            badge: data.seller?.is_verified_seller ? "Verified Seller" : "Seller",
            tier: "Pro",
            rating: Number(data.seller?.rating || 5),
            successRate: 100,
            totalFeedbacks: 12,
            timezone: "GMT+7",
            totalSales: 10,
            positiveFeedbacks: 12,
            negativeFeedbacks: 0,
          },
        };
        setProductData(mapped);
      } catch (e) {
        console.error("Failed to fetch product:", e);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProduct();
  }, [productId]);

  // Generate PaymentIntent secrets via backend API
  useEffect(() => {
    if (amount <= 0) {
      setClientSecret("");
      return;
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    fetch(`${apiUrl}/api/create-payment-intent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: Math.round(amount * 100) }), // Amount in cents
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [amount]);

  // Loading indicator overlay boundary
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-white">
        Loading checkout...
      </div>
    );
  }

  return (
    <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 gap-6 pt-8 lg:grid-cols-3">
      
      {/* ==========================================
         LEFT COLUMN - Payment Selection & Provider Lists
         ========================================== */}
      <div className="space-y-4 lg:col-span-2">
        {/* Search bar and Country selections */}
        <PaymentFilters />

        {/* Currency Mismatch Warning Banner */}
        <CurrencyWarningBanner />

        {/* Active Payment Elements Forms (Loaded once keys sync up) */}
        <div className="space-y-3">
          {clientSecret && stripePromise && (
            <Elements
              options={{
                clientSecret,
                appearance: {
                  theme: "night",
                  labels: "floating",
                  variables: {
                    fontFamily:
                      "system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif",
                  },
                },
                fonts: [],
              }}
              stripe={stripePromise}
            >
              <CheckoutForm amount={amount} orderItems={orderItems} />
            </Elements>
          )}
        </div>
      </div>

      {/* ==========================================
         RIGHT COLUMN - Order Summary Cards
         ========================================== */}
      <div className="space-y-6 lg:col-span-1">
        {/* Checkout Billing Total details */}
        <CheckoutTotalCard amount={amount} />

        {/* Product details and Cart summary */}
        <CheckoutOrderSummary
          productData={productData}
          orderItems={orderItems}
          isDirectTopUpCheckout={isDirectTopUpCheckout}
        />
      </div>
    </div>
  );
}


