"use client";

import { useCallback, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { CarouselApi } from "@/components/ui/carousel";
import {
  HERO_GRID_COLUMNS_WITH_SIDE_BANNER,
  HeroCategoryTiles,
  HeroSideBanners,
  HeroSlides,
  HeroTabs,
  getHeroActiveTab,
  HERO_TAB_CONTENT,
  useHeroCarouselSelection,
} from "./hero-carousel";
import type { HeroTab } from "./hero-carousel";

export function HeroCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const { current, scrollTo } = useHeroCarouselSelection(api);

  const pathname = usePathname();
  const router = useRouter();
  const activeTab = getHeroActiveTab(pathname);

  const handleTabChange = useCallback(
    (tab: HeroTab) => {
      router.push(tab === "topup" ? "/direct-top-up" : "/", { scroll: false });
    },
    [router],
  );

  const tabContent = HERO_TAB_CONTENT[activeTab];
  const gridColumnsClass = `grid-cols-1 ${HERO_GRID_COLUMNS_WITH_SIDE_BANNER}`;
  const mediaRowHeightClass =
    activeTab === "digital"
      ? "h-[236px] min-[500px]:h-[270px] 1200:h-[310px] 1640:h-[371px] 1920:h-[451px]"
      : "h-[148px] min-[500px]:h-[164px] 1640:h-[225px] 1920:h-[274px]";

  return (
    <div className="relative flex w-full justify-center py-8">
      <Image
        src="/bg-hero-carousel.jpg"
        alt=""
        fill
        priority
        className="object-cover object-center"
        aria-hidden="true"
      />
      <div className="relative z-10">
        <div className="mx-auto w-full">
          <HeroTabs activeTab={activeTab} onTabChange={handleTabChange} />

          <div className="mb-6 text-center">
            <h1 className="mb-3 text-3xl font-bold tracking-wide text-white uppercase md:text-4xl">
              {tabContent.title}
            </h1>
            <p className="mx-auto max-w-3xl text-sm text-gray-300 md:text-base">
              {tabContent.description}
            </p>
          </div>

          <div className="p-6 990:rounded-3xl 990:border 990:border-white/5 990:bg-[#0a0a0b]/20 990:p-3 990:shadow-2xl 990:backdrop-blur-sm 1200:p-6">
            {/* Media row — chỉ animate chiều cao mượt mà */}
            <div
              className={`mb-4 grid gap-4 overflow-hidden rounded-3xl transition-[height] duration-300 ease-linear lg:justify-center ${gridColumnsClass} ${mediaRowHeightClass}`}
            >
              <HeroSlides
                setApi={setApi}
                current={current}
                onIndicatorClick={scrollTo}
                activeTab={activeTab}
              />
              <div className="hidden h-full 1100:block">
                <HeroSideBanners activeTab={activeTab} />
              </div>
            </div>

            <div>
              <HeroCategoryTiles activeTab={activeTab} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
