"use client";

import { cn } from "@/lib/utils";
import { IoGameController } from "react-icons/io5";
import { GiTwoCoins } from "react-icons/gi";
import type { HeroTab } from "./types";

interface HeroTabsProps {
  activeTab: HeroTab;
  onTabChange: (tab: HeroTab) => void;
}

/**
 * Switcher between Digital and Direct Top Up hero contexts.
 * Navigation is handled by parent, this component is purely presentational.
 */
export function HeroTabs({ activeTab, onTabChange }: HeroTabsProps) {
  const indicatorClassName =
    activeTab === "digital"
      ? "translate-x-0"
      : "translate-x-[calc(100%+4px)]";

  return (
    <div className="mb-8 flex justify-center">
      <div className="relative flex w-1/2 min-w-[460px] gap-1 rounded-full bg-white/10 p-1.5 backdrop-blur-md">
        {/* Animated background gradient indicator */}
        <div
          className={cn(
            "absolute top-1.5 left-1.5 h-[calc(100%-12px)] w-[calc((100%-16px)/2)] rounded-full transition-transform duration-300 ease-out",
            indicatorClassName,
          )}
          style={{
            background: "linear-gradient(to right, #60984b, #406433)",
          }}
          aria-hidden="true"
        />

        <button
          onClick={() => onTabChange("digital")}
          className={cn(
            "relative z-10 flex h-[50px] w-1/2 cursor-pointer items-center justify-center gap-2 rounded-full text-lg font-semibold text-white transition-colors duration-200",
            activeTab === "digital" ? "" : "text-white/60 hover:text-white",
          )}
        >
          <IoGameController size={24} />
          Digital Products
        </button>

        <button
          onClick={() => onTabChange("topup")}
          className={cn(
            "relative z-10 flex h-[50px] w-1/2 cursor-pointer items-center justify-center gap-2 rounded-full text-lg font-semibold text-white transition-colors duration-200",
            activeTab === "topup" ? "" : "text-white/60 hover:text-white",
          )}
        >
          <GiTwoCoins size={24} />
          Direct Top Up
        </button>
      </div>
    </div>
  );
}
