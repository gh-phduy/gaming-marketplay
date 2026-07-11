import type { Metadata } from "next";
import { MarketplaceCategoryPageClient } from "../_components/MarketplaceCategoryPageClient";

export const metadata: Metadata = {
  title: "Game Accounts - Difmark",
  description:
    "Browse game account categories on Difmark by genre, including MMORPG, shooter, adventure, action, sport, RPG, racing, and more.",
};

export default function BuyGameAccountsPage() {
  return <MarketplaceCategoryPageClient pageKey="game-accounts" />;
}
