"use client";

import { useCallback, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CarouselApi } from "@/components/ui/carousel";
import {
  HERO_CATEGORY_TILES_TRANSITION,
  HERO_GRID_TRANSITION,
  HeroAnimatedDescription,
  HeroAnimatedSideBanner,
  HeroAnimatedSlides,
  HeroAnimatedTitle,
  HeroCategoryTiles,
  HeroSideBanners,
  HeroSlides,
  HeroTabs,
  getHeroActiveTab,
  getHeroHeights,
  HERO_GRID_COLUMNS_WITH_SIDE_BANNER,
  HERO_TAB_CONTENT,
  HERO_WRAPPER_STYLE,
  useHeroCarouselSelection,
  useHeroViewport,
} from "./hero-carousel";
import type { HeroTab } from "./hero-carousel";

export function HeroCarousel() {
  // 1) Carousel API is owned by this container and passed down to slides.
  const [api, setApi] = useState<CarouselApi>();

  // 2) Derived interactive state from dedicated hooks.
  const viewport = useHeroViewport();
  const { current, scrollTo } = useHeroCarouselSelection(api);

  // 3) Route-driven tab mode and responsive dimensions.
  const pathname = usePathname();
  const router = useRouter();
  const activeTab = getHeroActiveTab(pathname);
  const { digitalHeight, topupHeight } = getHeroHeights(viewport);

  const handleTabChange = useCallback(
    (tab: HeroTab) => {
      if (tab === "topup") {
        router.push("/direct-top-up", { scroll: false });
      } else {
        router.push("/", { scroll: false });
      }
    },
    [router],
  );

  const tabContent = HERO_TAB_CONTENT[activeTab];
  const gridColumnsClass = viewport.isSideBannerVisible
    ? HERO_GRID_COLUMNS_WITH_SIDE_BANNER
    : "grid-cols-1";
  const animatedHeroHeight =
    activeTab === "digital" ? digitalHeight : topupHeight;

  return (
    <div
      className="relative flex w-full justify-center py-8"
      style={HERO_WRAPPER_STYLE}
    >
      {/* Content */}
      <div className="relative z-10">
        <div className="mx-auto w-full">
          <HeroTabs activeTab={activeTab} onTabChange={handleTabChange} />

          <div className="mb-6 text-center">
            <HeroAnimatedTitle
              activeTab={activeTab}
              className="mb-3 text-3xl font-bold tracking-wide text-white uppercase md:text-4xl"
            >
              {tabContent.title}
            </HeroAnimatedTitle>
            <HeroAnimatedDescription
              activeTab={activeTab}
              className="mx-auto max-w-3xl text-sm text-gray-300 md:text-base"
            >
              {tabContent.description}
            </HeroAnimatedDescription>
          </div>

          <div className="rounded-3xl border border-white/5 bg-[#0a0a0b]/20 p-6 shadow-2xl backdrop-blur-sm">
            {/* Animated media row (slides + optional side banner). */}
            <motion.div
              className={`mb-4 grid gap-4 overflow-hidden rounded-3xl lg:justify-center ${gridColumnsClass}`}
              layout
              initial={{ height: digitalHeight }}
              animate={{ height: animatedHeroHeight }}
              transition={HERO_GRID_TRANSITION}
            >
              <HeroAnimatedSlides activeTab={activeTab}>
                <HeroSlides
                  setApi={setApi}
                  current={current}
                  onIndicatorClick={scrollTo}
                  activeTab={activeTab}
                />
              </HeroAnimatedSlides>
              {viewport.isSideBannerVisible && (
                <HeroAnimatedSideBanner activeTab={activeTab}>
                  <HeroSideBanners activeTab={activeTab} />
                </HeroAnimatedSideBanner>
              )}
            </motion.div>

            <motion.div layout transition={HERO_CATEGORY_TILES_TRANSITION}>
              <HeroCategoryTiles activeTab={activeTab} />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
