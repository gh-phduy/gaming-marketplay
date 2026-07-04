"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Gamepad2,
  KeyRound,
  Monitor,
  ShieldCheck,
  ShoppingCart,
  Star,
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import type { SellerOfferItem } from "../../seller-profile.data";

interface SellerStoreOfferRowProps {
  offer: SellerOfferItem;
  viewMode: "list" | "grid";
  onAddedToCart: () => void;
}

function formatPrice(currency: string, price: number) {
  return `${currency} ${price.toFixed(2)}`;
}

export default function SellerStoreOfferRow({
  offer,
  viewMode,
  onAddedToCart,
}: SellerStoreOfferRowProps) {
  const { addToCart } = useCart();
  const productHref = `/buy-cheap?id=${offer.data.id}`;

  const handleAddToCart = () => {
    addToCart({
      id: offer.data.id,
      name: offer.data.name,
      platform: offer.data.platform,
      image: offer.data.images?.[0] || "/cyberpunk_2077.jpg",
      price: offer.data.price,
      currency: offer.data.currency,
    });
    onAddedToCart();
  };

  if (viewMode === "grid") {
    return (
      <article className="overflow-hidden rounded-md bg-midnight-800 shadow-lg shadow-black/10">
        <Link href={productHref} className="relative block aspect-[16/9]">
          <Image
            src={offer.data.images?.[0] || "/cyberpunk_2077.jpg"}
            alt={offer.data.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 360px"
          />
          <span className="absolute top-3 left-3 flex h-8 w-8 items-center justify-center rounded-full border border-forest-500/60 bg-midnight-900/80 text-forest-500">
            <Star className="h-4 w-4" />
          </span>
        </Link>

        <div className="space-y-4 p-4">
          <Link
            href={productHref}
            className="line-clamp-2 min-h-[48px] text-lg leading-6 font-bold transition hover:text-forest-100"
          >
            {offer.data.name}
          </Link>
          <div className="flex flex-wrap items-center gap-4 text-steel-500">
            <KeyRound className="h-4 w-4" />
            <ShieldCheck className="h-4 w-4" />
            <Monitor className="h-4 w-4" />
            <span className="text-sm">{offer.data.platform}</span>
          </div>
          <div className="flex items-center justify-between border-t border-midnight-700 pt-4">
            <div>
              <p className="text-xs text-steel-500">Price:</p>
              <p className="text-2xl font-bold">
                {formatPrice(offer.data.currency, offer.data.price)}
              </p>
            </div>
            <Button
              type="button"
              variant="ghost"
              onClick={handleAddToCart}
              className="h-12 w-12 rounded-md bg-midnight-700 hover:bg-midnight-650"
              aria-label={`Add ${offer.data.name} to cart`}
            >
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="grid overflow-hidden rounded-md bg-midnight-800 shadow-lg shadow-black/10 lg:grid-cols-[204px_minmax(0,1fr)_178px_64px]">
      <Link
        href={productHref}
        className="relative h-[124px] w-full overflow-hidden lg:h-[110px]"
      >
        <Image
          src={offer.data.images?.[0] || "/cyberpunk_2077.jpg"}
          alt={offer.data.name}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 204px"
        />
        <span className="absolute top-3 left-3 flex h-8 w-8 items-center justify-center rounded-full border border-forest-500/70 bg-midnight-900/70 text-forest-500">
          <Star className="h-4 w-4" />
        </span>
      </Link>

      <div className="flex min-w-0 flex-col justify-center px-5 py-4">
        <Link
          href={productHref}
          className="line-clamp-1 text-lg font-bold transition hover:text-forest-100"
        >
          {offer.data.name}
        </Link>
        <div className="mt-8 flex flex-wrap items-center gap-5 text-steel-500 lg:mt-7">
          <KeyRound className="h-5 w-5" />
          <ShieldCheck className="h-5 w-5" />
          <Gamepad2 className="h-5 w-5" />
          <Monitor className="h-5 w-5" />
          <span className="text-sm">{offer.data.platform}</span>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-midnight-700 px-5 py-4 lg:block lg:border-t-0 lg:border-l lg:py-8 lg:text-center">
        <p className="text-xs text-steel-500">Price:</p>
        <p className="text-2xl font-bold lg:mt-2">
          {formatPrice(offer.data.currency, offer.data.price)}
        </p>
      </div>

      <Button
        type="button"
        variant="ghost"
        onClick={handleAddToCart}
        className="h-14 rounded-none border-t border-midnight-700 bg-midnight-700 text-white hover:bg-midnight-650 lg:h-full lg:border-t-0 lg:border-l"
        aria-label={`Add ${offer.data.name} to cart`}
      >
        <ShoppingCart className="h-5 w-5" />
      </Button>
    </article>
  );
}
