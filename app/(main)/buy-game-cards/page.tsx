import type { Metadata } from "next";
import { MarketplaceCategoryPageClient } from "../_components/MarketplaceCategoryPageClient";

export const metadata: Metadata = {
  title: "Game Cards - Difmark",
  description:
    "Browse game card categories on Difmark, including Roblox, FIFA FUT Points, PUBG Mobile, Valorant, Mobile Legends, and more.",
};

export default function BuyGameCardsPage() {
  return <MarketplaceCategoryPageClient pageKey="game-cards" />;
}
