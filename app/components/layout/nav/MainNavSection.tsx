"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import { FaTag } from "react-icons/fa";
import CategoriesDropdown from "./CategoriesDropdown";
import NavSearch from "./NavSearch";
import SearchButton from "./SearchButton";
import CartButton from "./CartButton";
import SignInButton from "./SignInButton";
import { Separator } from "@base-ui/react";
import { FaRegBell } from "react-icons/fa";
import { BiChat } from "react-icons/bi";
import { useAuth } from "@/app/context/AuthContext";

interface ListingProduct {
  id: number;
  title: string;
  price: number;
  image: string;
  platform: string | string[];
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function MainNavSection() {
  const router = useRouter();
  const searchContainerRef = useRef<HTMLDivElement | null>(null);
  const { user } = useAuth();

  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [products, setProducts] = useState<ListingProduct[]>([]);

  useEffect(() => {
    const fetchListingProducts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/listing-products`);
        if (!response.ok) return;

        const data = await response.json();
        setProducts(Array.isArray(data.products) ? data.products : []);
      } catch {
        setProducts([]);
      }
    };

    fetchListingProducts();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!searchContainerRef.current) return;

      if (!searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const normalizedQuery = searchValue.trim().toLowerCase();

  const filteredProducts = useMemo(() => {
    if (!normalizedQuery) return [];

    return products.filter((product) => {
      const titleMatch = product.title.toLowerCase().includes(normalizedQuery);
      const platformValue = Array.isArray(product.platform)
        ? product.platform.join(" ").toLowerCase()
        : product.platform.toLowerCase();

      return titleMatch || platformValue.includes(normalizedQuery);
    });
  }, [normalizedQuery, products]);

  const suggestedProducts = filteredProducts.slice(0, 5);
  const shouldShowSuggestions = isSearchFocused && normalizedQuery.length > 0;

  const handleCategoriesOpenChange = (open: boolean) => {
    setIsCategoriesOpen(open);
  };

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
  };

  const handleSearchBlur = () => {
    setIsSearchFocused(false);
  };

  const handleSelectProduct = (product: ListingProduct) => {
    setSearchValue(product.title);
    setIsSearchFocused(false);
    router.push(`/buy-cheap?id=${product.id}`);
  };

  const handleSearchSubmit = () => {
    if (!normalizedQuery) return;

    const firstMatch = suggestedProducts[0];
    if (firstMatch) {
      handleSelectProduct(firstMatch);
      return;
    }

    router.push(`/product?name=${encodeURIComponent(searchValue.trim())}`);
    setIsSearchFocused(false);
  };

  return (
    <>
      <div className="hidden 770:contents">
        <Separator orientation="vertical" className="h-6 w-[1px] bg-gray-700" />

        {/* Center Navigation - Search Bar */}
        <div className="hidden flex-1 items-center 770:flex">
          <div
            ref={searchContainerRef}
            className="relative flex w-full rounded-lg bg-surface-overlay p-[2px]"
          >
            {/* Categories Dropdown */}
            <CategoriesDropdown
              isOpen={isCategoriesOpen}
              onOpenChange={handleCategoriesOpenChange}
            />

            {/* Search Input */}
            <NavSearch
              value={searchValue}
              onChange={handleSearchChange}
              onFocus={handleSearchFocus}
              onBlur={handleSearchBlur}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  handleSearchSubmit();
                }
              }}
            />

            {/* Search Button */}
            <SearchButton onClick={handleSearchSubmit} />

            {shouldShowSuggestions && (
              <div className="absolute top-[calc(100%+8px)] right-0 left-0 z-[80] overflow-hidden rounded-xl border border-[#3b4758] bg-[#1d2634]/95 shadow-2xl backdrop-blur-sm">
                <div className="max-h-[500px] space-y-2 overflow-y-auto p-2">
                  {suggestedProducts.length > 0 ? (
                    suggestedProducts.map((product) => (
                      <button
                        key={product.id}
                        type="button"
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => handleSelectProduct(product)}
                        className="flex w-full overflow-hidden rounded-lg bg-[#3b4658] text-left transition-colors hover:bg-[#465266]"
                      >
                        <div className="relative h-[88px] w-[180px] shrink-0">
                          <Image
                            src={product.image}
                            alt={product.title}
                            fill
                            sizes="180px"
                            className="object-cover"
                          />
                        </div>

                        <div className="flex min-w-0 flex-1 items-center justify-between">
                          <div className="min-w-0 px-4 py-2">
                            <p className="text-sm text-gray-300">
                              Offers available
                            </p>
                            <p className="truncate text-3xl leading-tight font-semibold text-white">
                              {product.title}
                            </p>
                            <p className="truncate text-sm text-gray-300">
                              {Array.isArray(product.platform)
                                ? product.platform.join(" / ")
                                : product.platform}
                            </p>
                          </div>

                          <div className="flex h-full w-[132px] shrink-0 flex-col items-center justify-center gap-1 bg-[#465166] px-3">
                            <div className="flex items-center gap-1 text-sm text-gray-300">
                              <FaTag className="h-3 w-3" />
                              <span>from</span>
                            </div>
                            <p className="text-4xl leading-none font-semibold text-white">
                              $ {product.price.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="rounded-lg bg-[#3b4658] px-4 py-6 text-center text-sm text-gray-300">
                      No results found for "{searchValue.trim()}"
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-center gap-6 border-t border-[#3b4758] bg-[#1f2a3a] px-4 py-3 text-sm">
                  <span className="text-gray-400">
                    Results found : {filteredProducts.length}
                  </span>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 font-semibold text-gray-100 hover:text-white"
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => {
                      router.push(
                        `/product?name=${encodeURIComponent(searchValue.trim())}`,
                      );
                      setIsSearchFocused(false);
                    }}
                  >
                    View All
                    <FiChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side Actions */}
        <Separator orientation="vertical" className="h-6 w-[1px] bg-gray-700" />
        <div className="hidden items-center 990:flex 990:gap-6">
          {user && (
            <>
              <FaRegBell size={24} className="text-steel-500" />
              <BiChat size={24} className="text-steel-500" />
            </>
          )}
          <CartButton />
          <Separator
            orientation="vertical"
            className="h-6 w-[1px] bg-gray-700"
          />
        </div>
      </div>
      <SignInButton />
    </>
  );
}
