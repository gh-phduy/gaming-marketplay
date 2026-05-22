/**
 * CategoryCarousel Component
 *
 * Mobile carousel for category cards
 * Shows all 4 category cards in a swipeable carousel
 */

"use client";

import ProductCarousel from "../product/ProductCarousel";
import { CategoryCard, CategoryCardData } from "../shared/CategoryCard";


/* ============================================
   CONSTANTS
   ============================================ */

/** Category cards data */
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
 * CategoryCarousel Component
 *
 * Mobile-only carousel for displaying all category cards
 */
export default function CategoryCarousel() {
  return (
    <ProductCarousel className="800:px-0 px-8 responsive 800:hidden block">
      {CATEGORY_CARDS.map((card) => (
        <CategoryCard key={card.id} data={card} />
      ))}
    </ProductCarousel>
  );
}
