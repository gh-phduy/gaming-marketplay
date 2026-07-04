"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  saveCheckoutOrderSnapshot,
  type CheckoutOrderSnapshot,
} from "@/components/checkout/checkout-session";
import type { TopUpGameDetail, TopUpPackage } from "./topup-detail-data";

export function useDirectTopUp(game: TopUpGameDetail) {
  const router = useRouter();
  const [selectedPackageId, setSelectedPackageId] = useState(
    game.packages[0].id
  );
  
  const selectedPackage =
    game.packages.find((item) => item.id === selectedPackageId) ??
    game.packages[0];

  const handleCheckout = () => {
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
