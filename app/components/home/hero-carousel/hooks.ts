import { useCallback, useEffect, useState } from "react";
import type { CarouselApi } from "@/components/ui/carousel";
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
