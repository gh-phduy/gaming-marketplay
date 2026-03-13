"use client";

import { useState, useEffect, useCallback } from "react";

/**
 * Hook để lưu trữ dữ liệu trong localStorage
 * Sử dụng cho cart, preferences, etc.
 *
 * @param key - Key trong localStorage
 * @param initialValue - Giá trị mặc định nếu chưa có trong storage
 * @returns [storedValue, setValue, removeValue]
 *
 * @example
 * const [cartItems, setCartItems, clearCart] = useLocalStorage<CartItem[]>('cart', []);
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((val: T) => T)) => void, () => void] {
  // State để lưu trữ giá trị
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  // Đọc từ localStorage khi component mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    let idleCallbackId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const readFromStorage = () => {
      try {
        const item = window.localStorage.getItem(key);
        if (item) {
          setStoredValue(JSON.parse(item));
        }
      } catch (error) {
        console.warn(`Error reading localStorage key "${key}":`, error);
      }
    };

    if (typeof window.requestIdleCallback === "function") {
      idleCallbackId = window.requestIdleCallback(readFromStorage, {
        timeout: 2000,
      });
    } else {
      timeoutId = globalThis.setTimeout(readFromStorage, 300);
    }

    return () => {
      if (idleCallbackId !== undefined && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleCallbackId);
      }
      if (timeoutId !== undefined) {
        globalThis.clearTimeout(timeoutId);
      }
    };
  }, [key]);

  // Function để cập nhật giá trị
  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        // Cho phép value là function (giống useState)
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;

        setStoredValue(valueToStore);

        if (typeof window !== "undefined") {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, storedValue],
  );

  // Function để xóa giá trị
  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue);
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
}

export default useLocalStorage;
