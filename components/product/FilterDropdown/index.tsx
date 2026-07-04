"use client";

import { cn } from "@/lib/utils";
import { FilterDropdownProps } from "./types";
import { useFilterDropdown } from "./useFilterDropdown";
import { FilterDropdownTrigger } from "./FilterDropdownTrigger";
import { FilterDropdownContent } from "./FilterDropdownContent";

export default function FilterDropdown({
  options,
  defaultValue,
  headerIcon,
  width = "w-[366px]",
  onChange,
  className,
}: FilterDropdownProps) {
  const {
    value,
    isOpen,
    selectedOption,
    triggerRef,
    dropdownRef,
    contentRef,
    arrowRef,
    handleSelect,
    toggleDropdown,
  } = useFilterDropdown(options, defaultValue, onChange);

  return (
    <div className={cn("relative", width, className)}>
      <FilterDropdownTrigger
        triggerRef={triggerRef}
        arrowRef={arrowRef}
        headerIcon={headerIcon}
        label={selectedOption?.label || ""}
        isOpen={isOpen}
        onClick={toggleDropdown}
      />
      <FilterDropdownContent
        dropdownRef={dropdownRef}
        contentRef={contentRef}
        options={options}
        selectedValue={value}
        onSelect={handleSelect}
      />
    </div>
  );
}

// Re-export types for convenience
export type { FilterOption, FilterDropdownProps } from "./types";
