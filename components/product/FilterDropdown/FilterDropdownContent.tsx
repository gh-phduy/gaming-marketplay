"use client";

import { RefObject } from "react";
import { FilterOption } from "./types";
import { FilterDropdownItem } from "./FilterDropdownItem";

interface ContentProps {
  dropdownRef: RefObject<HTMLDivElement | null>;
  contentRef: RefObject<HTMLDivElement | null>;
  options: FilterOption[];
  selectedValue: string;
  onSelect: (id: string) => void;
}

export function FilterDropdownContent({
  dropdownRef,
  contentRef,
  options,
  selectedValue,
  onSelect,
}: ContentProps) {
  return (
    <div
      ref={dropdownRef}
      className="absolute top-full left-0 z-50 mt-1 w-full"
    >
      <div
        ref={contentRef}
        className="hidden overflow-hidden rounded-lg border border-dm-border-subtle bg-surface-card shadow-2xl"
        role="listbox"
      >
        <div className="scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent max-h-[300px] overflow-y-auto py-1 font-sans">
          {options.map((option) => (
            <FilterDropdownItem
              key={option.id}
              option={option}
              isSelected={selectedValue === option.id}
              onSelect={onSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
