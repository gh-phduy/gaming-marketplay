"use client";

import {
  CalendarClock,
  KeyRound,
  Square,
} from "lucide-react";
import { FaWindows } from "react-icons/fa6";
import {
  SiBattledotnet,
  SiEa,
  SiEpicgames,
  SiGogdotcom,
  SiRockstargames,
  SiSteam,
  SiUbisoft,
} from "react-icons/si";
import {
  CategoryLandingClient,
  type LandingCategory,
} from "../_components/CategoryLandingClient";

const categories: LandingCategory[] = [
  {
    name: "Steam",
    products: "13 933 products",
    filterId: "steam",
    href: "/product?platform=steam",
    icon: SiSteam,
    tone: "from-[#29446a]/90 via-[#223750]/92 to-[#192b44]/92",
  },
  {
    name: "Rockstar",
    products: "17 products",
    filterId: "rockstar",
    href: "/product?platform=rockstar",
    icon: SiRockstargames,
    tone: "from-[#4d638f]/85 via-[#633b63]/90 to-[#7a3456]/90",
  },
  {
    name: "DLC",
    products: "5 044 products",
    filterId: "dlc",
    href: "/product?platform=dlc",
    icon: Square,
    tone: "from-[#1f2a35]/70 via-[#70383f]/88 to-[#7a2e36]/90",
    image: "/cyberpunk_2077.jpg",
    imagePosition: "center",
  },
  {
    name: "GOG",
    products: "259 products",
    filterId: "gog",
    href: "/product?platform=gog",
    icon: SiGogdotcom,
    tone: "from-[#59377a]/88 via-[#392d66]/90 to-[#272445]/95",
  },
  {
    name: "Epic Games",
    products: "79 products",
    filterId: "epic",
    href: "/product?platform=epic",
    icon: SiEpicgames,
    tone: "from-[#6a4737]/88 via-[#5f503c]/82 to-[#54303c]/90",
    image: "/bg-category-hero-console.jpg",
    imagePosition: "center",
  },
  {
    name: "Electronic arts",
    products: "166 products",
    filterId: "ea",
    href: "/product?platform=ea",
    icon: SiEa,
    tone: "from-[#263247]/88 via-[#1e293b]/88 to-[#172234]/92",
    image: "/bg-category-hero-pc.jpg",
    imagePosition: "right center",
  },
  {
    name: "Bethesda",
    products: "6 products",
    filterId: "bethesda",
    href: "/product?platform=bethesda",
    icon: Square,
    tone: "from-[#5c5847]/86 via-[#4d4e43]/86 to-[#373d3e]/90",
    image: "/bg-category-all-categories.jpg",
    imagePosition: "right center",
  },
  {
    name: "Ubisoft",
    products: "146 products",
    filterId: "ubisoft",
    href: "/product?platform=ubisoft",
    icon: SiUbisoft,
    tone: "from-[#213d59]/86 via-[#213049]/88 to-[#1a2638]/92",
    image: "/bg-category-services.jpg",
    imagePosition: "center",
  },
  {
    name: "Battle.Net",
    products: "18 products",
    filterId: "battle-net",
    href: "/product?platform=battle-net",
    icon: SiBattledotnet,
    tone: "from-[#26415c]/90 via-[#20354f]/90 to-[#1d2c44]/92",
  },
  {
    name: "Random Keys",
    products: "31 products",
    filterId: "random-keys",
    href: "/product?platform=random-keys",
    icon: KeyRound,
    tone: "from-[#2e4952]/84 via-[#3c3743]/86 to-[#1e2938]/92",
    image: "/modal-animate-bg.jpg",
    imagePosition: "center",
  },
  {
    name: "Upcoming",
    products: "1 886 products",
    filterId: "upcoming",
    href: "/product?platform=upcoming",
    icon: CalendarClock,
    tone: "from-[#5a3579]/90 via-[#47378b]/88 to-[#314173]/92",
    image: "/bg4.webp",
    imagePosition: "center",
  },
  {
    name: "Microsoft",
    products: "20 products",
    filterId: "microsoft",
    href: "/product?platform=microsoft",
    icon: FaWindows,
    tone: "from-[#203c56]/90 via-[#25455b]/88 to-[#1c324a]/94",
    image: "/bg-category-hero-software.jpg",
    imagePosition: "right center",
  },
];

export function BuyGameKeysClient() {
  return (
    <CategoryLandingClient
      title="Game Keys"
      description="Discover limitless gaming adventures through Difmark! Explore unique offers on keys for your favorite games. Elevate your gaming experience-the secure gateway to premium gaming."
      categories={categories}
      searchInputId="game-key-category-search"
      productTypeFilterId="game-keys"
    />
  );
}
