import ProductCarousel from "../product/ProductCarousel";
import SectionHeader from "../shared/SectionHeader";
import PopularGameCard from "./PopularGameCard";

/* ==========================================================================
   DATA FETCHING HELPERS (SERVER SIDE)
   ========================================================================== */

/**
 * Fetches popular game data from the internal API endpoint.
 * Configured as a server-side fetch with no-store caching to bypass build-time static generation.
 */
async function getPopularGames() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/popular-games`,
      { cache: "no-store" },
    );
    if (!res.ok) throw new Error("Failed to fetch popular games");
    return res.json();
  } catch (error) {
    console.error("Error fetching popular games:", error);
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
export default async function PopularGamesSection() {
  const { games } = await getPopularGames();

  return (
    <section
      className="w-full responsive px-8 800:px-0"
      aria-labelledby="popular-games-heading"
    >
      {/* Section Header */}
      <SectionHeader
        headingId="popular-games-heading"
        headingText="Popular Games"
        title="POPULAR GAMES"
        titleClassName="-translate-x-[22px]"
        actionText="View All"
        viewAllHref="/product"
        viewAllAriaLabel="View all popular games"
      />
      
      {/* Grid Layout (Desktop >= 800px) */}
      <div
        className="mt-10 hidden grid-cols-1 gap-4 800:grid 990:grid-cols-3 1920:grid-cols-4"
        role="list"
        aria-label="Popular games"
      >
        {games.map((game: any) => (
          <PopularGameCard
            key={game.id}
            id={game.id}
            title={game.title}
            price={`$ ${game.price}`}
            coverImage={game.image}
            previewVideo={game.video}
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
              coverImage={game.image}
              previewVideo={game.video}
              platform={game.platform}
            />
          ))}
        </ProductCarousel>
      </div>
    </section>
  );
}

