"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { IoCloseSharp } from "react-icons/io5";
import { cn } from "@/lib/utils";
import {
  FILTERS_COLLAPSED_HEIGHT,
  type ProductSortKey,
} from "../_lib/product-listing";

interface SelectedFilter {
  id: string;
  label: string;
}

interface ChosenFiltersBarProps {
  searchTerm: string;
  selectedFilters: SelectedFilter[];
  selectedSortLabel: string;
  onClearSearch: () => void;
  onClearSort: () => void;
  onRemoveFilter: (filterId: string) => void;
  onClearAll: () => void;
  sortBy: ProductSortKey;
}

export default function ChosenFiltersBar({
  searchTerm,
  selectedFilters,
  selectedSortLabel,
  onClearSearch,
  onClearSort,
  onRemoveFilter,
  onClearAll,
  sortBy,
}: ChosenFiltersBarProps) {
  const [showAllFilters, setShowAllFilters] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const filtersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (filtersRef.current) {
      setIsOverflowing(
        filtersRef.current.scrollHeight > FILTERS_COLLAPSED_HEIGHT + 4,
      );
    }
  }, [searchTerm, selectedFilters, selectedSortLabel, sortBy]);

  return (
    <div className="mb-4 flex gap-3 text-sm sm:mb-6 sm:gap-4 sm:text-base">
      <div className="min-w-0 flex-1">
        <div
          ref={filtersRef}
          className={cn(
            "flex flex-wrap items-center gap-2 overflow-hidden transition-all duration-300",
          )}
          style={{
            maxHeight: showAllFilters
              ? filtersRef.current?.scrollHeight
              : FILTERS_COLLAPSED_HEIGHT,
          }}
        >
          <span className="whitespace-nowrap text-gray-400">
            Chosen filters :
          </span>
          {searchTerm.trim() && (
            <span className="inline-flex items-center gap-1 rounded-full bg-midnight-500 px-2 py-1 text-xs font-medium text-steel-300 sm:text-sm">
              &ldquo;{searchTerm.trim()}&rdquo;
              <IoCloseSharp
                className="cursor-pointer hover:text-white"
                onClick={onClearSearch}
              />
            </span>
          )}
          <span className="inline-flex items-center gap-1 rounded-full bg-midnight-500 px-2 py-1 text-xs font-medium text-steel-300 sm:text-sm">
            {selectedSortLabel}
            <IoCloseSharp
              className="cursor-pointer hover:text-white"
              onClick={onClearSort}
            />
          </span>
          {selectedFilters.map((filter) => (
            <span
              key={filter.id}
              className="inline-flex items-center gap-1 rounded-full bg-midnight-500 px-2 py-1 text-xs font-medium text-steel-300 sm:text-sm"
            >
              {filter.label}
              <IoCloseSharp
                className="cursor-pointer hover:text-white"
                onClick={() => onRemoveFilter(filter.id)}
              />
            </span>
          ))}
        </div>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-1">
        <button
          type="button"
          onClick={() => {
            setShowAllFilters(false);
            onClearAll();
          }}
          className="flex items-center gap-1 text-xs whitespace-nowrap text-gray-400 hover:text-white sm:text-sm"
        >
          Clear all <X className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </button>
        {isOverflowing && (
          <button
            type="button"
            onClick={() => setShowAllFilters(!showAllFilters)}
            className="text-xs whitespace-nowrap text-forest-500 transition-colors hover:text-forest-100 sm:text-sm"
          >
            {showAllFilters ? "Show less ▲" : "Show more ▼"}
          </button>
        )}
      </div>
    </div>
  );
}
