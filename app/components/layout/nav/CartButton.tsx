import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingCart, X } from "lucide-react";
import { useCart } from "@/app/context/CartContext";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function CartButton() {
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
        className="relative cursor-pointer text-dm-text-secondary transition-all duration-300 hover:text-dm-text-primary"
        aria-label="Shopping cart"
      >
        <ShoppingCart size={24} aria-hidden="true" />
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] leading-none font-semibold text-white">
            {cartCount > 99 ? "99+" : cartCount}
          </span>
        )}
      </PopoverTrigger>

      <PopoverContent
        side="bottom"
        align="end"
        sideOffset={14}
        className="w-[530px] gap-0 overflow-hidden rounded-xl border border-slate-700 bg-midnight-800 p-0 text-dm-text-primary"
      >
        <div className="flex items-center justify-between bg-midnight-750 px-6 py-5">
          <h3 className="text-3xl font-semibold">Shopping Cart</h3>
          <button
            type="button"
            className="text-dm-text-secondary transition-colors hover:text-dm-text-primary"
            onClick={() => setIsOpen(false)}
            aria-label="Close cart popover"
          >
            <X className="h-7 w-7" />
          </button>
        </div>

        <div className="max-h-[280px] space-y-4 overflow-auto p-4">
          {cartItems.length === 0 ? (
            <div className="rounded-lg bg-midnight-750 px-4 py-8 text-center text-dm-text-secondary">
              Your cart is empty.
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 rounded-xl bg-midnight-750 p-3"
              >
                <div className="relative h-24 w-44 shrink-0 overflow-hidden rounded-md">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="176px"
                    className="object-cover"
                  />
                </div>

                <div className="flex min-w-0 flex-1 flex-col gap-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-base text-dm-text-primary uppercase">
                        {item.name}
                      </p>
                      <p className="text-sm text-dm-text-secondary">
                        {item.platform}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="text-dm-text-secondary transition-colors hover:text-dm-text-primary"
                      aria-label={`Remove ${item.name} from cart`}
                      onClick={() => removeItem(item.id)}
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-semibold text-white">
                      {item.currency} {(item.price * item.quantity).toFixed(2)}
                    </span>

                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-600 text-white transition-colors hover:bg-slate-500"
                        aria-label={`Decrease quantity for ${item.name}`}
                        onClick={() => decrementItem(item.id)}
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-10 text-center text-xl text-dm-text-primary">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-600 text-white transition-colors hover:bg-slate-500"
                        aria-label={`Increase quantity for ${item.name}`}
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

        <div className="space-y-5 border-t border-slate-700 bg-midnight-750 px-6 py-5">
          <div className="flex items-center justify-between">
            <span className="text-3xl font-semibold text-dm-text-secondary">
              TOTAL:
            </span>
            <span className="text-4xl font-semibold text-white">
              {totalCurrency} {cartTotal.toFixed(2)}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <Button
              asChild
              variant="secondary"
              className="h-14 w-full bg-slate-600 text-2xl font-semibold text-dm-text-primary hover:bg-slate-500"
            >
              <Link href="/checkout/product" onClick={() => setIsOpen(false)}>
                VIEW CART
              </Link>
            </Button>

            <Button
              asChild
              className="h-14 w-full bg-green-500 text-2xl font-semibold text-white hover:bg-green-600"
            >
              <Link href="/checkout" onClick={() => setIsOpen(false)}>
                CHECKOUT
              </Link>
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
