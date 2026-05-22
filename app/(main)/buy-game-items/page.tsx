import type { Metadata } from "next";
import { MarketplaceCategoryPageClient } from "../_components/MarketplaceCategoryPageClient";

export const metadata: Metadata = {
  title: "Game Items - Difmark",
  description:
    "Browse game item categories on Difmark by genre, including shooter, MMORPG, action, hack and slash, simulator, RPG, and more.",
};

export default function BuyGameItemsPage() {
  return <MarketplaceCategoryPageClient pageKey="game-items" />;
}
