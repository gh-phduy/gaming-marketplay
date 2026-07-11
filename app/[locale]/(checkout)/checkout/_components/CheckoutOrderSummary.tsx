"use client";

import React from "react";
import Image from "next/image";
import { ProductApiResponse } from "@/types/api-product";
import { CheckoutOrderItem } from "@/components/checkout/checkout-session";

/* ==========================================================================
   TYPE DEFINITIONS & INTERFACES
   ========================================================================== */

interface CheckoutOrderSummaryProps {
  productData: ProductApiResponse | null;
  orderItems: CheckoutOrderItem[];
  isDirectTopUpCheckout: boolean;
}

/* ==========================================================================
   MAIN COMPONENT: CheckoutOrderSummary
   ========================================================================== */

/**
 * CheckoutOrderSummary Component
 *
 * Renders the products or cart item listing block (featuring platform,
 * quantity, pricing, currency, and seller badges) based on the checkout route source.
 */
export function CheckoutOrderSummary({
  productData,
  orderItems,
  isDirectTopUpCheckout,
}: CheckoutOrderSummaryProps) {
  return (
    <>
      {/* Scenario A: Single Buy-Now Product detail overlay */}
      {productData && (
        <div className="overflow-hidden rounded-lg border border-[#30363d] bg-midnight-750">
          <div className="relative h-48 w-full overflow-hidden bg-black/50">
            {productData.data.images?.[0] && (
              <Image
                src={productData.data.images[0]}
                alt={productData.data.name}
                fill
                className="object-cover opacity-60"
              />
            )}
            
            {/* Seller profile overlay info */}
            <div className="absolute right-0 bottom-0 left-0 flex items-end justify-between bg-gradient-to-t from-black/90 to-transparent p-3">
              <div className="flex items-center gap-2">
                <div className="relative h-6 w-6 overflow-hidden rounded-full bg-purple-600">
                  <Image
                    src={productData.seller.avatar}
                    alt={productData.seller.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="text-xs font-medium text-gray-300">
                  {productData.seller.name}
                </span>
              </div>
              <span className="text-sm font-bold text-white">
                $ {productData.data.price.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="bg-[#1d232e] p-3 text-center">
            <h3 className="text-sm font-medium text-gray-300">
              {productData.data.name} ({productData.data.platform})
            </h3>
          </div>
        </div>
      )}

      {/* Scenario B: Cart Items or Direct Topup listings list summary */}
      {!productData && orderItems.length > 0 && (
        <div className="space-y-3 rounded-lg border border-[#30363d] bg-midnight-750 p-4">
          <h3 className="text-sm font-semibold text-gray-300">
            {isDirectTopUpCheckout ? "Direct top up summary" : "Cart summary"}
          </h3>
          <div className="space-y-2">
            {orderItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between text-sm"
              >
                <span className="max-w-[70%] truncate text-gray-400">
                  {item.name} x{item.quantity}
                </span>
                <span className="font-medium text-white">
                  {item.currency} {(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
