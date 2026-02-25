"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { CarouselApi } from "@/components/ui/carousel";
import { HeroCategoryTiles } from "./hero-carousel/HeroCategoryTiles";
import { HeroSideBanners } from "./hero-carousel/HeroSideBanners";
import { HeroSlides } from "./hero-carousel/HeroSlides";
import { HeroTabs } from "./hero-carousel/HeroTabs";

const TAB_CONTENT = {
  digital: {
    title: "THOUSANDS OF DIGITAL PRODUCTS",
    description:
      "Discover a vast selection of digital goods for every need — from the latest PC and console games to gift cards, software, subscriptions, and more.",
  },
  topup: {
    title: "TOP UP GAMES AND SERVICES INSTANTLY",
    description:
      "Instantly top up your favorite games and digital services — from in-game currencies to account balances. Fast, secure, and code-free.",
  },
};

export function HeroCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [isWideScreen, setIsWideScreen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isSideBannerVisible, setIsSideBannerVisible] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const activeTab: "digital" | "topup" =
    pathname === "/direct-top-up" ? "topup" : "digital";

  useEffect(() => {
    const largeMq = window.matchMedia("(min-width: 1920px)");
    const wideMq = window.matchMedia("(min-width: 1640px)");
    const desktopMq = window.matchMedia("(min-width: 1200px)");
    const sideBannerMq = window.matchMedia("(min-width: 1100px)");

    setIsLargeScreen(largeMq.matches);
    setIsWideScreen(wideMq.matches);
    setIsDesktop(desktopMq.matches);
    setIsSideBannerVisible(sideBannerMq.matches);

    const largeHandler = (e: MediaQueryListEvent) =>
      setIsLargeScreen(e.matches);
    const wideHandler = (e: MediaQueryListEvent) => setIsWideScreen(e.matches);
    const desktopHandler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    const sideBannerHandler = (e: MediaQueryListEvent) =>
      setIsSideBannerVisible(e.matches);

    largeMq.addEventListener("change", largeHandler);
    wideMq.addEventListener("change", wideHandler);
    desktopMq.addEventListener("change", desktopHandler);
    sideBannerMq.addEventListener("change", sideBannerHandler);

    return () => {
      largeMq.removeEventListener("change", largeHandler);
      wideMq.removeEventListener("change", wideHandler);
      desktopMq.removeEventListener("change", desktopHandler);
      sideBannerMq.removeEventListener("change", sideBannerHandler);
    };
  }, []);

  const digitalHeight = isLargeScreen
    ? 451
    : isWideScreen
      ? 371
      : isDesktop
        ? 310
        : 270;
  const topupHeight = isLargeScreen ? 274 : 225;

  const handleTabChange = (tab: "digital" | "topup") => {
    if (tab === "topup") {
      router.push("/direct-top-up", { scroll: false });
    } else {
      router.push("/", { scroll: false });
    }
  };

  const scrollTo = useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api],
  );

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const tabContent = TAB_CONTENT[activeTab];

  return (
    <div
      className="relative flex w-full justify-center py-8"
      style={{
        backgroundImage: "url(/bg-hero-carousel.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Content */}
      <div className="relative z-10 responsive">
        <div className="mx-auto w-full max-w-[1700px] px-4">
          <HeroTabs activeTab={activeTab} onTabChange={handleTabChange} />

          <div className="mb-6 text-center">
            <AnimatePresence mode="wait" initial={false}>
              <motion.h1
                key={`title-${activeTab}`}
                className="mb-3 text-3xl font-bold tracking-wide text-white uppercase md:text-4xl"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                {tabContent.title}
              </motion.h1>
            </AnimatePresence>
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={`desc-${activeTab}`}
                className="mx-auto max-w-3xl text-sm text-gray-300 md:text-base"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: "easeOut", delay: 0.04 }}
              >
                {tabContent.description}
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="mb-8">
            <div className="mx-auto max-w-[1670px] rounded-3xl border border-white/5 bg-[#0a0a0b]/20 p-6 shadow-2xl backdrop-blur-sm">
              <motion.div
                className={`mb-4 grid gap-4 overflow-hidden rounded-3xl lg:justify-center ${
                  isSideBannerVisible
                    ? "grid-cols-[610px_300px] 1200:grid-cols-[760px_350px] 1640:grid-cols-[863px_417px] 1920:grid-cols-[1050px_510px]"
                    : "grid-cols-1"
                }`}
                layout
                initial={{ height: digitalHeight }}
                animate={{
                  height: activeTab === "digital" ? digitalHeight : topupHeight,
                }}
                transition={{
                  height: {
                    type: "spring",
                    stiffness: 220,
                    damping: 30,
                    mass: 0.9,
                  },
                  layout: {
                    type: "spring",
                    stiffness: 220,
                    damping: 30,
                    mass: 0.9,
                  },
                }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={`slides-${activeTab}`}
                    className="h-full min-w-0"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <HeroSlides
                      setApi={setApi}
                      current={current}
                      onIndicatorClick={scrollTo}
                      activeTab={activeTab}
                    />
                  </motion.div>
                </AnimatePresence>
                {isSideBannerVisible && (
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={`side-banner-${activeTab}`}
                      className="hidden h-full lg:block"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.28, ease: "easeOut" }}
                    >
                      <HeroSideBanners activeTab={activeTab} />
                    </motion.div>
                  </AnimatePresence>
                )}
              </motion.div>

              <motion.div
                layout
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 28,
                  mass: 0.9,
                }}
              >
                <HeroCategoryTiles activeTab={activeTab} />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
