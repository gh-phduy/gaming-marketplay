import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useLocalStorage } from "./useLocalStorage";

describe("useLocalStorage Hook", () => {
  const TEST_KEY = "test_key";
  
  beforeEach(() => {
    // Clear localStorage before each test
    window.localStorage.clear();
    // useLocalStorage uses requestIdleCallback, which needs to be polyfilled or mocked if jsdom doesn't have it.
    // jsdom doesn't have requestIdleCallback, so the hook falls back to setTimeout.
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it("should return initial value when no data in localStorage", () => {
    const { result } = renderHook(() => useLocalStorage(TEST_KEY, "initial"));
    
    expect(result.current[0]).toBe("initial");
  });

  it("should return stored value when data exists in localStorage", () => {
    window.localStorage.setItem(TEST_KEY, JSON.stringify("stored"));
    
    const { result } = renderHook(() => useLocalStorage(TEST_KEY, "initial"));
    
    // initially it's "initial" before useEffect runs
    expect(result.current[0]).toBe("initial");
    
    act(() => {
      // Run timers for the setTimeout fallback (300ms)
      vi.advanceTimersByTime(300);
    });
    
    // After timeout, it should read from storage
    expect(result.current[0]).toBe("stored");
  });

  it("should update state and localStorage when setValue is called", () => {
    const { result } = renderHook(() => useLocalStorage(TEST_KEY, "initial"));
    
    act(() => {
      result.current[1]("new value");
    });
    
    expect(result.current[0]).toBe("new value");
    expect(window.localStorage.getItem(TEST_KEY)).toBe(JSON.stringify("new value"));
  });

  it("should support functional updates", () => {
    const { result } = renderHook(() => useLocalStorage<number>(TEST_KEY, 0));
    
    act(() => {
      result.current[1]((prev) => prev + 1);
    });
    
    expect(result.current[0]).toBe(1);
    expect(window.localStorage.getItem(TEST_KEY)).toBe("1");
  });

  it("should remove value from state and localStorage when removeValue is called", () => {
    const { result } = renderHook(() => useLocalStorage(TEST_KEY, "initial"));
    
    act(() => {
      result.current[1]("new value");
    });
    expect(window.localStorage.getItem(TEST_KEY)).toBe(JSON.stringify("new value"));
    
    act(() => {
      result.current[2](); // removeValue
    });
    
    expect(result.current[0]).toBe("initial"); // resets to initial
    expect(window.localStorage.getItem(TEST_KEY)).toBeNull();
  });
});
