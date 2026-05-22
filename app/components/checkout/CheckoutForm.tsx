"use client";

import { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import {
  saveCheckoutOrderSnapshot,
  type CheckoutOrderItem,
} from "./checkout-session";

export default function CheckoutForm({
  amount,
  orderItems,
}: {
  amount: number;
  orderItems: CheckoutOrderItem[];
}) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    const currency = orderItems[0]?.currency ?? "$";
    saveCheckoutOrderSnapshot({
      items: orderItems,
      subtotal: amount,
      total: amount,
      currency,
      createdAt: new Date().toISOString(),
    });

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/success`,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message ?? "An unexpected error occurred.");
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
      <Button
        disabled={isLoading || !stripe || !elements}
        id="submit"
        className="w-full rounded bg-[#eac54f] py-6 text-base font-bold text-[#161b22] shadow-none transition-colors hover:bg-[#d4b246]"
      >
        <span id="button-text">
          {isLoading ? (
            <div className="spinner" id="spinner">
              Processing...
            </div>
          ) : (
            `Pay $${amount}`
          )}
        </span>
      </Button>
      {message && (
        <div
          id="payment-message"
          className="p-4 text-center text-sm text-red-500"
        >
          {message}
        </div>
      )}
    </form>
  );
}
