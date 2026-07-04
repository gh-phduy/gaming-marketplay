/**
 * CategoryGridRow1 Component
 *
 * Desktop grid for first 2 category cards (Game Currency, Game Points)
 */

"use client";

import { CategoryCard, type CategoryCardData } from "../shared/CategoryCard";

/* ============================================
   CONSTANTS
   ============================================ */

/** Category cards data for row 1 */
const CATEGORY_CARDS: CategoryCardData[] = [
  {
    id: 1,
    title: "Game Currency",
    description:
      "You can also find game currency from your favorite MMORPG at favorable prices.",
    productCount: "155 products",
    bgImage: "/bg-hero1.webp",
    heroImage: "/hero_1.webp",
    gradientColor: "to-blue-500/10",
    href: "/buy-game-currency",
  },
  {
    id: 2,
    title: "Game Points",
    description:
      "You can also find game point from your favorite game at favorable prices.",
    productCount: "1825 products",
    bgImage: "/bg-hero2.webp",
    heroImage: "/hero_2.webp",
    gradientColor: "to-purple-500/10",
    href: "/buy-game-cards",
  },
] as const;

/* ============================================
   MAIN COMPONENT
   ============================================ */

/**
 * CategoryGridRow1 Component
 *
 * Desktop-only grid showing first row of category cards
 */
export default function CategoryGridRow1() {
  return (
    <section
      className="800:flex hidden flex-col gap-y-10 w-full 800:px-0 px-8 responsive"
      aria-label="Product Categories - Row 1"
    >
      <div className="flex justify-between gap-x-8 w-full">
        {CATEGORY_CARDS.map((card) => (
          <CategoryCard key={card.id} data={card} />
        ))}
      </div>
    </section>
  );
}
