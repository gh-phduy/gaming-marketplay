import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useDebounce } from "./useDebounce";

describe("useDebounce Hook", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it("should return initial value", () => {
    const { result } = renderHook(() => useDebounce("initial", 500));
    expect(result.current).toBe("initial");
  });

  it("should debounce value changes", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: "initial", delay: 500 } }
    );

    // Update value
    rerender({ value: "updated", delay: 500 });
    
    // Value should not change immediately
    expect(result.current).toBe("initial");

    // Fast-forward time by 250ms
    act(() => {
      vi.advanceTimersByTime(250);
    });
    // Still not changed
    expect(result.current).toBe("initial");

    // Fast-forward remaining 250ms
    act(() => {
      vi.advanceTimersByTime(250);
    });
    
    // Now it should be updated
    expect(result.current).toBe("updated");
  });

  it("should reset timer if value changes before delay", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      { initialProps: { value: "step1" } }
    );

    rerender({ value: "step2" });
    
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(result.current).toBe("step1");

    // Change again before 500ms
    rerender({ value: "step3" });
    
    act(() => {
      vi.advanceTimersByTime(300);
    });
    // Still step1 because timer for step2 was cancelled
    expect(result.current).toBe("step1");

    // Wait full 500ms
    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(result.current).toBe("step3");
  });
});
