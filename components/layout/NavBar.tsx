"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
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
  const isCheckoutPage = pathname?.startsWith("/checkout");
  const isProductPage = pathname?.startsWith("/product");

  return (
    <nav
      className="fixed top-0 right-0 left-0 z-50 flex w-full justify-center"
      role="navigation"
      aria-label={isCheckoutPage ? "Checkout navigation" : "Main navigation"}
    >
      {/* Main Container */}
      <div
        className={`flex w-full justify-center gap-x-3 bg-midnight-950/85 shadow-2xl backdrop-blur-xl`}
      >
        <div
          className={`flex h-16 w-full items-center justify-between gap-x-4 px-4 770:justify-center 800:px-8 800:gap-x-6 ${isProductPage ? "md:px-12" : "responsive-nav"}`}
        >
          {/* Logo - Hide on mobile during checkout to save space */}
          <Link
            href={ROUTES.HOME}
            className={`relative block h-[30px] w-[130px] shrink-0 ${isCheckoutPage ? "hidden md:block" : ""}`}
          >
            <Image
              src="/Difmark-logo.png"
              alt="Difmark - Digital Game Marketplace"
              fill
              priority
              className="object-contain"
            />
          </Link>

          {isCheckoutPage ? (
            <CheckoutNavSection />
          ) : (
            <MainNavSection />
          )}
        </div>
      </div>
    </nav>
  );
}
