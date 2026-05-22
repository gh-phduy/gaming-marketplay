import type { Metadata } from "next";
import { MarketplaceCategoryPageClient } from "../_components/MarketplaceCategoryPageClient";

export const metadata: Metadata = {
  title: "PC Games - Difmark",
  description:
    "Browse PC game platform categories on Difmark, including Steam, Epic Games, Windows Store, Electronic Arts, Ubisoft, and Battlenet.",
};

export default function BuyPcGamesPage() {
  return <MarketplaceCategoryPageClient pageKey="pc-games" />;
}
