"use client";

import { FaPlaystation, FaXbox } from "react-icons/fa6";
import { SiNintendoswitch } from "react-icons/si";
import {
  CategoryLandingClient,
  type LandingCategory,
} from "../../_components/CategoryLandingClient";

const categories: LandingCategory[] = [
  {
    name: "Sony Playstation",
    products: "10 191 products",
    filterId: "sony-playstation",
    href: "/product?platform=playstation",
    icon: FaPlaystation,
    tone: "from-[#26395f]/95 via-[#20366b]/90 to-[#173060]/88",
  },
  {
    name: "Nintendo Switch",
    products: "7 399 products",
    filterId: "nintendo-switch",
    href: "/product?platform=nintendo",
    icon: SiNintendoswitch,
    tone: "from-[#2c6374]/92 via-[#406777]/88 to-[#6f3c43]/90",
  },
  {
    name: "Xbox Live",
    products: "11 707 products",
    filterId: "xbox-live",
    href: "/product?platform=xbox",
    icon: FaXbox,
    tone: "from-[#3c6742]/92 via-[#395c3b]/90 to-[#1f3a32]/92",
  },
];

export function BuyConsoleGamesClient() {
  return (
    <CategoryLandingClient
      title="Console Games"
      description="Explore gaming experiences with Difmark! Discover exclusive deals on keys for your favorite console games. Elevate your gaming adventure securely with Difmark-your key to console gaming excitement."
      categories={categories}
      searchInputId="console-game-category-search"
      productTypeFilterId="console-games"
    />
  );
}
