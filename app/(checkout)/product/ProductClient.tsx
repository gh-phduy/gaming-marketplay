"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Search,
  List,
  LayoutGrid,
  RotateCcw,
  X,
  ShoppingCart,
  Bell,
  SlidersHorizontal,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import ProductSidebar from "@/app/components/product/ProductSidebar";
import ProductGridItem from "@/app/components/product/ProductGridItem";
import { IoMdHome } from "react-icons/io";
import { FaChevronRight } from "react-icons/fa";
import { SiNintendoswitch } from "react-icons/si";
import { FaPlaystation } from "react-icons/fa";
import { BsXbox } from "react-icons/bs";
import { IoSearch } from "react-icons/io5";
import { BsSortDown } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";
import Pagination from "@/app/components/shared/Pagination";
import LoadMoreButton from "@/app/components/shared/LoadMoreButton";
import { useQuery } from "@tanstack/react-query";
import {
  ProductFilterProvider,
  useProductFilter,
} from "@/app/contexts/ProductFilterContext";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  platform: string | string[];
}

const fetchListingProducts = async (): Promise<Product[]> => {
  const response = await fetch("http://localhost:5000/api/listing-products");
  if (!response.ok) throw new Error("Failed to fetch products");
  const data = await response.json();
  return data.products;
};

const CHOSEN_FILTERS = [{ id: 1, label: "Most popular" }];

const FILTERS_COLLAPSED_HEIGHT = 36; // ~1 row height in px
const ITEMS_PER_PAGE = 8;

export default function ProductClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["listing-products"],
    queryFn: fetchListingProducts,
  });

  const { priceRange, selectedPlatforms } = useProductFilter();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showAllFilters, setShowAllFilters] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const filtersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initialSearch =
      searchParams.get("name") || searchParams.get("search") || "";
    const initialPage = Number(searchParams.get("page") || "1");
    setSearchTerm(initialSearch);
    setCurrentPage(
      Number.isFinite(initialPage) && initialPage > 0 ? initialPage : 1,
    );
  }, [searchParams]);

  useEffect(() => {
    const trimmedSearchTerm = searchTerm.trim();
    const params = new URLSearchParams(searchParams.toString());

    if (trimmedSearchTerm) {
      params.set("name", trimmedSearchTerm);
    } else {
      params.delete("name");
    }
    params.delete("search");

    if (currentPage > 1) {
      params.set("page", String(currentPage));
    } else {
      params.delete("page");
    }

    const nextQuery = params.toString();
    const currentQuery = searchParams.toString();

    if (nextQuery === currentQuery) {
      return;
    }

    const nextUrl = nextQuery ? `${pathname}?${nextQuery}` : pathname;
    router.replace(nextUrl, { scroll: false });
  }, [currentPage, pathname, router, searchParams, searchTerm]);

  useEffect(() => {
    if (filtersRef.current) {
      setIsOverflowing(
        filtersRef.current.scrollHeight > FILTERS_COLLAPSED_HEIGHT + 4,
      );
    }
  }, [products]);

  // Filter products based on price range and platforms
  const filteredProducts = useMemo(() => {
    const normalizedSearchTerm = searchTerm.trim().toLowerCase();

    return products.filter((product) => {
      // Price filter
      const matchesPrice =
        product.price >= priceRange.min && product.price <= priceRange.max;

      // Platform filter
      const matchesPlatform =
        selectedPlatforms.length === 0 ||
        (Array.isArray(product.platform)
          ? product.platform.some((p) =>
              selectedPlatforms.includes(p.toLowerCase()),
            )
          : selectedPlatforms.includes(product.platform.toLowerCase()));

      const productTitle = product.title.toLowerCase();
      const productPlatform = Array.isArray(product.platform)
        ? product.platform.join(" ").toLowerCase()
        : product.platform.toLowerCase();
      const matchesSearch =
        normalizedSearchTerm.length === 0 ||
        productTitle.includes(normalizedSearchTerm) ||
        productPlatform.includes(normalizedSearchTerm);

      return matchesPrice && matchesPlatform && matchesSearch;
    });
  }, [products, priceRange, searchTerm, selectedPlatforms]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / ITEMS_PER_PAGE),
  );

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [currentPage, filteredProducts]);

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
          <span className="font-medium">Products</span>
        </div>

        <h1 className="mb-4 text-2xl font-bold sm:mb-6 sm:text-3xl">
          Products
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
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="h-10 border-[#30363d] bg-midnight-700 px-3 text-steel-300 sm:h-11 lg:hidden"
                >
                  <SlidersHorizontal className="mr-2 h-5 w-5" /> Filters
                </Button>
              </SheetTrigger>
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

            <Select defaultValue="Most popular">
              <SelectTrigger
                className="h-10 w-[140px] bg-midnight-750 text-sm text-white sm:h-11 sm:w-[200px] sm:text-base"
                size="default"
              >
                <BsSortDown size={18} />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent
                className="text-base text-red-500"
                alignItemWithTrigger={false}
              >
                <SelectGroup>
                  <SelectLabel>Sort by</SelectLabel>
                  <SelectItem value="Most popular">Most popular</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

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
              {CHOSEN_FILTERS.map((filter) => (
                <span
                  key={filter.id}
                  className="inline-flex items-center gap-1 rounded-full bg-midnight-500 px-2 py-1 text-xs font-medium text-steel-300 sm:text-sm"
                >
                  {filter.label}
                  <IoCloseSharp className="cursor-pointer hover:text-white" />
                </span>
              ))}
            </div>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-1">
            <button
              type="button"
              onClick={() => {
                setSearchTerm("");
                setCurrentPage(1);
              }}
              className="flex items-center gap-1 text-xs whitespace-nowrap text-gray-400 hover:text-white sm:text-sm"
            >
              Clear all <X className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </button>
            {isOverflowing && (
              <button
                onClick={() => setShowAllFilters(!showAllFilters)}
                className="text-xs whitespace-nowrap text-forest-500 transition-colors hover:text-forest-100 sm:text-sm"
              >
                {showAllFilters ? "Show less ▲" : "Show more ▼"}
              </button>
            )}
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          {isLoading ? (
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="aspect-video animate-pulse rounded-lg bg-midnight-750 sm:aspect-auto sm:h-[250px]"
                />
              ))}
            </div>
          ) : (
            <>
              <div className="mb-3 text-xs text-gray-400 sm:mb-4 sm:text-sm">
                Showing{" "}
                {filteredProducts.length === 0
                  ? 0
                  : (currentPage - 1) * ITEMS_PER_PAGE + 1}
                -
                {Math.min(
                  currentPage * ITEMS_PER_PAGE,
                  filteredProducts.length,
                )}{" "}
                of {filteredProducts.length} products ($
                {priceRange.min.toFixed(2)} - ${priceRange.max.toFixed(2)})
              </div>
              <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
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
