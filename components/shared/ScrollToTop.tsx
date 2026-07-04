"use client";

import { useEffect } from "react";

/**
 * ScrollToTop Component
 * Automatically scrolls to top when component mounts
 */
export default function ScrollToTop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
}
