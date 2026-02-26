import { useCallback, useEffect, useState } from "react";
import type { CarouselApi } from "@/components/ui/carousel";
import { HERO_MEDIA_QUERIES } from "./config";
import type { HeroViewportState } from "./types";

/**
 * Single source of truth for hero responsive flags.
 * Keeps media query event wiring out of rendering components.
 */
export function useHeroViewport(): HeroViewportState {
  const [viewport, setViewport] = useState<HeroViewportState>({
    isLargeScreen: false,
    isWideScreen: false,
    isDesktop: false,
    isSideBannerVisible: false,
  });

  useEffect(() => {
    const largeMq = window.matchMedia(HERO_MEDIA_QUERIES.isLargeScreen);
    const wideMq = window.matchMedia(HERO_MEDIA_QUERIES.isWideScreen);
    const desktopMq = window.matchMedia(HERO_MEDIA_QUERIES.isDesktop);
    const sideBannerMq = window.matchMedia(
      HERO_MEDIA_QUERIES.isSideBannerVisible,
    );

    const syncViewport = () => {
      setViewport({
        isLargeScreen: largeMq.matches,
        isWideScreen: wideMq.matches,
        isDesktop: desktopMq.matches,
        isSideBannerVisible: sideBannerMq.matches,
      });
    };

    syncViewport();

    largeMq.addEventListener("change", syncViewport);
    wideMq.addEventListener("change", syncViewport);
    desktopMq.addEventListener("change", syncViewport);
    sideBannerMq.addEventListener("change", syncViewport);

    return () => {
      largeMq.removeEventListener("change", syncViewport);
      wideMq.removeEventListener("change", syncViewport);
      desktopMq.removeEventListener("change", syncViewport);
      sideBannerMq.removeEventListener("change", syncViewport);
    };
  }, []);

  return viewport;
}

/**
 * Encapsulates Embla current index + indicator navigation.
 * Prevents carousel event wiring from cluttering the page-level component.
 */
export function useHeroCarouselSelection(api?: CarouselApi) {
  const [current, setCurrent] = useState(0);

  const scrollTo = useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api],
  );

  useEffect(() => {
    if (!api) return;

    const handleSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    handleSelect();
    api.on("select", handleSelect);

    return () => {
      api.off("select", handleSelect);
    };
  }, [api]);

  return { current, scrollTo };
}
