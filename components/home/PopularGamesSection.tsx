"use client";

import { useEffect, useState } from "react";
import ProductCarousel from "../product/ProductCarousel";
import SectionHeader from "../shared/SectionHeader";
import PopularGameCard from "./PopularGameCard";
import PopularGameCardSkeleton from "./PopularGameCardSkeleton";
import { useTranslations } from "next-intl";

import { supabase } from "@/lib/supabase";

/* ==========================================================================
   DATA FETCHING HELPERS (SERVER SIDE)
   ========================================================================== */

/**
 * Fetches popular game data directly from the Supabase products table.
 */
async function getPopularGames() {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("id, title, price, image_url, video_url, platform")
      .eq("is_popular", true)
      .eq("status", "published")
      .order("sort_order", { ascending: true });

    if (error) throw error;
    return { games: data || [] };
  } catch (error) {
    console.error("Error fetching popular games from Supabase:", error);
    return { games: [] };
  }
}

/* ==========================================================================
   MAIN COMPONENT: PopularGamesSection
   ========================================================================== */

/**
 * PopularGamesSection Component
 * Server-side Component that fetches popular game products and presents them.
 * Adapts responsively: renders a multi-column grid on desktop screens (>= 800px)
 * and falls back to a touch-swipeable ProductCarousel on mobile devices (< 800px).
 */
export default function PopularGamesSection() {
  const t = useTranslations("home");
  const [games, setGames] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getPopularGames().then((res) => {
      setGames(res.games);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <section
        className="w-full responsive px-8 800:px-0"
        aria-labelledby="popular-games-heading"
      >
        {/* Section Header Skeleton */}
        <div className="flex justify-between items-end border-b border-midnight-700 pb-4">
          <div className="space-y-2">
            <div className="h-4 w-24 bg-midnight-750 rounded animate-pulse" />
            <div className="h-8 w-48 bg-midnight-700 rounded animate-pulse" />
          </div>
          <div className="h-6 w-16 bg-midnight-750 rounded animate-pulse" />
        </div>

        {/* Grid Skeleton */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 800:grid-cols-3 990:grid-cols-3 1920:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className={i === 3 ? "hidden 1920:block" : ""}>
              <PopularGameCardSkeleton />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      className="w-full responsive px-8 800:px-0"
      aria-labelledby="popular-games-heading"
    >
      {/* Section Header */}
      <SectionHeader
        headingId="popular-games-heading"
        headingText={t("popularGamesHeading")}
        title={t("popularGamesTitle")}
        titleClassName="-translate-x-[22px]"
        actionText={t("viewAll")}
        viewAllHref="/product"
        viewAllAriaLabel={t("viewAllPopularGames")}
      />
      
      {/* Grid Layout (Desktop >= 800px) */}
      <div
        className="mt-10 hidden grid-cols-1 gap-4 800:grid 990:grid-cols-3 1920:grid-cols-4"
        role="list"
        aria-label={t("popularGamesAria")}
      >
        {games.map((game: any) => (
          <PopularGameCard
            key={game.id}
            id={game.id}
            title={game.title}
            price={`$ ${game.price}`}
            coverImage={game.image_url}
            previewVideo={game.video_url}
            platform={game.platform}
          />
        ))}
      </div>
      
      {/* Carousel Slider Layout (Mobile/Tablet < 800px) */}
      <div className="block 800:hidden">
        <ProductCarousel>
          {games.map((game: any) => (
            <PopularGameCard
              key={game.id}
              id={game.id}
              title={game.title}
              price={`$ ${game.price}`}
              coverImage={game.image_url}
              previewVideo={game.video_url}
              platform={game.platform}
            />
          ))}
        </ProductCarousel>
      </div>
    </section>
  );
}

