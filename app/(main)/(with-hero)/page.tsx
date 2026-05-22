/**
 * Home Page
 *
 * Main landing page của Difmark marketplace
 * Bao gồm tất cả các sections: Games, Sellers, News, etc.
 * HeroCarousel được render bởi (with-hero)/layout.tsx
 */

import PopularGamesSection from "../../components/home/PopularGamesSection";
import FeaturesSection from "../../components/home/FeaturesSection";
import PromoBanner from "../../components/home/PromoBanner";
import UpcomingGamesSection from "../../components/home/UpcomingGamesSection";
import CategoryGridRow1 from "../../components/home/CategoryGridRow1";
import CategoryGridRow2 from "../../components/home/CategoryGridRow2";
import PopularSellersSection from "../../components/home/PopularSellersSection";
import CategoryCarousel from "../../components/home/CategoryCarousel";
import HomeScrollRestoration from "../../components/home/HomeScrollRestoration";
import GamesSection from "../../components/shared/GamesSection";
import FlashSaleSection from "../../components/home/FlashSaleSection";
import PlatformsSection from "../../components/home/PlatformsSection";
import LatestNewsSection from "../../components/home/LatestNewsSection";
export default function HomePage() {
  return (
    <>
      <HomeScrollRestoration />
      <main
        id="main-content"
        className="mt-8 flex w-full flex-col items-center gap-y-16"
      >
        {/* Popular Games Section */}
        <PopularGamesSection />

        {/* Features Section */}
        <FeaturesSection />

        {/* Upcoming Games Section */}
        <UpcomingGamesSection />

        {/* Category Grid Row 1 */}
        <CategoryGridRow1 />

        {/* Popular Sellers Section */}
        <PopularSellersSection />

        {/* Category Grid Row 2 */}
        <CategoryGridRow2 />

        {/* Category Carousel (Mobile) */}
        <CategoryCarousel />

        {/* New on Difmark */}
        <GamesSection title="NEW ON DIFMARK" />

        {/* Promo Banner */}
        <PromoBanner />

        {/* Weekly Chart */}
        <GamesSection title="WEEKLY CHART" />

        {/* Flash Sale Section */}
        <FlashSaleSection />

        {/* Under $100 */}
        <GamesSection title="UNDER $100" />

        {/* Platforms Section */}
        <PlatformsSection />

        {/* Latest News Section */}
        <LatestNewsSection />
      </main>
    </>
  );
}
