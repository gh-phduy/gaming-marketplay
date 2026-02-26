import type {
  HeroHeights,
  HeroTab,
  HeroTabContent,
  HeroViewportState,
} from "./types";

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

/** Media query map consumed by the viewport hook. */
export const HERO_MEDIA_QUERIES = {
  isLargeScreen: "(min-width: 1920px)",
  isWideScreen: "(min-width: 1640px)",
  isDesktop: "(min-width: 1200px)",
  isSideBannerVisible: "(min-width: 1100px)",
} as const;

/** Shared static style for the hero section background. */
export const HERO_WRAPPER_STYLE = {
  backgroundImage: "url(/bg-hero-carousel.jpg)",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundAttachment: "fixed",
} as const;

/** Grid columns used when side banner is visible. */
export const HERO_GRID_COLUMNS_WITH_SIDE_BANNER =
  "grid-cols-[610px_300px] 1200:grid-cols-[760px_350px] 1640:grid-cols-[863px_417px] 1920:grid-cols-[1050px_510px]";

/** Route -> hero tab mapping for main vs direct-top-up pages. */
export function getHeroActiveTab(pathname: string): HeroTab {
  return pathname === "/direct-top-up" ? "topup" : "digital";
}

/**
 * Responsive height calculator for animated hero slide container.
 * Preserves current UX breakpoints:
 * - digital: 451 / 371 / 310 / 270
 * - topup:   274 / 225 / 188
 */
export function getHeroHeights(viewport: HeroViewportState): HeroHeights {
  const digitalHeight = viewport.isLargeScreen
    ? 451
    : viewport.isWideScreen
      ? 371
      : viewport.isDesktop
        ? 310
        : 270;

  const topupHeight = viewport.isLargeScreen
    ? 274
    : viewport.isWideScreen
      ? 225
      : 188;

  return { digitalHeight, topupHeight };
}
