import type { Metadata } from "next";
import { MarketplaceCategoryPageClient } from "../_components/MarketplaceCategoryPageClient";

export const metadata: Metadata = {
  title: "Power Leveling - Difmark",
  description:
    "Browse power leveling categories on Difmark by genre, including shooter, MMORPG, MMO, hack and slash, RPG, fighting, and more.",
};

export default function BuyPowerLevelingPage() {
  return <MarketplaceCategoryPageClient pageKey="power-leveling" />;
}
