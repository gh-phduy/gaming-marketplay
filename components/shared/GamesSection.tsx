/**
 * Games Section Component
 *
 * Displays a grid of game items with a title
 * Responsive layout: shows carousel on mobile, grid on desktop
 */

import ProductCarousel from "../product/ProductCarousel";
import GameCard from "./GameCard";
import { CanvasTextImage } from "./TextImageCanvas";

/* ============================================
   TYPES
   ============================================ */

interface GamesProps {
  /** Section title displayed above the game grid */
  title: string;
}

/* ============================================
   CONSTANTS
   ============================================ */

/** Number of items to display per column */
const ITEMS_PER_COLUMN = 2;

/** Number of columns for each breakpoint */
const COLUMN_CONFIG = {
  mobile: 1,
  tablet: 3,
  desktop: 4,
} as const;

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

/* ============================================
   MAIN COMPONENT
   ============================================ */

/**
 * Games Component
 *
 * @param title - Section title (e.g., "NEW ON DIFMARK", "WEEKLY CHART")
 */
export default function Games({ title }: GamesProps) {
  return (
    <section
      className="w-full 800:px-0 px-8 responsive"
      aria-labelledby={`games-section-${title.toLowerCase().replace(/\s+/g, "-")}`}
    >
      {/* Section Title */}
      <h2
        id={`games-section-${title.toLowerCase().replace(/\s+/g, "-")}`}
        className="sr-only"
      >
        {title}
      </h2>
      <CanvasTextImage
        className="-translate-x-[22px]"
        text={title}
        imageUrl="/text-img.svg"
        size="24px"
      />

      {/* Desktop Grid */}
      <div
        className="mt-10 hidden 800:grid grid-cols-1 990:grid-cols-3 1920:grid-cols-4 gap-4"
        role="list"
        aria-label={`${title} games`}
      >
        {/* Column 1 - Always visible */}
        <GameColumn>
          <GameCard />
          <GameCard />
        </GameColumn>

        {/* Column 2 - Visible from 990px */}
        <GameColumn className="hidden 990:block">
          <GameCard />
          <GameCard />
        </GameColumn>

        {/* Column 3 - Visible from 990px */}
        <GameColumn className="hidden 990:block">
          <GameCard />
          <GameCard />
        </GameColumn>

        {/* Column 4 - Visible from 1920px */}
        <GameColumn className="hidden 1920:block">
          <GameCard />
          <GameCard />
        </GameColumn>
      </div>

      {/* Mobile Carousel */}
      <div className="block 800:hidden">
        <ProductCarousel>
          <GameCard />
          <GameCard />
          <GameCard />
          <GameCard />
          <GameCard />
          <GameCard />
        </ProductCarousel>
      </div>
    </section>
  );
}
