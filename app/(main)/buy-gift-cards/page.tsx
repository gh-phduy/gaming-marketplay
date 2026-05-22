import type { Metadata } from "next";
import { MarketplaceCategoryPageClient } from "../_components/MarketplaceCategoryPageClient";

export const metadata: Metadata = {
  title: "Gift Cards - Difmark",
  description:
    "Browse gift card categories on Difmark, including Steam, PlayStation, Xbox Live, Amazon, Discord, Spotify, PayPal, and more.",
};

export default function BuyGiftCardsPage() {
  return <MarketplaceCategoryPageClient pageKey="gift-cards" />;
}
