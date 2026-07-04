"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { LayoutGrid } from "lucide-react";
import { TOPUP_GAMES, TOPUP_CATEGORIES_FILTER } from "@/lib/constants/products";
import { TopUpGameCard } from "./TopUpGameCard";
import FilterDropdown from "@/components/product/FilterDropdown";
import { IoSearch } from "react-icons/io5";

const DEFAULT_CATEGORY = "all";

interface DirectTopUpClientProps {
  category?: string;
}

function getValidTopUpCategory(category: string | null): string {
  return category &&
    TOPUP_CATEGORIES_FILTER.some((option) => option.id === category)
    ? category
    : DEFAULT_CATEGORY;
}

export function DirectTopUpClient({ category }: DirectTopUpClientProps) {
  const urlCategory = useMemo(
    () => getValidTopUpCategory(category ?? null),
    [category],
  );
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>(urlCategory);

  useEffect(() => {
    setActiveCategory(urlCategory);
  }, [urlCategory]);

  const filteredGames = useMemo(() => {
    return TOPUP_GAMES.filter((game) => {
      const matchesQuery = game.name
        .toLowerCase()
        .includes(query.toLowerCase());
      const matchesCategory =
        activeCategory === "all" || game.category === activeCategory;
      return matchesQuery && matchesCategory;
    });
  }, [query, activeCategory]);

  return (
    <section
      id="top-up-products"
      className="scroll-mt-28 flex w-full max-w-[1280px] flex-col items-center px-4 pb-16"
    >
      {/* Heading */}
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-medium tracking-wide text-white uppercase md:text-3xl">
          Ready to play? Power up your game!
        </h2>
        <p className="mt-2 text-base text-gray-400">
          Instant top-ups for your favorite titles — fast, easy, and secure.
        </p>
      </div>

      {/* Search + Filter bar */}
      <div className="mb-8 flex w-full max-w-[1070px] items-center rounded-lg bg-midnight-700 p-1">
        {/* Search input */}
        <div className="flex h-[44px] flex-1 items-center gap-3 rounded-lg bg-midnight-700 px-4">
          <IoSearch size={24} className="shrink-0 text-steel-500" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search your product..."
            className="w-full bg-transparent text-base text-dm-text-primary outline-none placeholder:text-steel-500"
          />
        </div>

        {/* Category dropdown */}
        <FilterDropdown
          key={activeCategory}
          options={TOPUP_CATEGORIES_FILTER}
          defaultValue={activeCategory}
          headerIcon={<LayoutGrid size={16} />}
          width="w-[220px]"
          onChange={setActiveCategory}
        />
      </div>

      {/* Game grid */}
      {filteredGames.length > 0 ? (
        <div className="flex w-full justify-center">
          <div
            className="grid gap-4"
            style={{ gridTemplateColumns: "repeat(4, 375px)" }}
          >
            {filteredGames.map((game) => (
              <TopUpGameCard key={game.id} game={game} />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <Search size={40} className="mb-4 text-gray-600" />
          <p className="text-base font-medium text-gray-400">
            No games found for &quot;{query}&quot;
          </p>
          <p className="mt-1 text-sm text-gray-600">
            Try a different search term or category.
          </p>
        </div>
      )}
    </section>
  );
}
