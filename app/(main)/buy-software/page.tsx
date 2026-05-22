import type { Metadata } from "next";
import { MarketplaceCategoryPageClient } from "../_components/MarketplaceCategoryPageClient";

export const metadata: Metadata = {
  title: "Software - Difmark",
  description:
    "Browse software categories on Difmark, including Microsoft, performance tools, antivirus, VPN, security, gaming and video, and more.",
};

export default function BuySoftwarePage() {
  return <MarketplaceCategoryPageClient pageKey="software" />;
}
