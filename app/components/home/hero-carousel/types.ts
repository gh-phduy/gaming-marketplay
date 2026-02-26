import type { CarouselApi } from "@/components/ui/carousel";

/** Supported tabs in the hero module. */
export type HeroTab = "digital" | "topup";

/** Responsive flags used by the hero layout and height calculations. */
export type HeroViewportState = {
  isLargeScreen: boolean;
  isWideScreen: boolean;
  isDesktop: boolean;
  isSideBannerVisible: boolean;
};

/** Copy block shown above the hero grid for each tab. */
export type HeroTabContent = {
  title: string;
  description: string;
};

export type HeroHeights = {
  digitalHeight: number;
  topupHeight: number;
};

export type HeroSlidesProps = {
  setApi: (api: CarouselApi) => void;
  current: number;
  onIndicatorClick: (index: number) => void;
  activeTab: HeroTab;
};
