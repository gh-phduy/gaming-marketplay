"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingCart, X } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useTranslations } from "@/hooks/useTranslations";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function CartButton() {
  const t = useTranslations("cart");
  const [isOpen, setIsOpen] = useState(false);
  const { cartCount, cartItems, incrementItem, decrementItem, removeItem } =
    useCart();

  const cartTotal = useMemo(
    () =>
      cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    [cartItems],
  );

  const totalCurrency = cartItems[0]?.currency ?? "$";

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger
        className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg text-dm-text-secondary transition-all duration-300 hover:bg-white/[0.06] hover:text-dm-text-primary"
        aria-label={t("shoppingCartAria")}
      >
        <ShoppingCart size={24} aria-hidden="true" />
        {cartCount > 0 && (
          <span className="absolute top-1 right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#ef4444] px-1 text-[10px] leading-none font-bold text-white">
            {cartCount > 99 ? "99+" : cartCount}
          </span>
        )}
      </PopoverTrigger>

      <PopoverContent
        side="bottom"
        align="end"
        sideOffset={14}
        className="relative w-[min(calc(100vw-24px),400px)] gap-0 overflow-hidden rounded-xl border border-[#2a3545] bg-[#161e28] p-0 text-white shadow-[0_24px_64px_rgba(0,0,0,0.55)] sm:w-[400px]"
      >
        <span
          className="absolute -top-2 right-9 hidden h-4 w-4 rotate-45 border-t border-l border-[#2a3545] bg-[#161e28] sm:block"
          aria-hidden
        />

        <div className="px-5 pt-5 pb-4">
          <div className="flex items-start justify-between">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="h-[6px] w-[6px] rounded-full bg-[#4ade80] shadow-[0_0_8px_rgba(74,222,128,0.6)]" />
                <p className="text-[10px] font-bold tracking-[0.18em] text-[#6b7a8d] uppercase">
                  {t("cartSummary")}
                </p>
              </div>
              <h3 className="mt-2.5 text-xl leading-none font-bold tracking-tight">
                {t("title")}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              {cartCount > 0 ? (
                <span className="rounded-md border border-[#4ade80]/20 bg-[#4ade80]/10 px-2.5 py-1 text-[11px] font-bold text-[#4ade80]">
                  {cartCount} {cartCount === 1 ? t("item") : t("items")}
                </span>
              ) : null}
              <button
                type="button"
                className="flex h-7 w-7 items-center justify-center rounded-md text-[#6b7a8d] transition hover:bg-white/[0.06] hover:text-white focus-visible:ring-2 focus-visible:ring-[#4ade80]/70 focus-visible:outline-none"
                onClick={() => setIsOpen(false)}
                aria-label={t("closeCartPopoverAria")}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between px-5 pt-1 pb-2">
          <span className="text-[10px] font-bold tracking-[0.14em] text-[#6b7a8d] uppercase">
            {t("activeOrder")}
          </span>
          <button
            type="button"
            className="text-[12px] font-semibold text-[#58a6ff] transition hover:text-[#8fc5ff] focus-visible:ring-2 focus-visible:ring-[#4ade80]/70 focus-visible:outline-none"
            onClick={() => setIsOpen(false)}
          >
            {t("continue")}
          </button>
        </div>

        <div className="max-h-[min(380px,calc(100vh-320px))] space-y-0.5 overflow-y-auto px-2 pb-3 [scrollbar-color:#3a4a5c_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#3a4a5c] [&::-webkit-scrollbar-track]:bg-transparent">
          {cartItems.length === 0 ? (
            <div className="mx-3 rounded-lg border border-dashed border-white/[0.06] bg-[#111923]/70 px-4 py-8 text-center">
              <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#1e2630]">
                <ShoppingCart className="h-5 w-5 text-[#6b7a8d]" />
              </span>
              <p className="mt-3 text-sm font-semibold text-white">
                {t("empty")}
              </p>
              <p className="mt-1 text-[12px] text-[#6b7a8d]">
                {t("emptyDescription")}
              </p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="group relative flex gap-3 rounded-lg bg-[#1c2736] px-3.5 py-3.5 transition hover:bg-[#222f3f]"
              >
                <span
                  className="absolute top-2 bottom-2 left-0 w-[2px] rounded-full bg-[#4ade80] opacity-0 transition-opacity group-hover:opacity-100"
                  aria-hidden
                />

                <div className="relative h-[72px] w-[112px] shrink-0 overflow-hidden rounded-md bg-[#111923]">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                </div>

                <div className="flex min-w-0 flex-1 flex-col justify-between gap-2">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="line-clamp-2 text-[13px] leading-tight font-bold text-white uppercase">
                        {item.name}
                      </p>
                      <p className="mt-1 truncate text-[12px] leading-[18px] text-[#7a8ba0]">
                        {item.platform}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="shrink-0 rounded-md p-0.5 text-[#6b7a8d] transition hover:bg-white/[0.06] hover:text-white focus-visible:ring-2 focus-visible:ring-[#4ade80]/70 focus-visible:outline-none"
                      aria-label={t("removeItemAria", { name: item.name })}
                      onClick={() => removeItem(item.id)}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[15px] font-bold text-white">
                      {item.currency} {(item.price * item.quantity).toFixed(2)}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2a3545] text-[#c4cedc] transition hover:bg-[#35445a] hover:text-white focus-visible:ring-2 focus-visible:ring-[#4ade80]/70 focus-visible:outline-none"
                        aria-label={t("decreaseQuantityAria", { name: item.name })}
                        onClick={() => decrementItem(item.id)}
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-5 text-center text-[13px] font-bold text-white">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2a3545] text-[#c4cedc] transition hover:bg-[#35445a] hover:text-white focus-visible:ring-2 focus-visible:ring-[#4ade80]/70 focus-visible:outline-none"
                        aria-label={t("increaseQuantityAria", { name: item.name })}
                        onClick={() => incrementItem(item.id)}
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="space-y-4 border-t border-[#2a3545] bg-[#111923] px-5 py-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold tracking-[0.14em] text-[#6b7a8d] uppercase">
              {t("total")}
            </span>
            <span className="text-2xl leading-none font-bold tracking-tight text-white">
              {totalCurrency} {cartTotal.toFixed(2)}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/checkout/product"
              onClick={() => setIsOpen(false)}
              className="flex h-11 items-center justify-center rounded-md bg-[#2a3545] px-3 text-[13px] font-bold text-white transition hover:bg-[#35445a] focus-visible:ring-2 focus-visible:ring-[#4ade80]/70 focus-visible:outline-none"
            >
              {t("viewCart")}
            </Link>

            <Link
              href="/checkout"
              onClick={() => setIsOpen(false)}
              className="flex h-11 items-center justify-center rounded-md bg-[#3fcf63] px-3 text-[13px] font-bold text-[#07130b] transition hover:bg-[#53df75] focus-visible:ring-2 focus-visible:ring-[#4ade80]/70 focus-visible:outline-none"
            >
              {t("checkout")}
            </Link>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
