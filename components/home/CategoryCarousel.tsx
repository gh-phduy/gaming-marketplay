/**
 * CategoryCarousel Component
 *
/**
 * CategoryCarousel Component
 *
 * Mobile carousel for category cards
 * Shows all 4 category cards in a swipeable carousel
 */

"use client";

import ProductCarousel from "../product/ProductCarousel";
import { CategoryCard, CategoryCardData } from "../shared/CategoryCard";
import { useTranslations } from "@/hooks/useTranslations";


/* ============================================
   CONSTANTS
   ============================================ */

/** Category cards data */
const getCategoryCards = (t: any): CategoryCardData[] => [
  {
    id: 1,
    title: t("gameCurrency"),
    description: t("gameCurrencyDesc"),
    productCount: `155 ${t("products")}`,
    bgImage: "/bg-hero1.webp",
    heroImage: "/hero_1.webp",
    gradientColor: "to-blue-500/10",
    href: "/buy-game-currency",
  },
  {
    id: 2,
    title: t("gamePoints"),
    description: t("gamePointsDesc"),
    productCount: `1825 ${t("products")}`,
    bgImage: "/bg-hero2.webp",
    heroImage: "/hero_2.webp",
    gradientColor: "to-purple-500/10",
    href: "/buy-game-cards",
  },
  {
    id: 3,
    title: t("giftCards"),
    description: t("giftCardsDesc"),
    productCount: `14937 ${t("products")}`,
    bgImage: "/bg-hero3.webp",
    heroImage: "/hero_3.webp",
    gradientColor: "to-green-500/10",
    href: "/buy-gift-cards",
  },
  {
    id: 4,
    title: t("software"),
    description: t("softwareDesc"),
    productCount: `964 ${t("products")}`,
    bgImage: "/bg-hero4.webp",
    heroImage: "/hero_4.webp",
    gradientColor: "to-red-500/10",
    href: "/buy-software",
  },
];

/* ============================================
   MAIN COMPONENT
   ============================================ */

/**
 * CategoryCarousel Component
 *
 * Mobile-only carousel for displaying all category cards
 */
export default function CategoryCarousel() {
  const t = useTranslations("home");
  const categoryCards = getCategoryCards(t);

  return (
    <ProductCarousel className="800:px-0 px-8 responsive 800:hidden block">
      {categoryCards.map((card) => (
        <CategoryCard key={card.id} data={card} />
      ))}
    </ProductCarousel>
  );
}
