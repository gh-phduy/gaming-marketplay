"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronRight, Tag } from "lucide-react";
import NavSearch from "./NavSearch";
import SearchButton from "./SearchButton";
import ChatInboxButton from "./ChatInboxButton";
import { Separator } from "@base-ui/react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";

const CategoriesDropdown = dynamic(() => import("./CategoriesDropdown"));
const CartButton = dynamic(() => import("./CartButton"));
const NotificationButton = dynamic(() => import("./NotificationButton"));
const SignInButton = dynamic(() => import("./SignInButton"));

interface ListingProduct {
  id: string;
  title: string;
  price: number;
  image: string;
  platform: string | string[];
}

export default function MainNavSection() {
  const router = useRouter();
  const pathname = usePathname();
  const searchContainerRef = useRef<HTMLDivElement | null>(null);
  const { user } = useAuth();

  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [products, setProducts] = useState<ListingProduct[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const trimmed = searchValue.trim();
    if (!trimmed) {
      setProducts([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    let active = true;

    const delayDebounce = setTimeout(async () => {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("id, title, price, image_url, platform")
          .eq("status", "published")
          .ilike("title", `%${trimmed}%`)
          .limit(20);

        if (!active) return;

        if (error) {
          console.error("Error searching products from Supabase:", error);
          setProducts([]);
          return;
        }

        const mapped = (data || []).map((row: any) => ({
          id: row.id,
          title: row.title,
          price: Number(row.price),
          image: row.image_url || "/cyberpunk_2077.jpg",
          platform: row.platform || "PC",
        }));

        setProducts(mapped);
      } catch (err) {
        console.error("Failed to search products:", err);
        if (active) setProducts([]);
      } finally {
        if (active) {
          setIsSearching(false);
        }
      }
    }, 300);

    return () => {
      active = false;
      clearTimeout(delayDebounce);
    };
  }, [searchValue]);

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

  useEffect(() => {
    setIsCategoriesOpen(false);
  }, [pathname]);

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
              <div className="absolute top-[calc(100%+8px)] right-0 left-0 z-[80] overflow-hidden rounded-xl border border-[#2a3547] bg-[#151c28] shadow-2xl backdrop-blur-sm">
                <div className="max-h-[440px] space-y-2 overflow-y-auto p-2 custom-scrollbar">
                  {isSearching ? (
                    <div className="space-y-2">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="flex w-full items-stretch overflow-hidden rounded-lg bg-[#1e2633] border border-[#2a3547]/10 h-[72px]"
                        >
                          <div className="h-full w-[128px] shrink-0 animate-pulse bg-slate-700/50" />
                          <div className="flex-1 flex items-center justify-between px-3.5">
                            <div className="space-y-2 flex-1 min-w-0 pr-4">
                              <div className="h-2 w-16 animate-pulse rounded bg-slate-700/50" />
                              <div className="h-4 w-40 animate-pulse rounded bg-slate-700/50" />
                              <div className="h-2 w-24 animate-pulse rounded bg-slate-700/50" />
                            </div>
                            <div className="h-full w-[116px] shrink-0 flex flex-col items-center justify-center gap-1.5 bg-[#252e3e]/50 px-3">
                              <div className="h-2.5 w-8 animate-pulse rounded bg-slate-700/50" />
                              <div className="h-5 w-16 animate-pulse rounded bg-slate-700/50" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : suggestedProducts.length > 0 ? (
                    suggestedProducts.map((product) => (
                      <button
                        key={product.id}
                        type="button"
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => handleSelectProduct(product)}
                        className="group flex w-full items-stretch overflow-hidden rounded-lg bg-[#1e2633] border border-[#2a3547]/30 text-left transition-colors hover:bg-[#283244]"
                      >
                        <div className="relative h-[72px] w-[128px] shrink-0 overflow-hidden">
                          <Image
                            src={product.image}
                            alt={product.title}
                            fill
                            sizes="128px"
                            className="object-cover"
                          />
                        </div>

                        <div className="flex min-w-0 flex-1 items-center justify-between">
                          <div className="min-w-0 px-3.5 py-1">
                            <p className="text-[10px] font-semibold tracking-wider text-gray-400 uppercase">
                              Offers available
                            </p>
                            <p className="truncate text-base font-bold text-white mt-0.5">
                              {product.title}
                            </p>
                            <p className="truncate text-xs text-gray-400 mt-0.5 lowercase">
                              {Array.isArray(product.platform)
                                ? product.platform.join(" / ")
                                : product.platform}
                            </p>
                          </div>

                          <div className="flex h-full w-[116px] shrink-0 flex-col items-center justify-center bg-[#252e3e] px-3 transition-colors group-hover:bg-[#303e54]">
                            <div className="flex items-center gap-1 text-[10px] text-gray-400">
                              <Tag className="h-3 w-3" />
                              <span>from</span>
                            </div>
                            <p className="text-lg font-bold text-white mt-0.5">
                              $ {product.price.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="rounded-lg bg-[#1e2633] border border-[#2a3547]/30 px-4 py-6 text-center text-sm text-gray-400">
                      No results found for "{searchValue.trim()}"
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-center gap-6 border-t border-[#2a3547] bg-[#111622] px-4 py-2.5 text-xs">
                  <span className="text-gray-400">
                    Results found : {filteredProducts.length}
                  </span>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 font-semibold text-gray-200 hover:text-white"
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => {
                      router.push(
                        `/product?name=${encodeURIComponent(searchValue.trim())}`,
                      );
                      setIsSearchFocused(false);
                    }}
                  >
                    View All
                    <ChevronRight className="h-3.5 w-3.5" />
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
              <NotificationButton accountId={user.id} />
              <ChatInboxButton accountId={user.id} />
            </>
          )}
          <CartButton />
          <Separator
            orientation="vertical"
            className="h-6 w-[1px] bg-gray-700"
          />
        </div>
      </div>
      <div className="flex items-center gap-3 800:gap-5">
        {user ? (
          <div className="flex items-center gap-1.5 sm:gap-3 990:hidden">
            <NotificationButton accountId={user.id} />
            <ChatInboxButton accountId={user.id} />
            <CartButton />
          </div>
        ) : (
          <div className="flex items-center gap-1.5 sm:gap-3 990:hidden">
            <CartButton />
          </div>
        )}
        <SignInButton />
      </div>
    </>
  );
}
