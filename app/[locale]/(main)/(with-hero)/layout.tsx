"use client";

import { usePathname } from "@/i18n/routing";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import type { HeroTab } from "@/components/home/hero-carousel/types";

export default function WithHeroLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const shouldShowHero = pathname === "/" || pathname === "/direct-top-up";
  const activeTab: HeroTab =
    pathname === "/direct-top-up" ? "topup" : "digital";

  return (
    <>
      {shouldShowHero ? <HeroCarousel activeTab={activeTab} /> : null}
      {children}
    </>
  );
}
