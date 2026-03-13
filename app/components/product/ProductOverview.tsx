"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import ProductGallery from "./ProductGallery";
import PurchaseCard from "./PurchaseCard";
import { ProductApiResponse } from "@/app/types/product";
import { useCart } from "@/app/context/CartContext";

interface ProductOverviewProps {
  data: ProductApiResponse;
}

export default function ProductOverview({ data }: ProductOverviewProps) {
  const router = useRouter();
  const { addToCart } = useCart();

  const handleAddToCart = useCallback(() => {
    if (data?.data.id) {
      console.log("Add to cart:", data.data.id);
      addToCart({
        id: data.data.id,
        name: data.data.name,
        platform: data.data.platform,
        image: data.data.images[0] ?? "/battlefield_6.jpg",
        price: data.data.price,
        currency: data.data.currency,
      });
    }
  }, [addToCart, data?.data]);

  const handleCheckout = useCallback(() => {
    if (data?.data.id) {
      router.push(`/checkout?id=${data.data.id}`);
    }
  }, [data?.data.id, router]);

  const handleChat = useCallback(() => {
    if (data?.seller.name) {
      console.log("Chat with seller:", data.seller.name);
    }
  }, [data?.seller.name]);

  return (
    <div className="flex w-full flex-col gap-5 lg:flex-row lg:gap-6">
      <ProductGallery
        images={data.data.images}
        name={data.data.name}
        platform={data.data.platform}
      />
      <PurchaseCard
        product={data.data}
        seller={data.seller}
        onAddToCart={handleAddToCart}
        onCheckout={handleCheckout}
        onChat={handleChat}
      />
    </div>
  );
}
