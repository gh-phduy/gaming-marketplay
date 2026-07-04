"use client";

import React from "react";
import {
  List,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import ProductSidebar from "@/components/product/ProductSidebar";
import ProductGridItem from "@/components/product/ProductGridItem";
import { IoMdHome } from "react-icons/io";
import { FaChevronRight } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { IoCloseSharp } from "react-icons/io5";
import Pagination from "@/components/shared/Pagination";
import LoadMoreButton from "@/components/shared/LoadMoreButton";
import { useProductDetail, FILTERS_COLLAPSED_HEIGHT } from "./useProductDetail";
import { ProductSortDropdown } from "./ProductDetailComponents";

export default function ProductClient() {
  const {
    isLoading,
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    sortBy,
    setSortBy,
    showAllFilters,
    setShowAllFilters,
    isOverflowing,
    filtersRef,
    paginatedProducts,
    totalPages,
    selectedPlatformFilters,
    primarySelectedPlatform,
    selectedSortLabel,
    selectedPlatforms,
    setSelectedPlatforms,
    resetProductFilters,
  } = useProductDetail();

  return (
    <div className="flex min-h-screen w-full bg-[#0d1117] font-sans text-white">
      {/* Desktop Sidebar — hidden below lg */}
      <aside className="hidden lg:block">
        <ProductSidebar />
      </aside>

      {/* Main Content Area */}
      <div className="w-full min-w-0 space-y-6 bg-midnight-850 px-3 py-4 sm:space-y-8 sm:px-5 sm:py-6 md:px-6 lg:px-8 xl:px-10">
        {/* Breadcrumb */}
        <div className="mb-2 flex items-center gap-2 text-sm text-steel-500 sm:mb-4 sm:text-base">
          <IoMdHome size={18} />
          <FaChevronRight size={12} />
          <span className="font-medium">Game keys</span>
          {primarySelectedPlatform && (
            <>
              <FaChevronRight size={12} />
              <span className="font-medium text-steel-300">
                {primarySelectedPlatform}
              </span>
            </>
          )}
        </div>

        <h1 className="mb-4 text-2xl font-bold sm:mb-6 sm:text-3xl">
          {primarySelectedPlatform
            ? `${primarySelectedPlatform} game keys`
            : "Products"}
        </h1>

        {/* Top Controls */}
        <div className="mb-4 flex flex-col gap-3 sm:mb-6 sm:gap-4 md:flex-row">
          {/* Search */}
          <div className="relative flex-1">
            <IoSearch
              size={24}
              className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500"
            />
            <Input
              placeholder="Search by Product name"
              className="h-10 bg-midnight-750 pl-10 text-sm text-gray-300 sm:h-11 sm:text-base"
              value={searchTerm}
              onChange={(event) => {
                setSearchTerm(event.target.value);
                setCurrentPage(1);
              }}
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => {
                  setSearchTerm("");
                  setCurrentPage(1);
                }}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 transition-colors hover:text-white"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Sort / View / Filter toggle */}
          <div className="flex items-center gap-2">
            {/* Mobile filter toggle */}
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

            <ProductSortDropdown
              value={sortBy}
              onChange={(nextSort) => {
                setSortBy(nextSort);
                setCurrentPage(1);
              }}
            />

            <Button
              variant="outline"
              className="hidden h-10 border-[#30363d] bg-midnight-700 px-3 text-steel-300 sm:inline-flex sm:h-11"
            >
              <List className="mr-2 h-5 w-5 sm:h-6 sm:w-6" /> List
            </Button>
          </div>
        </div>

        {/* Filters Tag List */}
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
                    onClick={() => {
                      setSearchTerm("");
                      setCurrentPage(1);
                    }}
                  />
                </span>
              )}
              <span className="inline-flex items-center gap-1 rounded-full bg-midnight-500 px-2 py-1 text-xs font-medium text-steel-300 sm:text-sm">
                {selectedSortLabel}
                <IoCloseSharp
                  className="cursor-pointer hover:text-white"
                  onClick={() => {
                    setSortBy("popular");
                    setCurrentPage(1);
                  }}
                />
              </span>
              {selectedPlatformFilters.map((filter) => (
                <span
                  key={filter.id}
                  className="inline-flex items-center gap-1 rounded-full bg-midnight-500 px-2 py-1 text-xs font-medium text-steel-300 sm:text-sm"
                >
                  {filter.label}
                  <IoCloseSharp
                    className="cursor-pointer hover:text-white"
                    onClick={() => {
                      setSelectedPlatforms(
                        selectedPlatforms.filter(
                          (platform) => platform !== filter.id,
                        ),
                      );
                      setCurrentPage(1);
                    }}
                  />
                </span>
              ))}
            </div>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-1">
            <button
              type="button"
              onClick={() => {
                setSearchTerm("");
                setSortBy("popular");
                setShowAllFilters(false);
                resetProductFilters();
                setCurrentPage(1);
              }}
              className="flex items-center gap-1 text-xs whitespace-nowrap text-gray-400 hover:text-white sm:text-sm"
            >
              Clear all <X className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </button>
            {isOverflowing && (
              <button
                onClick={() => setShowAllFilters(!showAllFilters)}
                className="text-xs whitespace-nowrap text-emerald-500 transition-colors hover:text-emerald-100 sm:text-sm"
              >
                {showAllFilters ? "Show less ▲" : "Show more ▼"}
              </button>
            )}
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          {isLoading ? (
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="aspect-video animate-pulse rounded-lg bg-midnight-750 sm:aspect-auto sm:h-[250px]"
                />
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
                {paginatedProducts.map((product) => (
                  <ProductGridItem
                    key={product.id}
                    id={product.id}
                    title={product.title}
                    price={product.price}
                    image={product.image}
                    platform={product.platform}
                  />
                ))}
              </div>
            </>
          )}
        </div>
        <LoadMoreButton />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          previousLabel="Back"
          nextLabel="Next"
        />
      </div>
    </div>
  );
}
