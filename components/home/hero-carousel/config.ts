import type { HeroTab, HeroTabContent } from "./types";

/** Text content that changes with hero tab selection. */
export const HERO_TAB_CONTENT: Record<HeroTab, HeroTabContent> = {
  digital: {
    title: "THOUSANDS OF DIGITAL PRODUCTS",
    description:
      "Discover a vast selection of digital goods for every need — from the latest PC and console games to gift cards, software, subscriptions, and more.",
  },
  topup: {
    title: "TOP UP GAMES AND SERVICES INSTANTLY",
    description:
      "Instantly top up your favorite games and digital services — from in-game currencies to account balances. Fast, secure, and code-free.",
  },
};

/** Grid columns used when side banner is visible. */
export const HERO_GRID_COLUMNS_WITH_SIDE_BANNER =
  "1100:grid-cols-[610px_300px] 1200:grid-cols-[760px_350px] 1640:grid-cols-[863px_417px] 1920:grid-cols-[1050px_510px]";

/** Route -> hero tab mapping for main vs direct-top-up pages. */
export function getHeroActiveTab(pathname: string): HeroTab {
  return pathname === "/direct-top-up" ? "topup" : "digital";
}
