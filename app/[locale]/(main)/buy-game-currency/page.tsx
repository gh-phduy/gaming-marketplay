import type { Metadata } from "next";
import { MarketplaceCategoryPageClient } from "../_components/MarketplaceCategoryPageClient";

export const metadata: Metadata = {
  title: "Game Currency - Difmark",
  description:
    "Browse game currency categories on Difmark by genre, including shooter, MMORPG, adventure, simulator, sport, action, RPG, and more.",
};

export default function BuyGameCurrencyPage() {
  return <MarketplaceCategoryPageClient pageKey="game-currency" />;
}
