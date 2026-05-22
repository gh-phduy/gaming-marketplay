/**
 * CategoryGridRow2 Component
 *
 * Desktop grid for second 2 category cards (Gift Cards, Software)
 */

"use client";

import { CategoryCard, type CategoryCardData } from "../shared/CategoryCard";

/* ============================================
   CONSTANTS
   ============================================ */

/** Category cards data for row 2 */
const CATEGORY_CARDS: CategoryCardData[] = [
  {
    id: 3,
    title: "Gift Cards",
    description:
      "You can also find a gift card to top up your favorite service.",
    productCount: "14937 products",
    bgImage: "/bg-hero3.webp",
    heroImage: "/hero_3.webp",
    gradientColor: "to-green-500/10",
    href: "/buy-gift-cards",
  },
  {
    id: 4,
    title: "Software",
    description:
      "You can also find software and operation systems at favorable prices.",
    productCount: "964 products",
    bgImage: "/bg-hero4.webp",
    heroImage: "/hero_4.webp",
    gradientColor: "to-red-500/10",
    href: "/buy-software",
  },
] as const;

/* ============================================
   MAIN COMPONENT
   ============================================ */

/**
 * CategoryGridRow2 Component
 *
 * Desktop-only grid showing second row of category cards
 */
export default function CategoryGridRow2() {
  return (
    <section
      className="800:flex hidden flex-col gap-y-10 w-full 800:px-0 px-8 responsive"
      aria-label="Product Categories - Row 2"
    >
      <div className="flex justify-between gap-x-8 w-full">
        {CATEGORY_CARDS.map((card) => (
          <CategoryCard key={card.id} data={card} />
        ))}
      </div>
    </section>
  );
}
