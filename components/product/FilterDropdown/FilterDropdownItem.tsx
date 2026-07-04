"use client";

import { cn } from "@/lib/utils";
import { RiGlobalLine } from "react-icons/ri";
import { FilterOption } from "./types";

interface ItemProps {
  option: FilterOption;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export function FilterDropdownItem({
  option,
  isSelected,
  onSelect,
}: ItemProps) {
  return (
    <button
      onClick={() => onSelect(option.id)}
      className={cn(
        "relative flex w-full cursor-pointer items-center px-4 py-[10px]",
        "border-none text-left outline-hidden transition-colors",
        "hover:bg-state-hover focus:bg-state-hover",
        isSelected && "bg-state-active",
      )}
      role="option"
      aria-selected={isSelected}
    >
      {/* Selection indicator */}
      {isSelected && (
        <div className="absolute top-0 left-0 z-10 h-full w-[3px] bg-dm-accent-green" />
      )}

      <div className="flex w-full items-center gap-3">
        {/* Icon / Flag */}
        <div className="flex h-[18px] w-[26px] shrink-0 items-center justify-center overflow-hidden rounded-[2px] bg-black/10 shadow-xs">
          {option.flagCode ? (
            <img
              src={`https://flagcdn.com/w80/${option.flagCode}.png`}
              alt={option.label}
              className="h-full w-full object-cover"
            />
          ) : option.icon ? (
            <span className="text-dm-text-tertiary">{option.icon}</span>
          ) : (
            <RiGlobalLine className="text-dm-text-tertiary" size={16} />
          )}
        </div>

        {/* Label and Count */}
        <div className="flex min-w-0 flex-1 items-center gap-1.5">
          <span
            className={cn(
              "truncate text-[14px]",
              isSelected
                ? "font-semibold text-dm-text-primary"
                : "text-dm-text-secondary",
            )}
          >
            {option.label}
          </span>
          {option.count !== undefined && (
            <span className="text-[12px] font-normal text-dm-text-tertiary">
              ({option.count})
            </span>
          )}
        </div>
      </div>
    </button>
  );
}
