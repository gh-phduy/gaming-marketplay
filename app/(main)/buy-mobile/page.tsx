import type { Metadata } from "next";
import { MarketplaceCategoryPageClient } from "../_components/MarketplaceCategoryPageClient";

export const metadata: Metadata = {
  title: "Mobile - Difmark",
  description:
    "Browse iOS and Android mobile game and app categories on Difmark.",
};

export default function BuyMobilePage() {
  return <MarketplaceCategoryPageClient pageKey="mobile" />;
}
