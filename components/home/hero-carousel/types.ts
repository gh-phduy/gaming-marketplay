/** Supported tabs in the hero module. */
export type HeroTab = "digital" | "topup";

/** Copy block shown above the hero grid for each tab. */
export type HeroTabContent = {
  title: string;
  description: string;
};

export type HeroSlidesProps = {
  activeTab: HeroTab;
};
