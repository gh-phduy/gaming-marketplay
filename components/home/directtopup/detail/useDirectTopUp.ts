"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import {
  saveCheckoutOrderSnapshot,
  type CheckoutOrderSnapshot,
} from "@/components/checkout/checkout-session";
import type { TopUpGameDetail, TopUpPackage } from "./topup-detail-data";

export function useDirectTopUp(game: TopUpGameDetail) {
  const router = useRouter();
  const { user } = useAuth();
  const [selectedPackageId, setSelectedPackageId] = useState(
    game.packages[0].id
  );
  
  const selectedPackage =
    game.packages.find((item) => item.id === selectedPackageId) ??
    game.packages[0];

  const handleCheckout = () => {
    if (!user) {
      window.dispatchEvent(new CustomEvent("difmark:open-login"));
      return;
    }
    const snapshot: CheckoutOrderSnapshot = {
      items: [
        {
          id: selectedPackage.id,
          name: `${game.title} - ${selectedPackage.label}`,
          platform: "Direct Top Up",
          image: game.iconImage,
          price: selectedPackage.price,
          currency: "$",
          quantity: 1,
        },
      ],
      subtotal: selectedPackage.price,
      total: selectedPackage.price,
      currency: "$",
      createdAt: new Date().toISOString(),
    };

    saveCheckoutOrderSnapshot(snapshot);
    router.push("/checkout?directTopUp=1");
  };

  return {
    selectedPackageId,
    setSelectedPackageId,
    selectedPackage,
    handleCheckout,
  };
}
