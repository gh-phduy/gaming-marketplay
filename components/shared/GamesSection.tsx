"use client";

import { useEffect, useState } from "react";
import ProductCarousel from "../product/ProductCarousel";
import GameCard from "./GameCard";
import GameCardSkeleton from "./GameCardSkeleton";
import { CanvasTextImage } from "./TextImageCanvas";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { cn } from "@/lib/utils";
import SectionHeader from "./SectionHeader";
import { useTranslations } from "next-intl";

/* ============================================
   TYPES
   ============================================ */

interface GamesProps {
  /** Section title displayed above the game grid */
  title: string;
  /** Section type identifier to fetch correct data */
  sectionType: "new" | "weekly" | "under";
}

/* ============================================
   CONSTANTS
   ============================================ */

/** Number of items to display per column */
const ITEMS_PER_COLUMN = 2;

/* ============================================
   SUB-COMPONENTS
   ============================================ */

/**
 * Column of game items
 */
interface GameColumnProps {
  className?: string;
  children: React.ReactNode;
}

function GameColumn({ className = "", children }: GameColumnProps) {
  return <div className={className}>{children}</div>;
}

async function getGamesBySection(sectionType: string) {
  let folderKeyword = "";
  
  if (sectionType === "new") {
    folderKeyword = "new-on-difmark";
  } else if (sectionType === "weekly") {
    folderKeyword = "weekly-chart";
  } else if (sectionType === "under") {
    folderKeyword = "under-10";
  }

  if (!folderKeyword) return [];

  try {
    const { data, error } = await supabase
      .from("products")
      .select(`
        *,
        seller:users (
          id,
          display_name,
          avatar_url,
          rating,
          is_verified_seller
        )
      `)
      .ilike("image_url", `%/${folderKeyword}/%`)
      .eq("status", "published")
      .limit(8);

    if (error) {
      console.error(`Error fetching games for section ${sectionType}:`, error.message);
      return [];
    }
    return data || [];
  } catch (error) {
    console.error(`Error fetching games for section ${sectionType}:`, error);
    return [];
  }
}

/* ============================================
   MAIN COMPONENT
   =========================================== */

export default function Games({ title, sectionType }: GamesProps) {
  const t = useTranslations("home");
  const [games, setGames] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getGamesBySection(sectionType).then((data) => {
      setGames(data);
      setIsLoading(false);
    });
  }, [sectionType]);

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
      <GameColumn className={visibilityClass}>
        {colGames.map((game) => (
          <GameCard
            key={game.id}
            id={game.id}
            title={game.title}
            price={`${game.currency}${Number(game.price).toFixed(2)}`}
            coverImage={game.image_url}
            previewVideo={game.video_url || undefined}
            sellerName={game.seller?.display_name || "Unknown Seller"}
            sellerAvatar={game.seller?.avatar_url || "/avt1.png"}
            sellerRank={game.seller?.rating >= 4.9 ? "🦄 Legendary" : "⭐ Verified"}
          />
        ))}
      </GameColumn>
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
                <GameCardSkeleton />
                <GameCardSkeleton />
              </div>
            );
          })}
        </div>
      </section>
    );
  }

  return (
    <section
      className="w-full 800:px-0 px-8 responsive"
      aria-labelledby={`games-section-${title.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <SectionHeader
        headingId={`games-section-${title.toLowerCase().replace(/\s+/g, "-")}`}
        headingText={title}
        title={title}
        titleClassName="-translate-x-[22px]"
        actionText={t("viewAll")}
        viewAllHref={
          sectionType === "new"
            ? "/product?sort=newer"
            : sectionType === "weekly"
            ? "/product?sort=popular"
            : "/product"
        }
        viewAllAriaLabel={`View all ${title.toLowerCase()}`}
      />

      {/* Desktop Grid */}
      <div
        className="mt-10 hidden 800:grid grid-cols-1 990:grid-cols-3 1920:grid-cols-4 gap-4"
        role="list"
        aria-label={`${title} games`}
      >
        {renderColumn(0)}
        {renderColumn(1)}
        {renderColumn(2)}
        {renderColumn(3)}
      </div>

      {/* Mobile Carousel */}
      <div className="block 800:hidden">
        <ProductCarousel>
          {games.map((game) => (
            <GameCard
              key={game.id}
              id={game.id}
              title={game.title}
              price={`${game.currency}${Number(game.price).toFixed(2)}`}
              coverImage={game.image_url}
              previewVideo={game.video_url || undefined}
              sellerName={game.seller?.display_name || "Unknown Seller"}
              sellerAvatar={game.seller?.avatar_url || "/avt1.png"}
              sellerRank={game.seller?.rating >= 4.9 ? "🦄 Legendary" : "⭐ Verified"}
            />
          ))}
        </ProductCarousel>
      </div>
    </section>
  );
}
