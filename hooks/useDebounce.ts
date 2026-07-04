"use client";

import { useState, useEffect } from "react";

/**
 * Hook để debounce một giá trị
 * Hữu ích cho search inputs và các real-time updates
 *
 * @param value - Giá trị cần debounce
 * @param delay - Độ trễ tính bằng ms (default: 500ms)
 * @returns Giá trị đã được debounce
 *
 * @example
 * const [searchTerm, setSearchTerm] = useState('');
 * const debouncedSearch = useDebounce(searchTerm, 300);
 * // API call only triggers when user stops typing for 300ms
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
