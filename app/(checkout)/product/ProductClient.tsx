"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { supabase } from "@/lib/supabase";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  ChevronDown,
  ChevronUp,
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
import { BsSortDown } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";
import Pagination from "@/components/shared/Pagination";
import LoadMoreButton from "@/components/shared/LoadMoreButton";
import { useQuery } from "@tanstack/react-query";
import { useProductFilter } from "@/contexts/ProductFilterContext";
import { PRODUCT_TYPES_DATA } from "@/components/product/sidebar/filter-data";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  platform: string | string[];
  platformLabel?: string;
  type?: string;
  productType?: string;
  category?: string;
  genre?: string;
  filters?: string[];
}

const mapDbProductToClientProduct = (row: any): Product => {
  return {
    id: row.id,
    title: row.title,
    price: Number(row.price),
    image: row.image_url || "/cyberpunk_2077.jpg",
    platform: row.platform || "PC",
    platformLabel: row.platform || "PC",
    type: row.category,
    productType: row.category,
    category: row.category,
    filters: [row.category, row.platform, row.region].filter(Boolean),
  };
};

const fetchListingProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("status", "published");

  if (error) {
    console.error("Error fetching products from Supabase:", error);
    throw error;
  }

  return (data || []).map(mapDbProductToClientProduct);
};

const FILTERS_COLLAPSED_HEIGHT = 36; // ~1 row height in px
const ITEMS_PER_PAGE = 8;
type ProductSortKey =
  | "newer"
  | "older"
  | "popular"
  | "name-asc"
  | "name-desc"
  | "price-asc"
  | "price-desc";

const SORT_OPTIONS: { label: string; value: ProductSortKey }[] = [
  { label: "Newer first", value: "newer" },
  { label: "Older first", value: "older" },
  { label: "Most popular", value: "popular" },
  { label: "Name A-Z", value: "name-asc" },
  { label: "Name Z-A", value: "name-desc" },
  { label: "Price: low to high", value: "price-asc" },
  { label: "Price: high to low", value: "price-desc" },
];

const PRODUCT_FILTER_LABEL_BY_ID = new Map(
  PRODUCT_TYPES_DATA.flatMap((type) =>
    type.subItems.map((subItem) => [subItem.id, subItem.label] as const),
  ),
);
const ROUTE_PRODUCT_TYPE_LABEL_BY_ID = new Map<string, string>([
  ["game-keys", "Game Keys"],
  ["console-games", "Console Games"],
  ["pc-games", "PC Games"],
  ["mobile", "Mobile"],
  ["game-currency", "Game Currency"],
  ["game-accounts", "Game Accounts"],
  ["game-items", "Game Items"],
  ["power-leveling", "Power Leveling"],
  ["software", "Software"],
  ["gift-cards", "Gift Cards"],
  ["game-cards", "Game Cards"],
]);
const FILTER_LABEL_BY_ID = new Map<string, string>([
  ...PRODUCT_FILTER_LABEL_BY_ID,
  ...ROUTE_PRODUCT_TYPE_LABEL_BY_ID,
]);
const ROUTE_PRODUCT_TYPE_FILTERS = new Set(
  ROUTE_PRODUCT_TYPE_LABEL_BY_ID.keys(),
);
const PLATFORM_QUERY_ALIASES: Record<string, string> = {
  "battle.net": "battle-net",
  battlenet: "battle-net",
  "battle-net": "battle-net",
  "electronic-arts": "ea",
  "epic-games": "epic",
};

function normalizeFilterId(value: string) {
  const normalized = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return PLATFORM_QUERY_ALIASES[normalized] ?? normalized;
}

function formatFilterLabel(filterId: string) {
  return (
    FILTER_LABEL_BY_ID.get(filterId) ??
    filterId
      .split("-")
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ")
  );
}

function getFilterQueryValues(searchParams: Pick<URLSearchParams, "getAll">) {
  return [
    ...searchParams.getAll("productType"),
    ...searchParams.getAll("type"),
    ...searchParams.getAll("platform"),
    ...searchParams.getAll("category"),
    ...searchParams.getAll("genre"),
    ...searchParams.getAll("brand"),
  ]
    .flatMap((value) => value.split(","))
    .map(normalizeFilterId)
    .filter(Boolean);
}

function getProductFilterValues(product: Product) {
  const platformValues = Array.isArray(product.platform)
    ? product.platform
    : [product.platform];
  const explicitFilters = product.filters ?? [];

  return [
    ...explicitFilters,
    ...platformValues,
    product.platformLabel,
    product.type,
    product.productType,
    product.category,
    product.genre,
  ]
    .filter((value): value is string => Boolean(value))
    .map(normalizeFilterId);
}

function productMatchesSelectedFilter(
  product: Product,
  selectedFilter: string,
) {
  const productFilterValues = getProductFilterValues(product);
  const selectedLabel = FILTER_LABEL_BY_ID.get(selectedFilter);
  const selectedLabelId = selectedLabel
    ? normalizeFilterId(selectedLabel)
    : selectedFilter;

  return productFilterValues.some((filterValue) => {
    return (
      filterValue === selectedFilter ||
      filterValue === selectedLabelId ||
      filterValue.includes(selectedFilter) ||
      selectedFilter.includes(filterValue)
    );
  });
}

function ProductSortDropdown({
  value,
  onChange,
}: {
  value: ProductSortKey;
  onChange: (value: ProductSortKey) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const selectedOption =
    SORT_OPTIONS.find((option) => option.value === value) ?? SORT_OPTIONS[2];

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative z-40">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
        className="flex h-10 w-[210px] items-center justify-between rounded-lg bg-midnight-750 px-4 text-left text-sm text-white transition hover:bg-[#303a4a] focus-visible:ring-2 focus-visible:ring-forest-500/70 focus-visible:outline-none sm:h-11 sm:w-[295px] sm:text-base"
      >
        <span className="flex min-w-0 items-center gap-3">
          <BsSortDown className="size-5 shrink-0 text-white" aria-hidden />
          <span className="truncate">{selectedOption.label}</span>
        </span>
        {isOpen ? (
          <ChevronUp className="size-5 shrink-0 text-white" aria-hidden />
        ) : (
          <ChevronDown className="size-5 shrink-0 text-steel-500" aria-hidden />
        )}
      </button>

      {isOpen && (
        <div
          role="listbox"
          aria-label="Sort products"
          className="absolute top-[calc(100%+6px)] right-0 left-0 overflow-hidden rounded-lg bg-[#303a4a] py-0 text-base text-[#c9d0dc] shadow-[0_22px_44px_rgba(4,8,14,0.36)] ring-1 ring-black/10"
        >
          {SORT_OPTIONS.map((option) => {
            const isSelected = option.value === value;

            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`flex h-12 w-full items-center border-l-[3px] px-5 text-left transition hover:bg-[#3a4658] focus-visible:outline-none ${
                  isSelected
                    ? "border-forest-500 bg-[#3a4658] text-white"
                    : "border-transparent"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function ProductClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["listing-products"],
    queryFn: fetchListingProducts,
  });

  const {
    priceRange,
    resetProductFilters,
    selectedPlatforms,
    setSelectedPlatforms,
  } = useProductFilter();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<ProductSortKey>("popular");
  const [showAllFilters, setShowAllFilters] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [hasLoadedUrlFilters, setHasLoadedUrlFilters] = useState(false);
  const filtersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initialSearch =
      searchParams.get("name") || searchParams.get("search") || "";
    const initialPage = Number(searchParams.get("page") || "1");
    const initialPlatforms = Array.from(
      new Set(getFilterQueryValues(searchParams)),
    );

    setSearchTerm(initialSearch);
    setSelectedPlatforms(initialPlatforms);
    setCurrentPage(
      Number.isFinite(initialPage) && initialPage > 0 ? initialPage : 1,
    );
    setHasLoadedUrlFilters(true);
  }, [searchParams, setSelectedPlatforms]);

  useEffect(() => {
    if (!hasLoadedUrlFilters) {
      return;
    }

    const trimmedSearchTerm = searchTerm.trim();
    const params = new URLSearchParams(searchParams.toString());

    if (trimmedSearchTerm) {
      params.set("name", trimmedSearchTerm);
    } else {
      params.delete("name");
    }
    params.delete("search");
    params.delete("category");
    params.delete("platform");
    params.delete("productType");
    params.delete("type");
    params.delete("genre");
    params.delete("brand");
    selectedPlatforms.forEach((platform) => {
      if (ROUTE_PRODUCT_TYPE_FILTERS.has(platform)) {
        params.append("productType", platform);
      } else {
        params.append("platform", platform);
      }
    });

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
  }, [
    currentPage,
    hasLoadedUrlFilters,
    pathname,
    router,
    searchParams,
    searchTerm,
    selectedPlatforms,
  ]);

  useEffect(() => {
    if (filtersRef.current) {
      setIsOverflowing(
        filtersRef.current.scrollHeight > FILTERS_COLLAPSED_HEIGHT + 4,
      );
    }
  }, [products, searchTerm, selectedPlatforms, sortBy]);

  // Filter products based on price range and platforms
  const filteredProducts = useMemo(() => {
    const normalizedSearchTerm = searchTerm.trim().toLowerCase();

    return products.filter((product) => {
      const selectedProductTypes = selectedPlatforms.filter((filterId) =>
        ROUTE_PRODUCT_TYPE_FILTERS.has(filterId),
      );
      const selectedSecondaryFilters = selectedPlatforms.filter(
        (filterId) => !ROUTE_PRODUCT_TYPE_FILTERS.has(filterId),
      );
      // Price filter
      const matchesPrice =
        product.price >= priceRange.min && product.price <= priceRange.max;

      const matchesProductType =
        selectedProductTypes.length === 0 ||
        selectedProductTypes.some((selectedFilter) =>
          productMatchesSelectedFilter(product, selectedFilter),
        );

      const matchesSecondaryFilters =
        selectedSecondaryFilters.length === 0 ||
        selectedSecondaryFilters.some((selectedFilter) =>
          productMatchesSelectedFilter(product, selectedFilter),
        );

      const productTitle = product.title.toLowerCase();
      const productPlatform = Array.isArray(product.platform)
        ? product.platform.join(" ").toLowerCase()
        : product.platform.toLowerCase();
      const productFilterText = [
        product.platformLabel,
        product.type,
        product.productType,
        product.category,
        product.genre,
        ...(product.filters ?? []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      const matchesSearch =
        normalizedSearchTerm.length === 0 ||
        productTitle.includes(normalizedSearchTerm) ||
        productPlatform.includes(normalizedSearchTerm) ||
        productFilterText.includes(normalizedSearchTerm);

      return (
        matchesPrice &&
        matchesProductType &&
        matchesSecondaryFilters &&
        matchesSearch
      );
    });
  }, [products, priceRange, searchTerm, selectedPlatforms]);

  const sortedProducts = useMemo(() => {
    const indexedProducts = filteredProducts.map((product, index) => ({
      product,
      index,
    }));

    indexedProducts.sort((left, right) => {
      switch (sortBy) {
        case "newer":
          return right.product.id - left.product.id;
        case "older":
          return left.product.id - right.product.id;
        case "name-asc":
          return left.product.title.localeCompare(right.product.title);
        case "name-desc":
          return right.product.title.localeCompare(left.product.title);
        case "price-asc":
          return left.product.price - right.product.price;
        case "price-desc":
          return right.product.price - left.product.price;
        case "popular":
        default:
          return left.index - right.index;
      }
    });

    return indexedProducts.map(({ product }) => product);
  }, [filteredProducts, sortBy]);

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
    return sortedProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [currentPage, sortedProducts]);

  const selectedPlatformFilters = useMemo(
    () =>
      selectedPlatforms.map((platform) => ({
        id: platform,
        label: formatFilterLabel(platform),
      })),
    [selectedPlatforms],
  );
  const primarySelectedPlatform =
    selectedPlatformFilters.find(
      (filter) => !ROUTE_PRODUCT_TYPE_FILTERS.has(filter.id),
    )?.label ?? selectedPlatformFilters[0]?.label;
  const selectedSortLabel =
    SORT_OPTIONS.find((option) => option.value === sortBy)?.label ??
    "Most popular";

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
