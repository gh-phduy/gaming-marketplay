"use client";

import { useState, useEffect } from "react";

/**
 * Breakpoints mặc định theo design system
 */
const BREAKPOINTS = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
  // Custom breakpoints cho project
  "770": 770,
  "800": 800,
  "990": 990,
  "1200": 1200,
  "1640": 1640,
  "1920": 1920,
} as const;

type BreakpointKey = keyof typeof BREAKPOINTS;

/**
 * Hook để check media queries
 * Hữu ích cho responsive logic trong JavaScript
 *
 * @param query - CSS media query string hoặc breakpoint key
 * @returns boolean - true nếu query matches
 *
 * @example
 * // Sử dụng với custom query
 * const isMobile = useMediaQuery('(max-width: 768px)');
 *
 * // Sử dụng với breakpoint
 * const isDesktop = useMediaQuery('1200');
 */
export function useMediaQuery(query: string | BreakpointKey): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Convert breakpoint key to media query
    let mediaQuery = query;
    if (query in BREAKPOINTS) {
      const width = BREAKPOINTS[query as BreakpointKey];
      mediaQuery = `(min-width: ${width}px)`;
    }

    const media = window.matchMedia(mediaQuery);

    // Set initial value
    setMatches(media.matches);

    // Create listener
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Modern API
    media.addEventListener("change", listener);

    return () => {
      media.removeEventListener("change", listener);
    };
  }, [query]);

  return matches;
}

/**
 * Hook trả về breakpoint hiện tại
 *
 * @returns Current breakpoint key
 *
 * @example
 * const breakpoint = useBreakpoint();
 * // breakpoint = 'md' | 'lg' | 'xl' | ...
 */
export function useBreakpoint(): BreakpointKey {
  const [breakpoint, setBreakpoint] = useState<BreakpointKey>("xs");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkBreakpoint = () => {
      const width = window.innerWidth;
      const sortedBreakpoints = Object.entries(BREAKPOINTS)
        .filter(([key]) => isNaN(Number(key))) // Only named breakpoints
        .sort(([, a], [, b]) => b - a);

      for (const [key, value] of sortedBreakpoints) {
        if (width >= value) {
          setBreakpoint(key as BreakpointKey);
          return;
        }
      }
      setBreakpoint("xs");
    };

    checkBreakpoint();
    window.addEventListener("resize", checkBreakpoint);

    return () => {
      window.removeEventListener("resize", checkBreakpoint);
    };
  }, []);

  return breakpoint;
}

export default useMediaQuery;
