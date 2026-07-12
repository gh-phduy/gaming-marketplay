"use client";

import { useEffect, useState } from "react";
import ProductCarousel from "../product/ProductCarousel";
import { CanvasTextImage } from "../shared/TextImageCanvas";
import UpcomingGameCard from "./UpcomingGameCard";
import UpcomingGameCardSkeleton from "./UpcomingGameCardSkeleton";
import { useTranslations } from "next-intl";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";
import Link from "next/link";
import SectionHeader from "../shared/SectionHeader";

async function getUpcomingGames() {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .ilike("image_url", "%/upcoming-game/%")
      .eq("status", "published")
      .limit(8);

    if (error) {
      console.error("Error fetching upcoming games from Supabase:", error);
      return [];
    }
    return data || [];
  } catch (error) {
    console.error("Error fetching upcoming games:", error);
    return [];
  }
}

export default function UpcomingGamesSection() {
  const t = useTranslations("home");
  const [games, setGames] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getUpcomingGames().then((data) => {
      setGames(data);
      setIsLoading(false);
    });
  }, []);

  // Helper to render a column of up to 2 games with custom breakpoint visibility
  const renderColumn = (colIndex: number) => {
    const startIndex = colIndex * 2;
    const colGames = games.slice(startIndex, startIndex + 2);
    if (colGames.length === 0) return null;

    let visibilityClass = "";
    if (colIndex === 1 || colIndex === 2) {
      visibilityClass = "hidden 990:block";
    } else if (colIndex === 3) {
      visibilityClass = "hidden 1920:block";
    }

    return (
      <div className={visibilityClass}>
        {colGames.map((game) => (
          <UpcomingGameCard
            key={game.id}
            id={game.id}
            title={game.title}
            price={`${game.currency}${Number(game.price).toFixed(2)}`}
            coverImage={game.image_url}
            previewVideo={game.video_url || undefined}
            platform={game.platform as any}
            releaseDate="28 Aug 2026"
          />
        ))}
      </div>
    );
  };

  if (isLoading) {
    return (
      <section className="w-full 800:px-0 px-8 responsive">
        {/* Title Skeleton */}
        <div className="h-[24px] w-[220px] bg-midnight-800 animate-pulse rounded -translate-x-[22px]" />
        
        {/* Grid Skeleton */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 990:grid-cols-3 1920:grid-cols-4 gap-4">
          {[...Array(4)].map((_, colIdx) => {
            let visibilityClass = "";
            if (colIdx === 1 || colIdx === 2) {
              visibilityClass = "hidden 990:block";
            } else if (colIdx === 3) {
              visibilityClass = "hidden 1920:block";
            }
            return (
              <div key={colIdx} className={cn("space-y-4", visibilityClass)}>
                <UpcomingGameCardSkeleton />
                <UpcomingGameCardSkeleton />
              </div>
            );
          })}
        </div>
      </section>
    );
  }

  return (
    <section className="w-full 800:px-0 px-8 responsive" aria-labelledby="upcoming-games-heading">
      <SectionHeader
        headingId="upcoming-games-heading"
        headingText={t("upcomingGamesHeading")}
        title={t("upcomingGamesTitle")}
        titleClassName="-translate-x-[22px]"
        actionText={t("viewAll")}
        viewAllHref="/product"
        viewAllAriaLabel={t("viewAllUpcomingGames") || "View all upcoming games"}
      />
      <div className="mt-10 hidden 800:grid grid-cols-1 990:grid-cols-3 1920:grid-cols-4 gap-4" role="list" aria-label={t("upcomingGamesAria")}>
        {renderColumn(0)}
        {renderColumn(1)}
        {renderColumn(2)}
        {renderColumn(3)}
      </div>
      <div className="block 800:hidden" >
        <ProductCarousel>
          {games.map((game) => (
            <UpcomingGameCard
              key={game.id}
              id={game.id}
              title={game.title}
              price={`${game.currency}${Number(game.price).toFixed(2)}`}
              coverImage={game.image_url}
              previewVideo={game.video_url || undefined}
              platform={game.platform as any}
              releaseDate="28 Aug 2026"
            />
          ))}
        </ProductCarousel>
      </div>
    </section>
  );
}
