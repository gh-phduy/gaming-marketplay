"use client";

import { RefObject, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { MdKeyboardArrowDown } from "react-icons/md";

interface TriggerProps {
  triggerRef: RefObject<HTMLButtonElement | null>;
  arrowRef: RefObject<HTMLDivElement | null>;
  headerIcon: ReactNode;
  label: string;
  isOpen: boolean;
  onClick: () => void;
}

export function FilterDropdownTrigger({
  triggerRef,
  arrowRef,
  headerIcon,
  label,
  isOpen,
  onClick,
}: TriggerProps) {
  return (
    <button
      ref={triggerRef}
      onClick={onClick}
      className={cn(
        "h-[44px] w-full rounded-lg border-none bg-surface-card text-dm-text-primary",
        "hover:bg-surface-overlay hover:ring-1 hover:ring-dm-border-strong",
        "px-4 transition-all duration-300 focus:ring-0 focus:outline-hidden",
        "flex items-center justify-between",
      )}
      aria-haspopup="listbox"
      aria-expanded={isOpen}
    >
      <div className="flex items-center gap-3 overflow-hidden">
        <span className="flex shrink-0 items-center justify-center text-dm-text-secondary">
          {headerIcon}
        </span>
        <span className="truncate font-sans text-[14px] leading-none font-medium">
          {label}
        </span>
      </div>
      <div ref={arrowRef} className="flex items-center justify-center">
        <MdKeyboardArrowDown
          className="shrink-0 text-dm-text-tertiary"
          size={20}
        />
      </div>
    </button>
  );
}
