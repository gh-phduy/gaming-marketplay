"use client";

import { useState } from "react";
import { ShoppingCart, Heart, Eye, Star } from "lucide-react";
import { useTranslations } from "@/hooks/useTranslations";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  badge?: string;
}

export default function ProductCard() {
  const t = useTranslations("product");
  const [cartItems, setCartItems] = useState<number[]>([]);

  const products: Product[] = [
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      price: 79.99,
      originalPrice: 99.99,
      image: "/api/placeholder/300/300",
      rating: 4.5,
      reviews: 128,
      badge: "Sale",
    },
    {
      id: 2,
      name: "Smart Watch Series 9",
      price: 299.99,
      image: "/api/placeholder/300/300",
      rating: 4.8,
      reviews: 234,
      badge: "New",
    },
    {
      id: 3,
      name: "Premium Coffee Beans",
      price: 24.99,
      originalPrice: 34.99,
      image: "/api/placeholder/300/300",
      rating: 4.6,
      reviews: 89,
      badge: "Hot",
    },
    {
      id: 4,
      name: "Minimalist Desk Lamp",
      price: 89.99,
      image: "/api/placeholder/300/300",
      rating: 4.7,
      reviews: 156,
    },
  ];

  const addToCart = (productId: number) => {
    setCartItems((prev) => [...prev, productId]);
    // Hiệu ứng feedback
    setTimeout(() => {
      setCartItems((prev) => prev.filter((id) => id !== productId));
    }, 2000);
  };

  const isInCart = (productId: number) => cartItems.includes(productId);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">
            {t("titleHoverAnimation")}
          </h1>
          <p className="text-lg text-gray-600">
            {t("hoverDescription")}
          </p>
        </div>

        {/* Product Grid */}
        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative transform overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              {/* Badge */}
              {product.badge && (
                <div
                  className={`absolute top-4 left-4 z-10 rounded-full px-3 py-1 text-xs font-bold text-white ${
                    product.badge === "Sale"
                      ? "bg-red-500"
                      : product.badge === "New"
                        ? "bg-green-500"
                        : product.badge === "Hot"
                          ? "bg-orange-500"
                          : "bg-blue-500"
                  }`}
                >
                  {product.badge}
                </div>
              )}

              {/* Wishlist Button */}
              <div className="absolute top-4 right-4 z-10">
                <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80 shadow-lg backdrop-blur-xs transition-all duration-200 hover:bg-white">
                  <Heart className="h-5 w-5 text-gray-600 transition-colors hover:text-red-500" />
                </button>
              </div>

              {/* Product Image */}
              <div className="relative h-64 overflow-hidden bg-linear-to-br from-gray-100 to-gray-200">
                {/* Placeholder for actual image */}
                <div className="flex h-full w-full items-center justify-center">
                  <div className="text-center text-gray-400">
                    <div className="mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-lg bg-gray-300">
                      <Eye className="h-8 w-8" />
                    </div>
                    <p className="text-sm font-medium">{t("productImage")}</p>
                  </div>
                </div>

                {/* Quick View Button - Fade in on hover */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/20">
                  <button className="translate-y-4 transform rounded-lg bg-white/90 px-4 py-2 font-medium text-gray-900 opacity-0 backdrop-blur-xs transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-white">
                    <Eye className="mr-2 inline h-4 w-4" />
                    {t("quickView")}
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                {/* Rating */}
                <div className="mb-2 flex items-center">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? "fill-current text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">
                    ({product.reviews})
                  </span>
                </div>

                {/* Product Name */}
                <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-gray-900 transition-colors group-hover:text-blue-600">
                  {product.name}
                </h3>

                {/* Price */}
                <div className="mb-4 flex items-center">
                  <span className="text-2xl font-bold text-gray-900">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="ml-2 text-lg text-gray-500 line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>

                {/* Add to Cart Button Container */}
                <div className="relative h-12 overflow-hidden rounded-xl">
                  {/* Default State Button - Luôn ở đó làm nền */}
                  <button className="h-full w-full rounded-xl bg-gray-100 font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-200">
                    {t("viewDetails")}
                  </button>

                  {/* Add to Cart Button - Bắt đầu từ center, chỉ che nửa */}
                  <div
                    className={`absolute inset-0 transform transition-all duration-1000 ease-out ${
                      isInCart(product.id)
                        ? "translate-x-0 opacity-100"
                        : "translate-x-full group-hover:translate-x-0"
                    }`}
                  >
                    <button
                      onClick={() => addToCart(product.id)}
                      disabled={isInCart(product.id)}
                      className={`flex h-full w-full items-center justify-center rounded-xl font-medium transition-all duration-200 ${
                        isInCart(product.id)
                          ? "cursor-not-allowed bg-green-500 text-white"
                          : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg"
                      }`}
                    >
                      {isInCart(product.id) ? (
                        <>
                          <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                          {t("addedToCart")}
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="mr-2 h-5 w-5" />
                          {t("addToCart")}
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Variants Demo */}
        <div className="rounded-2xl bg-white p-8 shadow-lg">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">
            {t("otherVariants")}
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Variant 1: Overlay từ center */}
            <div className="group relative rounded-xl bg-linear-to-br from-purple-50 to-purple-100 p-6 transition-all duration-300 hover:shadow-lg">
              <h3 className="mb-4 font-semibold text-gray-900">
                {t("overlayFromCenter")}
              </h3>
              <div className="relative h-12 rounded-lg">
                {/* Background button */}
                <button className="h-full w-full rounded-lg bg-gray-200 font-medium text-gray-600">
                  {t("hoverMe")}
                </button>
                {/* Overlay button */}
                <div className="absolute inset-0 flex origin-center scale-x-0 transform items-center justify-center rounded-lg bg-blue-600 transition-transform duration-500 group-hover:scale-x-100">
                  <span className="font-medium text-white">{t("addToCart")}</span>
                </div>
              </div>
            </div>

            {/* Variant 2: Overlay từ bottom */}
            <div className="group relative rounded-xl bg-linear-to-br from-green-50 to-green-100 p-6 transition-all duration-300 hover:shadow-lg">
              <h3 className="mb-4 font-semibold text-gray-900">
                {t("overlayFromBottom")}
              </h3>
              <div className="relative h-12 rounded-lg">
                {/* Background button */}
                <button className="h-full w-full rounded-lg bg-gray-200 font-medium text-gray-600">
                  {t("hoverMe")}
                </button>
                {/* Overlay button */}
                <div className="absolute inset-0 flex translate-y-full items-center justify-center rounded-lg bg-green-600 transition-transform duration-500 group-hover:translate-y-0">
                  <span className="font-medium text-white">{t("addToCart")}</span>
                </div>
              </div>
            </div>

            {/* Variant 3: Fade In từ trái */}
            <div className="group relative rounded-xl bg-linear-to-br from-orange-50 to-orange-100 p-6 transition-all duration-300 hover:shadow-lg">
              <h3 className="mb-4 font-semibold text-gray-900">
                {t("fadeInFromLeft")}
              </h3>
              <div className="relative h-12 rounded-lg">
                {/* Background button */}
                <button className="h-full w-full rounded-lg bg-gray-200 font-medium text-gray-600 transition-colors duration-200">
                  {t("hoverMe")}
                </button>
                {/* Fade in button */}
                <div className="absolute inset-0 flex -translate-x-full items-center justify-center rounded-lg bg-orange-600 opacity-0 transition-all duration-800 group-hover:translate-x-0 group-hover:opacity-100">
                  <span className="font-medium text-white">{t("addToCart")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Code Examples */}
        <div className="mt-8 rounded-2xl bg-gray-900 p-6">
          <h3 className="mb-4 text-xl font-bold text-white">
            {t("mainCodeFadeIn")}
          </h3>
          <div className="overflow-x-auto rounded-lg bg-black/50 p-4">
            <pre className="text-sm text-green-400">
              {`<!-- Container -->
<div className="relative h-12 rounded-xl">
  
  <!-- Button nền - luôn hiển thị -->
  <button className="w-full h-full bg-gray-100 text-gray-700 rounded-xl">
    View Details
  </button>
  
  <!-- Add to Cart - Ẩn hoàn toàn, fade in + slide -->
  <div className="absolute inset-0 transform transition-all duration-1000 
                  -translate-x-full opacity-0 
                  group-hover:translate-x-0 group-hover:opacity-100">
    <button className="w-full h-full bg-blue-600 text-white rounded-xl">
      Add to Cart
    </button>
  </div>
  
</div>`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
