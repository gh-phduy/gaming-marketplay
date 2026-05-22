import type { Metadata } from "next";
import { BuyConsoleGamesClient } from "./BuyConsoleGamesClient";

export const metadata: Metadata = {
  title: "Console Games - Difmark",
  description:
    "Browse Sony Playstation, Nintendo Switch, and Xbox Live console game categories on Difmark.",
};

export default function BuyConsoleGamesPage() {
  return <BuyConsoleGamesClient />;
}
