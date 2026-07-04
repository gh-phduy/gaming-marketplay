"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { BsSortDown } from "react-icons/bs";
import {
  SORT_OPTIONS,
  type ProductSortKey,
} from "../_lib/product-listing";

/* ==========================================================================
   TYPE DEFINITIONS & INTERFACES
   ========================================================================== */

interface ProductSortDropdownProps {
  value: ProductSortKey;
  onChange: (value: ProductSortKey) => void;
}

/* ==========================================================================
   MAIN COMPONENT: ProductSortDropdown
   ========================================================================== */

/**
 * ProductSortDropdown Component
 *
 * Renders a custom select dropdown menu to choose active sorting keys.
 * Listens for outside mouse clicks or escape key sequences to close the menu.
 */
export default function ProductSortDropdown({
  value,
  onChange,
}: ProductSortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const selectedOption =
    SORT_OPTIONS.find((option) => option.value === value) ?? SORT_OPTIONS[2];

  // Hook: Monitor document pointer down and keydown events for close boundaries
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
      {/* Dropdown Menu Trigger */}
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

      {/* Dropdown Menu Options Panel */}
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

