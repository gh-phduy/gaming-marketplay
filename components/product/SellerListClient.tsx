"use client";

import { useState } from "react";
import SellerFilterBar from "./SellerFilterBar";
import SellerRow, { SellerOffer } from "./SellerRow";
import { TbReload } from "react-icons/tb";
import { useTranslations } from "@/hooks/useTranslations";

/**
 * Props for the SellerListClient component.
 */
interface SellerListClientProps {
  /** The initial array of seller offers retrieved from the server */
  initialOffers: SellerOffer[];
}

/**
 * SellerListClient Component
 * 
 * Renders a list of seller offers with a custom filter bar.
 * By default, limits the list to display the first 6 offers.
 * If there are more than 6 offers, displays a reload-styled "Show More" 
 * toggle button to expand the list.
 */
export default function SellerListClient({ initialOffers }: SellerListClientProps) {
  const t = useTranslations("product");
  // State to control list expansion
  const [showAll, setShowAll] = useState(false);

  // Compute slice based on toggle state
  const visibleOffers = showAll ? initialOffers : initialOffers.slice(0, 6);
  const hasMore = initialOffers.length > 6;

  return (
    <div className="flex w-full flex-col gap-y-2">
      {/* Search and sorting filters */}
      <SellerFilterBar />
      
      {/* Rendered offers list */}
      <div className="flex flex-col gap-y-2">
        {visibleOffers.map((offer: SellerOffer) => (
          <SellerRow key={offer.data.id} offer={offer} />
        ))}
      </div>

      {/* Empty state when no offers exist */}
      {initialOffers.length === 0 && (
        <div className="rounded-lg bg-[#2a3441] p-4 text-center text-gray-400">
          {t("noSellers")}
        </div>
      )}

      {/* Expand/Collapse toggle button styled like original LoadMoreButton */}
      {hasMore && (
        <div
          onClick={() => setShowAll(!showAll)}
          className="mt-2 w-full h-[40px] bg-midnight-750 font-semibold uppercase text-sm flex items-center justify-center gap-2 cursor-pointer rounded-md hover:bg-midnight-700/80 transition-colors text-white"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              setShowAll(!showAll);
            }
          }}
        >
          {/* Reload icon rotates 180 degrees when expanded */}
          <TbReload 
            size={24} 
            className={showAll ? "rotate-180 transition-transform duration-300" : "transition-transform duration-300"} 
          />
          <span>
            {showAll ? t("showLess") : `${t("showMore")} (${initialOffers.length - 6} ${t("more")})`}
          </span>
        </div>
      )}
    </div>
  );
}
