"use client";

import { usePathname } from "next/navigation";
import { HeroCarousel } from "../../components/home/HeroCarousel";
import type { HeroTab } from "../../components/home/hero-carousel/types";

export default function WithHeroLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const activeTab: HeroTab =
    pathname === "/direct-top-up" ? "topup" : "digital";

  return (
    <>
      <HeroCarousel activeTab={activeTab} />
      {children}
    </>
  );
}
