import Image from "next/image";
import {
  HERO_GRID_COLUMNS_WITH_SIDE_BANNER,
  HERO_TAB_CONTENT,
} from "./hero-carousel/config";
import { HeroCategoryTiles } from "./hero-carousel/HeroCategoryTiles";
import { HeroSideBanners } from "./hero-carousel/HeroSideBanners";
import { HeroSlides } from "./hero-carousel/HeroSlides";
import { HeroTabs } from "./hero-carousel/HeroTabs";
import type { HeroTab } from "./hero-carousel/types";

interface HeroCarouselProps {
  activeTab: HeroTab;
}

export function HeroCarousel({ activeTab }: HeroCarouselProps) {
  const tabContent = HERO_TAB_CONTENT[activeTab];
  const gridColumnsClass = `grid-cols-1 ${HERO_GRID_COLUMNS_WITH_SIDE_BANNER}`;
  const mediaRowHeightClass =
    activeTab === "digital"
      ? "h-auto min-[700px]:h-[270px] 1200:h-[310px] 1640:h-[371px] 1920:h-[451px]"
      : "h-auto min-[700px]:h-[164px] 1200:h-[206px] 1640:h-[225px] 1920:h-[274px]";

  return (
    <div className="relative flex w-full justify-center py-8">
      <Image
        src="/bg-hero-carousel.jpg"
        alt=""
        fill
        fetchPriority="low"
        loading="eager"
        className="object-cover object-center"
        aria-hidden="true"
      />
      <div className="relative z-10">
        <div className="mx-auto w-full">
          <HeroTabs activeTab={activeTab} />

          <div className="mb-6 px-4 text-center">
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
              <HeroSlides activeTab={activeTab} />
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
