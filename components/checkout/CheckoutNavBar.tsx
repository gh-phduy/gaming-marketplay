"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { CreditCard, ShoppingCart, CheckCircle2, XCircle } from "lucide-react";

export default function CheckoutNavBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const redirectStatus = searchParams.get("redirect_status");
  const isSuccessPage = pathname?.startsWith("/checkout/success");
  const isCompleted = isSuccessPage && redirectStatus === "succeeded";
  const isFailed = isSuccessPage && redirectStatus !== "succeeded";
  const isAfterCheckout = isCompleted || isFailed;

  const checkoutStepClass = isAfterCheckout ? "text-[#46ca43]" : "text-white";
  const checkoutIconClass = isAfterCheckout
    ? "border-[#46ca43] bg-[#46ca43] text-black"
    : "border-[#58a6ff] bg-[#374050] text-white";

  const lastStepLabel = isCompleted
    ? "Completed"
    : isFailed
      ? "Failed"
      : "Processing";
  const lastStepClass = isCompleted
    ? "text-[#46ca43]"
    : isFailed
      ? "text-[#f85149]"
      : "text-[#8b949e]";

  return (
    <nav className="sticky top-0 z-50 flex h-20 w-full items-center justify-center border-b border-[#2d3544] bg-[#161b22]">
      <div className="flex w-full max-w-[1622px] items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative h-[40px] w-[150px]">
            <Image
              src="/Difmark-logo.png"
              alt="Difmark Logo"
              width={150}
              height={40}
              className="object-contain"
              priority
            />
          </div>
        </Link>

        <div className="hidden items-center gap-4 text-sm font-medium md:flex">
          <div className="flex items-center gap-2 text-[#46ca43]">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#46ca43] text-black">
              <ShoppingCart className="h-3.5 w-3.5" />
            </div>
            <span>Shopping Cart</span>
          </div>

          <div className="h-[2px] w-24 bg-[#46ca43]"></div>

          <div className={`flex items-center gap-2 ${checkoutStepClass}`}>
            <div
              className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${checkoutIconClass}`}
            >
              <CreditCard className="h-3.5 w-3.5" />
            </div>
            <span>Checkout</span>
          </div>

          <div
            className={`h-[2px] w-24 ${isCompleted ? "bg-[#46ca43]" : isFailed ? "bg-[#f85149]" : "bg-[#2d3544]"}`}
          ></div>

          <div className={`flex items-center gap-2 ${lastStepClass}`}>
            <div
              className={`flex h-6 w-6 items-center justify-center rounded-full ${isCompleted ? "bg-[#46ca43] text-black" : isFailed ? "bg-[#f85149] text-white" : "bg-[#21262d]"}`}
            >
              {isCompleted ? (
                <CheckCircle2 className="h-3.5 w-3.5" />
              ) : isFailed ? (
                <XCircle className="h-3.5 w-3.5" />
              ) : (
                <div className="h-2 w-2 rounded-full bg-[#8b949e]"></div>
              )}
            </div>
            <span>{lastStepLabel}</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm text-[#8b949e]">
          <div className="flex items-center gap-4">
            <span className="cursor-pointer hover:text-white">USD</span>
            <span className="cursor-pointer hover:text-white">LNG</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
