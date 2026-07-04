"use client";

import { useLayoutEffect } from "react";
import { HOME_CATEGORY_SCROLL_KEY } from "./home-scroll-restoration";

/**
 * Thời gian tối đa chờ layout ổn định trước khi reveal (ms).
 */
const MAX_RESTORE_DURATION = 1500;

/**
 * Số frame liên tiếp mà scrollHeight không đổi
 * để coi layout đã ổn định.
 */
const STABLE_FRAME_TARGET = 8;

/**
 * Dung sai thay đổi height (px).
 */
const HEIGHT_TOLERANCE = 2;

/**
 * HomeScrollRestoration Component
 *
 * Khôi phục vị trí scroll khi quay lại trang chủ từ trang category.
 *
 * Cách hoạt động:
 * 1. Ngay trong useLayoutEffect (trước paint), chặn hiển thị nội dung.
 * 2. Liên tục scrollTo vị trí đã lưu mỗi animation frame.
 * 3. Chờ cho đến khi scrollHeight ổn định (không thay đổi liên tiếp nhiều frame).
 * 4. Reveal nội dung với fade-in mượt.
 */
export default function HomeScrollRestoration() {
  useLayoutEffect(() => {
    const savedScrollY = window.sessionStorage.getItem(
      HOME_CATEGORY_SCROLL_KEY,
    );

    if (!savedScrollY) return;

    const scrollY = Number(savedScrollY);
    if (!Number.isFinite(scrollY) || scrollY <= 0) {
      window.sessionStorage.removeItem(HOME_CATEGORY_SCROLL_KEY);
      return;
    }

    // Xoá ngay để tránh trigger lại nếu component re-mount
    window.sessionStorage.removeItem(HOME_CATEGORY_SCROLL_KEY);

    const htmlEl = document.documentElement;
    const body = document.body;

    // Lưu style cũ
    const prevScrollBehavior = htmlEl.style.scrollBehavior;

    // Tắt smooth scroll
    htmlEl.style.scrollBehavior = "auto";

    // Tạo overlay che toàn bộ viewport thay vì ẩn body.
    // Cách này giữ nguyên layout, không gây reflow,
    // và tránh flash trắng vì overlay có cùng màu background.
    const overlay = document.createElement("div");
    overlay.setAttribute("data-scroll-restore-overlay", "");
    overlay.style.cssText = `
      position: fixed;
      inset: 0;
      z-index: 99999;
      background: var(--color-midnight-850, #0a0a0f);
      transition: opacity 150ms ease-out;
      pointer-events: none;
    `;
    body.appendChild(overlay);

    // Scroll ngay đến vị trí đã lưu
    window.scrollTo({ top: scrollY, left: 0, behavior: "auto" });

    const startTime = performance.now();
    let lastScrollHeight = htmlEl.scrollHeight;
    let stableFrames = 0;
    let frameId = 0;
    let fadeTimer = 0;
    let removeTimer = 0;

    const restoreScroll = () => {
      window.scrollTo({ top: scrollY, left: 0, behavior: "auto" });
    };

    const reveal = () => {
      // Scroll lần cuối
      restoreScroll();

      // Fade out overlay
      overlay.style.opacity = "0";

      // Restore styles
      htmlEl.style.scrollBehavior = prevScrollBehavior;

      // Xoá overlay sau khi fade xong
      fadeTimer = window.setTimeout(() => {
        overlay.remove();
      }, 170);
    };

    const waitForStableLayout = () => {
      // Giữ scroll position mỗi frame
      restoreScroll();

      const currentScrollHeight = htmlEl.scrollHeight;
      const heightDelta = Math.abs(currentScrollHeight - lastScrollHeight);

      if (heightDelta <= HEIGHT_TOLERANCE) {
        stableFrames += 1;
      } else {
        stableFrames = 0;
        lastScrollHeight = currentScrollHeight;
      }

      const elapsed = performance.now() - startTime;

      if (stableFrames >= STABLE_FRAME_TARGET || elapsed >= MAX_RESTORE_DURATION) {
        reveal();
        return;
      }

      frameId = window.requestAnimationFrame(waitForStableLayout);
    };

    frameId = window.requestAnimationFrame(waitForStableLayout);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(fadeTimer);
      window.clearTimeout(removeTimer);
      overlay.remove();
      htmlEl.style.scrollBehavior = prevScrollBehavior;
    };
  }, []);

  return null;
}
