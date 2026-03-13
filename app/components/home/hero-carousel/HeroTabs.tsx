"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { IoGameController } from "react-icons/io5";
import { GiTwoCoins } from "react-icons/gi";
import type { HeroTab } from "./types";

interface HeroTabsProps {
  activeTab: HeroTab;
}

const SPRING = {
  type: "spring",
  stiffness: 380,
  damping: 32,
  mass: 0.9,
} as const;

/**
 * Switcher between Digital and Direct Top Up hero contexts.
 * Navigation is handled by parent, this component is purely presentational.
 */
export function HeroTabs({ activeTab }: HeroTabsProps) {
  const isDigital = activeTab === "digital";

  return (
    <div className="mb-8 flex justify-center">
      <div className="relative flex w-1/2 gap-1 rounded-full bg-white/10 p-1.5 backdrop-blur-md max-[600px]:w-5/6 max-[600px]:min-w-0 min-[601px]:min-w-[460px]">
        {/* Spring-animated background indicator */}
        <motion.div
          className="absolute top-1.5 left-1.5 h-[calc(100%-12px)] w-[calc((100%-16px)/2)] rounded-full"
          animate={{ x: isDigital ? 0 : "calc(100% + 4px)" }}
          transition={SPRING}
          style={{
            backgroundImage:
              "linear-gradient(115deg, #6fb24f 0%, #4b7e3c 45%, #355f2c 100%)",
          }}
          aria-hidden="true"
        />

        <Link
          href="/"
          scroll={false}
          className={cn(
            "relative z-10 flex h-11 w-1/2 cursor-pointer items-center justify-center gap-1 rounded-full px-2 text-sm font-semibold text-white transition-colors duration-300 sm:h-[50px] sm:gap-2 sm:text-base md:text-lg",
            isDigital ? "" : "text-white/60 hover:text-white",
          )}
        >
          <motion.span
            animate={{ scale: isDigital ? 1.2 : 1 }}
            transition={SPRING}
            className="flex items-center"
          >
            <IoGameController className="text-lg sm:text-xl md:text-2xl" />
          </motion.span>
          Digital Products
        </Link>

        <Link
          href="/direct-top-up"
          scroll={false}
          className={cn(
            "relative z-10 flex h-11 w-1/2 cursor-pointer items-center justify-center gap-1 rounded-full px-2 text-sm font-semibold text-white transition-colors duration-300 sm:h-[50px] sm:gap-2 sm:text-base md:text-lg",
            !isDigital ? "" : "text-white/60 hover:text-white",
          )}
        >
          <motion.span
            animate={{ scale: !isDigital ? 1.2 : 1 }}
            transition={SPRING}
            className="flex items-center"
          >
            <GiTwoCoins className="text-lg sm:text-xl md:text-2xl" />
          </motion.span>
          Direct Top Up
        </Link>
      </div>
    </div>
  );
}
