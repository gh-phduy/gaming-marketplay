"use client";

import { List, SlidersHorizontal, X } from "lucide-react";
import { IoSearch } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ProductSidebar from "@/components/product/ProductSidebar";
import type { ProductSortKey } from "../_lib/product-listing";
import ProductSortDropdown from "./ProductSortDropdown";

/* ==========================================================================
   TYPE DEFINITIONS & INTERFACES
   ========================================================================== */

interface ProductToolbarProps {
  searchTerm: string;
  sortBy: ProductSortKey;
  onSearchChange: (value: string) => void;
  onSortChange: (value: ProductSortKey) => void;
}

/* ==========================================================================
   MAIN COMPONENT: ProductToolbar
   ========================================================================== */

/**
 * ProductToolbar Component
 *
 * Renders the search input, sorting selectors, and layout toggles.
 * Provides a responsive Sheet modal trigger on mobile viewports (< 1024px)
 * to open the sidebar filters in a drawer overlay.
 */
export default function ProductToolbar({
  searchTerm,
  sortBy,
  onSearchChange,
  onSortChange,
}: ProductToolbarProps) {
  return (
    <div className="mb-4 flex flex-col gap-3 sm:mb-6 sm:gap-4 md:flex-row">
      {/* Product Name Search Field */}
      <div className="relative flex-1">
        <IoSearch
          size={24}
          className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500"
        />
        <Input
          placeholder="Search by Product name"
          className="h-10 bg-midnight-750 pl-10 text-sm text-gray-300 sm:h-11 sm:text-base"
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
        />
        {searchTerm && (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 transition-colors hover:text-white"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Toolbar Options Actions */}
      <div className="flex items-center gap-2">
        {/* Mobile Filters Slide-out Sheet Trigger */}
        <Sheet>
          <SheetTrigger
            render={
              <Button
                variant="outline"
                className="h-10 border-[#30363d] bg-midnight-700 px-3 text-steel-300 sm:h-11 lg:hidden"
              >
                <SlidersHorizontal className="mr-2 h-5 w-5" /> Filters
              </Button>
            }
          />
          <SheetContent
            side="left"
            className="w-[280px] overflow-y-auto border-[#30363d] bg-midnight-700 p-0 sm:w-[320px]"
          >
            <SheetHeader className="px-4 pt-4">
              <SheetTitle className="text-white">Filters</SheetTitle>
            </SheetHeader>
            <ProductSidebar />
          </SheetContent>
        </Sheet>

        {/* Product Sorting Selector */}
        <ProductSortDropdown value={sortBy} onChange={onSortChange} />

        {/* View Layout Toggle Button */}
        <Button
          variant="outline"
          className="hidden h-10 border-[#30363d] bg-midnight-700 px-3 text-steel-300 sm:inline-flex sm:h-11"
        >
          <List className="mr-2 h-5 w-5 sm:h-6 sm:w-6" /> List
        </Button>
      </div>
    </div>
  );
}

