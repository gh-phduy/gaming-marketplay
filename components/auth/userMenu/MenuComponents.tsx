"use client";

import { cn } from "@/lib/utils";
import { MdArrowDropDown } from "react-icons/md";
import { ReactNode } from "react";

/**
 * Reusable menu item component
 */
export interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  value?: string;
  valueBadge?: boolean;
  valueClassName?: string;
  onClick?: () => void;
  expandable?: boolean;
}

export function MenuItem({
  icon,
  label,
  value,
  valueBadge,
  valueClassName,
  onClick,
  expandable,
}: MenuItemProps) {
  return (
    <button
      onClick={onClick}
      className="group flex w-full items-center justify-between rounded-md px-1 py-2.5 text-sm text-dm-text-secondary transition hover:bg-white/5"
    >
      <div className="flex items-center gap-3">
        <span className="text-[20px] text-white/40 transition-colors group-hover:text-white/70">
          {icon}
        </span>
        <span className="text-[14px] font-medium text-white/80 group-hover:text-white">
          {label}
        </span>
      </div>
      <div className="flex items-center gap-2">
        {value && (
          <span
            className={cn(
              "rounded px-2 py-0.5 text-[12px] font-medium",
              valueBadge ? "bg-[#1f2937]/80" : "",
              valueClassName ||
                (valueBadge ? "text-white/60" : "text-white/80"),
            )}
          >
            {value}
          </span>
        )}
        {expandable && <MdArrowDropDown className="text-lg text-white/40" />}
      </div>
    </button>
  );
}

/**
 * Reusable menu section component
 */
export function MenuSection({
  title,
  children,
  noDivider,
}: {
  title: string;
  children: ReactNode;
  noDivider?: boolean;
}) {
  return (
    <div className={cn("py-4", !noDivider && "border-b border-white/5")}>
      <h3 className="mb-4 px-1 text-[12px] font-medium text-white/30">
        {title}
      </h3>
      <div className="space-y-0.5">{children}</div>
    </div>
  );
}
