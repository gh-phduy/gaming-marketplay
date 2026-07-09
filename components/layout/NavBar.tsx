"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ROUTES } from "@/lib/constants";

function NavSectionFallback() {
  return <div className="hidden h-10 flex-1 770:block" aria-hidden="true" />;
}

const CheckoutNavSection = dynamic(() => import("./nav/CheckoutNavSection"), {
  ssr: false,
  loading: NavSectionFallback,
});

const MainNavSection = dynamic(() => import("./nav/MainNavSection"), {
  ssr: false,
  loading: NavSectionFallback,
});

/* ============================================
   MAIN COMPONENT 
   ============================================ */

/**
 * NavBar Component
 *
 * Main navigation bar with:
 * - Responsive design
 * - Scroll-based background change
 * - Categories dropdown
 * - Search input
 * - Cart and sign-in actions
 *
 * @example
 * <NavBar />
 */
export default function NavBar() {
  const pathname = usePathname();
  const [isNavInteractive, setIsNavInteractive] = useState(false);
  const isCheckoutPage = pathname?.startsWith("/checkout");
  const isProductPage = pathname?.startsWith("/product");

  useEffect(() => {
    let idleCallbackId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const enableInteractivity = () => setIsNavInteractive(true);

    if (typeof window.requestIdleCallback === "function") {
      idleCallbackId = window.requestIdleCallback(enableInteractivity, {
        timeout: 2000,
      });
    } else {
      timeoutId = globalThis.setTimeout(enableInteractivity, 1200);
    }

    return () => {
      if (idleCallbackId !== undefined && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleCallbackId);
      }
      if (timeoutId !== undefined) {
        globalThis.clearTimeout(timeoutId);
      }
    };
  }, []);

  return (
    <nav
      className="fixed top-0 right-0 left-0 z-50 flex w-full justify-center transition-all duration-1000"
      role="navigation"
      aria-label={isCheckoutPage ? "Checkout navigation" : "Main navigation"}
    >
      {/* Main Container */}
      <div
        className={`flex w-full translate-y-0 justify-center gap-x-3 bg-brand/80 shadow-2xl backdrop-blur-xl transition-all duration-700 ease-out`}
      >
        <div
          className={`800:px-4, flex h-10 w-full items-center justify-between gap-x-6 py-10 770:justify-center ${isProductPage ? "px-12" : "responsive-nav px-8"}`}
        >
          {/* Logo - Hide on mobile during checkout to save space */}
          <Link href={ROUTES.HOME} className={`shrink-0 ${isCheckoutPage ? "hidden md:block" : ""}`}>
            <Image
              src="/Difmark-logo.png"
              alt="Difmark - Digital Game Marketplace"
              width={130}
              height={30}
              priority
              className="h-[30px] w-[130px]"
            />
          </Link>

          {isNavInteractive ? (
            isCheckoutPage ? (
              <CheckoutNavSection />
            ) : (
              <MainNavSection />
            )
          ) : (
            <NavSectionFallback />
          )}
        </div>
      </div>
    </nav>
  );
}
