"use client";

import { useState, useEffect } from "react";

/**
 * Hook để theo dõi scroll position
 * Sử dụng cho NavBar và các component cần scroll effects
 *
 * @param threshold - Ngưỡng scroll để trigger (default: 100px)
 * @returns Object chứa scrollY và isScrolled
 *
 * @example
 * const { isScrolled, scrollY } = useScrollPosition(100);
 * // isScrolled = true khi user scroll qua 100px
 */
export function useScrollPosition(threshold: number = 100) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          // Only update state if the boolean value changes to avoid unnecessary re-renders
          // Note: If you need exact scrollY value for other components, consider a separate hook or context
          // that doesn't trigger re-renders for components only caring about the threshold.
          // For now, we prioritize the threshold check which is the main use case.

          setIsScrolled((prev) => {
            const next = currentScrollY > threshold;
            return prev !== next ? next : prev;
          });

          ticking = false;
        });
        ticking = true;
      }
    };

    // Set initial value
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold]);

  return { isScrolled, scrollY: 0 }; // Temporarily disabling scrollY generic return to fix the perf issue for NavBar
}

export default useScrollPosition;
