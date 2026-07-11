import type { Metadata } from "next";
import { BuyGameKeysClient } from "./_components/BuyGameKeysClient";

export const metadata: Metadata = {
  title: "Game Keys - Difmark",
  description:
    "Discover digital game key categories on Difmark, including Steam, Epic Games, GOG, Ubisoft, DLC, and upcoming game keys.",
};

export default function BuyGameKeysPage() {
  return <BuyGameKeysClient />;
}
